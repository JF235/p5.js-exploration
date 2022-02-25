var t
var counter

var spring


function setup() {
  createCanvas(600, 600);
  counter = 0
  t = 0

  spring = new Spring(createVector(200, 200), createVector(200, 300))
}


function draw() {
  background('#282a36')

  fill(255)
  stroke(255) 
  arrow2(createVector(50, 0), createVector(300, 300))

  noLoop()
}

