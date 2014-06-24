/**
 * 
 */
Game.rebuildBlueprints = function() {
  var html = '';
  for (var i = 0; i < Game.blueprints.length; i++) {
    var blueprintName = Game.blueprints[i].material + ' ' + Game.blueprints[i].type;
    html += '<option value="'+ i + '">' + blueprintName + '</option>';
  }
  $('#create-options').html(html);
};

/**
 * 
 */
Game.getBlueprintsByType = function(type) {
  var items = [];
  for (var i = 0; i < Game.blueprints.length; i++) {
    var blueprint = Game.blueprints[i];
    if(blueprint.type === type) {
      items.push(blueprint);
    }
  }
  return items;
};

/**
 * 
 */
Game.rebuildProjects = function() {
  $("#projects .progress").each(function() {
    Game.rebuildProject($(this));
  });
};

/**
 * 
 */
Game.rebuildProject = function($project) {
  var progress = $project.data('progress');
  var goal = $project.data('goal');
  var percentDone = (progress/goal) * 100;

  $project.find('.bar').css('width', percentDone + '%');
  $project.find('.progress-amount').text(progress + '/' + goal);
};

/**
 * 
 */
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
  Game.rebuildShoppers();
};
