class Oscilador{
    constructor(particle1, particle2, relax_length, k){
        this.particle1 = particle1
        this.particle2 = particle2

        this.pos1 = particle1.get_position().copy()
        this.pos2 = particle2.get_position().copy()
        
        // Forca que age em 1
        this.spring_force1 = new SpringForce(this.pos2, this.pos1, relax_length) 
        
        // Forca que age em 2
        this.spring_force2 = new SpringForce(this.pos1, this.pos2, relax_length)

        this.relax_length = relax_length
        this.k = k
    }  

    draw(){
        var s = new Spring(this.pos1, this.pos2)
        s.draw()

        this.particle1.draw()
        this.particle2.draw()
    }

    drawCentroid(){
        var R = this.calculateCentroid()
        fill('red')
        ellipse(R.x, R.y, 10)
    }

    calculateCentroid(){
        var r1 = this.pos1.copy()
        var r2 = this.pos2.copy()
        var m1 = this.particle1.get_mass()
        var m2 = this.particle2.get_mass()

        var R = p5.Vector.add(r1.mult(m1), r2.mult(m2))
        R = R.div(m1 + m2)

        return R
    }

    /**
     * - Calcula as forças da mola para ambas partículas nas posições atuais.
     * 
     * - Aplica a força em cada uma das partículas, 
     * considerando para cada uma, que a outra é um ponto fixo.
     * 
     * - Para cada partícula executa `.uptade()`
     * 
     * - Atualiza a variável do oscilador que guarda a posição das partículas.
     */
    update(){        
        // Forca que age em 1
        this.spring_force1 = new SpringForce(this.pos2, this.pos1, this.relax_length, this.k) 
        
        // Forca que age em 2
        this.spring_force2 = new SpringForce(this.pos1, this.pos2, this.relax_length, this.k)
        
        this.particle1.applyForce(this.spring_force1)        
        this.particle2.applyForce(this.spring_force2)

        this.particle1.update()
        this.particle2.update()

        this.pos1 = this.particle1.get_position().copy()
        this.pos2 = this.particle2.get_position().copy()
    }

    applyForce(f1, f2){
        this.particle1.applyForce(f1)
        this.particle1.applyForce(f2)
    }

    edges(coordinates){
        this.particle1.edges(coordinates)
        this.particle2.edges(coordinates)
    }

    get_particle1(){
        return this.particle1
    }

    get_particle2(){
        return this.particle2
    }

    get_pos1(){
        return this.pos1
    }

    get_pos2(){
        return this.pos2
    }
}