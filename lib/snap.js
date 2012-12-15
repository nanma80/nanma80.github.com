function Snap() {
  this.index = [];
  this.oldIndex = [];

  this.update = function(e) {
    findMouse(e);
    snapIndex = puzzle.snap(mousePos);

    if (this.index.toString() != this.oldIndex.toString()) {
      // snap object is changed
      this.oldIndex = this.index.slice(0);
      puzzle.draw();
    }
  }

  
  

}