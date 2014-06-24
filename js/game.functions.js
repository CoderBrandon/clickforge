
Game.rebuildBlueprints = function() {
  var html = '';
  for (var i = 0; i < Game.blueprints.length; i++) {
    var blueprintName = Game.blueprints[i].material + ' ' + Game.blueprints[i].type;
    html += '<option value="'+ i + '">' + blueprintName + '</option>';
  }
  $('#create-options').html(html);
};
  
  
  

Game.rebuildProjects = function() {
  $("#projects .progress").each(function() {
    Game.rebuildProject($(this));
  });
};

Game.rebuildProject = function($project) {
  var progress = $project.data('progress');
  var goal = $project.data('goal');
  var percentDone = (progress/goal) * 100;

  $project.find('.bar').css('width', percentDone + '%');
  $project.find('.progress-amount').text(progress + '/' + goal);
};

Game.completeProject = function($project) {
  $project.addClass('complete');
  var name = $project.data('name');
  Game.addInventory(name, 1);
  
  //todo: "Yay!" completion animation here
  $project.fadeOut(function() {
    $project.remove();
  });
  Game.rebuildInventory();
  Game.rebuildHeroInfo();
};




Game.rebuildInventory = function() {
  var html = '';
  Object.keys(Game.inventory).forEach(function (key) {
    html += '<div>' + key + ': ' + Game.inventory[key];
  });

  $("#inventory").html(html);
};

Game.getInventoryByType = function(type) {
  var items = [];
  Object.keys(Game.inventory).forEach(function (key) {
    if(key.indexOf(type) > -1) {
      items.push(key);
    }
  });
  return items;
};

Game.addInventory = function(name, amount) {
  Game.inventory[name] = Game.inventory[name] || 0;
  Game.inventory[name] = Game.inventory[name] + amount;
  
  if(Game.inventory[name] <= 0) {
    delete Game.inventory[name];
  }
  
  Game.rebuildInventory();
  
};





Game.createHero = function(job) {
  var template = Game.heroTemplates[job];
  var hero = {
    name : Game.heroNames[Math.floor(Math.random()*Game.heroNames.length)],
    job : job,
    level: 1,
    xp: 0,
    xp_next: 10,
    template : template,
    equipped : {weapon1 : '', weapon2 : '', shield: '', helm : '', armor: '' }
  };
  
  Game.heroes.push(hero);
};

Game.rebuildHeroes = function() {
  var html = '';
  for (var i = 0; i < Game.heroes.length; i++) {
    var hero = Game.heroes[i];
    var text = hero.name + ', Lvl. ' + hero.level + ' ' + hero.job;
    html += '<option value="'+ i + '">' + text + '</option>';
  }
  
  $('#hero-options').html(html);
};

Game.rebuildHeroInfo = function() {
  var index = $('#hero-options').val();
  var $info = $("#hero-info");
  var hero = Game.heroes[index];
  
  var xp_complete = hero.xp / hero.xp_next;
  $info.find('.bar').css('width', xp_complete + '%');
  $info.find('.progress-amount').text(hero.xp + '/' + hero.xp_next);
  
  var slots = Game.equipSlots;
  for(var i = 0; i < slots.length; i++) {
    $info.find('tr.' + slots[i] + ' td:first-child').text(hero.template[slots[i]] || 'empty');
    
    //if hero has an item equipped in this slot
    if(hero.equipped[slots[i]] !== '') {
      $info.find('tr.' + slots[i] + ' select').hide();
      $info.find('tr.' + slots[i] + ' .btn-equip').text('Remove').addClass('btn-remove').removeClass('disabled');
      $info.find('tr.' + slots[i] + ' .equipped').show().text(hero.equipped[slots[i]]);
    } else {
      //hero has nothing equipped in slot
      $info.find('tr.' + slots[i] + ' select').show();
      $info.find('tr.' + slots[i] + ' .btn-equip').text('Equip').removeClass('btn-remove').removeClass('disabled');
      $info.find('tr.' + slots[i] + ' .equipped').hide().text('');
      
      var needType = hero.template[slots[i]];
      var items = Game.getInventoryByType(needType);

      var options = '';
      for(var j = 0; j < items.length; j++) {
        options += '<option value="'+ items[j] + '">' + items[j] + '</option>';
      }
      $info.find('tr.' + slots[i] + ' select').html(options);

      if(items.length === 0) {
        $info.find('tr.' + slots[i] + ' .btn-equip').addClass('disabled');
      } else {
        $info.find('tr.' + slots[i] + ' .btn-equip').removeClass('disabled');
      }
    }
  }
  
  $info.find("tr td:first-child:contains('empty')").parent().hide();
  
  Game.rebuildSuccessChance();
};




Game.rebuildAreas = function() {
  var html = '';
  for (var i = 0; i < Game.areas.length; i++) {
    var blueprintName = Game.areas[i].level + ' - ' + Game.areas[i].name;
    html += '<option value="'+ (i + 1) + '">' + blueprintName + '</option>';
  }
  $('#area-options').html(html);
};

Game.rebuildSuccessChance = function() {
  //chance of success based on: Hero Lvl, Hero Success Rate, Area Level, Hero avg equipment material
  //HSR / (AreaLVL / ((HLVL + AvgMatLvl)/2))
  
  var index = $('#hero-options').val();
  var $info = $("#hero-info");
  var hero = Game.heroes[index];
  
  var hsr = hero.success;
  var areaLvl = $("#area-options").val();
  var heroLvl = hero.level;
  
  var slots = Game.equipSlots;
  var equipMatSum = 0;
  var equipNeedCount = 0;
  for(var i = 0; i < slots.length; i++) {
    if(hero.template[slots[i]]) {
      equipNeedCount++;
      if(hero.equipped[slots[i]]) {
        var material = hero.equipped[slots[i]].split(' ')[0];
        equipMatSum += Game.materials[material].cost;
        console.log(material);
      }
    }
  }
  
  
  
  //todo: when hero fails - chance to break equipment
  
  
};








Game.runGameLoop = function() {
  Game.rebuildProjects();
};


/**
* add commas
*/
Game.formatNumber = function(number) {
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};