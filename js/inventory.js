/**
 * 
 */
Game.rebuildInventory = function() {
  var html = '';
  Object.keys(Game.inventory).forEach(function (key) {
    html += '<div>' + key + ': ' + Game.inventory[key];
  });

  $("#inventory").html(html);
};

/**
 * 
 */
Game.getInventoryByType = function(type) {
  var items = [];
  Object.keys(Game.inventory).forEach(function (key) {
    if(key.indexOf(type) > -1) {
      items.push(key);
    }
  });
  return items;
};

/**
 * 
 */
Game.addInventory = function(name, amount) {
  Game.inventory[name] = Game.inventory[name] || 0;
  Game.inventory[name] = Game.inventory[name] + amount;
  
  if(Game.inventory[name] <= 0) {
    delete Game.inventory[name];
  }
  
  Game.rebuildInventory();
  
};

/**
 * 
 */
Game.getInventoryItemAmount = function(name) {
  return Game.inventory[name] || 0;
};
