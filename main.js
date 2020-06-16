let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d');
let eraserEnabled = false
const pageWidth = document.documentElement.clientWidth
const pageHeight = document.documentElement.clientHeight 
canvas.width = pageWidth
canvas.height = pageHeight
listenToUser(canvas)
pen.onClick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
red.onclick = function(){
  ctx.fillStyle = 'red'
  ctx.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  purple.classList.remove('active')
}
green.onclick = function(){
  ctx.fillStyle = 'green'
  ctx.strokeStyle = 'green'
  red.classList.remove('active')
  green.classList.add('active')
  purple.classList.remove('active')
}
purple.onclick = function(){
  ctx.fillStyle = 'purple'
  ctx.strokeStyle = 'purple'
  red.classList.remove('active')
  green.classList.remove('active')
  purple.classList.add('active')
}
clear.onclick = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
download.onclick = function(){
  let url = canvas.toDataURL("image/png")
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的画儿'
  a.target = '_blank'
  a.click()

}

thin.onclick = function(){
  ctx.lineWidth = 5
}
thick.onclick = function(){
  ctx.lineWidth = 10
}
function drawCircle(x, y, radius) {
  ctx.beginPath()
  ctx.arc(x,y,radius,0,2*Math.PI)
  ctx.fill()
}
function drawLine(x1, y1, x2, y2){
  ctx.beginPath()
  ctx.moveTo(x1,y1)
  ctx.lineTo(x2,y2)
  ctx.stroke()
  ctx.closePath()
}
function listenToUser(canvas) {
  let usring = false
  let lastPoint = {
    x: undefined,
    y: undefined
  }
  //检测是否是触屏设备
  if(document.body.ontouchstart !== undefined){
    canvas.ontouchstart = function(e){
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      usring = true
      if(eraserEnabled){
        ctx.clearRect(x-5,y-5,10,10)
      }else {
        lastPoint = {
          x: x,
          y: y
        }
      }
    }
    canvas.ontouchmove = function(e){
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      if(!usring){return}
      if(eraserEnabled){
        ctx.clearRect(x-5,y-5,10,10)
      }else {
        newtPoint = {
          x: x,
          y: y
        }
      }
      drawLine(lastPoint.x,lastPoint.y,newtPoint.x,newtPoint.y)
      lastPoint = newtPoint
    }
    canvas.ontouchend = function() {
      usring = false
    }
  }
  else{
    canvas.onmousedown = function(e){
    let x = e.clientX
    let y = e.clientY
    usring = true
    if(eraserEnabled){
      ctx.clearRect(x-5,y-5,10,10)
    }else {
      lastPoint = {
        x: x,
        y: y
      }
    }
  }
    canvas.onmousemove = function(e){
      let x = e.clientX
      let y = e.clientY
      if(!usring){return}
      if(eraserEnabled){
        ctx.clearRect(x-5,y-5,10,10)
      }else {
        newPoint = {
          x: x,
          y: y
        }
      }
      drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
      lastPoint = newPoint
    }
    canvas.onmouseup = function() {
      usring = false
    }
  }
  
 
}

