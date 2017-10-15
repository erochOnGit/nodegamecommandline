/**
 * Created by emile on 30/09/2017.
 */

import Kingdom from "./kingdom.js";
import Village from "./village";
import RessourseZone from "./ressourceZone";
class Map {
  constructor(socket) {
    console.log("user connected map generation started");
    socket.emit("console message", "User connected <br>Map generation started");
    let village1 = new Village();
    let village2 = new Village();
    let village3 = new Village();
    let champ1 = new RessourseZone("&#9638");
    let champ2 = new RessourseZone("&#9638");
    let champ3 = new RessourseZone("&#9638");
    let champ4 = new RessourseZone("&#9638");
    let champ5 = new RessourseZone("&#9638");
    let montagne1 = new RessourseZone("&#9641");
    let montagne2 = new RessourseZone("&#9641");
    let montagne3 = new RessourseZone("&#9641");
    let lac1 = new RessourseZone("&#9634");
    let lac2 = new RessourseZone("&#9634");
    let lac3 = new RessourseZone("&#9634");
    let betail1 = new RessourseZone("&#9635");
    let betail2 = new RessourseZone("&#9635");
    let kingdom = new Kingdom();
    this.heigth = 4;
    this.width = 4;
    this.length = 15;

    this.json = {
      0: montagne1,
      1: village1,
      2: champ1,
      3: lac1,
      4: betail1,
      5: champ2,
      6: champ3,
      7: betail2,
      8: village2,
      9: lac2,
      10: montagne2,
      11: village3,
      12: champ4,
      13: montagne3,
      14: lac3,
      15: champ5
    };
  }

  getMap() {
    let mapDom = "<div>";
    for (let i = 0; i <= this.length; i++) {
      if (i == 0) {
        mapDom = mapDom + "<div>";
      } else if (i % this.width == 0) {
        mapDom = mapDom + "</div><br><div>";
      }
      console.log(i);
      mapDom = mapDom + "<span>" + this.json[i].character + "&#32&#32</span>";
    }
    mapDom = mapDom + "</div>";
    return mapDom;
  }
}
export default Map;
