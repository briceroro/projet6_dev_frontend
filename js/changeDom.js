

// creation des function qui servirons pour modfier le dom via les différents objets du dom


function initBtn(who, what) {
    const btn = document.getElementById(who);

    btn.onclick = what;
};


function visibleHidden() {
    if ($("#contentGuide").css("display") == ("flex")) {
        $("#contentGuide").css("display", "none");
    } else {
        $("#contentGuide").css("display", "flex");
    }
}
initBtn("btnGuide", visibleHidden);


function reloadMobile() {
    document.location.reload(false);
}
initBtn("btnReload", reloadMobile);


function initDomMap() {
    map.innerHTML = "";
    infos.innerHTML = "";
}


function showLifePerso(game) {
    $("#lifeperso1").html("Vie joueur 1 : </br>" + game.content.totalPerso[0].life);
    $("#lifeperso2").html("Vie Joueur 2 : </br>" + game.content.totalPerso[1].life);
}


function showWeaponEquip(game) {

    if (game.content.totalPerso[0].weapon !== null) {
        $("#armeperso1").html("joueur 1 possede : </br>" + game.content.totalPerso[0].weapon);
    }
    if (game.content.totalPerso[1].weapon !== null) {
        $("#armeperso2").html("joueur 2 possede : </br>" + game.content.totalPerso[1].weapon);
    }
}


function showContentMap(x, y, what) {
    $('tr')[x].cells[y].append(what);
}


function deleteShowContentMap(x, y) {
    $('tr')[x].cells[y].innerHTML = "";

}

function showChoiceFight(game) {
    $("#infos").html(game.combat.current_player.name + " tape z pour attaquez ou s pour préparer ta défence");
}


function showAttack(x, y) {
    $("#infos").html(x.name + " attaque " + y.name + " et lui fait " + (x.force / y.defence) + " points de dégâts");
}


function showDefence(x, y) {
    $("#infos").html(x.name + " se mets en posture de defence pour la prochaine attaque de " + y.name);
}


function showChoiceRestartGame(game) {
    $("#btnAttack").css("display", "none");
    $("#btnDef").css("display", "none");
    $("#btnReload").css("display", "inline");


    if (game.combat.adversaire.life <= 0) {
        infos.innerHTML = "";
        $("#map").html(game.combat.current_player.name + " a gagné !");
    } else if (game.combat.current_player.life <= 0) {
        infos.innerHTML = "";
        $("#map").html(game.combat.adversaire.name + " a gagné !");
    }

}

function showCombatControl() {
    $("#upAndDown").css("display", "none");
    $("#btnLeft").css("display", "none");
    $("#btnRight").css("display", "none");
    $("#btnAttack").css("display", "inline");
    $("#btnDef").css("display", "inline");
}
