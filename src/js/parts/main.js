import {mainLoop} from './mainLoop';
import {getConfig} from './getConf.js';
import {Snake} from './snake.js';
import {Fruit} from './fruit.js';
import {Board} from './board.js';

export function main() {
    /*
        All properties are optional.
        I want to configurate all game by one object. 
        It will be usefull, if we want to make separate file
        with config or get it by AJAX.

        board = {
            bgColor: "white",
            squareSize: side of squre, (20 defult)
            id: id of canvas, where we want play (snake defult)
        },
        snake = {
            color: color of snake body, (blua defult)
            headColor: color of snake head, (red defult)
            initialWidth: initial length of snake (2 defult)
        },
        fruits = {
            color: color of fruit (green defult)
        }
    */


    const CONFIG = getConfig(
    {
        board: {
            bgColor: "black",
            squareSize: 30
        },
        snake: {
            color: "red",
            headColor: "#378258",
            initialWidth: 3
        },
        ruits: {
            color: "green"
        }
    });

    const scoreBlock = document.querySelector('.score'),
    gameOverBlock = document.querySelector('.popup');
    gameOverBlock.style.display = 'none';

    const board = new Board({
        squareSize: CONFIG.board.squareSize,
        bgColor: CONFIG.board.bgColor,
        id: CONFIG.board.id
    });

    let maxX = board.width - 1,
        maxY = board.height - 1;

    const snake = new Snake({
        color: CONFIG.snake.color,
        headColor: CONFIG.snake.headColor,
        initialWidth: CONFIG.snake.initialWidth
    });

    const fruit = new Fruit([0, maxX], [0, maxY], CONFIG.fruits.color);
    fruit.create();

    mainLoop(board, snake, fruit, scoreBlock, gameOverBlock, 100);

    document.body.addEventListener("keypress", (e) => {
        /*
            I check keypress event and find nessecary keys.

            I use two properties, becouse "code" 
            property is unavailable if IE and Edge.
        */

        const letter = e.key.toLowerCase();

        if (e.code == 'KeyW' || (letter == 'w' || letter == 'ц')) {
            snake.changeDirection("TOP");
        } else if (e.code == 'KeyA' || (letter == 'a' || letter == 'ф')) {
            snake.changeDirection("LEFT");
        } else if (e.code == 'KeyS' || (letter == 's' || letter == 'ы')) {
            snake.changeDirection("BOTTOM");
        } else if (e.code == 'KeyD' || (letter == 'd' || letter == 'в')) {
            snake.changeDirection("RIGHT");
        }
    });

    ['top', 'bottom', 'left', 'right'].forEach(item => {
        
        /*
            So that users can play from the phone or tablet, 
            I made special buttons. Here i check click event.
        */

        document.querySelector(`#${item}`).addEventListener('click', function () {
            snake.changeDirection(item.toUpperCase());
        });
    });
}
