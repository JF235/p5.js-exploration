class Wall{
    /**
     * Draw a Wall from r0 to r1
     * @param {p5.Vector} r0 
     * @param {p5.Vector} r1 
     */
    constructor(r0, r1, no_of_dashes = 12){
        this.r0 = r0
        this.r1 = r1

        this.stroke = '#E8E8E8'
        this.strokeWeight = 2

        this.size = p5.Vector.sub(r1, r0).mag()
        this.n = no_of_dashes

        this.height_factor = 0.7
        this.spacing_factor = 0.4
    }

    /**
     * Desenha a parede
     */
    draw(){
        stroke(this.stroke)
        strokeWeight(this.strokeWeight)
        line(this.r0.x, this.r0.y, this.r1.x, this.r1.y)


        var pontos_baixo = distribute_evenly(this.r0, this.r1, this.n)
        pontos_baixo.shift()
        pontos_baixo.pop()

        var separation = p5.Vector.sub(pontos_baixo[0], pontos_baixo[1]).mag()
        
        var desloc_para = p5.Vector.sub(this.r1, this.r0).normalize()
        var desloc_ort = desloc_para.copy().rotate(-HALF_PI)
        
        desloc_para.mult(separation * this.spacing_factor)
        desloc_ort.mult(separation * this.height_factor)
        
        var pontos_cima = []
        for(var i = 0; i < pontos_baixo.length; i++){
            var v = pontos_baixo[i].copy()
            v.add(desloc_para).add(desloc_ort)
            pontos_cima.push(v)
        }

        for(var i = 0; i < pontos_baixo.length; i++){
            line(pontos_baixo[i].x , pontos_baixo[i].y, pontos_cima[i].x , pontos_cima[i].y )
        }


        
    }
}