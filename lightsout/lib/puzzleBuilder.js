function PuzzleBuilder() {
  // show vertices and the indices

  this.colorArray = [
    [244,244,244] //background
  ];

  this.setParameters = function(shape) {
    this.shape = shape;
  }

  this.initializeState = function() {
    this.axes = getAxes(this.shape);
    this.vertices = getVertices(this.axes);

    this.prototypeStickers = getPrototypeStickers(this.shape);
    this.stickersByType = [];
    for(var i = 0; i < this.prototypeStickers.length; i++) {
      var stickersPerType = populateStickers(this.vertices, this.prototypeStickers[i], 'dodecahedron');

      this.stickersByType.push(stickersPerType);
    }
  }

  this.resetState = function() {
    this.initializeState();

    this.rotate(new Point3D(-1,0,0), 1.3);
    this.rotate(new Point3D(0,-1,0), 2);
    this.rotate(new Point3D(1,0,0), 0.5);
    this.rotate(new Point3D(0,0,-1), 0.2);
    
    snap.reset();
    this.draw();
  }

  this.draw = function() {
    context.fillStyle = "rgb(" + this.colorArray[0][0] + "," + this.colorArray[0][1] + "," + this.colorArray[0][2] + ")";
    context.fillRect(0,0,viewWidth,viewHeight);

    for (var i = 0; i < this.vertices.length; i++) {
      var vertex3d = this.vertices[i];
      if (vertex3d.z < 0) continue;
      var vertex2d = vertex3d.project();
      var size = 4;
      var halfSize = size / 2;
      context.fillStyle = 'black';
      context.fillRect(vertex2d.x - halfSize, vertex2d.y - halfSize, size, size);

      context.font = "8pt Arial";
      context.fillStyle = "blue";
      context.fillText(i, vertex2d.x, vertex2d.y);
    }

    // context.font = "25pt Arial";
    // context.fillStyle = "blue";
    // context.fillText("some text", 10, 540);
  }

  this.rotate = function(axis, angle) {
    setRotationMatrix(axis, angle);

    for (var i = 0; i < this.vertices.length; i++) {
      this.vertices[i].rotate();
    }    
  }

  this.snap = function() {

  }
}
