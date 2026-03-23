document.addEventListener('DOMContentLoaded', () => {
    // Magnetic Buttons Effect
    const magneticElements = document.querySelectorAll('.btn-primary-custom, .btn-outline-light');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0, 0)`;
        });
    });

    // Typed.js for Hero Section
    new Typed('#typed-text', {
        strings: typeof typedStrings !== 'undefined' ? typedStrings : ['...'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'shadow-lg');
            navbar.style.background = 'rgba(10, 11, 30, 0.95)';
        } else {
            navbar.classList.remove('py-2', 'shadow-lg');
            navbar.style.background = 'rgba(10, 11, 30, 0.8)';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Preloader Logic
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.classList.add('loaded');
            // Initialize AOS after preloader
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        }, 1000);
    });
});
