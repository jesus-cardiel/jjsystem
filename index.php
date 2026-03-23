<?php
session_start();
require_once 'db.php';

// Manejo de idioma
if (isset($_GET['lang'])) {
    $_SESSION['lang'] = $_GET['lang'] == 'en' ? 'en' : 'es';
}
$lang = isset($_SESSION['lang']) ? $_SESSION['lang'] : 'es';

// Traducciones de textos estáticos
$texts = [
    'es' => [
        'title' => 'jjsystem | Innovación en Desarrollo Web',
        'nav_home' => 'Inicio',
        'nav_services' => 'Servicios',
        'nav_portfolio' => 'Portafolio',
        'nav_team' => 'Equipo',
        'nav_contact' => 'Contacto',
        'hero_title' => 'Impulsamos tu <br><span class="gradient-text">Presencia Digital</span>',
        'hero_subtitle' => 'Expertos en ',
        'hero_desc' => 'En jjsystem creamos experiencias web innovadoras, interactivas y escalables para hacer crecer tu negocio.',
        'btn_start' => 'Empezar Proyecto',
        'btn_view_portfolio' => 'Ver Portafolio',
        'section_services' => 'Nuestros Servicios',
        'section_team' => 'Nuestro Equipo',
        'section_portfolio' => 'Proyectos Recientes',
        'btn_view_project' => 'Ver Proyecto',
        'contact_title' => '¿Tienes un proyecto en mente?',
        'contact_desc' => 'Hablemos sobre cómo podemos ayudarte a llevar tus ideas al siguiente nivel.',
        'placeholder_name' => 'Nombre',
        'placeholder_email' => 'Email',
        'placeholder_message' => 'Mensaje',
        'btn_send' => 'Enviar Mensaje',
        'footer_rights' => 'Todos los derechos reservados.',
        'faq_title' => 'Preguntas Frecuentes',
        'q1' => '¿Qué servicios ofrecen?',
        'a1' => 'Ofrecemos desarrollo web a medida, diseño UI/UX, comercio electrónico, optimización SEO y hosting administrado.',
        'q2' => '¿Cuánto tiempo toma un proyecto?',
        'a2' => 'El tiempo varía según la complejidad. Una web informativa toma 2-3 semanas, mientras que un e-commerce complejo puede tomar 4-8 semanas.',
        'q3' => '¿Ofrecen soporte post-lanzamiento?',
        'a3' => 'Sí, todos nuestros proyectos incluyen soporte técnico y mantenimiento para asegurar que tu sitio funcione correctamente.',
        'lang_toggle' => $lang == 'es' ? '<img src="https://flagcdn.com/w40/us.png" class="flag-icon" alt="US"> English' : '<img src="https://flagcdn.com/w40/ve.png" class="flag-icon" alt="VE"> Español'
    ],
    'en' => [
        'title' => 'jjsystem | Web Development Innovation',
        'nav_home' => 'Home',
        'nav_services' => 'Services',
        'nav_portfolio' => 'Portfolio',
        'nav_team' => 'Team',
        'nav_contact' => 'Contact',
        'hero_title' => 'Boosting your <br><span class="gradient-text">Digital Presence</span>',
        'hero_subtitle' => 'Experts in ',
        'hero_desc' => 'At jjsystem we create innovative, interactive, and scalable web experiences to grow your business.',
        'btn_start' => 'Start Project',
        'btn_view_portfolio' => 'View Portfolio',
        'section_services' => 'Our Services',
        'section_team' => 'Our Team',
        'section_portfolio' => 'Recent Projects',
        'btn_view_project' => 'View Project',
        'contact_title' => 'Have a project in mind?',
        'contact_desc' => "Let's talk about how we can help you take your ideas to the next level.",
        'placeholder_name' => 'Name',
        'placeholder_email' => 'Email',
        'placeholder_message' => 'Message',
        'btn_send' => 'Send Message',
        'footer_rights' => 'All rights reserved.',
        'faq_title' => 'Frequently Asked Questions',
        'q1' => 'What services do you offer?',
        'a1' => 'We offer custom web development, UI/UX design, e-commerce, SEO optimization, and managed hosting.',
        'q2' => 'How long does a project take?',
        'a2' => 'Time varies by complexity. A standard website takes 2-3 weeks, while a complex e-commerce project can take 4-8 weeks.',
        'q3' => 'Do you offer post-launch support?',
        'a3' => 'Yes, all our projects include technical support and maintenance to ensure your site runs smoothly.',
        'lang_toggle' => $lang == 'es' ? '<img src="https://flagcdn.com/w40/us.png" class="flag-icon" alt="US"> English' : '<img src="https://flagcdn.com/w40/ve.png" class="flag-icon" alt="VE"> Español'
    ]
];

$t = $texts[$lang];

// Fetch Services (dinámico según idioma)
$title_col = $lang == 'en' ? 'title_en' : 'title';
$desc_col = $lang == 'en' ? 'description_en' : 'description';
$stmt_services = $pdo->query("SELECT id, icon, animation_delay, $title_col as title, $desc_col as description FROM services ORDER BY id ASC");
$services = $stmt_services->fetchAll();

// Fetch Portfolio (dinámico según idioma)
$cat_col = $lang == 'en' ? 'category_en' : 'category';
$stmt_portfolio = $pdo->query("SELECT id, image_url, project_url, animation_delay, $title_col as title, $cat_col as category FROM portfolio ORDER BY id ASC");
$portfolio = $stmt_portfolio->fetchAll();

// Fetch Team (dinámico según idioma)
$role_col = $lang == 'en' ? 'role_en' : 'role';
$bio_col = $lang == 'en' ? 'bio_en' : 'bio';
$stmt_team = $pdo->query("SELECT name, image_url, animation_delay, $role_col as role, $bio_col as bio FROM team ORDER BY id ASC");
$team = $stmt_team->fetchAll();
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $t['title'] ?></title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <!-- AOS CSS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Preloader -->
    <div id="preloader">
        <div class="loader-content">
            <div class="loader-logo">jjsystem</div>
            <div class="loader-line"></div>
        </div>
    </div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top transition">
        <div class="container">
            <a class="navbar-brand" href="#">jjsystem</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#inicio"><?= $t['nav_home'] ?></a></li>
                    <li class="nav-item"><a class="nav-link" href="#servicios"><?= $t['nav_services'] ?></a></li>
                    <li class="nav-item"><a class="nav-link" href="#portafolio"><?= $t['nav_portfolio'] ?></a></li>
                    <li class="nav-item"><a class="nav-link" href="#equipo"><?= $t['nav_team'] ?></a></li>
                    <li class="nav-item"><a class="nav-link" href="#contacto"><?= $t['nav_contact'] ?></a></li>
                    <li class="nav-item ms-lg-3">
                        <a class="nav-link btn btn-outline-purple btn-sm rounded-pill px-3" href="?lang=<?= $lang == 'es' ? 'en' : 'es' ?>">
                            <?= $t['lang_toggle'] ?>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <section id="inicio" class="hero-section">
        <div class="hero-gradient"></div>
        <div class="hero-blob" style="top: 20%; left: 10%;"></div>
        <div class="hero-blob" style="bottom: 10%; right: 20%;"></div>
        <div class="container">
            <div class="row align-items-center justify-content-center">
                <div class="col-lg-6" data-aos="fade-right">
                    <h1 class="mb-4"><?= $t['hero_title'] ?></h1>
                    <h3 class="h2 mb-4"><?= $t['hero_subtitle'] ?><span id="typed-text" class="text-white"></span></h3>
                    <p class="lead hero-description mb-5"><?= $t['hero_desc'] ?></p>
                    <div class="d-flex gap-3">
                        <a href="#contacto" class="btn btn-primary-custom"><?= $t['btn_start'] ?></a>
                        <a href="#portafolio" class="btn btn-outline-light rounded-pill px-4"><?= $t['btn_view_portfolio'] ?></a>
                    </div>
                </div>
                <div class="col-lg-6 d-none d-lg-block" data-aos="zoom-in" data-aos-delay="200">
                    <div class="hero-img-container">
                        <img src="hero-illustration.png" alt="Innovation" class="img-fluid hero-img-interactive">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="servicios" class="py-5">
        <div class="container py-5">
            <h2 class="section-title" data-aos="fade-up"><?= $t['section_services'] ?></h2>
            <div class="row g-4">
                <?php foreach ($services as $service): ?>
                    <div class="col-md-4" data-aos="fade-up" data-aos-delay="<?= $service['animation_delay'] ?>">
                        <div class="glass-card p-5 h-100 text-center">
                            <i class="bi <?= $service['icon'] ?> display-3 gradient-text mb-4"></i>
                            <h4 class="mb-3"><?= htmlspecialchars($service['title']) ?></h4>
                            <p class="service-desc"><?= htmlspecialchars($service['description']) ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portafolio" class="py-5 bg-black bg-opacity-25">
        <div class="container py-5">
            <h2 class="section-title" data-aos="fade-up"><?= $t['section_portfolio'] ?></h2>
            <div class="row g-4">
                <?php foreach ($portfolio as $item): ?>
                    <div class="col-md-4" data-aos="zoom-in" data-aos-delay="<?= $item['animation_delay'] ?>">
                        <div class="portfolio-item glass-card">
                            <img src="<?= $item['image_url'] ?>" alt="<?= htmlspecialchars($item['title']) ?>" class="img-fluid portfolio-img" referrerpolicy="no-referrer">
                            <div class="portfolio-overlay">
                                <span class="badge bg-purple mb-2"><?= htmlspecialchars($item['category']) ?></span>
                                <h4 class="mb-3"><?= htmlspecialchars($item['title']) ?></h4>
                                <a href="<?= $item['project_url'] ?>" class="btn btn-sm btn-outline-light rounded-pill"><?= $t['btn_view_project'] ?></a>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Team Section -->
    <section id="equipo" class="py-5">
        <div class="container py-5">
            <h2 class="section-title" data-aos="fade-up"><?= $t['section_team'] ?></h2>
            <div class="row g-4">
                <?php foreach ($team as $member): ?>
                    <div class="col-md-4" data-aos="fade-up" data-aos-delay="<?= $member['animation_delay'] ?>">
                        <div class="team-item">
                            <div class="team-card-inner">
                                <!-- Parte Frontal: Foto y Especialidad -->
                                <div class="team-card-front">
                                    <div class="team-img-container mb-3">
                                        <img src="<?= $member['image_url'] ?>" alt="<?= htmlspecialchars($member['name']) ?>" class="img-fluid team-img">
                                    </div>
                                    <p class="badge bg-purple mb-0 fs-5"><?= htmlspecialchars($member['role']) ?></p>
                                </div>
                                <!-- Parte Trasera: Nombre y Explicación -->
                                <div class="team-card-back">
                                    <h4 class="mb-3 gradient-text"><?= htmlspecialchars($member['name']) ?></h4>
                                    <div class="w-100 px-3">
                                        <p class="service-desc fs-6 mb-0"><?= htmlspecialchars($member['bio']) ?></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-5 bg-black bg-opacity-10">
        <div class="container py-5">
            <h2 class="section-title" data-aos="fade-up"><?= $t['faq_title'] ?></h2>
            <div class="row justify-content-center">
                <div class="col-lg-8" data-aos="fade-up">
                    <div class="accordion" id="faqAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                    <?= $t['q1'] ?>
                                </button>
                            </h2>
                            <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    <?= $t['a1'] ?>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                    <?= $t['q2'] ?>
                                </button>
                            </h2>
                            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    <?= $t['a2'] ?>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                    <?= $t['q3'] ?>
                                </button>
                            </h2>
                            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">
                                    <?= $t['a3'] ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contacto" class="py-5">
        <div class="container py-5">
            <div class="glass-card p-5" data-aos="flip-left">
                <div class="row">
                    <div class="col-lg-6">
                        <h2 class="mb-4"><?= $t['contact_title'] ?></h2>
                        <p class="lead contact-desc mb-5"><?= $t['contact_desc'] ?></p>
                        <div class="d-flex align-items-center mb-3">
                            <i class="bi bi-envelope-fill gradient-text fs-4 me-3"></i>
                            <span>hola@jjsystem.com</span>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="bi bi-geo-alt-fill gradient-text fs-4 me-3"></i>
                            <span>Ciudad Creative, Tech District</span>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <form id="contactForm">
                            <div class="mb-3">
                                <input type="text" class="form-control bg-dark border-secondary text-white" placeholder="<?= $t['placeholder_name'] ?>" required>
                            </div>
                            <div class="mb-3">
                                <input type="email" class="form-control bg-dark border-secondary text-white" placeholder="<?= $t['placeholder_email'] ?>" required>
                            </div>
                            <div class="mb-3">
                                <textarea class="form-control bg-dark border-secondary text-white" rows="4" placeholder="<?= $t['placeholder_message'] ?>" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary-custom w-100"><?= $t['btn_send'] ?></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="text-center">
        <div class="container">
            <div class="mb-4">
                <a href="#" class="navbar-brand">jjsystem</a>
            </div>
            <div class="social-links mb-4">
                <a href="#" class="text-white mx-2 fs-4"><i class="bi bi-linkedin"></i></a>
                <a href="#" class="text-white mx-2 fs-4"><i class="bi bi-github"></i></a>
                <a href="#" class="text-white mx-2 fs-4"><i class="bi bi-twitter-x"></i></a>
            </div>
            <p class="service-desc">&copy; <?= date('Y') ?> jjsystem. <?= $t['footer_rights'] ?></p>
        </div>
    </footer>

    <!-- Scripts -->
    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- AOS JS -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <!-- Typed.js -->
    <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
    <!-- Custom JS -->
    <!-- Custom JS Config -->
    <script>
        const typedStrings = <?= json_encode($lang == 'es' 
            ? ['Desarrollo Web', 'Soluciones Digitales', 'Apps a Medida', 'E-commerce Pro'] 
            : ['Web Development', 'Digital Solutions', 'Custom Apps', 'E-commerce Pro']) ?>;
    </script>
    </script>

    <script src="script.js"></script>
</body>
</html>
