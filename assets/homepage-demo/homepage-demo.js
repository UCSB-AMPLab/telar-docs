/* Normal page flow with bounded Lenis smoothing. Vimeo loads only on approach. */
(() => {
  'use strict';
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const small=matchMedia('(max-width: 900px)');
  const travel=new TelarScrollMotion(scrollY);
  const limit=()=>Math.max(0,document.documentElement.scrollHeight-innerHeight);
  const smooth=()=>!motion.matches&&!small.matches;
  const lenis=new Lenis({lerp:.06,smoothWheel:!motion.matches,wheelMultiplier:.65,autoRaf:false,anchors:false,
    virtualScroll({deltaY,event}){
      if(!smooth()||event.type!=='wheel'||event.ctrlKey)return;
      if(event.target.closest('input,textarea,select,iframe,[data-lenis-prevent]'))return false;
      event.preventDefault();pendingTarget=null;
      if(!travel.active)travel.reset(scrollY);
      travel.wheel(deltaY,innerHeight,limit());return false;
    }
  });
  let raf=0,lastTick=0,pendingTarget=null,onArrival=null;
  function tick(time){
    const dt=lastTick?(time-lastTick)/1000:0;lastTick=time;
    if(travel.active){
      lenis.scrollTo(travel.step(dt,innerHeight,limit()),{immediate:true});
      if(!travel.active){pendingTarget=null;const arrived=onArrival;onArrival=null;arrived?.()}
    }
    lenis.raf(time);raf=requestAnimationFrame(tick);
  }
  raf=requestAnimationFrame(tick);
  function manualInput(){pendingTarget=null;onArrival=null;travel.reset(scrollY)}
  function preference(){manualInput();lenis.options.smoothWheel=!motion.matches;lenis.resize();if(motion.matches)suspend();else syncPlayback()}
  function scrollTo(target,arrive=null){
    if(typeof target==='string')target=document.querySelector(target);
    if(target instanceof Element)target=target.getBoundingClientRect().top+scrollY;
    if(!Number.isFinite(target))return;
    target=Math.min(limit(),Math.max(0,target));onArrival=arrive;
    if(!smooth()){lenis.scrollTo(target,{immediate:true});travel.reset(target);pendingTarget=null;onArrival=null;arrive?.();return}
    if(!travel.active)travel.reset(scrollY);
    travel.moveTo(target,innerHeight);
  }
  window.telarHomepage={scrollTo};
  function focusTarget(element){
    if(!element.hasAttribute('tabindex'))element.setAttribute('tabindex','-1');
    element.focus({preventScroll:true});
  }
  function keydown(event){
    if(['Home','End','PageUp','PageDown',' '].includes(event.key))manualInput();
    const direction={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[event.key];
    if(!direction||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
    if(event.target.isContentEditable||event.target.closest('input,textarea,select,iframe,video,[role="slider"],[role="listbox"],[role="tablist"]'))return;
    event.preventDefault();if(event.repeat)return;
    const stops=[...document.querySelectorAll('main > section,body > section,body > footer')].filter(e=>!e.hidden).map(e=>e.getBoundingClientRect().top+scrollY);
    const ordered=[...new Set(stops.map(n=>Math.min(limit(),Math.max(0,n))))].sort((a,b)=>a-b);
    const current=pendingTarget??scrollY,target=direction>0?ordered.find(n=>n>current+8):ordered.slice().reverse().find(n=>n<current-8);
    if(target===undefined)return;
    pendingTarget=target;scrollTo(target);
  }
  function anchor(event){
    const link=event.target.closest('a[href^="#"]');if(!link?.hash||link.hash==='#')return;
    const target=document.getElementById(decodeURIComponent(link.hash.slice(1)));if(!target)return;
    event.preventDefault();pendingTarget=null;
    history.pushState(null,'',link.hash);
    scrollTo(target,()=>focusTarget(target.querySelector('h1,h2')||target));
  }
  // The existing Back to top button uses this helper and returns keyboard focus.
  window.telarHomepage.backToTop=()=>scrollTo(0,()=>focusTarget(document.querySelector('h1')));
  document.addEventListener('keydown',keydown);document.addEventListener('click',anchor);
  window.addEventListener('touchstart',manualInput,{passive:true});
  window.addEventListener('pointerdown',manualInput);
  window.addEventListener('resize',manualInput);window.addEventListener('resize',()=>lenis.resize());
  motion.addEventListener('change',preference);small.addEventListener('change',preference);

  const root=document.querySelector('[data-telar-demo]'),frame=root.querySelector('[data-demo-frame]');
  const embed=root.querySelector('[data-demo-embed]'),poster=root.querySelector('[data-demo-poster]');
  const error=root.querySelector('[data-demo-error]'),errorText=root.querySelector('[data-demo-error-text]'),errorLink=root.querySelector('[data-demo-error-link]');
  const transcript=root.querySelector('[data-demo-transcript]');
  const languages=JSON.parse(document.getElementById('telar-demo-config').textContent);
  let sdkPromise=null,player=null,iframe=null,ready=false,playing=false,inView=false,userPaused=false,pauseExpected=false,generation=0,timeout=0,data;
  function sdk(){
    if(window.Vimeo?.Player)return Promise.resolve(window.Vimeo);
    if(sdkPromise)return sdkPromise;
    sdkPromise=new Promise((resolve,reject)=>{
      const script=document.createElement('script');script.src='https://player.vimeo.com/api/player.js';script.async=true;
      script.onload=()=>window.Vimeo?.Player?resolve(window.Vimeo):reject(new Error('Player unavailable'));
      script.onerror=()=>reject(new Error('Player unavailable'));document.head.append(script);
    });return sdkPromise;
  }
  function failed(token){
    if(token!==generation)return;
    clearTimeout(timeout);root.classList.remove('has-player');root.dataset.videoState='error';error.hidden=false;
  }
  function suspend(){
    if(!ready||!player||!playing)return;
    pauseExpected=true;player.pause().catch(()=>{pauseExpected=false});
  }
  function syncPlayback(){
    if(!ready||!player)return;
    if(!inView||document.hidden){suspend();return}
    if(!motion.matches&&!userPaused)player.play().catch(()=>{root.dataset.videoState='paused'});
  }
  function loadPlayer(){
    if(iframe)return;
    const token=generation,url=new URL(data.vimeo);
    for(const [key,value] of Object.entries({autoplay:'0',muted:'1',loop:'1',background:'0',controls:'1',play_button_position:'center',progress_bar:'0',volume:'0',fullscreen:'0',quality_selector:'0',pip:'0',speed:'0',airplay:'0',chromecast:'0',unmute_button:'0',vimeo_logo:'0',cc:'0',chapters:'0',transcript:'0',color:'883c36',title:'0',byline:'0',portrait:'0',badge:'0',keyboard:'1',playsinline:'1',preload:'none',dnt:'1'}))url.searchParams.set(key,value);
    iframe=document.createElement('iframe');iframe.src=url.href;iframe.title=data.title;
    iframe.allow='autoplay; fullscreen; picture-in-picture; encrypted-media';iframe.allowFullscreen=true;
    iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.setAttribute('data-lenis-prevent','');
    embed.replaceChildren(iframe);root.dataset.videoState='loading';
    timeout=setTimeout(()=>failed(token),15000);
    sdk().then(Vimeo=>{
      if(token!==generation)return;
      const current=new Vimeo.Player(iframe);player=current;
      current.on('play',()=>{
        if(token!==generation)return;
        playing=true;userPaused=false;root.dataset.videoState='playing';
        if(!inView||document.hidden)suspend();
      });
      current.on('pause',()=>{
        if(token!==generation)return;
        playing=false;if(!pauseExpected&&inView&&!document.hidden)userPaused=true;
        pauseExpected=false;root.dataset.videoState='paused';
      });
      current.on('error',()=>failed(token));
      return current.ready().then(()=>{
        if(token!==generation)return;
        clearTimeout(timeout);ready=true;error.hidden=true;root.dataset.videoState='ready';
        root.classList.add('has-player');syncPlayback();
      });
    }).catch(()=>failed(token));
  }
  function language(){
    const lang=languages[document.documentElement.lang]?document.documentElement.lang:'es';
    const previous=player;generation++;clearTimeout(timeout);
    ready=false;playing=false;userPaused=false;pauseExpected=false;player=null;iframe=null;
    // Clearing the old iframe stops its stream before a new language can start.
    embed.replaceChildren();previous?.destroy().catch(()=>{});
    root.classList.remove('has-player');root.dataset.videoState='poster';root.lang=lang;data=languages[lang];
    poster.src=new URL(data.poster,location.origin).href;
    error.hidden=true;errorText.textContent=data.error;errorLink.textContent=data.watch;
    const direct=new URL(data.vimeo);direct.searchParams.set('controls','1');direct.searchParams.set('autoplay','0');direct.searchParams.set('background','0');errorLink.href=direct.href;
    transcript.replaceChildren();
    const list=document.createElement('ul');
    for(const text of data.summary){const li=document.createElement('li');li.textContent=text;list.append(li)}
    transcript.append(list);
    document.querySelector('.hero__scroll').setAttribute('aria-label',lang==='es'?'¿Qué es Telar?':'What is Telar?');
    document.getElementById('backToTop').setAttribute('aria-label',lang==='es'?'Volver arriba':'Back to top');
    lenis.resize();if(inView)loadPlayer();
  }
  const visible=new IntersectionObserver(entries=>{
    const entry=entries[0];inView=entry.isIntersecting&&entry.intersectionRatio>=.1;
    if(entry.isIntersecting)loadPlayer();
    syncPlayback();
  },{threshold:[0,.1]});
  document.addEventListener('visibilitychange',syncPlayback);
  document.addEventListener('telar:languagechange',language);language();visible.observe(frame);
  window.addEventListener('pagehide',event=>{
    suspend();if(event.persisted)return;
    clearTimeout(timeout);visible.disconnect();cancelAnimationFrame(raf);
    player?.destroy().catch(()=>{});lenis.destroy();
  });
})();
