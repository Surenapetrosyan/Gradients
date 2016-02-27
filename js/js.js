//Generates random gradient on site load.
window.onload = randomGradient;

//Checks if device is IOS device, ios devices don't support color picking.
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;


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

//The randomly generated colors.
var color1;
var color2;

//The left and right solid color preview swatches.
var leftSwatch = document.getElementById('leftSwatch');
var rightSwatch = document.getElementById('rightSwatch');

var leftToggle = document.getElementById('leftToggle');
var rightToggle = document.getElementById('rightToggle');

//Styling for ios devices that don't support color picking.
if(iOS) {
$( leftSwatch ).replaceWith( "<div>" + $( leftSwatch ).text() + "</div>" );
$( rightSwatch ).replaceWith( "<div>" + $( leftSwatch ).text() + "</div>" );
leftHexCode.style.paddingBottom = "70px";
leftToggle.style.top = "172px";

rightHexCode.style.paddingBottom = "70px";
rightToggle.style.top = "172px";

}


//Is swatch locked variables.
var leftSwatchLocked = false;
var rightSwatchLocked = false;

//The current colors of a gradient used for locking colors.
var currentColor1;
var currentColor2;

//Fallback color for unsupported browsers.
var fallbackColor;

//Generates number from 0-255 for non-white RGB value.
function generateNumber() {
  return Math.floor(Math.random() * 255);
}

//Generates the 2 colors.
function generateColors() {
  red1 = generateNumber();
  green1 = generateNumber();
  blue1 = generateNumber();
  red2 = generateNumber();
  green2 = generateNumber();
  blue2 = generateNumber();

  color1 = rgbToHex(red1, green1, blue1);
  color2 = rgbToHex(red2, green2, blue2);
}

//Needs to be called once.
generateColors();
currentColor1 = color1;
currentColor2 = color2;
fallbackColor = color1;

//Creates the gradient from the 2 generated colors.
function  randomGradient() {

  bootstrap_alert.clear();
  generateColors();

  if(!rightSwatchLocked && !leftSwatchLocked) {
    canvas.style.backgroundImage = "linear-gradient(to right, " + color1 + "," + color2 + ")";
    updateHexCodes(color1, color2);
    updateSwatches(color1, color2);
    currentColor1 = color1;
    currentColor2 = color2;
    fallbackColor = color1;
  } else if (leftSwatchLocked && !rightSwatchLocked) {
    canvas.style.backgroundImage = "linear-gradient(to right, " + currentColor1 + "," + color2 + ")";
    updateHexCodes(currentColor1, color2);
    updateSwatches(currentColor1, color2);
    currentColor2 = color2;
    fallbackColor = currentColor1;
  } else if (!leftSwatchLocked && rightSwatchLocked ) {
    canvas.style.backgroundImage = "linear-gradient(to right, " + color1 + "," + currentColor2 + ")";
    updateHexCodes(color1, currentColor2);
    updateSwatches(color1, currentColor2);
    currentColor1 = color1;
    fallbackColor = color1;
  }
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
  bootstrap_alert.warningWithCode("<em>.yourClassName</em> { </br> background: " + fallbackColor + "; /* fallback for unsupported browsers */ </br> " + "background: -webkit-" + canvas.style.backgroundImage +  "; </br>background: " + canvas.style.backgroundImage + "; </br>}");
}

//Creates alert.
bootstrap_alert = function() {}

//Creates alert with extra class I created for css export styling.
bootstrap_alert.warningWithCode = function(message) {
            $('#alert_placeholder').html('<div class="alert alert-success alert-dismissable code"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+message+'</span></div>');
}

//Closes alert.
bootstrap_alert.clear = function() {
            $('#alert_placeholder').html('');
}

//Updates the hex codes.
updateHexCodes = function(leftColor, rightColor)  {
  $('#leftHexCode').html('<h2>'+ leftColor.toUpperCase() +'</h2>');
  $('#rightHexCode').html('<h2>'+ rightColor.toUpperCase() +'</h2>');
}

//Updates solid swatches.
updateSwatches = function(leftColor, rightColor) {
  leftSwatch.style.backgroundColor = leftColor;
  leftSwatch.value = leftColor;
  rightSwatch.style.backgroundColor = rightColor;
  rightSwatch.value = rightColor;
}

//Left toggle Code.
$(function() {
    $('.leftToggle').on('click', function() {
      if ($(this).hasClass('on')) {
         $(this).removeClass('on');
         leftSwatchLocked = false;
      } else {
         $(this).addClass('on');
         leftSwatchLocked = true;
      }
    });
  });

  //Right toggle code.
  $(function() {
      $('.rightToggle').on('click', function() {
        if ($(this).hasClass('on')) {
           $(this).removeClass('on');
           rightSwatchLocked = false;
        } else {
           $(this).addClass('on');
           rightSwatchLocked = true;
        }
      });
    });

    $('#leftSwatch').on('change', function() {

    if (!leftSwatchLocked && rightSwatchLocked ) {
          color1 = this.value;
          fallbackColor = this.value;
          currentColor1 = this.value;
          canvas.style.backgroundImage = "linear-gradient(to right, " + this.value + "," + currentColor2 + ")";
          updateSwatches(this.value, currentColor2);
          updateHexCodes(this.value, currentColor2);
        } else {
          color1 = this.value;
          fallbackColor = this.value;
          currentColor1 = this.value;
          canvas.style.backgroundImage = "linear-gradient(to right, " + this.value + "," + color2 + ")";
          updateSwatches(this.value, color2);
          updateHexCodes(this.value, color2);
        }


    });

    $('#rightSwatch').on('change', function() {
      if (leftSwatchLocked && !rightSwatchLocked ) {
            color2 = this.value;
            currentColor2 = this.value;
            canvas.style.backgroundImage = "linear-gradient(to right, " + currentColor1 + "," + this.value + ")";
            updateSwatches(currentColor1, this.value);
            updateHexCodes(currentColor1, this.value);
          } else {
            color2 = this.value;
            currentColor2 = this.value;
            canvas.style.backgroundImage = "linear-gradient(to right, " + color1 + "," + this.value + ")";
            updateSwatches(color1, this.value);
            updateHexCodes(color1, this.value);
          }
    });
