
export function initNavigation() {
  const header = document.getElementById("site-header");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-main-nav]");

  if (!header || !menuToggle || !navigation) return;

  function setMenuState(isOpen) {
    navigation.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
  }

  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    setMenuState(!isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  document.addEventListener("click", (event) => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    if (
      isOpen &&
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      setMenuState(false);
    }
  });

  function updateHeader() {
    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 20
    );
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();
}
