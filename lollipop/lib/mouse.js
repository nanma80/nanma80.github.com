// assuming the instance of Puzzle is puzzle
mouseInRegion = false;
mouseIsDown = false;
mousePos = new Point2D(0,0);
dragging = false;
snapIndex = [];
currentSnapIndex = [];

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
  snap.update(e);
}

click = function(e){
  if (e.ctrlKey) return;
  // resnap(e);
  if (snap.index.length > 0) {
    puzzle.twist(e.button == 2);
  }
  puzzle.draw();
}

mouseDrag = function(e){
  dragging = true;
  var old = new Point2D(mousePos.x, mousePos.y)
  findMouse(e);
  var delta  = new Point2D(mousePos.x - old.x, mousePos.y - old.y)
  puzzle.rotate(new Point3D(delta.y,  delta.x, 0), delta.norm/100); // 100: speed of dragging
  puzzle.draw();
}

mouseOut = function(e){
  mouseInRegion = false;
  if (dragging) {
    dragging = false;
    snap.update(e);
  }
}

mouseOver = function(e){
  mouseInRegion = true;
  if (!mouseIsDown) { dragging = false; }
  findMouse(e);
}

mouseMove = function(e) {

  startTime = new Date().getTime();

  if (mouseIsDown && mouseInRegion) {
    if (snap.index.length > 1) snap.reset();
    mouseDrag(e);
  } else {
   snap.update(e); 
  }

  duration = new Date().getTime() - startTime;
  // console.log(duration);
}


findMouse = function (e) {
  mousePos.x = e.pageX - canvas.offsetLeft;
  mousePos.y = e.pageY - canvas.offsetTop;
}


resnap = function(e) {
  findMouse(e);
  snapIndex = puzzle.snap(mousePos);

  if (snapIndex.toString() != currentSnapIndex.toString()) {
    // snap object is changed
    currentSnapIndex = snapIndex.slice(0);
    puzzle.draw();
  }
}

onRadioButton = function() {
  var needUpdate = false;
  var layersElements = document.getElementsByName('layers');
  var j;

  for (j=0; j < layersElements.length; j++) {
    if (layersElements[j].checked) {
      if (!(eval(layersElements[j].value) == puzzle.layers)) needUpdate = true;
        break;
    }
  }

  if (needUpdate) {
    puzzle.setParameters(eval(layersElements[j].value));
    puzzle.resetState();
  }
}


