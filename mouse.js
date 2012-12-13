function Mouse() {

  // assuming canvas object is called canvas
  this.mouseInRegion = false;
  this.mouseIsDown = false;
  this.mousePos = {
    x: 0,
    y: 0
  };
  this.dragging = false;

  mousedown = function(e){
    this.mouseIsDown = true;
    this.findMouse(e);
    this.dragging = false;
  }

  mouseup = function(e){
    mouseIsDown = false;
    
    if (!dragging) {
      click(e);
    }
    dragging = false;
  }

  click = function(e){
    console.log('onclick');

    if (e.ctrlKey) return;
    findMouse(e);
    puzzle.rotate(new Point3D(1,0,0), Math.PI/10);
    redraw();

  }

  onmousedrag = function(e){
    dragging = true;
    var oldX = mousePos.x;
    var oldY = mousePos.y;
    findMouse(e);
    var deltaX = mousePos.x - oldX;
    var deltaY = mousePos.y - oldY;
    puzzle.rotate(new Point3D(1,0,0), -deltaY/100);
    puzzle.rotate(new Point3D(0,1,0), deltaX/100);
    redraw();
  }

  canvas.oncontextmenu = function(e){
    findMouse(e);
    // code goes here
    return false;
  }

  canvas.onmouseout = function(e){
    mouseInRegion = false;
  }

  canvas.onmouseover = function(e){
    
    mouseInRegion = true;

    findMouse(e);
    //code goes here
  }

  canvas.onmousemove = function(e) {
    if (mouseIsDown) {
      onmousedrag(e);
    }
    else {
      findMouse(e);  
    }
  }

  function findMouse(e) {
    mousePos.x = e.pageX - canvas.offsetLeft;
    mousePos.y = e.pageY - canvas.offsetTop;
  }
}