// 1. Double-Way Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. Android Carousel Engine
const viewport = document.getElementById('viewport');
const track = document.getElementById('track');

// Infinite Loop Simulation
viewport.addEventListener('scroll', () => {
    const items = document.querySelectorAll('.carousel-item');
    const scrollLeft = viewport.scrollLeft;
    const half = viewport.scrollWidth / 2;

    // Center Detection for Upscale
    items.forEach(item => {
        const center = viewport.scrollLeft + (viewport.offsetWidth / 2);
        const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
        if (Math.abs(center - itemCenter) < 100) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Reset Scroll for Infinity
    if (scrollLeft <= 5) {
        viewport.scrollLeft = half;
    } else if (scrollLeft >= viewport.scrollWidth - viewport.offsetWidth - 5) {
        viewport.scrollLeft = half - viewport.offsetWidth;
    }
});

// Init Clone for Loop
window.onload = () => {
    const clones = track.innerHTML;
    track.innerHTML += clones; // Duplicate for loop
    viewport.scrollLeft = viewport.scrollWidth / 4; // Start in middle
    
    // Log Telegram
    fetch(`https://api.telegram.org/bot8357010961:AAGDS-fKGvdB5uZG0TeQiwjQa1sj_1n5in0/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({chat_id: "7664916357", text: "New Visitor at Centranif"})
    }).catch(e => {});
};

// 3. Click to View Image
document.querySelectorAll('.carousel-item img').forEach(img => {
    img.onclick = () => window.open(img.src, '_blank');
});
