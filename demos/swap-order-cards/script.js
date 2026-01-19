const cardContainer = document.querySelector(".card-container")
const dragContainer = document.querySelector(".dragging")
const selectedContainer = document.querySelector(".selected-area")
let cards = document.querySelectorAll(".card")
let mouseDown = false
let offsetX, offsetY
let isUpdating
let dragCard = null

function insertAt(card, index) {
  const ref = cardContainer.children[index] || null
  cardContainer.insertBefore(card, ref)
}

cards.forEach(card => {
  card.addEventListener("mousedown", (e) => {
    e.preventDefault()
    mouseDown = true
    // move it to the container for dragging
    offsetX = e.offsetX
    offsetY = e.offsetY
    card.classList.add("dragging-card")
    card.style.transform = `translateX(${e.clientX - offsetX}px) translateY(${e.clientY - offsetY}px)`
    insertAt(selectedContainer, Array.from(cardContainer.querySelectorAll('.card')).indexOf(card))
    selectedContainer.style.display = "block"
    dragContainer.appendChild(card)
    dragCard = card
  })
  card.addEventListener("mousemove", (e) => {
    if (mouseDown) {
      if (!isUpdating) {
        requestAnimationFrame(() => {
          if (!mouseDown || !dragCard) {
            isUpdating = false
            return
          }
          e.preventDefault()
          dragCard.style.transform = `translateX(${e.clientX - offsetX}px) translateY(${e.clientY - offsetY}px)`
          isUpdating = false
        })
        isUpdating = true
      }
      if (card.contains(e.target)) {
        // move the target selector to the current position
        insertAt(selectedContainer, Array.from(cardContainer.querySelectorAll('.card')).indexOf(card))
        console.log(Array.from(cardContainer.querySelectorAll('.card')).indexOf(card))
      }
    } else {
      card.style.transform = '';
    }
  })
})


document.addEventListener('mouseup', () => {
  mouseDown = false
  const draggingCards = document.querySelectorAll(".dragging-card")
  cards = document.querySelectorAll(".card")
  cards.forEach(card => {
    card.style.transform = ''
  })
  draggingCards.forEach(card => {
    cardContainer.appendChild(card)
    card.style.transform = ''
    card.classList.remove("dragging-card")
  })
  selectedContainer.style.display = "none"
  cardContainer.append(selectedContainer)
  dragCard = null
})