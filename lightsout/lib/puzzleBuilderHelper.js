var PHI = (Math.sqrt(5) + 1.0) / 2.0;
var EPSILON = 0.00000000001;

getVertices = function(shape) {
  if (shape === 'face first dodecahedron' || 
      shape === 'edge first dodecahedron' || 
      shape === 'vertex first dodecahedron' || 
      shape === 'face vertex first dodecahedron' ||
      shape === 'face first cube' || 
      shape === 'edge first cube' || 
      shape === 'vertex first cube') {
    return getIntersections(getAxes(shape));
  } else if (shape === 'cuboctahedron') {
    return getIntersections(getAxes('vertex first cube'));
  } else if (shape === 'icosidodecahedron') {
    return getIntersections(getAxes('face first dodecahedron'));
  } else if (shape === 'dodecahedron') {
    return getAxes('vertex first dodecahedron');
  } else if (shape === 'icosahedron') {
    return getAxes('face first dodecahedron');
  } else if (shape === 'cube') {
    return getAxes('vertex first cube');
  } else if (shape === 'octahedron') {
    return getAxes('face first cube');
  } else if (shape === 'soccer ball') {
    return getSoccerVertices();
  } else if (shape === 'rhombic dodecahedron') {
    var output = [];
    var cubeVertices = getAxes('vertex first cube');
    var cubeFaces = getAxes('face first cube');
    var vertexUnit = cubeVertices[0].x;
    for (var i = 0; i < cubeVertices.length; i++) {
      output.push(cubeVertices[i].scale(1.0/2.0/vertexUnit));
    };
    output = output.concat(cubeFaces);
    return output;
  } else if (shape === 'rhombic triacontahedron') {
    var output = [];
    var dodecahedronVertices = getAxes('vertex first dodecahedron');
    var dodecahedronFaces = getAxes('face first dodecahedron');

    var p0 = dodecahedronVertices[0];
    var p10 = dodecahedronVertices[10];
    var n1 = new Point3D(p0.x + p10.x, p0.y + p10.y, p0.z + p10.z).norm();
    var p22 = dodecahedronFaces[22-dodecahedronVertices.length];
    var p25 = dodecahedronFaces[25-dodecahedronVertices.length];
    var n2 = new Point3D(p22.x + p25.x, p22.y + p25.y, p22.z + p25.z).norm();

    var vertexUnit = dodecahedronVertices[0].norm();
    for (var i = 0; i < dodecahedronVertices.length; i++) {
      output.push(dodecahedronVertices[i].scale(n2/n1/vertexUnit));
    };
    output = output.concat(dodecahedronFaces);
    return output;
  } else {
    return [];
  }
}

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
    axes = getIntersections(getAxes('face first dodecahedron'));
  } else if (shape === 'vertex first dodecahedron') {
    var points = getPoints('dodecahedron');
    axes = points[2];
  } else if (shape === 'face vertex first dodecahedron') {
    axes = axes.concat(getAxes('face first dodecahedron'));
    axes = axes.concat(getAxes('vertex first dodecahedron'));
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
    axes = getIntersections(getAxes('vertex first cube'));
  }

  axes.forEach(function(axis){
    axis.normalize();
  });

  return axes
}

getIntersections = function(axes) {
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


getPuzzleProperty = function(id, key) {
  for (var i = 0; i < puzzleConfig.puzzles.length; i++) {
    if (puzzleConfig.puzzles[i].id === id) return puzzleConfig.puzzles[i][key];
  };
}

getPrototypeStickers = function(shape) {
  return getPuzzleProperty(shape, 'prototypeStickers');
}

getSymmetry = function(shape) {
  return getPuzzleProperty(shape, 'symmetry');
}

// loadPuzzles = function(puzzleConfig) {
//   puzzles = puzzleConfig.puzzles;
// }

// getPrototypeStickersOld = function(shape) {
//   if (shape === 'face first dodecahedron') {
//     return [[1, 13, 27, 22, 3], [1, 4, 13]];
//   } else if (shape === 'icosidodecahedron') {
//     return [[1, 13, 27, 22, 3], [1, 4, 13]];
//   } else if (shape === 'edge first dodecahedron') {
//     return [[1, 20, 8]];
//   } else if (shape === 'vertex first dodecahedron') {
//     return [[7, 22, 25, 74, 14], [0, 22, 7], [46, 37, 88], [37, 78, 88]];
//   } else if (shape === 'face vertex first dodecahedron') {
//     return [[67, 44, 42, 31, 35], [1, 31, 42], [1, 42, 3], [1, 3, 10]];
//   } else if (shape === 'face first cube') {
//     return [[0, 2, 4]];
//   } else if (shape === 'edge first cube') {
//     return [[1, 5, 7]];
//   } else if (shape === 'vertex first cube') {
//     return [[1, 2, 10, 9], [7, 9, 10]];
//   } else if (shape === 'cuboctahedron') {
//     return [[1, 2, 10, 9], [7, 9, 10]];
//   } else if (shape === 'dodecahedron') {
//     return [[1, 11, 15, 12, 2]];
//   } else if (shape === 'icosahedron') {
//     return [[0, 4, 6]];
//   } else if (shape === 'cube') {
//     return [[0, 1, 5, 4]];
//   } else if (shape === 'octahedron') {
//     return [[0, 2, 4]];
//   } else if (shape === 'soccer ball') {
//     return [[2, 5, 8, 24, 21], [2, 21, 23, 52, 50, 33]];
//   } else if (shape === 'rhombic dodecahedron') {
//     return [[0, 8, 1, 10]];
//   } else if (shape === 'rhombic triacontahedron') {
//     return [[2, 20, 16, 24]];
//   } else {
//     return [];
//   }
// }

// getSymmetryOld = function(shape) {
//   if (shape === 'face first dodecahedron' || 
//       shape === 'edge first dodecahedron' || 
//       shape === 'vertex first dodecahedron' || 
//       shape === 'face vertex first dodecahedron' ||
//       shape === 'icosidodecahedron' ||
//       shape === 'soccer ball' ||
//       shape === 'dodecahedron' ||
//       shape === 'icosahedron' ||
//       shape === 'rhombic triacontahedron') {
//     return 'dodecahedron';
//   } else if (
//     shape === 'face first cube' || 
//     shape === 'edge first cube' || 
//     shape === 'vertex first cube' ||
//     shape === 'cube' ||
//     shape === 'cuboctahedron' ||
//     shape === 'octahedron' ||
//     shape === 'rhombic dodecahedron') {
//     return 'cube';
//   }
// }

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

getPoints = function(symmetry) {
  var output = []
  if (symmetry === 'dodecahedron') {
    var symmetry_faces = getAxes('face first dodecahedron');

    var symmetry_edges = getIntersections(symmetry_faces);
    var dodecahedron_all = getIntersections(symmetry_edges);

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

getSoccerVertices = function() {
  var output = [];
  output.push(new Point3D(0, 1, 3 * PHI));
  output.push(new Point3D(1, 3 * PHI, 0));
  output.push(new Point3D(3 * PHI, 0, 1));
  output.push(new Point3D(2, 1 + 2 * PHI, PHI));
  output.push(new Point3D(PHI, 2, 1 + 2 * PHI));
  output.push(new Point3D(1 + 2 * PHI, PHI, 2));
  output.push(new Point3D(1, 2 + PHI, 2 * PHI));
  output.push(new Point3D(2 + PHI, 2 * PHI, 1));
  output.push(new Point3D(2 * PHI, 1, 2 + PHI));

  output = output.concat(output.map(function(p) {
    return new Point3D(-p.x, p.y, p.z);
  }))

  output = output.concat(output.map(function(p) {
    return new Point3D(p.x, -p.y, p.z);
  }))

  output = output.concat(output.map(function(p) {
    return new Point3D(p.x, p.y, -p.z);
  }))

  output.forEach(function(point){
    point.normalize();
  });

  return dedupOnInnerProd(output);
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
