const cards = document.querySelectorAll(".card")
const cardContainers = document.querySelectorAll('.card-wrapper')
console.log(cardContainers)

for (let i = 0; i < cards.length; i++) {
  let card = cards[i]
  let cardContainer = cardContainers[i]
  let isUpdating = false
  let mouseX, mouseY
  
  cardContainer.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!isUpdating) { 
      requestAnimationFrame(() => {
        const rect = cardContainer.getBoundingClientRect()
        let boxX = mouseX - rect.left
        let boxY = mouseY - rect.top
        
        let percentageX = boxX / rect.width
        let percentageY = boxY / rect.height

        let rotateX = `${(percentageX * 60) - 30}deg`
        let rotateY = `${((percentageY * 60) - 30) * -1}deg`

        card.style.setProperty("--rotate-x", `${rotateY}`)
        card.style.setProperty("--rotate-y", `${rotateX}`)
        card.style.setProperty("--brightness", `${(percentageY * -75) + 125}%`) 
        isUpdating = false
      }) 
      isUpdating = true
    }


  });
}