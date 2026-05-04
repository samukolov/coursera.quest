// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal elements on scroll
const revealElements = document.querySelectorAll('.course-card, .stat-card, .section-title');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0, 1)';
    revealObserver.observe(el);
});

// Modal logic
const modal = document.getElementById('enrollModal');
const openModalBtns = document.querySelectorAll('.open-modal-btn');
const closeModalBtn = document.querySelector('.close-modal');
const enrollForm = document.getElementById('enrollForm');
const successMessage = document.getElementById('successMessage');

openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('show');
        enrollForm.style.display = 'block';
        successMessage.style.display = 'none';
        enrollForm.reset();
    });
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

enrollForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Don't actually submit the form
    
    // Fake sending
    const submitBtn = enrollForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Відправка...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        enrollForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Auto close after 3 seconds
        setTimeout(() => {
            modal.classList.remove('show');
        }, 3000);
    }, 800);
});
