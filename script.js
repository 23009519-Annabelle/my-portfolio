// FPS Crosshair Cursor
const crosshair = document.querySelector('.cursor-crosshair');

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    if (crosshair) {
        crosshair.style.left = `${e.clientX}px`;
        crosshair.style.top = `${e.clientY}px`;
    }
});

// Target locking on interactive elements
const targetElements = document.querySelectorAll('a, button, .project-card, .model-card, input, textarea, .logo');

targetElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (crosshair) {
            crosshair.classList.add('locked');
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (crosshair) {
            crosshair.classList.remove('locked');
        }
    });
});

// Hide crosshair when leaving window
document.addEventListener('mouseleave', () => {
    if (crosshair) crosshair.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    if (crosshair) crosshair.style.opacity = '1';
});

// 2. Mobile Menu Logic - Hamburger Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        // Toggle active class on both hamburger and nav-links
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a nav link (better UX on mobile)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navLinks) {
        if (!e.target.closest('nav')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});

// Video Modal for Mobile App Demos
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoModalClose = document.querySelector('.video-modal-close');
const watchDemoButtons = document.querySelectorAll('.watch-demo-btn');

if (watchDemoButtons.length > 0) {
    watchDemoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const videoSrc = button.getAttribute('data-video');
            if (videoModal && modalVideo && videoSrc) {
                modalVideo.src = videoSrc;
                videoModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                document.body.classList.add('modal-active');
                modalVideo.play();
            }
        });
    });
}

// Close video modal
if (videoModalClose) {
    videoModalClose.addEventListener('click', () => {
        if (videoModal && modalVideo) {
            videoModal.style.display = 'none';
            modalVideo.pause();
            modalVideo.src = '';
            document.body.style.overflow = 'auto';
            document.body.classList.remove('modal-active');
        }
    });
}

// Close video modal when clicking outside
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.src = '';
            }
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.classList.remove('modal-active');
        }
    });
}

// Close video modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.style.display === 'flex') {
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.src = '';
        }
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-active');
    }
});

// ==================== SCROLL ANIMATIONS ====================
// IntersectionObserver for reveal-on-scroll elements
const revealElements = document.querySelectorAll('.reveal-on-scroll');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,  // Trigger when 15% of element is visible
        rootMargin: '0px 0px -50px 0px'  // Trigger slightly before element enters viewport
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Modal Functions (Legacy - kept for backward compatibility)
function openModal(projectId) {
    const modal = document.getElementById(`modal-${projectId}`);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(projectId) {
    const modal = document.getElementById(`modal-${projectId}`);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});

// ==================== TYPEWRITER EFFECT ====================
function typeWriter(element, text, i, fnCallback) {
    if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1);
        setTimeout(() => {
            typeWriter(element, text, i + 1, fnCallback);
        }, 100);
    } else if (typeof fnCallback === 'function') {
        setTimeout(fnCallback, 700);
    }
}

// Start typewriter on page load
window.addEventListener('load', () => {
    const subheadline = document.querySelector('.subheadline');
    if (subheadline) {
        const text = 'UI/UX Designer | Game Developer | Illustrator';
        typeWriter(subheadline, text, 0, () => {
            subheadline.classList.add('typing-complete');
        });
    }
});

// ==================== LIGHTBOX ====================
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = '<img src="" alt="Lightbox Image">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');

// Select all images in galleries
const galleryImages = document.querySelectorAll('.model-card img, .project-gallery img, .gallery-item img, .showcase-image img');

galleryImages.forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ==================== HACKER DECRYPTION EFFECT ====================
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';

function hackerDecrypt(element) {
    const originalText = element.textContent;
    let iteration = 0;
    
    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join('');
        
        if (iteration >= originalText.length) {
            clearInterval(interval);
        }
        
        iteration += 1 / 3;
    }, 30);
}

// Apply hacker decryption to all h1 and h2 elements (except no-decrypt class)
const headers = document.querySelectorAll('h1:not(.no-decrypt), h2:not(.no-decrypt)');
headers.forEach(header => {
    header.addEventListener('mouseenter', () => {
        hackerDecrypt(header);
    });
});

// ==================== PERSPECTIVE FLOOR GRID ====================
const perspectiveGrid = document.createElement('div');
perspectiveGrid.className = 'perspective-grid';
document.body.appendChild(perspectiveGrid);

// ==================== CLICK RIPPLE EFFECT ====================
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    ripple.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// ==================== KONAMI CODE EASTER EGG ====================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
let gamerModeActive = false;

document.addEventListener('keydown', (e) => {
    // Check if the key matches the current position in the sequence
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        // Check if the entire sequence is complete
        if (konamiIndex === konamiCode.length) {
            activateGamerMode();
            konamiIndex = 0; // Reset for next time
        }
    } else {
        konamiIndex = 0; // Reset if wrong key
    }
});

function activateGamerMode() {
    if (gamerModeActive) return;
    
    gamerModeActive = true;
    
    // Create achievement popup
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = '<span>🏆</span> <div><strong>ACHIEVEMENT UNLOCKED</strong><br>Dev Mode Activated</div>';
    document.body.appendChild(popup);
    
    // Remove popup after 4 seconds
    setTimeout(() => {
        popup.remove();
    }, 4000);
    
    // Change accent color to Matrix Green
    document.documentElement.style.setProperty('--accent-neon', '#00ff00');
    
    // Spin the logo 360 degrees
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.transition = 'transform 1s ease-in-out';
        logo.style.transform = 'rotate(360deg)';
        
        setTimeout(() => {
            logo.style.transform = 'rotate(0deg)';
        }, 1000);
    }
    
    // Add green glow effect to body
    document.body.style.boxShadow = 'inset 0 0 100px rgba(0, 255, 0, 0.2)';
    
    // Reset after 10 seconds
    setTimeout(() => {
        document.documentElement.style.setProperty('--accent-neon', '#8a2be2');
        document.body.style.boxShadow = 'none';
        gamerModeActive = false;
    }, 10000);
}

// ==================== HORROR LIGHT SWITCH EASTER EGG ====================
// Create lightbulb button
const lightbulbBtn = document.createElement('button');
lightbulbBtn.className = 'lightbulb-btn';
lightbulbBtn.innerHTML = '💡';
lightbulbBtn.title = 'Toggle Lights';
document.body.appendChild(lightbulbBtn);

// Create flashlight overlay
const flashlightOverlay = document.createElement('div');
flashlightOverlay.className = 'flashlight-overlay';
document.body.appendChild(flashlightOverlay);

let lightsOut = false;

// Toggle lights on/off
lightbulbBtn.addEventListener('click', () => {
    lightsOut = !lightsOut;
    document.body.classList.toggle('lights-out', lightsOut);
    lightbulbBtn.classList.toggle('off', lightsOut);
    
    if (lightsOut) {
        lightbulbBtn.innerHTML = '🔦';
    } else {
        lightbulbBtn.innerHTML = '💡';
    }
});

// Track mouse for flashlight effect
document.addEventListener('mousemove', (e) => {
    if (lightsOut) {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }
});

// ==================== PARTICLE BURST ANIMATION ====================
function createParticleBurst(x, y) {
    const particleCount = 18;
    const colors = ['#8a2be2', '#00ffff', '#ff0055'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random angle and distance
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 80;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Add particle burst to all buttons
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-primary, .app-btn, .github-btn, .submit-btn')) {
        createParticleBurst(e.clientX, e.clientY);
    }
});

// ==================== UI SOUND EFFECTS ====================
// Placeholder audio elements (replace with actual audio files)
const hoverSound = new Audio('assets/hover.mp3'); // Placeholder
const clickSound = new Audio('assets/click.mp3'); // Placeholder

hoverSound.volume = 0.3;
clickSound.volume = 0.4;

function playHoverSound() {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(() => {}); // Ignore errors if file doesn't exist
}

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {}); // Ignore errors if file doesn't exist
}

// Add hover sound to all links and buttons
const interactiveElements = document.querySelectorAll('a, button');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', playHoverSound);
    element.addEventListener('click', playClickSound);
});
