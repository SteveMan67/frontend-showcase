const cardContainer = document.querySelector(".cards");
let cards = document.querySelectorAll(".card:not(.removing)");
let rightbutton = document.querySelector(".button-left");
let leftbutton = document.querySelector(".button-right");
const body = document.querySelector("body")
let touchstart, touchend;

let diff
let mouseDown = false
let visibleCards = []
let cardImages = ["https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8fHww", "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHxlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhdHxlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D"]
let cardList = []
for (card in cardImages) {
  let div = document.createElement("div")
  div.classList.add("card")
  div.innerHTML = `<img src="${cardImages[card]}">`
  if (card == 0) {
    div.dataset.position = "left"
    visibleCards.push(div)
  } else if (card == 1) {
    div.dataset.position = "center"
    visibleCards.push(div)
  } else if (card == 2) {
    div.dataset.position = "right"
    visibleCards.push(div)
  } else {
    div.dataset.position = "hidden"
  }
  cardContainer.appendChild(div)
  cardList.push(div)
}

function touchMoveLogic(clientX) {
  const currentX = clientX
  diff = currentX - touchstart
  cards.forEach(card => {
    let scale;
    if (card.dataset.position == "center") {
      if (Math.abs(diff) < 500) {
        if (diff < 0) {
          scale = (((0.4 / 500) * diff) + 1)
        } else {
          scale = (((0.4 / 500) * diff * -1) + 1)
        }
      } else {
        scale = 0.6
      }

      
    } else if (card.dataset.position == "left") {
      if (diff > 0 && diff < 1000) {
        if (diff < 500) {
          scale = (((0.4 / 500) * diff) + 0.6)
        } else {
          scale = 1 - (((0.4 / 500) * diff) - 0.4)
        }
        
      } else {
        scale = 0.6
      }
    } else if (card.dataset.position == "right") {
      if (diff < 0 && diff > -1000) {
        if (diff > -500) {
          scale = 0.6 - (((0.4 / 500) * diff))
        } else {
          scale = 1 - (((0.4 / 500) * ((diff + 500) * -1)))
        }
      } else {
        scale = 0.6
      }
    } else {
      scale = 0.6
    }
    card.style.setProperty("--drag", `${diff}px`)
    card.style.setProperty("--scale", scale.toString())
  })

  // add new cards and remove old ones
}

function touchStartLogic(clientX) {
  touchstart = clientX;
  touchStartTime = Date.now()
  cards = document.querySelectorAll(".card:not(.removing)")
  cards.forEach(card => card.style.transition = "none")
}

function touchEndLogic(clientX) {
  touchend = clientX;
  cards = document.querySelectorAll(".card:not(.removing)")
  cards.forEach(card => {
    card.style.transition = ''
    card.style.transform = ''
  })
  cards.forEach(card => {
    card.style.removeProperty("--drag");
    card.style.removeProperty("--scale")
  })
  if (Math.abs(diff) > 50) {
    updateCardPositions(diff > 0 ? "left" : "right")
  } else {
    
    updateCardPositions()
  }
}

const cardElements = document.querySelectorAll(".card")

cardElements.forEach(card => {
  card.addEventListener("touchmove", (e) => {
    e.preventDefault()
    touchMoveLogic(e.touches[0].clientX)
  })
  
  card.addEventListener("mousemove", (e) => {
    if (mouseDown) {
      touchMoveLogic(e.clientX)
    }
  })
  
  card.addEventListener("touchstart", (e) => {
    touchStartLogic(e.touches[0].clientX)
  });
  
  card.addEventListener("mousedown", (e) => {
    e.preventDefault()
    mouseDown = true
    touchStartLogic(e.clientX)
  })
  
  card.addEventListener("touchend", (e) => {
    touchEndLogic(e.changedTouches[0].clientX)
  });
  
  card.addEventListener("mouseup", (e) => {
    mouseDown = false
    touchEndLogic(e.clientX)
  })

})

function findNextCard(left, card) {
  if (left) {
    let index = cardList.indexOf(card)
    if (index == 0) {
      return cardList[cardList.length - 1]
    } else {
      return cardList[index - 1]
    }
  } else {
    let index = cardList.indexOf(card)
    if (index == cardList.length - 1) {
      return cardList[0]
    } else {
      return cardList[index + 1]
    }
  }
}

function addClickListener(card, direction) {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    cards = document.querySelectorAll(".card:not(.removing)");
    updateCardPositions(direction);
  });
}

document.addEventListener("keydown", (e) => {
  console.log(e.key)
  if (e.key = "ArrowRight") {
    console.log(e.key)
    updateCardPositions("left")
  } else if (e.key = "ArrowLeft") {
    console.log(e.key)
    updateCardPositions("right")
  }
})


function addCard(left, card, oldCard) {
  if (left) {
    visibleCards.unshift(card)
    visibleCards.pop()
  } else {
    visibleCards.push(card)
    visibleCards.shift()
  }
  card.style.transition = "none"
  card.dataset.position = left ? "left" : "right"
  card.style.transform = left
    ? "translateX(calc(-50% - 1200px)) translateY(-50%) scale(0.7)"
    : "translateX(calc(-50% + 1200px)) translateY(-50%) scale(0.7)";
  oldCard.style.transform = left ? "translateX(calc(-50% + 1200px)) translateY(-50%) scale(0.7)" : "translateX(calc(-50% - 1200px)) translateY(-50%) scale(0.7)"
  void card.offsetWidth
  card.style.transition = ""
  setTimeout(() => { 
    card.style.removeProperty("transform");
  }, 10);
}

function updateCardPositions(position) {
  console.log(position)
  if (position == "left") {
    let newCard;
    let removedCard
    for (let subcard of cardList) {
      if (subcard.dataset.position == "hidden") {

      } else if (subcard.dataset.position == "left") {
        subcard.dataset.position = "center";
        newCard = findNextCard(true, subcard)
      } else if (subcard.dataset.position == "center") {
        subcard.dataset.position = "right";
      } else if (subcard.dataset.position == "right") {
        removedCard = subcard
        subcard.dataset.position = "hidden"
      }
    }
    addCard(true, newCard, removedCard);
  } else if (position == "right") {
    let newCard;
    let removedCard
    for (subcard of cardList) {
      if (subcard.dataset.position === "right") {
        subcard.dataset.position = "center";
        newCard = findNextCard(false, subcard)
      } else if (subcard.dataset.position === "center") {
        subcard.dataset.position = "left";
      } else if (subcard.dataset.position == "left") {
        removedCard = subcard
        subcard.dataset.position = "hidden"
      }
    }
    addCard(false, newCard, removedCard);
  }
}

addClickListener(rightbutton, "right")
addClickListener(leftbutton, "left")