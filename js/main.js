document.addEventListener('DOMContentLoaded', () => {

  /* ======================================================
     Animación al hacer scroll
  ====================================================== */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ======================================================
     Top bar y menú móvil
  ====================================================== */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const menuLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  const closeMenu = () => {
    nav?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Abrir menú');
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  const updateNavShadow = () => {
    nav?.classList.toggle('nav--scrolled', window.scrollY > 12);
  };
  updateNavShadow();
  window.addEventListener('scroll', updateNavShadow, { passive: true });

  /* ======================================================
     Cerrar alerta superior
  ====================================================== */
  const alertClose = document.getElementById('alertClose');
  const alertBar = document.getElementById('alertBar');

  if (alertClose && alertBar) {
    alertClose.addEventListener('click', () => {
      alertBar.classList.add('is-hidden');
      setTimeout(() => {
        alertBar.style.display = 'none';
      }, 200);
    });
  }

  /* ======================================================
     Link activo según sección
  ====================================================== */
  const sections = document.querySelectorAll('section[id]');

  const setActiveLink = (id) => {
    menuLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, {
      rootMargin: '-35% 0px -55% 0px',
      threshold: 0
    });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ======================================================
     Botón volver arriba
  ====================================================== */
  const toTop = document.getElementById('toTop');

  const toggleToTop = () => {
    toTop?.classList.toggle('is-visible', window.scrollY > 500);
  };

  toggleToTop();
  window.addEventListener('scroll', toggleToTop, { passive: true });

  toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ======================================================
     Animación de barras de estadísticas
  ====================================================== */
  const bars = document.querySelectorAll('.bar__fill');

  if ('IntersectionObserver' in window) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const bar = entry.target;
        bar.style.width = `${bar.dataset.pct || 0}%`;
        barObserver.unobserve(bar);
      });
    }, { threshold: 0.35 });

    bars.forEach((bar) => {
      bar.style.width = '0%';
      barObserver.observe(bar);
    });
  } else {
    bars.forEach((bar) => {
      bar.style.width = `${bar.dataset.pct || 0}%`;
    });
  }

  /* ======================================================
     Formulario de contacto
  ====================================================== */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  const updateFieldState = (field) => {
    const wrapper = field.closest('.field');
    if (!wrapper) return;

    const hasError = field.value.trim() !== '' && !field.checkValidity();
    wrapper.classList.toggle('has-error', hasError);
  };

  form?.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => updateFieldState(field));
    field.addEventListener('blur', () => updateFieldState(field));
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.querySelectorAll('input, textarea').forEach((field) => {
        const wrapper = field.closest('.field');
        wrapper?.classList.toggle('has-error', !field.checkValidity());
      });
      return;
    }

    status?.classList.add('is-visible');
    form.reset();

    setTimeout(() => {
      status?.classList.remove('is-visible');
    }, 4500);
  });

});
