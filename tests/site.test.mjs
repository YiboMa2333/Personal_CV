import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const routes = ['index.html','projects/index.html','background/index.html','contact/index.html','404.html'];
for (const route of routes) test(`${route}: static content and complete contact footer`,async()=>{
  const html=await readFile(join('dist',route),'utf8');
  assert.match(html,/<html lang="en-GB"/);
  assert.match(html,/Skip to content/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  const footer=html.split('<footer')[1];
  for(const detail of ['Contact Information','yibo.ma.25@ucl.ac.uk','tel:+447960513809','London, UK','linkedin.com/in/yibo-ma-b053a843b','github.com/YiboMa2333']) assert.ok(footer.includes(detail),detail);
  assert.doesNotMatch(html,/reference\/|\.docx|Sorting Algorithm Performance Study/);
});
test('all seven project anchors and labelled illustrations are built',async()=>{
 const html=await readFile('dist/projects/index.html','utf8');
 for(const id of ['super-happy-space','multiplay','document-matcher','input-overlay','tetris','bioreactor','sun-glare']){assert.ok(html.includes(`id="${id}"`));assert.ok(html.includes(`href="#${id}"`));}
 assert.equal((html.match(/<figcaption>/g)||[]).length,7);
 assert.match(html,/Illustrative event flow/); assert.match(html,/invented demonstration data/);
});
test('private references are excluded from build',async()=>{
 const files=await readdir('dist',{recursive:true});assert.ok(files.every(file=>!file.includes('reference')&&!file.endsWith('.docx')));
});
test('palette text contrast meets WCAG AA',()=>{
 const luminance=hex=>{const c=hex.match(/\w\w/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
 for(const background of ['0B1018','151D29'])for(const text of ['F2F5FA','B7C1D0','81D8F7','A8A0FF','8CD6BE','F1CB7B','EDA9C5','91C5FF'])assert.ok((luminance(text)+.05)/(luminance(background)+.05)>=4.5,`${text} on ${background}`);
});
