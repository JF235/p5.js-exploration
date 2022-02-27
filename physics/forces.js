
class Force{
    /**
     * Essa força geral, a princío é responsável por somente ser um vetor.
     * 
     * @param {p5.Vector} force_vector Um vetor que representa uma força qualquer.
     */
    constructor(force_vector){
        this.vector = force_vector
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

class UniversalGravity extends Force{
    constructor(particle, source, G = 200){
         // Constante para alterar a força
        var r = createVector(source.get_x() - particle.get_x(),  source.get_y() - particle.get_y()) // Vetor separação
        var m1 = particle.get_mass()
        var m2 = source.get_mass()
        
        super(r.mult(G * m1 * m2/r.mag()**3))
    }
}

class UniformGravity extends Force{
    /**
     * 
     * @param {float} particle partícula
     * @param {float} factor fator (por padrão = 1/100)
     */
    constructor(particle, factor = 1/100){
        var scaled_gravity = 9.8 * factor
        var m = particle.get_mass()

        super(createVector(0, 1).mult(m * scaled_gravity))
    }
}

class Drag extends Force{
    constructor(particle, k = 3){
        var v = particle.get_velocity().copy()
        
        // Aqui elas são truncadas se |v| < 0.05 ou |v| > 1
        if (v.mag() < 0.05){
            this.vector = createVector(0, 0)
            particle.set_velocity(createVector(0, 0))
        }
        else if(v.mag() > 1){
            super(v.copy().normalize().mult(-1 * k * v.mag() * v.mag()))
        }
        else{
            super(v.copy().mult(-1 * k * v.mag() * v.mag()))
        }
    }
}

class Friction extends Force{
    /**
     * 
     * @param {Particle} particle partícula
     * @param {float} mu coeficiente de atrito (default = 0.15)
     * @param {float} N normal 
     */
    constructor(particle, mu = 0.15, N = 1){
       // A velocidade da partícula é usada para parar a partícula quando
       // esta estiver muito devagar.

       // É preciso tomar cuidado ao normalizar o vetor.
       // Pois, a velocidade dele pode ser menor que 1, de maneira
       // que o vetor unitário é maior que o vetor normal.

       // @TODO não entendi direito esse comportamento
        var v = particle.get_velocity().copy()

        if (v.mag() < 0.001){
            super(createVector(0, 0))
            particle.set_velocity(createVector(0, 0))
        }
        else if(v.mag() > 1){
            super(v.copy().normalize().mult(-1 * N * mu))
        }
        else{
            super(v.copy().mult(-1 * N * mu))
        }
    }
}

class SpringForce extends Force{
    /**
     * 
     * @param {p5.Vector} end Ponto onde a mola segura algo.
     * @param {p5.Vector} fixed_end Ponto onde a mola está fixa.
     * @param {float} relax_length Comprimeto relaxado da mola.
     * @param {float} k Constante Elástica da mola
     * 
     * - Se colocar `relax_length` como 0, então há uma força
     * proporcional a distância do ponto `fixed_end` 
     */
    constructor(fixed_end, end, relax_length = 0, k = 0.1){
        var total_lenght = p5.Vector.sub(end, fixed_end).mag()
        var displacement = total_lenght - relax_length
        var r_script = p5.Vector.sub(end, fixed_end).normalize()

        super(r_script.mult(- k * displacement))
    }
}