function Snap() {

  this.reset = function () {
    this.index = [];
    this.oldIndex = [];
    this.plasticIndex = [];
    this.dir = [0,1,2]; // directions representing the turn, old names: primary, secondary and tertiary
    this.faceIndex = 1; // distinguishing F and B
    this.snapType = ""; // snap type. Fully determined by index
    this.auxiliary = false;
  }

  this.reset();

  this.update = function(e) {
    findMouse(e);
    puzzle.snap(mousePos);

    if (this.index.toString() != this.oldIndex.toString()) {
      // snap object is changed
      this.oldIndex = this.index.slice(0);
      puzzle.draw();
    }
  }

}