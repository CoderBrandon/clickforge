Game.templates.shoppingItem = 
  "<div class='shopping-item span4'> \
    <div class='name'> \
      {{hero.name}}, Lvl. {{hero.level}} {{hero.job}} wants: <br><span class='item-name'>&laquo;{{blueprint.material}} {{blueprint.type}}&raquo;</span> \
    </div> \
    <div class=''> \
      <a class='btn btn-primary btn-sell' href='#'> \
        Sell: <i class='icon-cog icon-white'></i>{{sellPrice}} \
      </a> \
      <a class='btn btn-primary btn-create' href='#'> \
        <i class='icon-plus icon-white'></i> \
      </a> \
      <a class='btn btn-primary btn-decline' href='#'> \
        <i class='icon-remove icon-white'></i> \
      </a> \
    </div> \
  </div>";


Game.templates.project = 
  "<div class='project-item'> \
    <a class='btn btn-primary btn-remove-project span1 btn-mini' href='#'> \
      <i class='icon-remove icon-white'></i> \
    </a> \
    <div class='progress progress-success progress-striped active no-select span3'> \
      <div class='bar'></div>' \
      <div class='progress-name'>{{blueprint.material}} {{blueprint.type}}</div> \
      <div class='progress-amount'>0/{{goal}}</div> \
    </div> \
  </div>";