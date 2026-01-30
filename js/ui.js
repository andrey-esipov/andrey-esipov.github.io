(function () {
  function setLinks(container, links) {
    container.innerHTML = "";
    if (!links || !links.length) return;
    links.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      container.appendChild(a);
    });
  }

  window.UI = {
    init: function () {
      return {
        titleEl: document.getElementById("chapterTitle"),
        subtitleEl: document.getElementById("chapterSubtitle"),
        descEl: document.getElementById("chapterDescription"),
        linksEl: document.getElementById("chapterLinks"),
        overlay: document.getElementById("overlay"),
        setChapter: function (loc) {
          this.titleEl.textContent = loc.title;
          this.subtitleEl.textContent = loc.subtitle || "";
          this.descEl.textContent = loc.description || "";
          setLinks(this.linksEl, loc.links);
        },
        fadeOut: function () {
          gsap.to(this.overlay, { opacity: 0, duration: 0.3 });
        },
        fadeIn: function () {
          gsap.to(this.overlay, { opacity: 1, duration: 0.3 });
        }
      };
    }
  };
})();
