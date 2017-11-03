import Map from "./src/map";
import Kingdom from "./src/kingdom.js";

let express = require("express");
let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let KingdomsUsersId;
let map = new Map();
let GoogleAuth = require("google-auth-library");
let auth = new GoogleAuth();
let clientId =
  "464871564601-ie5d2lejdvia089pfgcghh6eujunojg0.apps.googleusercontent.com";
let client = new auth.OAuth2(clientId, "", "");
let users = [
  {
    id: "113232695409700449706",
    pseudo: "sheep",
    startingZone: 1,
    ressources: {
      food: 25,
      wood: 35,
      stone: 6,
      men: 5
    },
    zonesInvaded: [{ id: 3, citizen: 3 }]
  }
];

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/static/view/index.html");
  app.use(express.static(__dirname + "/static"));
});

io.on("connection", function(socket) {
  console.log("connection");

  let kingdom;
  socket.on("connectionUser", function(tokenId) {
    const verifyToken = new Promise(function(resolve, reject) {
      client.verifyIdToken(
        tokenId,
        clientId,
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
        function(e, login) {
          if (e) {
            console.error(e);
          }
          var payload = login.getPayload();
          console.log("payload : " + JSON.stringify(payload));
          var userid = payload["sub"];
          if (
            users.reduce((accu, user) => {
              if (user.id == userid || accu) {
                return true;
              }
            }, false)
          ) {
            let user = users.reduce((accu, user) => {
              if (user.id == userid || accu) {
                return user;
              }
            }, false);
            kingdom = new Kingdom(
              socket,
              map,
              userid,
              user.startingZone,
              user.ressources
            );
          } else {
            //TODO : startingzone dynamic with 2tab village one already owned and one free to be get
            kingdom = new Kingdom(socket, map, userid, 0, {
              food: 10,
              wood: 10,
              stone: 5,
              men: 1
            });
          }
          // If request specified a G Suite domain:
          //var domain = payload['hd'];
        }
      );
    });
  });

  socket.on("console message", function(msg) {
    if (msg == "getMap") {
      socket.emit("console message", map.displayMap());
    } else if (msg == "getMyUserId" || msg == "getId") {
      socket.emit("console message", kingdom.getUserId());
    } else if (msg == "getMyRessources") {
      socket.emit("console message", JSON.stringify(kingdom.getRessources()));
    } else if (msg == "getMyZones" || msg == "getZ") {
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
