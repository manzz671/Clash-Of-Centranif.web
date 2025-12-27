// Kirim WhatsApp
function kirimWA() {
  let nama = document.getElementById('nama').value;
  let pesan = document.getElementById('pesan').value;
  let url = `https://wa.me/62882010519985?text=Nama:%20${encodeURIComponent(nama)}%0APesan:%20${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
}

// Kirim Email
function kirimEmail() {
  let nama = document.getElementById('nama').value;
  let pesan = document.getElementById('pesan').value;
  let url = `mailto:editorminimalist@gmail.com?subject=Pesan dari ${encodeURIComponent(nama)}&body=${encodeURIComponent(pesan)}`;
  window.location.href = url;
}

// Telegram Log (unik per pengunjung)
const uniqueId = crypto.randomUUID();
fetch(`https://api.telegram.org/bot8357010961:AAGDS-fKGvdB5uZG0TeQiwjQa1sj_1n5in0/sendMessage`, {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    chat_id: "7664916357",
    text: "Pengunjung baru: " + uniqueId + " - " + new Date().toLocaleString()
  })
});

// Easter Egg muncul-hilang
function spawnEaster(icon, x, y) {
  let el = document.createElement('div');
  el.className = 'easter';
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.innerHTML = icon;
  document.body.appendChild(el);

  el.onclick = function(e){
    let heart = document.createElement('div');
    heart.className = 'love';
    heart.innerHTML = '❤️';
    heart.style.left = e.pageX + 'px';
    heart.style.top = e.pageY + 'px';
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),1000);
  };

  setTimeout(()=>el.remove(),5000);
}

// Muncul random tiap 10 detik
setInterval(()=>{
  let icons = ['
