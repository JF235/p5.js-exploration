/**
 * 
 * @param {int} r Raio
 * @param {int} theta Ângulo em radianos
 * @returns Um vetor com coordenadas cartesianas
 */
function polar_to_cartesian(r, theta){
    var x = r * cos(theta)
    var y = r * sin(theta)
    return createVector(x, y)
  }