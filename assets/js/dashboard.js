document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.dashboard-nav-btn');
    const views = document.querySelectorAll('.dashboard-view');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuContent = document.getElementById('mobile-menu-content');

    const toggleMobileMenu = () => {
        if (!mobileMenu || !mobileMenuContent) return;

        if (mobileMenu.classList.contains('hidden')) {
            // Open
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenuContent.classList.remove('translate-x-full');
            }, 10);
        } else {
            // Close
            mobileMenuContent.classList.add('translate-x-full');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }
    };

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = btn.getAttribute('data-view');

            // Update Nav UI
            navBtns.forEach(b => {
                b.classList.remove('active', 'bg-accent', 'text-white');
                b.classList.add('hover:bg-secondary', 'dark:hover:bg-white/5', 'text-primary/60', 'dark:text-white/40');
                b.classList.remove('text-white/40'); // Remove the old problematic class if it exists
            });
            btn.classList.add('active', 'bg-accent', 'text-white');
            btn.classList.remove('hover:bg-secondary', 'dark:hover:bg-white/5', 'text-primary/60', 'dark:text-white/40');
            btn.classList.remove('text-white/40');

            // Switch View UI
            views.forEach(view => {
                const vid = view.id.replace('view-', '');
                if (vid === targetView) {
                    view.classList.remove('hidden');
                    view.classList.add('block');
                } else {
                    view.classList.add('hidden');
                    view.classList.remove('block');
                }
            });

            // Close Mobile Menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });

    // -------------------------------------------------------------------------
    // MOBILE MENU LOGIC
    // -------------------------------------------------------------------------

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMobileMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close on backdrop click
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) toggleMobileMenu();
        });
    }

    // Dark Mode Toggle Logic (Multiple Buttons)
    const themeToggleBtns = document.querySelectorAll('.dashboard-theme-toggle');

    // Function to update UI based on theme
    const updateThemeUI = (theme) => {
        const isDark = theme === 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = isDark ? 'fas fa-sun text-xl' : 'fas fa-moon text-xl';
            }
        });
    };

    // Initial load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    updateThemeUI(savedTheme);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
        });
    });

    // Modal logic (Simple)
    window.openModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('hidden');
    };

    window.closeModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('hidden');
    };

    // RTL STATE & TOGGLE LOGIC
    const initRTL = () => {
        const dir = localStorage.getItem('dir') || 'ltr';
        document.documentElement.setAttribute('dir', dir);
        const rtlToggleTexts = document.querySelectorAll('.rtl-toggle-text');
        rtlToggleTexts.forEach(txt => {
            txt.textContent = dir === 'ltr' ? 'AR' : 'EN';
        });
    };
    initRTL();

    window.toggleRTL = () => {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        localStorage.setItem('dir', newDir);
        document.documentElement.setAttribute('dir', newDir);
        window.location.reload();
    };
});
