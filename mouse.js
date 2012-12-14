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
  resnap(e);
}

click = function(e){

  if (e.ctrlKey) return;
  findMouse(e);

  resnap(e);
  if (snapIndex.length > 0) {
    puzzle.twist(e.button == 2);
  }

  redraw();

}

mouseDrag = function(e){
  dragging = true;
  var old = new Point2D(mousePos.x, mousePos.y)
  findMouse(e);
  var delta  = new Point2D(mousePos.x - old.x, mousePos.y - old.y)
  puzzle.rotate(new Point3D(0, delta.y,  delta.x), delta.norm/100);
  redraw();
}

contextMenu = function(e){
  findMouse(e);
  // code goes here
  return false;
}

mouseOut = function(e){
  mouseInRegion = false;
}

mouseOver = function(e){
  
  mouseInRegion = true;

  findMouse(e);
  //code goes here
}

mouseMove = function(e) {
  if (mouseIsDown) {
    mouseDrag(e);
  }
  else {
    resnap(e);
  }
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

    if (puzzle.type == 'rubik') {
      if (snapIndex.length > 0) {
        puzzle.state[snapIndex[0]][snapIndex[1]][snapIndex[2]].colorArray = [128,128,128];
      }

      if (currentSnapIndex.length > 0) {
        puzzle.state[currentSnapIndex[0]][currentSnapIndex[1]][currentSnapIndex[2]].colorArray = [0,0,0];
      }
    }

    currentSnapIndex = snapIndex.slice(0);
    // console.log(snapIndex);
    redraw();

  }

}

