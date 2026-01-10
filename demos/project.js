fetch('projects.JSON')
  .then(response => response.json())
  .then(projects => {
    console.log(projects)
    let iframe = document.getElementById("project-iframe")
    const title = document.getElementById("title")
    const description = document.getElementById("description")
    const projectId = new URLSearchParams(window.location.search).get("id")

    const jsonIndexOfProject = projects.findIndex(f => f.id == projectId)
    console.log(jsonIndexOfProject)

    if (jsonIndexOfProject !== -1) {
      iframe.src = projects[jsonIndexOfProject].path

      const title = document.getElementById('title')
      title.innerHTML = projects[jsonIndexOfProject].title
    }
  })
  .then(projects => {
    
  })

