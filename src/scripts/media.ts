// Capture play events so this also covers videos inserted later in the document.
document.addEventListener('play', event => {
  if (!(event.target instanceof HTMLVideoElement)) return;
  document.querySelectorAll('video').forEach(video => { if (video !== event.target) video.pause(); });
}, true);
const pauseVideos = () => document.querySelectorAll('video').forEach(video => video.pause());
document.addEventListener('visibilitychange', () => { if (document.hidden) pauseVideos(); });
window.addEventListener('pagehide', pauseVideos);

