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
  } else if (shape === 'vertex first dodecahedron') {
    var points = getPoints('dodecahedron');
    axes = points[2];
  } else if (shape === 'face first cube') {
    axes.push(new Point3D(1, 0, 0));
    axes.push(new Point3D(-1, 0, 0));
    axes.push(new Point3D(0, 1, 0));
    axes.push(new Point3D(0, -1, 0));
    axes.push(new Point3D(0, 0, 1));
    axes.push(new Point3D(0, 0, -1));
  } else if (shape === 'vertex first cube') {
    axes.push(new Point3D(1, 1, 1));
    axes.push(new Point3D(1, 1, -1));
    axes.push(new Point3D(1, -1, 1));
    axes.push(new Point3D(1, -1, -1));
    axes.push(new Point3D(-1, 1, 1));
    axes.push(new Point3D(-1, 1, -1));
    axes.push(new Point3D(-1, -1, 1));
    axes.push(new Point3D(-1, -1, -1));
  } else if (shape === 'edge first cube') {
    axes = getVertices(getAxes('vertex first cube'));
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
  } else if (shape === 'vertex first dodecahedron') {
    return [[7, 22, 25, 74, 14], [0, 22, 7], [46, 37, 88], [37, 78, 88]];
  } else if (shape === 'face first cube') {
    return [[0, 2, 4]];
  } else if (shape === 'edge first cube') {
    return [[1, 5, 7]];
  } else if (shape === 'vertex first cube') {
    return [[1, 2, 10, 9], [7, 9, 10]];
  } else {
    return [];
  }
}

getSymmetry = function(shape) {
  if (shape === 'face first dodecahedron' || shape === 'edge first dodecahedron' || shape === 'vertex first dodecahedron') {
    return 'dodecahedron';
  } else if (shape === 'face first cube' || shape === 'edge first cube' || shape === 'vertex first cube') {
    return 'cube';
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
  } else if (shape === 'vertex first dodecahedron') {
    return 0.94;
  } else if (shape === 'face first cube') {
    return 1.0;
  } else if (shape === 'edge first cube') {
    return 0.835;
  } else if (shape === 'vertex first cube') {
    return 0.83;
  } else {
    return 1.0;
  }
}

getPoints = function(symmetry) {
  var output = []
  if (symmetry === 'dodecahedron') {
    var symmetry_faces = getAxes('face first dodecahedron');
    var symmetry_edges = getVertices(symmetry_faces);
    var dodecahedron_all = getVertices(symmetry_edges);
    var symmetry_vertices = [];
    for(var i = 0; i < dodecahedron_all.length; i++) {
      if (dodecahedron_all[i].indexIn(symmetry_faces) < 0 
        && dodecahedron_all[i].indexIn(symmetry_edges) < 0) {
        symmetry_vertices.push(dodecahedron_all[i]);
      }
    }
    output.push(symmetry_faces);
    output.push(symmetry_edges);
    output.push(symmetry_vertices);
  } else if (symmetry === 'cube') {
    var cube_faces = getAxes('face first cube');
    var cube_edges = getAxes('edge first cube');
    var cube_vertices = getAxes('vertex first cube');
    output.push(cube_faces);
    output.push(cube_edges);
    output.push(cube_vertices);
  }
  return output;
}

populateStickers = function(vertices, prototypeSticker, symmetry) {
  var points = getPoints(symmetry);

  var stickers = [];

  stickers.push(new Sticker(vertices, prototypeSticker));

  symmetry_faces = points[0];
  symmetry_edges = points[1];
  symmetry_vertices = points[2];

  face_degree = Math.PI / 2.0;
  if (symmetry === 'dodecahedron') face_degree = Math.PI * 2.0 / 5.0;

  for(var i = 0; i < symmetry_faces.length; i++) {
    var rotationImage = prototypeSticker.map(function(j) {
      setRotationMatrix(symmetry_faces[i], face_degree);
      var newVertex = vertices[j].clone();
      newVertex.rotate();
      return newVertex.indexIn(vertices);
    });
    stickers.push(new Sticker(vertices, rotationImage));

    var rotationImage2 = prototypeSticker.map(function(j) {
      setRotationMatrix(symmetry_faces[i], face_degree * 2);
      var newVertex = vertices[j].clone();
      newVertex.rotate();
      return newVertex.indexIn(vertices);
    });
    stickers.push(new Sticker(vertices, rotationImage2));
  }

  for(var i = 0; i < symmetry_vertices.length; i++) {
    var rotationImage3 = prototypeSticker.map(function(j) {
      setRotationMatrix(symmetry_vertices[i], Math.PI * 2.0 / 3.0);
      var newVertex = vertices[j].clone();
      newVertex.rotate();
      return newVertex.indexIn(vertices);
    });
    stickers.push(new Sticker(vertices, rotationImage3));
  }

  for(var i = 0; i < symmetry_edges.length; i++) {
    var edge = symmetry_edges[i];
    if (edge.x * 243 + edge.y * 19 + edge.z > 0) continue;

    var rotationImage = prototypeSticker.map(function(j) {
      setRotationMatrix(symmetry_edges[i], Math.PI);
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

