function Puzzle() {
  // show vertices and the indices

  this.neighborhood = 2; // number of vertices shared

  this.colorArray = [
    [244,244,244] //background
  ];

  this.setParameters = function(shape) {
    this.shape = shape;
  }

  this.initializeState = function() {
    resetRotationMatrix();
    this.axes = getAxes(this.shape);
    this.vertices = getVertices(this.axes);
    
    this.prototypeStickers = getPrototypeStickers(this.shape);
    this.stickersByType = [];
    this.stickers = [];
    for(var i = 0; i < this.prototypeStickers.length; i++) {
      var stickersPerType = populateStickers(this.vertices, this.prototypeStickers[i], getSymmetry(this.shape));
      this.stickers = this.stickers.concat(stickersPerType);
    }
    console.log(this.stickers.length);

    this.axes = [];
    for (var i = 0; i < this.stickers.length; i++) {
      this.axes.push(this.stickers[i].center());
    };

    console.log(this.axes.length);
  }

  this.resetState = function() {
    this.initializeState();

    this.rotate(new Point3D(-1,0,0), 1.3);
    this.rotate(new Point3D(0,-1,0), 2);
    this.rotate(new Point3D(1,0,0), 0.5);
    this.rotate(new Point3D(0,0,-1), 0.2);
    
    this.draw();
  }

  this.draw = function() {
    context.fillStyle = "rgb(" + this.colorArray[0][0] + "," + this.colorArray[0][1] + "," + this.colorArray[0][2] + ")";
    context.fillRect(0,0,viewWidth,viewHeight);

    for (var i = 0; i < this.stickers.length; i++) {
      this.stickers[i].draw();
    }
  }

  this.axes2d = function() {
    var axesScale = getAxesScale(this.shape);

    var output = [];
    for (var i = 0; i < this.axes.length; i++) {

      var vertex3d = this.axes[i].scale(axesScale);
      if (vertex3d.z < 0) {
        output.push(null);
      } else {
        var vertex2d = vertex3d.project();
        output.push(vertex2d);
      }
    }
    return output;
  }

  this.rotate = function(axis, angle) {
    setRotationMatrix(axis, angle);

    for (var i = 0; i < this.axes.length; i++) {
      this.axes[i].rotate();
    }

    for (var i = 0; i < this.vertices.length; i++) {
      this.vertices[i].rotate();
    }
  }

  this.turn = function(axisId) {
    if (axisId === -1) return;

    for (var i = 0; i < this.stickers.length; i++) {
      var neighborLevel = this.stickers[axisId].neighbor(this.stickers[i]);
      if (neighborLevel > 0 && neighborLevel <3 && neighborLevel >= this.neighborhood)
        this.stickers[i].changeState();
    };
  }

  this.snap = function(mouse) {
    for (var i = 0; i < this.stickers.length; i++) {
      if (this.stickers[i].contains(mouse)) return i;
    };
    return -1;
  }

  this.scramble = function() {
    var scrambleLength = 50;
    scrambleLength += Math.round(Math.random());

    for (var scrambleIndex = 0; scrambleIndex < scrambleLength; scrambleIndex++) {
      this.turn( Math.floor(Math.random() * 100) % this.stickers.length);
    }
    
    this.count = 0;
    this.draw();

  }
}
