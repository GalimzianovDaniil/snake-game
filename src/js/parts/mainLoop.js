export function mainLoop(board, snake, fruit, scoreBlock, gameOverBlock, speed) {
    const interval = setInterval(function () {
        board.clear();
        snake.nextStep();
        fruit.create();
        board.setItem(fruit);     
        board.setItem(snake);
        scoreBlock.textContent = snake.data.length;
        board.checkCollision(fruit, snake);
    }, speed);

    snake.setEndAction(function () {
        clearInterval(interval);
        gameOverBlock.style.display = 'block';
    });
}  