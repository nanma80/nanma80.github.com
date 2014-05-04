// assuming the instance of Puzzle is puzzle
mouseInRegion = false;
mouseIsDown = false;
mousePos = new Point2D(0,0);
dragging = false;
lastClick = 0;

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
  mouseIsDown = false;
}

click = function(e){
  currentClick = new Date().getTime();
  if (currentClick - lastClick > 100) {
    puzzle.turn(puzzle.snap(mousePos));
    puzzle.draw();
    puzzle.testSolved();
  }
  lastClick = currentClick;
}

mouseDrag = function(e){
  dragging = true;
  var old = new Point2D(mousePos.x, mousePos.y)
  findMouse(e);
  var delta = new Point2D(mousePos.x - old.x, mousePos.y - old.y);
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
  e.returnValue = false;
  e.cancelBubble = true;
  if (e.preventDefault)
  {
      e.preventDefault();
      e.stopPropagation();
  }
  if (mouseIsDown) {
    mouseDrag(e);
  }
  return false;
}

findMouse = function (e) {
  var x,y;

  if(e.touches){
    x = e.touches[0].pageX;
    y = e.touches[0].pageY;
  } else {
    x = e.pageX;
    y = e.pageY;
  }

  mousePos.x = x - canvas.offsetLeft;
  mousePos.y = y - canvas.offsetTop;
}

onParameterChange = function() {
  var shape = $("#shape")[0].value;
  var neighborhood = $('#neighborhood')[0].value;
  var toggleSelf = $('#toggleSelf')[0].checked;

  puzzle.setParameters(shape, neighborhood, toggleSelf);
  puzzle.scramble();
}
