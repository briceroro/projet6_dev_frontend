 // creation de l'objet du contenu dans l'objet game.content
 // creation des class des divers item qui sont dans le jeux( perso,obtacles,armes)
 // creation de la class qui permet d'inserer les objet dans la map du jeux ( avec une fonction placement et vérification si un item n'est pas cote a cote)



 class Persos {
     constructor(name, life, defence, weapon, equip, oldEquip, force, position, nextPosition, combat, image) {
         this.name = name;
         this.life = life;
         this.defence = defence;
         this.weapon = weapon;
         this.equip = equip;
         this.force = force;
         this.position = position;
         this.nextPosition = nextPosition;
         this.combat = combat;
         this.image = new Image(45, 45);
         this.image.src = image;
     }

     attaquer(target) {
         if (this.life > 0) {
             const degats = this.force / target.defence;
             target.life = target.life - degats;
         }
     }

     defendre(posture) {
         this.defence = posture;
     }
 }


 class Obstacles {
     constructor(position) {
         this.position = position;
         this.image = new Image(45, 45);
         this.image.src = 'image/bloc.png';
     }
 }


 class Weapons {
     constructor(name, position, image, power) {
         this.name = name;
         this.position = position;
         this.image = new Image(45, 45);
         this.image.src = image;
         this.power = power;
     }
 }


 class Content {
     constructor(game) {
         this.game = game;
         this.generateContent();
     }

     place(totalItem) {

         let nb_cell_remaining;
         let item_remaining;
         for (let x = 0; x < 10; x++) {
             for (let y = 0; y < 10; y++) {
                 nb_cell_remaining = (10 - x) * 10 - y;
                 item_remaining = Object.keys(totalItem).filter(function (block) {
                     return totalItem[block].position == null;
                 });
                 if (this.game.map[x][y] == "empty") {
                     if (item_remaining.length / nb_cell_remaining >= Math.random()) {
                         showContentMap(x, y, totalItem[item_remaining[0]].image)
                         totalItem[item_remaining[0]].position = {
                             x: x,
                             y: y
                         };
                         this.game.map[x][y] = "full";
                     }
                 }
             }
         };
         return this.check(totalItem);
     }

     check(item) {
         for (let x = 0; x < item.length; x++) {
             for (let y = x + 1; y < item.length; y++) {
                 if ((item[x].position.x + 1 == item[y].position.x) || (item[x].position.x - 1 == item[y].position.x)) {
                     if (item[x].position.y == item[y].position.y) {
                         new Map(this.game, map, infos, 10);
                         new Content(this.game);
                         return false;
                     }
                 } else if ((item[x].position.y + 1 == item[y].position.y) || (item[x].position.y - 1 == item[y].position.y)) {
                     if (item[x].position.x == item[y].position.x) {
                         new Map(this.game, map, infos, 10);
                         new Content(this.game);
                         return false;
                     }
                 }
             }
         }
         return true;

     }

     generateContent() {
         this.game.content = {};
         this.game.content.totalPerso = [];
         this.game.content.totalPerso.push(new Persos("Joueur 1", 100, 1, null, null, null, 20, null, null, null, 'image/Mons11.png'));
         this.game.content.totalPerso.push(new Persos("Joueur 2", 100, 1, null, null, null, 20, null, null, null, 'image/perso2.png'));

         this.game.content.totalObstacles = [];
         for (let i = 0; i < 6; i++) {
             this.game.content.totalObstacles.push(new Obstacles(null));
         }

         this.game.content.totalWeapons = [];
         this.game.content.totalWeapons.push(new Weapons("flag", null, "image/flag.png", 5));
         this.game.content.totalWeapons.push(new Weapons("wine", null, "image/wine.png", 10));
         this.game.content.totalWeapons.push(new Weapons("sword", null, "image/sword.png", 15));
         this.game.content.totalWeapons.push(new Weapons("canon", null, "image/canon.png", 20));

         if (!this.place(this.game.content.totalPerso) ||
             !this.place(this.game.content.totalObstacles) ||
             !this.place(this.game.content.totalWeapons)
         ) {
             return false;
         }


         showLifePerso(this.game);

         return true;
     }

 }
