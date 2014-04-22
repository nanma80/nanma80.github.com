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

  
  this.stateSize = 1;
  this.faceSize = 3;
  
  // type is changed by onRadioButton()
  // this.type = type;

  this.setParameters = function(type, layers) {
    this.type = type;
    this.layers = layers;
    this.stickerSize = 0.92 * 3/this.layers;

    // layer 0 and layer 1 + this.layers: stickers on top of pieces
    // centers of faces: (1+this.layers)/2
    this.sizeOfStickersArray = 2 + this.layers;
    this.center = (1.0+this.layers)/2;

    this.stateLayers = 3;
    this.sizeOfStateArray = 2 + this.stateLayers;
    this.stateCenter = (1.0 + this.stateLayers)/2;

  }

  // public methods
  this.initializeState = function() {
    // set the state to the original state, and original orientation
    this.nTurns = 0;

    // create empty array for stickers
    this.stickers = new Array(this.sizeOfStickersArray);
    for (var i = 0; i < this.sizeOfStickersArray; i++) {
      this.stickers[i] = new Array(this.sizeOfStickersArray);
    }

    for (var i = 0; i < this.sizeOfStickersArray; i++) {
      for (var j = 0; j < this.sizeOfStickersArray; j++) {
        this.stickers[i][j] = new Array(this.sizeOfStickersArray);
      }
    }

    // fill in stickers
    for (var i = 1; i < 1 + this.layers; i++) {
      for (var j = 1; j < 1 + this.layers; j++) {

        var indices;
        var colorIndex = 1;

        indices = [0,i,j];
        this.stickers[indices[0]][indices[1]][indices[2]] = 
          new Sticker(
            new Point3D(-1,0,0), 
            new Point3D(-(this.stateLayers/2),(i-this.center) * this.stateLayers/this.layers,(j-this.center)* this.stateLayers/this.layers), 
            this.colorArray[colorIndex++],
            this.stickerSize); // back

        indices = [1+this.layers,i,j];
        this.stickers[indices[0]][indices[1]][indices[2]] = 
          new Sticker(
            new Point3D(1,0,0), 
            new Point3D((this.stateLayers/2),(i-this.center) * this.stateLayers/this.layers,(j-this.center)* this.stateLayers/this.layers), 
            this.colorArray[colorIndex++],
            this.stickerSize); // front
        
        indices = [i,0,j];
        this.stickers[indices[0]][indices[1]][indices[2]] = 
          new Sticker(
            new Point3D(0,-1,0), 
            new Point3D((i-this.center) * this.stateLayers/this.layers,-(this.stateLayers/2),(j-this.center)* this.stateLayers/this.layers), 
            this.colorArray[colorIndex++],
            this.stickerSize); // left
        indices = [i,1+this.layers,j];
        this.stickers[indices[0]][indices[1]][indices[2]] = 
          new Sticker(
            new Point3D(0,1,0), 
            new Point3D((i-this.center) * this.stateLayers/this.layers,(this.stateLayers/2),(j-this.center)* this.stateLayers/this.layers), 
            this.colorArray[colorIndex++],
            this.stickerSize); // right

        indices = [i,j,0];
        this.stickers[indices[0]][indices[1]][indices[2]] = 
          new Sticker(
            new Point3D(0,0,-1), 
            new Point3D((i-this.center) * this.stateLayers/this.layers,(j-this.center)* this.stateLayers/this.layers,-(this.stateLayers/2)), 
            this.colorArray[colorIndex++],
            this.stickerSize); // down
        indices = [i,j,1+this.layers];
        this.stickers[indices[0]][indices[1]][indices[2]] = 
          new Sticker(
            new Point3D(0,0,1), 
            new Point3D((i-this.center) * this.stateLayers/this.layers,(j-this.center)* this.stateLayers/this.layers,(this.stateLayers/2)), 
            this.colorArray[colorIndex++],
            this.stickerSize); // up
      }
    }

    // create empty state array for control
    this.state = new Array(this.sizeOfStateArray);
    for (var i = 0; i < this.sizeOfStateArray; i++) {
      this.state[i] = new Array(this.sizeOfStateArray);
    }

    for (var i = 0; i < this.sizeOfStateArray; i++) {
      for (var j = 0; j < this.sizeOfStateArray; j++) {
        this.state[i][j] = new Array(this.sizeOfStateArray);
      }
    }


    // create state stickers for control of mirror and twist
    if (this.type == "full") {
      for (var i=1; i<4; i++) {
        for (var j=1; j<4; j++) {
          this.state[0][i][j] = new Sticker(new Point3D(-1,0,0), new Point3D(-1.5,i-2,j-2), this.colorArray[7],this.stateSize); // back
          this.state[4][i][j] = new Sticker(new Point3D( 1,0,0), new Point3D( 1.5,i-2,j-2), this.colorArray[7],this.stateSize); // front
          this.state[i][0][j] = new Sticker(new Point3D(0,-1,0), new Point3D(i-2,-1.5,j-2), this.colorArray[7],this.stateSize); // left
          this.state[i][4][j] = new Sticker(new Point3D(0, 1,0), new Point3D(i-2, 1.5,j-2), this.colorArray[7],this.stateSize); // right
          this.state[i][j][0] = new Sticker(new Point3D(0,0,-1), new Point3D(i-2,j-2,-1.5), this.colorArray[7],this.stateSize); // down
          this.state[i][j][4] = new Sticker(new Point3D(0,0, 1), new Point3D(i-2,j-2, 1.5), this.colorArray[7],this.stateSize); // up
        }
      }
    }
    // set the plastic faces for control of mirror +, mirror X, Rubik and half turn
    this.state[1][2][2] = new Sticker(new Point3D(-1,0,0), new Point3D(-1.5,0,0), this.colorArray[7],this.faceSize); // back
    this.state[3][2][2] = new Sticker(new Point3D( 1,0,0), new Point3D( 1.5,0,0), this.colorArray[7],this.faceSize); // front
    this.state[2][1][2] = new Sticker(new Point3D(0,-1,0), new Point3D(0,-1.5,0), this.colorArray[7],this.faceSize); // left
    this.state[2][3][2] = new Sticker(new Point3D(0, 1,0), new Point3D(0, 1.5,0), this.colorArray[7],this.faceSize); // right
    this.state[2][2][1] = new Sticker(new Point3D(0,0,-1), new Point3D(0,0,-1.5), this.colorArray[7],this.faceSize); // down
    this.state[2][2][3] = new Sticker(new Point3D(0,0, 1), new Point3D(0,0, 1.5), this.colorArray[7],this.faceSize); // up
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

    // draw plastic
    
    for (var i=1; i<1+this.stateLayers; i++) {
      for (var j=1; j<1+this.stateLayers; j++) {
        for (var k=1; k<1+this.stateLayers; k++) {

          if (typeof (this.state[i][j][k]) == "undefined") continue;
          this.state[i][j][k].draw();

        }
      }
    }

    //draw stickers

    for (var i=0; i<2+this.layers; i++) {
      for (var j=0; j<2+this.layers; j++) {
        for (var k=0; k<2+this.layers; k++) {
          if (typeof (this.stickers[i][j][k]) == "undefined") continue;
          this.stickers[i][j][k].draw();
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
    if (this.type!="full") {
    // go through all the plastic faces
      for (var i=1; i<1+this.stateLayers; i++) {
        for (var j=1; j<1+this.stateLayers; j++) {
          for (var k=1; k<1+this.stateLayers; k++) {

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
      for (var i=0; i<2+this.stateLayers; i++) {
        for (var j=0; j<2+this.stateLayers; j++) {
          for (var k=0; k<2+this.stateLayers; k++) {
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

    // initializing cloneState
    this.cloneSticker = new Array(this.sizeOfStickersArray);

    for (var i = 0; i < this.sizeOfStickersArray; i++) {
      this.cloneSticker[i] = new Array(this.sizeOfStickersArray);
    }

    for (var i = 0; i < this.sizeOfStickersArray; i++) {
      for (var j = 0; j < this.sizeOfStickersArray; j++) {
        this.cloneSticker[i][j] = new Array(this.sizeOfStickersArray);
      }
    }

    // copy color arrays from state to cloneState
    for (var i=0; i<2+this.layers; i++) {
      for (var j=0; j<2+this.layers; j++) {
        for (var k=0; k<2+this.layers; k++) {
          if (typeof (this.stickers[i][j][k]) == "undefined") continue;
          this.cloneSticker[i][j][k] = this.stickers[i][j][k].colorArray;
        }
      }
    } 
  }

  this.reverseClone = function() {
    // from clone state back to state
    for (var i=0; i<2+this.layers; i++) {
      for (var j=0; j<2+this.layers; j++) {
        for (var k=0; k<2+this.layers; k++) {
          if (typeof (this.stickers[i][j][k]) == "undefined") continue;
          this.stickers[i][j][k].colorArray = this.cloneSticker[i][j][k];          
        }
      }
    } 
  }

  this.scramble = function(){

    var scrambleLength = 50;
    scrambleLength += Math.round(Math.random());
    
    for (var scrambleIndex = 0; scrambleIndex < scrambleLength; scrambleIndex++) {
      snap.setRandom(this.type); //set snap object to a random state
      this.twist((Math.random()>0.5), (Math.random()>0.5) ? 1 : 2);
    }

    this.nTurns = 0;

    snap.reset();

    this.draw();

  }

  this.twist = function(direction, whichLayer) {

    if (snap.index.length < 1) return;

    var faceIndex = snap.faceIndex;
    var index0_start, index0_end, index0_step;

    this.duplicateState();

    if (this.layers == 2) {
      if (whichLayer == 1) {
        index0_start = this.center * (1+faceIndex) - faceIndex;
        index0_end = this.center * (1+faceIndex) + faceIndex;
      } else if (whichLayer == 2){
        index0_start = this.center * (1+faceIndex) - faceIndex*3;
        index0_end = this.center * (1+faceIndex) - faceIndex;
      } else { // whichLayer may be 12 or 123
        index0_start = this.center * (1+faceIndex) - faceIndex*3;
        index0_end = this.center * (1+faceIndex) + faceIndex;
      }
    } else if (this.layers == 3) {
      if (whichLayer == 1) {
        index0_start = this.center * (1+faceIndex) - faceIndex;
        index0_end = this.center * (1+faceIndex) + faceIndex;
      } else if (whichLayer == 2){
        index0_start = this.center * (1+faceIndex) - faceIndex*2;
        index0_end = this.center * (1+faceIndex) - faceIndex;
      } else if (whichLayer == 12){
        index0_start = this.center * (1+faceIndex) - faceIndex*2;
        index0_end = this.center * (1+faceIndex) + faceIndex;
      } else { // whichLayer == 123
        index0_start = this.center * (1+faceIndex) - faceIndex*4;
        index0_end = this.center * (1+faceIndex) + faceIndex;
      }
    } else { //this.layers == 4 or 5
      if (whichLayer == 1) {
        index0_start = this.center * (1+faceIndex) - faceIndex;
        index0_end = this.center * (1+faceIndex) + faceIndex;
      } else if (whichLayer == 2){
        index0_start = this.center * (1+faceIndex) - faceIndex*2;
        index0_end = this.center * (1+faceIndex) - faceIndex;
      } else if (whichLayer == 12){
        index0_start = this.center * (1+faceIndex) - faceIndex*2;
        index0_end = this.center * (1+faceIndex) + faceIndex;
      } else { // whichLayer == 123
        index0_start = this.center * (1+faceIndex) - faceIndex*3;
        index0_end = this.center * (1+faceIndex) + faceIndex;
      }
    }


    index0_step = (index0_start < index0_end) ? 1 : -1;

    for (var index0 = index0_start; index0 != index0_end; index0 += index0_step) {
      for (var index1 = 0; index1 <2+this.layers; index1 ++) {
        for (var index2 = 0; index2 < 2+this.layers; index2 ++) {
          var flyingIndex = [0,0,0];
          flyingIndex[snap.dir[0]] = index0;
          flyingIndex[snap.dir[1]] = index1;
          flyingIndex[snap.dir[2]] = index2;

          if (typeof (this.stickers[flyingIndex[0]][flyingIndex[1]][flyingIndex[2]]) == "undefined") continue;

          var mirrorIndex = [0,0,0];

          if (snap.snapType == "rubik" && (this.type == 'rubik' || this.type == "full")) {
            mirrorIndex[snap.dir[0]] = index0;
            if (direction == (faceIndex > 0)) {
              mirrorIndex[snap.dir[1]] = 1+this.layers-index2;
              mirrorIndex[snap.dir[2]] = index1;
            } else {
              mirrorIndex[snap.dir[1]] = index2;
              mirrorIndex[snap.dir[2]] = 1+this.layers- index1;
            }
          } else if (snap.snapType == "rubik" && this.type == 'halfturn') {
            mirrorIndex[snap.dir[0]] = index0;
            mirrorIndex[snap.dir[1]] = 1+this.layers-index1;
            mirrorIndex[snap.dir[2]] = 1+this.layers-index2;
          } else if (snap.snapType == "mirror+") {
            
            mirrorIndex[snap.dir[0]] = index0;
            mirrorIndex[snap.dir[1]] = 1+this.layers - index1;
            mirrorIndex[snap.dir[2]] = index2;

          } else if (snap.snapType == "mirrorX") {
            if (snap.auxiliary == invertMirrorX) {
              mirrorIndex[snap.dir[0]] = index0;
              mirrorIndex[snap.dir[1]] = 1+this.layers- index2;
              mirrorIndex[snap.dir[2]] = 1+this.layers- index1;
            } else {
              mirrorIndex[snap.dir[0]] = index0;
              mirrorIndex[snap.dir[1]] = index2;
              mirrorIndex[snap.dir[2]] = index1;
            }
          }
          this.cloneSticker[flyingIndex[0]][flyingIndex[1]][flyingIndex[2]] = this.stickers[mirrorIndex[0]][mirrorIndex[1]][mirrorIndex[2]].colorArray;
        }
      }
    }

  this.reverseClone();
  this.nTurns ++;

  }

}
