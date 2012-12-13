function Puzzle(type) {
  // type maybe "rubik", "mirror+" "mirrorX" or "mirrorrubik"
  this.type = type;
  
  this.state = [
    [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
    [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
    [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
    [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
    [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)]
  ];

  this.colorArray = [
    [244,244,244],//background
    [0,255,0], //back
    [0,0,255], //front
    [255,165,0], //left
    [255,0,0],//right
    [255,255,255],//down
    [255,255,0], //up
    [0,0,0] // plastic
  ]; // initial color: background, back, front, left, right, down, up

  this.stickerSize = 0.92;

  this.initializeState = function() {
  // set the state to the original state
    for (var i=1; i<4; i++) {
      for (var j=1; j<4; j++) {
        this.state[0][i][j] = new Sticker(new Point3D(-1,0,0), new Point3D(-1.5,i-2,j-2), this.colorArray[1],this.stickerSize); // back
        this.state[4][i][j] = new Sticker(new Point3D( 1,0,0), new Point3D( 1.5,i-2,j-2), this.colorArray[2],this.stickerSize); // front
        this.state[i][0][j] = new Sticker(new Point3D(0,-1,0), new Point3D(i-2,-1.5,j-2), this.colorArray[3],this.stickerSize); // left
        this.state[i][4][j] = new Sticker(new Point3D(0, 1,0), new Point3D(i-2, 1.5,j-2), this.colorArray[4],this.stickerSize); // right
        this.state[i][j][0] = new Sticker(new Point3D(0,0,-1), new Point3D(i-2,j-2,-1.5), this.colorArray[5],this.stickerSize); // down
        this.state[i][j][4] = new Sticker(new Point3D(0,0, 1), new Point3D(i-2,j-2, 1.5), this.colorArray[6],this.stickerSize); // up
      }
    }
  }

  this.faceSize = 3;

  this.state[1][2][2] = new Sticker(new Point3D(-1,0,0), new Point3D(-1.5,0,0), this.colorArray[7],this.faceSize); // back
  this.state[3][2][2] = new Sticker(new Point3D( 1,0,0), new Point3D( 1.5,0,0), this.colorArray[7],this.faceSize); // front
  this.state[2][1][2] = new Sticker(new Point3D(0,-1,0), new Point3D(0,-1.5,0), this.colorArray[7],this.faceSize); // left
  this.state[2][3][2] = new Sticker(new Point3D(0, 1,0), new Point3D(0, 1.5,0), this.colorArray[7],this.faceSize); // right
  this.state[2][2][1] = new Sticker(new Point3D(0,0,-1), new Point3D(0,0,-1.5), this.colorArray[7],this.faceSize); // down
  this.state[2][2][3] = new Sticker(new Point3D(0,0, 1), new Point3D(0,0, 1.5), this.colorArray[7],this.faceSize); // up

  this.draw = function(context, viewWidth, viewHeight) {
    context.fillStyle = "rgb(" + this.colorArray[0][0] + "," + this.colorArray[0][1] + "," + this.colorArray[0][2] + ")";
    context.fillRect(0,0,viewWidth,viewHeight);

    // draw plastic
    
    for (var i=1; i<4; i++) {
      for (var j=1; j<4; j++) {
        for (var k=1; k<4; k++) {

          if (typeof (this.state[i][j][k]) == "undefined") continue;
          this.state[i][j][k].draw(context,viewWidth, viewHeight);

        }
      }
    }

    //draw stickers

    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++) {
        for (var k=0; k<5; k++) {

          if (typeof (this.state[i][j][k]) == "undefined") continue;
          if (this.state[i][j][k].stickerSize > 1) continue;
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

  this.snap = function() {

    if (this.type == "rubik") {
      // go through all the faces
      for (var i=1; i<4; i++) {
        for (var j=1; j<4; j++) {
          for (var k=1; k<4; k++) {

            if (typeof (this.state[i][j][k]) == "undefined") continue;

            if ( this.state[i][j][k].contains() ) {
              
              return [i,j,k];
              
            }

          }
        }
      }
    }

    return [];
  }

  this.duplicateState = function() {
    this.cloneState = [
      [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
      [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
      [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
      [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)],
      [new Array(5),new Array(5),new Array(5),new Array(5),new Array(5)]
    ];

    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++) {
        for (var k=0; k<5; k++) {
          if (typeof (this.state[i][j][k]) == "undefined") continue;
          this.cloneState[i][j][k] = this.state[i][j][k].color;
        }
      }
    } 
  }

  this.reverseClone = function() {
    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++) {
        for (var k=0; k<5; k++) {
          if (typeof (this.state[i][j][k]) == "undefined") continue;
          this.state[i][j][k].color = this.cloneState[i][j][k];          
        }
      }
    }  
  }

  this.twist = function(direction) {
    if (this.type == "rubik") {
      console.log("snapIndex: "+snapIndex +"  direction: "+direction);
      var twist_dir = 0;
      for (; twist_dir < 3; twist_dir++) {
        if (snapIndex[twist_dir]!=2) break;
      }

      this.duplicateState();

      if (twist_dir == 0) {
        // turn F or B
        faceIndex = snapIndex[twist_dir]-2;

        for (var i=snapIndex[twist_dir]; i!=snapIndex[twist_dir] + 2*faceIndex; i+= faceIndex) {
          for (var j=0; j<5; j++) {
            for (var k=0; k<5; k++) {
              if (typeof (this.state[i][j][k]) == "undefined") continue;              
              if (direction == (faceIndex == 1)) {
                this.cloneState[i][j][k] = this.state[i][4-k][j].color;
              } else {
                this.cloneState[i][j][k] = this.state[i][k][4-j].color;
              }
            }
          }
        }
      } else if (twist_dir == 1) {
        // turn L or R
        faceIndex = snapIndex[twist_dir]-2;

        for (var i=snapIndex[twist_dir]; i!=snapIndex[twist_dir] + 2*faceIndex; i+= faceIndex) {
          for (var j=0; j<5; j++) {
            for (var k=0; k<5; k++) {
              if (typeof (this.state[k][i][j]) == "undefined") continue;              
              if (direction == (faceIndex == 1)) {
                this.cloneState[k][i][j] = this.state[j][i][4-k].color;
              } else {
                this.cloneState[k][i][j] = this.state[4-j][i][k].color;
              }
            }
          }
        }
      } else if (twist_dir == 2) {
        // turn U or D
        faceIndex = snapIndex[twist_dir]-2;

        for (var i=snapIndex[twist_dir]; i!=snapIndex[twist_dir] + 2*faceIndex; i+= faceIndex) {
          for (var j=0; j<5; j++) {
            for (var k=0; k<5; k++) {
              if (typeof (this.state[j][k][i]) == "undefined") continue;              
              if (direction == (faceIndex == 1)) {
                this.cloneState[j][k][i] = this.state[4-k][j][i].color;
              } else {
                this.cloneState[j][k][i] = this.state[k][4-j][i].color;
              }
            }
          }
        }
      } else {
        console.log("Error: twist_dir = "+twist_dir);
        exit;
      }
      this.reverseClone();


    }


  }

}
