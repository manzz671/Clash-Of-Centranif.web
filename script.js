// Konfigurasi Telegram
const TELEGRAM_TOKEN = "8357010961:AAGDS-fKGvdB5uZG0TeQiwjQa1sj_1n5in0";
const CHAT_ID = "7664916357";

// 1. Log Pengunjung Baru
function logVisitor() {
    const uniqueId = Math.random().toString(36).substring(2, 9);
    const timestamp = new Date().toLocaleString('id-ID');
    const userAgent = navigator.userAgent.slice(0, 50);
    const text = `🚀 Pengunjung Baru:\nID: ${uniqueId}\nWaktu: ${timestamp}\nDevice: ${userAgent}`;

    fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });
}

// 2. Easter Egg Logic
const emojis = ['🐱', '🐟', '⭐', '🐙', '💎'];
function createEasterEgg() {
    const egg = document.createElement('div');
    egg.className = 'easter-egg';
    egg.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Posisi acak di pinggir layar
    const side = Math.floor(Math.random() * 4);
    if(side === 0) { egg.style.top = '50%'; egg.style.left = '-30px'; } // Kiri
    else if(side === 1) { egg.style.top = '50%'; egg.style.right = '-30px'; } // Kanan
    else { egg.style.bottom = '-30px'; egg.style.left = Math.random() * 100 + '%'; }

    document.body.appendChild(egg);

    // Animasi "Mengintip"
    setTimeout(() => {
        egg.style.transform = side === 0 ? 'translateX(40px)' : side === 1 ? 'translateX(-40px)' : 'translateY(-40px)';
    }, 100);

    // Reaksi saat diklik
    egg.onclick = (e) => {
        const reaction = document.createElement('span');
        reaction.className = 'reaction';
        reaction.innerText = '❤️';
        reaction.style.left = e.pageX + 'px';
        reaction.style.top = e.pageY + 'px';
        document.body.appendChild(reaction);
        setTimeout(() => reaction.remove(), 1000);
        egg.style.transform = 'scale(2) rotate(360deg)';
        setTimeout(() => egg.remove(), 500);
    };

    // Hilang setelah beberapa detik
    setTimeout(() => { if(egg) egg.remove(); }, 6000);
}

// 3. Form Actions
function sendWA() {
    const nama = document.getElementById('nama').value;
    const pesan = document.getElementById('pesan').value;
    const text = `Halo, saya ${nama}. Pesan: ${pesan}`;
    window.open(`https://wa.me/62882010519985?text=${encodeURIComponent(text)}`);
}

function sendEmail() {
    const nama = document.getElementById('nama').value;
    const pesan = document.getElementById('pesan').value;
    window.location.href = `mailto:editorminimalist@gmail.com?subject=Pesan dari ${nama}&body=${pesan}`;
}

// Initialize
window.onload = () => {
    logVisitor();
    setInterval(createEasterEgg, 15000); // Muncul setiap 15 detik

    // Particle Glow Effect
    const particles = document.getElementById('particles');
    for(let i=0; i<20; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position: absolute;
            width: 4px; height: 4px;
            background: #ff2d95;
            border-radius: 50%;
            top: ${Math.random()*100}%;
            left: ${Math.random()*100}%;
            box-shadow: 0 0 10px #ff2d95;
            opacity: 0.3;
            animation: fadeIn ${Math.random()*5+2}s infinite alternate;
        `;
        particles.appendChild(p);
    }
};
