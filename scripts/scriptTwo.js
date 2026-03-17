let wa = document.getElementById("whatsapp")
let tele = document.getElementById("telegram")
let raw = document.getElementsByClassName("input")
let nama = raw[0]
let msg = raw[1]

//---animasi
let elements = document.querySelectorAll(".animate")
let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("active")
    }
  })
})

elements.forEach(el => observer.observe(el))

//---listener listener
wa.addEventListener("click", async () => {
  wa.style.backgroundColor = "#007107"
  wa.style.transition = ".3s ease-in-out"

  let username = nama.value
  let content = msg.value
  let message = `Hai, saya ${username.toString()}\n\nPesan saya: ${content}`
  let yes = await confirm("Yakin mau kirim lewat WhatsApp?")
  if (yes) {
    window.location.href = "https://wa.me/62882010519985?text=" + message;
  }
})

wa.addEventListener("blur", () => {
  wa.style.backgroundColor = "#00bd1a"
  wa.style.transition = ".3s ease-in-out"
})


tele.addEventListener("click", async () => {
  tele.style.backgroundColor = "#004f71"
  tele.style.transition = ".3s ease-in-out"
  let yes = await confirm("Yakin nih mau kirim ke Telegram?")
  if (!yes) {
    alert("dibatalkan")
    return;
  }
  
  let username = nama.value
  let content = msg.value
  let message = `From ${username} \n Message: ${content}`

  let url = "https://api.telegram.org/bot7660914678:AAHtGgy2zCuJJoFiGOrGgFrAUCEWxs4aLG4/sendMessage"
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: "7664916357",
      text: message
    })
  })

  if (!res.ok) alert("Gagal kirim. Coba cara lain")

  alert("Berhasil Mengirim Pesan, silahkan tunggu respon ya!")

})

tele.addEventListener("blur", () => {
  tele.style.backgroundColor = "#00b1f0"
  tele.style.transition = ".3s ease-in-out"
})