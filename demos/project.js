let projects = [
  {
    "id": "mouse-border-glow",
    "title": "Mouse Border Glow",
    "description": "A very polished feeling hover effect.",
    "source": "https://codepen.io/Hyperplexed/pen/MWQeYLW?editors=0010",
    "path": "../demos/mouse-border-glow/index.html",
    "type": "hover"
  }
]

console.log(projects)

document.addEventListener('DOMContentLoaded', () => {
  let iframe = document.getElementById("project-iframe")
  const title = document.getElementById("title")
  const description = document.getElementById("desctiption")
  const projectId = new URLSearchParams(window.location.search).get("id")

  const jsonIndexOfProject = projects.findIndex(f => f.id == projectId)

  if (jsonIndexOfProject !== -1) {
    iframe.src = projects[jsonIndexOfProject].path
  }
})

