(function() {
    const DURATION = '0.85s';
    const DELAY_STEP = 120; // чуть больше паузы между элементами
    const THRESHOLD = 0.08;
    const ROOT_MARGIN = '0px 0px -30px 0px';

    // Стили анимации
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(40px);
            filter: blur(8px);
            transition:
                opacity ${DURATION} cubic-bezier(0.22, 1, 0.36, 1),
                transform ${DURATION} cubic-bezier(0.22, 1, 0.36, 1),
                filter ${DURATION} cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform, filter;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
        }
        @media (prefers-reduced-motion: reduce) {
            .fade-in {
                transition: opacity 0.3s ease !important;
                transform: none !important;
                filter: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    // ── Hero: анимируем при загрузке страницы, не через скролл ──
    function animateHero() {
        const heroItems = document.querySelectorAll('.hero .fade-in');
        heroItems.forEach((el, i) => {
            // Стартовая задержка 300ms чтобы страница успела отрисоваться
            setTimeout(() => {
                el.classList.add('visible');
            }, 300 + i * DELAY_STEP);
        });
    }

    // ── Observer для всего остального ──
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || '0', 10);
            setTimeout(() => {
                el.classList.add('visible');
            }, delay);
            observer.unobserve(el);
        });
    }, {
        threshold: THRESHOLD,
        rootMargin: ROOT_MARGIN,
    });

    function initStagger() {
        // Сначала запускаем hero
        animateHero();

        // Для остальных секций — stagger через observer
        const sections = document.querySelectorAll('section, footer');
        sections.forEach((section) => {
            const items = section.querySelectorAll('.fade-in');
            items.forEach((item, i) => {
                if (!item.dataset.delay) {
                    // Первый элемент без задержки, остальные каскадом
                    item.dataset.delay = String(i * DELAY_STEP);
                }
                observer.observe(item);
            });
        });

        // На случай .fade-in вне секций/хедера
        document.querySelectorAll('.fade-in').forEach((el) => {
            if (!el.closest('section, header, footer')) {
                observer.observe(el);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStagger);
    } else {
        initStagger();
    }
})();