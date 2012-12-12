function Puzzle(type) {
  // type maybe "rubik", "mirror+" "mirrorX" or "mirrorrubik"
  this.type = type;
  this.type = "rubik"; // for testing purpose
  this.state = [
    [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
    [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
    [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
    [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
    [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)]
  ];

  this.colorArray = [
    [0,0,0],//background
    [0,255,0], //back
    [0,0,255], //front
    [255,165,0], //left
    [255,0,0],//right
    [255,255,255],//down
    [255,255,0] //up
  ]; // initial color: background, back, front, left, right, down, up


  this.initializeState = function() {
  // set the state to the original state
    for (var i=1; i<4; i++) {
      for (var j=1; j<4; j++) {
        this.state[0][i][j] = new Sticker(new Point3D(-1,0,0), new Point3D(-1.5,i-2,j-2), this.colorArray[1]); // back
        this.state[4][i][j] = new Sticker(new Point3D( 1,0,0), new Point3D( 1.5,i-2,j-2), this.colorArray[2]); // front
        this.state[i][0][j] = new Sticker(new Point3D(0,-1,0), new Point3D(i-2,-1.5,j-2), this.colorArray[3]); // left
        this.state[i][4][j] = new Sticker(new Point3D(0, 1,0), new Point3D(i-2, 1.5,j-2), this.colorArray[4]); // right
        this.state[i][j][0] = new Sticker(new Point3D(0,0,-1), new Point3D(i-2,j-2,-1.5), this.colorArray[5]); // down
        this.state[i][j][4] = new Sticker(new Point3D(0,0, 1), new Point3D(i-2,j-2, 1.5), this.colorArray[6]); // up
      }
    }
  }

  this.draw = function(context, viewWidth, viewHeight) {
    context.fillStyle = "rgb(" + this.colorArray[0][0] + "," + this.colorArray[0][1] + "," + this.colorArray[0][2] + ")";
    context.fillRect(0,0,viewWidth,viewHeight);

    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++) {
        for (var k=0; k<5; k++) {

          if (typeof (this.state[i][j][k]) == "undefined") continue;
          this.state[i][j][k].draw(context,viewWidth, viewHeight);

        }
      }
    }
  }

  this.rotate = function(axis, angle) {
    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++) {
        for (var k=0; k<5; k++) {
          if (typeof (this.state[i][j][k]) == "undefined") continue;

          this.state[i][j][k].rotate(axis, angle);
        }
      }
    }    
  }

}