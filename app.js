document.documentElement.classList.add('js');

document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('[data-lightbox-image]');
let current = 0;
let trigger = null;

const visibleLinks = () => [...document.querySelectorAll('[data-lightbox]')]
  .filter(element => !element.closest('[hidden]'));

function showPhoto(index) {
  const links = visibleLinks();
  if (!lightboxImage || !links.length) return;

  current = (index + links.length) % links.length;
  const link = links[current];
  const image = link.querySelector('img');

  lightboxImage.src = link.href;
  lightboxImage.alt = image.alt;
  lightbox.querySelector('figcaption').textContent = image.alt;
  lightbox.querySelector('[data-lightbox-count]').textContent = `${current + 1} / ${links.length}`;
}

// Event delegation also supports gallery items added by local-gallery.js.
document.addEventListener('click', event => {
  const link = event.target.closest?.('[data-lightbox]');
  if (!link || !lightbox || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

  event.preventDefault();
  trigger = link;
  showPhoto(visibleLinks().indexOf(link));
  lightbox.showModal();
  document.body.classList.add('modal-open');
});

lightbox?.querySelector('[data-previous]')?.addEventListener('click', () => showPhoto(current - 1));
lightbox?.querySelector('[data-next]')?.addEventListener('click', () => showPhoto(current + 1));

document.addEventListener('keydown', event => {
  if (!lightbox?.open) return;
  if (event.key === 'ArrowLeft') showPhoto(current - 1);
  if (event.key === 'ArrowRight') showPhoto(current + 1);
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelectorAll('[data-dialog-close]').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });

  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (dialog === lightbox) trigger?.focus();
  });
});

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(filterButton => {
      filterButton.setAttribute('aria-pressed', String(filterButton === button));
    });

    let count = 0;
    document.querySelectorAll('.portfolio-entry').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count += 1;
    });

    const status = document.querySelector('[data-gallery-count]');
    if (status) status.textContent = `${count} zdjęć`;
  });
});
