const cards = document.querySelectorAll(".card")
console.log(cards)

let mouseX, mouseY

document.addEventListener('mousemove', (e) => {
  for (let card of cards) {
    const rect = card.getBoundingClientRect()
    let boxX = e.clientX - rect.left
    let boxY = e.clientY - rect.top

    card.style.setProperty("--box-x", `${boxX}px`)
    card.style.setProperty("--box-y", `${boxY}px`)
  }
})

