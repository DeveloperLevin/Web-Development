const sketch = document.getElementById('sketch');
const size = document.getElementById('size');
const grid = document.getElementsByClassName('grid')[0];
const eraser = document.getElementsByClassName('eraser')[0];
const shade = document.getElementsByClassName('shade')[0];
const clear = document.getElementsByClassName('clear')[0];
const rainbow = document.getElementsByClassName('rainbow')[0];
const color = document.getElementsByClassName('color')[0];

let isPainting = false;
let erasingMode = false;
let rainbowMode = false;
let shadingMode = false;
let uniqueChoice = false;

//set dynamic grid size 
size.addEventListener('input', (e) => {
    e.preventDefault();
    create_div(size.value);
})

//create a grid plate
grid.addEventListener('click', (e) => {
    e.preventDefault();
    create_div()
})

//clears the grid of color and asks user for permission
clear.addEventListener('click', (e) => {
    e.preventDefault();
    const squares = Array.from(document.querySelectorAll('.box'));
    //set all the colors for them as white
    squares.map((s) => {
        s.style.backgroundColor = '#fff';
    })
})

//paint over the grid with white color
eraser.addEventListener('click', (e) => {
    e.preventDefault();
    erasingMode = true;
    all_square()
})

//functionality for when color is picked
color.addEventListener('input', (e) => {
    e.preventDefault();
    uniqueChoice = true;
    all_square()
})

//generates random colors to draw
rainbow.addEventListener('click', (e) => {
    e.preventDefault();
    rainbowMode = true;
    all_square()
})

//shading functionality
rainbow.addEventListener('click', (e) => {
    e.preventDefault();
    shadingMode = true;
    all_square()
})

//add divs in the sketch container
function create_div(size = 16) {
    sketch.innerHTML = "";
    const boxWidth = 100 / size + '%';
    for (let i = 0; i < size * size; i++){
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = boxWidth; 
        box.style.boxSizing = 'border-box';
        sketch.appendChild(box);
        
        all_square()
    }
}

//select all the grid squares to add event listeners to them
function all_square(color = 'black') {
    const canvas = Array.from(document.querySelectorAll('.box'));
    canvas.forEach((square) => {
        square.addEventListener('mousedown', startPainting);
        square.addEventListener('mouseenter', paint);
        square.addEventListener('mouseup', stopPainting);
    })
}

//painting functionality
function startPainting(e) {
    isPainting = true;
    paint(e);
}

function paint(e){
    const random = Math.floor(Math.random() * 255 + 1);
    
    if (!isPainting) return;
    
    const selecteditem = e.target;
    // Change the background color of the cell to indicate painting
    if (erasingMode) {
        selecteditem.style.backgroundColor = 'white';
    }
    else if (rainbowMode) {
        selecteditem.style.backgroundColor = `rgb(${Random()}, ${Random()}, ${Random()})`;
    }
    else if (shadingMode) {
        selecteditem.style.backgroundColor = shading(color.value, 2);
    }
    else if (uniqueChoice) {
        selecteditem.style.backgroundColor = color.value;
    }
    else {
        selecteditem.style.backgroundColor = 'black';
    }
}

function stopPainting(e) {
    if (isPainting){
        isPainting = false;
    }
    else if (erasingMode) {
        erasingMode = false;
    }
    else if (rainbowMode) {
        rainbowMode = false;
    }
    else if (shadingMode) {
        shadingMode = false;
    }
    else if (uniqueChoice) {
        uniqueChoice = false;
    }
}

function shading(c, p) {
   // Convert hexadecimal color to RGB format
   const rgbValues = [
    parseInt(c.slice(1, 3), 16),
    parseInt(c.slice(3, 5), 16),
    parseInt(c.slice(5, 7), 16)
];
// Calculate the shaded RGB values
const newRgbValues = rgbValues.map(value => Math.round(value + (p * (255 - value))));
// Format the new RGB values as 'rgb(r, g, b)'
return `rgb(${newRgbValues.join(', ')})`;
}

//generates random number from 0 to 255
function Random() {
    return Math.floor(Math.random() * 255 + 1);
}