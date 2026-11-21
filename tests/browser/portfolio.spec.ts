import { test, expect } from '@playwright/test';

for(const width of [390,820,1440]) test(`routes, refresh and overflow at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
 for(const route of ['/','/projects/','/background/','/contact/']){
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
 await page.goto('/projects/');await page.getByRole('navigation',{name:'Project index'}).getByRole('link',{name:'Input Overlay',exact:true}).click();
 await expect(page).toHaveURL(/#input-overlay/);
 const preview=page.locator('[data-keyboard]');await preview.focus();await page.keyboard.down('w');await expect(preview.locator('[data-key="w"]')).toHaveClass(/pressed/);await page.keyboard.up('w');await expect(preview.locator('[data-key="w"]')).not.toHaveClass(/pressed/);
 await page.keyboard.press('Tab');await page.keyboard.down('w');await expect(preview.locator('[data-key="w"]')).not.toHaveClass(/pressed/);await page.keyboard.up('w');
 await page.getByRole('button',{name:'Show next player event'}).click();await expect(page.locator('[data-event-flow]')).toContainText('player: 2');
 await page.locator('#multiplay summary').click();await expect(page.locator('#multiplay details')).toHaveAttribute('open','');
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
