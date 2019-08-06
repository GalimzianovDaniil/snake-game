
import {main} from './parts/main.js';


document.addEventListener("DOMContentLoaded", function() {

    const button = document.getElementById('restart');

    main();

    button.addEventListener('click', function() {
        main(); 
    });
   
});