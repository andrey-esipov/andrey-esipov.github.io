/**
 * Elegant Flowing 3D World
 * Smooth particles, flowing curves, organic shapes
 */

(function() {
    'use strict';

    const CONFIG = {
        sections: 5,
        cameraSpeed: 0.03,
        colors: {
            primary: 0x0078d4,
            accent: 0x50e6ff,
            purple: 0x8764b8,
            white: 0xffffff,
            background: 0x0a0e14
        }
    };

    class World {
        constructor() {
            this.canvas = document.getElementById('canvas');
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
            this.renderer = new THREE.WebGLRenderer({
                canvas: this.canvas,
                antialias: true,
                alpha: false
            });

            this.clock = new THREE.Clock();
            this.mouse = { x: 0, y: 0 };
            this.targetMouse = { x: 0, y: 0 };

            this.currentSection = 0;
            this.isTransitioning = false;

            this.init();
        }

        init() {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.outputColorSpace = THREE.SRGBColorSpace;
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.2;

            this.scene.background = new THREE.Color(CONFIG.colors.background);

            this.camera.position.set(0, 0, 50);

            this.createGradientBackground();
            this.createFlowingParticles();
            this.createGlowOrbs();
            this.createFlowingRibbons();
            this.createStarField();

            this.setupUI();
            this.setupEvents();
            this.simulateLoading();
        }

        createGradientBackground() {
            // Soft gradient mesh in background
            const geometry = new THREE.PlaneGeometry(200, 200);
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uColor1: { value: new THREE.Color(0x0a1628) },
                    uColor2: { value: new THREE.Color(0x0d2847) },
                    uColor3: { value: new THREE.Color(0x0a0e14) }
                },
                vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform vec3 uColor1;
                    uniform vec3 uColor2;
                    uniform vec3 uColor3;
                    uniform float uTime;
                    varying vec2 vUv;

                    void main() {
                        vec2 center = vUv - 0.5;
                        float dist = length(center);

                        // Radial gradient with subtle animation
                        float t = dist * 2.0;
                        t += sin(uTime * 0.2) * 0.1;

                        vec3 color = mix(uColor2, uColor1, smoothstep(0.0, 0.5, t));
                        color = mix(color, uColor3, smoothstep(0.5, 1.0, t));

                        gl_FragColor = vec4(color, 1.0);
                    }
                `,
                depthWrite: false
            });

            this.bgMesh = new THREE.Mesh(geometry, material);
            this.bgMesh.position.z = -100;
            this.bgMaterial = material;
            this.scene.add(this.bgMesh);
        }

        createFlowingParticles() {
            const count = 5000;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
            const sizes = new Float32Array(count);
            const randoms = new Float32Array(count);

            const colorOptions = [
                new THREE.Color(CONFIG.colors.primary),
                new THREE.Color(CONFIG.colors.accent),
                new THREE.Color(CONFIG.colors.purple),
                new THREE.Color(CONFIG.colors.white)
            ];

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;

                // Distribute in flowing patterns
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * 80 + 10;
                const height = (Math.random() - 0.5) * 60;

                positions[i3] = Math.cos(angle) * radius;
                positions[i3 + 1] = height;
                positions[i3 + 2] = Math.sin(angle) * radius - 30;

                const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;

                sizes[i] = Math.random() * 2 + 0.5;
                randoms[i] = Math.random();
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
            geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uPixelRatio: { value: this.renderer.getPixelRatio() }
                },
                vertexShader: `
                    attribute float size;
                    attribute vec3 color;
                    attribute float aRandom;
                    varying vec3 vColor;
                    varying float vAlpha;
                    uniform float uTime;
                    uniform float uPixelRatio;

                    void main() {
                        vColor = color;

                        vec3 pos = position;

                        // Gentle flowing motion
                        float flowSpeed = 0.3 + aRandom * 0.2;
                        pos.x += sin(uTime * flowSpeed + pos.y * 0.05 + aRandom * 6.28) * 3.0;
                        pos.y += cos(uTime * flowSpeed * 0.7 + pos.x * 0.03) * 2.0;
                        pos.z += sin(uTime * flowSpeed * 0.5 + aRandom * 3.14) * 2.0;

                        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                        float dist = length(mvPosition.xyz);

                        vAlpha = smoothstep(120.0, 30.0, dist);

                        gl_PointSize = size * uPixelRatio * (120.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;
                    varying float vAlpha;

                    void main() {
                        vec2 center = gl_PointCoord - 0.5;
                        float dist = length(center);

                        // Very soft, glowing particles
                        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                        alpha = pow(alpha, 1.5);
                        alpha *= vAlpha * 0.7;

                        if (alpha < 0.01) discard;

                        gl_FragColor = vec4(vColor, alpha);
                    }
                `,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true
            });

            this.particles = new THREE.Points(geometry, material);
            this.particleMaterial = material;
            this.scene.add(this.particles);
        }

        createGlowOrbs() {
            // Soft glowing orbs floating in space
            this.orbs = [];

            const orbData = [
                { pos: [-25, 15, -40], size: 8, color: CONFIG.colors.primary },
                { pos: [30, -10, -50], size: 12, color: CONFIG.colors.accent },
                { pos: [-15, -20, -35], size: 6, color: CONFIG.colors.purple },
                { pos: [20, 25, -60], size: 15, color: CONFIG.colors.primary },
                { pos: [0, 5, -45], size: 10, color: CONFIG.colors.accent },
                { pos: [-35, 0, -55], size: 9, color: CONFIG.colors.purple },
                { pos: [40, 10, -70], size: 14, color: CONFIG.colors.primary }
            ];

            orbData.forEach((data, i) => {
                const geo = new THREE.SphereGeometry(data.size, 32, 32);
                const mat = new THREE.ShaderMaterial({
                    uniforms: {
                        uColor: { value: new THREE.Color(data.color) },
                        uTime: { value: 0 }
                    },
                    vertexShader: `
                        varying vec3 vNormal;
                        varying vec3 vViewPosition;
                        void main() {
                            vNormal = normalize(normalMatrix * normal);
                            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
                            vViewPosition = -mvPos.xyz;
                            gl_Position = projectionMatrix * mvPos;
                        }
                    `,
                    fragmentShader: `
                        uniform vec3 uColor;
                        uniform float uTime;
                        varying vec3 vNormal;
                        varying vec3 vViewPosition;

                        void main() {
                            vec3 viewDir = normalize(vViewPosition);
                            float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);

                            // Soft glow effect
                            float glow = fresnel * 0.8;
                            glow += 0.1; // Base visibility

                            // Subtle pulse
                            glow *= 0.9 + sin(uTime * 2.0) * 0.1;

                            gl_FragColor = vec4(uColor, glow * 0.4);
                        }
                    `,
                    transparent: true,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide
                });

                const orb = new THREE.Mesh(geo, mat);
                orb.position.set(...data.pos);
                orb.userData = {
                    originalPos: [...data.pos],
                    floatSpeed: 0.3 + Math.random() * 0.3,
                    floatOffset: Math.random() * Math.PI * 2
                };

                this.orbs.push(orb);
                this.scene.add(orb);
            });
        }

        createFlowingRibbons() {
            // Elegant flowing ribbon curves
            this.ribbons = [];

            const ribbonConfigs = [
                { yBase: 20, zBase: -50, color: CONFIG.colors.accent, width: 0.3 },
                { yBase: 10, zBase: -60, color: CONFIG.colors.primary, width: 0.25 },
                { yBase: -5, zBase: -45, color: CONFIG.colors.purple, width: 0.2 },
                { yBase: 30, zBase: -70, color: CONFIG.colors.accent, width: 0.35 },
                { yBase: -15, zBase: -55, color: CONFIG.colors.primary, width: 0.28 }
            ];

            ribbonConfigs.forEach((config, idx) => {
                const points = [];
                const segments = 80;

                for (let i = 0; i <= segments; i++) {
                    const t = i / segments;
                    const x = (t - 0.5) * 120;
                    const y = config.yBase + Math.sin(t * Math.PI * 2 + idx) * 8;
                    const z = config.zBase + Math.cos(t * Math.PI * 1.5) * 10;
                    points.push(new THREE.Vector3(x, y, z));
                }

                const curve = new THREE.CatmullRomCurve3(points);
                const geometry = new THREE.TubeGeometry(curve, 120, config.width, 8, false);

                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        uColor: { value: new THREE.Color(config.color) },
                        uTime: { value: 0 },
                        uIndex: { value: idx }
                    },
                    vertexShader: `
                        varying vec2 vUv;
                        varying vec3 vNormal;
                        void main() {
                            vUv = uv;
                            vNormal = normalize(normalMatrix * normal);
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `,
                    fragmentShader: `
                        uniform vec3 uColor;
                        uniform float uTime;
                        uniform float uIndex;
                        varying vec2 vUv;
                        varying vec3 vNormal;

                        void main() {
                            // Flowing opacity along ribbon
                            float flow = sin(vUv.x * 20.0 - uTime * 2.0 + uIndex) * 0.5 + 0.5;
                            float edge = 1.0 - abs(vUv.y - 0.5) * 2.0;
                            edge = pow(edge, 0.5);

                            float alpha = flow * edge * 0.25;

                            gl_FragColor = vec4(uColor, alpha);
                        }
                    `,
                    transparent: true,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide
                });

                const ribbon = new THREE.Mesh(geometry, material);
                this.ribbons.push(ribbon);
                this.scene.add(ribbon);
            });
        }

        createStarField() {
            // Distant twinkling stars
            const count = 1500;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);
            const sizes = new Float32Array(count);
            const twinkle = new Float32Array(count);

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;

                // Spread across the far background
                positions[i3] = (Math.random() - 0.5) * 200;
                positions[i3 + 1] = (Math.random() - 0.5) * 150;
                positions[i3 + 2] = -80 - Math.random() * 50;

                sizes[i] = Math.random() * 1.5 + 0.3;
                twinkle[i] = Math.random() * Math.PI * 2;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
            geometry.setAttribute('aTwinkle', new THREE.BufferAttribute(twinkle, 1));

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uPixelRatio: { value: this.renderer.getPixelRatio() }
                },
                vertexShader: `
                    attribute float size;
                    attribute float aTwinkle;
                    varying float vTwinkle;
                    uniform float uTime;
                    uniform float uPixelRatio;

                    void main() {
                        vTwinkle = aTwinkle;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_PointSize = size * uPixelRatio * (80.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    uniform float uTime;
                    varying float vTwinkle;

                    void main() {
                        vec2 center = gl_PointCoord - 0.5;
                        float dist = length(center);

                        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);

                        // Twinkling
                        float twinkleVal = sin(uTime * 3.0 + vTwinkle) * 0.4 + 0.6;
                        alpha *= twinkleVal;

                        if (dist > 0.5) discard;

                        gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.6);
                    }
                `,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });

            this.stars = new THREE.Points(geometry, material);
            this.starMaterial = material;
            this.scene.add(this.stars);
        }

        setupUI() {
            const progressContainer = document.getElementById('progress');

            for (let i = 0; i < CONFIG.sections; i++) {
                const dot = document.createElement('div');
                dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => this.goToSection(i));
                progressContainer.appendChild(dot);
            }

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    const section = parseInt(link.dataset.section);
                    this.goToSection(section);
                });
            });
        }

        updateUI() {
            document.querySelectorAll('.progress-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentSection);
            });

            document.querySelectorAll('.nav-link').forEach((link, i) => {
                link.classList.toggle('active', i === this.currentSection);
            });

            document.querySelectorAll('.content-panel').forEach(panel => {
                const panelIndex = parseInt(panel.dataset.panel);
                panel.classList.toggle('active', panelIndex === this.currentSection);
            });
        }

        setupEvents() {
            window.addEventListener('resize', () => this.onResize());

            window.addEventListener('mousemove', (e) => {
                this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
                this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            });

            let scrollTimeout;
            window.addEventListener('wheel', (e) => {
                if (scrollTimeout) return;
                scrollTimeout = setTimeout(() => scrollTimeout = null, 1000);

                if (e.deltaY > 0) {
                    this.goToSection(this.currentSection + 1);
                } else {
                    this.goToSection(this.currentSection - 1);
                }
            }, { passive: true });

            let touchStartY = 0;
            window.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            window.addEventListener('touchend', (e) => {
                const diff = touchStartY - e.changedTouches[0].clientY;
                if (Math.abs(diff) > 50) {
                    this.goToSection(this.currentSection + (diff > 0 ? 1 : -1));
                }
            }, { passive: true });

            window.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    this.goToSection(this.currentSection + 1);
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    this.goToSection(this.currentSection - 1);
                }
            });
        }

        onResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            const pr = this.renderer.getPixelRatio();
            if (this.particleMaterial) this.particleMaterial.uniforms.uPixelRatio.value = pr;
            if (this.starMaterial) this.starMaterial.uniforms.uPixelRatio.value = pr;
        }

        goToSection(index) {
            if (index < 0 || index >= CONFIG.sections || this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentSection = index;
            this.updateUI();

            setTimeout(() => {
                this.isTransitioning = false;
            }, 800);
        }

        simulateLoading() {
            const loader = document.getElementById('loader');
            const progress = document.getElementById('loaderProgress');
            let loadProgress = 0;

            const interval = setInterval(() => {
                loadProgress += Math.random() * 20 + 10;
                if (loadProgress >= 100) {
                    loadProgress = 100;
                    progress.style.width = '100%';
                    clearInterval(interval);

                    setTimeout(() => {
                        loader.classList.add('hidden');
                        this.animate();
                    }, 400);
                } else {
                    progress.style.width = loadProgress + '%';
                }
            }, 100);
        }

        getCameraPosition(section) {
            const positions = [
                { x: 0, y: 0, z: 50, lookX: 0, lookY: 0, lookZ: -20 },
                { x: -15, y: 5, z: 45, lookX: -5, lookY: 3, lookZ: -25 },
                { x: 15, y: -5, z: 48, lookX: 5, lookY: -2, lookZ: -25 },
                { x: 0, y: 10, z: 40, lookX: 0, lookY: 5, lookZ: -30 },
                { x: 0, y: 0, z: 35, lookX: 0, lookY: 0, lookZ: -25 }
            ];
            return positions[section] || positions[0];
        }

        animate() {
            requestAnimationFrame(() => this.animate());

            const elapsed = this.clock.getElapsedTime();

            // Smooth mouse
            this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.03;
            this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.03;

            // Camera
            const cam = this.getCameraPosition(this.currentSection);
            this.camera.position.x += (cam.x + this.mouse.x * 5 - this.camera.position.x) * CONFIG.cameraSpeed;
            this.camera.position.y += (cam.y + this.mouse.y * 3 - this.camera.position.y) * CONFIG.cameraSpeed;
            this.camera.position.z += (cam.z - this.camera.position.z) * CONFIG.cameraSpeed;

            const lookTarget = new THREE.Vector3(
                cam.lookX + this.mouse.x * 3,
                cam.lookY + this.mouse.y * 2,
                cam.lookZ
            );
            this.camera.lookAt(lookTarget);

            // Update materials
            if (this.bgMaterial) {
                this.bgMaterial.uniforms.uTime.value = elapsed;
            }

            if (this.particleMaterial) {
                this.particleMaterial.uniforms.uTime.value = elapsed;
            }

            // Animate orbs
            this.orbs.forEach(orb => {
                const { originalPos, floatSpeed, floatOffset } = orb.userData;
                orb.position.y = originalPos[1] + Math.sin(elapsed * floatSpeed + floatOffset) * 3;
                orb.position.x = originalPos[0] + Math.cos(elapsed * floatSpeed * 0.7 + floatOffset) * 2;
                orb.material.uniforms.uTime.value = elapsed;
            });

            // Animate ribbons
            this.ribbons.forEach(ribbon => {
                ribbon.material.uniforms.uTime.value = elapsed;
            });

            // Animate stars
            if (this.starMaterial) {
                this.starMaterial.uniforms.uTime.value = elapsed;
            }

            // Subtle particle rotation
            if (this.particles) {
                this.particles.rotation.y = elapsed * 0.02;
            }

            this.renderer.render(this.scene, this.camera);
        }
    }

    new World();
})();
