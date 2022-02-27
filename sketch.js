var counter
var t

var p
var q

var rest_length = 70
var k = 0.06

function setup() {
  createCanvas(600, 600);
  counter = 0
  t = 0

  p = new Particle(5, createVector(300, 250))
  q = new Particle(5, createVector(300, 350))
}


function draw() {
  background('#282a36')

  var pos_p = p.get_position().copy()
  var pos_q = q.get_position().copy()

  var s = new Spring(pos_p, pos_q)
  s.draw()

  var f1 = new SpringForce(pos_q, pos_p, rest_length, k)
  var f2 = new SpringForce(pos_p, pos_q, rest_length, k)

  p.draw()
  p.applyForce(f1)
  p.update()
  q.draw()
  q.applyForce(f2)
  q.update()

}

