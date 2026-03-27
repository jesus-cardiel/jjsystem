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

    // Portfolio Gallery Logic
    const galleryModal = document.getElementById('galleryModal');
    const galleryContent = document.getElementById('galleryContent');
    const galleryTitle = document.getElementById('galleryTitle');
    
    if (galleryModal) {
        const modal = new bootstrap.Modal(galleryModal);
        
        document.querySelectorAll('.view-gallery').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const project = btn.getAttribute('data-project');
                
                if (project === 'quiniela' || project === 'gestion_de_informe' || project === 'tickets' || project === 'jjsystem') {
                    const titles = {
                        'quiniela': 'Quiniela - Detalles',
                        'gestion_de_informe': 'Gestión de Informe - Detalles',
                        'tickets': 'Tickets - Detalles',
                        'jjsystem': 'jjsystem - Detalles'
                    };
                    galleryTitle.innerText = titles[project];
                    
                    let images = [];
                    let imgPath = '';
                    
                    if (project === 'quiniela') {
                        images = ['quiniela 1.png', 'quiniela 2.png', 'quiniela 3.png', 'quiniela 4.png', 'quiniela 5.png', 'quiniela.png'];
                        imgPath = 'img/portfolio/quiniela/';
                    } else if (project === 'gestion_de_informe') {
                        images = ['gestion de informe 1.png', 'gestion de informe 2.png', 'gestion de informe 3.png', 'gestion de informe 4.png', 'gestion de informe 5.png', 'gestion_de_informe.png'];
                        imgPath = 'img/portfolio/gestion_de_informe/';
                    } else if (project === 'tickets') {
                        images = ['ticket 1.png', 'ticket 2.png', 'ticket 3.png', 'ticket 4.png', 'tickets.png'];
                        imgPath = 'img/portfolio/tickets/';
                    } else if (project === 'jjsystem') {
                        images = ['jjsystem 2.png', 'jjsystem 3.png', 'jjsystem 4.png', 'jjsystem.png'];
                        imgPath = 'img/portfolio/jjsystem_gallery/';
                    }
                    
                    galleryContent.className = 'gallery-3d-stage';
                    galleryContent.innerHTML = '';
                    images.forEach((img, index) => {
                        const imgWrapper = document.createElement('div');
                        imgWrapper.className = `gallery-3d-item item-${index + 1}`;
                        imgWrapper.innerHTML = `<img src="${imgPath}${img}" alt="${project} ${index + 1}">`;
                        galleryContent.appendChild(imgWrapper);
                    });
                    
                    modal.show();
                    
                    // Mouse tracking for horizontal scroll
                    const handleMouseMove = (e) => {
                        const modalBody = galleryModal.querySelector('.modal-body');
                        const rect = modalBody.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const percentage = x / rect.width;
                        
                        const scrollRange = galleryContent.offsetWidth - rect.width;
                        if (scrollRange > 0) {
                            const translateX = -percentage * scrollRange;
                            galleryContent.style.transform = `translateX(${translateX}px)`;
                        }
                    };
                    
                    galleryModal.querySelector('.modal-body').addEventListener('mousemove', handleMouseMove);
                }
            });
        });
    }

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
