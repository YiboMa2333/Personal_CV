// Capture play events so this also covers videos inserted later in the document.
document.addEventListener('play', event => {
  if (!(event.target instanceof HTMLVideoElement)) return;
  document.querySelectorAll('video').forEach(video => { if (video !== event.target) video.pause(); });
}, true);
const pauseVideos = () => document.querySelectorAll('video').forEach(video => video.pause());
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseVideos(); });
window.addEventListener('pagehide', pauseVideos);

const viewer = document.querySelector<HTMLDialogElement>('#image-viewer');
if (viewer && typeof viewer.showModal === 'function') {
  const area = viewer.querySelector<HTMLElement>('.viewer-scroll')!;
  const caption = viewer.querySelector<HTMLElement>('#image-viewer-caption')!;
  const zoom = viewer.querySelector<HTMLButtonElement>('[data-zoom-viewer]')!;
  let trigger: HTMLButtonElement | undefined;
  document.querySelectorAll<HTMLButtonElement>('[data-enlarge]').forEach(button => {
    button.addEventListener('click', () => {
      trigger = button;
      const image = new Image(Number(button.dataset.width), Number(button.dataset.height));
      image.alt = button.dataset.alt ?? ''; image.src = button.dataset.src ?? '';
      area.replaceChildren(image); caption.textContent = button.dataset.caption ?? '';
      area.classList.remove('is-zoomed');zoom.setAttribute('aria-pressed','false');zoom.textContent='Show actual size';
      pauseVideos(); viewer.showModal();
      document.documentElement.classList.add('image-viewer-open');
      area.scrollTop = area.scrollLeft = 0;
    });
  });
  viewer.querySelector('[data-close-viewer]')?.addEventListener('click', () => viewer.close());
  zoom.addEventListener('click',()=>{
    const enlarged=area.classList.toggle('is-zoomed');zoom.setAttribute('aria-pressed',String(enlarged));zoom.textContent=enlarged?'Fit image':'Show actual size';
    area.scrollTop=area.scrollLeft=0;
  });
  viewer.addEventListener('close', () => {
    document.documentElement.classList.remove('image-viewer-open');
    area.replaceChildren(); trigger?.focus({preventScroll:true}); trigger=undefined;
  });
  // Native dialog handles Escape, the focus trap and inert background content.
  viewer.addEventListener('click',event=>{
    if (event.target !== viewer) return;
    const rect=viewer.getBoundingClientRect();
    if (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) viewer.close();
  });
}
