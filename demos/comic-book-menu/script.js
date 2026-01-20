let counter = 0
const rightPage = document.querySelector(".right-page")
const menuItems = [
  "Monkey Buisness",
  "Can't touch this",
  "Beeg sky",
  "Menu item 4",
  "Menu item 5",
  "Menu item 6",
  "Menu item 7",
  "Menu item 8",
  "Menu item 9",
  "Menu item 10",
  "Menu item 11",
  "Menu item 12",
  "Menu item 13",
]

menuImages = [
  "https://images.unsplash.com/photo-1463852247062-1bbca38f7805?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9ua2V5fGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1670210080045-a2e0da63dd99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90JTIwc3VyZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1764377849133-635add556929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1764377849133-635add556929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1764377849133-635add556929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1764377849133-635add556929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1764377849133-635add556929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1764377849133-635add556929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1764377849133-635add556929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1764377849133-635add556929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1764377849133-635add556929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1764377849133-635add556929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1764377849133-635add556929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
]

function preloadImages(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = src
    img.onload = () => resolve()
    img.onerror = () => resolve()
  })
}

function adjustTiles() {
  const displayedTiles = document.querySelectorAll(".menu-item")
  displayedTiles.forEach(tile => {
    const rect = tile.getBoundingClientRect()
    if (rect.height - 50 > rect.width) {
      tile.classList.add("rotated")
    } else {
      tile.classList.remove("rotated")
    }

  })
}

async function displayNextItem() {
  const idx = 12 - counter
  await preloadImages(menuImages[idx])
  const div = document.createElement('div')
  div.classList.add("menu-item")
  div.innerHTML = `
    <img src="${menuImages[12- counter]}">
    <h2>${menuItems[12 - counter]}</h2>
  `
  rightPage.insertBefore(div, rightPage.children[0])
  console.log(div)
  adjustTiles()
  counter += 1;
  if (counter < 13) {
    setTimeout(() => {
      displayNextItem()
    }, (Math.random() * 100) + 200)
  }
}

displayNextItem()

