/**
 * Cria uma lista com `n` vetores distribuídos
 * linearmente entre as posições `r0` e `r1`.
 * 
 * ---
 * 
 * @param {p5.Vector} r0 Posição Inicial
 * @param {p5.Vector} r1 Posição Final
 * @param {int} n Número de pontos
 * 
 * @returns Array 1D com vetores
 */
function distribute_evenly_1D(r0, r1, n){
    var w = p5.Vector.sub(r1, r0)
    var d = w.mag()

    var inc = d/(n - 1)

    w.normalize()

    var x
    var y
    var points = []
    for (var i = 0; i < n; i++){
        x = r0.x + w.x * i * inc
        y = r0.y + w.y *i * inc
        points.push(createVector(x, y))
    }

    return points
}

/**
 * Cria uma matriz de `nrows` x `ncols` de vetores
 * distribuídos desde `r0` até `r1`.
 * 
 * ---
 * 
 * @param {p5.Vector} r0 Primeira posição (Top, Left)
 * @param {p5.Vector} r1 Última posição (Bottom, Right )
 * @param {int} nrows número de linhas
 * @param {int} ncols número de coluns
 * 
 * @returns Array 2D com vetores
 */
function distribute_evenly_2D(r0, r1, nrows, ncols){
    var width = r1.x - r0.x
    var height = r1.y - r0.y

    var dx = width/(ncols - 1)
    var dy = height/(nrows - 1)

    var i_displacement = createVector(width, 0).normalize().mult(dx)
    var j_displacement = createVector(0, height).normalize().mult(dy)

    var array = []
    var pos = r0.copy()
    for(var i = 0; i < nrows; i++){
        var line = []
        for(var j = 0; j < ncols; j++){
            line.push(pos.copy())
            pos.add(i_displacement)
        }
        array.push(line)
        pos.x = r0.x // Reseta para o começo de x
        pos.add(j_displacement) 
    }

    return array
}


