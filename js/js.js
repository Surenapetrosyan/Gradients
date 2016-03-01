//The url for parsing.
var url =  window.location.href;;

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

  leftHexCode.style.paddingBottom = "30px";
  rightHexCode.style.paddingBottom = "30px";

  leftToggle.style.top ="155px";
  rightToggle.style.top ="155px";
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
currentColor1 = color1;
currentColor2 = color2;
fallbackColor = color1;

//Changes gradient based on URL.
function parseURL(theURL) {
    var hex1SliceMark2 = theURL.length -7;
    var hex1SliceMark1 = hex1SliceMark2 -7;

    var hex2SliceMark2 = theURL.length;
    var hex2SliceMark1 = hex2SliceMark2 -7;


    var urlHex1 = theURL.slice(hex1SliceMark1,hex1SliceMark2);
    var urlHex2 = theURL.slice(hex2SliceMark1,hex2SliceMark2);

    if(urlHex1.length == 7 && urlHex2.length == 7 && urlHex1.startsWith('#') && urlHex2.startsWith('#')) {
      updateColors(urlHex1, urlHex2);
    } else {
      randomGradient();
    }
}


//Updates all ways that indicate color.
function updateColors(firstColor, secondColor) {
  canvas.style.backgroundImage = "linear-gradient(to right, " + firstColor + "," + secondColor + ")";
  updateHexCodes(firstColor, secondColor);
  updateSwatches(firstColor, secondColor);
  color1 = firstColor;
  color2 = secondColor;
  currentColor1 = firstColor;
  currentColor2 = secondColor;
  fallbackColor = firstColor;

  document.location.hash = firstColor+secondColor;
  url = window.location.href;

}

//Creates the gradient from the 2 generated colors.
function  randomGradient() {
  bootstrap_alert.clear();
  generateColors();

  if(!rightSwatchLocked && !leftSwatchLocked) {
    updateColors(color1, color2);
  } else if (leftSwatchLocked && !rightSwatchLocked) {
    updateColors(currentColor1, color2);
  } else if (!leftSwatchLocked && rightSwatchLocked ) {
    updateColors(color1, currentColor2);
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
            $('#alert_placeholder').html('<div class="alert alert-success alert-dismissable code"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+message+'</span> <hr> <p class="share">Like what I do here? I do it for the <a href="http://twitter.com/share?hashtags=WebDesign,WebDev,Design&via=WebDevSuren&url=http://gradients.online&text=Quickly%20generate%20beautiful%20gradients%20you%20can%20share%20with%20your%20friends!&">tweets!</a></p></div>');
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
    if ($(this).hasClass('fa-unlock')) {
       $(this).removeClass('fa-unlock');
       $(this).addClass('fa-lock');
       leftSwatchLocked = true;
    } else {
       $(this).removeClass('fa-lock');
       $(this).addClass('fa-unlock');
       leftSwatchLocked = false;
    }
  });
});

  //Right toggle code.
$(function() {
  $('.rightToggle').on('click', function() {
    if ($(this).hasClass('fa-unlock')) {
       $(this).removeClass('fa-unlock');
       $(this).addClass('fa-lock');
       rightSwatchLocked = true;
    } else {
       $(this).removeClass('fa-lock');
       $(this).addClass('fa-unlock');
       rightSwatchLocked = false;
    }
  });
});

$('#leftSwatch').on('change', function() {
  if(!leftSwatchLocked && rightSwatchLocked ) {
      updateColors(this.value, currentColor2);
    } else {
      updateColors(this.value, color2);
    }
});

$('#rightSwatch').on('change', function() {
  if (leftSwatchLocked && !rightSwatchLocked ) {
    updateColors(currentColor1, this.value);
  } else {
    updateColors(color1, this.value);
  }
});

$('.popup').click(function(event) {
  var width  = 575,
      height = 300,
      left   = ($(window).width()  - width)  / 2,
      top    = ($(window).height() - height) / 2,
      url    = 'http://twitter.com/share?hashtags=WebDesign,WebDev,Design&via=WebDevSuren&url=http://gradients.online&text=Quickly%20generate%20beautiful%20gradients%20you%20can%20share%20with%20your%20friends!&',
      opts   = 'status=1' +
               ',width='  + width  +
               ',height=' + height +
               ',top='    + top    +
               ',left='   + left;

  window.open(url, 'twitter', opts);
  console.log(url);
  return false;
});

parseURL(url);

//New URL instantly changes the gradient.
window.onhashchange = function(){
  url = window.location.href;
  parseURL(url);
}
