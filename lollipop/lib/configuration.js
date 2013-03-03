// configuration saves the number of layers of each puzzle; the turnability of each type of pieces
var configuration = [
  {}, // order = 0
  {}, // order = 1
  {}, // order = 2
  {
    'order': 3,
    'layer': 4,
    'turnability': [
      [], //layer = 0
      [0, 5], //layer = 1
      [0, 1, 4, 5], //layer = 2
      [0,1,2,3,4,5] //layer = 3
    ]
  }, 
  {
    'order': 4,
    'layer': 6,
    'turnability': [
      [], //layer = 0 core ""
      [0, 7], //layer = 1, center "0"
      [1, 0, 7, 6], //layer = 2, corner "01"
      [0, 7, 3, 4], //layer = 3, center bar "02"
      [0, 1, 2, 5, 6, 7], //layer = 4, "012", anti center
      [0,1,2,3,4,5,6,7] //layer = 5, anti core
    ]
  }, 
  {
    'order': 5,
    'layer': 8,
    'turnability': [
      // 0. 1 core: [] never change
      [],
      // 1. 5 centers: [U], never move, only flip. 2^5
      [0,9],
      // 2. 5 corners, moved by adjacent edges: [U,UL], when centers are solved, even perm, double flip. (5!/2) * (2^5/2) 
      [0,1,8,9],
      // 3. 5 [UL,UR] (jump one): even perm, double flip (5!/2) * (2^5)/2
      [1,2,7,8],
      // 4. 5 [UL, U, UR]: tied with type 3, no perm. double flip (2^5)/2
      [0,1,2,7,8,9],
      // 5. 5 [U,DL, DR]: tied with type 2, no perm, double flip (2^5)/2
      [0,3,4,5,6,9],
      // 6. 5 anti centers: anchored to anti core, no perm given anti core. double flip (2^5)/2
      [0,1,2,3,6,7,8,9],
      // 7. 1 anti core: 5 rotation states, when centers are solved.
      [0,1,2,3,4,5,6,7,8,9]
    ]
  }, 
  {
    'order': 6,
    'layer': 13,
    'turnability': [
      // 0. core []
      [],
      // 1. 6 centers: [U], 2^6
      [0,11],
      // 2. 6 corners: [U,UR], even perm. no flip in place. (6!/2)
      [0,1, 10,11],
      // 3. 6 pieces in two orbits, 3 pieces/orbit: [UL, UR], ((3!/2) * (2^3/2))^2
      [1,2, 9,10],
      // 4. 6 pieces in two orbits, 3 pieces/orbit: [U, UL, UR], tied to type 3. No perm. ((2^3/2))^2
      [0,1,2, 9,10,11],
      // 5. 3 center bars, redundant
      [0, 5, 6, 11],
      // 6. 12 pieces in two orbits, 6 pieces/orbit: [U,UL,D] (6!/2)^2
      [0,1, 5,6, 10,11],
      // 7. 2 pieces like [U,DL,DR], every other edge: never move. orientations tied with type 3 and 4. redundant
      [0,3,4, 7,8, 11],
      // 8. 6 anti corners: even perm, (6!/2). Never flip in place. 
      [0,1,2,3,  8,9,10,11],
      // 9. 6 pieces: anti type 3, two orbits. tied to types 3 and 4 and 7. orientation = sum(corresponding pieces in type 4 and type 7). redundant
      [0,1,2,  5,6,  9,10,11],
      // 10. 3 anti center bars REDUNDANT
      [0,1, 4,5,6,7, 10,11],
      // 11. 6 anti centers divided into two orbits: given anti core, no perm, (2^6)/4. Divided by 4: in each orbit, parity(sum(flips of type 11)) = parity(sum(flips of type 2))
      [0,1,2,3,4,   7,8,9,10,11],
      // 12. 1 anti core: only 3 rotational states are possible
      [0,1,2,3,4,5,6,7,8,9,10,11]
    ]
  }, 
];