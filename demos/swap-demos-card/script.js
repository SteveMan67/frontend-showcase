const cardContainer = document.querySelector(".card-container")
const dragContainer = document.querySelector(".dragging")
let cards = document.querySelectorAll(".card")
console.log(cards)
let mouseDown = false
let offsetX, offsetY
let isUpdating

cards.forEach(card => {
  card.addEventListener("mousedown", (e) => {
    console.log("mousedown")
    e.preventDefault()
    mouseDown = true
    // move it to the container for dragging
    offsetX = e.offsetX
    offsetY = e.offsetY
    const rect = card.getBoundingClientRect()
    card.style.transform = `translateX(${e.clientX - offsetX}px) translateY(${e.clientY - offsetY}px)`
    dragContainer.appendChild(card)
  })
  card.addEventListener("mousemove", (e) => {
    if (mouseDown) {      
      if (!isUpdating) {
        requestAnimationFrame(() => {
          dragCard = document.querySelector(".dragging .card")
          e.preventDefault()
          const rect = dragCard.getBoundingClientRect()
          dragCard.style.transform = `translateX(${e.clientX - offsetX}px) translateY(${e.clientY - offsetY}px)`
          isUpdating = false
        })
        isUpdating = true
      }
    }
  })
})


document.addEventListener('mouseup', () => {
  mouseDown = false
  const draggingCards = document.querySelectorAll(".dragging .card")
  cards = document.querySelectorAll(".card")
  cards.forEach(card => {
    card.style.transform = ''
  })
  draggingCards.forEach(card => {
    cardContainer.appendChild(card)
    card.style.transform = ''
  })
})