class Particle{
    /**
    * Construtor da classe recebe:
    * 
    * - `mass` = valor da massa
    * [padrao = 5]
    * 
    * - `pos` = vetor que indica posição inicial do objeto 
    * [padrao = (0, 0)]
    * 
    * - `vel` = vetor que indica velocidade inicial do objeto  
    * [padrao = (0, 0)]
    * 
    * ---
    * 
    * O construtor é responsável por definir uma estética padrão
    * 
    * - radius = raio da particula (pode ser definido pela massa
    * se estiver entre 3 e 50)
    * [padrao = massa]
    * 
    * - fill_color = cor da particula 
    * [padrao = 255 (branco)]
    * - stroke_color = cor do contorno 
    * [padrao = 0 (preto)]
    * - stroke_weight = tamanho do contorno 
    * [padrao = 1]
    * 
    * - Path
    */
    constructor(mass = 5, pos = createVector(0, 0), vel = createVector(0, 0)){
        this.mass = mass;
        this.pos = pos;

        this.vel = vel;
        
        this.force = createVector(0, 0);
        this.acc = createVector(0, 0);

        // Cosmetica
        if (mass > 50){
            this.radius = 50
        } else if (mass < 3){
            this.radius = 3
        } else {
            this.radius = mass;
        }

        this.stroke = true;
        this.fill = true;

        this.fill_color = 255
        this.stroke_color = 0
        this.stroke_weight = 1

        this.path = new Path();
    }

    /**
     * Desenha a partícula no canvas usando configurações internas.
     * 
     * Posição do desenho = `pos` {p5.Vector}
     * stroke = `stroke_color` {color}
     * strokeWeight = `stroke_weight` {float}
     * fill = `fill_color` {fill_color}
     * 
     * Tem comportamento alterado seguindo os parâmetros booleanos
     * `this.stroke == false` -> `noStroke()`
     * `this.fill == false` -> `noFill()`
     */
    draw(){
        stroke(this.stroke_color);
        strokeWeight(this.stroke_weight);
        fill(this.fill_color);

        if (this.stroke == false){
            noStroke()
        }
        if (this.fill == false){
            noFill()
        }

        ellipse(this.pos.x, this.pos.y, 2 * this.radius)
    }

    /**
     * Desenha uma partícula como uma seta
     */
    drawArrow(b = 0, h = 0){
        // Configurações Padrões
        stroke(this.stroke_color);
        strokeWeight(this.stroke_weight);
        fill(this.fill_color);
        if (this.stroke == false){
            noStroke()
        }
        if (this.fill == false){
            noFill()
        }

        // Tamanho do triângulo definido 
        // pela altura (h) e da base (b)
        if (b == 0){
            b = 10
        }
        if (h == 0){
            h = 15
        }

        // Transformação de coordenadas levando
        // em conta o sentido da velocida.
        // O triângulo sempre aponta na mesma direção
        // que o vetor velocidade (this.vel)
        var angle = atan2(this.vel.y, this.vel.x); 
        push()
        translate(this.pos.x, this.pos.y)
        rotate(angle - HALF_PI)
        triangle(0, h/2, -b/2, -h/2, b/2,-h/2)
        pop()
    }


    /**
     * Desenha o caminho
     */
    drawPath(){
        this.path.draw()
    }

    /**
     *  @TODO Preciso rever
     */
    drawVectors(vel_size = 20, acc_size = 20){
        // Velocidade
        stroke('#FDD171')
        fill('#FDD171')
        arrow2(this.vel.copy().setMag(vel_size), this.pos)
        
        // Aceleracao
        stroke('#FFA78B')
        fill('#FFA78B')
        arrow2(this.acc.copy().setMag(acc_size), this.pos)
    }

    /**
     * Adiciona a forÇa resultante da partícula o vetor
     * que está contido no objeto 'Force'
     * @param {Force} f 
     */
    applyForce(f){
        this.force.add(f.get_vector())
    }


    /**
     * Atualiza a velocidade e posição usando
     * o método de Euler para resolver a segunda
     * Lei de Newton a = F/m
     * 
     * acc = this.force/this.mass
     * vel += acc
     * pos += vel
     * 
     * @TODO Preciso rever o comportamento
     * para velocidades muito grandes.
     * @TODO Como lidar com uma partícula que não desenha seu próprio caminho
     */
    update(){

        // Atualiza estado do objeto.
        this.acc = this.force.copy().mult(1/this.mass)
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        
        // Evita velocidades muito altas.
        if (this.vel.mag() > 10){
            this.vel = createVector(0, 0)
            this.pos = createVector(width/2 + random(-20, 20), height/2 + random(-20, 20))
        }

        // Adiciona as entradas anteriores na lista do caminho
        var record = this.path.record
        var new_position = this.pos.copy();
        record.push(new_position);
        if (record.length > this.path.get_size()){
            record.shift();
        }

        // Reseta a forca
        this.force = createVector(0, 0)
    }

    /**
     * Checa se a partícula não sai do domínio do canvas.
     *     
     * @param {int} coordinates 
     * Se coordinates for 1 (considero que a origem está no UpperLeft)
     * Se coordinates for 2 (considero que a origem está no centro do canvas)
     */
    edges(coordinates){
        if (coordinates == 1){
            if (this.pos.x >= width - this.radius){
                this.pos = createVector(width - this.radius, this.pos.y);
                this.vel.x *= - 1;
            }
            else if (this.pos.x <= this.radius){
                this.pos = createVector(this.radius, this.pos.y);
                this.vel.x *= - 1;
            }
            if (this.pos.y >= height - this.radius){
                this.pos = createVector(this.pos.x, height - this.radius);
                this.vel.y *= - 1;
            }
            else if (this.pos.y <= this.radius){
                this.pos = createVector(this.pos.x, this.radius);
                this.vel.y *= - 1;
            }
        }
        else if (coordinates == 2){
            if (this.pos.x >= width/2 - this.radius){
                this.pos = createVector(width/2 - this.radius, this.pos.y);
                this.vel.x *= - 1;
            }
            else if (this.pos.x <= - width/2 + this.radius){
                this.pos = createVector(- width/2 + this.radius, this.pos.y);
                this.vel.x *= - 1;
            }
            if (this.pos.y >= height/2 - this.radius){
                this.pos = createVector(this.pos.x, height/2 - this.radius);
                this.vel.y *= - 1;
            }
            else if (this.pos.y <= -height/2 + this.radius){
                this.pos = createVector(this.pos.x, -height/2 + this.radius);
                this.vel.y *= - 1;
            }
        }
        else{
            throw 'Nenhum sistema de coordenadas identificado'
        }
    }

    //%%%%%%%%%%%%%%%%%%%%%%%%%%% Getters %%%%%%%%%%%%%%%%%%%%%%%%%%%

    /**
     * Retorna a massa da partícula
     * @returns {float} 
     */
    get_mass(){
        return this.mass
    }

        
    /**
     * Retorna o vetor posição da partícula
     * @returns {p5.Vector}
     */
     get_position(){
        return this.pos
    }

    /**
     * Retorna a posição y da partícula
     * @returns {float}
     */
    get_y(){
        return this.pos.y
    }

    /**
     * Retorna a posição x da partícula
     * @returns {float}
     */
    get_x(){
        return this.pos.x
    }

    /**
     * Retorna a velocidade da partícula
     * @returns {p5.Vector}
     */
    get_velocity(){
        return this.vel
    }

    /**
     * Retorna a aceleração da partícula
     * @returns {p5.Vector}
     */
     get_acceleration(){
        return this.acc
    }

    /**
     * Retorna o caminho da partícula. 
     * É dessa maneira que pode ser editado.
     * @returns {Path}
     */
    get_path(){
        return this.path
    }

    //%%%%%%%%%%%%%%%%%%%%%%%%%%% Setters %%%%%%%%%%%%%%%%%%%%%%%%%%%

    /**
     * 
     * @param {float} mass Nova massa 
     */
    set_mass(mass){
        this.mass = mass
    }

    /**
     * 
     * @param {float} radius Novo raio 
     */
    set_radius(radius){
        this.radius = radius
    }

    /**
     * Seta a nova velocidade da partícula
     * @param {p5.Vector} vel 
     */
    set_velocity(vel){
        this.vel = vel
    }
 
    /**
     * Seta a nova aceleracao da partícula
     * @param {p5.Vector} acc 
     */
    set_acceleration(acc){
        this.acc = acc
    }

    /**
     * Seta a nova cor da partícula
     * @param {color} c 
     */
    set_color(c){
        this.fill_color = c
    }

    /**
     * Seta se o stroke da partícula vai ser visível
     * @param {boolean} stroke
     */
    set_stroke(stroke){
        this.stroke = stroke
    }

    /**
     * Seta a posição da partícula
     * @param {p5.Vector} pos - A nova posição da partícula
     */
    set_position(pos){
        this.pos = pos;
    }
}