(function () {
  function webglAvailable() {
    try {
      const canvas = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
    } catch (e) {
      return false;
    }
  }

  function init() {
    console.log("[Init] Starting 3D world");

    if (!webglAvailable()) {
      document.getElementById("fallback").classList.remove("hidden");
      console.log("[Init] WebGL not supported");
      return;
    }

    const canvas = document.getElementById("world");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b1020, 10, 180);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 300);

    const world = World.create(scene);
    const ui = UI.init();
    Navigation.init(camera, APP_LOCATIONS, ui);

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();
    function animate() {
      const elapsed = clock.getElapsedTime();
      world.update(elapsed);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }

  try {
    document.addEventListener("DOMContentLoaded", init);
  } catch (err) {
    console.error("[Init] Error", err);
  }
})();
