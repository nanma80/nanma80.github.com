function Snap() {

  this.initialize = function () {
    this.index = -1;
    this.layer = -1;
  }

  this.update = function(e) {
    if (animatingDrag) return;
    
    findMouse(e);

    var snapPos = new Point2D( - mousePos.y + canvasCenter.y, - mousePos.x + canvasCenter.x);
    var snapPosNorm = snapPos.norm();

    if (snapPosNorm > puzzle.layerRadii[0]) {
      this.index = -1;
      this.layer = -1;
      if (! animatingTwist) puzzle.draw();
      return;
    }

    var angle = snapPos.angle();
    var newIndex = Math.floor(((angle + Math.PI / puzzle.order) % (Math.PI * 2)) / (Math.PI * 2) * puzzle.order);

    if (newIndex != this.index) {
      this.index = newIndex;
      if (! animatingTwist) puzzle.draw();
    }

    for(this.layer = 0; this.layer < configuration[puzzle.order].layer; this.layer ++) {
      if ( snapPosNorm >= puzzle.layerRadii[this.layer + 1] ) break;
    }

  }

  this.initialize();
}