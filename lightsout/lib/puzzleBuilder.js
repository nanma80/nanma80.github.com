function PuzzleBuilder() {
  // show vertices and the indices

  this.colorArray = [
    [244,244,244] //background
  ];

  this.setParameters = function(type, layers) {
    this.shape = 'dodecahedron';
  }

  this.initializeState = function() {
    this.vertices = getVertices(this.shape);
    console.log(this.vertices);
  }

  this.rotate = function(axis, angle) {
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

    // console.log(this.nTurns);
    context.font = "25pt Arial";
    context.fillStyle = "blue";
    context.fillText("some text", 10, 540);
    
  }

  this.rotate = function(axis, angle) {
    setRotationMatrix(axis, angle);

    for (var i=0; i<2+this.stateLayers; i++) {
      for (var j=0; j<2+this.stateLayers; j++) {
        for (var k=0; k<2+this.stateLayers; k++) {
          if (typeof (this.state[i][j][k]) == "undefined") continue;

          this.state[i][j][k].rotate(axis, angle);

        }
      }
    }

    for (var i=0; i<2+this.layers; i++) {
      for (var j=0; j<2+this.layers; j++) {
        for (var k=0; k<2+this.layers; k++) {
          if (typeof (this.stickers[i][j][k]) == "undefined") continue;

          this.stickers[i][j][k].rotate(axis, angle);

        }
      }
    }
  }

  this.snap = function() {

  }




}
