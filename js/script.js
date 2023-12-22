// Code for auto color change of project titles based on background color
function getContrastRatio(rgb1, rgb2) {
    var l1 = getLuminance(rgb1) + 0.05;
    var l2 = getLuminance(rgb2) + 0.05;
    return l1 > l2 ? l1 / l2 : l2 / l1; // Return the larger luminance divided by the smaller luminance
  }
  
function getLuminance(rgb) {
  var a = rgb.map(function (v) {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function rgbToHex(rgb) {
  return "#" + rgb.map(function (value) {
    return ("0" + value.toString(16)).slice(-2);
  }).join('');
}
  
var titles = document.getElementsByClassName('project-title');

for(var i = 0; i < titles.length; i++) {
  var bgColor = window.getComputedStyle(titles[i].parentNode).backgroundColor;
  var rgbColor = bgColor.match(/\d+/g).map(Number);
  var contrastWithWhite = getContrastRatio(rgbColor, [255, 255, 255]);
  var contrastWithBlack = getContrastRatio(rgbColor, [0, 0, 0]);
  titles[i].style.color = contrastWithWhite > contrastWithBlack ? 'white' : 'black';
}