
// creation de lobjet qui servira a equiper une arme a un personnage
// l'objet vérifie si le perso a deja une arme ou pas
// il retire et et replace une arme sur la map si le perso est dja equiper ou pas d'une arme
// il gere également lequipement du perso qui modifie sa force en foncion des degat de l'arme equipé

class editWeapon {

    constructor(game) {
        this.game = game;
        this.changeWeapon();
        this.replaceWeapon();
    }

    removeWeapon() {
        deleteShowContentMap(this.game.combat.newPosition.x, this.game.combat.newPosition.y);
        this.game.map[this.game.combat.newPosition.x][this.game.combat.newPosition.y] = "empty";
    }

    equipWeapon(number) {
        this.game.combat.current_player.weapon = this.game.content.totalWeapons[number].name;
        this.game.combat.current_player.force = 20 + this.game.content.totalWeapons[number].power;
        this.game.combat.current_player.oldEquip = this.game.combat.current_player.equip;
        this.game.combat.current_player.equip = this.game.content.totalWeapons[number];
        showWeaponEquip(this.game);
    }

    clearPositionWeapon(number) {
        this.game.content.totalWeapons[number].position.x = null;
        this.game.content.totalWeapons[number].position.y = null;
    }

    changeWeapon() {
        for (let z = 0; z < this.game.content.totalWeapons.length; z++) {
            if (this.game.combat.newPosition.x == this.game.content.totalWeapons[z].position.x) {
                if (this.game.combat.newPosition.y == this.game.content.totalWeapons[z].position.y) {
                    if (this.game.combat.current_player.equip == null) {
                        this.clearPositionWeapon(z);
                    }
                    this.removeWeapon();
                    this.equipWeapon(z);
                }
            }
        }
    }

    replaceWeapon() {
        for (let z = 0; z < this.game.content.totalWeapons.length; z++) {
            if ((this.game.combat.oldPosition.x == this.game.content.totalWeapons[z].position.x) && (this.game.combat.oldPosition.y == this.game.content.totalWeapons[z].position.y)) {
                if (this.game.map[this.game.combat.newPosition.x][this.game.combat.newPosition.y] == "empty") {
                    this.clearPositionWeapon(z);
                    showContentMap(this.game.combat.oldPosition.x, this.game.combat.oldPosition.y, this.game.combat.current_player.oldEquip.image);
                    this.game.combat.current_player.oldEquip.position = {
                        x: this.game.combat.oldPosition.x,
                        y: this.game.combat.oldPosition.y
                    };
                    this.game.map[this.game.combat.oldPosition.x][this.game.combat.oldPosition.y] = "full";
                }
            }
        }
    }
}
