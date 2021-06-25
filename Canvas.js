let canv = document.querySelector("#canv");
canvCtx = canv.getContext("2d");
canv.width = window.innerWidth;
canv.height = window.innerHeight;
//we will draw on context and not on canvas
canvCtx.lineJoin = "round"; //defines what should be the shape when two lines meet
canvCtx.lineCap = "round"; //defines what should be the shape of the line at its corners
canvCtx.lineWidth = 1;
let isDraw = false; //used to check whether mouse is clicked or not
let lastX = 0; //last x position after something is drawn
let lastY = 0; // last y position after something is drawn
let col = 0;
let c = 0;
let flag = true;
function draw(e) {
  if (isDraw) {
    // console.log(e);
    canvCtx.strokeStyle = `hsl(${col},100%,50%)`; //defines the color
    col = (col + 1) % 360;
    canvCtx.beginPath();
    //start from
    canvCtx.moveTo(lastX, lastY);
    //go to
    canvCtx.lineTo(e.offsetX, e.offsetY);
    canvCtx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    //line width
    if (canvCtx.lineWidth >= 100 || canvCtx.lineWidth <= 1) {
      flag = !flag;
      c = (c + 1) % 4;
    }
    if (flag) {
      canvCtx.lineWidth++;
    } else {
      canvCtx.lineWidth--;
    }
    if (c == 0) {
      canvCtx.globalCompositeOperation = "copy";
    } else if (c == 2) {
      canvCtx.globalCompositeOperation = "xor";
    } else if (c == 3) {
      canvCtx.globalCompositeOperation = "hue";
    } else {
      canvCtx.globalCompositeOperation = "source-over";
    }
  }
}
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", (e) => {
  isDraw = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
document.addEventListener("mouseup", () => (isDraw = false));
document.addEventListener("mouseout", () => (isDraw = false));
