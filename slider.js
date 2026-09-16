(() => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]');
  const viewport = carousel.querySelector('[data-carousel-viewport]');
  const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
  const previous = carousel.querySelector('[data-carousel-previous]');
  const next = carousel.querySelector('[data-carousel-next]');
  const toggle = carousel.querySelector('[data-carousel-toggle]');
  const current = carousel.querySelector('[data-carousel-current]');
  const total = carousel.querySelector('[data-carousel-total]');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 6500;
  let index = 0;
  let timer = 0;
  let pointerStart = null;
  let userPaused = false;

  total.textContent = String(slides.length).padStart(2, '0');

  const stopTimer = () => {
    clearTimeout(timer);
    timer = 0;
    carousel.classList.remove('is-running');
  };

  const schedule = () => {
    stopTimer();
    if (userPaused || reduceMotion.matches || document.hidden) return;
    requestAnimationFrame(() => carousel.classList.add('is-running'));
    timer = window.setTimeout(() => show(index + 1, true), interval);
  };

  const show = (nextIndex, automatic = false) => {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translate3d(-${index * 100}%,0,0)`;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      if ('inert' in slide) slide.inert = !active;
    });
    current.textContent = String(index + 1).padStart(2, '0');
    carousel.dataset.activeSlide = String(index + 1);
    if (!automatic) stopTimer();
    schedule();
  };

  const setPaused = (paused) => {
    userPaused = paused;
    toggle.classList.toggle('is-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Wznów automatyczne przewijanie' : 'Wstrzymaj automatyczne przewijanie');
    paused ? stopTimer() : schedule();
  };

  previous.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  toggle.addEventListener('click', () => setPaused(!userPaused));

  viewport.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + 1);
    }
  });

  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStart = { x: event.clientX, y: event.clientY };
  });

  viewport.addEventListener('pointerup', event => {
    if (!pointerStart) return;
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      show(index + (deltaX < 0 ? 1 : -1));
    }
  });

  viewport.addEventListener('pointercancel', () => { pointerStart = null; });
  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', schedule);
  carousel.addEventListener('focusin', stopTimer);
  carousel.addEventListener('focusout', event => {
    if (!carousel.contains(event.relatedTarget)) schedule();
  });
  document.addEventListener('visibilitychange', schedule);
  reduceMotion.addEventListener?.('change', schedule);

  show(0, true);
})();
