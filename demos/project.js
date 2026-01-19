const iframeContainer = document.querySelector(".iframe-container")
let iframe = document.querySelector(".project-iframe")
fetch('projects.JSON')
  .then(response => response.json())
  .then(projects => {
    const title = document.getElementById("title")
    const projectInfo = document.querySelector(".project-info")
    const description = document.getElementById("description")
    let projectId = new URLSearchParams(window.location.search).get("id")

    if (projectId == "random") {
      projectId = projects[Math.floor(Math.random() * projects.length)].id
    }

    const jsonIndexOfProject = projects.findIndex(f => f.id == projectId)

    if (jsonIndexOfProject !== -1) {
      iframe.src = projects[jsonIndexOfProject].path
      title.innerHTML = projects[jsonIndexOfProject].title
      description.innerHTML = projects[jsonIndexOfProject].description
      if (projects[jsonIndexOfProject].source !== "" && projects[jsonIndexOfProject].source) {
        let seperator = document.createElement('p')
        seperator.classList.add("seperator")
        seperator.innerHTML = "-"
        projectInfo.appendChild(seperator)
        console.log(projectInfo)
        let sourceLink = document.createElement('a')
        sourceLink.href = projects[jsonIndexOfProject].source
        sourceLink.innerHTML = "See Source"
        projectInfo.appendChild(sourceLink)
      }
    }
  })

const fullScreenButton = document.querySelector(".fullscreen-control")
fullScreenButton.addEventListener('click', () => {
  iframeContainer.classList.toggle("fullscreen")
  const icon = document.querySelector(".fullscreen-control i")
  icon.classList.toggle("fa-down-left-and-up-right-to-center")
  icon.classList.toggle("fa-up-right-and-down-left-from-center")
})
