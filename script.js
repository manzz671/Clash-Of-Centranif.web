const TG_TOKEN = "8357010961:AAGDS-fKGvdB5uZG0TeQiwjQa1sj_1n5in0";
const TG_CHAT_ID = "7664916357";

// 1. Log Telegram Otomatis
async function logVisitor() {
    const text = `🌊 Centranif Visitor\nTime: ${new Date().toLocaleTimeString()}\nID: ${Math.random().toString(36).substr(2, 5)}`;
    fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: text })
    }).catch(err => console.log("Silent"));
}

// 2. Scroll Reveal Animation
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. Infinite Carousel Logic
const track = document.getElementById('carouselTrack');
const wrapper = document.getElementById('carouselWrapper');

if(track) {
    // Clone items for infinity
    const items = [...track.children];
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
        // Link Catbox Click
        item.addEventListener('click', () => window.open(item.querySelector('img').src, '_blank'));
        clone.addEventListener('click', () => window.open(clone.querySelector('img').src, '_blank'));
    });

    wrapper.addEventListener('scroll', () => {
        const maxScroll = wrapper.scrollWidth - wrapper.offsetWidth;
        if (wrapper.scrollLeft >= maxScroll - 1) {
            wrapper.scrollLeft = 1;
        } else if (wrapper.scrollLeft <= 0) {
            wrapper.scrollLeft = maxScroll - 1;
        }
        
        // Active Scaling
        document.querySelectorAll('.carousel-item').forEach(item => {
            const center = wrapper.scrollLeft + (wrapper.offsetWidth / 2);
            const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
            if(Math.abs(center - itemCenter) < 150) item.classList.add('active');
            else item.classList.remove('active');
        });
    });
}

// 4. Easter Egg Peeking
function spawnEgg() {
    const emojis = ['🐱', '🐟', '⭐'];
    const egg = document.createElement('div');
    egg.style.cssText = `position:fixed; bottom:-50px; left:${Math.random()*90}%; font-size:2rem; cursor:pointer; z-index:1000; transition:0.8s;`;
    egg.innerText = emojis[Math.floor(Math.random()*emojis.length)];
    document.body.appendChild(egg);

    setTimeout(() => egg.style.bottom = '20px', 100);
    egg.onclick = () => {
        egg.innerText = '💖';
        egg.style.transform = 'scale(3) translateY(-100px)';
        egg.style.opacity = '0';
        setTimeout(() => egg.remove(), 800);
    }
    setTimeout(() => { if(egg) egg.remove(); }, 6000);
}

// 5. Actions
function sendWA() {
    const n = document.getElementById('nama').value;
    const p = document.getElementById('pesan').value;
    window.open(`https://wa.me/62882010519985?text=Halo Centranif! Saya ${n}. ${p}`);
}

function sendEmail() {
    const n = document.getElementById('nama').value;
    const p = document.getElementById('pesan').value;
    window.location.href = `mailto:editorminimalist@gmail.com?subject=Pesan dari ${n}&body=${p}`;
}

window.onload = () => {
    logVisitor();
    setInterval(spawnEgg, 15000);
};
