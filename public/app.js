document.addEventListener('DOMContentLoaded', () => {

    // Hamburger Menu
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.company-story-section, .team-member, .service-card, .milestone, .section-title-reveal, .workshop-gallery-section');
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

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                question.setAttribute('aria-expanded', !isExpanded);
                answer.style.maxHeight = isExpanded ? '0' : answer.scrollHeight + 'px';
            });
        }
    });

    // Infinite Scroller
    const scrollers = document.querySelectorAll(".scroller");
    if (scrollers.length > 0) {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", true);

            const scrollerInner = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

    // Service Card Galleries
    const galleries = document.querySelectorAll('.gallery-container');
    galleries.forEach(gallery => {
        const track = gallery.querySelector('.gallery-track');
        const slides = Array.from(track.children);
        const nextButton = gallery.querySelector('.gallery-button.next');
        const prevButton = gallery.querySelector('.gallery-button.prev');
        let currentIndex = 0;

        const updateGallery = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateGallery();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateGallery();
        });
    });

    // Card Gallery
    const cardGallery = document.querySelector('.card-gallery-container');
    if (cardGallery) {
        const cards = document.querySelectorAll('.card');
        const cardCounter = document.getElementById('card-counter');
        let currentCardIndex = 0;
        
        const updateCard = () => {
            // Remove active class from all cards
            cards.forEach(card => card.classList.remove('active'));
            
            // Add active class to current card
            cards[currentCardIndex].classList.add('active');
            
            // Update counter
            cardCounter.textContent = `${currentCardIndex + 1} / ${cards.length}`;
        };
        
        const nextCard = () => {
            currentCardIndex = (currentCardIndex + 1) % cards.length;
            updateCard();
        };
        
        // Add click event to each card
        cards.forEach(card => {
            card.addEventListener('click', nextCard);
        });
        
        // Initialize gallery
        updateCard();
    }

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