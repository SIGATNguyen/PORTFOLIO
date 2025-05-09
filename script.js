// JavaScript amélioré pour le portfolio Made Infinity
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter l'élément de texture pour l'effet de grain global
    const textureOverlay = document.createElement('div');
    textureOverlay.className = 'texture-overlay';
    document.body.appendChild(textureOverlay);
    
    // Ajout de la classe vintage-paper aux sections avec fond clair
    document.querySelectorAll('.intro-section, .projects-grid-section, .contact-section').forEach(section => {
        section.classList.add('vintage-paper');
    });
    
    // Gestion du chargement des images avec lazy loading
    const lazyLoad = target => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.onload = () => img.classList.add('loaded');
                    observer.disconnect();
                }
            });
        });

        io.observe(target);
    };

    // Application du lazy loading aux images
    document.querySelectorAll('.project-image').forEach(img => {
        if (!img.classList.contains('loaded')) {
            lazyLoad(img);
        }
    });
    
    // Indicateur de défilement de page
    window.addEventListener('scroll', () => {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;
        
        document.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
        
        // Effet parallaxe pour les éléments qui le supportent
        const scrolled2 = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = 0.05;
            element.style.transform = `translateY(${scrolled2 * speed}px)`;
        });
    });
    
    // Navigation fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile après un clic sur un lien
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.mobile-menu-toggle').classList.remove('active');
            }
        });
    });
    
    // Animation de comptage pour les statistiques
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000; // ms
        const step = 50; // ms
        const increment = target / (duration / step);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            el.textContent = Math.floor(current);
            
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            }
        }, step);
    }
    
    // Observer pour déclencher l'animation des compteurs lorsqu'ils sont visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-number').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Menu mobile simplifié et amélioré
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Fermer le menu mobile lors du clic en dehors
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
    
    // Filtrage des projets
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mise à jour des boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrage des projets
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // Amélioration de l'accessibilité
    document.querySelectorAll('a, button, input, textarea').forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
    
    // Vérification des liens vides pour l'accessibilité
    document.querySelectorAll('a').forEach(link => {
        if (link.textContent.trim() === '' && !link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', 'Lien sans texte');
        }
    });
    
    // Formulaire de contact amélioré avec validation et animation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                message: this.querySelector('#message').value
            };
            
            // Validation basique
            let isValid = true;
            let errorMessage = '';
            
            if (!formData.name.trim()) {
                isValid = false;
                errorMessage = 'Veuillez entrer votre nom.';
            } else if (!formData.email.trim() || !formData.email.includes('@')) {
                isValid = false;
                errorMessage = 'Veuillez entrer une adresse email valide.';
            } else if (!formData.message.trim()) {
                isValid = false;
                errorMessage = 'Veuillez entrer un message.';
            }
            
            if (!isValid) {
                // Création d'un message d'erreur si non existant
                let errorElement = document.querySelector('.form-error');
                if (!errorElement) {
                    errorElement = document.createElement('div');
                    errorElement.className = 'form-error';
                    errorElement.style.color = '#ff6b6b';
                    errorElement.style.marginBottom = '15px';
                    errorElement.style.fontFamily = 'DM Mono, monospace';
                    errorElement.style.fontSize = '0.85rem';
                    contactForm.prepend(errorElement);
                }
                errorElement.textContent = errorMessage;
                
                // Animation de secousse sur le formulaire
                contactForm.classList.add('shake');
                setTimeout(() => {
                    contactForm.classList.remove('shake');
                }, 500);
                
                return;
            }
            
            // Animation de chargement
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulation d'envoi (à remplacer par un véritable appel AJAX)
            setTimeout(() => {
                // Succès
                submitBtn.textContent = 'Envoyé ✓';
                
                // Masquer le message d'erreur s'il existe
                const errorElement = document.querySelector('.form-error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
                
                // Animation de succès
                contactForm.classList.add('success');
                
                // Réinitialisation du formulaire
                this.reset();
                
                // Rétablir le bouton après 3 secondes
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    contactForm.classList.remove('success');
                }, 3000);
            }, 1500);
        });
    }
    
    // Ajout de styles CSS dynamiques pour les animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s;
        }
        
        .success {
            position: relative;
        }
        
        .success::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background-color: #4CAF50;
            animation: expandWidth 0.5s ease forwards;
        }
        
        @keyframes expandWidth {
            0% { width: 0; }
            100% { width: 100%; }
        }
    `;
    document.head.appendChild(style);
    
    // Effet de révélation des sections au scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal-section');
        revealObserver.observe(section);
    });
    
    // Ajout de styles pour l'animation de révélation des sections
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .reveal-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyle);
});

// Améliorations JavaScript pour la section de projets modernisée
document.addEventListener('DOMContentLoaded', () => {
    // Animation progressive des cartes de projet au chargement initial
    const projectCards = document.querySelectorAll('.project-card-modern');
    
    // Observer pour l'animation des cartes au défilement
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                projectObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initialiser chaque carte avec animation en pause
    projectCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        projectObserver.observe(card);
    });
    
    // Amélioration du filtrage avec animation fluide
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mise à jour des boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrage des projets avec animation
            const filterValue = button.getAttribute('data-filter');
            
            // Compteur de projets visibles
            let visibleCount = 0;
            
            projectCards.forEach(card => {
                // Réinitialiser l'animation pour permettre plusieurs filtrages
                card.style.animation = 'none';
                card.offsetHeight; // Force reflow pour réinitialiser l'animation
                
                // Déterminer si la carte doit être visible ou cachée
                const isVisible = filterValue === 'all' || card.getAttribute('data-category').includes(filterValue);
                
                if (isVisible) {
                    card.classList.remove('hidden');
                    // Réappliquer l'animation avec délai croissant
                    card.style.animation = `fadeInUp 0.5s ease forwards ${visibleCount * 0.1}s`;
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // Animation de survol améliorée pour les cartes de projet
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        
        // Effet parallaxe subtil sur l'image au survol
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            image.style.transform = `scale(1.08) translate(${x * 10}px, ${y * 10}px)`;
        });
        
        // Réinitialiser la position de l'image quand la souris quitte la carte
        card.addEventListener('mouseleave', () => {
            image.style.transform = '';
        });
    });
    
    // Lazy loading amélioré pour les images de projet
    const lazyLoadProjectImages = () => {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        
                        img.onload = () => {
                            img.classList.add('loaded');
                            // Ajouter une classe pour indiquer que l'image est chargée
                            img.closest('.project-card-modern').classList.add('image-loaded');
                        };
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px' // Précharger les images avant qu'elles n'entrent dans la fenêtre
        });
        
        document.querySelectorAll('.project-card-modern .project-image').forEach(img => {
            if (!img.classList.contains('loaded')) {
                imageObserver.observe(img);
            }
        });
    };
    
    // Initialiser le lazy loading
    lazyLoadProjectImages();
    
    // Animation du bouton "Voir plus"
    const moreButton = document.querySelector('.projects-more-btn');
    if (moreButton) {
        moreButton.addEventListener('mouseenter', () => {
            moreButton.querySelector('.arrow').style.transform = 'translateX(5px)';
        });
        
        moreButton.addEventListener('mouseleave', () => {
            moreButton.querySelector('.arrow').style.transform = '';
        });
    }
});

// Gestion de la modal pour les projets
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalTech = document.getElementById('modal-tech');
    const closeBtn = document.querySelector('.modal-close');
    
    // Ajouter des gestionnaires d'événements à toutes les cartes de projet
    document.querySelectorAll('.project-card-modern').forEach(card => {
        // Rendre toute la carte cliquable pour ouvrir la modal
        card.addEventListener('click', function(e) {
            // Ne pas déclencher si on clique sur le lien externe
            if (e.target.closest('.project-link')) {
                return;
            }
            
            // Récupérer les données du projet
            const title = this.querySelector('.project-title').textContent;
            const description = this.querySelector('.project-description').textContent;
            const image = this.querySelector('.project-image').src;
            
            // Récupérer les technologies
            const techPills = this.querySelectorAll('.tech-pill');
            const techList = Array.from(techPills).map(pill => pill.textContent);
            
            // Remplir la modal avec les données du projet
            modalTitle.textContent = title;
            modalDesc.textContent = description;
            modalImg.src = image;
            modalImg.alt = title;
            
            // Créer les pills de technologie
            modalTech.innerHTML = '';
            techList.forEach(tech => {
                const pill = document.createElement('span');
                pill.className = 'tech-pill';
                pill.textContent = tech.trim();
                modalTech.appendChild(pill);
            });
            
            // Ouvrir la modal
            modal.classList.add('open');
            document.body.classList.add('modal-open');
        });
    });
    
    // Fermer la modal lorsqu'on clique sur le bouton de fermeture
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    });
    
    // Fermer la modal lorsqu'on clique en dehors du contenu
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    });
    
    // Fermer la modal avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    });
});


// Animation des compteurs dans la section compétences
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // ms
        const step = 30; // ms
        const increment = target / (duration / step);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, step);
    });
}

// Observer pour déclencher l'animation lorsque la section est visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Surveiller la section compétences
document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
});

// Gestion des clics sur le logo pour remonter en haut de page avec défilement fluide
document.querySelectorAll('.logo a, .footer-logo a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
