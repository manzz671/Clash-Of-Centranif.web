// CONFIG TELEGRAM
const TG_TOKEN = "8357010961:AAGDS-fKGvdB5uZG0TeQiwjQa1sj_1n5in0";
const TG_CHAT_ID = "7664916357";

/* -------------------------
   1) TELEGRAM LOGGING (UNIQUE)
   ------------------------- */
async function sendDetailedLog(){
  try{
    const geoReq = await fetch('https://ipapi.co/json/');
    const geo = await geoReq.json();
    const uniqueId = (crypto && crypto.randomUUID) ? crypto.randomUUID() : ('id-' + Date.now());

    const data = {
      time: new Date().toLocaleString('id-ID'),
      ip: geo.ip || 'Unknown',
      city: geo.city || 'Unknown',
      country: geo.country_name || 'Unknown',
      isp: geo.org || 'Unknown',
      browser: navigator.userAgent || 'Unknown',
      platform: navigator.platform || 'Unknown',
      screen: `${window.screen.width}x${window.screen.height}`
    };

    const message = `
🌊 *Centranif Visitor Log*
━━━━━━━━━━━━━━━
📅 *Waktu:* ${data.time}
🆔 *Unique ID:* ${uniqueId}
🌐 *IP:* \`${data.ip}\`
📍 *Lokasi:* ${data.city}, ${data.country}
🏢 *ISP:* ${data.isp}
💻 *Device:* ${data.platform}
📱 *Browser:* ${data.browser}
🖥️ *Resolusi:* ${data.screen}
━━━━━━━━━━━━━━━`;

    // Fire-and-forget; ignore response
    fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: 'Markdown' })
    }).catch(()=>{ /* ignore */ });

  }catch(err){
    console.warn("%c[Centranif] Log gagal (mungkin diblokir).", "color:orange;font-weight:bold;");
  }
}

/* -------------------------
   2) GALLERY: INFINITE LOOP (NO AUTOSCROLL)
   - Duplicate original set before & after
   - Keep track of original width sum
   - On scroll, if crossing threshold, jump by originalWidth
   - Works with touch drag on mobile
   ------------------------- */
(function setupInfiniteGallery(){
  const viewport = document.getElementById('loopViewport');
  const track = document.getElementById('loopTrack');
  if(!viewport || !track) return;

  // Wait until images loaded to compute widths
  const imgs = track.querySelectorAll('img');
  let imagesLoaded = 0;
  imgs.forEach(img => {
    if(img.complete) imagesLoaded++;
    else img.addEventListener('load', ()=>{ imagesLoaded++; initIfReady(); });
    img.addEventListener('error', ()=>{ imagesLoaded++; initIfReady(); });
  });

  function initIfReady(){
    if(imagesLoaded < imgs.length) return;
    initGallery();
  }
  if(imagesLoaded === imgs.length) initGallery();

  function initGallery(){
    // Snapshot original items (only the initial set)
    const originalItems = Array.from(track.children).slice(0); // copy
    // Clear any previous clones (defensive)
    // Append clones after and before
    const fragAfter = document.createDocumentFragment();
    const fragBefore = document.createDocumentFragment();
    originalItems.forEach(item => fragAfter.appendChild(item.cloneNode(true)));
    originalItems.forEach(item => fragBefore.appendChild(item.cloneNode(true)));
    track.appendChild(fragAfter);
    track.insertBefore(fragBefore, track.firstChild);

    // Compute width of one original block (sum of widths + gaps)
    const originalWidth = originalItems.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);
    // Also account for gaps: approximate by difference
    const totalTrackWidth = track.scrollWidth;
    // Set initial scroll to the start of the original set (after the prepended clones)
    // The prepended clones width equals originalWidth
    viewport.scrollLeft = originalWidth;

    // Make viewport scrollable by touch and mouse
    viewport.style.overflowX = 'auto';
    viewport.style.scrollBehavior = 'auto';
    viewport.addEventListener('scroll', onScroll, { passive: true });

    // Drag support (improves UX on some Android)
    let isDown = false, startX, scrollStart;
    viewport.addEventListener('pointerdown', (e) => {
      isDown = true;
      viewport.classList.add('dragging');
      startX = e.clientX;
      scrollStart = viewport.scrollLeft;
      viewport.setPointerCapture(e.pointerId);
    });
    viewport.addEventListener('pointermove', (e) => {
      if(!isDown) return;
      const dx = startX - e.clientX;
      viewport.scrollLeft = scrollStart + dx;
    });
    viewport.addEventListener('pointerup', (e) => {
      isDown = false;
      viewport.classList.remove('dragging');
      try{ viewport.releasePointerCapture(e.pointerId); }catch(e){}
    });
    viewport.addEventListener('pointercancel', ()=>{ isDown = false; viewport.classList.remove('dragging'); });

    // Center highlight logic
    function highlightCenter(){
      const galleryItems = track.querySelectorAll('.gallery-item');
      const centerX = viewport.scrollLeft + (viewport.offsetWidth / 2);
      galleryItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        // item offset relative to track
        const itemLeft = item.offsetLeft;
        const itemCenter = itemLeft + (item.offsetWidth / 2);
        if(Math.abs(centerX - itemCenter) < (item.offsetWidth * 0.6)) item.classList.add('active');
        else item.classList.remove('active');
      });
    }

    // Scroll correction to create seamless loop
    let ticking = false;
    function onScroll(){
      if(!ticking){
        window.requestAnimationFrame(() => {
          // If scrolled too far left (into the first clone area)
          if(viewport.scrollLeft <= 0){
            // jump forward by originalWidth
            viewport.scrollLeft = viewport.scrollLeft + originalWidth;
          } else if(viewport.scrollLeft >= (track.scrollWidth - viewport.offsetWidth - 1)){
            // scrolled to very end; jump back by originalWidth
            viewport.scrollLeft = viewport.scrollLeft - originalWidth;
          } else {
            // If near the left clone boundary (less than originalWidth/2), shift forward
            if(viewport.scrollLeft < originalWidth * 0.5){
              viewport.scrollLeft = viewport.scrollLeft + originalWidth;
            } else if(viewport.scrollLeft > (originalWidth * 1.5 + originalWidth)){ 
              // defensive: if somehow beyond expected, normalize
              viewport.scrollLeft = viewport.scrollLeft - originalWidth;
            }
          }
          highlightCenter();
          ticking = false;
        });
        ticking = true;
      }
    }

    // Initial highlight
    highlightCenter();

    // Accessibility: allow keyboard arrow navigation
    viewport.tabIndex = 0;
    viewport.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowRight') viewport.scrollLeft += 260;
      if(e.key === 'ArrowLeft') viewport.scrollLeft -= 260;
    });
  }
})();

/* -------------------------
   3) SCROLL REVEAL (IntersectionObserver)
   - Add small random delay for natural feel
   ------------------------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.transitionDelay = `${(Math.random()*300)}ms`;
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* -------------------------
   4) EASTER EGG (VARIATIF, RARE)
   - Appear from top or bottom, not too often
   ------------------------- */
(function setupEasterEgg(){
  const emojis = ['🐱','🐟','⭐'];
  const reactions = ['💖','✨','🎉','🌊'];
  // Appear every 18-28s randomly (rare)
  function spawn(){
    const egg = document.createElement('div');
    const emoji = emojis[Math.floor(Math.random()*emojis.length)];
    egg.textContent = emoji;
    const fromTop = Math.random() > 0.5;
    egg.style.position = 'fixed';
    egg.style.zIndex = 9999;
    egg.style.fontSize = '2.2rem';
    egg.style.cursor = 'pointer';
    egg.style.transition = 'transform .9s ease, opacity .9s ease, bottom .9s ease, top .9s ease';
    egg.style.left = `${10 + Math.random()*80}%`;
    if(fromTop){
      egg.style.top = '-60px';
    } else {
      egg.style.bottom = '-60px';
    }
    document.body.appendChild(egg);
    // animate in
    setTimeout(()=> {
      if(fromTop) egg.style.transform = 'translateY(80px)';
      else egg.style.transform = 'translateY(-80px)';
      egg.style.opacity = '1';
    }, 80);

    egg.addEventListener('click', () => {
      egg.textContent = reactions[Math.floor(Math.random()*reactions.length)];
      egg.style.transform = 'scale(3) translateY(-120px)';
      egg.style.opacity = '0';
      setTimeout(()=> egg.remove(), 700);
    });

    // auto remove after some time
    setTimeout(()=> { if(document.body.contains(egg)) egg.remove(); }, 7000);
  }

  // schedule first spawn after random delay
  (function scheduleNext(){
    const delay = 18000 + Math.random()*10000; // 18-28s
    setTimeout(()=>{ spawn(); scheduleNext(); }, delay);
  })();
})();

/* -------------------------
   5) CONTACT ACTIONS
   ------------------------- */
function sendWA(){
  const n = (document.getElementById('nama') || {}).value || 'Anonim';
  const p = (document.getElementById('pesan') || {}).value || '';
  const text = encodeURIComponent(`!!New_Message!! \nSaya: ${n}.\n\nPesan saya: ${p}`);
  window.open(`https://wa.me/6285188619792?text=${text}`, '_blank');
}
function sendEmail(){
  const n = (document.getElementById('nama') || {}).value || 'Anonim';
  const p = (document.getElementById('pesan') || {}).value || '';
  window.location.href = `mailto:editorminimalist@gmail.com?subject=${encodeURIComponent('Pesan dari ' + n)}&body=${encodeURIComponent(p)}`;
}

/* Trigger log (non-blocking) */
sendDetailedLog();
