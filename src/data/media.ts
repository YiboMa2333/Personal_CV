import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { Project } from './portfolio';

const images = import.meta.glob<{ default: ImageMetadata }>('/media/**/*.{png,jpg,jpeg,webp,avif,PNG,JPG,JPEG,WEBP,AVIF}', { eager: true });
const files = import.meta.glob<string>('/media/**/*.{mp4,webm,vtt,txt,MP4,WEBM}', { query: '?url', import: 'default', eager: true });
function imageAt(path: string): ImageMetadata {
  const image = images[path]?.default;
  if (!image) throw new Error(`Project media image is missing: ${path}`);
  return image;
}
function fileAt(path: string): string {
  const file = files[path];
  if (!file) throw new Error(`Project media file is missing: ${path}`);
  return file;
}
export async function getProjectMedia(project: Project) {
  return Promise.all((project.media ?? []).map(async item => {
    if (item.kind === 'image') {
      const original = imageAt(item.src);
      const image = await getImage({ src: original, format: 'webp', quality: original.format === 'png' ? 100 : 90 });
      return { ...item, url: image.src, original: original.src, width: original.width, height: original.height };
    }
    if (item.width <= 0 || item.height <= 0) throw new Error(`Invalid video dimensions: ${item.src}`);
    const poster = imageAt(item.poster);
    if (poster.width !== item.width || poster.height !== item.height) throw new Error(`Poster and video dimensions differ: ${item.src}`);
    return { ...item, url: fileAt(item.src), posterUrl: poster.src,
      transcriptUrl: item.transcript ? fileAt(item.transcript) : undefined,
      captionUrl: item.captions ? fileAt(item.captions.src) : undefined,
      mime: item.src.toLowerCase().endsWith('.webm') ? 'video/webm' : 'video/mp4',
    };
  }));
}
