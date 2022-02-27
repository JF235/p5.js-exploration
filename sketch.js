var counter
var t

var R
var N = 60
var k = 2
var rest_length = 30/N

function setup() {
  createCanvas(600, 800);
  counter = 0
  t = 0

  R = new Rope(N, 300, rest_length, k)
}


function draw() {
  background('#282a36')

  R.draw()
  R.update()


  counter += 1
}

