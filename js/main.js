
import { initNavigation } from "./navigation.js";
import { initAnimations } from "./animations.js";
import { initInteractions } from "./interactions.js";

function bootstrapCIM() {
  initNavigation();
  initInteractions();
  initAnimations();

  console.info("CIM 2.0 | Vanilla Experience");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrapCIM, {
    once: true
  });
} else {
  bootstrapCIM();
}
