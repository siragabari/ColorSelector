"use-strict";
window.addEventListener('load', start);

let color;
let hex;
let rgb;
let hsl;

function start() {
    console.log("start");
    color = document.getElementById("color");
    color.addEventListener('input', getColor);
}

function getColor() {
    hex = color.value;
    rgb = hexToRgb().r + '.' + hexToRgb().g + '.' + hexToRgb().b;
    hsl = Math.round(rgbToHsl(hexToRgb().r,hexToRgb().g,hexToRgb().b).h,0) + '%.' + Math.round(rgbToHsl(hexToRgb().r,hexToRgb().g,hexToRgb().b).s,0) + '%.' + Math.round(rgbToHsl(hexToRgb().r,hexToRgb().g,hexToRgb().b).l,0) + '%';
    // Display
    let colorDisplay = document.getElementById("colorDisplay");
    colorDisplay.style.backgroundColor = hex;
    let hexColor = document.getElementById("hex");
    hexColor.innerHTML = 'HEX: ' + hex;
    let rgbColor = document.getElementById("rgb");
    rgbColor.innerHTML = 'RGB: ' + rgb;
    let hslColor = document.getElementById("hsl");
    hslColor.innerHTML = 'HSL: ' + hsl; 
}

function hexToRgb() {
    let result = [];
    result.r = parseInt(''+hex[1]+hex[2], 16);
    result.g = parseInt(''+hex[3]+hex[4], 16);
    result.b = parseInt(''+hex[5]+hex[6], 16);
    return result;
}

function rgbToHsl(r,g,b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let result = [];

    const min = Math.min(r,g,b);
    const max = Math.max(r,g,b);
    
    if( max === min ) {
        result.h = 0;
    } else
    if (max === r) {
        result.h = 60 * (0 + (g - b) / (max - min) );
    } else
    if (max === g) {
        result.h = 60 * (2 + (b - r) / (max - min) );
    } else
    if (max === b) {
        result.h = 60 * (4 + (r - g) / (max - min) );
    }
    
    if (result.h < 0) {result.h = result.h + 360; }
    
    result.l = (min + max) / 2;
    
    if (max === 0 || min === 1 ) {
        result.s = 0;
    } else {
        result.s = (max - result.l) / ( Math.min(result.l,1-result.l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    result.s *= 100;
    result.l *= 100;

    return result;
}
