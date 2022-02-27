var counter
var t

var p
var q
var osc
var g1
var g2

var sep = 120
var rest_length = 100
var k = 0.06

function setup() {
  createCanvas(600, 600);
  counter = 0
  t = 0

  p1 = new Particle(5, createVector(320, 300 - sep/2))
  p2 = new Particle(5, createVector(300, 300 + sep/2))
  osc = new Oscilador(p1, p2, rest_length, k) 
  p3 = new Particle(1, osc.calculateCentroid())
  path3 = p3.get_path()
  path3.set_size(100)
  path3.set_color(color('red'))
  path3.set_weight(1)
  g1 = new UniformGravity(p1)
  g2 = new UniformGravity(p2)
}


function draw() {
  background('#282a36')

  osc.draw()
  osc.drawCentroid()
  
  osc.applyForce(g1, g2)
  osc.update()
  osc.edges(1)

  p3.update()
  p3.set_position(osc.calculateCentroid())
  p3.drawPath()

  var p1 = osc.get_particle1()
  p1.drawPath()

  var p2 = osc.get_particle2()
  p2.drawPath()


  // if (counter % 4 == 0){
  //   
  // }

  counter += 1
}

