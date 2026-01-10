fetch('demos/projects.JSON')
  .then(response => response.json())
  .then(projects => {
    const projectsGrid = document.getElementById('projects')
    let projectsHTML;
    
    for(const project of projects) {

    }

    projectsHTML = projects.map(
      project => `
      <div class="project" onclick="location.href='./demos/project.html?id=${project.id}'">
        <div class="project-content">
          <img src="${project.img}" alt="${project.title}">
          <div id="description">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
          </div>
        </div>
      </div>
      `
    )
    .join("")

    projectsGrid.innerHTML = projectsHTML

    
  })
  .then(projects => {
    const projectContainer = document.getElementById("projects")
    const projectElements = document.querySelectorAll(".project")
    
    let isUpdating = false
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isUpdating) {
        requestAnimationFrame(() => {
            for (let project of projectElements) {
            const rect = project.getBoundingClientRect()
            let boxX = mouseX - rect.x
            let boxY = mouseY - rect.y

            project.style.setProperty("--mouse-x", `${boxX}px`)
            project.style.setProperty("--mouse-y", `${boxY}px`)
          }
          isUpdating = false
        })
        isUpdating = true
      }
    })
  })
