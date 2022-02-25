class Path{
    /**
     * 
     * @param {int} size Tamanho do caminho
     * @param {color} path_color Cor do Caminho
     * @param {float} path_weight Espessura do caminho
     * 
     * Nas configurações padrões
     * - `size = 10`
     * - `path_color = 255` (branca)
     * - `path_weight = 3`
     * - `fade = false`
     * - `points = false`
     * - `lines = true`
     * - `fade_style = 'linear'`
     */
    constructor(size = 10, path_color = 255, path_weight = 3){
        this.size = size
        this.color = path_color
        this.weight = path_weight
        
        this.fade = false
        this.points = false 
        this.lines = true

        this.fade_style = 'linear'

        // Posições anteriores
        this.record = []
    }

    /**
     * Desenha todo o caminho registrado em `this.record`
     * levando em conta os parâmetros
     * - `this.color`
     * - `this.weight`
     * - `this.fade` e `this.fade_style`
     * 
     * @TODO ajuste no overlap de caminho durante fade
     */
    draw(){
        // Configurações
        var c = color(this.color);
        strokeWeight(this.weight)
        noFill()
        
        // Desenha todos os pontos (se this.points == true) 
        // e os liga com linha (se this.lines == false)
        for(var i = 0; i < this.record.length; i++){
            if (this.fade){
                if(this.fade_style == 'linear'){
                    stroke(c.levels[0], c.levels[1], c.levels[2], i/this.record.length * 255)
                }
                else if(this.fade_style == 'senoidal'){
                    stroke(c.levels[0], c.levels[1], c.levels[2], sin(i/this.record.length * PI/2) * 255)
                }
                else if(this.fade_style == 'exponential'){
                    stroke(c.levels[0], c.levels[1], c.levels[2], exp(-(this.record.length - i)/10) * 255)
                }
            }
            else{
                stroke(c);
            }
            
            
            if (this.points){
                point(this.record[i].x, this.record[i].y)
            }
            
            if (this.lines){
                if (i != 0){ 
                    // Ajuste de overlap
                    // @TODO
                    /*
                    var dx = this.record[i].x - this.record[i - 1].x
                    var dy = this.record[i].y - this.record[i - 1].y
                    */

                    line(this.record[i].x , this.record[i].y , this.record[i - 1].x, this.record[i - 1].y)
                }
            }
        }
    }

    //%%%%%%%%%%%%%%%%%%%% Setters %%%%%%%%%%%%%%%%%%%%

    /**
     * 
     * @param {boolean} fade Se o caminho tem efeito de fade
     */
    set_fade(fade){
        this.fade = fade
    }


    /**
     * 
     * @param {String} fade_style Nome do estilo
     * 
     * Entre as opções
     * - `linear`
     * - `senoidal`
     * - `exponential`
     */
    set_fade_style(fade_style){
        this.fade_style = fade_style
    }


    /**
     * 
     * @param {float} weight 
     */
    set_weight(weight){
        this.weight = weight
    }


    /**
     * 
     * @param {boolean} lines Se as linhas são desenhadas no caminho
     */
    set_lines(lines){
        this.lines = lines
    }

    /**
     * 
     * @param {boolean} points Se os pontos são desenhadas no caminho
     */
    set_points(points){
        this.points = points
    }

    /**
     * 
     * @param {color} color 
     */
    set_color(color){
        this.color = color
    }


    /**
     * 
     * @param {int} size Tamanho do registro de caminho
     * `this.record`
     */
    set_size(size){
        this.size = size
    }

    //%%%%%%%%%%%%%%%%%%%% Getters %%%%%%%%%%%%%%%%%%%%

    /**
     * 
     * @returns {int} size - tamanho do record
     */
    get_size(){
        return this.size
    }
}