const cardContainer = document.querySelector(".cards");
let cards = document.querySelectorAll(".card:not(.removing)");
let rightbutton = document.querySelector(".button-left");
let leftbutton = document.querySelector(".button-right");
const body = document.querySelector("body")
let touchstart, touchend;

let diff

cardContainer.addEventListener("touchmove", (e) => {
  e.preventDefault()
  const currentX = e.touches[0].clientX;
  diff = currentX - touchstart

  cards.forEach(card => {
    if (card.dataset.position == "center") {
      card.style.transform = `translateX(calc(-50% + ${diff}px)) scale(1)`
    } else if (card.dataset.position == "left") {
      let scale
      if (Math.abs(diff) < 500) {
        scale = ((0.4 / 500) * math.abs(diff)) + 0.6
      } else {
        scale = 0.6
      }
      card.style.transform = `translateX(calc(-50% - 500px + ${diff}px)) scale(${scale})`

      console.log(card.style.transform)
    } else if (card.dataset.position == "right") {
      card.style.transform = `translateX(calc(-50% + 500px + ${diff}px)) scale(0.6)`
    }
  })
})

cardContainer.addEventListener("touchstart", (e) => {
  touchstart = e.touches[0].clientX;
  touchStartTime = Date.now()
  cards = document.querySelectorAll(".card:not(.removing)")
  cards.forEach(card => card.style.transition = "none")
});

cardContainer.addEventListener("touchend", (e) => {
  touchend = e.changedTouches[0].clientX;
  console.log(touchstart, touchend)
  cards = document.querySelectorAll(".card:not(.removing)")
  cards.forEach(card => {
    card.style.transition = ''
    card.style.transform = ''
  })
  if (Math.abs(diff) > 50) {
    updateCardPositions(diff > 0 ? "left" : "right")
  }
});

function addClickListener(card, direction) {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    cards = document.querySelectorAll(".card:not(.removing)");
    updateCardPositions(direction);
  });
}

function createCard(left, card) {
  let newCard = card.cloneNode(true);
  newCard.style.transform = left
    ? "translateX(calc(-50% - 1200px)) scale(0.7)"
    : "translateX(calc(-50% + 1200px)) scale(0.7)";
  newCard.dataset.position = left ? "left" : "right";
  cardContainer.appendChild(newCard);

  setTimeout(() => {
    newCard.style.removeProperty("transform");
  }, 10);
}

function updateCardPositions(position) {
  console.log(position)
  if (position == "left") {
    let swapCard;
    for (let subcard of cards) {
      if (subcard.dataset.position == "left") {
        subcard.dataset.position = "center";
      } else if (subcard.dataset.position == "center") {
        subcard.dataset.position = "right";
      } else {
        swapCard = subcard;
      }
    }
    createCard(true, swapCard);
    swapCard.style.transform = "translateX(calc(-50% + 1200px)) scale(0.7)";
    swapCard.classList.add("removing");

    setTimeout(() => {
      swapCard.remove();
    }, 1000);
  } else if (position == "right") {
    let swapCard;
    for (subcard of cards) {
      if (subcard.dataset.position === "right") {
        subcard.dataset.position = "center";
      } else if (subcard.dataset.position === "center") {
        subcard.dataset.position = "left";
      } else {
        swapCard = subcard;
      }
    }
    createCard(false, swapCard);
    swapCard.style.transform = "translateX(calc(-50% - 1200px)) scale(0.7)";
    swapCard.classList.add("removing");

    setTimeout(() => {
      swapCard.remove();
    }, 1000);
  }
}

for (const card of cards) {
  addClickListener(card, card.dataset.position);
}

addClickListener(rightbutton, "right");
addClickListener(leftbutton, "left");
