/**
 * INDEX PAGE ANIMATIONS
 * Particle System, Counter Animations, Carousel
 */

// Particle Animation System
const canvas = document.getElementById('particleCanvas');
let ctx = null;
let particles = [];
let animationId = null;

function initParticles() {
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.3 + 0.1
        });
    }
    
    function animateParticles() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(150, 150, 150, ${p.opacity})`;
            ctx.fill();
        }
        
        animationId = requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target], .impact-number[data-target]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const duration = 1500;
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target;
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current);
                    }
                }, stepTime);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                if (width === '0%') {
                    const targetWidth = bar.parentElement.parentElement.querySelector('.impact-number')?.getAttribute('data-target');
                    if (targetWidth) {
                        const percent = Math.min(100, parseInt(targetWidth) / 10);
                        bar.style.width = `${percent}%`;
                    } else {
                        bar.style.width = '85%';
                    }
                }
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Carousel Functionality
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cards = document.querySelectorAll('.carousel-card');
    const cardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    
    function updateCarousel() {
        const cardWidth = cards[0]?.offsetWidth + 24 || 0;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    window.addEventListener('resize', () => {
        const newCardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        const newMaxIndex = Math.max(0, cards.length - newCardsPerView);
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
            updateCarousel();
        }
    });
    
    // Auto-play carousel
    let autoPlayInterval = setInterval(() => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        } else {
            currentIndex = 0;
            updateCarousel();
        }
    }, 5000);
    
    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.courses-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateCarousel();
                } else {
                    currentIndex = 0;
                    updateCarousel();
                }
            }, 5000);
        });
    }
}

// Parallax Effect on CTA Section
function initParallax() {
    const ctaSection = document.querySelector('.cta-section');
    if (!ctaSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        const overlay = ctaSection.querySelector('.cta-overlay');
        if (overlay) {
            overlay.style.transform = `translateY(${rate * 0.1}px)`;
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Typewriter Effect for Hero Text (Optional)
function initTypewriter() {
    const heroText = document.querySelector('.hero h1 .gradient-text');
    if (!heroText) return;
    
    // Just add a subtle glow animation
    setInterval(() => {
        heroText.style.textShadow = '0 0 20px rgba(156, 163, 175, 0.3)';
        setTimeout(() => {
            heroText.style.textShadow = 'none';
        }, 2000);
    }, 5000);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateCounters();
    animateProgressBars();
    initCarousel();
    initParallax();
    initMobileMenu();
    initSmoothScroll();
    initTypewriter();
});

// Clean up animation on page unload
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});