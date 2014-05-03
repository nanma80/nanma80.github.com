puzzleConfig = {
  "groups": [
    {
      "id": "platonic",
      "displayName": "Platonic"
    },
    {
      "id": "archimedean",
      "displayName": "Archimedean"
    },
    {
      "id": "catalan",
      "displayName": "Catalan"
    }
  ],
  
  "puzzles": [
    {
      "id": "cube",
      "group": "platonic",
      "displayName":"Cube",
      "symmetry":"cube",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 1, 5, 4]]
    },
    {
      "id": "octahedron",
      "group": "platonic",
      "displayName":"Octahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 2, 4]]
    },
    {
      "id": "dodecahedron",
      "group": "platonic",
      "displayName":"Dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[1, 11, 15, 12, 2]]
    },
    {
      "id": "icosahedron",
      "group": "platonic",
      "displayName":"Icosahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 4, 6]]
    },
    {
      "id": "cuboctahedron",
      "group": "archimedean",
      "displayName":"Cuboctahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[1, 2, 10, 9], [7, 9, 10]]
    },
    {
      "id": "icosidodecahedron",
      "group": "archimedean",
      "displayName":"Icosi&shy;dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[1, 13, 27, 22, 3], [1, 4, 13]]
    },
    {
      "id": "truncated_octahedron",
      "group": "archimedean",
      "displayName":"Truncated Octahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[3, 13, 19, 5], [0, 2, 3, 5, 4, 1]]
    },
    {
      "id": "soccer_ball",
      "group": "archimedean",
      "displayName":"Soccer Ball",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[1, 3, 7, 38, 34], [5, 8, 4, 7, 3, 6]]
    },
    {
      "id": "rhombicuboctahedron",
      "group": "archimedean",
      "displayName":"Expanded Cube",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 2, 1], [0, 6, 8, 2], [2, 8, 20, 14]]
    },
    {
      "id": "great_rhombicuboctahedron",
      "group": "archimedean",
      "displayName":"Truncated Cuboctahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 1, 7, 6], [0, 2, 3, 5, 4, 1], [0, 6, 8, 20, 18, 12, 14, 2]]
    },
    {
      "id": "rhombicosidodecahedron",
      "group": "archimedean",
      "displayName":"Expanded Dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[2, 8, 20, 14], [2, 14, 26], [2, 36, 24, 42, 8]]
    },
    {
      "id": "great_rhombicosidodecahedron",
      "group": "archimedean",
      "displayName":"Truncated Icosidodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[2, 8, 20, 14], [2, 14, 62, 38, 26, 50], [2, 50, 96, 72, 24, 30, 78, 102, 56, 8]]
    },
    {
      "id": "snub_cube",
      "group": "archimedean",
      "displayName":"Snub Cube",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[1, 12, 7, 21], [1, 21, 2], [0, 1, 2]]
    },
    {
      "id": "snub_dodecahedron",
      "group": "archimedean",
      "displayName":"Snub Dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[3, 15, 27, 39, 51], [1, 55, 24], [1, 24, 13]]
    },
    {
      "id": "rhombic_dodecahedron",
      "group": "catalan",
      "displayName":"Rhombic Dodecahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 8, 1, 10]]
    },
    {
      "id": "rhombic_triacontahedron",
      "group": "catalan",
      "displayName":"Rhombic Triacontahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[2, 20, 16, 24]]
    }
  ],

  "defaultPuzzle":"dodecahedron"
};