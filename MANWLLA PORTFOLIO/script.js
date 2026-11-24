"use strict";

/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
});


/* Close mobile menu after selecting a section */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    });

});


/* =========================
   THEME TOGGLE
========================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute(
        "data-theme",
        "dark"
    );

    themeToggle.textContent = "☀️";

    themeToggle.setAttribute(
        "aria-label",
        "Switch to light theme"
    );
}


themeToggle.addEventListener("click", () => {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const isDark = currentTheme === "dark";

    if (isDark) {

        document.documentElement.removeAttribute(
            "data-theme"
        );

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark theme"
        );

    } else {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light theme"
        );
    }

});


/* =========================
   SKILLS TOGGLES
========================= */

const skillToggles =
    document.querySelectorAll(".skill-toggle");


skillToggles.forEach((button) => {

    button.addEventListener("click", () => {

        const targetId =
            button.getAttribute("aria-controls");

        const content =
            document.getElementById(targetId);

        const isExpanded =
            button.getAttribute("aria-expanded") === "true";

        button.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        content.hidden = isExpanded;

        const icon =
            button.querySelector("span:last-child");

        if (icon) {
            icon.textContent = isExpanded
                ? "+"
                : "−";
        }

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    observer.observe(element);

});


/* =========================
   CONTACT FORM VALIDATION
========================= */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name");

    const email =
        document.getElementById("email");

    const message =
        document.getElementById("message");

    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const messageError =
        document.getElementById("messageError");


    /* Clear previous errors */

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";


    let isValid = true;


    /* Name */

    if (name.value.trim().length < 2) {

        nameError.textContent =
            "Please enter your name.";

        isValid = false;

    }


    /* Email */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;

    }


    /* Message */

    if (message.value.trim().length < 10) {

        messageError.textContent =
            "Message should be at least 10 characters.";

        isValid = false;

    }


    if (!isValid) {

        formStatus.textContent =
            "Please fix the errors above.";

        return;
    }


    /*
        MVP behavior:
        This form does not send an actual email.
        A backend or form service can be connected later.
    */

    formStatus.textContent =
        "Thank you! Your message is ready to be sent.";

    contactForm.reset();

});


/* =========================
   CURRENT YEAR
========================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();