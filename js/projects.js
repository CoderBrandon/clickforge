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
  $("#projects .project-item").each(function() {
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
  var blueprint = $project.data('blueprint');
  var name = blueprint.material + ' ' + blueprint.type;
  Game.addInventory(name, 1);
  
  //todo: "Yay!" completion animation here
  $project.fadeOut(function() {
    $project.remove();
  });
  Game.rebuildInventory();
  Game.rebuildHeroInfo();
  Game.rebuildShoppers();
};

/**
 * 
 */
Game.startProject = function(blueprint) {
  var material = Game.materials[blueprint.material];
  var type = Game.itemTypes[blueprint.type];

  var goal = Math.ceil(material.cost * type.difficulty);
  var goalString = Game.formatNumber(goal);

  var newProjectHtml = Mustache.render(Game.templates.project, { blueprint: blueprint, goal: goalString });
  var newProject = $(newProjectHtml).data({
    blueprint: blueprint,
    progress: 0,
    goal: goal
  });

  $('#projects').append(newProject);
};


$(document).ready(function() {
  /**
   * 
   */
  $('#btn-start').on('click', function() {
    if($('.project-item').length >= Game.maxProjects) {
      return;
    }
    
    var blueprint = Game.blueprints[$('#create-options').val()];
    Game.startProject(blueprint);
  });
  
  /**
   * 
   */
  $('#projects').on('click', '.progress', function() {
    var $project = $(this).parents('.project-item');
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
  
  /**
   * 
   */
  $('#projects').on('click', '.btn-remove-project', function() {
    var $project = $(this).parents('.project-item');
    if($project.hasClass('complete')) {
      return;
    }
    
    if(confirm("Really remove the project?")) {
      $project.fadeOut(function() {
        $project.remove();
      });
    }
  });
  
  
  
});
