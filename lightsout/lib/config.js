puzzleConfig = {
  "groups": [
    {
      "id": "platonic",
      "displayName": "Platonic"
    },
    {
      "id": "prism",
      "displayName": "Prisms & Duals"
    },
    {
      "id": "archimedean_quasi_regular",
      "displayName": "Archimedean: Quasiregular"
    },
    {
      "id": "archimedean_truncated_platonic",
      "displayName": "Archimedean: Truncated Platonic"
    },
    {
      "id": "archimedean_snub",
      "displayName": "Archimedean: Snub"
    },
    {
      "id": "archimedean_three_color",
      "displayName": "Archimedean: Misc."
    },
    {
      "id": "catalan_triangular",
      "displayName": "Catalan: Triangular Faces"
    },
    {
      "id": "catalan_quadrilateral",
      "displayName": "Catalan: Quadrilateral Faces"
    },
    {
      "id": "catalan_pentagonal",
      "displayName": "Catalan: Pentagonal Faces"
    },
    {
      "id": "misc",
      "displayName": "Miscellaneous"
    }
  ],

  "puzzles": [
    {
      "id": "tetrahedron",
      "group": "platonic",
      "displayName":"Tetrahedron",
      "symmetry":"tetrahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 1, 2]]
    },
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
      "id": "triangular_prism",
      "group": "prism",
      "displayName":"Triangular Prism",
      "symmetry":"triangle",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 1, 2], [1, 0, 3, 5]]
    },
    {
      "id": "pentagonal_prism",
      "group": "prism",
      "displayName":"Pentagonal Prism",
      "symmetry":"pentagon",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 1, 2, 3, 4], [1, 0, 5, 9]]
    },
    {
      "id": "square_antiprism",
      "group": "prism",
      "displayName":"Square Antiprism",
      "symmetry":"square",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 1, 2, 3], [1, 0, 7]]
    },
    {
      "id": "pentagonal_antiprism",
      "group": "prism",
      "displayName":"Pentagonal Antiprism",
      "symmetry":"pentagon",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 1, 2, 3, 4], [1, 0, 9]]
    },
    {
      "id": "triangular_bipyramid",
      "group": "prism",
      "displayName":"Triangular Bipyramid",
      "symmetry":"triangle",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 3, 2]]
    },
    {
      "id": "pentagonal_bipyramid",
      "group": "prism",
      "displayName":"Pentagonal Bipyramid",
      "symmetry":"pentagon",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 3, 2]]
    },
    {
      "id": "square_antidipyramid",
      "group": "prism",
      "displayName":"Square Antidipyramid",
      "symmetry":"square",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 3, 4, 2]]
    },
    {
      "id": "pentagonal_antidipyramid",
      "group": "prism",
      "displayName":"Pentagonal Antidipyramid",
      "symmetry":"pentagon",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 3, 4, 2]]
    },

    {
      "id": "cuboctahedron",
      "group": "archimedean_quasi_regular",
      "displayName":"Cuboctahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[1, 2, 10, 9], [7, 9, 10]]
    },
    {
      "id": "icosidodecahedron",
      "group": "archimedean_quasi_regular",
      "displayName":"Icosi&shy;dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[1, 13, 27, 22, 3], [1, 4, 13]]
    },

    {
      "id": "truncated_tetrahedron",
      "group": "archimedean_truncated_platonic",
      "displayName":"Truncated Tetrahedron",
      "symmetry":"tetrahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 1, 2], [0, 2, 11, 10, 4, 3]]
    },
    {
      "id": "truncated_cube",
      "group": "archimedean_truncated_platonic",
      "displayName":"Truncated Cube",
      "symmetry":"cube",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 2, 1], [0, 1, 7, 6, 18, 19, 13, 12]]
    },
    {
      "id": "truncated_octahedron",
      "group": "archimedean_truncated_platonic",
      "displayName":"Truncated Octahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[3, 13, 19, 5], [0, 2, 3, 5, 4, 1]]
    },
    {
      "id": "truncated_dodecahedron",
      "group": "archimedean_truncated_platonic",
      "displayName":"Truncated Dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 11, 3], [0, 3, 6, 7, 4, 35, 38, 37, 34, 32]]
    },
    {
      "id": "soccer_ball",
      "group": "archimedean_truncated_platonic",
      "displayName":"Soccer Ball",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[1, 3, 7, 38, 34], [5, 8, 4, 7, 3, 6]]
    },

    {
      "id": "rhombicuboctahedron",
      "group": "archimedean_three_color",
      "displayName":"Expanded Cube",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 2, 1], [0, 6, 8, 2], [2, 8, 20, 14]]
    },
    {
      "id": "rhombicosidodecahedron",
      "group": "archimedean_three_color",
      "displayName":"Expanded Dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[2, 8, 20, 14], [2, 14, 26], [2, 36, 24, 42, 8]]
    },
    {
      "id": "great_rhombicuboctahedron",
      "group": "archimedean_three_color",
      "displayName":"Truncated Cuboctahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 1, 7, 6], [0, 2, 3, 5, 4, 1], [0, 6, 8, 20, 18, 12, 14, 2]]
    },
    {
      "id": "great_rhombicosidodecahedron",
      "group": "archimedean_three_color",
      "displayName":"Truncated Icosi&shy;dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[2, 8, 20, 14], [2, 14, 62, 38, 26, 50], [2, 50, 96, 72, 24, 30, 78, 102, 56, 8]]
    },

    {
      "id": "snub_cube",
      "group": "archimedean_snub",
      "displayName":"Snub Cube",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[1, 12, 7, 21], [1, 21, 2], [0, 1, 2]]
    },
    {
      "id": "snub_dodecahedron",
      "group": "archimedean_snub",
      "displayName":"Snub Dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[3, 15, 27, 39, 51], [1, 55, 24], [1, 24, 13]]
    },


    {
      "id": "kleetope_tetrahedron",
      "group": "catalan_triangular",
      "displayName":"Kleetope of Tetrahedron",
      "symmetry":"tetrahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 1, 4]]
    },
    {
      "id": "kleetope_cube",
      "group": "catalan_triangular",
      "displayName":"Kleetope of Cube",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 1, 9]]
    },
    {
      "id": "kleetope_octahedron",
      "group": "catalan_triangular",
      "displayName":"Kleetope of Octahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 2, 6]]
    },
    {
      "id": "kleetope_dodecahedron",
      "group": "catalan_triangular",
      "displayName":"Kleetope of Dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 3, 20]]
    },
    {
      "id": "kleetope_icosahedron",
      "group": "catalan_triangular",
      "displayName":"Kleetope of Icosahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 2, 12]]
    },
    {
      "id": "disdyakis_dodecahedron",
      "group": "catalan_triangular",
      "displayName":"Symmetry of Cube",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 9, 20], [0, 20, 8]]
    },
    {
      "id": "disdyakis_triacontahedron",
      "group": "catalan_triangular",
      "displayName":"Symmetry of Dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 51, 39], [0, 39, 58]]
    },

    {
      "id": "rhombic_dodecahedron",
      "group": "catalan_quadrilateral",
      "displayName":"Rhombic Dodecahedron",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 8, 1, 10]]
    },
    {
      "id": "rhombic_triacontahedron",
      "group": "catalan_quadrilateral",
      "displayName":"Rhombic Triacontahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[2, 20, 16, 24]]
    },
    {
      "id": "deltoidal_icositetrahedron",
      "group": "catalan_quadrilateral",
      "displayName":"2x2x2",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 9, 20, 8]]
    },
    {
      "id": "deltoidal_hexecontahedron",
      "group": "catalan_quadrilateral",
      "displayName":"Kilominx",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 39, 58, 28]]
    },
    {
      "id": "pentagonal_icositetrahedron",
      "group": "catalan_pentagonal",
      "displayName":"Dual of Snub Cube",
      "symmetry":"cube",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 18, 32, 9, 6]]
    },
    {
      "id": "pentagonal_hexecontahedron",
      "group": "catalan_pentagonal",
      "displayName":"Dual of Snub Dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":true,
      "prototypeStickers":[[0, 44, 35, 13, 66]]
    },

    {
      "id": "volleyball",
      "group": "misc",
      "displayName":"Volley Cube",
      "symmetry":"tetrahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 8, 20, 4, 22, 10], [13, 10, 22, 25]]
    },
    {
      "id": "chamfered_cube",
      "group": "misc",
      "displayName":"Chamfered Cube",
      "symmetry":"cube",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[0, 9, 12, 1, 11, 8], [9, 21, 24, 12]]
    },
    {
      "id": "chamfered_dodecahedron",
      "group": "misc",
      "displayName":"Chamfered Dodecahedron",
      "symmetry":"dodecahedron",
      "neighborhoodMakesDifference":false,
      "prototypeStickers":[[33, 39, 63, 76, 57], [6, 64, 40, 17, 76, 63]]
    }
  ],

  "defaultPuzzle":"dodecahedron"
};