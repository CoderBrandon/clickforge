/**
* add commas
*/
Game.formatNumber = function(number) {
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

Game.randomInArray = function(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
};