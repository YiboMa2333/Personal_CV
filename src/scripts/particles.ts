import * as THREE from 'three';

const host = document.querySelector<HTMLElement>('[data-particles]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let dispose: (()=>void) | undefined;

function initialise(container: HTMLElement) {
  const canvas=container.querySelector('canvas');
  if (!canvas || reduced.matches) return;
  let renderer: THREE.WebGLRenderer;
  try { renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'}); }
  catch { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(40,1,.1,100); camera.position.z=6;
  const count=innerWidth<760 ? 1800 : 4200;
  const positions=new Float32Array(count*3), originals=new Float32Array(count*3), colours=new Float32Array(count*3);
  const colour=new THREE.Color();
  for(let i=0;i<count;i++) {
    const phi=Math.acos(1-2*(i+.5)/count),theta=i*Math.PI*(3-Math.sqrt(5));
    const radius=1.6+.07*Math.sin(theta*5);
    const x=radius*Math.sin(phi)*Math.cos(theta),y=radius*Math.cos(phi),z=radius*Math.sin(phi)*Math.sin(theta);
    positions.set([x,y,z],i*3); colour.setRGB(.26+.2*(z+1.7)/3.4,.57+.25*(z+1.7)/3.4,.75+.2*(z+1.7)/3.4); colours.set([colour.r,colour.g,colour.b],i*3);
  }
  originals.set(positions);
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.BufferAttribute(colours,3));
  const material=new THREE.PointsMaterial({size:.014,vertexColors:true,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false});
  const points=new THREE.Points(geometry,material);scene.add(points);
  let targetX=0,targetY=0,x=0,y=0,strength=0,targetStrength=0,frame=0,visible=true,dead=false;
  const resize=()=>{const width=container.clientWidth,height=container.clientHeight;if(!width||!height)return;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();};
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);resize();
  const move=(event:PointerEvent)=>{if(event.pointerType!=='mouse')return;const rect=container.getBoundingClientRect();targetX=((event.clientX-rect.left)/rect.width-.5)*4;targetY=-((event.clientY-rect.top)/rect.height-.5)*4;targetStrength=1;};
  const leave=()=>{targetStrength=0;targetX=targetY=0;};
  const hero=container.parentElement!;hero.addEventListener('pointermove',move);hero.addEventListener('pointerleave',leave);
  let previous=0,elapsed=0;
  const render=(time:number)=>{
    frame=0;if(dead||!visible||document.hidden)return;
    const dt=Math.min((time-previous)/1000,.05);previous=time;elapsed+=dt;
    x+=(targetX-x)*.045;y+=(targetY-y)*.045;strength+=(targetStrength-strength)*.045;
    for(let i=0;i<count;i++) {
      const j=i*3,ox=originals[j]!,oy=originals[j+1]!,oz=originals[j+2]!;
      const distance=(ox-x)**2+(oy-y)**2;
      const influence=Math.exp(-distance*2)*strength*.24;
      positions[j]=ox+(ox-x)*influence;positions[j+1]=oy+(oy-y)*influence;positions[j+2]=oz+influence*.7;
    }
    geometry.attributes.position!.needsUpdate=true;
    points.rotation.y=Math.sin(elapsed*.1)*.25+x*.035;points.rotation.z=-.3+y*.03;
    renderer.render(scene,camera);container.setAttribute('data-ready','');frame=requestAnimationFrame(render);
  };
  const start=()=>{if(!frame&&!dead&&visible&&!document.hidden){previous=performance.now();frame=requestAnimationFrame(render);}};
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else start();};
  const observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;if(visible)start();else{cancelAnimationFrame(frame);frame=0;}},{threshold:.01});observer.observe(container);
  document.addEventListener('visibilitychange',visibility);
  const lost=(event:Event)=>{event.preventDefault();cleanup();};
  function cleanup(){if(dead)return;dead=true;cancelAnimationFrame(frame);resizeObserver.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',visibility);hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',leave);canvas?.removeEventListener('webglcontextlost',lost);geometry.dispose();material.dispose();renderer.dispose();container.removeAttribute('data-ready');}
  canvas.addEventListener('webglcontextlost',lost);dispose=cleanup;start();
}
if(host)initialise(host);
reduced.addEventListener('change',()=>{dispose?.();dispose=undefined;if(host&&!reduced.matches)initialise(host);});
window.addEventListener('pagehide',event=>{if(!event.persisted)dispose?.();});
