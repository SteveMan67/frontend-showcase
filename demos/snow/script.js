const snowContainer = document.querySelector(".snow-container")

let snowflakes = []

for (let i = 0; i <= 30; i++) {
  snowflakes.push(document.createElement('div'))
  let div = document.createElement('div')
  snowflakes[i].classList.add("snowflake")
  let lengthFromScreen = Math.floor(Math.random() * 125) + 100
  let animationLength = (1500 / lengthFromScreen) * 7
  let offsetY = Math.floor(Math.random() * snowContainer.getBoundingClientRect().height)
  let offsetPercentage = offsetY / snowContainer.getBoundingClientRect().height

  snowflakes[i].style.setProperty("--debug-time-to-reset", (animationLength * (1 - offsetPercentage)) * 1000)
  snowflakes[i].style.setProperty("--snowflake-size", `${(lengthFromScreen / 12)}px`)
  snowflakes[i].style.setProperty("--animation-length", `${animationLength * (1 - offsetPercentage)}s`)
  snowflakes[i].style.setProperty("--x-movement", `${Math.floor(Math.random() * 200) - 100}px`)
  snowflakes[i].style.setProperty("--offset-x", `${Math.floor(Math.random() * snowContainer.getBoundingClientRect().width)}px`)
  snowflakes[i].style.setProperty("--start-y", `${offsetY}px`)
  // div.style.setProperty("--animation-delay", `${Math.floor(Math.random() * 15)}s`)
  snowContainer.appendChild(snowflakes[i])
  console.log(`${animationLength}s`)
  setTimeout(() => {
    snowflakes[i].style.animation = 'none';
    snowflakes[i].offsetHeight
    snowflakes[i].style.setProperty("--start-y", `-30px`)
    snowflakes[i].style.setProperty("--animation-length", `${animationLength}s`)
    snowflakes[i].style.animation = '';
  }, `${(animationLength * (1 - offsetPercentage)) * 1000}`)
}