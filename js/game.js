var Game = {
  version : '0.01',
  clickValue : 1,
  templates : {},
  blueprints : [],
  itemTypes : [],
  materials : [],
  inventory : {},
  projectBaseCosts : {},
  adventurerTemplates : [],
  equipSlots : ['weapon1', 'weapon2', 'shield', 'helm', 'armor'],
  shoppers: [],
  maxShoppers: 3,
  timers: {
    'start' : 0,
    'shop' : 0
  },
  loopInterval: 300
};

Game.setStartTime = function(time) {
  Game.startTime = time;
  Game.timers.start = time;
  Game.timers.shop = time;
};

Game.runGameLoop = function() {
  Game.rebuildProjects();
  
  var now = Date.now();
  var elapsed = now - Game.timers.start;
  
  
  if(now - Game.timers.shop > 1000) {
    Game.timers.shop = now;
    Game.goShopping(elapsed);
  }
  
};