
export function initAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (!gsap || !ScrollTrigger) {
    console.warn("GSAP o ScrollTrigger no están disponibles.");
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  // Primera secuencia: Hero
  const heroTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  heroTimeline
    .from(".hero-kicker", {
      opacity: 0,
      y: 20,
      duration: 0.7
    })
    .from(".hero-title", {
      opacity: 0,
      y: 55,
      duration: 1.15
    }, "-=0.35")
    .from(".hero-description", {
      opacity: 0,
      y: 25,
      duration: 0.85
    }, "-=0.65")
    .from(".hero-actions", {
      opacity: 0,
      y: 20,
      duration: 0.75
    }, "-=0.5")
    .from(".hero-media", {
      opacity: 0,
      x: 55,
      duration: 1.2
    }, "-=1.15")
    .from(".hero-bottom", {
      opacity: 0,
      duration: 0.8
    }, "-=0.6");

  // Entrada de secciones al hacer scroll
  const revealElements = gsap.utils.toArray(".reveal");

  revealElements.forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 45,
      duration: 0.95,
      ease: "power2.out",

      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true
      },

      onComplete: () => {
        gsap.set(element, {
          clearProps: "transform"
        });
      }
    });
  });
}
