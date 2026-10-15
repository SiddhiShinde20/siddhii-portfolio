// ============================
// 1. TYPING ANIMATION
// ============================

const typingElement = document.getElementById("typing");

const roles = [
    "Software Developer",
    "Web Developer",
    "Java Programmer",
    "Problem Solver"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingElement.textContent =
        currentRole.substring(0, characterIndex);

    let speed = deleting ? 50 : 100;

    if (!deleting && characterIndex === currentRole.length) {

        deleting = true;
        speed = 1200;

    } else if (deleting && characterIndex === 0) {

        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;

    }

    setTimeout(typeEffect, speed);
}

typeEffect();


// ============================
// 2. MOBILE NAVIGATION
// ============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("show");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';

});


// Close menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("show");

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';

    });

});


// ============================
// 3. SCROLL REVEAL ANIMATION
// ============================


const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .about-text, " +
    ".skill-card, .project-card, .certificate-card, " +
    ".timeline-item, .contact-info, .contact-form"
);


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(function (element) {

        observer.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });

}


// ============================
// 4. BACK TO TOP BUTTON
// ============================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        backToTop.style.display = "flex";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ============================
// 5. ACTIVE NAVBAR LINK
// ============================

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveLink() {

    let currentSection = "home";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection = section.id;

        }

    });

    navItems.forEach(function (link) {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );

    });

}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


// ============================
// 6. CONTACT FORM
// ============================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {

        formMessage.textContent = "Please fill in all fields.";
        return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        formMessage.textContent = "Please enter a valid email address.";
        return;

    }

    /*
       Replace this address with  actual email.
       This opens the visitor's default email application.
    */

    const recipient = "shindesiddhi505@gmail.com";

    const mailSubject = encodeURIComponent(subject);

    const mailBody = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    const mailtoLink =
        "mailto:" + recipient +
        "?subject=" + mailSubject +
        "&body=" + mailBody;

    formMessage.textContent =
        "Opening your email application...";

    window.location.href = mailtoLink;

});


// ============================
// 7. AUTOMATIC COPYRIGHT YEAR
// ============================

document.getElementById("year").textContent =
    new Date().getFullYear();