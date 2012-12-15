function Puzzle(type) {
  // static values: the variable that never changes
  this.type = "";
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
    [0,0,0], // plastic
    [80, 80, 80], //highlighted plastic
    [160,92,240]
  ]; // initial color: background, back, front, left, right, down, up

  this.stickerSize = 0.92;
  this.faceSize = 3;
  
  // type is changed by onRadioButton()
  this.type = type;

  // public methods
  this.initializeState = function() {
    // set the state to the original state, and original orientation
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

    // // old illustration to indicate the face to be twisted on the rubik's cube
    // if ((this.type == 'rubik') && (snapIndex.length > 0)) {
    //   this.state[snapIndex[0]][snapIndex[1]][snapIndex[2]].colorArray = this.colorArray[8];
    //   this.state[snapIndex[0]][snapIndex[1]][snapIndex[2]].draw();
    //   this.state[snapIndex[0]][snapIndex[1]][snapIndex[2]].colorArray = this.colorArray[7];
    // }

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
    if (snapIndex.length > 0) this.drawArrows();
  }

  this.drawArrows = function() {
    if (this.type == "mirror+") {
      var snapIndexMinusTwo = snapIndex.map(function(x){return Math.abs(x-2);});
      var primary_dir = snapIndexMinusTwo.indexOf(2);
      var secondary_dir = snapIndexMinusTwo.indexOf(1);
      var newIndex = [2,2,2];
      newIndex[primary_dir] = (2+snapIndex[primary_dir])/2;
      var arrowDirection = (secondary_dir - primary_dir + 3)%3 -1; // 0 or 1
      
      // this.state[newIndex[0]][newIndex[1]][newIndex[2]].draw();
      this.state[newIndex[0]][newIndex[1]][newIndex[2]].drawArrows(arrowDirection,this.type);
    } else if (this.type == "mirrorX") {
      var snapIndexMinusTwo = snapIndex.map(function(x){return Math.abs(x-2);});
      var primary_dir = snapIndexMinusTwo.indexOf(2);
      var newIndex = [2,2,2];
      newIndex[primary_dir] = (2+snapIndex[primary_dir])/2;
      
      var arrowDirection;

      if (snapIndex[(primary_dir+1)%3] == snapIndex[(primary_dir+2)%3]) arrowDirection = 1;
      else arrowDirection = 0;
      
      this.state[newIndex[0]][newIndex[1]][newIndex[2]].drawArrows(arrowDirection,this.type);

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
    // go through all the plastic faces
    for (var i=1; i<4; i++) {
      for (var j=1; j<4; j++) {
        for (var k=1; k<4; k++) {

          if (typeof (this.state[i][j][k]) == "undefined") continue;

          contains_return = this.state[i][j][k].contains(this.type);
          if (contains_return == false) continue;

          // now this face must contains mouse

          var twist_dir = [Math.abs(i-2), Math.abs(j-2), Math.abs(k-2)].indexOf(1);
          var faceIndex = [i,j,k][twist_dir] - 2;

          if (this.type == "rubik") {
            var newIndex = [i,j,k];
            newIndex[twist_dir] += faceIndex;
            return newIndex;
          }

          if (this.type == "mirror+") {
            var newIndex = [i,j,k];
            newIndex[twist_dir] += faceIndex;
            newIndex[(twist_dir + contains_return)%3] += faceIndex;
            return newIndex;
          }

          if (this.type == "mirrorX") {

            var newIndex = [i,j,k].map(function(x){return x+faceIndex;});
            if (contains_return == 1) {
              newIndex[(twist_dir + 1)%3] = 4-newIndex[(twist_dir + 1)%3];
            }
            return newIndex;
          }

        }
      }
    }

    return [];
  }

  this.duplicateState = function() {
    // preparing a clone state to store the color arrays, for twisting
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

  this.twist = function(direction) {
    var snapIndexMinusTwo = snapIndex.map(function(x){return Math.abs(x-2);});
    var primary_dir = snapIndexMinusTwo.indexOf(2);
    var faceIndex = (snapIndex[primary_dir]-2)/2;

    if (this.type == "rubik") {
      var secondary_dir = (primary_dir+1)%3;
      var tertiary_dir = (primary_dir+2)%3;

      this.duplicateState();

      for (var primary_index = snapIndex[primary_dir]-faceIndex; primary_index!=snapIndex[primary_dir] + faceIndex; primary_index += faceIndex) {
        // console.log("primary_index: "+primary_index+", should in 0 to 4");
        for (var secondary_index = 0; secondary_index <5; secondary_index ++) {
          for (var tertiary_index = 0; tertiary_index < 5; tertiary_index ++) {
            var flyingIndex = [0,0,0];
            flyingIndex[primary_dir] = primary_index;
            flyingIndex[secondary_dir] = secondary_index;
            flyingIndex[tertiary_dir] = tertiary_index;

            var mirrorIndex = [0,0,0];
            if (direction == (faceIndex > 0)) {
              mirrorIndex[primary_dir] = primary_index;
              mirrorIndex[secondary_dir] = 4-tertiary_index;
              mirrorIndex[tertiary_dir] = secondary_index;
            } else {
              mirrorIndex[primary_dir] = primary_index;
              mirrorIndex[secondary_dir] = tertiary_index;
              mirrorIndex[tertiary_dir] = 4- secondary_index;
            }
            
            if (typeof (this.state[flyingIndex[0]][flyingIndex[1]][flyingIndex[2]]) == "undefined") continue;
            this.cloneState[flyingIndex[0]][flyingIndex[1]][flyingIndex[2]] = this.state[mirrorIndex[0]][mirrorIndex[1]][mirrorIndex[2]].colorArray;
          }
        }
      }
      this.reverseClone();
    } else if (this.type == 'mirror+') {

      // var snapIndexMinusTwo = snapIndex.map(function(x){return Math.abs(x-2);});
      // var primary_dir = snapIndexMinusTwo.indexOf(2);
      var secondary_dir = snapIndexMinusTwo.indexOf(1);
      var tertiary_dir = 3 - primary_dir - secondary_dir;
      // console.log("tertiary_dir: "+tertiary_dir+", should be 0 or 1 or 2");
      // var faceIndex = (snapIndex[primary_dir]-2)/2; //distinguishing F and B
      // console.log("faceIndex: "+tertiary_dir+", should be -1 or 1");
      this.duplicateState();

      for (var primary_index = snapIndex[primary_dir]-faceIndex; primary_index!=snapIndex[primary_dir] + faceIndex; primary_index += faceIndex) {
        // console.log("primary_index: "+primary_index+", should in 0 to 4");
        for (var secondary_index = 0; secondary_index <5; secondary_index ++) {
          for (var tertiary_index = 0; tertiary_index < 5; tertiary_index ++) {
            var flyingIndex = [0,0,0];
            flyingIndex[primary_dir] = primary_index;
            flyingIndex[secondary_dir] = secondary_index;
            flyingIndex[tertiary_dir] = tertiary_index;

            var mirrorIndex = [0,0,0];
            mirrorIndex[primary_dir] = primary_index;
            mirrorIndex[secondary_dir] = 4 - secondary_index;
            mirrorIndex[tertiary_dir] = tertiary_index;
            
            if (typeof (this.state[flyingIndex[0]][flyingIndex[1]][flyingIndex[2]]) == "undefined") continue;

            this.cloneState[flyingIndex[0]][flyingIndex[1]][flyingIndex[2]] = this.state[mirrorIndex[0]][mirrorIndex[1]][mirrorIndex[2]].colorArray;
          }
        }
      }

      this.reverseClone();

    } else if (this.type == 'mirrorX') {

      // var snapIndexMinusTwo = snapIndex.map(function(x){return Math.abs(x-2);});
      // var primary_dir = snapIndexMinusTwo.indexOf(2);
      var secondary_dir = (primary_dir+1)%3;
      var tertiary_dir = (primary_dir+2)%3;
      
      // console.log("primary_dir: "+primary_dir+", should be 0 or 1 or 2");
      // console.log("tertiary_dir: "+tertiary_dir+", should be 0 or 1 or 2");
      // var faceIndex = (snapIndex[primary_dir]-2)/2; //distinguishing F and B
      // console.log("faceIndex: "+tertiary_dir+", should be -1 or 1");
      this.duplicateState();


      for (var primary_index = snapIndex[primary_dir]-faceIndex; primary_index!=snapIndex[primary_dir] + faceIndex; primary_index += faceIndex) {
        // console.log("primary_index: "+primary_index+", should in 0 to 4");
        for (var secondary_index = 0; secondary_index <5; secondary_index ++) {
          for (var tertiary_index = 0; tertiary_index < 5; tertiary_index ++) {
            var flyingIndex = [0,0,0];
            flyingIndex[primary_dir] = primary_index;
            flyingIndex[secondary_dir] = secondary_index;
            flyingIndex[tertiary_dir] = tertiary_index;

            var mirrorIndex = [0,0,0];
            if (snapIndex[(primary_dir+1)%3] == snapIndex[(primary_dir+2)%3] ) {
              mirrorIndex[primary_dir] = primary_index;
              mirrorIndex[secondary_dir] = tertiary_index;
              mirrorIndex[tertiary_dir] = secondary_index;
            } else {
              mirrorIndex[primary_dir] = primary_index;
              mirrorIndex[secondary_dir] = 4- tertiary_index;
              mirrorIndex[tertiary_dir] = 4- secondary_index;
            }
            
            if (typeof (this.state[flyingIndex[0]][flyingIndex[1]][flyingIndex[2]]) == "undefined") continue;
            this.cloneState[flyingIndex[0]][flyingIndex[1]][flyingIndex[2]] = this.state[mirrorIndex[0]][mirrorIndex[1]][mirrorIndex[2]].colorArray;
          }
        }
      }

      this.reverseClone();

    }



  }

}
