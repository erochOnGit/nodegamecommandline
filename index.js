import Map from "./src/map";
import Kingdom from "./src/kingdom.js";

let express = require("express");
let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let KingdomsUsersId = 0;
let map = new Map();
var admin = require("firebase-admin");

var serviceAccount = require(__dirname +
  "/kingdom-50680-firebase-adminsdk-l1gn3-dd2d7d74bc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kingdom-50680.firebaseio.com"
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/static/view/index.html");
  app.use(express.static(__dirname + "/static"));
});

io.on("connection", function(socket) {
  KingdomsUsersId++;

  let kingdom = new Kingdom(socket, map, KingdomsUsersId, KingdomsUsersId, {
    food: 10,
    wood: 10,
    stone: 5,
    men: 1
  });

  socket.on("console message", function(msg) {
    if (msg == "getMap") {
      socket.emit("console message", map.getMap());
    } else if (msg == "getMyUserId") {
      socket.emit("console message", kingdom.getUserId());
    } else if (msg == "getMyRessources") {
      socket.emit("console message", JSON.stringify(kingdom.getRessources()));
    } else if (msg == "getMyZones") {
      socket.emit("console message", JSON.stringify(kingdom.getZones()));
    } else {
      console.log("message: " + msg);
      socket.emit("console message", msg);
    }
  });
});
http.listen(3000, function() {
  console.log("listening on *:3000");
});
