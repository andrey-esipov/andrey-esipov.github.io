(function () {
  function createDots(container, count, onClick) {
    container.innerHTML = "";
    const dots = [];
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      dot.addEventListener("click", () => onClick(i));
      container.appendChild(dot);
      dots.push(dot);
    }
    return dots;
  }

  window.Navigation = {
    init: function (camera, locations, ui) {
      let current = 0;
      let isAnimating = false;

      const dotsContainer = document.getElementById("dots");
      const dots = createDots(dotsContainer, locations.length, (i) => goTo(i));
      const prevBtn = document.getElementById("navPrev");
      const nextBtn = document.getElementById("navNext");

      function updateDots() {
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
      }

      function goTo(index) {
        if (index < 0 || index >= locations.length || index === current || isAnimating) return;
        isAnimating = true;
        ui.fadeOut();

        const loc = locations[index];
        gsap.to(camera.position, {
          x: loc.position.x,
          y: loc.position.y + 4,
          z: loc.position.z + 12,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            camera.lookAt(loc.lookAt.x, loc.lookAt.y + 1.5, loc.lookAt.z);
          },
          onComplete: () => {
            current = index;
            updateDots();
            ui.setChapter(loc);
            ui.fadeIn();
            isAnimating = false;
          }
        });
      }

      function step(dir) {
        goTo(current + dir);
      }

      // Scroll navigation
      let scrollTimeout = null;
      window.addEventListener("wheel", (e) => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => (scrollTimeout = null), 600);
        step(e.deltaY > 0 ? 1 : -1);
      }, { passive: true });

      // Buttons
      prevBtn.addEventListener("click", () => step(-1));
      nextBtn.addEventListener("click", () => step(1));

      // Touch swipe
      let touchStartY = null;
      window.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
      }, { passive: true });
      window.addEventListener("touchend", (e) => {
        if (touchStartY === null) return;
        const endY = e.changedTouches[0].clientY;
        const diff = touchStartY - endY;
        if (Math.abs(diff) > 30) step(diff > 0 ? 1 : -1);
        touchStartY = null;
      }, { passive: true });

      // Init state
      updateDots();
      ui.setChapter(locations[current]);
      camera.position.set(locations[0].position.x, locations[0].position.y + 4, locations[0].position.z + 12);
      camera.lookAt(locations[0].lookAt.x, locations[0].lookAt.y + 1.5, locations[0].lookAt.z);

      return { goTo };
    }
  };
})();
