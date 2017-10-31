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
let users = [{ id: "113232695409700449706", pseudo: "sheep" }];

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
            users.reduce((accu,user) => {
              console.log("user.id : " + user.id);
              console.log("userid : " + userid);
              console.log("user.id == userid : " + (user.id == userid));
              if (user.id == userid || accu) {
                return true;
              }
            },false)
          ) {
            kingdom = new Kingdom(socket, map, userid, 3, {
              food: 25,
              wood: 35,
              stone: 6,
              men: 5
            });
          } else {
            kingdom = new Kingdom(socket, map, 6, 6, {
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
      socket.emit("console message", map.getMap());
    } else if (msg == "getMyUserId" || msg == "getId") {
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
