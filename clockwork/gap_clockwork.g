# 3x3x3
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

##### 3x3x3
U:= ( 1, 3, 8, 6)( 2, 5, 7, 4)( 9,33,25,17)(10,34,26,18)(11,35,27,19);
D:= (41,43,48,46)(42,45,47,44)(14,22,30,38)(15,23,31,39)(16,24,32,40);
L:= ( 9,11,16,14)(10,13,15,12)( 1,17,41,40)( 4,20,44,37)( 6,22,46,35);
R:= (25,27,32,30)(26,29,31,28)( 3,38,43,19)( 5,36,45,21)( 8,33,48,24);
F:= (17,19,24,22)(18,21,23,20)( 6,25,43,16)( 7,28,42,13)( 8,30,41,11);
B:= (33,35,40,38)(34,37,39,36)( 3, 9,46,32)( 2,12,47,29)( 1,14,48,27);
Clock3x3x3 := Group(U*D, L*R, F*B);
Size(Clock3x3x3); # => 6144

##### 5x5x5    
# Elementary moves defined by Andreas Nortmann  http://twistypuzzles.com/forum/viewtopic.php?p=291884#p291884

U1:=(001,005,025,021)(002,010,024,016)(003,015,023,011)(004,020,022,006)(007,009,019,017)(008,014,018,012)(101,076,051,026)(102,077,052,027)(103,078,053,028)(104,079,054,029)(105,080,055,030);

U2:=(106,081,056,031)(107,082,057,032)(108,083,058,033)(109,084,059,034)(110,085,060,035);

L1:=(026,030,050,046)(027,035,049,041)(028,040,048,036)(029,045,047,031)(032,034,044,042)(033,039,043,037)(001,051,126,125)(006,056,131,120)(011,061,136,115)(016,066,141,110)(021,071,146,105);
L2:=(002,052,127,124)(007,057,132,119)(012,062,137,114)(017,067,142,109)(022,072,147,104);

F1:=(051,055,075,071)(052,060,074,066)(053,065,073,061)(054,070,072,056)(057,059,069,067)(058,064,068,062)(021,076,130,050)(022,081,129,045)(023,086,128,040)(024,091,127,035)(025,096,126,030);
F2:=(016,077,135,049)(017,082,134,044)(018,087,133,039)(019,092,132,034)(020,097,131,029);

R1:=(076,080,100,096)(077,085,099,091)(078,090,098,086)(079,095,097,081)(082,084,094,092)(083,089,093,087)(101,150,075,025)(106,145,070,020)(111,140,065,015)(116,135,060,010)(121,130,055,005);
R2:=(102,149,074,024)(107,144,069,019)(112,139,064,014)(117,134,059,009)(122,129,054,004);

B1:=(101,105,125,121)(102,110,124,116)(103,115,123,111)(104,120,122,106)(107,109,119,117)(108,114,118,112)(001,046,150,080)(002,041,149,085)(003,036,148,090)(004,031,147,095)(005,026,146,100);
B2:=(006,047,145,079)(007,042,144,084)(008,037,143,089)(009,032,142,094)(010,027,141,099);

D1:=(126,130,150,146)(127,135,149,141)(128,140,148,136)(129,145,147,131)(132,134,144,142)(133,139,143,137)(046,071,096,121)(047,072,097,122)(048,073,098,123)(049,074,099,124)(050,075,100,125);
D2:=(041,066,091,116)(042,067,092,117)(043,068,093,118)(044,069,094,119)(045,070,095,120);

Clock5x5x5 := Group(U1^2 * U2 * D1^2 * D2, L1^2 * L2 * R1^2 * R2,F1^2 * F2 * B1^2 * B2);

Size(Clock5x5x5); # 98304