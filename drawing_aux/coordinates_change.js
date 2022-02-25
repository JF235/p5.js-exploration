function polar_to_cartesian(r, theta){
    var x = r * cos(theta)
    var y = r * sin(theta)
    return createVector(x, y)
  
  }