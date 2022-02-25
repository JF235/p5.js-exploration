class Arrow{
    constructor(r0, r1){
        this.r0 = r0
        this.r1 = r1

        this.size = p5.Vector.sub(r0, r1).mag()
        this.tip_height = 0.2 * this.size
        this.tip_width = 0.8 * this.tip_height

        this.weight = 2
        //this.color = 'white'
    }

    draw(){
        this.adjust_proportions()
        
        //stroke(this.color)
        //fill(this.color)
        strokeWeight(this.weight)
        line(this.r0.x, this.r0.y, this.r1.x, this.r1.y);
        
        var angle = atan2(this.r0.y - this.r1.y, this.r0.x - this.r1.x);
        
        push()
        translate(this.r1.x, this.r1.y); 
        rotate(angle-HALF_PI);
    
        noStroke()
        triangle(-this.tip_width/2, 0, 0, -this.tip_height, this.tip_width/2, 0);
        pop();
    }

    /**
     * Ajusta a proporção entre
     * o tamanho da cabeça da flecha
     */
    adjust_proportions(){
        this.weight = this.size/25
        this.tip_height = 0.2 * this.size
        this.tip_width = 0.8 * this.tip_height

        if(this.size/25 <= 3){
            this.weight = 3
            this.tip_height = 3*4
            this.tip_width = 0.8 * this.tip_height
        }

        if(this.size/25 >= 9){
            this.weight = 9
            this.tip_height = 9*4
            this.tip_width = 0.8 * this.tip_height
        }
    }
}

/**
 * Desenha uma flecha de `r0` até `r1`
 * @param {p5.Vector} r0 Posição Inicial
 * @param {p5.Vector} r1 Posição Final
 */
function arrow(r0, r1){
    var arr = new Arrow(r0, r1)
    arr.draw()
}

/**
 * Desenha o vetor `vector` com origem em `origin`
 * @param {p5.Vector} vector Vetor a ser desenhado
 * @param {p5.Vector} origin Origem de onde o vetor será desenhado
 */
function arrow2(vector, origin){
    arrow(origin, p5.Vector.add(vector, origin))
}