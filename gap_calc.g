#                     +--------------+
#                     |              |
#                     |  1    2    3 |
#                     |              |
#                     |  4   49    5 |
#                     |              |
#                     |  6    7    8 |
#                     |              |
#      +--------------+--------------+--------------+--------------+
#      |              |              |              |              |
#      |  9   10   11 | 17   18   19 | 25   26   27 | 33   34   35 |
#      |              |              |              |              |
#      | 12   50   13 | 20   51   21 | 28   52   29 | 36   53   37 |
#      |              |              |              |              |
#      | 14   15   16 | 22   23   24 | 30   31   32 | 38   39   40 |
#      |              |              |              |              |
#      +--------------+--------------+--------------+--------------+
#                     |              |
#                     | 41   42   43 |
#                     |              |
#                     | 44   54   45 |
#                     |              |
#                     | 46   47   48 |
#                     |              |
#                     +--------------+

cubesymmetry := [
( 1, 3, 8, 6)( 2, 5, 7, 4)( 9,33,25,17)(10,34,26,18)(11,35,27,19)*((41,43,48,46)(42,45,47,44)(14,22,30,38)(15,23,31,39)(16,24,32,40))^-1 * (53,52,51,50)(36,28,20,12)(37,29,21,13),
( 9,11,16,14)(10,13,15,12)( 1,17,41,40)( 4,20,44,37)( 6,22,46,35) * ((25,27,32,30)(26,29,31,28)( 3,38,43,19)( 5,36,45,21)( 8,33,48,24))^-1 * (2,18,42,39)(49,51,54,53)(7,23,47,34),
(17,19,24,22)(18,21,23,20)( 6,25,43,16)( 7,28,42,13)( 8,30,41,11) * ((33,35,40,38)(34,37,39,36)( 3, 9,46,32)( 2,12,47,29)( 1,14,48,27))^-1 * (4,26,45,15)(49,52,54,50)(5,31,44,10)
];
cubegroup := Group(cubesymmetry);
Size(cubegroup); # 24

halfturn := (( 1, 3, 8, 6)( 2, 5, 7, 4)( 9,33,25,17)(10,34,26,18)(11,35,27,19))^2;
halfturncube :=ShallowCopy(cubesymmetry);
Add(halfturncube,halfturn);
halfturngroup :=Group(halfturncube);


mirror1 := ((1,3)(4,5)(6,8)(17,19)(11,25)(10,26)(9,27)(33,35));
mirror1cube :=ShallowCopy(cubesymmetry);
Add(mirror1cube,mirror1);
mirror1group :=Group(mirror1cube);


mirror2 := (2,4)(3,6)(5,7)(19,25)(18,26)(17,27)(11,33)(10,34)(9,35);
mirror2cube :=ShallowCopy(cubesymmetry);
Add(mirror2cube,mirror2);
mirror2group :=Group(mirror2cube);

rubik := ( 1, 3, 8, 6)( 2, 5, 7, 4)( 9,33,25,17)(10,34,26,18)(11,35,27,19);
rubikcube :=ShallowCopy(cubesymmetry);
Add(rubikcube,rubik);
rubikgroup :=Group(rubikcube);

mirror1rubikcube :=ShallowCopy(cubesymmetry);
Add(mirror1rubikcube,rubik);
Add(mirror1rubikcube,mirror1);
mirror1rubikgroup :=Group(mirror1rubikcube);

mirror2rubikcube :=ShallowCopy(cubesymmetry);
Add(mirror2rubikcube,rubik);
Add(mirror2rubikcube,mirror2);
mirror2rubikgroup :=Group(mirror2rubikcube);

mirror12rubikcube :=ShallowCopy(cubesymmetry);
Add(mirror12rubikcube,rubik);
Add(mirror12rubikcube,mirror1);
Add(mirror12rubikcube,mirror2);
mirror12rubikgroup :=Group(mirror12rubikcube);

Size(halfturngroup)/Size(cubegroup); # =>                       663552     
Size(mirror1group)/Size(cubegroup); # =>                      18579456     28 times half turn cube
Size(mirror2group)/Size(cubegroup); # =>         118634066124315033600     96/35=2.74 times Rubik's cube
Size(rubikgroup)/Size(cubegroup); # =>            43252003274489856000
Size(mirror1rubikgroup)/Size(cubegroup); # =>  33217538514808209408000     768=256*3 times Rubik's cube
Size(mirror2rubikgroup)/Size(cubegroup); # =>  33217538514808209408000
Size(mirror12rubikgroup)/Size(cubegroup); # => 33217538514808209408000

# Rubik's cube: Factorial(12) * Factorial(8) * 3^8 * 2^12 /2 /2 /3;
# Mirror + Rubik's cube: Factorial(12) * Factorial(8) * 3^8 * 2^12/2 * 128;
#   --- edges: all permutation, even number of flips. 
#   --- corners: all permutation, each corner can be mirrored except for the last one
# Mirror2: Factorial(12)/2 * 2^12/2 * (Factorial(4) * 3^4 * 2^4 /2)^2;
#   --- edges: even perm, even number of flips, just like Rubik's cube after corners are solved
#   --- corners: two orbits, each four elements. Within orbits: all perms, each single corner can rotated, even number of mirroring
