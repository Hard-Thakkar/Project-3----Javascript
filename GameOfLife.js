
//creating an object that is the board
//must need a pattern and a canvas
function Board(canvas,pat) {
  //setting dimensions
  this.bWidth = 20;
  this.bHeight = 20;
  this.bSize = 40;
  this.arr = undefined;
  this.gen = 0;
  this.pat = this.pat;
  //Setting Canvas parameters
  //mostly for readability
  this.cWidth = this.bWidth;
  this.cHeight = this.bHeight;
  this.context = canvas.getContext("2d");
  this.context.strokeStyle = "Green";
  this.context.fillStyle = "grey";
  this.initialize();
}

Board.prototype = {
initialize: function(){
  //creates a matrix of cells
  this.arr = new Array(this.bWidth);
  for(var x = 0; x<this.arr.length; x++){
    this.arr[x] = new Array(this.bHeight);
    for(var y = 0; y<this.arr[x].length; y++){
      this.arr[x][y] = false;
    }
  }
  this.DBoard();
},
//creates the board
DBoard: function(){
  this.context.clearRect(0, 0, 800, 800);
  for(var x = 0.5; x <= this.bWidth *this.bSize; x += this.bSize){
    this.context.moveTo(x, 0);
    this.context.lineTo(x, this.bHeight * this.bSize);
  }
  for(var y = 0.5; y <= this.bHeight * this.bSize; y += this.bSize){
    this.context.moveTo(0, y);
    this.context.lineTo(this.bWidth* this.bSize,y);
  }
  //marks the border of each box to represent a cell
  this.context.stroke();

  //this will fill all the alive cells in the matrix
  for(x=0; x< this.arr.length; x++){
    for(y=0;y<this.arr[x].length; y++){
      if(this.arr[x][y]){
        this.context.fillRect(x*this.bSize+1, y*this.bSize+1,this.bSize-1,this.bSize-1);
      }
    }
  }
},

//checks the 8 neighbouring cells
//This will return the number of neighbours
neighbours: function(xs,ys){
  var nei = 0;
  for (var x = xs-1; x <= xs+1; x++) {
      for (var y = ys-1; y <= ys+1; y++) {
          if (x == xs && y == ys)
              continue;
          if (x < 0 || x >= this.arr.length || y < 0 || y >= this.arr[x].length)
              continue;
          if (this.arr[x][y])
              nei++;
      }
  }
  return nei;
},

//increments by 1
inc1: function(){
  var x;
  var y;
  var nei;
      var temp = new Array(this.arr.length);
      for (x = 0; x < temp.length; x++) {
          temp[x] = new Array(this.arr[x].length);
      }
      for (x = 0; x < this.arr.length; x++) {
          for (y = 0; y < this.arr[x].length; y++) {
              nei = this.neighbours(x, y);
              if (this.arr[x][y]) {
                  if (nei < 2 || nei > 3)
                      temp[x][y] = false;
                  if (nei == 2 || nei == 3)
                      temp[x][y] = true;
              } else {
                  if (nei == 3)
                      temp[x][y] = true;
              }
          }
      }
      this.arr = temp;
      this.gen++;
      this.DBoard();
},
StillLife: function(){
  
},
Oscillator: function(){

},
Glider: function(){

},
selectACell: function(xs,ys){
  if (xs >= 0 && xs < this.arr.length && ys >= 0 && ys < this.arr[0].length) {
      this.arr[xs][ys] = !this.arr[xs][ys];
      this.DBoard();
  }
},
reset: function(){
  for(var x = 0; x < this.arr.length; x++) {
      for(var y = 0; y < this.arr[x].length; y++) {
          this.arr[x][y] = false;
      }
  }
  this.gen = 0;
  this.DBoard();
}
}
var go;
//still life will be default as it is the first one on the list
var pat = "StillLife";
var board = new Board(document.getElementById("boardboard"),pat);

function increment1(){
    if (go === undefined) {
      board.thispat = pat;
      board.inc1();
      document.getElementById("round").textContent= board.gen;
    }
}
//runs the run function indefinetly
function start(){
    if (go === undefined) {
    go = setInterval(run, 40);
    }
}
//meant to reset board
function resetBoard(){
  board.reset();
  document.getElementById("round").textContent = 0;
}

//stops the fuction
function stop(){
    clearInterval(go);
    go = undefined;
}

//increments 23 by calling increment 23 times
function increment23(){
  for(var x= 0; x<23;x++){
    increment1();
  }
}
//allows for pattern to be selectedIndex
//assigns value selected to pat
function getOption(){
  selectElement = document.querySelector('#pattern');
  pat = selectElement.options[selectElement.selectedIndex].value;
}

//runs inc1 and increments the generations value by 1
function run(){
    board.inc1();
    document.getElementById("round").textContent= board.gen;
}


//Allows for mouse location to be clicked on the board to trigger life or death
//uses the boardboard id in html
let boaard = document.querySelector('#boardboard')
document.addEventListener("click", pointer);
function pointer(e) {
      x = e.clientX;
      y = e.clientY;

  x = Math.floor(x/board.bSize);
  y = Math.floor(y/board.bSize);
  board.selectACell(x, y);
}
