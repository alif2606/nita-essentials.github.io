/**
 * components.js — NITA Essentials
 * ─────────────────────────────────────────────────────────────────
 * Loads shared nav and footer into every page.
 * Also handles:
 *   - Hamburger menu toggle
 *   - Active nav link highlighting (automatic, based on current URL)
 *   - Auto-hide navbar on scroll down, show on scroll up
 *
 * Contributors: To add a new nav link, edit nav.html only.
 * Do not touch the logic below unless necessary.
 * ─────────────────────────────────────────────────────────────────
 */

// ── Load Nav ────────────────────────────────────────────────────
fetch('./nav.html')
  .then(r => r.text())
  .then(html => {
        //For loading the nav
        const navContainer = document.getElementById('nav');
        navContainer.innerHTML = html;

        // ── Hamburger toggle ──
        const hamburger = document.getElementById('hamburger');
        const navLinks  = document.getElementById('nav-links');

        if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Close menu when a link is clicked (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            });
        });
        }

        // ── Active link highlight ──
        // Matches current filename (e.g. "sports.html") to nav hrefs
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === currentPage) {
            a.classList.add('active');
        }
        });


        // ===== Auto-hide Navbar =====
            const navbar = document.querySelector('nav');
            const academicsNav = document.getElementById('academics-nav');

            if (navbar) {
                let lastScrollY = window.scrollY;   
                const THRESHOLD = 5;   

                window.addEventListener('scroll', () => {
                    const currentScrollY = window.scrollY;

                    // Always show navbar at the top
                    if (currentScrollY <= 0) {
                        navbar.classList.remove('nav-hidden');
                        // for academics page
                        if (academicsNav) {
                            academicsNav.style.top = '60px';
                        }    
                        lastScrollY = currentScrollY;
                        return;
                    }
                    
                    // Ignore tiny scroll movements
                    if (Math.abs(currentScrollY - lastScrollY) < THRESHOLD) {
                        return;
                    }

                    if (currentScrollY > lastScrollY) {
                        // Scrolling down
                        navbar.classList.add('nav-hidden');
                        //for academic nav
                        if (academicsNav) {
                            academicsNav.style.top = '0px';
                        }
                    } 
                    else {
                        // Scrolling up
                        console.log('Scrolling up - removing nav-hidden');
                        navbar.classList.remove('nav-hidden');
                        if (academicsNav) {
                            academicsNav.style.top = '60px';
                        }
                    }
                    lastScrollY = currentScrollY;
                });
            }
})

  .catch(err => console.error('components.js: failed to load nav.html', err));

// ── Load Footer ─────────────────────────────────────────────────
fetch('./footer.html')
  .then(r => r.text())
  .then(html => {
    const footerContainer = document.getElementById('footer');
    if (!footerContainer) return;
    footerContainer.innerHTML = html;
  })
  .catch(err => console.error('components.js: failed to load footer.html', err));