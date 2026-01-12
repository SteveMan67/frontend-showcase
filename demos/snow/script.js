const snowContainer = document.querySelector(".snow-container") 

for (let i = 0; i <= 30; i++) {
  let div = document.createElement('div')
  div.classList.add("snowflake")
  let lengthFromScreen = Math.floor(Math.random() * 125) + 100
  let animationLength = (1500 / lengthFromScreen) * 5
  let offsetY = Math.floor(Math.random() * snowContainer.getBoundingClientRect().height)
  let offsetPercentage = offsetY / snowContainer.getBoundingClientRect().height

  div.style.setProperty("--debug-offset-y", offsetY)
  div.style.setProperty("--snowflake-size", `${(lengthFromScreen / 12)}px`)
  div.style.setProperty("--animation-length", `${animationLength * (1 - offsetPercentage)}s`)
  div.style.setProperty("--x-movement", `${Math.floor(Math.random() * 200) - 100}px`)
  div.style.setProperty("--offset-x", `${Math.floor(Math.random() * snowContainer.getBoundingClientRect().width)}px`)
  div.style.setProperty("--start-y", `${offsetY}px`)
  // div.style.setProperty("--animation-delay", `${Math.floor(Math.random() * 15)}s`)
  snowContainer.appendChild(div)
  console.log(`${animationLength}s`)
  setTimeout(() => {
    div.style.setProperty("--start-y", `-20px`)
    div.style.setProperty("--animation-length", `${animationLength}s`)
  }, `${animationLength * 1000}`)
}