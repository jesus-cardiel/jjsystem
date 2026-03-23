-- Create Database
CREATE DATABASE IF NOT EXISTS jjsystem_db;
USE jjsystem_db;

-- Drop tables if they exist to ensure schema updates
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS portfolio;
DROP TABLE IF EXISTS services;

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    description_en TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL, -- Bootstrap Icon class
    animation_delay INT DEFAULT 0
);

-- Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    category_en VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    project_url VARCHAR(255) DEFAULT '#',
    animation_delay INT DEFAULT 0
);

-- Team Table
CREATE TABLE IF NOT EXISTS team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    role_en VARCHAR(100) NOT NULL,
    bio TEXT NOT NULL,
    bio_en TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    animation_delay INT DEFAULT 0
);

-- Insert Sample Data for Services
INSERT INTO services (title, title_en, description, description_en, icon, animation_delay) VALUES
('Diseño Web', 'Web Design', 'Diseños impresionantes, modernos y responsivos adaptados a tu marca.', 'Creating stunning, modern, and responsive designs tailored to your brand.', 'bi-palette', 100),
('Desarrollo Web', 'Web Development', 'Aplicaciones robustas y escalables usando tecnologías modernas.', 'Building robust and scalable web applications using the latest technologies.', 'bi-code-slash', 200),
('E-commerce', 'E-commerce', 'Tiendas en línea completas con pasarelas de pago seguras.', 'Full-stack online store solutions with secure payment integrations.', 'bi-cart-check', 300),
('SEO', 'SEO Optimization', 'Mejoramos tu visibilidad en buscadores para atraer tráfico orgánico.', 'Increasing your visibility on search engines to drive organic traffic.', 'bi-graph-up-arrow', 400),
('Cloud Hosting', 'Cloud Hosting', 'Servidores rápidos para mantener tu sitio activo 24/7.', 'Reliable and fast hosting services to keep your site running 24/7.', 'bi-cloud-check', 500),
('Mantenimiento', 'Maintenance', 'Soporte constante para asegurar que tu sitio siga funcionando.', 'Continuous updates and support to ensure your website stay secure.', 'bi-gear', 600);

-- Insert Sample Data for Portfolio
INSERT INTO portfolio (title, title_en, category, category_en, image_url, project_url, animation_delay) VALUES
('Proyecto Alpha', 'Project Alpha', 'Diseño Web', 'Web Design', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426', '#', 100),
('E-Store Pro', 'E-Store Pro', 'E-commerce', 'E-commerce', 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=2340', '#', 200),
('Finance App', 'Finance App', 'Desarrollo Web', 'Web Development', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2340', '#', 300),
('Creativ Agency', 'Creativ Agency', 'Branding', 'Branding', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2340', '#', 400),
('Health Portal', 'Health Portal', 'Desarrollo Web', 'Web Development', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=2340', '#', 500),
('Tech Blog', 'Tech Blog', 'Diseño Web', 'Web Design', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2344', '#', 600);

-- Insert Sample Data for Team
INSERT INTO team (name, role, role_en, bio, bio_en, image_url, animation_delay) VALUES
('Ana García', 'Directora Creativa', 'Creative Director', 'Experta en diseño UI/UX y branding estratégico.', 'Expert in UI/UX design and strategic branding.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', 100),
('Carlos Ruiz', 'Lead Developer', 'Lead Developer', 'Arquitecto de soluciones full-stack con 10 años de experiencia.', 'Full-stack solution architect with 10 years of experience.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', 200),
('Elena Soler', 'SEO Specialist', 'SEO Specialist', 'Estratega digital enfocada en posicionamiento orgánico.', 'Digital strategist focused on organic positioning.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', 300);
