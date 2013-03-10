mouseInRegion = false;
mouseIsDown = false;
mousePos = new Point2D(0,0);
dragging = false;
dragAngle = 0;
dragStartAngle = 0;

mouseDown = function(e){
  mouseIsDown = true;
  findMouse(e);
  dragging = false;

  var relativeMousePos = new Point2D( - mousePos.y + canvasCenter.y, - mousePos.x + canvasCenter.x);

  dragStartAngle = relativeMousePos.angle();
}

mouseUp = function(e){
  mouseIsDown = false;
  if (!dragging && mouseInRegion) {
    click(e);
    dragging = false;
    dragAngle = 0;
    snap.update(e);
    puzzle.draw();
  } else if (dragging && mouseInRegion) {
    var reorientation = Math.round(dragAngle/(2 * Math.PI) * puzzle.order);
    var targetAngle = reorientation / puzzle.order * (2 * Math.PI);

    // animation for snapping into a valid position
    animatingDrag = true;
    animationDragFrameIndex = 0;
    var animationDragInterval = setInterval(
      function() {
        animationDragFrameIndex ++;
        dragAngle += (targetAngle - dragAngle) / animationDragFrames;
        puzzle.draw();
        if( animationDragFrameIndex >= animationDragFrames ) {
          animatingDrag = false;
          puzzle.reorient(reorientation);

          var reorientationString = "";
          if (reorientation >=1 && reorientation <= puzzle.order/2) {
            for (var i=1; i<=reorientation; i++) {
              reorientationString += "L";
            }
          }
          else if (reorientation > puzzle.order/2 && reorientation <= puzzle.order - 1) {
            for (var i = puzzle.order - 1; i >= reorientation; i--) {
              reorientationString += "R";
            }
          }

          document.getElementById('historyBox').value += reorientationString;


          dragging = false;
          dragAngle = 0;
          snap.update(e);
          puzzle.draw();

          clearInterval(animationDragInterval);
        }
      }
    , animationDragDuration / animationDragFrames);
  }
}

click = function(e){
  if (e.shiftKey) {
    puzzle.highlightLayer(snap.layer);
  } else if (snap.index >= 0) {
    puzzle.twist(snap.index);
    document.getElementById('historyBox').value += (snap.index + 1).toString();

    puzzle.draw();
  }
}

mouseDrag = function(e){
  dragging = true;
  findMouse(e);

  var relativeMousePos = new Point2D( - mousePos.y + canvasCenter.y, - mousePos.x + canvasCenter.x);
  var dragNewAngle = relativeMousePos.angle();
  dragAngle = (dragNewAngle - dragStartAngle + 2 * Math.PI) % (2 * Math.PI);

  puzzle.draw();
}

mouseOut = function(e){
  mouseInRegion = false;
  if (dragging) {
    dragging = false;
    snap.update(e);
  } else {
    snap.update(e);
  }
}

mouseOver = function(e){
  mouseInRegion = true;
  if (!mouseIsDown) { dragging = false; }
  findMouse(e);
}

mouseMove = function(e) {
  // startTime = new Date().getTime();
  if (mouseIsDown && mouseInRegion) {
    // if (snap.index.length > 1) snap.reset();
    mouseDrag(e);
  } else {
    findMouse(e);
    snap.update(e); 
  }
  // duration = new Date().getTime() - startTime;
  // console.log(duration);
}


findMouse = function (e) {
  mousePos.x = e.pageX - canvas.offsetLeft;
  mousePos.y = e.pageY - canvas.offsetTop;
}
