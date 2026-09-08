/* ==============================
   MENU RESPONSIVE & NAV BEHAVIOR
================================ */

document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const header = document.querySelector(".header");

    if (!navToggle || !navMenu) return;

    let menuOpen = false;

    /* ------------------------------
       TOGGLE MENU
    ------------------------------ */
    navToggle.addEventListener("click", () => {
        menuOpen = !menuOpen;

        navMenu.style.transform = menuOpen
            ? "translateX(0)"
            : "translateX(100%)";

        navToggle.innerHTML = menuOpen
            ? `<ion-icon name="close-outline"></ion-icon>`
            : `<ion-icon name="menu-outline"></ion-icon>`;
    });

    /* ------------------------------
       CLOSE MENU ON LINK CLICK
    ------------------------------ */
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (!menuOpen) return;

            menuOpen = false;
            navMenu.style.transform = "translateX(100%)";
            navToggle.innerHTML = `<ion-icon name="menu-outline"></ion-icon>`;
        });
    });

    /* ------------------------------
       NAV SCROLL STATE
       (solo clase, animacion luego)
       (solo clase, animacion luego)
    ------------------------------ */
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("nav-scrolled");
        } else {
            header.classList.remove("nav-scrolled");
        }
    });

    /* ------------------------------
       RESET MENU ON RESIZE
    ------------------------------ */
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            menuOpen = false;
            navMenu.style.transform = "";
            navToggle.innerHTML = `<ion-icon name="menu-outline"></ion-icon>`;
        }
    });
});
