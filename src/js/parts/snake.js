import {randomInteger} from './randomInt.js';

export class Snake {

    constructor(config={}) {
        /*

            Special objects, which contains coordinate changes.
            Every step, this coords add to snake-coords.
            This way, we can change direction of snake.

        */

        this.TOP    = {x: 0, y: -1};
        this.BOTTOM = {x: 0, y: 1};
        this.RIGHT  = {x: 1, y: 0};
        this.LEFT   = {x: -1, y: 0};

        /*

            This flag blocks a change of direction, 
            when it was done.

        */ 

        this.changeDirectionFlag = true; 

        /* 
            color       - color of snake body
            headColor   - color of snake head
            intialWidth - intial width of snake
            data        - array with snake blocks

            one block should have this properties
            {   
                x: x-coord, 
                y: y-coord, 
                color: color of block,
                direction: direction of block 
                        (It is individuale property, 
                        which shows direction of this 
                        block (NOT SNAKE). 
                        Direction of snake is same with direction of head)
            } 
        */

        this.color = (config.color || 'blue');
        this.headColor = (config.headColor || 'red');
        this.intialWidth = (config.initialWidth || 3);
        this.data = [
            {   
                x: 0, 
                y: 0, 
                color: this.headColor,
                direction: this.BOTTOM
            } 
        ];

        for (let i = 1; i < this.intialWidth; i++) {
            this.addSection();
        }
        
        // defult direction is BOTTOM

        this.direction = this.BOTTOM;
    }

    setEndAction(callback) {
        /* 
            Sets action, which should happens,
            when snake crashes.

        */ 

        this.endAction = callback;
    }

    changeDirection(dir) {
        if (this.changeDirectionFlag) {
            if (dir == "TOP" && this.direction != this.BOTTOM) {
                this.direction = this.TOP;
                this.changeDirectionFlag = false;
            } else if (dir == "LEFT" && this.direction != this.RIGHT) {
                this.direction = this.LEFT;
                this.changeDirectionFlag = false;
            } else if (dir == "RIGHT" && this.direction != this.LEFT) {
                this.direction = this.RIGHT;
                this.changeDirectionFlag = false;
            } else if (dir == "BOTTOM" && this.direction != this.TOP) {
                this.direction = this.BOTTOM;
                this.changeDirectionFlag = false;
            }
        }
    }

    getCoords() {
        return this.data;
    }

    addSection() {
        const lastSection = this.data[this.data.length - 1];
        const section = {
            x: lastSection.x - lastSection.direction.x, 
            y: lastSection.y - lastSection.direction.y, 
            color: this.color,
            direction: lastSection.direction
        };
        this.data.push(section);
    }

    nextStep() {

        this.changeDirectionFlag = true;

        for (let i = 1; i < this.data.length; i++) {
            if (this.data[0].x == this.data[i].x && this.data[0].y == this.data[i].y) {
                this.endAction();
            }
        }

        this.data.reverse();

        for (let i = 0; i < this.data.length - 1; i++) {
            this.data[i].direction = this.data[i + 1].direction;
            this.data[i].x += this.data[i].direction.x;
            this.data[i].y += this.data[i].direction.y;
        }

        this.data.reverse();

        const head = this.data[0];
        head.direction = this.direction;
        head.x += head.direction.x;
        head.y += head.direction.y; 
    }

    getHeadCoords() {
        return this.data[0];
    }
}