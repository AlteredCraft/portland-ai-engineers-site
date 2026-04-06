// Main JavaScript file for Portland AI Engineers website

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                // Update URL hash without triggering scroll
                history.pushState(null, null, href);
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function highlightNavLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // Throttle function for better performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply scroll listeners with throttling
    window.addEventListener('scroll', throttle(highlightNavLink, 100));
    window.addEventListener('scroll', throttle(handleNavbarScroll, 100));

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card, .principle-card, .value-item, .event-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .navbar-scrolled {
            backdrop-filter: blur(20px);
        }
    `;
    document.head.appendChild(style);

    // Mobile menu close on link click
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarCollapse && navbarToggler) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Form validation (if forms are added later)
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add hover effects to cards
    document.querySelectorAll('.feature-card, .sponsor-card, .tier-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Countdown timer for next event (if date is known)
    const eventDateElement = document.querySelector('.event-date');
    if (eventDateElement) {
        // This would be replaced with actual event date parsing and countdown logic
        // For now, just a placeholder
        console.log('Event date element found');
    }

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Event tab switching
    document.querySelectorAll('.event-tabs .nav-link').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.event-tabs .nav-link').forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            const target = this.getAttribute('data-tab');
            document.querySelectorAll('.event-tab-panel').forEach(panel => {
                panel.hidden = true;
            });
            document.getElementById(target + '-panel').hidden = false;
        });
    });

    // Fetch and render past events with pagination
    const pastEventsContainer = document.getElementById('past-events-list');
    if (pastEventsContainer) {
        const EVENTS_PER_PAGE = 6;
        let allEvents = [];
        let visibleCount = 0;

        function renderEventCard(evt) {
            const date = new Date(evt.start_at);
            const dateStr = date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: evt.timezone || 'America/Los_Angeles'
            });
            const href = evt.event_url || ('https://lu.ma/' + evt.url);
            const coverImg = evt.cover_url
                ? `<img src="${evt.cover_url}" alt="" class="past-event-cover">`
                : '';
            return `
                <a href="${href}" target="_blank" rel="noopener noreferrer" class="past-event-card">
                    ${coverImg}
                    <div class="past-event-info">
                        <div class="past-event-date">${dateStr}</div>
                        <div class="past-event-name">${evt.name}</div>
                        ${evt.location ? `<div class="past-event-location"><i class="bi bi-geo-alt"></i> ${evt.location}</div>` : ''}
                    </div>
                </a>
            `;
        }

        function renderPage() {
            const nextBatch = allEvents.slice(visibleCount, visibleCount + EVENTS_PER_PAGE);
            visibleCount += nextBatch.length;

            // On first render, clear the loading message
            if (visibleCount === nextBatch.length) {
                pastEventsContainer.innerHTML = '';
            }

            // Remove existing "Show more" button if present
            const existingBtn = pastEventsContainer.querySelector('.past-events-load-more');
            if (existingBtn) existingBtn.remove();

            // Append new cards
            const wrapper = document.createElement('div');
            wrapper.innerHTML = nextBatch.map(renderEventCard).join('');
            while (wrapper.firstChild) {
                pastEventsContainer.appendChild(wrapper.firstChild);
            }

            // Add "Show more" button if there are remaining events
            const remaining = allEvents.length - visibleCount;
            if (remaining > 0) {
                const loadMoreBtn = document.createElement('button');
                loadMoreBtn.className = 'btn btn-outline-primary past-events-load-more';
                loadMoreBtn.textContent = `Show more (${remaining} remaining)`;
                loadMoreBtn.addEventListener('click', renderPage);
                pastEventsContainer.appendChild(loadMoreBtn);
            }
        }

        fetch('data/past-events.json')
            .then(response => response.json())
            .then(events => {
                if (events.length === 0) {
                    pastEventsContainer.innerHTML = '<p class="text-center text-muted">No past events yet.</p>';
                    return;
                }
                events.sort((a, b) => new Date(b.start_at) - new Date(a.start_at));
                allEvents = events;
                renderPage();
            })
            .catch(() => {
                pastEventsContainer.innerHTML = '<p class="text-center text-muted">Unable to load past events.</p>';
            });
    }

    // Console welcome message
    console.log('%c Welcome to Portland AI Engineers! 🤖', 
                'background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; font-size: 20px; padding: 10px;');
    console.log('Interested in joining our community? Visit: https://www.meetup.com/portland-ai-engineers/events/calendar/');
});

// Service Worker registration (for PWA support if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}