class SystemOfParticles{
    /**
     * Cria um sistema de partículas e coloca
     * todas elas em um array `this.particles`
     * @param {int} no_of_particles
     */
    constructor(no_of_particles){
        this.no_of_particles = no_of_particles
        this.particles = []
        for(var i = 0; i < no_of_particles; i++){
            var p = new Particle()
            this.particles.push(p)
        }
    }

    /**
     * Desenha todas as partículas do sitema
     */
    draw(){
        for(var i = 0; i < this.no_of_particles; i++){
            this.particles[i].draw()
        }
    }


    /**
     * Distribui as partículas uniformemente em uma linha
     * começando de r0 e terminando em r1.
     * @param {p5.Vector} r0 Posição Inicial
     * @param {p5.Vector} r1 Posição Final
     */
    distribute(r0, r1){
        var pos = distribute_evenly_1D(r0, r1, this.no_of_particles)

        for(var i = 0; i < this.no_of_particles; i++){
            this.particles[i].set_position(pos[i])
        }
    }

    /**
     * 
     * @returns Array<Particle>
     */
    get_particles(){
        return this.particles
    }
}