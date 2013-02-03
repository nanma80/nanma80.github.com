function Puzzle() {
  this.order = 0; // default order


  this.setOrder = function(order) {
    this.order = order;
  }

  this.resetState = function() {
    var numberOfTypes = [0,1,2,4,6,8,13];
    createCanvas(numberOfTypes[this.order]);
  }

}