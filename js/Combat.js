// objet qui sert a fénir les modalité du combat
//deux choix attack ou def recuperer avec lobjet du perso et completer pour gerer le dom
//deux manieres de gerer le combat soit par keypress soit par bouton en fonction de la taille de l'ecran
// des q'un joueur n'a plus de vie l'objet retrun un message de fin de partie 

class Combat {
    constructor(game) {
        this.game = game;
        this.attackDefDesktop();
        this.initControlfight();
        this.initCombat();

    }
    initCombat() {
        this.game.combat.combatEnCours = true;
        this.game.combat.current_player.combat = true;
        this.game.combat.adversaire.combat = false;
        this.game.combat.current_player.attaquer(this.game.combat.adversaire);
        showLifePerso(this.game);
        showChoiceFight(this.game);
        showCombatControl();
    }
    attack(p1, p2) {
        p1.attaquer(p2);
        showAttack(p1, p2);
        showLifePerso(this.game);
        p2.defendre(1);
        p1.defendre(1);
        p1.combat = false;
        p2.combat = true;
    }

    defendre(p1, p2) {
        p1.defendre(2);
        showDefence(p1, p2);
        p1.combat = false;
        p2.combat = true;
    }

    attackDefDesktop() {
        const combat = this;
        $(document).keypress(function (e) {
            if (combat.game.combat.combatEnCours == true) {
                if (combat.game.combat.current_player.combat == true) {
                    if (e.charCode === 90 || e.charCode === 122) {
                        combat.attack(combat.game.combat.current_player, combat.game.combat.adversaire);

                    }
                    if (e.charCode === 83 || e.charCode === 115) {
                        combat.defendre(combat.game.combat.current_player, combat.game.combat.adversaire);
                    }
                } else if (combat.game.combat.adversaire.combat == true) {
                    if (e.charCode === 90 || e.charCode === 122) {
                        combat.attack(combat.game.combat.adversaire, combat.game.combat.current_player);


                    } else if (e.charCode === 83 || e.charCode === 115) {
                        combat.defendre(combat.game.combat.adversaire, combat.game.combat.current_player);
                    }
                }
                if (combat.game.combat.adversaire.life <= 0 || combat.game.combat.current_player.life <= 0) {
                    combat.fightEnd();
                }
            }
        });
    }

    attackMobile() {
        if (this.game.combat.combatEnCours == true) {
            if (this.game.combat.current_player.combat == true) {
                this.attack(this.game.combat.current_player, this.game.combat.adversaire);

            } else if (this.game.combat.adversaire.combat == true) {
                this.attack(this.game.combat.adversaire, this.game.combat.current_player);
            }

            if (this.game.combat.adversaire.life <= 0 || this.game.combat.current_player.life <= 0) {
                this.fightEnd();
            }
        }

    }

    defendreMobile() {
        if (this.game.combat.combatEnCours == true) {
            if (this.game.combat.current_player.combat == true) {
                this.defendre(this.game.combat.current_player, this.game.combat.adversaire);

            } else if (this.game.combat.adversaire.combat == true) {
                this.defendre(this.game.combat.adversaire, this.game.combat.current_player);
            }
            if (this.game.combat.adversaire.life <= 0 || this.game.combat.current_player.life <= 0) {
                this.fightEnd();
            }
        }

    }

    initControlfight() {
        initBtn("btnAttack", this.attackMobile);
        initBtn("btnDef", this.defendreMobile);
    }

    fightEnd() {
        this.game.combat.combatEnCours = false;
        this.game.combat.current_player.combat = false;
        this.game.combat.adversaire.combat = false;
        showChoiceRestartGame(this.game);
    }
}
