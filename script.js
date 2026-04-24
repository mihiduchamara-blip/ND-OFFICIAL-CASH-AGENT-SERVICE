// Initialize
document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.getElementById('main-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 14, 20, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            navbar.style.padding = '15px 50px';
        } else {
            navbar.style.background = 'rgba(11, 14, 20, 0.6)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '20px 50px';
            
            // Handle mobile padding reset
            if (window.innerWidth <= 768) {
                navbar.style.padding = '15px 20px';
            }
        }
    });

    // Smooth scroll for anchor text
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to elements
    const animatedElements = document.querySelectorAll('.feature-card, .video-card, .contact-cta');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Hover effects for play buttons on video cards to create a slight ripple sync
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const thumb = card.querySelector('.video-thumb');
            thumb.style.transform = 'scale(1.05)';
            thumb.style.transition = 'transform 0.5s ease';
        });
        card.addEventListener('mouseleave', () => {
            const thumb = card.querySelector('.video-thumb');
            thumb.style.transform = 'scale(1)';
        });
    });
});
