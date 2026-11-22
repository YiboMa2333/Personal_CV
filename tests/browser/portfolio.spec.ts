import { test, expect } from '@playwright/test';

for(const width of [390,820,1440]) test(`routes, refresh and overflow at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
 for(const route of ['/','/projects/','/background/','/contact/',...['super-happy-space','multiplay','document-matcher','input-overlay','tetris','bioreactor','sun-glare'].map(id=>`/projects/${id}/`)]){
  const response=await page.goto(route);expect(response?.status()).toBe(200);await page.reload();
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('footer')).toContainText('Contact Information');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
 expect(errors).toEqual([]);
});
test('mobile keyboard navigation and menu escape',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await page.keyboard.press('Tab');await expect(page.getByText('Skip to content')).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 const menu=page.getByRole('button',{name:'Menu'});await menu.focus();await page.keyboard.press('Enter');
 await expect(menu).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');
 await expect(menu).toBeFocused();await expect(menu).toHaveAttribute('aria-expanded','false');
 await menu.click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Projects',exact:true}).click();await expect(page).toHaveURL(/projects/);
});
test('copy email success and failure feedback',async({page})=>{
 await page.goto('/contact/');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(text:string)=>{if(text!=='yibo.ma.25@ucl.ac.uk')throw new Error('Incorrect email');}}}));
 await page.getByRole('button',{name:'Copy email address'}).click();await expect(page.getByRole('status')).toContainText('Email address copied');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied');}}}));
 await page.getByRole('button',{name:'Copy email address'}).click();await expect(page.getByRole('status')).toContainText('Could not copy');
 await expect(page.locator('main a[href="mailto:yibo.ma.25@ucl.ac.uk"]')).toBeVisible();
 await expect(page.locator('main a[href="tel:+447960513809"]')).toBeVisible();
});
test('project navigation, focus-only keyboard input and event stepping',async({page})=>{
 await page.goto('/projects/');await page.locator('.project-card').getByRole('link',{name:'Input Overlay Desktop',exact:true}).click();
 await expect(page).toHaveURL(/\/projects\/input-overlay\//);
 const preview=page.locator('[data-keyboard]');await preview.focus();await page.keyboard.down('w');await expect(preview.locator('[data-key="w"]')).toHaveClass(/pressed/);await page.keyboard.up('w');await expect(preview.locator('[data-key="w"]')).not.toHaveClass(/pressed/);
 await page.keyboard.press('Tab');await page.keyboard.down('w');await expect(preview.locator('[data-key="w"]')).not.toHaveClass(/pressed/);await page.keyboard.up('w');
 await page.getByRole('navigation',{name:'Other projects'}).getByRole('link',{name:'MultiPlay SDK',exact:true}).click();
 await page.getByRole('button',{name:'Show next player event'}).click();await expect(page.locator('[data-event-flow]')).toContainText('player: 2');
 await page.getByText('Technical approach',{exact:true}).click();await expect(page.locator('.detail-approach details')).toHaveAttribute('open','');
});
test('reduced motion and unavailable graphics preserve content',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await expect(page.locator('[data-particles]')).not.toHaveAttribute('data-ready');
 expect(await page.locator('.beat-bars').count()).toBe(0);
 await expect(page.getByRole('link',{name:/Explore the work/})).toBeVisible();
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=(()=>null) as typeof HTMLCanvasElement.prototype.getContext;});
 await page.reload();await expect(page.locator('.orb-fallback')).toBeVisible();await expect(page.locator('[data-particles]')).not.toHaveAttribute('data-ready');
 await expect(page.locator('h1')).toContainText('Yibo Ma');
});
test('one graphics canvas, motion changes and context loss fallback',async({page})=>{
 await page.goto('/');await expect(page.locator('[data-particles]')).toHaveAttribute('data-ready','');
 await expect(page.locator('canvas')).toHaveCount(1);
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('[data-particles]')).not.toHaveAttribute('data-ready');
 await page.emulateMedia({reducedMotion:'no-preference'});await expect(page.locator('[data-particles]')).toHaveAttribute('data-ready','');
 await expect(page.locator('canvas')).toHaveCount(1);
 await page.locator('canvas').evaluate(canvas=>canvas.dispatchEvent(new Event('webglcontextlost',{cancelable:true})));
 await expect(page.locator('[data-particles]')).not.toHaveAttribute('data-ready');await expect(page.locator('.orb-fallback')).toBeVisible();
 await expect(page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Projects',exact:true})).toBeVisible();
});
test('CV module disclosure and genuine DOCX download',async({page})=>{
 await page.goto('/background/');
 await page.getByText('Explore UCL modules',{exact:true}).click();
 await expect(page.getByText('Principles of Programming',{exact:true})).toBeVisible();
 await expect(page.locator('.module-grid li')).toHaveCount(15);
 await page.getByText('Explore UCL modules',{exact:true}).focus();
 await page.keyboard.press('Enter');await expect(page.locator('.education-detail')).not.toHaveAttribute('open');
 await page.goto('/');
 const downloadEvent=page.waitForEvent('download');
 await page.getByRole('link',{name:'Download CV (DOCX)',exact:true}).click();
 const download=await downloadEvent;expect(download.suggestedFilename()).toBe('Yibo_Ma_CV.docx');expect(await download.failure()).toBeNull();
 const response=await page.request.get('/downloads/Yibo_Ma_CV.docx');expect(response.status()).toBe(200);expect((await response.body()).subarray(0,2).toString()).toBe('PK');
 await page.goto('/contact/');await expect(page.getByRole('link',{name:'Download CV (DOCX)',exact:true})).toHaveAttribute('href','/downloads/Yibo_Ma_CV.docx');
});
test('gallery keyboard entry, media files and native video controls',async({page})=>{
 await page.goto('/projects/');
 const cards=page.locator('.project-card-link');await expect(cards).toHaveCount(7);
 await expect(cards.locator('button, a, [tabindex="0"]')).toHaveCount(0);
 const tetris=page.getByRole('link',{name:'Tetris AI',exact:true});await tetris.focus();await page.keyboard.press('Enter');
 await expect(page).toHaveURL(/\/projects\/tetris\//);
 await expect(page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Projects',exact:true})).toHaveAttribute('aria-current','page');
 const image=page.locator('.media-item img');await image.scrollIntoViewIfNeeded();await expect(image).toBeVisible();await expect.poll(()=>image.evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
 const video=page.locator('video');await expect(video).toHaveAttribute('controls','');await expect(video).toHaveAttribute('preload','none');await expect(video).not.toHaveAttribute('autoplay');
 const source=await video.locator('source').getAttribute('src');const response=await page.request.get(source!,{headers:{Range:'bytes=0-1023'}});expect([200,206]).toContain(response.status());
 await video.evaluate(element=>(element as HTMLVideoElement).load());await expect.poll(()=>video.evaluate(element=>(element as HTMLVideoElement).readyState),{timeout:15000}).toBeGreaterThan(0);
 await expect(page.getByRole('link',{name:'View Tetris AI gameplay demo',exact:true})).toHaveAttribute('href','https://github.com/YiboMa2333/TetrisAI');
 await page.getByRole('link',{name:'All projects',exact:true}).click();await expect(page).toHaveURL(/\/projects\/$/);
});

test('video poster, deliberate playback, stable layout and exclusive playback',async({page})=>{
 const requestedVideos:string[]=[];page.on('request',request=>{if(/\.mp4(?:\?|$)/.test(request.url()))requestedVideos.push(request.url());});
 await page.goto('/projects/tetris/');
 const video=page.locator('video');await video.scrollIntoViewIfNeeded();
 await expect(video).toHaveAttribute('poster',/demo-poster/);await expect(video).toHaveAttribute('width','460');await expect(video).toHaveAttribute('height','762');
 const poster=await page.request.get((await video.getAttribute('poster'))!);expect(poster.status()).toBe(200);
 expect(await video.evaluate(element=>(element as HTMLVideoElement).paused)).toBe(true);
 expect(requestedVideos).toEqual([]);
 const before=await video.boundingBox();expect(before).not.toBeNull();expect(before!.width/before!.height).toBeCloseTo(460/762,2);
 await video.focus();await page.keyboard.press('Space');
 await expect.poll(()=>video.evaluate(element=>(element as HTMLVideoElement).currentTime),{timeout:15000}).toBeGreaterThan(0);
 const after=await video.boundingBox();expect(Math.abs(after!.height-before!.height)).toBeLessThan(1);
 // Exercise the shared handler with a second real video without adding duplicate public media.
 await page.evaluate(()=>{const original=document.querySelector('video')!;const second=original.cloneNode(true) as HTMLVideoElement;second.id='second-test-video';second.muted=true;document.querySelector('.media-gallery')!.append(second);});
 const second=page.locator('#second-test-video');await second.focus();await page.keyboard.press('Space');
 await expect.poll(()=>second.evaluate(element=>(element as HTMLVideoElement).currentTime),{timeout:15000}).toBeGreaterThan(0);
 expect(await page.locator('video').first().evaluate(element=>(element as HTMLVideoElement).paused)).toBe(true);
});

for(const width of [390,1440]) test(`image enlargement, keyboard scrolling and focus restoration at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/projects/tetris/');
 const opener=page.getByRole('button',{name:/Enlarge image: Projected coursework leaderboard/});
 const thumbnail=opener.locator('img');await expect(thumbnail).toHaveAttribute('width','1705');await expect(thumbnail).toHaveAttribute('height','1279');await expect(thumbnail).toHaveAttribute('loading','lazy');
 await opener.focus();await page.keyboard.press('Enter');
 const dialog=page.getByRole('dialog',{name:'Project image'});await expect(dialog).toBeVisible();
 const close=dialog.getByRole('button',{name:'Close image'});await expect(close).toBeFocused();
 await expect(dialog.locator('img')).toHaveAttribute('alt','Projected coursework leaderboard with Yibo Ma listed in second place.');
 await expect.poll(()=>dialog.locator('img').evaluate(image=>(image as HTMLImageElement).naturalWidth)).toBe(1705);
 await page.keyboard.press('Tab');const region=dialog.getByRole('region');await expect(region).toBeFocused();
 await dialog.getByRole('button',{name:'Show actual size'}).click();await expect(dialog.getByRole('button',{name:'Fit image'})).toHaveAttribute('aria-pressed','true');await region.focus();
 await page.keyboard.press('ArrowRight');await expect.poll(()=>region.evaluate(element=>element.scrollLeft)).toBeGreaterThan(0);
 await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(opener).toBeFocused();
 await page.keyboard.press('Space');await expect(dialog).toBeVisible();await close.click();await expect(opener).toBeFocused();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

for(const width of [390,1440]) test(`bioreactor image sequence and accessible enlargement at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/projects/');await page.getByRole('link',{name:'Automated Bioreactor Control System',exact:true}).click();
 await expect(page).toHaveURL(/\/projects\/bioreactor\//);await page.reload();
 await expect(page.locator('.media-item')).toHaveCount(4);await expect(page.locator('video')).toHaveCount(0);
 const captions=page.locator('.media-item figcaption');
 await expect(captions.nth(0)).toContainText('System architecture:');await expect(captions.nth(1)).toContainText('Temperature sensing:');await expect(captions.nth(2)).toContainText('Heater control:');await expect(captions.nth(3)).toContainText('separate from the recreated');
 for(const button of await page.locator('[data-enlarge]').all()){
  const image=button.locator('img');await button.scrollIntoViewIfNeeded();
  await expect.poll(()=>image.evaluate(element=>(element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(Number(await image.getAttribute('width'))).toBeGreaterThan(0);expect(Number(await image.getAttribute('height'))).toBeGreaterThan(0);await expect(image).toHaveAttribute('loading','lazy');
  await button.focus();await page.keyboard.press('Enter');
  const dialog=page.getByRole('dialog',{name:'Project image'});await expect(dialog).toBeVisible();
  await expect.poll(()=>dialog.locator('img').evaluate(element=>(element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await dialog.getByRole('button',{name:'Show actual size'}).click();await expect(dialog.getByRole('button',{name:'Fit image'})).toHaveAttribute('aria-pressed','true');
  await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(button).toBeFocused();
 }
 await expect(page.getByRole('heading',{name:'My contribution',exact:true})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Technology and methods',exact:true})).toBeVisible();
 await expect(page.locator('.detail-approach')).toContainText('recreated response curve below is illustrative');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
