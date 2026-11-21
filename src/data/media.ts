import type { Project } from './portfolio';

const uploads = import.meta.glob<string>('/media/**/*.{png,jpg,jpeg,webp,avif,mp4,webm,PNG,JPG,JPEG,WEBP,AVIF,MP4,WEBM}', { query: '?url', import: 'default', eager: true });
export interface ProjectMedia { url: string; caption: string; kind: 'image' | 'video'; mime: string }
const captions: Record<string,string> = {
  '/media/Tetris-AI/demo.mp4': 'Tetris AI · Coursework gameplay demonstration',
  '/media/Tetris-AI/2nd_Place.jpg': 'Coursework leaderboard showing Yibo Ma in second place.',
};
export function getProjectMedia(project: Project): ProjectMedia[] {
  return Object.entries(uploads)
    .filter(([path]) => path.startsWith(`/media/${project.mediaFolder}/`))
    .sort(([a],[b]) => a.localeCompare(b, 'en'))
    .map(([path,url]) => {
      const extension=path.split('.').pop()!.toLowerCase();
      const video=['mp4','webm'].includes(extension);
      const filename=path.split('/').pop()!.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ');
      return {url, caption:captions[path] ?? `${project.short} · ${filename}`,kind:video?'video':'image',mime:video?`video/${extension}`:`image/${extension==='jpg'?'jpeg':extension}`};
    });
}
