// CONFIG TELEGRAM
const TG_TOKEN = "8357010961:AAGDS-fKGvdB5uZG0TeQiwjQa1sj_1n5in0";
const TG_CHAT_ID = "7664916357";

// 1. ADVANCED LOGGING (REAL DATA)
async function sendDetailedLog() {
    try {
        // Ambil IP & Lokasi Asli
        const geoReq = await fetch('https://ipapi.co/json/');
        const geo = await geoReq.json();
        
        const data = {
            time: new Date().toLocaleString('id-ID'),
            ip: geo.ip || 'Unknown',
            city: geo.city || 'Unknown',
            isp: geo.org || 'Unknown',
            browser: navigator.userAgentData ? navigator.userAgentData.brands[0].brand : 'Legacy Browser',
            platform: navigator.platform,
            screen: `${window.screen.width}x${window.screen.height}`
        };

        const message = `
🌊 *Centranif Visitor Log*
━━━━━━━━━━━━━━━
📅 *Waktu:* ${data.time}
🌐 *IP:* \`${data.ip}\`
📍 *Lokasi:* ${data.city}, ${geo.country_name}
🏢 *ISP:* ${data.isp}
💻 *Device:* ${data.platform}
📱 *Browser:* ${data.browser}
🖥️ *Resolusi:* ${data.screen}
━━━━━━━━━━━━━━━`;

        fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TG_CHAT_ID, text: message, parse_mode: 'Markdown' })
        });
    } catch (e) {
        console.error("Log failed, probably adblocker.");
    }
}

// 2. INFINITE CAROUSEL ENGINE (NO-GAP)
const viewport = document.getElementById('loopViewport');
const track = document.getElementById('loopTrack');

if (track) {
    const items = [...track.children];
    // Clone twice to ensure no empty space
    items.forEach(item => track.appendChild(item.cloneNode(true)));
    items.forEach(item => track.insertBefore(item.cloneNode(true), track.firstChild));

    viewport.addEventListener('scroll', () => {
        const itemWidth = 300; // item + gap
        if (viewport.scrollLeft <= 0) {
            viewport.scrollLeft = track.offsetWidth / 3;
        } else if (viewport.scrollLeft >= (track.offsetWidth * 2) / 3) {
            viewport.scrollLeft = track.offsetWidth / 3;
        }

        // Highlight center item
        const galleryItems = document.querySelectorAll('.gallery-item');
        const centerX = viewport.scrollLeft + (viewport.offsetWidth / 2);

        galleryItems.forEach(item => {
            const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
            if (Math.abs(centerX - itemCenter) < 150) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    // Set Initial Position
    window.addEventListener('load', () => {
        viewport.scrollLeft = track.offsetWidth / 3;
    });
}

// 3. SCROLL REVEAL (2-WAY)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
        else entry.target.classList.remove('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 4. EASTER EGG (INTERACTIVE)
const emojis = ['🐱', '🐟', '⭐'];
setInterval(() => {
    const egg = document.createElement('div');
    egg.innerText = emojis[Math.floor(Math.random()*emojis.length)];
    egg.style.cssText = `position:fixed; bottom:-50px; left:${Math.random()*90}%; font-size:2.5rem; cursor:pointer; z-index:99; transition:1s;`;
    document.body.appendChild(egg);
    setTimeout(() => egg.style.bottom = '20px', 100);
    egg.onclick = () => {
        egg.innerText = '💖';
        egg.style.transform = 'scale(4) translateY(-100px)';
        egg.style.opacity = '0';
        setTimeout(() => egg.remove(), 800);
    };
    setTimeout(() => { if(egg) egg.remove(); }, 7000);
}, 20000);

// ACTIONS
function sendWA() {
    const n = document.getElementById('nama').value;
    const p = document.getElementById('pesan').value;
    window.open(`https://wa.me/62882010519985?text=Halo Centranif! Saya ${n}. %0A%0A${p}`);
}

function sendEmail() {
    const n = document.getElementById('nama').value;
    const p = document.getElementById('pesan').value;
    window.location.href = `mailto:editorminimalist@gmail.com?subject=Pesan dari ${n}&body=${p}`;
}

sendDetailedLog();
