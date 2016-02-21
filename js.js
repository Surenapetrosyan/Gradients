window.onload = randomGradient;
//Our background.
var canvas = document.getElementById('canvas');

//First set of RGB values for gradient.
var red1;
var green1;
var blue1;

//Second set of RGB values for gradient.
var red2;
var green2;
var blue2;

//Generates number from 0-255 for non-white RGB value.
function generateNumber() {
  return Math.floor(Math.random() * 255);
}

//Generates 2 random RGB Values and sets the background of our canvas to a gradient using those 2 colors.
function  randomGradient() {
  bootstrap_alert.clear();
  red1 = generateNumber();
  green1 = generateNumber();
  blue1 = generateNumber();
  red2 = generateNumber();
  green2 = generateNumber();
  blue2 = generateNumber();

  canvas.style.backgroundImage = "linear-gradient(to right, rgb(" + red1 + "," + green1 + "," + blue1 + "), rgb(" + red2 + "," + green2 + "," + blue2 + "))";
}

//Converts RGB to Hex.
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

//Converts RGB to Hex.
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r).toUpperCase() + componentToHex(g).toUpperCase() + componentToHex(b).toUpperCase();
}

//Prints alert with the current background CSS code.
function exportToCss(){
  bootstrap_alert.warningWithCode("<em>.yourClassName</em> { </br> background-image: " + canvas.style.backgroundImage + "; </br>}");
}

//Prints alert with hex of color 1.
function logColor1ToHex() {
  bootstrap_alert.warning('Color 1: <strong>' + rgbToHex(red1, green1, blue1) + '</strong>');
}

//Prints alert with hex of color 2.
function logColor2ToHex() {
  bootstrap_alert.warning('Color 2: <strong>' + rgbToHex(red2, green2, blue2) + '</strong>');
}

//Creates alert.
bootstrap_alert = function() {}
bootstrap_alert.warning = function(message) {
            $('#alert_placeholder').html('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+message+'</span></div>');
}

//Creates alert with extra class I created for css export styling.
bootstrap_alert.warningWithCode = function(message) {
            $('#alert_placeholder').html('<div class="alert alert-success alert-dismissable code"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+message+'</span></div>');
}

//Closes alert.
bootstrap_alert.clear = function() {
            $('#alert_placeholder').html('');
}
