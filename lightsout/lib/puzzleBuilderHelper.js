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
  } else if (shape === 'soccer_ball') {
    return getSoccerVertices();
  } else if (shape === 'truncated_octahedron') {
    return getTruncatedOctahedronVertices();
  } else if (shape === 'great_rhombicuboctahedron') {
    return getGRCOVertices();
  } else if (shape === 'snub_cube') {
    return getSnubCubeVertices();
  } else if (shape === 'snub_dodecahedron') {
    return getSnubDodecahedronVertices();
  } else if (shape === 'great_rhombicosidodecahedron') {
    var output = [];
    output = output.concat(allPlusMinus(allPermutations(new Point3D(1, 1, 4 * PHI + 1))));
    output = output.concat(allPlusMinus(evenPermutations(new Point3D(PHI * PHI * PHI, 1, 3 + 2 * PHI))));
    output = output.concat(allPlusMinus(evenPermutations(new Point3D(PHI * PHI, 2, PHI * PHI * PHI * PHI))));
    output = output.concat(allPlusMinus(evenPermutations(new Point3D(3 * PHI, PHI * PHI, 2 * PHI * PHI))));
    output = output.concat(allPlusMinus(evenPermutations(new Point3D(1 + 3 * PHI, 2 * PHI, 2 + PHI))));
    return output;
  } else if (shape === 'rhombicosidodecahedron') {
    var output = [];
    output = output.concat(allPlusMinus(allPermutations(new Point3D(1, 1, PHI * PHI * PHI))));
    output = output.concat(allPlusMinus(evenPermutations(new Point3D(PHI * PHI, 0, PHI * Math.sqrt(5)))));
    output = output.concat(allPlusMinus(evenPermutations(new Point3D(2 * PHI, PHI, PHI * PHI))));
    return output;
  } else if (shape === 'rhombicuboctahedron') {
    return allPlusMinus(allPermutations(new Point3D(1, 1, 1 + Math.sqrt(2))));
  } else if (shape === 'rhombic_dodecahedron') {
    var output = [];
    var cubeVertices = getAxes('vertex first cube');
    var cubeFaces = getAxes('face first cube');
    var vertexUnit = cubeVertices[0].x;
    for (var i = 0; i < cubeVertices.length; i++) {
      output.push(cubeVertices[i].scale(1.0/2.0/vertexUnit));
    };
    output = output.concat(cubeFaces);
    return output;
  } else if (shape === 'rhombic_triacontahedron') {
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

dedupStickers = function(arr) {
  arr.sort(function(a, b) {
    return a.signature > b.signature ? 1 : -1;
  });

  var currentSignature = '';
  var deduped = [];
  arr.forEach(function(s) {
    if (s.signature !== currentSignature) {
      deduped.push(s);
    }
    currentSignature = s.signature;
  });

  return deduped;
}

getPoints = function(symmetry) {
  var output = []
  if (symmetry === 'dodecahedron') {
    var symmetryFaces = getAxes('face first dodecahedron');
    var symmetryEdges = getIntersections(symmetryFaces);

    var dodecahedron_all = getIntersections(symmetryEdges);

    var symmetryVertices = [];
    dodecahedron_all.forEach(function(p) {
      if (p.indexIn(symmetryFaces) < 0 
        && p.indexIn(symmetryEdges) < 0) {
        symmetryVertices.push(p);
      }
    });

    output.push(symmetryFaces);
    output.push(symmetryEdges);
    output.push(symmetryVertices);
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

allPlusMinus = function(points) {
  var output = points;
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

evenPlus = function(points) {
  var output = [];
  output = output.concat(points.map(function(p) {
    return new Point3D(-p.x, p.y, p.z);
  }))

  output = output.concat(points.map(function(p) {
    return new Point3D(p.x, -p.y, p.z);
  }))

  output = output.concat(points.map(function(p) {
    return new Point3D(p.x, p.y, -p.z);
  }))

  output = output.concat(points.map(function(p) {
    return new Point3D(-p.x, -p.y, -p.z);
  }))

  output.forEach(function(point){
    point.normalize();
  });

  return dedupOnInnerProd(output);
}

oddPlus = function(points) {
  var output = points;
  output = output.concat(points.map(function(p) {
    return new Point3D(-p.x, -p.y, p.z);
  }))

  output = output.concat(points.map(function(p) {
    return new Point3D(p.x, -p.y, -p.z);
  }))

  output = output.concat(points.map(function(p) {
    return new Point3D(-p.x, p.y, -p.z);
  }))

  output.forEach(function(point){
    point.normalize();
  });

  return dedupOnInnerProd(output);
}

evenPermutations = function(p) {
  var output = [p];
  output.push(new Point3D(p.y, p.z, p.x));
  output.push(new Point3D(p.z, p.x, p.y));
  return output;
}

oddPermutations = function(p) {
  var output = [];
  output.push(new Point3D(p.x, p.z, p.y));
  output.push(new Point3D(p.z, p.y, p.x));
  output.push(new Point3D(p.y, p.x, p.z));
  return output;
}

allPermutations = function(p) {
  var output = [p];
  output.push(new Point3D(p.x, p.z, p.y));
  output.push(new Point3D(p.y, p.x, p.z));
  output.push(new Point3D(p.z, p.x, p.y));
  output.push(new Point3D(p.y, p.z, p.x));
  output.push(new Point3D(p.z, p.y, p.x));
  return output;
}

getSoccerVertices = function() {
  var output = [];
  output = output.concat(evenPermutations(new Point3D(0, 1, 3 * PHI)));
  output = output.concat(evenPermutations(new Point3D(2, 1 + 2 * PHI, PHI)));
  output = output.concat(evenPermutations(new Point3D(1, 2 + PHI, 2 * PHI)));
  output = allPlusMinus(output); 
  return output;
}

getTruncatedOctahedronVertices = function() {
  return allPlusMinus(allPermutations(new Point3D(0, 1, 2)));
}

getGRCOVertices = function() {
  return allPlusMinus(allPermutations(new Point3D(1, 1 + Math.sqrt(2), 1 + 2 * Math.sqrt(2))));
}

getSnubCubeVertices = function() {
  var xi = 1.0 / 3.0 * (Math.pow(17 + 3 * Math.sqrt(33), 1.0/3) - Math.pow(-17 + 3 * Math.sqrt(33), 1.0/3) - 1);
  var seed = new Point3D(1, xi, 1/xi);
  var output = [];
  output = output.concat(evenPlus(evenPermutations(seed)));
  output = output.concat(oddPlus(oddPermutations(seed)));
  return output;
}

getSnubDodecahedronVertices = function() {
  var tau = PHI;
  var xi = Math.pow(tau/2 + 0.5 * Math.sqrt(tau - 5.0/27), 1.0/3) + Math.pow(tau/2 - 0.5 * Math.sqrt(tau - 5.0/27), 1.0/3);
  var alpha = xi - 1.0 / xi;
  var beta = xi * tau + tau * tau + tau / xi;
  var seeds = [
    [2 * alpha, 2, 2 * beta],
    [alpha + beta / tau + tau, - alpha * tau + beta + 1 / tau, alpha /tau + beta * tau - 1],
    [- alpha / tau + beta * tau + 1, - alpha + beta / tau - tau, alpha * tau + beta - 1 / tau],
    [- alpha / tau + beta * tau - 1, alpha - beta / tau - tau, alpha * tau + beta + 1/ tau],
    [alpha + beta / tau - tau, alpha * tau - beta + 1 / tau, alpha / tau + beta * tau + 1]
  ]

  var output = [];
  seeds.forEach(function(s){
    output = output.concat(oddPlus(oddPermutations(new Point3D(s[0], s[1], s[2]))));
  })
  return output;
}

populateStickers = function(vertices, prototypeSticker, symmetry, mirroring) {
  if(typeof(mirroring)==='undefined') mirroring = false;

  var points = getPoints(symmetry);
  var stickers = [];

  stickers.push(new Sticker(vertices, prototypeSticker));

  protytypeStickerObject = new Sticker(vertices, prototypeSticker);

  symmetryFaces = points[0];
  symmetryEdges = points[1];
  symmetryVertices = points[2];


  face_degree = Math.PI / 2.0; // symmetry === 'cube'
  if (symmetry === 'dodecahedron') face_degree = Math.PI * 2.0 / 5.0;

  symmetryFaces.forEach(function(face) {
    var rotationImage = prototypeSticker.map(function(j) {
      setRotationMatrix(face, face_degree);
      var newVertex = vertices[j].clone();
      newVertex.rotate();
      var index = newVertex.indexIn(vertices);
      if (index < 0) {
        throw "Vertex doesn't match after symmetry operation";
      }
      return index;
    });
    stickers.push(new Sticker(vertices, rotationImage));

    var rotationImage2 = prototypeSticker.map(function(j) {
      setRotationMatrix(face, face_degree * 2);
      var newVertex = vertices[j].clone();
      newVertex.rotate();
      return newVertex.indexIn(vertices);
    });
    stickers.push(new Sticker(vertices, rotationImage2));
  });

  symmetryVertices.forEach(function(vertex){
    var rotationImage3 = prototypeSticker.map(function(j) {
      setRotationMatrix(vertex, Math.PI * 2.0 / 3.0);
      var newVertex = vertices[j].clone();
      newVertex.rotate();
      return newVertex.indexIn(vertices);
    });
    stickers.push(new Sticker(vertices, rotationImage3));
  });

  symmetryEdges.forEach(function(edge) {
    if (edge.x * 243 + edge.y * 19 + edge.z > 0) return;

    var rotationImage = prototypeSticker.map(function(j) {
      setRotationMatrix(edge, Math.PI);
      var newVertex = vertices[j].clone();
      newVertex.rotate();
      return newVertex.indexIn(vertices);
    });
    stickers.push(new Sticker(vertices, rotationImage));
  });

  if (mirroring) {
    var mirrorStickers = stickers.map(function(sticker) {
      var image = sticker.indices.map(function(i) {
        return vertices[i].reverse().indexIn(vertices);
      });
      return new Sticker(vertices, image.reverse());
    })
    stickers = stickers.concat(mirrorStickers);
  }

  return dedupStickers(stickers);
}
