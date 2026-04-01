document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // THEME & RTL STATE MANAGEMENT
    // -------------------------------------------------------------------------
    const initTheme = () => {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    };

    const initRTL = () => {
        const dir = localStorage.getItem('dir') || 'ltr';
        document.documentElement.setAttribute('dir', dir);
        const btnText = document.querySelector('.rtl-toggle-text');
        if (btnText) {
            btnText.textContent = dir === 'ltr' ? 'AR' : 'EN';
        }
    };

    initTheme();
    initRTL();

    const highlightActiveNavLink = () => {
        const currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

        document.querySelectorAll('.nav-link[href], #mobile-menu a[href]').forEach(link => {
            const linkPath = (link.getAttribute('href') || '').split('/').pop().toLowerCase();

            if (linkPath === currentPath) {
                link.setAttribute('aria-current', 'page');
                return;
            }

            link.removeAttribute('aria-current');
        });
    };

    highlightActiveNavLink();

    // -------------------------------------------------------------------------
    // TOGGLES
    // -------------------------------------------------------------------------
    window.toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        const icon = document.querySelector('.theme-toggle i');
        if (icon) icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    };

    window.toggleRTL = () => {
        const currentDir = document.documentElement.getAttribute('dir');
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
        const btnText = document.querySelector('.rtl-toggle-text');
        if (btnText) btnText.textContent = newDir === 'ltr' ? 'AR' : 'EN';
        window.location.reload(); // Reload to apply all RTL changes properly (standard practice for complex apps)
    };

    // -------------------------------------------------------------------------
    // MOBILE MENU
    // -------------------------------------------------------------------------
    const menuBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    const toggleMenu = () => {
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        }
    };

    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

    // Close on link click
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // -------------------------------------------------------------------------
    // SCROLL REVEAL (Intersection Observer)
    // -------------------------------------------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's a counter, start it
                if (entry.target.hasAttribute('data-count-end')) {
                    startCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll, .stats-counter').forEach(el => {
        revealObserver.observe(el);
    });

    // -------------------------------------------------------------------------
    // STATS COUNTER
    // -------------------------------------------------------------------------
    function startCounter(el) {
        const endValue = parseInt(el.getAttribute('data-count-end'));
        const duration = 2000;
        let startAt = 0;
        const stepTime = Math.abs(Math.floor(duration / endValue));
        const timer = setInterval(() => {
            startAt += Math.ceil(endValue / 100);
            if (startAt >= endValue) {
                el.innerText = endValue + (el.getAttribute('data-suffix') || '');
                clearInterval(timer);
            } else {
                el.innerText = startAt + (el.getAttribute('data-suffix') || '');
            }
        }, 10);
    }

    // -------------------------------------------------------------------------
    // FORM VALIDATION (Simple)
    // -------------------------------------------------------------------------
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // -------------------------------------------------------------------------
    // COPYRIGHT YEAR
    // -------------------------------------------------------------------------
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.innerText = new Date().getFullYear();
    }
});
