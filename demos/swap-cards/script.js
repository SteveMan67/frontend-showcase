const cardContainer = document.querySelector(".cards")
let cards = document.querySelectorAll(".card:not(.removing)")
let rightbutton = document.querySelector(".button-left")
let leftbutton = document.querySelector(".button-right")

function addClickListener(card, direction) {
  card.addEventListener("click", (e) => {
    e.preventDefault()
    cards = document.querySelectorAll(".card:not(.removing)")
    updateCardPositions(direction)
  })
}

function createCard(left, card) {
  let newCard = card.cloneNode(true)
  newCard.style.transform = left ? "translateX(calc(-50% - 1200px)) scale(0.7)" : "translateX(calc(-50% + 1200px)) scale(0.7)"
  newCard.dataset.position = left ? "left" : "right"
  addClickListener(newCard, newCard.dataset.position)
  cardContainer.appendChild(newCard)
  
  setTimeout(() => {
    newCard.style.removeProperty("transform")
  }, 10)
}

function updateCardPositions(position) {
  console.log(position)
  if (position == "left") {
    let swapCard
    for (let subcard of cards) {
      if (subcard.dataset.position == "left") {
        subcard.dataset.position = "center"
      } else if (subcard.dataset.position == "center") {
        subcard.dataset.position = "right"
      } else {
        swapCard = subcard
      }
    }
    createCard(true, swapCard)
    swapCard.style.transform = "translateX(calc(-50% + 1200px)) scale(0.7)"
    swapCard.classList.add("removing")

    setTimeout(() => {
      swapCard.remove()
    }, 1000)
  } else if (position == "right") {
    let swapCard
    for (subcard of cards) {
      if (subcard.dataset.position === "right") {
        subcard.dataset.position = "center"
      } else if (subcard.dataset.position === "center") {
        subcard.dataset.position = "left"
      } else {
        swapCard = subcard
      }
    }
    createCard(false, swapCard)
    swapCard.style.transform = "translateX(calc(-50% - 1200px)) scale(0.7)" 
    swapCard.classList.add("removing")

    setTimeout(() => {
      swapCard.remove()
    }, 1000)
  }
} 

for (const card of cards) {
  addClickListener(card, card.dataset.position)
}

addClickListener(rightbutton, "right")
addClickListener(leftbutton, "left")