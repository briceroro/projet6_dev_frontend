  
// creation de la map du jeux dans l'objet map et son insertion dans le dom


  class Map {
      constructor(game, map, infos, taille) {
          this.game = game;
          this.map = map;
          this.infos = infos;
          this.taille = taille;
          this.generateMap();
      }
      generateMap() {
          $("#contentGuide").css("display", "none");
          this.game.map = {};
          this.game.Size = this.taille;
          initDomMap();
          const tbl = document.createElement("table");
          $(tbl).id = ("tbl");
          $(tbl).attr("border", "");
          $(tbl).css("borderSpacing", "0px");
          $(tbl).css('margin', 'auto');
          $(tbl).css('backgroundColor', '#236C99');
          const tblBody = document.createElement("tbody");
          for (let x = 0; x < 10; x++) {
              this.game.map[x] = [];
              const row = document.createElement("tr");
              for (let y = 0; y < 10; y++) {
                  this.game.map[x][y] = "empty";
                  const cell = document.createElement("td");
                  $(cell).id = ("cell");
                  $(cell).css('width', '6vh');
                  $(cell).css('height', '6vh');
                  $(row).append($(cell));
              }
              $(tblBody).append($(row));
          }
          $(tbl).append($(tblBody));
          $(map).append($(tbl));
      }
  }


