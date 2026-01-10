const cards = document.querySelectorAll(".card")

for (const card of cards) {

  let isUpdating
  let mouseX, mouseY
  card.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    if (!isUpdating) {
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        let boxX = mouseX - rect.left
        let boxY = mouseY - rect.top

        let percentageX = boxX / rect.width
        let percentageY = boxY / rect.height

        let rotateX = `${(percentageX * 80) - 40}deg`
        let rotateY = `${((percentageY * 80) - 40) * -1}deg`

        card.style.setProperty("--rotate-x", `${rotateY}`)
        card.style.setProperty("--rotate-y", `${rotateX}`)
      })
    }
  })
}