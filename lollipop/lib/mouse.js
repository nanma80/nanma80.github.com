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
  } else if (dragging && mouseInRegion) {
    var reorientation = Math.round(dragAngle/(2 * Math.PI) * puzzle.order);
    puzzle.reorient(reorientation);
  }
  dragging = false;
  dragAngle = 0;
  snap.update(e);
}

click = function(e){
  if (snap.index >= 0) {
    puzzle.twist(snap.index);
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
   snap.update(e); 
  }
  // duration = new Date().getTime() - startTime;
  // console.log(duration);
}


findMouse = function (e) {
  mousePos.x = e.pageX - canvas.offsetLeft;
  mousePos.y = e.pageY - canvas.offsetTop;
}


///////// onRadioButton: 

onRadioButton = function() {
  var needUpdate = false;
  var layersElements = document.getElementsByName('order');
  var j;

  for (j=0; j < layersElements.length; j++) {
    if (layersElements[j].checked) {
      if (!(eval(layersElements[j].value) == puzzle.layers)) needUpdate = true;
        break;
    }
  }

  if (needUpdate) {
    puzzle.setOrder(eval(layersElements[j].value));
    puzzle.resetState();
    puzzle.draw();
  }
}


