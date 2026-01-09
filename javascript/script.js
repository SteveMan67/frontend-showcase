const projects = document.getElementById("projects")

let mouseX, mouseY
document.addEventListener('mousemove', (e) => {
  const rect = projects.getBoundingClientRect()
  let boxX = e.clientX - rect.x
  let boxY = e.clientY - rect.y

  mouseX = e.clientX
  mouseY = e.clientY
  document.documentElement.style.setProperty("--mouse-projects-x", `${boxX}px`)
  document.documentElement.style.setProperty("--mouse-projects-y", `${boxY}px`)
  document.documentElement.style.setProperty("--mouse-x", `${e.clientX}`)
  document.documentElement.style.setProperty("--mouse-y", `${e.clientY}`)
})
