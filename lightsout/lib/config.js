puzzleConfig = {
  "puzzles": [
    {
      "id": "cube",
      "displayName":"Cube",
      "symmetry":"cube",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 1, 5, 4]]
    },
    {
      "id": "octahedron",
      "displayName":"Octahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 2, 4]]
    },
    {
      "id": "dodecahedron",
      "displayName":"Dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[1, 11, 15, 12, 2]]
    },
    {
      "id": "icosahedron",
      "displayName":"Icosahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 4, 6]]
    },
    {
      "id": "cuboctahedron",
      "displayName":"Cuboctahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[1, 2, 10, 9], [7, 9, 10]]
    },
    {
      "id": "icosidodecahedron",
      "displayName":"Icosidodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[1, 13, 27, 22, 3], [1, 4, 13]]
    },
    {
      "id": "soccer ball",
      "displayName":"Soccer Ball",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[2, 5, 8, 24, 21], [2, 21, 23, 52, 50, 33]]
    },
    {
      "id": "rhombic dodecahedron",
      "displayName":"Rhombic Dodecahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 8, 1, 10]]
    },
    {
      "id": "rhombic triacontahedron",
      "displayName":"Rhombic Triacontahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[2, 20, 16, 24]]
    }
  ],

  "defaultPuzzle":"dodecahedron"
};