// assuming the instance of Puzzle is puzzle
mouseInRegion = false;
mouseIsDown = false;
mousePos = new Point2D(0,0);
dragging = false;

mouseDown = function(e){
  mouseIsDown = true;
  findMouse(e);
  dragging = false;
}

mouseUp = function(e){
  mouseIsDown = false;
  if (!dragging && mouseInRegion) {
    click(e);
  }
  dragging = false;
}

touchUp = function(e){
}

click = function(e){
  var layer;
  puzzle.turn(puzzle.snap(mousePos));
  puzzle.draw();
  puzzle.testSolved();
}

mouseDrag = function(e){
  dragging = true;
  var old = new Point2D(mousePos.x, mousePos.y)
  findMouse(e);
  var delta  = new Point2D(mousePos.x - old.x, mousePos.y - old.y)
  puzzle.rotate(new Point3D(delta.y, delta.x,  0), delta.norm/100); // 100: speed of dragging
  puzzle.draw();
}

mouseOut = function(e){
  mouseInRegion = false;
  if (dragging) {
    dragging = false;
  }
}

mouseOver = function(e){
  mouseInRegion = true;
  if (!mouseIsDown) { dragging = false; }
  findMouse(e);
}

mouseMove = function(e) {
  if (mouseIsDown && mouseInRegion) {
    mouseDrag(e);
  }
}

touchMove = function(e) {
  e.preventDefault();
  if (mouseIsDown) {
    mouseDrag(e);
  }
}

findMouse = function (e) {
  mousePos.x = e.pageX - canvas.offsetLeft;
  mousePos.y = e.pageY - canvas.offsetTop;
}

onShapeChange = function() {
  var shape = document.getElementById("shape").value;
  puzzle.setParameters(shape);
  puzzle.resetState();
}

getNeighborhood = function() {
  var neighborhood = document.getElementById('neighborhood');
  return neighborhood.value;
}
