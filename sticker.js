function Sticker(normal, offset, colorArray) {
  this.stickerSize = 0.95;
  this.originalNormal = normal; // must be a normalized vector in an axial direction
  this.offset = offset;
  this.color = "rgb(" + colorArray[0] + "," + colorArray[1] + "," + colorArray[2] + ")"
  

  this.normal = normal; // will change when puzzle rotates

  var direction111 = new Point3D(1,1,1)
  direction111.normalize

  this.spanDirection1 = this.originalNormal.rotate(direction111, Math.PI*2/3);
  this.spanDirection2 = this.originalNormal.rotate(direction111, -Math.PI*2/3);

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

  this.draw = function(context, viewWidth,viewHeight) {
    if (this.normal.z < 0.1) return;


    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.points[0].project(viewWidth,viewHeight).x,this.points[0].project(viewWidth,viewHeight).y);
    for (var i = 1; i<4; i++) {
      context.lineTo(this.points[i].project(viewWidth,viewHeight).x,this.points[i].project(viewWidth,viewHeight).y);
    }
    context.closePath()
    context.fill()
  }

  this.rotate = function(axis, angle) {
    this.normal = this.normal.rotate(axis, angle);
    for (var i=0; i<4; i++){
      this.points[i] = this.points[i].rotate(axis, angle);
    }
  }
}