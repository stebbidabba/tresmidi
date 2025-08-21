document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth scrolling for anchor links ---
    // Note: This is mostly handled by CSS `scroll-behavior: smooth;`
    // This script can be extended for more complex scroll behaviors.

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all other FAQs
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Open the clicked one if it was closed
            if (!isExpanded) {
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // --- Simple fade-in animation on scroll ---
    const animatedElements = document.querySelectorAll('.company-story-section, .team-member, .service-card, .milestone');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Basic validation, can be expanded
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Vinsamlegast fylltu út alla nauðsynlega reiti.');
                event.preventDefault();
            }
            // Add more complex validation here if needed (e.g., regex for email)
        });
    }

}); 