/**
 * 
 */
Game.goShopping = function(elapsed, trysLeft) {
  if(trysLeft <= 0) {
    return;
  }
  
  if(Game.shoppers.length >= Game.maxShoppers) {
    return;
  }
  
  var hero = Game.randomInArray(Game.heroes);
  if(Game.heroIsShopping(hero)) {
    return Game.goShopping(elapsed, trysLeft - 1);
  }
  
  var slot = Game.randomInArray(Game.getHeroEquippableSlots(hero));
  var type = hero.template[slot];
  if(type === '') {
    return Game.goShopping(elapsed, trysLeft - 1);
  }
  
  var blueprints = Game.getBlueprintsByType(type);
  if(blueprints.length <= 0) {
    return Game.goShopping(elapsed, trysLeft - 1);
  }
  
  var blueprint = Game.randomInArray(blueprints);
  Game.addShopper(hero, slot, type, blueprint);
};

/**
 * Checks if hero is currently shopping
 */
Game.heroIsShopping = function(hero) {
  for(var i = 0; i < Game.shoppers.length; i++) {
    if(hero === Game.shoppers[i].hero) {
      return true;
    }
  }
  return false;
};

/**
 * 
 */
Game.addShopper = function(hero, slot, type, blueprint) {
  var materialCost = Game.materials[blueprint.material].cost;
  var itemDifficulty = Game.itemTypes[blueprint.type].difficulty;
  var sellPrice = Math.round(1 + (2 * (materialCost * itemDifficulty)));
  
  var shopper = {
    hero: hero,
    slot: slot,
    type: type,
    blueprint: blueprint,
    sellPrice: sellPrice
  };
  
  Game.shoppers.push(shopper);
  var html = Mustache.render(Game.templates.shoppingItem, shopper);
  var $shopper = $(html).data('shopper', shopper);
  
  $("#shopping").append($shopper);
  $shopper.slideUp(0).slideDown();
  
  Game.rebuildShoppers();
  Game.rebuildHeroInfo();
};

/**
 * 
 */
Game.rebuildShoppers = function() {
  $('.shopping-item').each(function() {
    var $item = $(this);
    var shopper = $item.data('shopper');
    
    var itemName = shopper.blueprint.material + ' ' + shopper.blueprint.type;
    $item.find('.btn-sell').toggleClass('disabled', (Game.getInventoryItemAmount(itemName) <= 0));
    
  });
};


$(document).ready(function() {
  
  /**
   * 
   */
  $('#shopping').on('click', '.btn-sell', function() {
    if($(this).hasClass('disabled')) {
      return;
    }
    
    var $shoppingItem = $(this).parents('.shopping-item');
    var shopper = $shoppingItem.data('shopper');
    Game.addInventory('Gold', shopper.sellPrice);
    var itemName = shopper.blueprint.material + ' ' + shopper.blueprint.type;
    Game.addInventory(itemName, -1);
    shopper.hero.equipped[shopper.slot] = itemName;
    Game.shoppers.splice(Game.shoppers.indexOf(shopper), 1);
    $shoppingItem.slideUp(300, function() { $(this).remove(); });
    Game.rebuildShoppers();
  });
  
  /**
   * 
   */
  $('#shopping').on('click', '.btn-decline', function() {
    var $shoppingItem = $(this).parents('.shopping-item');
    var shopper = $shoppingItem.data('shopper');
    Game.shoppers.splice(Game.shoppers.indexOf(shopper), 1);
    $shoppingItem.slideUp(300, function() { $(this).remove(); });
  });
  
  /**
   * 
   */
  $('#shopping').on('click', '.btn-create', function() {
    var $shoppingItem = $(this).parents('.shopping-item');
    var shopper = $shoppingItem.data('shopper');
    Game.startProject(shopper.blueprint);
  });
  
  
});