let clientX, clientY

function eventListener() {
  isUpdating = false
  projectElements = document.querySelectorAll('.project')
  document.addEventListener('mousemove', (e) => {
    clientX = e.clientX
    clientY = e.clientY

    if (!isUpdating) {
      requestAnimationFrame(() => {
        for (let project of projectElements) {
          const rect = project.getBoundingClientRect()
          let boxX = clientX - rect.x
          let boxY = clientY - rect.y
          project.style.setProperty("--mouse-x", `${boxX}px`)
          project.style.setProperty("--mouse-y", `${boxY}px`)
        }
        isUpdating = false
      })
      isUpdating = true
    }
  })
  document.addEventListener('scroll', (e) => {
    mouseX = clientX
    mouseY = clientY

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
}

function updateProjects(projectJSON) {
  const projectsGrid = document.getElementById('projects')
    let projectsHTML;

    projectsHTML = projectJSON.map(
      projectJSON => `
      <a class="project" href="./demos/project.html?id=${projectJSON.id}">
        <div class="project-content">
          <img src="${projectJSON.img}" alt="${projectJSON.title}">
          <div id="description">
            <h4>${projectJSON.title}</h4>
            <p>${projectJSON.description}</p>
          </div>
        </div>
      </a>
      `
    )
    .join("")

    projectsGrid.innerHTML = projectsHTML
}

let one = false

let projectsJSON = fetch('demos/projects.JSON')
  .then(response => response.json())
  .then(projects => {
    updateProjects(projects)
    projectsJSON = projects
  })
  .then(() => {
    const projectContainer = document.getElementById("projects")
    let isUpdating = false
    eventListener(isUpdating)
  })



// filter hover effect 

const filters = document.getElementById("sort-by")
const FilterButtons = document.querySelectorAll(".filter")
const after = document.querySelector("#sort-by::after")

for (let filter of FilterButtons) {
  filter.addEventListener('mouseenter', () => {
    const filterRect = filter.getBoundingClientRect()
    const filtersRect = filters.getBoundingClientRect()
    filters.style.setProperty("--opacity", `100%`)
    filters.style.setProperty("--width", `${filter.clientWidth}px`)
    filters.style.setProperty("--x-offset", `${filterRect.left - filtersRect.left}px`)
  }) 
}

filters.addEventListener('mouseleave', () => {
  filters.style.setProperty("--opacity", `0%`)
})

let filter = "all"
let filteredProjects = []

function applyFilter(filter = "all") {
  if (filter == "all") {
    for (const project of projectsJSON) {
      filteredProjects.push(project)
    }
  } else {
    for (const project of projectsJSON) {
      if (project.tags.includes(filter)) {
        filteredProjects.push(project)
      }
    }
  }
}

let filterList = document.querySelectorAll(".filter")
for (let filter of filterList) {
  filter.addEventListener('click', () => {
    filteredProjects = []
    applyFilter(filter.id)
    updateProjects(filteredProjects)
    eventListener()
  })
}