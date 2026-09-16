(() => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]');
  const viewport = carousel.querySelector('[data-carousel-viewport]');
  const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
  const previous = carousel.querySelector('[data-carousel-previous]');
  const next = carousel.querySelector('[data-carousel-next]');
  const current = carousel.querySelector('[data-carousel-current]');
  const total = carousel.querySelector('[data-carousel-total]');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 6500;
  let index = 0;
  let timer = 0;
  let drag = null;
  let suppressClick = false;

  total.textContent = String(slides.length).padStart(2, '0');

  const stopTimer = () => {
    clearTimeout(timer);
    timer = 0;
    carousel.classList.remove('is-running');
  };

  const schedule = () => {
    stopTimer();
    if (reduceMotion.matches || document.hidden || drag) return;
    requestAnimationFrame(() => carousel.classList.add('is-running'));
    timer = window.setTimeout(() => show(index + 1, true), interval);
  };

  const positionTrack = (offset = 0, animate = true) => {
    track.style.transition = animate ? '' : 'none';
    track.style.transform = `translate3d(calc(-${index * 100}% + ${offset}px),0,0)`;
  };

  const show = (nextIndex, automatic = false) => {
    index = (nextIndex + slides.length) % slides.length;
    positionTrack(0, true);
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

  previous.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));

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
    stopTimer();
    drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startedAt: performance.now(),
      horizontal: false,
      deltaX: 0
    };
    viewport.setPointerCapture?.(event.pointerId);
  });

  viewport.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.horizontal) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        drag = null;
        schedule();
        return;
      }
      if (Math.abs(deltaX) < 8) return;
      drag.horizontal = true;
      carousel.classList.add('is-dragging');
    }
    drag.deltaX = deltaX;
    const atStart = index === 0 && deltaX > 0;
    const atEnd = index === slides.length - 1 && deltaX < 0;
    positionTrack(atStart || atEnd ? deltaX * .24 : deltaX, false);
  });

  const finishDrag = (event, cancelled = false) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const {deltaX, horizontal, startedAt} = drag;
    const elapsed = Math.max(performance.now() - startedAt, 1);
    const velocity = Math.abs(deltaX) / elapsed;
    const threshold = Math.min(viewport.clientWidth * .16, 92);
    drag = null;
    carousel.classList.remove('is-dragging');
    if (horizontal) {
      suppressClick = Math.abs(deltaX) > 10;
      const change = !cancelled && (Math.abs(deltaX) > threshold || velocity > .55);
      if (change) show(index + (deltaX < 0 ? 1 : -1));
      else show(index);
      requestAnimationFrame(() => requestAnimationFrame(() => { suppressClick = false; }));
    } else {
      positionTrack(0, true);
      schedule();
    }
  };

  viewport.addEventListener('pointerup', event => finishDrag(event));
  viewport.addEventListener('pointercancel', event => finishDrag(event, true));
  viewport.addEventListener('lostpointercapture', event => {
    if (drag?.pointerId === event.pointerId) finishDrag(event, true);
  });
  viewport.addEventListener('click', event => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  carousel.addEventListener('mouseenter', stopTimer);
  carousel.addEventListener('mouseleave', () => { if (!drag) schedule(); });
  carousel.addEventListener('focusin', stopTimer);
  carousel.addEventListener('focusout', event => {
    if (!carousel.contains(event.relatedTarget)) schedule();
  });
  document.addEventListener('visibilitychange', schedule);
  reduceMotion.addEventListener?.('change', schedule);

  show(0, true);
})();
