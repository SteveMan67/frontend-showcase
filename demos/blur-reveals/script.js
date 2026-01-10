const blurCard = document.querySelector(".wipe-blur")
const radialBlur = document.querySelector(".radial-blur")
console.log(blurCard)

let isUpdating
let mouseX, mouseY
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY

  const radialRect = radialBlur.getBoundingClientRect()
  let radialBoxX = mouseX - radialRect.left
  let radialBoxY = mouseY - radialRect.top

  const wipeRect = blurCard.getBoundingClientRect()
  let wipeBoxX = mouseX - wipeRect.left
  let wipeBoxY = mouseX - wipeRect.top

  let blurStart = ((wipeBoxX / wipeRect.width) * 100) - 20
  let blurEnd = ((wipeBoxX / wipeRect.width) * 100) + 20

  blurCard.style.setProperty("--blur-start", `${blurStart}%`)
  blurCard.style.setProperty("--blur-end", `${blurEnd}%`)
  radialBlur.style.setProperty("--box-x", `${radialBoxX}px`)
  radialBlur.style.setProperty("--box-y", `${radialBoxY}px`)
})