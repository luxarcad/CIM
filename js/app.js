document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector("button[type='submit']");
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";

        try {
            const response = await fetch("send-form.php", {
                method: "POST",
                body: new FormData(contactForm)
            });

            const result = await response.json();

            if (result.success) {
                showSuccess();
                contactForm.reset();
            } else {
                showError(result.message || "Error al enviar.");
            }

        } catch (error) {
            console.error(error);
            showError("No se pudo enviar el formulario. Intenta nuevamente.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Enviar mensaje";
        }
    });

    /* ===============================
       SUCCESS ANIMATION
    =============================== */

    function showSuccess() {
        const formBox = document.querySelector(".contact-form");

        if (!formBox || typeof gsap === "undefined") {
            alert("Mensaje enviado correctamente.");
            return;
        }

        gsap.to(formBox, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            onComplete: () => {
                formBox.innerHTML = `
                    <div class="form-feedback success">
                        <div class="icon">✓</div>
                        <h3>Mensaje enviado</h3>
                        <p>Hemos recibido tu solicitud. Te contactaremos pronto.</p>
                    </div>
                `;

                gsap.fromTo(
                    formBox,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6 }
                );
            }
        });
    }

    /* ===============================
       ERROR ANIMATION
    =============================== */

    function showError(message) {
        const formBox = document.querySelector(".contact-form");

        if (!formBox || typeof gsap === "undefined") {
            alert(message);
            return;
        }

        gsap.fromTo(
            formBox,
            { x: -10 },
            {
                x: 10,
                duration: 0.05,
                repeat: 5,
                yoyo: true,
                onComplete: () => {
                    gsap.set(formBox, { x: 0 });
                }
            }
        );
    }

});
