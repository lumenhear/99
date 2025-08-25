document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- HEADER SCROLL EFFECT ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- SMOOTH SCROLL FOR NAV LINKS ---
    document.querySelectorAll('nav a, .cta-button, .logo').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            gsap.to(window, {
                duration: 1.5,
                scrollTo: targetId,
                ease: 'power2.inOut'
            });
        });
    });

    // --- PARTICLES.JS INITIALIZATION ---
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#1E90FF" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#1E90FF", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });

    // --- GSAP ANIMATIONS ---

    // Hero load animation
    gsap.from('.hero-tagline', { duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 0.5 });
    gsap.from('.cta-button', { duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 0.8 });

    // General section fade-in animations on scroll
    gsap.utils.toArray('.anim-element').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });


    // Service card hover animation
    document.querySelectorAll('.service-card').forEach(card => {
        const description = card.querySelector('.card-description');
        gsap.set(description, { autoAlpha: 0, height: 0, marginTop: 0 });

        const tl = gsap.timeline({ paused: true });
        tl.to(card, { scale: 1.05, duration: 0.3, ease: 'power2.out' })
          .to(description, { height: 'auto', autoAlpha: 1, marginTop: '1rem', duration: 0.4, ease: 'power2.out' }, '-=0.2');

        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
    });

    // --- TESTIMONIAL SLIDER ---
    const wrapper = document.querySelector('.testimonial-wrapper');
    const dots = document.querySelectorAll('.nav-dot');
    let currentIndex = 0;
    
    function updateSlider() {
        gsap.to(wrapper, {
            xPercent: -100 * currentIndex,
            duration: 0.7,
            ease: 'power3.inOut'
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Auto-play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        updateSlider();
    }, 5000);

    // --- CONTACT FORM VALIDATION ---
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reset errors
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));

        // Name validation
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            isValid = false;
        }

        // Email validation
        if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email.');
            isValid = false;
        }
        
        // Phone validation
        if (!/^\d{10}$/.test(phoneInput.value.trim())) {
             showError(phoneInput, 'Please enter a valid 10-digit phone number.');
             isValid = false;
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message cannot be empty.');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate successful submission for static site
            form.style.display = 'none';
            document.getElementById('form-success-message').style.display = 'block';
        }
    });

    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        formGroup.querySelector('.error-message').innerText = message;
    }
});
