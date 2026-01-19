const cardContainer = document.querySelector(".card-container")
const dragContainer = document.querySelector(".dragging")
const placeholder = document.querySelector(".selected-area")
let cards = document.querySelectorAll(".card")
let mouseDown = false
let offsetX, offsetY
let isUpdating
let dragCard = null

function insertAtPlaceholder(card, index) {
  const ref = Array.from(cardContainer.querySelectorAll('.card, .selected-area'))[index]
  cardContainer.insertBefore(card, ref)
}

function insertBefore(card, index) {
  const ref = Array.from(cardContainer.querySelectorAll('.card'))[index] || null
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
    insertBefore(placeholder, Array.from(cardContainer.querySelectorAll('.card, .selected-area')).indexOf(card))
    placeholder.style.display = "block"
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
      cards = document.querySelectorAll('.card')
      const elementsUnderMouse = document.elementsFromPoint(e.clientX, e.clientY)
      const element = elementsUnderMouse.find(element => element.matches('.card:not(.dragging-card), .selected-area'))
      const index = Array.from(document.querySelectorAll('.card:not(.dragging-card), .selected-area')).indexOf(element)
      if (index !== -1) {
        console.log(index)
        insertBefore(placeholder, index)
      }
    } else {
      card.style.transform = '';
    }
  })
})


document.addEventListener('mouseup', () => {
  mouseDown = false
  const draggingCards = document.querySelectorAll(".dragging-card")
  cards = document.querySelectorAll(".card, .selected-area")
  console.log(cards)
  draggingCards.forEach(card => {
    insertAtPlaceholder(dragCard, Array.from(cards).indexOf(placeholder))
    dragCard.style.transform = ''
    dragCard.classList.remove("dragging-card")
  })
  placeholder.style.display = "none"
  dragCard = null
})