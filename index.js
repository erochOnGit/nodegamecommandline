import Map from "./src/map";
import Kingdom from "./src/kingdom.js";

let express = require("express");
let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let KingdomsUsersId;
let map = new Map();

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/static/view/index.html");
  app.use(express.static(__dirname + "/static"));
});

io.on("connection", function(socket) {
  console.log("connection");
  socket.on("connectionUser", function(profile) {
    console.log("profile" + profile);
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("Full Name: " + profile.getName());
    console.log("Given Name: " + profile.getGivenName());
    console.log("Family Name: " + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    KingdomsUsersId++;
    console.log(KingdomsUsersId);

    let kingdom = new Kingdom(socket, map, KingdomsUsersId, KingdomsUsersId, {
      food: 10,
      wood: 10,
      stone: 5,
      men: 1
    });
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
