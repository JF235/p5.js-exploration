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


class Rope{
    constructor(N, length, individual_rest_len, k){
        this.N = N
        this.length = length
        this.individual_rest_len = individual_rest_len
        this.k = k

        this.particles = []

        for (var i = 0; i < N; i++){
            var p = new Particle(5, createVector(300, length/N * i))
            this.particles.push(p)
          }
    }

    update(){
        for (var i = 0; i < this.N; i++){
            if(i != 0){
              var f1 = new SpringForce(this.particles[i].get_position(), this.particles[i - 1].get_position(), this.individual_rest_len, this.k)
              var f2 = new SpringForce(this.particles[i - 1].get_position(), this.particles[i].get_position(), this.individual_rest_len, this.k)
              var g = new UniformGravity(this.particles[i], 1/100)
              var fric = new Friction(this.particles[i],)
        
              this.particles[i - 1].applyForce(f1)
              this.particles[i].applyForce(f2)
              this.particles[i].applyForce(g)
              this.particles[i].applyForce(fric)
            }
          }
        
          for (var i = 0; i < this.N; i++){
            this.particles[i].update()
        
            if(i == 0){
                this.particles[i].set_position(createVector(300, 0))
                this.particles[i].set_velocity(createVector(0,0))
            }
          }
        
        
          if (mouseIsPressed){
            this.particles[this.N - 1].set_position(createVector(mouseX, mouseY))
            this.particles[this.N - 1].set_velocity(createVector(0 , 0))
          }
    }

    draw(){   
        for (var i = 0; i < this.N; i++){
        
            if(i != 0){
              strokeWeight('2')
              stroke('white')
              line(this.particles[i - 1].get_x(), this.particles[i - 1].get_y(), this.particles[i].get_x(), this.particles[i].get_y())
            }
          }
    }
}