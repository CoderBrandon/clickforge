/**
 * 
 */
Game.createHero = function(job) {
  var template = Game.heroTemplates[job];
  var hero = {
    name : Game.randomInArray(Game.heroNames),
    job : job,
    level: 1,
    xp: 0,
    xp_next: 10,
    template : template,
    equipped : { weapon1 : '', weapon2 : '', shield: '', helm : '', armor: '' }
  };
  
  Game.heroes.push(hero);
};

/**
 * 
 */
Game.rebuildHeroes = function() {
  var html = '';
  for (var i = 0; i < Game.heroes.length; i++) {
    var hero = Game.heroes[i];
    var text = hero.name + ', Lvl. ' + hero.level + ' ' + hero.job;
    html += '<option value="'+ i + '">' + text + '</option>';
  }
  
  $('#hero-options').html(html);
};



/**
 * 
 */
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

/**
 * 
 */
Game.getHeroEquippableSlots = function(hero) {
  var equippableSlots = [];
  for(var i = 0; i < Game.equipSlots.length; i++) {
    if(hero.template[Game.equipSlots[i]]) {
      if(hero.equipped[Game.equipSlots[i]] === '') {
        equippableSlots.push(Game.equipSlots[i]);
      }
    }
  }
  return equippableSlots;
};
