document.addEventListener("DOMContentLoaded", function() {
    
    // --- Custom Cursor ---
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    if (cursor && cursorBlur) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorBlur.style.left = e.clientX + 'px';
            cursorBlur.style.top = e.clientY + 'px';
        });

        const hoverElements = document.querySelectorAll('a, button, .project-card, .contact-card, .hero-image-container');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
        });
    }
    
    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Typing Animation ---
    const typingElement = document.getElementById('typing-animation');
    const roles = ["I build robust applications for the web.", "I am a Full-Stack Developer.", "I am a Lifelong Learner."];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingElement) return;
        const currentRole = roles[roleIndex];
        let text = '';
        
        if (isDeleting) {
            text = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            text = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        typingElement.innerHTML = text;

        let typeSpeed = isDeleting ? 75 : 150;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    
    type();
    
    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });
});