export class Board {
    constructor(obj={}) {

        /*
            
            Board is responsive. Sizes of board 
            depend on sizes of parent.

            this.squareSide - all board consists of squres of same sizes.
                              Also, this property nessecary to calculate 
                              size of board (canvas) and x-coords and y-coords.

            this.bgColor    - board background color.
            
        */

        this.squareSide = (obj.squareSize || 20);
        this.bgColor = (obj.bgColor || "white");

        this.canvas = document.getElementById((obj.id || 'snake')); // geting canvas

        /*

            Calculating height and width in squres.
            Height and width are integer numbers. 
            This is necessary so that the board contains 
            an even number of squares.

        */ 

        this.height = Math.floor(this.canvas.parentElement.offsetHeight / this.squareSide);
        this.width = Math.floor(this.canvas.parentElement.offsetWidth / this.squareSide);

        /*
            Geting context and adding attributes 
            with width and height(in px)
        */

        this.ctx = this.canvas.getContext("2d"); 
        this.canvas.setAttribute('width', this.squareSide * this.width);
        this.canvas.setAttribute('height', this.squareSide * this.height);

    }

    setBlock(coord_x, coord_y) {

        /*

            It calculates and draws squre.
            Also it helps abstract from pixel-system.s

        */

        this.ctx.fillRect(
            this.squareSide * coord_x,
            this.squareSide * coord_y,
            this.squareSide,
            this.squareSide
        );
    }

    clear() {
        // fills all board by bg color

        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(
            0, 0,
            this.width * this.squareSide,
            this.height * this.squareSide);
    }

    setItem(item) {

        /* 

            Accepts objects with special interface "getCoords()".
            It should returns an array of objects:

            {
                x: x-coord, - nessacary
                y: y-coord, - nessacary 
                color: color - optional
            }

            Then then iterates over the array with the values.

            If x-coord is bigger than width or equal to it, then 
            it changes on zero.

            If x-coord is less than zero, then 
            it changes on value which equals to width. 

            So, if the object goes outside the board, 
            he'll be back on the reverse side.

            The same thing happens with y-coord.

        */ 

        item.getCoords().forEach(item => {
            this.ctx.fillStyle = (item.color || 'black');

            if (item.x >= this.width) {
                item.x = 0;
            } else if (item.x < 0) {
                item.x = this.width - 1;
            }

            if (item.y >= this.height) {
                item.y = 0;
            } else if (item.y < 0) {
                item.y = this.height - 1;
            }

            this.setBlock(item.x, item.y);
        });
    }

    checkCollision(fruit, snake) {

        /*

            It checks collision between fruits and snake-head.
            If snake eat fruit, snake become longer and 
            fruit status becomes false and we can 
            create new coords with fruit.

        */

        const snakeHeadCoords = snake.getHeadCoords(),
              fruitCoords = fruit.getCoords()[0];

        if (snakeHeadCoords.x == fruitCoords.x && snakeHeadCoords.y == fruitCoords.y) {
            snake.addSection();
            fruit.status = false;
        }
    }
}