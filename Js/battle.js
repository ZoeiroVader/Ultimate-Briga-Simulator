var i = 0, action;
var btn = document.getElementsByClassName('nes-btn');
var log = document.getElementsByClassName('log');
var span = document.getElementsByTagName('span');

var socket = io.connect('http://localhost:4000'); //Se conecta ao servidor

btn[0].addEventListener('click', function () {
    action = Action.action.value;
    action == "c" ? defineCharge() : action == "d" ? defineDefend() : defineAttack();
});
// init players status
var player = {
    a : false,
    d : false,
    c : false,
    life : 100
}
var otherPlayer = {
    a : false,
    d : false,
    c : false,
    life : 100
}
function defineAttack() {
    if (player.c) {
        player.a = true;
        socket.emit('playerAction', player);
        act.classList.add('hidden');
        waiting.classList.remove('hidden');
        type();
        log[0].innerHTML = ""; 
    }else{
        atkWarning.showModal();
    }
}
function defineCharge() {
    player.c = true;
    socket.emit('playerAction', player); 
    act.classList.add('hidden');
    waiting.classList.remove('hidden');
    type();
    log[0].innerHTML = "";
}
function defineDefend() {
    player.d = true;
    socket.emit('playerAction', player); 
    act.classList.add('hidden');
    waiting.classList.remove('hidden');
    type();
    log[0].innerHTML = "";
}
//Action Methods
function attack(Player, p, otherSprite, selfSprite, damage, atk, taken, other) {       
    setTimeout(function () { 
        other.d != true ? other.life -= 10 : other.life -= 0;
        p.value = other.life; 
        otherSprite.classList.add(taken); 
        damage.classList.add('damage-text');
    }, 510);
    disable();
    span[2].checked = true;
    selfSprite.classList.add(atk);
    setTimeout(() => { 
        selfSprite.classList.remove(atk); 
        otherSprite.classList.remove(taken); 
        damage.classList.remove('damage-text');
    }, 2100);     
    Player.a = false;
    Player.c = false;
}
function defend(Player, Shield) {
    Player.d = false;
    Shield.classList.add('damage-text');
    setTimeout(function(){Shield.classList.remove('damage-text')}, 500);
}
function charge(Player) {
    Player.c = true;
    able();        
}

socket.on('otherAction', (player2) => {  
    otherPlayer = player2;
    setTimeout(function () {  otherPlayer.c && otherPlayer.a ? attack(otherPlayer, p1, p1sprite, p2sprite, p1Damage,  'atk-p2', 'taken1', player) : otherPlayer.d ? defend(otherPlayer, p2Shield) : charge(otherPlayer, p2Shield);}, 2000)
    player.c  && player.a? attack(player, p2, p2sprite, p1sprite, p2Damage,  'atk-p1', 'taken2', otherPlayer) : player.d ? defend(player, p1Shield) : charge(player);
    act.classList.remove('hidden');
    waiting.classList.add('hidden');      
});

// Type Slowly;
function type(string){
    string = ("Aguardando oponente...").split('');
    if (i < string.length) {
        setTimeout(function (){
            log[0].innerHTML += string[i];
            i++;
            type();
        }, string[i] == ' ' ? 0 : 100)            
    }
    else if(i >= string.length){
        console.log("FOi POrra");
        i = 0;           
    }       
}; 

function disable() {
    atk.disabled = true;
    span[0].classList.add('is-disabled');
}

function able() {
    atk.disabled = false;
    span[0].classList.remove('is-disabled');
}