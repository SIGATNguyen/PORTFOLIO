// JavaScript ultra-minimaliste pour le portfolio Made Infinity
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter l'élément de texture pour l'effet de grain global
    const textureOverlay = document.createElement('div');
    textureOverlay.className = 'texture-overlay';
    document.body.appendChild(textureOverlay);
    
    // Ajout de la classe vintage-paper aux sections avec fond clair
    document.querySelectorAll('.intro-section, .about-section, .projects-grid-section, .contact-section').forEach(section => {
        section.classList.add('vintage-paper');
    });
    
    // Gestion du chargement des images
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(img => {
        img.onload = function() {
            this.classList.add('loaded');
        };
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
    
    // Navigation fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu mobile simplifié
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Formulaire de contact (traitement de base)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message envoyé avec succès (simulation).');
            this.reset();
        });
    }
});