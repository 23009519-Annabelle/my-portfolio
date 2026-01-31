/* ==================== 1. CURSOR & POINTER LOGIC ==================== */
// Cursor Safety Net: Add class to indicate JS is running
document.body.classList.add('custom-cursor-active');

const crosshair = document.querySelector('.cursor-crosshair');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    if (crosshair) {
        crosshair.style.left = `${e.clientX}px`;
        crosshair.style.top = `${e.clientY}px`;
        // Force visibility
        crosshair.style.opacity = '1';
    }
});

// Interactive Element Locking (Hover Effects)
const interactiveTargets = document.querySelectorAll('a, button, .project-card, .model-card, input, textarea, .logo, .gallery-item');

interactiveTargets.forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (crosshair) crosshair.classList.add('locked');
    });
    element.addEventListener('mouseleave', () => {
        if (crosshair) crosshair.classList.remove('locked');
    });
});

/* ==================== 2. NAVIGATION & MOBILE MENU ==================== */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navLinks && !e.target.closest('nav')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

/* ==================== 3. PROJECT CARD NAVIGATION ==================== */
// This fixes the "Click Card" issue
document.querySelectorAll('[data-href]').forEach(card => {
    card.addEventListener('click', (e) => {
        // Prevent redirect if clicking a specific button (like "Learn More" or a link)
        if (!e.target.closest('a, button')) {
            const href = card.getAttribute('data-href');
            if (href) {
                window.location.href = href;
            }
        }
    });
});

/* ==================== 4. LIGHTBOX (IMAGE ENLARGER) ==================== */
// Auto-create lightbox if it doesn't exist in HTML
let lightbox = document.getElementById('lightbox');
if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img" alt="">
        <div class="lightbox-caption" id="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);
}

const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

// Select all clickable images (Interests, Gallery, etc.)
const allGalleryImages = document.querySelectorAll('.model-image img, .gallery-item img, .masonry-item img, .project-gallery img');

if (allGalleryImages.length > 0) {
    allGalleryImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop bubble up
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = img.alt || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock scroll
        });
    });
}

// Close Lightbox Logic
function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Unlock scroll
    }
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

/* ==================== 5. 3D TILT EFFECT ==================== */
// This fixes the "Interactions" on cards
const tiltCards = document.querySelectorAll('.project-card, .model-card, .skill-item');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Tilt math
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

/* ==================== 6. SCROLL REVEAL ANIMATION ==================== */
const revealElements = document.querySelectorAll('.reveal-on-scroll');
if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* ==================== 7. VIDEO MODAL (MOBILE APPS) ==================== */
// Fixes video popups
const watchDemoButtons = document.querySelectorAll('.watch-demo-btn, .app-btn');
let videoModal = document.getElementById('videoModal'); // Assuming it exists or we create it

watchDemoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Simple alert if no video modal HTML exists yet
        if (!videoModal) {
            console.log("Video modal HTML missing"); 
            return;
        }
        // Logic to open modal would go here if HTML structure matches
    });
});

/* ==================== 8. FLOATING LIKE BUTTON ==================== */
const likeBtn = document.querySelector('.floating-like-btn');
if (likeBtn) {
    likeBtn.addEventListener('click', function() {
        if (!this.classList.contains('liked')) {
            this.classList.add('liked');
            createConfetti(this.getBoundingClientRect().left, this.getBoundingClientRect().top);
        }
    });
}

function createConfetti(x, y) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        document.body.appendChild(particle);

        // Animate
        const angle = Math.random() * Math.PI * 2;
        const velocity = 30 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], { duration: 800, easing: 'ease-out' }).onfinish = () => particle.remove();
    }
}
