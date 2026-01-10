const blurCard = document.querySelector(".wipe-blur")
const radialBlur = document.querySelector(".radial-blur")

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

blurCard.addEventListener('click', (e) => {
  blurCard.classList.toggle('no-blur')
  
})
radialBlur.addEventListener('click', (e) => {
  radialBlur.classList.toggle('no-blur')
  
})




const container = document.querySelector(".paint-blur")
const originalImg = container.querySelector("img")
const canvas = container.querySelector("canvas")
let isBlurred = true

canvas.addEventListener('click', (e) => {
  if(isBlurred) {
    canvas.classList.toggle('no-blur')
    e.stopPropagation
    isBlurred = false
  } else {
    isBlurred = true
    canvas.classList.toggle('no-blur')
  }
})

const ctx = canvas.getContext("2d")

originalImg.onload = () => {
  canvas.width = originalImg.offsetWidth
  canvas.height = originalImg.offsetHeight
  const hRatio = canvas.width / originalImg.naturalWidth;
  const vRatio = canvas.height / originalImg.naturalHeight;
  // Calculate the scale ratio (max of horizontal or vertical ratio)
  const ratio = Math.max(hRatio, vRatio);

  // Calculate centering offsets
  const centerShift_x = (canvas.width - originalImg.naturalWidth * ratio) / 2;
  const centerShift_y = (canvas.height - originalImg.naturalHeight * ratio) / 2;

  ctx.filter = 'blur(10px)'
  ctx.drawImage(originalImg,
        0, 0, originalImg.naturalWidth, originalImg.naturalHeight, // Source rectangle
        centerShift_x, centerShift_y, originalImg.naturalWidth * ratio, originalImg.naturalHeight * ratio // Dest rectangle
    );

  ctx.filter = 'none'
}


canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.shadowBlur = 5
  ctx.shadowColor = "white"
  ctx.arc(x, y, 50, 0, Math.PI * 2)
  ctx.fill()
}) 

canvas.addEventListener('click', (e) => {
  if (isBlurred) {
    canvas.width = originalImg.offsetWidth
    canvas.height = originalImg.offsetHeight
    const hRatio = canvas.width / originalImg.naturalWidth;
    const vRatio = canvas.height / originalImg.naturalHeight;
    // Calculate the scale ratio (max of horizontal or vertical ratio)
    const ratio = Math.max(hRatio, vRatio);

    // Calculate centering offsets
    const centerShift_x = (canvas.width - originalImg.naturalWidth * ratio) / 2;
    const centerShift_y = (canvas.height - originalImg.naturalHeight * ratio) / 2;

    ctx.filter = 'blur(10px)'
    ctx.drawImage(originalImg,
          0, 0, originalImg.naturalWidth, originalImg.naturalHeight, // Source rectangle
          centerShift_x, centerShift_y, originalImg.naturalWidth * ratio, originalImg.naturalHeight * ratio // Dest rectangle
      );

    ctx.globalCompositeOperation = 'source-over'
    ctx.shadowBlur = 0
    ctx.filter = 'none'
    
    isBlurred = true
  }
})
