/* select elements */

// the main grid / create grid button / reset grid button / input to change grid size / color input / rainbow button / toggle borders button
const mainGrid = document.querySelector('#mainGrid');          
const createGridBtn = document.querySelector('#createGrid');   
const resetGridBtn = document.querySelector('#resetGrid');     
const gridSize = document.querySelector('#inputSize');         
const color = document.querySelector('#color');                
const rainbowBtn = document.querySelector('#rainbow');        
const borderBtn = document.querySelector('#border');            


/* functions */

// create/resize the grid with CSS variable
let gridCreation = () => {                                                          
    document.documentElement.style.setProperty('--gridSize', +gridSize.value)       
        while (mainGrid.childNodes.length > 0) {            // completely deletes the grid
            mainGrid.firstChild.remove();
        }
    if (rainbowCounter%2 == 1) {                            // resets rainbow button in case it was toggled when the grid is created
        rainbowBtn.classList.toggle('rainbow');
        rainbowCounter = 0;
    }
    createGrid(mainGrid, +gridSize.value);  
}

// create grid, add relevant classes, append elements and listeners to mainGrid
let createGrid = (div, size) => {
    for (let i = 0; i < size*size; i++) {
        const gridElement = document.createElement('div');                  
        gridElement.classList.add('gridElement', 'gridBorder'); 
        div.appendChild(gridElement);
        enterRGB(gridElement);
    }
}

let gridColor = (div, color) =>  div.style.backgroundColor = color;

let rainbow = () => `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;    // creates a new string with random rgb values on every call

// color grid element on mousedown and mouseenter (only if left click held)
let enterRGB = (div) => {
    div.addEventListener('mousedown', () => gridColor(div, color.value));
    div.addEventListener('mouseenter', (e) => {
        if(e.buttons == 1) gridColor(div, color.value);
    });
}

let enterRainbow = (div) => {
    div.addEventListener('mousedown', () => gridColor(div, rainbow()));     // same as previous function, but with rainbow (random) colors
    div.addEventListener('mouseenter', (e) => {
        if(e.buttons == 1) gridColor(div, rainbow());
    });
}

let enter = (div, color) => {                                               // same function, but with variable set color
    div.addEventListener('mousedown', () => gridColor(div, color));
    div.addEventListener('mouseenter', (e) => {
        if(e.buttons == 1) gridColor(div, color);
    });
}


/* global listener for erasing */

window.addEventListener('keydown', e => {                           // on keydown, if shiftKey, mousedown/mouseenter will color white
    if (e.shiftKey) {
        for (let i = 0; i < mainGrid.childElementCount; i++) {
            enter(mainGrid.childNodes[i], 'white')
        }
    }
})
window.addEventListener('keyup', e => {                             // on keyup, reassign to previous color or rainbow
    if (!e.shiftKey) {
        for (let i = 0; i < mainGrid.childElementCount; i++) {
            if(rainbowCounter%2 == 0) {
                enterRGB(mainGrid.childNodes[i])
            } else {
                enter(mainGrid.childNodes[i], rainbow())
            }
        }
    }
})

/* button listeners */

createGridBtn.addEventListener('click', () => gridCreation());      // create a new grid with gridSize.value rows/columns

window.addEventListener('keypress', e => {if(e.key == 'n') gridCreation()} )

// on click, recolors every grid element white
resetGridBtn.addEventListener('click', () => resetGridFn());

window.addEventListener('keypress', e => {if(e.key == 'c') resetGridFn()} )

resetGridFn = () => {
    for (let i = 0; i < mainGrid.childElementCount; i++){
        mainGrid.childNodes[i].style.backgroundColor = 'white';
    }
}

let rainbowCounter = 0;

// mousedown/mouseenter function with random colors, counter to enable or disable
rainbowBtn.addEventListener('click', () => rainbowFn())

window.addEventListener('keypress', e => {if(e.key == 'r') rainbowFn()} )

let rainbowFn = () => {
    rainbowBtn.classList.toggle('rainbow')
    if (rainbowCounter%2 == 0) {
        for (let i = 0; i < mainGrid.childNodes.length; i++) {
            enterRainbow(mainGrid.childNodes[i])
        }
    } else {
        for (let i = 0; i < mainGrid.childNodes.length; i++) {
            enterRGB(mainGrid.childNodes[i])
        }
    }
    rainbowCounter++;
}


borderBtn.addEventListener('click', () => borderFn());

window.addEventListener('keypress', e => {if(e.key == 'b') borderFn()} )

let borderFn = () => {
    for (let i = 0; i < mainGrid.childNodes.length; i++) {
        mainGrid.childNodes[i].classList.toggle('gridBorder');
    }
}


gridCreation();         // on load, create a 16x16 grid by default