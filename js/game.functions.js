/**
 * 
 */
Game.rebuildAreas = function() {
  var html = '';
  for (var i = 0; i < Game.areas.length; i++) {
    var blueprintName = Game.areas[i].level + ' - ' + Game.areas[i].name;
    html += '<option value="'+ (i + 1) + '">' + blueprintName + '</option>';
  }
  $('#area-options').html(html);
};

/**
 * 
 */
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
      }
    }
  }
  
  
  
  //todo: when hero fails - chance to break equipment
  
  
};