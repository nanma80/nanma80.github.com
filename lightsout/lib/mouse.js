// assuming the instance of Puzzle is puzzle
mouseInRegion = false;
mouseIsDown = false;
mousePos = new Point2D(0,0);
dragging = false;
lastClickTimeStamp = 0;
animating = false;
animationFrameIndex = 0;
animationFrames = 3;
animationDuration = 200;
allowAnimation = true;

onCanvasClick = function(e) {
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

touchStart = function(e){
  $('#log').append("" + e.timeStamp + " touch start<br>");
  mouseIsDown = true;
  findMouse(e);
  dragging = false;
}

mouseUp = function(e){
  $('#log').append("" + e.timeStamp + " mouse up<br>");
  mouseIsDown = false;
}

touchEnd = function(e){
  $('#log').append("" + e.timeStamp + " touch end<br>");
  mouseIsDown = false;
  if (dragging) return;
  puzzle.lastTurn = puzzle.snap(mousePos);
  puzzle.draw();
}

click = function(e){
  if (dragging) {
    dragging = false;
    return;
  }

  $('#log').append("" + e.timeStamp + " click<br>");

  var snap = puzzle.snap(mousePos);
  puzzle.turn(snap);
  puzzle.testSolved();

  if (snap === -1 || !allowAnimation) {
    puzzle.draw();
    return;
  }

  animating = true;
  animationFrameIndex = 1;
  puzzle.draw();

  var animationInterval = setInterval(
    function() {
      animationFrameIndex ++;
      puzzle.draw();
      if( animationFrameIndex > animationFrames) {
        animating = false;
        puzzle.draw();
        clearInterval(animationInterval);
      }
    }
  , animationDuration / animationFrames);
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
