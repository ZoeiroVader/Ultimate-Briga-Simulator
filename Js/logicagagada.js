players[counterP] = {
    id : socket.id,
    name : player
}
if (lobby[counterA] === undefined) {

    lobby[counterA] = {
        player: players[counterP]
    }
    console.log(lobby[counterA]);
    counterA++;    
}
else if(lobby[counterA] === undefined){

    lobby[counterA] = {
        player: players[counterP]
    };
    counterB++;
    battle[counterB] = {
        players : {
            id1 : lobby[counterA].player.id,
            id2 : lobby[counterA - 1].player.id
        }
    };
}

counterP++;