'use strict';

/*
    GetConfig() merge defualt settings 
    with user settings and return obj.
    
*/

export function getConfig(userSettings) {

    let board = {
        bgColor: "white",
        squareSize: 20,
        id: "snake"
    },
    snake = {
        color: "blue",
        headColor: "red",
        initialWidth: 2
    },
    fruits = {
        color: "green"
    };

    return {
        board: mergeSettings(board, userSettings.board),
        snake: mergeSettings(snake, userSettings.snake),
        fruits: mergeSettings(fruits, userSettings.fruits)
    };
}

function mergeSettings(defSettings, customSettings) {
    if (customSettings) {
        for (let key in defSettings) {
            defSettings[key] = (customSettings[key] || defSettings[key]);
        }
    }
    return defSettings;
}