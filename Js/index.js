
var inicio, vida1, vida2, fight, x = 0, n, critico = 150;
var vida1 = 300;
var vida2 = 300;
var golpes = [
    "socou",
    "chutou",
    "deu uma facada",
    "deu uma garrafada",
    "tacou a mãe",
    "fez comer salada",
    "deu uma barrigada",
    "amassou",
    "cuspiu na cara",
    "robou o alimento",
    "chamou de gordo",
    "chingou de magro",
    "deu uma caderada",
    "chamou um vegano",
    "deu leite desnatado",
    "falou q a mãe nasceu pelada",
    "mordeu",
    "deu um Tapão"
];

function comecar(){

    btn1.style.display = "none";
    btn2.style.display = "none";
    start.style.display = "none";

    fight = setInterval(function(){

        inicio = Math.random();
        inicio = (inicio * 2).toFixed(0);

        if(inicio == 1){
            btn1.click();
        }else{
            btn2.click();
        }

    }, 1000);

}

function menos1(){

    x = x + 21;
    let valor = Math.random();
    valor = (valor * 50).toFixed(0);
    if (valor == 50) {
        valor = critico;
        vida1 = vida1 - valor;
    }else{
        vida1 = vida1 - valor;
    }
    


    barraV1.style.width = vida1 + "px";
    barraV1.innerHTML = vida1;

    n = Math.floor((Math.random() * golpes.length));
    log.innerHTML += `<span class='text-danger'>Gordão vermelho ${golpes[n]}  e deu ${valor} de dano! <br/></span>`;

    log1.scrollTop = x;

    if(vida1 <= 150){
        barraV1.style.backgroundColor = "orange";
    }

    if(vida1 <= 50){
        barraV1.style.backgroundColor = "red";
    }

    if(vida1 <= 0){

        barraV1.style.width = 0 + "px";
        condicao = false;
        gordao1.src = "imagens/caixao.jpeg";

        btn1.style.display = "none";
        btn2.style.display = "none";
        start.style.display = "none";
        clearInterval(fight);

        divResultado.innerHTML = "Gordão de vermelho venceu a batalha de Comida!";

    }

}

function menos2(){
    x = x + 21;

    let valor = Math.random();

    valor = (valor * 50).toFixed(0);
    if (valor == 50) {
        valor = critico;
        vida2 = vida2 - valor;
    }else{
        vida2 = vida2 - valor;
    }

    barraV2.style.width = vida2 + "px";
    barraV2.innerHTML = vida2;

    n = Math.floor((Math.random() * golpes.length));
    log.innerHTML += `<span class='text-info'>Gordão azul ${golpes[n]} e deu ${valor} de dano! <br/></span>`;
    log1.scrollTop = 500;

    if(vida2 <= 150){
        barraV2.style.backgroundColor = "orange";
    }

    if(vida2 <= 50){
        barraV2.style.backgroundColor = "red";
    }

    if(vida2 <= 0){

        barraV2.style.width = 0 + "px";
        condicao = false;
        gordao2.src = "imagens/caixao.jpeg";

        btn1.style.display = "none";
        btn2.style.display = "none";
        start.style.display = "none";
        clearInterval(fight);

        divResultado.innerHTML = "Gordão de azul venceu a batalha de Comida!";

    }

}

function reset(){

    vida1 = 300;
    vida2 = 300;

    barraV1.style.width = vida1 + "px";
    barraV1.innerHTML = vida1;
    barraV1.style.backgroundColor = "blue";

    barraV2.style.width = vida2 + "px";
    barraV2.innerHTML = vida2;
    barraV2.style.backgroundColor = "blue";

    gordao1.src = "imagens/luta1.png";
    gordao2.src = "imagens/luta2.png";
    
    btn1.style.display = "block";
    btn2.style.display = "block";
    start.style.display = "block";

    divResultado.innerHTML = "";
    log.innerHTML = "";
    clearInterval(fight);
}
var socket = io.connect('http://localhost:4000'); //Se conecta ao servidor

