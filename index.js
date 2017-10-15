import Map from "./src/map";
let express = require("express");
let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/static/view/index.html")
    app.use(express.static(__dirname + '/static'));
});

io.on("connection", function(socket) {
  let map = new Map(socket);
  socket.on("console message", function(msg) {
    if (msg == "getMap") {
      socket.emit("console message", map.getMap());
    } else {
      console.log("message: " + msg);
      socket.emit("console message", msg);
    }
    //    show map
    // show village1
  });
});
http.listen(3000, function() {
  console.log("listening on *:3000");
});
