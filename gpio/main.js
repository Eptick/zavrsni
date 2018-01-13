'use strict'
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO



/*
	24	21	18	15	1	4	7	10

22

19

16

13

3

6

9

12

*/
/*

COLUMNS
(PiPin : DisplayPin)
14 : 24
15 : 21
18 : 18
23 : 15
24 : 1
25 : 4
8  : 7
7  : 10

ROWS
(PiPin : DisplayPin)
2  : 22
3  : 19
4  : 16
17 : 13
27 : 3
22 : 6
10 : 9
9  : 12

*/
var stupacPinMap = [14, 15, 18, 23, 24, 25,  8, 7];
var redakPinMap  = [2,   3,  4, 17, 27, 22, 10, 9];

var piStupacPins = [];
var piRedakPins = [];

var unoFrame = [
    [0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
]
function initPins() {
	for(let pin of stupacPinMap) {
		piStupacPins.push(new Gpio(pin, 'out'));
	}
	for(let pin of redakPinMap) {
		piRedakPins.push(new Gpio(pin, 'out'));
	}
}
initPins();

function printToPi(i, old = 0){
	piRedakPins[old].writeSync(0);
	piRedakPins[i].writeSync(1);
	for(var j = 0; j < 8; j++) {
		// Ovdje ide 1 - state jer mora biti inverz (ground je 0 ) 1 je visoki otpro odnosno brokiran
		piStupacPins[j].writeSync(1-unoFrame[i][j]);
	}
	setTimeout(printToPi, 1, (i+1)%8, i);
}
printToPi(0);