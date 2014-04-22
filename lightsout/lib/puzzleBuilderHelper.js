var PHI = (Math.sqrt(5) + 1.0) / 2.0;
var EPSILON = 0.00000000001;

getAxes = function(shape) {
  var axes = [];

  if (shape == 'face first dodecahedron') {
    axes.push(new Point3D(0, 1, PHI));
    axes.push(new Point3D(0, 1, - PHI));
    axes.push(new Point3D(0, - 1, PHI));
    axes.push(new Point3D(0, - 1, - PHI));

    axes.push(new Point3D(1, PHI, 0));
    axes.push(new Point3D(1, - PHI, 0));
    axes.push(new Point3D(- 1, PHI, 0));
    axes.push(new Point3D(- 1, - PHI, 0));

    axes.push(new Point3D(PHI, 0, 1));
    axes.push(new Point3D(- PHI, 0, 1));
    axes.push(new Point3D(PHI, 0, - 1));
    axes.push(new Point3D(- PHI, 0, - 1));
  } else if (shape == 'edge first dodecahedron') {
    axes = getVertices('face first dodecahedron');
  }



  axes.forEach(function(axis){
    axis.normalize();
  });

  return axes
}

getVertices = function(shape) {
  var vertices = [];
  var axes = getAxes(shape);

  for(var i = 0; i < axes.length; i++ ) {
    for(var j = i + 1; j < axes.length; j++ ) {
      var innerProduct = axes[i].innerProd(axes[j]);
      if (Math.abs(innerProduct) < 1 - EPSILON) {
        var outerProduct = axes[i].outerProd(axes[j]);
        outerProduct.normalize();
        vertices.push(outerProduct);
        vertices.push(outerProduct.reverse());
      }
    }
  }
  return dedupOnInnerProd(vertices);
}
