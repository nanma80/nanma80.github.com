function Sticker(normal, offset, colorArray, size) {
  this.stickerSize = size;
  this.originalNormal = normal; // must be a normalized vector in an axial direction
  this.offset = offset;
  this.colorArray = colorArray.slice(0);

  this.normal = normal; // will change when puzzle rotates

  var direction111 = new Point3D(1,1,1)
  direction111.normalize();

  var lighting = new Point3D(1,0.4,0.2)
  lighting.normalize();

  // this.spanDirection1 = this.originalNormal.rotate(direction111, Math.PI*2/3);
  // this.spanDirection2 = this.originalNormal.rotate(direction111, -Math.PI*2/3);

  this.spanDirection1 = this.originalNormal.clone();
  this.spanDirection2 = this.originalNormal.clone();
  // this.spanDirection1.rotate(direction111, Math.PI*2/3);
  // this.spanDirection2.rotate(direction111, -Math.PI*2/3);

  setRotationMatrix(direction111, Math.PI*2/3);
  this.spanDirection1.rotate();
  setRotationMatrix(direction111, -Math.PI*2/3);
  this.spanDirection2.rotate();


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

    // compute lighting
    var innerProd = this.normal.innerProd(lighting); // between -1 and 1
    
    var displayColor = this.colorArray.slice(0);
    displayColor = displayColor.map(function(x){return Math.floor(x * (0.8 + innerProd * 0.2 ))  });

    displayColor = displayColor.map(function(x){return Math.max(0,Math.min(255,x))  });

    context.fillStyle = "rgb(" + displayColor[0] + "," + displayColor[1] + "," + displayColor[2] + ")";
    context.beginPath();
    context.moveTo(this.points[0].project().x,this.points[0].project().y);
    for (var i = 1; i<4; i++) {
      context.lineTo(this.points[i].project().x,this.points[i].project().y);
    }
    context.closePath()
    context.fill()
  }

  this.rotate = function(axis, angle) {
    // this.normal = this.normal.rotate(axis, angle);
    // this.offset = this.offset.rotate(axis, angle);
    // this.spanDirection1 = this.spanDirection1.rotate(axis, angle);
    // this.spanDirection2 = this.spanDirection2.rotate(axis, angle);
    // for (var i=0; i<4; i++){
    //   this.points[i] = this.points[i].rotate(axis, angle);
    // }

    // this.normal.rotate(axis, angle);
    // this.offset.rotate(axis, angle);
    // this.spanDirection1.rotate(axis, angle);
    // this.spanDirection2.rotate(axis, angle);
    // for (var i=0; i<4; i++){
    //   this.points[i].rotate(axis, angle);
    // }

    this.normal.rotate();
    this.offset.rotate();
    this.spanDirection1.rotate();
    this.spanDirection2.rotate();
    for (var i=0; i<4; i++){
      this.points[i].rotate();
    }


    this.offset_2d = this.offset.project();
    this.spanDirection1_2d = this.spanDirection1.project_origin();
    this.spanDirection2_2d = this.spanDirection2.project_origin();

  }

  this.drawArrows = function(){

    var arrow_vectors = [this.spanDirection1_2d, this.spanDirection2_2d];

    var theta = 0.5 * Math.atan( (2 * arrow_vectors[0].x *arrow_vectors[1].x + 2 * arrow_vectors[0].y *arrow_vectors[1].y)/
      (arrow_vectors[0].x * arrow_vectors[0].x + arrow_vectors[0].y*arrow_vectors[0].y -arrow_vectors[1].x * arrow_vectors[1].x - arrow_vectors[1].y*arrow_vectors[1].y)
       );
    
    var shortAxis = new Point2D(arrow_vectors[0].x * Math.cos(theta) + arrow_vectors[1].x * Math.sin(theta), 
                               arrow_vectors[0].y * Math.cos(theta) + arrow_vectors[1].y * Math.sin(theta));

    var longAxis = new Point2D(arrow_vectors[0].x * Math.cos(theta + Math.PI/2) + arrow_vectors[1].x * Math.sin(theta + Math.PI/2), 
                                arrow_vectors[0].y * Math.cos(theta + Math.PI/2) + arrow_vectors[1].y * Math.sin(theta + Math.PI/2));

    var angle = Math.atan(longAxis.y/longAxis.x);

    // draw oval
    var px = this.offset_2d.x;
    var py = this.offset_2d.y;
    var radiusx = longAxis.norm * 0.02;
    var radiusy = shortAxis.norm * 0.02;

    context.strokeStyle = "rgb(" + puzzle.colorArray[9][0] + "," + puzzle.colorArray[9][1] + "," + puzzle.colorArray[9][2] + ")";
    context.lineWidth=3;

    context.save();
    context.translate(px,py);
    context.rotate(angle);
    context.scale(radiusx, radiusy);
    
    context.beginPath();
    context.arc(0, 0, viewWidth * 0.025, 0, Math.PI*2, false);
    context.stroke();
    context.closePath();
    context.restore();
    
  }

  this.contains = function() {

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
    
    return (Math.abs(k1)<this.stickerSize/2.0 && Math.abs(k2)<this.stickerSize/2.0);
  }
}
