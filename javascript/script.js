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

fetch('demos/projects.JSON')
  .then(response => response.json())
  .then(projects => {
    const projectsGrid = document.getElementById('projects')
    const projectsHTML = projects.map(
      project => `
      <div class="project" onclick="location.href='./demos/project.html?id=${project.id}'">
        <div class="project-content">
          <img src="${project.img}" alt="${project.title}">
          <div id="description">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
          </div
        </div>
      </div>
      `
    )
    .join("")

    projectsGrid.innerHTML = projectsHTML
  })
  
