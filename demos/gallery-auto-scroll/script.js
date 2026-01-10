let pictureUrls = ["https://images.unsplash.com/photo-1615441000196-cae8adec6ebe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHVydGxlc3xlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1573551089778-46a7abc39d9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHVydGxlc3xlbnwwfHwwfHx8MA%3D%3D", "https://plus.unsplash.com/premium_photo-1664303431418-96daeee80139?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHR1cnRsZXN8ZW58MHx8MHx8fDA%3D", "https://images.unsplash.com/photo-1620188702521-c2dc69a85580?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHR1cnRsZXN8ZW58MHx8MHx8fDA%3D", "https://images.unsplash.com/photo-1568660357733-823cbddb0f6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHR1cnRsZXN8ZW58MHx8MHx8fDA%3D", "https://images.unsplash.com/photo-1573551089778-46a7abc39d9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHVydGxlc3xlbnwwfHwwfHx8MA%3D%3D", "https://images.unsplash.com/photo-1581242163695-19d0acfd486f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHR1cnRsZXN8ZW58MHx8MHx8fDA%3D", "https://images.unsplash.com/photo-1651058674367-54d6daeb299b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHR1cnRsZXN8ZW58MHx8MHx8fDA%3D", "https://images.unsplash.com/photo-1555782594-22819a65a167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHR1cnRsZXN8ZW58MHx8MHx8fDA%3D"
]

// automatically generate images for the gallery
const body = document.querySelector("#gallery-container")

function image() {
  const randImg = Math.floor(Math.random() * pictureUrls.length) 
  return `
  <div class="card">
    <img src="${pictureUrls[randImg]}">
  </div>
  `
}

for (let i = 1; i <= 10; i++) {
  let div = document.createElement("div")
  div.classList.add(`column`)
  let transitionLength = Math.floor(Math.random() * 30) + 100
  let transition = "moveUp"
  if (Math.floor(Math.random() * 2) == 1) {
    transition = "moveDown"
  }
  div.style.setProperty("--transition", transition)
  div.style.setProperty("--transition-length", `${transitionLength}s`)
  let divHTML = ""
  for (let j = 1; j <= 8; j++) {
    divHTML = divHTML + image()
  }
  div.innerHTML = divHTML + divHTML
  body.appendChild(div)
}