import Map from "./map"
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){

    let map = new Map(socket);
    socket.on('console message', function(msg){
        if(msg=="getMap") {
            console.log("getmap : " + map.getMap());
            socket.emit('console message',map.getMap());
        } else {
            console.log('message: ' + msg);
            socket.emit('console message', msg);
}
    //    show map
        // show village1
    });
});
http.listen(3000, function(){
    console.log('listening on *:3000');
});