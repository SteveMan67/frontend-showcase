const cards = document.querySelectorAll(".card")
console.log(cards)

let mouseX, mouseY

let cardRects
function updateCardRects() {
  cardRects = []
  for (let card of cards) {
    cardRects.push(card.getBoundingClientRect())
  }
}
updateCardRects()

window.addEventListener('resize', () => {
  updateCardRects()
})

let isUpdating

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY

  if (!isUpdating) {
    requestAnimationFrame(() => {
      cards.forEach((card, index) => {
        const rect = cardRects[index]
        let boxX = mouseX - rect.left
        let boxY = mouseY - rect.top

        card.style.setProperty("--box-x", `${boxX}px`)
        card.style.setProperty("--box-y", `${boxY}px`)
      })
      isUpdating = false
    })
    isUpdating = true
  }
})

