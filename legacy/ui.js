// Script d'interface des V1 et V2 (menu, sélecteur de version, cartes projets, barre de navigation).
// Repris tel quel de l'ancien <script> de index.html. `toggleMenu` reste global : le bouton burger
// l'appelle par son attribut onclick.
export function initLegacyUI() {
    window.toggleMenu = function toggleMenu() {
        const navbar = document.querySelector('.navbar');
        const burger = document.querySelector('.burger');
        const isOpen = navbar.classList.toggle('show');
        burger.classList.toggle('active', isOpen);
        if (isOpen) {
            navbar.classList.remove('navbar-hidden');
        }
    };
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', (e) => {
            const navList = document.querySelector('.navbar ');
            if (navList.classList.contains('show')) {
                navList.classList.remove('show');
                document.querySelector('.burger').classList.remove('active');
            }

            const hash = link.getAttribute('href').slice(1);
            const activeVersion = localStorage.getItem('portfolio-version') || 'v2';
            if (activeVersion === 'v2') {
                const target = document.getElementById('v2-' + hash);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Version switcher (V1 / V2), bumped manually on each "final" push
    const VERSIONS = { v1: 'v1.00', v2: 'v2.00' };

    const v1Content = document.getElementById('v1-content');
    const v2Content = document.getElementById('v2-content');
    const versionButtons = document.querySelectorAll('.version-btn');
    const versionTag = document.getElementById('version-tag');

    const navbarEl = document.querySelector('.navbar');
    const burgerEl = document.querySelector('.burger');

    function setVersion(version) {
        localStorage.setItem('portfolio-version', version);
        v1Content.classList.toggle('active', version === 'v1');
        v2Content.classList.toggle('active', version === 'v2');
        versionButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.version === version));
        versionTag.textContent = VERSIONS[version];
        navbarEl.classList.toggle('v2-mode', version === 'v2');
        burgerEl.classList.toggle('v2-mode', version === 'v2');
    }

    versionButtons.forEach(btn => {
        btn.addEventListener('click', () => setVersion(btn.dataset.version));
    });

    setVersion(localStorage.getItem('portfolio-version') || 'v2');

    // V2 projects: chevron toggles the "en savoir plus" panel per card
    document.querySelectorAll('.project-expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            const expanded = card.classList.toggle('expanded');
            btn.setAttribute('aria-expanded', String(expanded));
        });
    });

    // V2 nav: sliding hover pill behind the active/hovered link
    const navList = document.querySelector('.navbar ul');
    const navPill = document.getElementById('navbar-pill');
    // Touch devices emit a synthetic mouseenter right before the tap's
    // click fires, flashing the pill at the tapped link just as the menu
    // closes. Only wire this up for pointers that can actually hover.
    if (navList && navPill && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                if ((localStorage.getItem('portfolio-version') || 'v2') !== 'v2') return;
                const listRect = navList.getBoundingClientRect();
                const linkRect = link.getBoundingClientRect();
                navPill.style.left = (linkRect.left - listRect.left) + 'px';
                navPill.style.width = linkRect.width + 'px';
                navPill.style.opacity = '1';
            });
        });
        navList.addEventListener('mouseleave', () => {
            navPill.style.opacity = '0';
        });
    }

    // V2 nav: hide on scroll down, reveal on scroll up (V1 keeps the classic always-visible nav)
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if ((localStorage.getItem('portfolio-version') || 'v2') !== 'v2') return;
        const currentY = window.scrollY;
        const scrollingDown = currentY > lastScrollY && currentY > 120;
        if (!navbarEl.classList.contains('show')) {
            navbarEl.classList.toggle('navbar-hidden', scrollingDown);
        }
        burgerEl.classList.toggle('navbar-hidden', scrollingDown);
        lastScrollY = currentY;
    }, { passive: true });

}
