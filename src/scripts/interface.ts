import { animate, inView } from 'motion';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const cleanups: (() => void)[] = [];
const menu = document.querySelector<HTMLButtonElement>('.menu-button');
const navigation = document.querySelector<HTMLElement>('#navigation');
if (menu && navigation) {
  const close = () => { menu.setAttribute('aria-expanded', 'false'); navigation.removeAttribute('data-open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); navigation.toggleAttribute('data-open', open);
  });
  navigation.addEventListener('click', event => { if ((event.target as Element).closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { close(); menu.focus(); } });
  document.addEventListener('click', event => { if (!(event.target as Element).closest('.site-header')) close(); });
  const desktop = matchMedia('(min-width: 761px)'); desktop.addEventListener('change', close);
  cleanups.push(() => desktop.removeEventListener('change', close));
}

document.querySelectorAll<HTMLButtonElement>('[data-copy-email]').forEach(button => {
  button.addEventListener('click', async () => {
    const status = button.parentElement?.querySelector<HTMLElement>('[role="status"]');
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(button.dataset.copyEmail ?? '');
      if (status) status.textContent = 'Email address copied.';
    } catch {
      if (status) status.textContent = 'Could not copy. Select the email address above, or open the email link.';
    }
  });
});

document.querySelectorAll<HTMLElement>('[data-keyboard]').forEach(preview => {
  const keys: Record<string,string> = {arrowup:'w',arrowleft:'a',arrowdown:'s',arrowright:'d'};
  const status = preview.querySelector<HTMLElement>('.keyboard-status');
  const clear = () => preview.querySelectorAll('.pressed').forEach(key => key.classList.remove('pressed'));
  preview.addEventListener('keydown', event => {
    if (event.target !== preview) return;
    const key = keys[event.key.toLowerCase()] ?? event.key.toLowerCase();
    const element = preview.querySelector<HTMLElement>(`[data-key="${['w','a','s','d'].includes(key) ? key : ''}"]`);
    if (element) { event.preventDefault(); element.classList.add('pressed'); if (status) status.textContent = `${key.toUpperCase()} pressed · illustrative input`; }
  });
  preview.addEventListener('keyup', clear);
  preview.addEventListener('focusout', clear);
  preview.querySelector('button')?.addEventListener('click', () => { if (status) status.textContent = 'Mouse click · illustrative input'; });
});
let player = 1;
document.querySelector('[data-event-step]')?.addEventListener('click', () => {
  player = player % 4 + 1;
  const output = document.querySelector('[data-event-flow]');
  if (output) output.textContent = `player: ${player} · action: ${player % 2 ? 'torso_lean' : 'cardio_step'}`;
});

const sections = document.querySelectorAll<HTMLElement>('[data-section], .background-section');
if (sections.length) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top);
    if (!visible[0]) return;
    document.querySelectorAll('.project-index a, .local-nav a').forEach(link => {
      if (link.getAttribute('href') === `#${visible[0]!.target.id}`) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-10% 0px -60% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section)); cleanups.push(() => observer.disconnect());
}

if (!reduced.matches) {
  const stop = inView('.section-heading, .project-intro, .background-section > h2', element => {
    const animation = animate(element, { opacity: [0.65,1], transform: ['translateY(12px)','translateY(0)'] }, { duration: .5 });
    cleanups.push(() => animation.stop());
  });
  cleanups.push(stop);
}

document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(card => {
  let targetX = 0, targetY = 0, x = 0, y = 0, frame = 0;
  const tick = () => {
    x += (targetX-x)*.12; y += (targetY-y)*.12;
    card.style.transform = `perspective(1000px) rotateX(${-y*2}deg) rotateY(${x*2}deg)`;
    card.style.setProperty('--light-x', `${(x+.5)*100}%`);
    card.style.setProperty('--light-y', `${(y+.5)*100}%`);
    card.style.borderColor = Math.abs(x)+Math.abs(y)>.05 ? 'color-mix(in srgb, var(--accent) 65%, transparent)' : '';
    if (Math.abs(targetX-x)+Math.abs(targetY-y)>.002) frame=requestAnimationFrame(tick); else frame=0;
  };
  const start = () => { if (!frame) frame=requestAnimationFrame(tick); };
  card.addEventListener('pointermove',event => {
    if (reduced.matches || event.pointerType !== 'mouse') return;
    const rect=card.getBoundingClientRect(); targetX=(event.clientX-rect.left)/rect.width-.5; targetY=(event.clientY-rect.top)/rect.height-.5; start();
  });
  card.addEventListener('pointerleave',()=>{targetX=targetY=0;start();});
  const reset = () => { cancelAnimationFrame(frame);frame=0;card.style.transform='';card.style.borderColor='';targetX=targetY=x=y=0; };
  reduced.addEventListener('change',reset); cleanups.push(()=>{reset();reduced.removeEventListener('change',reset);});
});
// CSS illustrations pause when offscreen and while the tab is hidden.
const visuals = document.querySelectorAll<HTMLElement>('.project-visual');
const visibleVisuals = new Set<Element>();
const syncVisuals = () => visuals.forEach(visual => visual.classList.toggle('is-paused', document.hidden || !visibleVisuals.has(visual)));
const visualObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) visibleVisuals.add(entry.target); else visibleVisuals.delete(entry.target); });
  syncVisuals();
});
visuals.forEach(visual => { visual.classList.add('is-paused'); visualObserver.observe(visual); });
document.addEventListener('visibilitychange', syncVisuals);
cleanups.push(() => {visualObserver.disconnect();document.removeEventListener('visibilitychange',syncVisuals);});
window.addEventListener('pagehide', event => { if (!event.persisted) cleanups.forEach(cleanup=>cleanup()); });
// Full document navigation intentionally keeps browser focus and history behaviour native.
