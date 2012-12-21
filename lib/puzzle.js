function Puzzle() {
  // initial values
  this.nTurns = 0;

  this.colorArray = [
    [244,244,244],//background
    [0,255,0], //back, green
    [0,0,255], //front, blue
    [255,165,0], //left, orange
    [255,0,0],//right, red
    [255,255,255],//down, white
    [255,255,0], //up, yellow
    [0,0,0], // plastic, black
    [80, 80, 80], //highlighted plastic, not used anymore
    [160,92,240] // purple, for arrows
  ]; // initial color: background, back, front, left, right, down, up

  this.stickerSize = 0.92;
  this.faceSize = this.layers;
  
  // type is changed by onRadioButton()
  // this.type = type;

  this.setParameters = function(type, layers) {
    this.type = type;
    this.layers = layers;

    // layer 0 and layer 1 + this.layers: stickers on top of pieces
    // centers of faces: (1+this.layers)/2
    this.sizeOfStateArray = 2 + this.layers;
    this.center = (1+this.layers)/2;
  }

  // public methods
  this.initializeState = function() {
    // set the state to the original state, and original orientation
    this.nTurns = 0;

    this.state = [
      [new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray)],
      [new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray)],
      [new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray)],
      [new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray)],
      [new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray)]
    ];

    for (var i = 1; i < 1 + this.layers; i++) {
      for (var j = 1; j < 1 + this.layers; j++) {
        var indices;
        var colorIndex = 1;
        indices = [0,i,j];
        this.state[indices[0]][indices[1]][indices[2]] = 
          new Sticker(
            new Point3D(-1,0,0), 
            new Point3D(-(this.layers/2),i-this.center,j-this.center), 
            this.colorArray[colorIndex++],
            this.stickerSize); // back
        indices = [1+this.layers,i,j];
        this.state[indices[0]][indices[1]][indices[2]] = 
          new Sticker(
            new Point3D(1,0,0), 
            new Point3D((this.layers/2),i-this.center,j-this.center), 
            this.colorArray[colorIndex++],
            this.stickerSize); // back
        

        this.state[i][0][j] = new Sticker(new Point3D(0,-1,0), new Point3D(i-2,-1.5,j-2), this.colorArray[3],this.stickerSize); // left
        this.state[i][4][j] = new Sticker(new Point3D(0, 1,0), new Point3D(i-2, 1.5,j-2), this.colorArray[4],this.stickerSize); // right
        this.state[i][j][0] = new Sticker(new Point3D(0,0,-1), new Point3D(i-2,j-2,-1.5), this.colorArray[5],this.stickerSize); // down
        this.state[i][j][4] = new Sticker(new Point3D(0,0, 1), new Point3D(i-2,j-2, 1.5), this.colorArray[6],this.stickerSize); // up
      }
    }
    // set the plastic faces
    this.state[1][2][2] = new Sticker(new Point3D(-1,0,0), new Point3D(-1.5,0,0), this.colorArray[7],this.faceSize); // back
    this.state[3][2][2] = new Sticker(new Point3D( 1,0,0), new Point3D( 1.5,0,0), this.colorArray[7],this.faceSize); // front
    this.state[2][1][2] = new Sticker(new Point3D(0,-1,0), new Point3D(0,-1.5,0), this.colorArray[7],this.faceSize); // left
    this.state[2][3][2] = new Sticker(new Point3D(0, 1,0), new Point3D(0, 1.5,0), this.colorArray[7],this.faceSize); // right
    this.state[2][2][1] = new Sticker(new Point3D(0,0,-1), new Point3D(0,0,-1.5), this.colorArray[7],this.faceSize); // down
    this.state[2][2][3] = new Sticker(new Point3D(0,0, 1), new Point3D(0,0, 1.5), this.colorArray[7],this.faceSize); // up
  }

  this.resetState = function() {
    this.initializeState();

    this.rotate(new Point3D(1,2,-1), 0.6);
    this.rotate(new Point3D(1,0,0), -0.3);

    snap.reset();
    this.draw();
  }

  this.draw = function() {
    context.fillStyle = "rgb(" + this.colorArray[0][0] + "," + this.colorArray[0][1] + "," + this.colorArray[0][2] + ")";
    context.fillRect(0,0,viewWidth,viewHeight);

    // draw plastic
    
    for (var i=1; i<4; i++) {
      for (var j=1; j<4; j++) {
        for (var k=1; k<4; k++) {

          if (typeof (this.state[i][j][k]) == "undefined") continue;
          this.state[i][j][k].draw();

        }
      }
    }

    //draw stickers

    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++) {
        for (var k=0; k<5; k++) {

          if (typeof (this.state[i][j][k]) == "undefined") continue;
          if (this.state[i][j][k].stickerSize > 1) continue;
          this.state[i][j][k].draw();

        }
      }
    }

    // draw twist illustration: arrows etc
    if (snap.index.length > 0) 
      this.state[snap.plasticIndex[0]][snap.plasticIndex[1]][snap.plasticIndex[2]].drawArrows();

    // console.log(this.nTurns);
    context.font = "25pt Arial";
    context.fillStyle = "blue";
    context.fillText(this.nTurns.toString() + " move" + (this.nTurns > 1 ? "s" : ""), 10, 540);
    
  }

  this.rotate = function(axis, angle) {
    setRotationMatrix(axis, angle);

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
    if (this.type!="full") {
    // go through all the plastic faces
      for (var i=1; i<4; i++) {
        for (var j=1; j<4; j++) {
          for (var k=1; k<4; k++) {

            if (typeof (this.state[i][j][k]) == "undefined") continue;

            contains_return = this.state[i][j][k].contains(this.type);
            if (contains_return == false) continue;

            // now this face must contains mouse
            snap.setPrimaryByPlastic([i,j,k]);

            if (this.type == "rubik" || this.type =='halfturn') {
              snap.setIndexToFace();
              return;
            }

            if (this.type == "mirror+") {
              snap.setIndexToEdge(contains_return);
              return;
            }

            if (this.type == "mirrorX") {
              snap.setIndexToVertex(contains_return);
              return;
            }
          }
        }
      }

    } else { //full, go through all stickers
      for (var i=0; i<5; i++) {
        for (var j=0; j<5; j++) {
          for (var k=0; k<5; k++) {
            if (typeof (this.state[i][j][k]) == "undefined") continue;
            if (this.state[i][j][k].stickerSize > 1) continue;

            contains_return = this.state[i][j][k].contains("rubik");
            
            if (contains_return == false) continue;

            snap.setByFull([i,j,k]);

            return;
            
          }
        }
      }


    }
    snap.index = [];
  }

  this.duplicateState = function() {
    // preparing a clone state to store the color arrays, for twisting

    this.cloneState = [
      [new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray)],
      [new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray)],
      [new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray)],
      [new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray)],
      [new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray),new Array(this.sizeOfStateArray)]
    ];

    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++) {
        for (var k=0; k<5; k++) {
          if (typeof (this.state[i][j][k]) == "undefined") continue;
          this.cloneState[i][j][k] = this.state[i][j][k].colorArray;
        }
      }
    } 
  }

  this.reverseClone = function() {
    // from clone state back to state
    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++) {
        for (var k=0; k<5; k++) {
          if (typeof (this.state[i][j][k]) == "undefined") continue;
          this.state[i][j][k].colorArray = this.cloneState[i][j][k];          
        }
      }
    }  
  }


  this.scramble = function(){

    var scrambleLength = 50;
    scrambleLength += Math.round(Math.random());
    

    for (var scrambleIndex = 0; scrambleIndex < scrambleLength; scrambleIndex++) {
      snap.setRandom(this.type); //set snap object to a random state
      this.twist((Math.random()>0.5));
    }

    this.nTurns = 0;

    snap.reset();

    this.draw();

  }

  this.twist = function(direction) {

    if (snap.index.length < 1) return;

    var faceIndex = snap.faceIndex;

    this.duplicateState();

    

    for (var index0 = snap.index[snap.dir[0]]-faceIndex; index0!=snap.index[snap.dir[0]] + faceIndex; index0 += faceIndex) {
      for (var index1 = 0; index1 <5; index1 ++) {
        for (var index2 = 0; index2 < 5; index2 ++) {
          var flyingIndex = [0,0,0];
          flyingIndex[snap.dir[0]] = index0;
          flyingIndex[snap.dir[1]] = index1;
          flyingIndex[snap.dir[2]] = index2;


          if (typeof (this.state[flyingIndex[0]][flyingIndex[1]][flyingIndex[2]]) == "undefined") continue;

          var mirrorIndex = [0,0,0];

          if (snap.snapType == "rubik" && (this.type == 'rubik' || this.type == "full")) {
            mirrorIndex[snap.dir[0]] = index0;
            if (direction == (faceIndex > 0)) {
              mirrorIndex[snap.dir[1]] = 4-index2;
              mirrorIndex[snap.dir[2]] = index1;
            } else {
              mirrorIndex[snap.dir[1]] = index2;
              mirrorIndex[snap.dir[2]] = 4- index1;
            }
          } else if (snap.snapType == "rubik" && this.type == 'halfturn') {
            mirrorIndex[snap.dir[0]] = index0;
            mirrorIndex[snap.dir[1]] = 4-index1;
            mirrorIndex[snap.dir[2]] = 4-index2;
          } else if (snap.snapType == "mirror+") {
            
            mirrorIndex[snap.dir[0]] = index0;
            mirrorIndex[snap.dir[1]] = 4 - index1;
            mirrorIndex[snap.dir[2]] = index2;

          } else if (snap.snapType == "mirrorX") {
            if (snap.auxiliary == invertMirrorX) {
              mirrorIndex[snap.dir[0]] = index0;
              mirrorIndex[snap.dir[1]] = 4- index2;
              mirrorIndex[snap.dir[2]] = 4- index1;
            } else {
              mirrorIndex[snap.dir[0]] = index0;
              mirrorIndex[snap.dir[1]] = index2;
              mirrorIndex[snap.dir[2]] = index1;
            }
          }
          this.cloneState[flyingIndex[0]][flyingIndex[1]][flyingIndex[2]] = this.state[mirrorIndex[0]][mirrorIndex[1]][mirrorIndex[2]].colorArray;
        }
      }
    }

  this.reverseClone();
  this.nTurns ++;

  }

}
