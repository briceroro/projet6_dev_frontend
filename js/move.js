

// objet mouvement qui sert a déplacer le personnage sur la map
// gestion du tour par tour
// vérification si besoin d'equiper ou replacer une arme sur la map/equiper un perso
// vérifie si il faut lancer le combat si deux joueurs cote a cote
// deux manieres de déplacer le joueur soit par keypress soit par bouton en fonction de la taille de l'ecran


class Move {
    constructor(game) {
        this.game = game;
        game.combat = {};
        game.combat.current_player = game.content.totalPerso[0];
        game.combat.tour = 0;
        game.combat.oldPosition;
        game.combat.newPosition;
        game.combat.adversaire;
        game.combat.combatEnCours = false;
        this.initControlBtn();
        this.lancementDeplacer = this.lancementDeplacer.bind(this);
        $(document).keypress(this.lancementDeplacer);
    }

    getNextPlayer() {
        let position = this.game.content.totalPerso.indexOf(this.game.combat.current_player) + 1;
        if (position == this.game.content.totalPerso.length) {
            position = 0;
        }
        return this.game.content.totalPerso[position];
    }

    changePlayer() {
        if (this.game.combat.tour == 3) {
            this.game.combat.tour = 0;
            this.game.combat.current_player = this.getNextPlayer();
        }
    }

    movePlayer(x, y) {
        this.game.combat.oldPosition = this.game.combat.current_player.position;
        this.game.combat.newPosition = this.game.combat.current_player.nextPosition;
        this.game.combat.newPosition = {
            x: x + this.game.combat.oldPosition.x,
            y: y + this.game.combat.oldPosition.y
        };
        if (this.movePosible(this.game.combat.newPosition)) {
            this.game.combat.current_player.position = this.game.combat.newPosition;
            new editWeapon(this.game);
            showContentMap(this.game.combat.newPosition.x, this.game.combat.newPosition.y, this.game.combat.current_player.image);
            this.checkFight();
            this.game.combat.tour++;
        }
    }


    movePosible(newPosition) {
        if (this.game.combat.combatEnCours == false) {
            if (this.game.combat.newPosition.x < 0 || this.game.combat.newPosition.x >= this.game.Size) {
                return false;
            }
            if (this.game.combat.newPosition.y < 0 || this.game.combat.newPosition.y >= this.game.Size) {
                return false;
            }
            for (var i = 0; i < this.game.content.totalObstacles.length; i++) {

                if (this.game.combat.newPosition.x == this.game.content.totalObstacles[i].position.x) {
                    if (this.game.combat.newPosition.y == this.game.content.totalObstacles[i].position.y) {
                        return false;
                    }
                }
            }
            return true;
        }
    }
    lancementDeplacer(e) {
        if (e.charCode === 90 || e.charCode === 122) {
            this.movePlayer(-1, 0);
            this.changePlayer()
        }
        if (e.charCode === 81 || e.charCode === 113) {
            this.movePlayer(0, -1);
            this.changePlayer()
        }
        if (e.charCode === 83 || e.charCode === 115) {
            this.movePlayer(1, 0);
            this.changePlayer()
        }
        if (e.charCode === 68 || e.charCode === 100) {
            this.movePlayer(0, 1);
            this.changePlayer()
        }
        if (e.charCode === 88 || e.charCode === 120) {
            this.game.combat.tour = 3;
            this.changePlayer()
        }
    }



    up() {
        this.movePlayer(-1, 0);
        this.changePlayer()

    }


    down() {
        this.movePlayer(1, 0);
        this.changePlayer()

    }


    left() {
        this.movePlayer(0, -1);
        this.changePlayer()

    }


    right() {
        this.movePlayer(0, 1);
        this.changePlayer()

    }

    initControlBtn() {
        initBtn("btnDown", this.down);
        initBtn("btnUp", this.up);
        initBtn("btnLeft", this.left);
        initBtn("btnRight", this.right);
    }



    checkFight() {
        for (let y = 0; y < this.game.content.totalPerso.length; y++) {
            if ((this.game.combat.newPosition.x == this.game.content.totalPerso[y].position.x - 1) || (this.game.combat.newPosition.x == this.game.content.totalPerso[y].position.x + 1)) {
                if (this.game.combat.newPosition.y == this.game.content.totalPerso[y].position.y) {
                    this.game.combat.adversaire = this.game.content.totalPerso[y];
                    this.game.combat.tour = -1;
                    return new Combat(this.game);
                }
            }
            if ((this.game.combat.newPosition.y == this.game.content.totalPerso[y].position.y - 1) || (this.game.combat.newPosition.y == this.game.content.totalPerso[y].position.y + 1)) {
                if (this.game.combat.newPosition.x == this.game.content.totalPerso[y].position.x) {
                    this.game.combat.adversaire = this.game.content.totalPerso[y];
                    this.game.combat.tour = -1;
                    return new Combat(this.game);
                }
            }
        }
    }
}
