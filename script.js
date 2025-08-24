// Particles background
particlesJS("particles-js", {
  particles: {
    number: { value: 50 },
    size: { value: 3 },
    move: { speed: 1 }
  }
});

// Testimonials carousel
let current = 0;
const slides = document.querySelectorAll(".slide");
setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 4000);

// Contact form validation
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
});
