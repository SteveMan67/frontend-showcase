const snowContaner = document.querySelector(".snow-container") 
console.log(snowContaner)

for (let i = 0; i <= 15; i++) {
  let div = document.createElement('div')
  div.classList.add("snowflake")
  div.style.setProperty("--snowflake-size", `${Math.floor(Math.random() * 7) + 3}px`)
  div.style.setProperty("--animation-length", `${Math.floor(Math.random() * 30) + 10}`)
  snowContaner.appendChild(div)
}