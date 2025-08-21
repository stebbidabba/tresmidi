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

    // Workshop Photo Gallery
    const workshopGallery = document.querySelector('.workshop-gallery-section .gallery-container');
    if (workshopGallery) {
        const galleryImage = document.getElementById('gallery-image');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const prevBtnImage = document.getElementById('prev-btn-image');
        const nextBtnImage = document.getElementById('next-btn-image');
        const imageCounter = document.getElementById('image-counter');
        
        // Workshop photos - using actual workshop images
        const workshopImages = [
            {
                src: './verk1.jpeg',
                alt: 'Verkstæði mynd 1'
            },
            {
                src: './verk2.jpeg',
                alt: 'Verkstæði mynd 2'
            },
            {
                src: './verk3.jpeg',
                alt: 'Verkstæði mynd 3'
            },
            {
                src: './verk4.jpeg',
                alt: 'Verkstæði mynd 4'
            },
            {
                src: './verk5.jpeg',
                alt: 'Verkstæði mynd 5'
            },
            {
                src: './verk6.jpeg',
                alt: 'Verkstæði mynd 6'
            }
        ];
        
        let currentImageIndex = 0;
        
        const updateImage = () => {
            const image = workshopImages[currentImageIndex];
            galleryImage.src = image.src;
            galleryImage.alt = image.alt;
            imageCounter.textContent = `${currentImageIndex + 1} / ${workshopImages.length}`;
            
            // Update button states for both sets of buttons
            const isFirst = currentImageIndex === 0;
            const isLast = currentImageIndex === workshopImages.length - 1;
            
            prevBtn.disabled = isFirst;
            nextBtn.disabled = isLast;
            prevBtnImage.disabled = isFirst;
            nextBtnImage.disabled = isLast;
        };
        
        const nextImage = () => {
            if (currentImageIndex < workshopImages.length - 1) {
                currentImageIndex++;
                updateImage();
            }
        };
        
        const prevImage = () => {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateImage();
            }
        };
        
        // Add event listeners for both sets of buttons
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);
        nextBtnImage.addEventListener('click', nextImage);
        prevBtnImage.addEventListener('click', prevImage);
        
        // Initialize gallery
        updateImage();
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