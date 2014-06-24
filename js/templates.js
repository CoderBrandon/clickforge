Game.templates.shoppingItem = 
  "<div class='shopping-item span4'> \
    <div class='name'> \
      {{hero.name}}, Lvl. {{hero.level}} {{hero.job}} wants: <br><span class='item-name'>&laquo;{{blueprint.material}} {{blueprint.type}}&raquo;</span> \
    </div> \
    <div class=''> \
      <a class='btn btn-primary btn-sell' href='#'> \
        Sell: <i class='icon-cog icon-white'></i>{{sellPrice}} \
      </a> \
      <a class='btn btn-primary btn-decline' href='#'> \
        Decline \
      </a> \
    </div> \
  </div>";