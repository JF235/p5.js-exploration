class Force{
    /**
     * 
     * @param {String} type Natureza da Força
     * 
     * - `'uniform gravity'`
     * - `'universal gravity'`
     * - `'universal gravity trunc'`
     * - `'friction'`
     * - `'drag'`
     * @param {Particle} particle 
     * @param {} source 
     */
    constructor(type = undefined, particle = undefined, source = undefined){
        if (type == 'uniform gravity'){
            var scaled_gravity = 9.8/100
            var m = particle.get_mass()

            this.vector = createVector(0, 1).mult(m * scaled_gravity)
        }
        else if (type == 'attraction'){
            var r = createVector(source.x - particle.pos.x,  source.y - particle.pos.y)
            
            this.vector = r.mult(1000/r.mag()**3)

            if (this.vector.mag() > 3){
                this.vector.setMag(3)
            }
        }
        else if (type == 'universal gravity'){
            var G = 200
            var r = createVector(source.get_x() - particle.get_x(),  source.get_y() - particle.get_y())
            var m1 = particle.get_mass()
            var m2 = source.get_mass()

            if(source != undefined){
                this.vector = r.mult(G * m1 * m2/r.mag()**3)
            }
            else {
                throw 'errado'
            }
        }
        else if (type == 'universal gravity trunc'){
            throw 'Não está implementado'
        }
        else if (type == 'friction'){
            var v = particle.get_velocity().copy()
            var m = particle.get_mass()
            var scaled_gravity = 9.8/100
            var mu = 0.15; // Contato entre materiais
            var N = m * scaled_gravity

            if (v.mag() < 0.001){
                this.vector = createVector(0, 0)
                particle.set_velocity(createVector(0, 0))
            }
            else if(v.mag() > 1){
                this.vector = v.copy().normalize().mult(-1 * N * mu)
            }
            else{
                this.vector = v.copy().mult(-1 * N * mu)
            }
        }
        else if (type == 'drag'){
            var v = particle.get_velocity().copy()
            var k = 3// Constante que depende da area, do fluido e da constante.
            
            if (v.mag() < 0.05){
                this.vector = createVector(0, 0)
                particle.set_velocity(createVector(0, 0))
            }
            else if(v.mag() > 1){
                this.vector = v.copy().normalize().mult(-1 * k * v.mag() * v.mag())
            }
            else{
                this.vector = v.copy().mult(-1 * k * v.mag() * v.mag())
            }
        }
        else{
            this.vector = createVector(0, 0)
        }
    }

    /**
     * Retorna o vetor força que age sobre a partícula
     * @returns {p5.Vector}
     */
    get_vector(){
        return this.vector
    }

    /**
     * Define um vetor customizado para determinada força
     * @param {p5.Vector} vector 
     */
    set_vector(vector){
        this.vector = vector
    }
}