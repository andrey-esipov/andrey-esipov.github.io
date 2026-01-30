(function () {
  function createHouse(color) {
    const group = new THREE.Group();
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(4, 2.5, 4),
      new THREE.MeshStandardMaterial({ color })
    );
    base.position.y = 1.25;
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(3.3, 2, 4),
      new THREE.MeshStandardMaterial({ color: 0x8b2f2f })
    );
    roof.position.y = 3.5;
    roof.rotation.y = Math.PI / 4;
    group.add(base, roof);
    return group;
  }

  function createTree() {
    const group = new THREE.Group();
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.3, 2, 8),
      new THREE.MeshStandardMaterial({ color: 0x5c3b23 })
    );
    trunk.position.y = 1;
    const leaves = new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 2.5, 8),
      new THREE.MeshStandardMaterial({ color: 0x2f8f4e })
    );
    leaves.position.y = 2.8;
    group.add(trunk, leaves);
    return group;
  }

  function createFireflies(count, area) {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: 0xffffaa, emissive: 0xffff66 });
    for (let i = 0; i < count; i++) {
      const fly = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), material);
      fly.position.set(
        (Math.random() - 0.5) * area,
        Math.random() * 3 + 1,
        (Math.random() - 0.5) * area
      );
      fly.userData.speed = 0.5 + Math.random();
      group.add(fly);
    }
    return group;
  }

  function createOffice() {
    const group = new THREE.Group();
    const desk = new THREE.Mesh(
      new THREE.BoxGeometry(5, 0.4, 2.5),
      new THREE.MeshStandardMaterial({ color: 0x3b3f4a })
    );
    desk.position.y = 1;
    group.add(desk);
    for (let i = 0; i < 3; i++) {
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 1),
        new THREE.MeshStandardMaterial({ color: 0x1db2ff, emissive: 0x1db2ff, emissiveIntensity: 0.3 })
      );
      screen.position.set(-1 + i * 1.2, 2, -0.6);
      group.add(screen);
    }
    for (let i = 0; i < 8; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0x8fe3ff, emissive: 0x2c91ff, emissiveIntensity: 0.5 })
      );
      node.position.set((Math.random() - 0.5) * 6, 2 + Math.random() * 2, (Math.random() - 0.5) * 6);
      node.userData.orbit = Math.random() * Math.PI * 2;
      group.add(node);
    }
    return group;
  }

  function createTrading() {
    const group = new THREE.Group();
    for (let i = 0; i < 12; i++) {
      const height = 1 + Math.random() * 4;
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, height, 0.6),
        new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x44cc77 : 0xff6677 })
      );
      bar.position.set(-3 + i * 0.6, height / 2, 0);
      group.add(bar);
    }
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3, 1, -1),
        new THREE.Vector3(-1, 2, -1),
        new THREE.Vector3(1, 3, -1),
        new THREE.Vector3(3, 2, -1)
      ]),
      new THREE.LineBasicMaterial({ color: 0x88ddff })
    );
    group.add(line);
    return group;
  }

  function createOutdoors() {
    const group = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const mountain = new THREE.Mesh(
        new THREE.ConeGeometry(4, 6, 6),
        new THREE.MeshStandardMaterial({ color: 0x506d8a })
      );
      mountain.position.set(-6 + i * 4, 3, -2);
      group.add(mountain);
    }
    const water = new THREE.Mesh(
      new THREE.CircleGeometry(5, 32),
      new THREE.MeshStandardMaterial({ color: 0x2b6f9e, transparent: true, opacity: 0.7 })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.1;
    water.position.z = 4;
    group.add(water);
    return group;
  }

  function createBackyard() {
    const group = new THREE.Group();
    const house = createHouse(0x6c5b7b);
    house.position.set(-2, 0, 0);
    const swingFrame = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 0.2),
      new THREE.MeshStandardMaterial({ color: 0xc7a46c })
    );
    swingFrame.position.set(3, 1.5, 0);
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.2, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x444444 })
    );
    seat.position.set(3, 0.8, 0);
    group.add(house, swingFrame, seat);
    return group;
  }

  function createMailbox() {
    const group = new THREE.Group();
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 2, 8),
      new THREE.MeshStandardMaterial({ color: 0x5c3b23 })
    );
    post.position.y = 1;
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.8, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xff5544 })
    );
    box.position.set(0.3, 1.6, 0);
    group.add(post, box);
    return group;
  }

  window.World = {
    create: function (scene) {
      const objects = [];
      const fireflies = [];

      // Lighting
      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(ambient, dir);

      // Ground
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshStandardMaterial({ color: 0x101622 })
      );
      ground.rotation.x = -Math.PI / 2;
      scene.add(ground);

      // Build each location
      APP_LOCATIONS.forEach((loc) => {
        const group = new THREE.Group();
        group.position.set(loc.position.x, loc.position.y, loc.position.z);

        if (loc.id === "home") {
          const house = createHouse(0x4e73df);
          group.add(house);
          for (let i = 0; i < 6; i++) {
            const tree = createTree();
            tree.position.set((Math.random() - 0.5) * 8, 0, (Math.random() - 0.5) * 8);
            group.add(tree);
          }
          const flies = createFireflies(20, 8);
          group.add(flies);
          fireflies.push(flies);
        }

        if (loc.id === "office") {
          group.add(createOffice());
        }

        if (loc.id === "trading") {
          group.add(createTrading());
        }

        if (loc.id === "outdoors") {
          group.add(createOutdoors());
        }

        if (loc.id === "backyard") {
          group.add(createBackyard());
        }

        if (loc.id === "connect") {
          group.add(createMailbox());
        }

        scene.add(group);
        objects.push(group);
      });

      return {
        update: function (elapsed) {
          fireflies.forEach((group) => {
            group.children.forEach((fly, idx) => {
              fly.position.y = 1.5 + Math.sin(elapsed * fly.userData.speed + idx) * 0.6;
            });
          });
        }
      };
    }
  };
})();
