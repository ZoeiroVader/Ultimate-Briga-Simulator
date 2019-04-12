var counterP = 0; 
var counterA = 0;
var counterB = 0; 
var lobby = {};
var Player = {};
var battle = {};
var ready = 0;

var express = require('express'); //Recupera o modulo Serial express

var app = express();

var path = require('path'); //Recupera o modulo path, que vem junto do express

var server = app.listen(4000, () => { //Inicia o servidor na porta 4000
    console.log("Recebendo solicitações na porta 4000...");
})

var io = require('socket.io')(server); //Recupera o modulo so socket.io e atrela o socket.io ao nosso servidor express.


app.use(express.static('public')); //Send index.html page on GET /



app.get('/', (req, res) => { //Simplesmente devolve a index.html quando for digitado no navegador localhost:4000
    res.sendFile('index.html', {
        root: path.join(__dirname, '..')
    })
})

app.get('/select', (req, res) => { //Simplesmente devolve a index.html quando for digitado no navegador localhost:4000
    res.sendFile('charselect.html', {
        root: path.join(__dirname, '..')
    })
})

io.on('connection', (socket) => {//É mostrado quando alguem se conecta
    console.log("Alguem Acessou: " + socket.id);

    socket.on('avaliable', function (player) { 
        console.log(battle);
        
        Player[counterP] = {
            id : socket.id,
            name : player
        }
        console.log(Player[counterP]);
        
        battle[counterP] = {
            player : player[counterP]
        }

        counterP++;
        if (battle['1'] != undefined) {
            lobby[counterA] = {
                players : battle
            }
            console.log(lobby);
            battle = {};
            counterA++;
            counterP = 0;
        }
    })
    socket.on('playerAction', function (player) {
        ready++;
        console.log(ready);
        if (ready >= 2) {
            io.sockets.emit('otherAction', player);
            console.log("deu");
            ready = 0;                   
        }
    })
    
    socket.on('char', function(char) {
        socket.broadcast.emit('character', position = char )              
    })
})

// io.on('char', function() {
//     console.log("a");
// });
