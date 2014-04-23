var PHI = (Math.sqrt(5) + 1.0) / 2.0;
var EPSILON = 0.00000000001;

getAxes = function(shape) {
  var axes = [];

  if (shape === 'face first dodecahedron') {
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
  } else if (shape === 'edge first dodecahedron') {
    axes = getVertices(getAxes('face first dodecahedron'));
  }

  axes.forEach(function(axis){
    axis.normalize();
  });

  return axes
}

getVertices = function(axes) {
  var vertices = [];

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

getPrototypeStickers = function(shape) {
  if (shape === 'face first dodecahedron') {
    return [[1, 13, 27, 22, 3], [1, 4, 13]];
  } else if (shape === 'edge first dodecahedron') {
    return [[1, 20, 8]];
  }
}

getSymmetry = function(shape) {
  if (shape === 'face first dodecahedron' || shape === 'edge first dodecahedron') {
    return 'dodecahedron';
  }
}

dedupStickers = function(arr) {
  arr.sort(function(a, b) {
    return a.signature > b.signature ? 1 : -1;
  });

  var currentSignature = '';
  var deduped = [];
  for(var i = 0; i < arr.length; i++) {
    if (arr[i].signature !== currentSignature) {
      deduped.push(arr[i]);
    }
    currentSignature = arr[i].signature;
  }

  return deduped;
}

getAxesScale = function(shape) {
  if (shape === 'face first dodecahedron') {
    return 0.85;
  } else if (shape === 'edge first dodecahedron') {
    return 1.0;
  }
}

populateStickers = function(vertices, prototypeSticker, symmetry) {
  var stickers = [];

  stickers.push(new Sticker(vertices, prototypeSticker));

  for(var i = 0; i < dodecahedron_faces.length; i++) {
    var rotationImage = prototypeSticker.map(function(j) {
      setRotationMatrix(dodecahedron_faces[i], Math.PI * 2.0 / 5.0);
      var newVertex = vertices[j].clone();
      newVertex.rotate();
      return newVertex.indexIn(vertices);
    });
    stickers.push(new Sticker(vertices, rotationImage));

    var rotationImage2 = prototypeSticker.map(function(j) {
      setRotationMatrix(dodecahedron_faces[i], Math.PI * 4.0 / 5.0);
      var newVertex = vertices[j].clone();
      newVertex.rotate();
      return newVertex.indexIn(vertices);
    });
    stickers.push(new Sticker(vertices, rotationImage2));
  }

  for(var i = 0; i < dodecahedron_vertices.length; i++) {
    var rotationImage = prototypeSticker.map(function(j) {
      setRotationMatrix(dodecahedron_vertices[i], Math.PI * 2.0 / 3.0);
      var newVertex = vertices[j].clone();
      newVertex.rotate();
      return newVertex.indexIn(vertices);
    });
    stickers.push(new Sticker(vertices, rotationImage));
  }

  for(var i = 0; i < dodecahedron_edges.length; i++) {
    var edge = dodecahedron_edges[i];
    if (edge.x * 243 + edge.y * 19 + edge.z > 0) continue;

    var rotationImage = prototypeSticker.map(function(j) {
      setRotationMatrix(dodecahedron_edges[i], Math.PI);
      var newVertex = vertices[j].clone();
      newVertex.rotate();
      return newVertex.indexIn(vertices);
    });
    stickers.push(new Sticker(vertices, rotationImage));
  }

  var mirrorStickers = stickers.map(function(sticker) {
    var image = sticker.indices.map(function(i) {
      return vertices[i].reverse().indexIn(vertices);
    });
    return new Sticker(vertices, image.reverse());
  })
    
  stickers = stickers.concat(mirrorStickers);

  return dedupStickers(stickers);
}

var dodecahedron_faces = getAxes('face first dodecahedron');
var dodecahedron_edges = getVertices(dodecahedron_faces);
var dodecahedron_all = getVertices(dodecahedron_edges);
var dodecahedron_vertices = [];
for(var i = 0; i < dodecahedron_all.length; i++) {
  if (dodecahedron_all[i].indexIn(dodecahedron_faces) < 0 
    && dodecahedron_all[i].indexIn(dodecahedron_edges) < 0) {
    dodecahedron_vertices.push(dodecahedron_all[i]);
  }
}
