import {randomInteger} from './randomInt.js';

export class Fruit {

    /*
        This class creates objects, which will 
        draw fruit for snake.
    */

    constructor(coords_x, coords_y, color) {

        /*

            Fruit is drawn in random places. 
            
            coords_x - cares max x-coord and min x-coord, 
            where fruit can be drawn.

            coords_y - cares max y-coord and min y-coord, 
            where fruit can be drawn.

            color - color of fruit.

        */

        this.coords_x = coords_x;
        this.coords_y = coords_y;

        /*
            Object cares relevant coords.
            Coords are updated every time, when snake eat it.
        */ 

        this.coords = [{
            x: randomInteger(coords_x[0], coords_x[1]), 
            y: randomInteger(coords_y[0], coords_y[1]),
            color: (color || "green")
        }];

        /*  

            Status allows you to know if the fruit was eaten
            Status are updated every time, when snake eat it.

        */ 

        this.status = false;
    }

    create() {

        /*

            Here we trys to create new fruit on board.

            If fruit was eaten by snake, then coords 
            applys and board change status on false. 
            It means, that there is no fruits on board 
            and we should create one more. Coords are updated.

            If fruit wasn't eaten by snake, status steel 
            be true and coords aren't updated 

        */

        if (this.status == false) {
            this.coords[0].x = randomInteger(this.coords_x[0], this.coords_x[1]);
            this.coords[0].y = randomInteger(this.coords_y[0], this.coords_y[1]);
            this.status = true;
        }
    }

    getCoords() {
        return this.coords;
    }

}