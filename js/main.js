/* GSAP CINEMATIC ANIMATIONS */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    /* HERO � CINEMATIC REVEAL */
    const heroTl = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: 1,
            clearProps: "all"
        }
    });

    heroTl
        .from(".hero-eyebrow", {
            y: 20,
            opacity: 0
        })
        .from(".hero-title", {
            y: 40,
            opacity: 0
        }, "-=0.6")
        .from(".hero-text", {
            y: 30,
            opacity: 0
        }, "-=0.6")
        .from(".hero-actions a", {
            y: 20,
            opacity: 0,
            stagger: 0.15
        }, "-=0.4")
        .from(".hero-visual", {
            scale: 0.96,
            opacity: 0
        }, "-=0.8");


    /* SECTION TITLES � SCROLL REVEAL */
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%"
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            clearProps: "all"
        });
    });


    /* ABOUT � VALUES STAGGER */
    gsap.from(".value-card", {
        scrollTrigger: {
            trigger: ".about-values",
            start: "top 75%"
        },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all"
    });


    /* SERVICES � PREMIUM STAGGER */
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 75%"
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "all"
    });


    /* FAQ � SUBTLE REVEAL */
    gsap.from(".faq-item", {
        scrollTrigger: {
            trigger: ".faq-list",
            start: "top 80%"
        },
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        clearProps: "all"
    });


    /* CONTACT � SPLIT ENTRANCE */
    gsap.from(".contact-info", {
        scrollTrigger: {
            trigger: ".contact",
            start: "top 75%"
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "all"
    });

    gsap.from(".contact-form", {
        scrollTrigger: {
            trigger: ".contact",
            start: "top 75%"
        },
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "all"
    });


    /* NAV � SCROLL POLISH */
    gsap.to(".header", {
        scrollTrigger: {
            start: 100,
            toggleActions: "play none none reverse"
        },
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        duration: 0.4,
        ease: "power1.out",
        clearProps: "all"
    });


    /* MICRO INTERACTIONS � HOVER */
    gsap.utils.toArray(".service-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                y: -6,
                duration: 0.3,
                ease: "power2.out",
                clearProps: "all"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                clearProps: "all"
            });
        });
    });

});

/* LOADER SEQUENCE */
const loaderTl = gsap.timeline({
    defaults: { ease: "power3.inOut" }
});

loaderTl
    .from(".loader-content img", {
        y: 20,
        opacity: 0,
        duration: 1
    })
    .from(".loader-content span", {
        y: 10,
        opacity: 0,
        duration: 0.6
    }, "-=0.6")
    .to(".loader-mask", {
        scaleY: 0,
        duration: 1.2,
        delay: 0.4
    })
    .to(".loader", {
        opacity: 0,
        duration: 0.4,
        pointerEvents: "none"
    }, "-=0.4")
    .set(".loader", {
        display: "none"
    });

/* GOLD SCROLL HIGHLIGHTS */
gsap.utils.toArray(".section-highlight").forEach(section => {
    const highlight = section.querySelector("::before");

    gsap.fromTo(section, {},
        {
            scrollTrigger: {
                trigger: section,
                start: "top 60%",
                end: "bottom 40%",
                onEnter: () => {
                    gsap.to(section, {
                        "--goldHeight": "120px"
                    });
                }
            }
        }
    );

    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 65%"
        },
        "--goldHeight": "0px"
    });
});


//Lightbox
document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".podcast-card");
    const lightbox = document.getElementById("podcastLightbox");
    const lightboxVideo = document.querySelector(".lightbox-video");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxDescription = document.getElementById("lightboxDescription");
    const visitFacebook = document.getElementById("visitFacebook");
    const closeBtn = document.querySelector(".lightbox-close");
    const overlay = document.querySelector(".lightbox-overlay");
    const shareBtn = document.getElementById("shareBtn");

    cards.forEach(card => {
        const overlay = card.querySelector(".podcast-overlay");

        overlay.addEventListener("click", () => {

            const title = card.dataset.title;
            const description = card.dataset.description;
            const url = card.dataset.url;
            const embed = card.dataset.embed;

            lightboxVideo.innerHTML = `
                <iframe src="${embed}" allowfullscreen></iframe>
            `;

            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            visitFacebook.href = url;

            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightboxVideo.innerHTML = "";
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", closeLightbox);

    shareBtn.addEventListener("click", () => {
        const shareUrl = visitFacebook.href;

        if (navigator.share) {
            navigator.share({
                title: lightboxTitle.textContent,
                url: shareUrl
            });
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert("Enlace copiado al portapapeles");
        }
    });

});
