function Snap() {

  this.initialize = function () {
    this.index = -1;
  }


  this.update = function(e) {
    findMouse(e);

    var snapPos = new Point2D( - mousePos.y + canvasCenter.y, - mousePos.x + canvasCenter.x);

    if (snapPos.norm() > viewHeight * 0.48) {
      this.index = -1;
      puzzle.draw();
      return;
    }

    var angle = snapPos.angle();

    var newIndex = Math.floor(((angle + Math.PI / puzzle.order) % (Math.PI * 2)) / (Math.PI * 2) * puzzle.order);

    if (newIndex != this.index) {
      this.index = newIndex;
      puzzle.draw();
    }
  }

  this.initialize();
}