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

io.on('connection', (socket) => {//É mostrado quando alguem se conecta
    console.log("Alguem acessou a página do gráfico >-<" + socket.id); 
})