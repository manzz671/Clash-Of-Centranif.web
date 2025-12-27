const TG_TOKEN = "8357010961:AAGDS-fKGvdB5uZG0TeQiwjQa1sj_1n5in0";
const TG_CHAT_ID = "7664916357";

// 1. Double-Way Scroll Animation
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint && revealTop > -el.offsetHeight) {
            el.classList.add('active');
        } else {
            el.classList.remove('active'); // Reset animasi saat scroll ke atas
        }
    });
};
window.addEventListener('scroll', revealElements);

// 2. 3D Infinite Carousel (Seamless Loop)
const track = document.getElementById('carouselTrack');
if(track) {
    // Clone items for seamless looping
    const items = [...track.children];
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
        item.onclick = () => window.open(item.querySelector('img').src, '_blank');
        clone.onclick = () => window.open(clone.querySelector('img').src, '_blank');
    });

    const wrapper = track.parentElement;
    wrapper.addEventListener('scroll', () => {
        if (wrapper.scrollLeft <= 0) {
            wrapper.scrollLeft = wrapper.scrollWidth / 2;
        } else if (wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.offsetWidth) {
            wrapper.scrollLeft = wrapper.scrollWidth / 2 - wrapper.offsetWidth;
        }

        // Auto-Scale Center Item
        const center = wrapper.scrollLeft + (wrapper.offsetWidth / 2);
        document.querySelectorAll('.carousel-item').forEach(item => {
            const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
            if(Math.abs(center - itemCenter) < 150) item.classList.add('active');
            else item.classList.remove('active');
        });
    });
    
    // Set initial position to middle for infinity feel
    window.onload = () => {
        wrapper.scrollLeft = 100; 
        revealElements(); 
    };
}

// 3. Telegram Log
async function logVisit() {
    const info = `🌟 Accessing Centranif\nID: ${Math.random().toString(36).substr(2, 6)}\nUA: ${navigator.userAgent.slice(0,30)}`;
    fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({chat_id: TG_CHAT_ID, text: info})
    }).catch(e => {});
}
logVisit();
