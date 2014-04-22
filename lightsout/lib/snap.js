function Snap() {

  this.reset = function () {
    this.index = [];
    this.oldIndex = [];
    this.plasticIndex = [];
    this.dir = [0,1,2]; // directions representing the turn, old names: primary, secondary and tertiary
    this.faceIndex = 1; // distinguishing F and B
    this.snapType = ""; // snap type. Fully determined by index
    this.auxiliary = false;
  }

  this.reset();

  this.update = function(e) {
    findMouse(e);
    puzzle.snap(mousePos);

    if (this.index.toString() != this.oldIndex.toString()) {
      // snap object is changed
      this.oldIndex = this.index.slice(0);
      puzzle.draw();
    }
  }

  this.setPrimaryByPlastic = function(plasticIndex) {
    
    this.dir[0] = plasticIndex.map(function(x){return Math.abs(x-2)}).indexOf(1);
    this.dir[1] = (this.dir[0]+1)%3;
    this.dir[2] = (this.dir[1]+1)%3;
    this.faceIndex = plasticIndex[this.dir[0]] - 2;
    this.plasticIndex = plasticIndex.slice(0);

  }

  this.setIndexToFace = function() {
    this.index = [2,2,2];
    this.index[this.dir[0]] += this.faceIndex * 2;
    this.snapType = "rubik";
  }

  this.setIndexToEdge = function( which_edge ) {
    this.index = [2,2,2];
    this.index[this.dir[0]] += this.faceIndex * 2;
    this.dir[1] = (this.dir[0] + which_edge)%3;
    this.dir[2] = 3 - this.dir[0] - this.dir[1];
    this.index[this.dir[1]] += this.faceIndex;
    this.snapType = "mirror+";
    this.auxiliary = (which_edge == 1);
  }

  this.setIndexToVertex = function (which_vertex) {
    this.index = [2+this.faceIndex,2+this.faceIndex,2+this.faceIndex];
    this.index[this.dir[0]] += this.faceIndex;
    this.dir[1] = (this.dir[0]+1)%3;
    this.dir[2] = (this.dir[1]+1)%3;
    if (which_vertex == 1) this.index[this.dir[1]] = 4-this.index[this.dir[1]];
    this.snapType = "mirrorX";
    this.auxiliary = (which_vertex == 1);
  }
  
  this.setByFull = function(newIndex) {
    this.index = newIndex.slice(0);
    var indexMinusTwo = this.index.map(function(x){return Math.abs(x-2)});
    var sumOfIndex = indexMinusTwo[0] + indexMinusTwo[1] + indexMinusTwo[2];
    this.dir[0] = indexMinusTwo.indexOf(2);
    this.faceIndex = (this.index[this.dir[0]] - 2)/2;
    this.dir[1] = (this.dir[0]+1)%3;
    this.dir[2] = (this.dir[1]+1)%3;
    this.plasticIndex = [2,2,2];
    this.plasticIndex[this.dir[0]] += this.faceIndex;

    if (sumOfIndex == 2) {
      this.snapType = "rubik";
    } else if (sumOfIndex == 3) {
      this.snapType = 'mirror+';
      this.dir[1] = indexMinusTwo.indexOf(1);
      this.dir[2] = 3 - this.dir[0] - this.dir[1];
      this.auxiliary = ( (this.dir[1] - this.dir[0] + 3) % 3 == 1);
    } else if (sumOfIndex == 4) {
      this.snapType = 'mirrorX';
      this.auxiliary = ((this.index[this.dir[1]] < 2) == (this.index[this.dir[2]] >2));
    } else {
      console.log("new index = "+newIndex);
    }
  }

  this.setRandom = function(type) {

    for(var loop = 0; loop < 100; loop ++) {

      var randIndex = [2,2,2];
      var randIndexMinusTwoAbs = [0,0,0];
      var sumOfIndex = 0;

      // generate random index
      for (var i = 0; i<3; i++) {
        var rand = Math.floor(Math.random()*5) - 2;
        rand = Math.max(-2,Math.min(2, rand));
        randIndex[i] += rand;
        randIndexMinusTwoAbs[i] = Math.abs(rand);
        sumOfIndex += Math.abs(rand);
      }

      // check type
        
        randString = randIndexMinusTwoAbs.sort().toString();
        var randType = "";
        if (randString == "0,0,2") {
          randType = 'rubik';
        } else if (randString == "0,1,2") {
          randType = "mirror+";
        } else if (randString == "1,1,2") {
          randType = "mirrorX";
        } else {
        }

        if ((type == randType) || (type=="full" && randType!="") || (type == "halfturn" && randType =="rubik"))  {
          this.setByFull(randIndex);
          return;
        }
      }
  }

}