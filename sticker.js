function Sticker(normal, offset, colorArray, size) {
  this.stickerSize = size;
  this.originalNormal = normal; // must be a normalized vector in an axial direction
  this.offset = offset;
  this.colorArray = colorArray;

  this.normal = normal; // will change when puzzle rotates

  var direction111 = new Point3D(1,1,1)
  direction111.normalize();

  this.spanDirection1 = this.originalNormal.rotate(direction111, Math.PI*2/3);
  this.spanDirection2 = this.originalNormal.rotate(direction111, -Math.PI*2/3);

  this.offset_2d = this.offset.project();
  this.spanDirection1_2d = this.spanDirection1.project_origin();
  this.spanDirection2_2d = this.spanDirection2.project_origin();

  this.points = new Array();

  var coef = [1,1];
  this.points.push(new Point3D(
    this.offset.x + coef[0] * this.spanDirection1.x * this.stickerSize /2 + coef[1] * this.spanDirection2.x * this.stickerSize /2, 
    this.offset.y + coef[0] * this.spanDirection1.y * this.stickerSize /2 + coef[1] * this.spanDirection2.y * this.stickerSize /2, 
    this.offset.z + coef[0] * this.spanDirection1.z * this.stickerSize /2 + coef[1] * this.spanDirection2.z * this.stickerSize /2))
  coef = [1,-1];
  this.points.push(new Point3D(
    this.offset.x + coef[0] * this.spanDirection1.x * this.stickerSize /2 + coef[1] * this.spanDirection2.x * this.stickerSize /2, 
    this.offset.y + coef[0] * this.spanDirection1.y * this.stickerSize /2 + coef[1] * this.spanDirection2.y * this.stickerSize /2, 
    this.offset.z + coef[0] * this.spanDirection1.z * this.stickerSize /2 + coef[1] * this.spanDirection2.z * this.stickerSize /2))
  coef = [-1,-1];
  this.points.push(new Point3D(
    this.offset.x + coef[0] * this.spanDirection1.x * this.stickerSize /2 + coef[1] * this.spanDirection2.x * this.stickerSize /2, 
    this.offset.y + coef[0] * this.spanDirection1.y * this.stickerSize /2 + coef[1] * this.spanDirection2.y * this.stickerSize /2, 
    this.offset.z + coef[0] * this.spanDirection1.z * this.stickerSize /2 + coef[1] * this.spanDirection2.z * this.stickerSize /2))
  coef = [-1,1];
  this.points.push(new Point3D(
    this.offset.x + coef[0] * this.spanDirection1.x * this.stickerSize /2 + coef[1] * this.spanDirection2.x * this.stickerSize /2, 
    this.offset.y + coef[0] * this.spanDirection1.y * this.stickerSize /2 + coef[1] * this.spanDirection2.y * this.stickerSize /2, 
    this.offset.z + coef[0] * this.spanDirection1.z * this.stickerSize /2 + coef[1] * this.spanDirection2.z * this.stickerSize /2))

  this.draw = function() {
    if (this.normal.x < 0) return;

    context.fillStyle = "rgb(" + this.colorArray[0] + "," + this.colorArray[1] + "," + this.colorArray[2] + ")";
    context.beginPath();
    context.moveTo(this.points[0].project().x,this.points[0].project().y);
    for (var i = 1; i<4; i++) {
      context.lineTo(this.points[i].project().x,this.points[i].project().y);
    }
    context.closePath()
    context.fill()
  }

  this.rotate = function(axis, angle) {
    this.normal = this.normal.rotate(axis, angle);
    this.offset = this.offset.rotate(axis, angle);
    this.spanDirection1 = this.spanDirection1.rotate(axis, angle);
    this.spanDirection2 = this.spanDirection2.rotate(axis, angle);
    for (var i=0; i<4; i++){
      this.points[i] = this.points[i].rotate(axis, angle);
    }
    this.offset_2d = this.offset.project();
    this.spanDirection1_2d = this.spanDirection1.project_origin();
    this.spanDirection2_2d = this.spanDirection2.project_origin();

  }

  this.contains = function(type) {

    if (this.normal.x < 0) return false;

    var mx = mousePos.x - this.offset_2d.x;
    var my = mousePos.y - this.offset_2d.y;
    var d1x = this.spanDirection1_2d.x;
    var d1y = this.spanDirection1_2d.y;
    var d2x = this.spanDirection2_2d.x;
    var d2y = this.spanDirection2_2d.y;

    // going to solve: d1 k1 + d2 k2 = m

    var delta = (d1x * d2y - d1y * d2x)
    if (Math.abs(delta)<0.001) return false; //bad direction
    
    var k1 = (d2y*mx-d2x*my)/delta;
    var k2 = (d1x*my-d1y*mx)/delta;
    
    if ((Math.abs(k1)<this.stickerSize/2.0 && Math.abs(k2)<this.stickerSize/2.0) == false) return false; // mouse not in this face
    
    if (type == 'rubik') return true; // for rubik's cube, nothing else to handle

    var l1 = (k1 + k2);
    var l2 = (k1 - k2);

    if (type == 'mirror+') {
      
      var perp_direction = 2;

      if ((l1 > 0) == (l2 > 0))
        perp_direction = 1;

      return perp_direction;
    }

    if (type == 'mirrorX') {
      var perp_direction = 1;

      if ((k1 > 0) == (k2 > 0))
        perp_direction = 2;

      return perp_direction;
    }

    console.log("Type "+type + " is not supported.");

  }

}