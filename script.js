// Data Telegram Anda
const TG_TOKEN = "8357010961:AAGDS-fKGvdB5uZG0TeQiwjQa1sj_1n5in0";
const TG_ID = "7664916357";

// 1. Log Pengunjung (Silent)
async function sendLog() {
    const id = `USER-${Math.floor(Math.random() * 9999)}`;
    const msg = `🔔 Centranif Access\nID: ${id}\nTime: ${new Date().toLocaleTimeString()}`;
    try {
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TG_ID, text: msg })
        });
    } catch (e) { console.log("Offline mode"); }
}

// 2. Carousel Logic (Auto-center highlight)
const carousel = document.querySelector('.carousel-wrapper');
if(carousel) {
    carousel.addEventListener('scroll', () => {
        const items = document.querySelectorAll('.carousel-item');
        const center = carousel.scrollLeft + (carousel.offsetWidth / 2);
        
        items.forEach(item => {
            const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
            const dist = Math.abs(center - itemCenter);
            
            if(dist < 150) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
}

// 3. Easter Egg: Peeking Emoji
const icons = ['🐱', '🐟', '⭐'];
function spawnEmoji() {
    const el = document.createElement('div');
    el.className = 'easter-egg';
    el.innerText = icons[Math.floor(Math.random() * icons.length)];
    
    // Position: Side Peeking
    const isLeft = Math.random() > 0.5;
    el.style.left = isLeft ? '-50px' : 'auto';
    el.style.right = isLeft ? 'auto' : '-50px';
    el.style.top = (Math.random() * 80 + 10) + '%';
    el.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    
    document.body.appendChild(el);

    // Animasi Mengintip
    setTimeout(() => {
        el.style.transform = isLeft ? 'translateX(70px)' : 'translateX(-70px)';
    }, 100);

    el.onclick = () => {
        el.innerText = '💖';
        el.style.transform = 'translateY(-100px) scale(2)';
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 800);
    };

    setTimeout(() => { if(el) el.remove(); }, 5000);
}

// Form logic untuk hubungi.html
function sendWA() {
    const n = document.getElementById('nama').value || "Anonim";
    const p = document.getElementById('pesan').value || "Halo!";
    window.open(`https://wa.me/62882010519985?text=Halo, saya ${n}. ${p}`);
}

window.onload = () => {
    sendLog();
    setInterval(spawnEmoji, 12000);
};
