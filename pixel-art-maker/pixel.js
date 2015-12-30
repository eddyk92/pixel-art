//setup
document.body.style.margin = '0px';
var columns = 50;
var tileSize = window.innerWidth / columns;
var rows = Math.floor(window.innerHeight / tileSize) - 8;

//make new pixels 
function makeCanvas (whatClass,color) {
	var tile = document.createElement('div');
	tile.className = whatClass;
	tile.style.backgroundColor = color;
	tile.style.width = tileSize+'px';
	tile.style.height = tileSize+'px';
	tile.style.cssFloat = 'left';
	tile.style.border = '0px';
	document.body.appendChild(tile);
}

//make blank canvas
for (var i = 0; i < rows*columns; i++) {
	makeCanvas('canvas','white');
}

var canvasDivs = document.getElementsByClassName('canvas');

var paintbrush = 'white';

var paint = function(event) {
	event.target.style.backgroundColor = paintbrush;
};

for (var i = 0; i < canvasDivs.length; i++) {
	canvasDivs[i].addEventListener('mouseover', paint);
	canvasDivs[i].addEventListener('mousedown', startRect);
	canvasDivs[i].addEventListener('mouseup', endRect);
}

//make color selections
var colors = [
'red','blue', 'green', 'yellow', 'orange', 'purple', 'black', 'brown', 'silver'
];

for (var i = 0; i < colors.length; i++) {
	makeCanvas('paint',colors[i]);
}
var pallet = document.getElementsByClassName('paint');

var changePaintbrush = function(event) {
	paintbrush = event.target.style.backgroundColor;
	document.body.style.backgroundColor = paintbrush;
};

for (var i = 0; i < pallet.length; i++) {
	pallet[i].addEventListener('click', changePaintbrush);
}


//color options 
var menuBar = document.createElement('div');
menuBar.style.fontWeight = 'bold';
menuBar.style.fontSize = "40px";
menuBar.innerHTML = ' ';
document.body.appendChild(menuBar);


//clear and start over
var clear = document.createElement('span');
clear.innerHTML = ' Clear';
clear.addEventListener('click',startOver);
menuBar.appendChild(clear);
	
function startOver() {
	for (var i = 0; i < canvasDivs.length; i++) {
		canvasDivs[i].style.backgroundColor = 'pink';
	}
}

//make tiles
var a;
function startRect(event) {
	a = event.target.indexValue;
}

function endRect(event) {
	var b = event.target.indexValue;
	var startR = Math.min(a,b);
	var endR = Math.max(a,b);
	var heightR = Math.ceil((endR-startR)/columns);
	var indexR = [];
	var widthR = endR - ( startR + ( ( heightR - 1 ) * columns ) );
	for (var i = 0; i < heightR; i++) {
		for (var j = 0; j <= widthR; j++) {
			var indexValue = startR+(i*columns)+j;
			indexR.push(indexValue);
		}
	}
	for (var k = 0; k < indexR.length; k++) {
		canvasDivs[indexR[k]].style.backgroundColor = paintbrush;
	}
	console.log(indexR);
}