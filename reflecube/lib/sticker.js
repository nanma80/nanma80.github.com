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

  if (this.normal.x + this.normal.y + this.normal.z < 0 ) this.points.reverse();

  this.draw = function() {
    // if (this.normal.z < 0.09) return;
    if (area(this.points[0].project(), this.points[1].project(), this.points[2].project()) < 0 ) return;

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
    if (snap.snapType == 'mirror+') {
      var arrowDirection = snap.auxiliary ? 0 : 1;

      // var arrow_vectors = [this.spanDirection1_2d, this.spanDirection2_2d];
      var arrow_vectors_3D = [this.spanDirection1, this.spanDirection2];

      context.strokeStyle = "rgb(" + puzzle.colorArray[9][0] + "," + puzzle.colorArray[9][1] + "," + puzzle.colorArray[9][2] + ")";
      context.lineWidth=3;
      context.beginPath();

      var coef, px, py;

      var arrowLong = 0.46;
      var arrowShort = 1.0/6.0;
      var arrowHeadLong = 0.07;
      var arrowHeadShort = 0.02;

      plotPoint = new Point3D(0,0,0);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong), this.stickerSize * (arrowShort + arrowHeadShort)];
      // px = this.offset_2d.x + coef[0] * arrow_vectors[arrowDirection].x + coef[1] * arrow_vectors[1-arrowDirection].x;
      // py = this.offset_2d.y + coef[0] * arrow_vectors[arrowDirection].y + coef[1] * arrow_vectors[1-arrowDirection].y;
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();

      context.moveTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong), this.stickerSize * (arrowShort - arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      arrowLong *= -1;
      arrowHeadLong *= -1;

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong), this.stickerSize * (arrowShort + arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong), this.stickerSize * (arrowShort - arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      arrowShort *= -1;
      arrowLong *= -1;
      arrowHeadLong *= -1;

      coef = [this.stickerSize * (arrowLong - arrowHeadLong), this.stickerSize * (arrowShort + arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.moveTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong), this.stickerSize * (arrowShort - arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      arrowLong *= -1;
      arrowHeadLong *= -1;

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong), this.stickerSize * (arrowShort + arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong), this.stickerSize * (arrowShort - arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      context.lineTo(plotPoint2D.x,plotPoint2D.y);
      context.stroke();


      initDashing(context) ;
      context.dashStyle = [10,5,2,5] ;
      context.beginPath();
      
      var axisLength = 0.45;

      coef = [this.stickerSize * (0), this.stickerSize * (axisLength)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      p1x = plotPoint2D.x;
      p1y = plotPoint2D.y;

      
      coef = [this.stickerSize * (0), this.stickerSize * (- axisLength)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      p2x = plotPoint2D.x;
      p2y = plotPoint2D.y;

      context.dashedLine(p1x,p1y,p2x,p2y) ;

      context.closePath();
      context.stroke();



    } else if (snap.snapType == 'mirrorX') {

      var arrowDirection = (snap.auxiliary==invertMirrorX) ? 0 : 1;
      
      var arrow_vectors = [new Point2D(this.spanDirection1_2d.x,this.spanDirection1_2d.y), 
      new Point2D(this.spanDirection2_2d.x * (arrowDirection *2 -1),this.spanDirection2_2d.y * (arrowDirection *2 -1))];

      var arrow_vectors_3D = [this.spanDirection1,
      new Point3D(this.spanDirection2.x * (arrowDirection *2 -1),
                  this.spanDirection2.y * (arrowDirection *2 -1),
                  this.spanDirection2.z * (arrowDirection *2 -1))];

      context.strokeStyle = "rgb(" + puzzle.colorArray[9][0] + "," + puzzle.colorArray[9][1] + "," + puzzle.colorArray[9][2] + ")";
      context.lineWidth=3;
      context.beginPath();

      var coef, px, py;

      var arrowLong = 0.39;
      var arrowShort = -0.06;
      var arrowHeadLong = 0.05;
      var arrowHeadShort = 0.013;
      var plotPoint = new Point3D(0,0,0);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong - arrowHeadShort), this.stickerSize * (arrowShort + arrowHeadLong - arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.moveTo(px,py);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong + arrowHeadShort), this.stickerSize * (arrowShort + arrowHeadLong + arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      var t = arrowLong;
      arrowLong = arrowShort;
      arrowShort = t;
      arrowHeadLong *=-1;
      arrowHeadShort*=-1;

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong + arrowHeadShort), this.stickerSize * (arrowShort + arrowHeadLong + arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong - arrowHeadShort), this.stickerSize * (arrowShort + arrowHeadLong - arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      t = arrowLong;
      arrowLong = arrowShort;
      arrowShort = t;

      arrowLong *= -1;
      arrowShort *= -1;
      
      coef = [this.stickerSize * (arrowLong - arrowHeadLong - arrowHeadShort), this.stickerSize * (arrowShort + arrowHeadLong - arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.moveTo(px,py);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong + arrowHeadShort), this.stickerSize * (arrowShort + arrowHeadLong + arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      var t = arrowLong;
      arrowLong = arrowShort;
      arrowShort = t;
      arrowHeadLong *=-1;
      arrowHeadShort*=-1;

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong + arrowHeadShort), this.stickerSize * (arrowShort + arrowHeadLong + arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      coef = [this.stickerSize * (arrowLong), this.stickerSize * (arrowShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);

      coef = [this.stickerSize * (arrowLong - arrowHeadLong - arrowHeadShort), this.stickerSize * (arrowShort + arrowHeadLong - arrowHeadShort)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      px = plotPoint2D.x;
      py = plotPoint2D.y;
      context.lineTo(px,py);
      context.stroke();


      initDashing(context) ;
      context.dashStyle = [10,5,2,5] ;
      context.beginPath();
      
      var axisLength = 0.35;

      coef = [this.stickerSize * (-axisLength), this.stickerSize * (-axisLength)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      p1x = plotPoint2D.x;
      p1y = plotPoint2D.y;
      
      coef = [this.stickerSize * (axisLength), this.stickerSize * (axisLength)];
      plotPoint.x = this.offset.x + coef[0] * arrow_vectors_3D[arrowDirection].x + coef[1] * arrow_vectors_3D[1-arrowDirection].x;
      plotPoint.y = this.offset.y + coef[0] * arrow_vectors_3D[arrowDirection].y + coef[1] * arrow_vectors_3D[1-arrowDirection].y;
      plotPoint.z = this.offset.z + coef[0] * arrow_vectors_3D[arrowDirection].z + coef[1] * arrow_vectors_3D[1-arrowDirection].z;
      plotPoint2D = plotPoint.project();
      p2x = plotPoint2D.x;
      p2y = plotPoint2D.y;

      context.dashedLine(p1x,p1y,p2x,p2y) ;

      context.closePath();
      context.stroke();

    } else if (snap.snapType == 'rubik') {

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
  }

  this.contains = function(type) {

    // if (this.normal.z < 0.09) return false;

    for(var index = 0; index < 4; index++) {
      if (area(this.points[index].project(), this.points[(index+1) % 4].project(), mousePos) < 0 ) 
        return false;
    }

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
    
    // if ((Math.abs(k1)<this.stickerSize/2.0 && Math.abs(k2)<this.stickerSize/2.0) == false) return false; // mouse not in this face
    
    if (type == 'rubik' || type == 'halfturn') return true; // for rubik's cube, nothing else to handle

    var l1 = (k1 + k2);
    var l2 = (k1 - k2);

    if (type == 'mirror+') {

      if ((l1 > 0) == (l2 > 0)) return 1;
      else return 2;
    }

    if (type == 'mirrorX') {
      if ((k1 > 0) == (k2 > 0)) return 2;
      else return 1;
    }

    console.log("Type "+type + " is not supported.");

  }

}



// http://semanticvector.blogspot.com/2011/08/dashed-lines-in-html5-canvas.html

var initDashing = function(ctx) {
 if (!ctx.dashLine) {
  ctx.dashStyle=[3,2] ;
  ctx.dashedLine = function(x1,y1,x2,y2) {
   var dashStyle = ctx.dashStyle,
    dashCount = dashStyle.length,
    sign = x2>=x1 ? 1 : -1,
       dx = x2-x1,
       dy = y2-y1,
       m = dy/dx,
       xsteps = dashStyle.map(function(len){return sign*Math.sqrt((len*len)/(1 + (m*m)));}),
       dRem =  Math.sqrt( dx*dx + dy*dy ),
       dIndex=0,
       draw=true;
   this.moveTo(x1,y1) ;
   while (dRem>=0.1){
         var dLen = dashStyle[dIndex],
             xStep = xsteps[dIndex];
         if (dLen > dRem) {
          xStep =  Math.sqrt(dRem*dRem/(1+m*m));
         }
         x1 += xStep ;
         y1 += m*xStep;
         this[draw ? 'lineTo' : 'moveTo'](x1,y1);
         dRem -= dLen;
         draw = !draw;
         dIndex = (dIndex+1) % dashCount ;
   }
  };
 };
};