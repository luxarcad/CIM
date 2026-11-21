
export function initInteractions() {
  updateFooterYear();
  initSectionObserver();
}

function updateFooterYear() {
  const yearElement = document.getElementById("current-year");

  if (!yearElement) return;

  yearElement.textContent = new Date().getFullYear();
}

function initSectionObserver() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(
    '.nav-link[href^="#"]'
  );

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeId = entry.target.id;

        links.forEach((link) => {
          const isActive =
            link.getAttribute("href") === `#${activeId}`;

          link.classList.toggle("is-active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}
