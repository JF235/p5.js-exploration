class Spring {
    /**
     * Cria uma mola
     * @param {p5.Vector} r0 Posição inicial
     * @param {p5.Vector} r1 Posição Final
     * 
     * A mola será desenhada com `no_of_winding` voltas
     * com altura `height` e comprimento `length`.
     * 
     * Toda mola tem também os seguradores `this.holder`
     * identificados por um tamanho padrão
     */
    constructor(r0, r1, no_of_windings = 10, h = 10) {
        this.r0 = r0
        this.r1 = r1
        this.no_of_windings = no_of_windings
        this.height = h
        this.length = p5.Vector.sub(this.r1, this.r0).mag()
        this.holder = this.length * 5/100

        this.strokeWeight = 2
    }

/**
 * Draw a spring from r0 to r1
 * @param {p5.Vector} r0 Posição Inicial
 * @param {p5.Vector} r1 Posição Final
 */
    draw() {
        // Calcula o vetor paralelo e ortogonal ao eixo da mola.
        
        // O vetor paralelo é usado para deslocar para cima e para baixo,
        // dando a "altura da mola"
        var para = p5.Vector.sub(this.r1, this.r0).normalize()
        var desloc_para = p5.Vector.mult(para, this.holder)

        // O vetor ortogonal é usado para deslocar os pontos ao longo
        // do eixo da mola e colocar o `holder`
        var ort = para.copy().rotate(HALF_PI)
        var desloc_ort = p5.Vector.mult(ort, this.height / 2)

        // Os enrolamentos na mola são deslocados para baixo e encolhidos.
        // Criando uma lista de posições correspondentes aos pontos inferiores.
        var r0_windings_down = p5.Vector.add(this.r0, desloc_ort).add(desloc_para)
        var r1_windings_down = p5.Vector.add(this.r1, desloc_ort).sub(desloc_para)
        var pontos_baixo = distribute_evenly_1D(r0_windings_down, r1_windings_down, this.no_of_windings)

        // Desloca os pontos de cima para que eles estejam alinhados
        // a posição média dos pontos de baixo.
        var alinhamento = p5.Vector.sub(pontos_baixo[1], pontos_baixo[0]).mult(1 / 2)
        desloc_ort.mult(-1)
        
        var r0_windings_up = p5.Vector.add(this.r0, alinhamento).add(desloc_ort).add(desloc_para)
        var r1_windings_up = p5.Vector.add(this.r1, alinhamento).add(desloc_ort).sub(desloc_para)
        var pontos_cima = distribute_evenly_1D(r0_windings_up, r1_windings_up, this.no_of_windings)
        // Aqui tem um ponto a mais não sendo usado.
        
        strokeWeight(this.strokeWeight)
        var cor = '#999999'
        var cor_sombreada = '#FDFDFD'
        // Desenha o holder
        stroke(cor)
        line(this.r0.x, this.r0.y, pontos_baixo[0].x, pontos_baixo[0].y)
        stroke(cor_sombreada)
        line(pontos_baixo[this.no_of_windings - 1].x, pontos_baixo[this.no_of_windings - 1].y, this.r1.x, this.r1.y)
        
        // Desenha os enrolamentos da mola
        for (var i = 0; i < this.no_of_windings; i++) {
            if(i != this.no_of_windings - 1){
                stroke(cor)
                line(pontos_cima[i].x, pontos_cima[i].y, pontos_baixo[i + 1].x, pontos_baixo[i + 1].y)
            }
        }

        for (var i = 0; i < this.no_of_windings; i++) {
            if(i != this.no_of_windings - 1){
                stroke(cor_sombreada)
                line(pontos_baixo[i].x, pontos_baixo[i].y, pontos_cima[i].x, pontos_cima[i].y)
            }
        }
    }
}