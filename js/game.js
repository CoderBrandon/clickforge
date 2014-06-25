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
  maxProjects: 4,
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
    Game.goShopping(elapsed, 6);
  }
  
};


$(document).ready(function() {
  //todo: add upgrades that add new hero jobs
  //todo: sending heroes on quests gives them xp and they can lvl up after X runs
  
  $('#middleTabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
  
  //starting info
  Game.blueprints = [
    {'material': 'Wood', 'type' : 'Sword'},
    {'material': 'Copper', 'type' : 'Sword'},
    {'material': 'Wood', 'type' : 'Shield'},
    {'material': 'Leather', 'type' : 'Cap'},
    {'material': 'Leather', 'type' : 'Light Armor'},
    {'material': 'Gold', 'type' : 'Katana'}
  ];
  
  Game.addInventory('Gold', 100);
  Game.addInventory('Wood Sword', 1);
  
  Object.keys(Game.heroTemplates).forEach(function (key) {
    var amount = Math.floor(Math.random() * 5);
    for(var i = 0; i < amount; i++) {
      Game.createHero(key);
    }
  });
  
  console.log(Game.heroes);
  console.log(Game.heroes.length);
  
  //Game.createHero("Warrior");
  //Game.createHero("Farmer");
  //Game.createHero("Wizard");
  //Game.createHero("Rogue");
  
  Game.rebuildBlueprints();
  Game.rebuildInventory();
  Game.rebuildHeroes();
  Game.rebuildHeroInfo();
  Game.rebuildAreas();
  
  Game.setStartTime(Date.now());
  setInterval(Game.runGameLoop, Game.loopInterval);
});

