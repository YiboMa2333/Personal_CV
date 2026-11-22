import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const projectIds=['super-happy-space','multiplay','document-matcher','input-overlay','tetris','bioreactor','sun-glare'];
const routes = ['index.html','projects/index.html','background/index.html','contact/index.html','404.html',...projectIds.map(id=>`projects/${id}/index.html`)];
for (const route of routes) test(`${route}: static content and complete contact footer`,async()=>{
  const html=await readFile(join('dist',route),'utf8');
  assert.match(html,/<html lang="en-GB"/);
  assert.match(html,/Skip to content/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  const footer=html.split('<footer')[1];
  for(const detail of ['Contact Information','yibo.ma.25@ucl.ac.uk','tel:+447960513809','London, UK','linkedin.com/in/yibo-ma-b053a843b','github.com/YiboMa2333']) assert.ok(footer.includes(detail),detail);
  assert.doesNotMatch(html,/reference\/|Sorting Algorithm Performance Study/);
});
test('seven linked gallery posters and standalone project details are built',async()=>{
 const html=await readFile('dist/projects/index.html','utf8');
 for(const id of projectIds){
  assert.ok(html.includes(`id="${id}"`));assert.ok(html.includes(`href="/projects/${id}/"`));
  const detail=await readFile(`dist/projects/${id}/index.html`,'utf8');
  assert.match(detail,/My contribution/);assert.match(detail,/Technical approach/);
  assert.match(detail,/href="\/projects\/"/);assert.match(detail,/href="\/projects\/" aria-current="page"/);
 }
 assert.equal((html.match(/<figcaption>/g)||[]).length,7);
 assert.match(html,/Illustrative event flow/); assert.match(html,/invented demonstration data/);
 assert.doesNotMatch(html.split('<main')[1].split('</main>')[0],/<button|tabindex="0"|<video/);
});
test('Tetris uploads are linked while empty projects retain a useful fallback',async()=>{
 const tetris=await readFile('dist/projects/tetris/index.html','utf8');
 assert.match(tetris,/<video controls/);assert.match(tetris,/preload="none"/);assert.match(tetris,/I placed second among approximately 200 students/);
 assert.doesNotMatch(tetris,/autoplay/);
 assert.match(tetris,/poster="[^"]+demo-poster/);assert.match(tetris,/width="460" height="762"/);
 assert.match(tetris,/alt="Ranking table with me in second place\." width="1705" height="1279"/);
 assert.doesNotMatch(tetris,/data-enlarge|image-viewer|Enlarge image/);
 const empty=await readFile('dist/projects/multiplay/index.html','utf8');assert.match(empty,/Project recordings and screenshots will be added here/);assert.doesNotMatch(empty,/<video/);
});
test('gallery follows the requested project order',async()=>{
 const html=await readFile('dist/projects/index.html','utf8');
 assert.deepEqual([...html.matchAll(/class="project-card-link" href="\/projects\/([^/]+)\//g)].map(match=>match[1]),['input-overlay','tetris','sun-glare','bioreactor','document-matcher','multiplay','super-happy-space']);
});
test('sun-glare paper DOI and five supplied images are included',async()=>{
 const html=await readFile('dist/projects/sun-glare/index.html','utf8');assert.match(html,/href="https:\/\/doi.org\/10.56028\/aetr.12.1.1222.2024"/);
 assert.match(html,/Evaluating the Impact of Online Database Integration/);assert.match(html,/not the model’s overall accuracy/);
 assert.equal((html.match(/class="media-image"/g)||[]).length,5);assert.doesNotMatch(html,/Project recordings and screenshots will be added here/);
});
test('Input Overlay includes native workflow, three recordings and four screenshots',async()=>{
 const html=await readFile('dist/projects/input-overlay/index.html','utf8');
 assert.equal((html.match(/<video controls/g)||[]).length,3);assert.equal((html.match(/class="media-image"/g)||[]).length,4);
 for(const text of ['Open the tray controls','Position the overlay','Customise and apply','Lock and use','Ctrl+Alt+F8','GPL-2.0-only','Preview release on GitHub','Windows build and test workflow'])assert.ok(html.includes(text),text);
 assert.doesNotMatch(html,/autoplay|Project recordings and screenshots will be added here/);
});
test('private references are excluded from build',async()=>{
 const files=await readdir('dist',{recursive:true});assert.ok(files.every(file=>!file.includes('reference')));
 assert.deepEqual(files.filter(file=>file.endsWith('.docx')).map(file=>file.replaceAll('\\','/')),['downloads/Yibo_Ma_CV.docx']);
 assert.deepEqual(await readFile('dist/downloads/Yibo_Ma_CV.docx'),await readFile('public/downloads/Yibo_Ma_CV.docx'));
});
test('CV-backed background includes modules, scores, awards and experience',async()=>{
 const html=await readFile('dist/background/index.html','utf8');
 for(const content of ['Principles of Programming','Understanding Management','5/5','4/5','Physics C','Calculus AB/BC','Macroeconomics','AMC 12','USACO','iGEM','Australian Mathematics Competition','15 members','top 15%','Suzhou Tianba Culture Media Co Ltd','Ningbo Sanli Education','one million cumulative views'])assert.ok(html.includes(content),content);
 assert.equal((html.match(/<h3>USACO<\/h3>/g)||[]).length,1);
 assert.equal((html.match(/<h3>AP Scholar with Distinction<\/h3>/g)||[]).length,1);
 assert.doesNotMatch(html,/awaits|not yet available|A\* equivalent|A equivalent|12%|Class Committee|Columbia Summer/);
});
test('palette text contrast meets WCAG AA',()=>{
 const luminance=hex=>{const c=hex.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
 for(const background of ['0B1018','151D29'])for(const text of ['F2F5FA','B7C1D0','81D8F7','A8A0FF','8CD6BE','F1CB7B','EDA9C5','91C5FF'])assert.ok((luminance(text)+.05)/(luminance(background)+.05)>=4.5,`${text} on ${background}`);
});
