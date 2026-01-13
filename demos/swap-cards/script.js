const cards = document.querySelectorAll(".card")

for (const card of cards) {
  card.addEventListener("click", () => {
    for (subCard of cards) {
      subCard.classList.remove("center-card")
    }
    card.classList.add("center-card")
  })
}