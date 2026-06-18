document.addEventListener('DOMContentLoaded', () => {

    /* ======================================================
       REVEAL AL HACER SCROLL
    ====================================================== */
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-in');
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(el => revealObserver.observe(el));


    /* ======================================================
       CERRAR ALERTA SUPERIOR
    ====================================================== */
    const alertClose = document.getElementById('alertClose');
    const alertBar = document.getElementById('alertBar');

    if (alertClose && alertBar) {
        alertClose.addEventListener('click', () => {
            alertBar.style.display = 'none';
        });
    }


    /* ======================================================
       BOTÓN VOLVER ARRIBA
    ====================================================== */
    const toTop = document.getElementById('toTop');

    window.addEventListener('scroll', () => {

        if (!toTop) return;

        if (window.scrollY > 500) {
            toTop.classList.add('show');
        } else {
            toTop.classList.remove('show');
        }
    });

    if (toTop) {
        toTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* ======================================================
       MENÚ MÓVIL
    ====================================================== */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navActions = document.getElementById('navActions');

    if (navToggle) {
        navToggle.addEventListener('click', () => {

            navLinks?.classList.toggle('is-open');
            navActions?.classList.toggle('is-open');

            const expanded =
                navToggle.getAttribute('aria-expanded') === 'true';

            navToggle.setAttribute(
                'aria-expanded',
                (!expanded).toString()
            );
        });
    }


    /* ======================================================
       LINK ACTIVO SEGÚN SECCIÓN
    ====================================================== */
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.nav__links a');

    const sectionObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const id = entry.target.getAttribute('id');

            menuLinks.forEach(link => {
                link.classList.remove('is-active');

                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('is-active');
                }
            });
        });

    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* ======================================================
       ANIMACIÓN DE BARRAS
    ====================================================== */
    const bars = document.querySelectorAll('.bar__fill');

    const barObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const bar = entry.target;
            const pct = bar.dataset.pct || 0;

            bar.style.width = pct + '%';

            barObserver.unobserve(bar);
        });

    }, {
        threshold: 0.3
    });

    bars.forEach(bar => {

        bar.style.width = '0%';
        barObserver.observe(bar);
    });


    /* ======================================================
       FORMULARIO DE CONTACTO
    ====================================================== */
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {

        form.addEventListener('submit', (e) => {

            e.preventDefault();

            if (!form.checkValidity()) {

                const fields = form.querySelectorAll(
                    'input, textarea'
                );

                fields.forEach(field => {

                    if (!field.checkValidity()) {
                        field.classList.add('invalid');
                    } else {
                        field.classList.remove('invalid');
                    }
                });

                return;
            }

            if (status) {
                status.style.display = 'flex';
            }

            form.reset();
        });
    }

});
