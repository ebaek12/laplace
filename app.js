// app.js
(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
    // Year in footer
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  
    // Sticky header shadow on scroll
    const header = document.querySelector('[data-header]');
    const onScroll = () => {
      if (!header) return;
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  
    // Smooth scrolling for internal anchors (with reduced-motion respect)
    const isSamePageHashLink = (a) => {
      if (!a || !a.getAttribute) return false;
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return false;
      // ignore empty hash
      return href.length > 1;
    };
  
    document.addEventListener('click', (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
  
      if (isSamePageHashLink(a)) {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
  
        e.preventDefault();
  
        const prefersInstant = prefersReducedMotion;
        target.scrollIntoView({ behavior: prefersInstant ? 'auto' : 'smooth', block: 'start' });
        // Move focus for accessibility without scrolling again
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener(
          'blur',
          () => {
            target.removeAttribute('tabindex');
          },
          { once: true }
        );
      }
    });
  
    // Mobile nav toggle
    const toggleBtn = document.querySelector('[data-nav-toggle]');
    const panel = document.querySelector('[data-nav-panel]');
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  
    let lastFocused = null;
  
    const openNav = () => {
      if (!toggleBtn || !panel) return;
      lastFocused = document.activeElement;
      toggleBtn.setAttribute('aria-expanded', 'true');
      panel.classList.add('is-open');
      document.body.style.overflow = 'hidden';
  
      // transform hamburger to X via aria-expanded attribute toggling lines in CSS? (we’ll do minimal here)
      // Focus first focusable element
      const first = panel.querySelector(focusableSelector);
      if (first) first.focus();
    };
  
    const closeNav = () => {
      if (!toggleBtn || !panel) return;
      toggleBtn.setAttribute('aria-expanded', 'false');
      panel.classList.remove('is-open');
      document.body.style.overflow = '';
  
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      } else {
        toggleBtn.focus();
      }
    };
  
    const isNavOpen = () => toggleBtn && toggleBtn.getAttribute('aria-expanded') === 'true';
  
    const handleToggle = () => {
      if (!toggleBtn || !panel) return;
      if (isNavOpen()) closeNav();
      else openNav();
    };
  
    if (toggleBtn && panel) {
      toggleBtn.addEventListener('click', handleToggle);
  
      // Close on outside click (mobile)
      document.addEventListener('click', (e) => {
        if (!isNavOpen()) return;
        const t = e.target;
        if (!t) return;
        const clickedInside = panel.contains(t) || toggleBtn.contains(t);
        if (!clickedInside) closeNav();
      });
  
      // Close on Escape and trap focus
      document.addEventListener('keydown', (e) => {
        if (!isNavOpen()) return;
  
        if (e.key === 'Escape') {
          e.preventDefault();
          closeNav();
          return;
        }
  
        if (e.key !== 'Tab') return;
  
        const focusables = Array.from(panel.querySelectorAll(focusableSelector)).filter(
          (el) => el.offsetParent !== null
        );
        if (focusables.length === 0) return;
  
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
  
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });
  
      // Close when a nav link is clicked (mobile)
      panel.addEventListener('click', (e) => {
        const a = e.target && e.target.closest ? e.target.closest('a') : null;
        if (!a) return;
        if (window.matchMedia('(min-width: 900px)').matches) return;
        closeNav();
      });
    }
  
    // FAQ accordion (ARIA + smooth height transitions)
    const accordion = document.querySelector('[data-accordion]');
    if (accordion) {
      const triggers = Array.from(accordion.querySelectorAll('.acc-trigger'));
  
      const setPanel = (trigger, open) => {
        const panelId = trigger.getAttribute('aria-controls');
        const panelEl = panelId ? document.getElementById(panelId) : null;
        if (!panelEl) return;
  
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  
        if (prefersReducedMotion) {
          panelEl.hidden = !open;
          return;
        }
  
        // Smooth height animation
        if (open) {
          panelEl.hidden = false;
          panelEl.style.height = '0px';
          // Force reflow
          panelEl.getBoundingClientRect();
          const full = panelEl.scrollHeight;
          panelEl.style.height = `${full}px`;
          const onEnd = (ev) => {
            if (ev.propertyName !== 'height') return;
            panelEl.style.height = '';
            panelEl.removeEventListener('transitionend', onEnd);
          };
          panelEl.addEventListener('transitionend', onEnd);
        } else {
          const start = panelEl.getBoundingClientRect().height;
          panelEl.style.height = `${start}px`;
          panelEl.getBoundingClientRect();
          panelEl.style.height = '0px';
          const onEnd = (ev) => {
            if (ev.propertyName !== 'height') return;
            panelEl.hidden = true;
            panelEl.style.height = '';
            panelEl.removeEventListener('transitionend', onEnd);
          };
          panelEl.addEventListener('transitionend', onEnd);
        }
      };
  
      const isDesktop = () => window.matchMedia('(min-width: 900px)').matches;
  
      triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const currentlyOpen = trigger.getAttribute('aria-expanded') === 'true';
          const nextOpen = !currentlyOpen;
  
          if (isDesktop()) {
            // only one open at a time
            triggers.forEach((t) => {
              if (t === trigger) return;
              if (t.getAttribute('aria-expanded') === 'true') setPanel(t, false);
            });
          }
          setPanel(trigger, nextOpen);
        });
  
        // Keyboard support already inherent in <button>
      });
  
      // Add transition style once JS is running
      const panels = accordion.querySelectorAll('.acc-panel');
      panels.forEach((p) => {
        p.style.transition = prefersReducedMotion ? 'none' : 'height 260ms cubic-bezier(.22,.9,.22,1)';
      });
    }
  
    // Reveal-on-scroll
    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
    if (revealEls.length) {
      if (prefersReducedMotion) {
        revealEls.forEach((el) => el.classList.add('is-visible'));
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target;
              const delay = Number(el.getAttribute('data-reveal-delay') || '0');
              if (delay) {
                el.style.transitionDelay = `${delay}ms`;
              }
              el.classList.add('is-visible');
              io.unobserve(el);
            });
          },
          { threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
        );
        revealEls.forEach((el) => io.observe(el));
      }
    }

    // Contact form validation (client-side, accessible)
    const form = document.querySelector('[data-form]');
    const status = document.querySelector('[data-form-status]');
  
    const setFieldError = (fieldEl, msg) => {
      if (!fieldEl) return;
      const fieldWrap = fieldEl.closest('.field');
      if (!fieldWrap) return;
  
      const name = fieldEl.getAttribute('name');
      const err = name ? fieldWrap.querySelector(`[data-error-for="${name}"]`) : null;
  
      if (msg) {
        fieldWrap.classList.add('is-invalid');
        fieldEl.setAttribute('aria-invalid', 'true');
        if (err) err.textContent = msg;
      } else {
        fieldWrap.classList.remove('is-invalid');
        fieldEl.removeAttribute('aria-invalid');
        if (err) err.textContent = '';
      }
    };
  
    const validateEmail = (value) => {
      // simple, practical check
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    };
  
    const validateForm = () => {
      if (!form) return { ok: true, firstInvalid: null };
  
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const grade = form.querySelector('#grade');
      const message = form.querySelector('#message');
  
      let ok = true;
      let firstInvalid = null;
  
      // Name
      if (!name.value.trim() || name.value.trim().length < 2) {
        ok = false;
        setFieldError(name, 'Please enter your name.');
        firstInvalid ||= name;
      } else {
        setFieldError(name, '');
      }
  
      // Email
      if (!email.value.trim() || !validateEmail(email.value)) {
        ok = false;
        setFieldError(email, 'Please enter a valid email address.');
        firstInvalid ||= email;
      } else {
        setFieldError(email, '');
      }
  
      // Grade
      if (!grade.value) {
        ok = false;
        setFieldError(grade, 'Please select a grade level.');
        firstInvalid ||= grade;
      } else {
        setFieldError(grade, '');
      }
  
      // Message
      const msgVal = message.value.trim();
      if (!msgVal || msgVal.length < 20) {
        ok = false;
        setFieldError(message, 'Please add a bit more detail (at least 20 characters).');
        firstInvalid ||= message;
      } else {
        setFieldError(message, '');
      }
  
      return { ok, firstInvalid };
    };
  
    if (form) {
      // Validate on blur for nicer UX
      form.addEventListener(
        'blur',
        (e) => {
          const target = e.target;
          if (!(target instanceof HTMLElement)) return;
          if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;
          validateForm();
        },
        true
      );
  
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const { ok, firstInvalid } = validateForm();
  
        if (!ok) {
          if (status) {
            status.hidden = false;
            status.textContent = 'Please fix the highlighted fields and try again.';
          }
          if (firstInvalid && typeof firstInvalid.focus === 'function') firstInvalid.focus();
          return;
        }

        // Submit to configured form endpoint
        if (status) {
          status.hidden = false;
          status.textContent = 'Sending your request...';
        }
        form.submit();
      });
    }
  })();
