// assuming the instance of Puzzle is puzzle
mouseInRegion = false;
mouseIsDown = false;
mousePos = new Point2D(0,0);
dragging = false;
lastClickTimeStamp = 0;

onCanvasClick = function(e) {
  $('#log').append("" + e.timeStamp + " click<br>");
  e.preventDefault();
  return false;
}

onOriginalClick = function(e) {
  $('#log').append("" + e.timeStamp + " click<br>");
  e.preventDefault();
  return false;
}

mouseDown = function(e){
  $('#log').append("" + e.timeStamp + " mouse down<br>");
  mouseIsDown = true;
  findMouse(e);
  dragging = false;
}

touchStart = function(e) {
  $('#log').append("" + e.timeStamp + " touch start<br>");
  mouseIsDown = true;
  findMouse(e);
  dragging = false;
}

touchCancel = function(e) {
  $('#log').append("" + e.timeStamp + " touch cancel<br>");
  e.preventDefault();
  return false;
}

mouseUp = function(e){
  $('#log').append("" + e.timeStamp + " mouse up<br>");
  mouseIsDown = false;
  if (mouseInRegion) {
    click(e);
  }
}

touchEnd = function(e){
  e.preventDefault();
  $('#log').append("" + e.timeStamp + " touch end<br>");
  mouseIsDown = false;
  click(e);
}

click = function(e){
  $('#log').append("" + e.timeStamp + " click<br>");
  if (dragging) {
    dragging = false;
    return;
  }
  var oldMousePos = mousePos.clone();
  $('#log').append("" + e.timeStamp + " there<br>");
  findMouse(e);
  $('#log').append("" + e.timeStamp + " after find<br>");
  if (oldMousePos.distance(mousePos) > 0) {
    $('#log').append("" + e.timeStamp + " too far<br>");
    return;
  }  

  puzzle.turn(puzzle.snap(mousePos));
  puzzle.draw();
  puzzle.testSolved();
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
  $('#log').append("" + e.timeStamp + " mouse out<br>");
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
  $('#log').append("" + e.timeStamp + " touch move<br>");
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
