
$(document).ready(function() {
  //todo: add upgrades that add new hero jobs
  //todo: sending heroes on quests gives them xp and they can lvl up after X runs
  
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
  
  Game.createHero("Warrior");
  Game.createHero("Farmer");
  Game.createHero("Wizard");
  Game.createHero("Rogue");
  
  Game.rebuildBlueprints();
  Game.rebuildInventory();
  Game.rebuildHeroes();
  Game.rebuildHeroInfo();
  Game.rebuildAreas();
  
  Game.setStartTime(Date.now());
  setInterval(Game.runGameLoop, Game.loopInterval);
  
  //actions/events
  
  $('#btn-start').on('click', function() {
    var blueprint = Game.blueprints[$('#create-options').val()];
    var blueprintName = blueprint.material + ' ' + blueprint.type;
    var material = Game.materials[blueprint.material];
    var type = Game.itemTypes[blueprint.type];
    
    var goal = Math.ceil(material.cost * type.difficulty);
    var goalString = Game.formatNumber(goal);
    
    var newProject = $(
      '<div class="progress progress-success progress-striped active">' +
        '<div class="bar"></div>' +
        '<div class="progress-name">' + blueprintName + '</div>' +
        '<div class="progress-amount">0/' + goalString + '</div>' +
      '</div>').data({
        name: blueprintName,
        progress: 0,
        goal: goal
    });
    
    $('#projects').append(newProject);
  });
  
  $('#projects').on('click', '.progress', function() {
    var $project = $(this);
    if($project.hasClass('complete')) {
      return;
    }
    
    var currentProgress = $project.data('progress') + Game.clickValue;
    var goal = $project.data('goal');
    $project.data('progress', currentProgress);
    Game.rebuildProject($project);
    if(currentProgress >= goal) {
      Game.completeProject($project);
    }
  });
  
  $("#hero-options").on('change', function() {
    Game.rebuildHeroInfo();
  });
  
  //Equip Item
  $("#hero-info").on('click', '.btn-equip', function() {
    if($(this).hasClass('disabled') || $(this).hasClass('btn-remove')) {
      return;
    }
    
    var index = $('#hero-options').val();
    var slot = $(this).parents('tr').attr('class');
    var hero = Game.heroes[index];
    var $info = $("#hero-info");
    
    hero.equipped[slot] = $info.find('tr.' + slot + ' select').val();
    //$info.find('tr.' + slot + ' select').hide();
    //$(this).text('Remove').addClass('btn-remove');
    //$info.find('tr.' + slot + ' .equipped').show().text(hero.equipped[slot]);
    Game.addInventory(hero.equipped[slot], -1);
    Game.rebuildHeroInfo();
  });
  
  //Remove Item
  $("#hero-info").on('click', '.btn-remove', function() {
    var index = $('#hero-options').val();
    var slot = $(this).parents('tr').attr('class');
    var hero = Game.heroes[index];
    
    var itemName = hero.equipped[slot];
    hero.equipped[slot] = '';
    //$info.find('tr.' + slot + ' select').show();
    //$(this).text('Equip').removeClass('btn-remove');
    //$info.find('tr.' + slot + ' .equipped').hide().text('');
    Game.addInventory(itemName, 1);
    Game.rebuildHeroInfo();
  });
  
  
});

