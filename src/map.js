/**
 * Created by emile on 30/09/2017.
 */
import Village from "./village";
import RessourseZone from "./ressourceZone";
class Map {
  constructor() {
    console.log("user connected map generation started");
    this.villages = [];
    let village1;
    let village2;
    let village3;
    this.villages.push((village1 = new Village("name")));
    this.villages.push((village2 = new Village("name")));
    this.villages.push((village3 = new Village("name")));
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

    this.heigth = 4;
    this.width = 4;
    this.length = 15;
    this.json = [
      montagne1,
      village1,
      champ1,
      lac1,
      betail1,
      champ2,
      champ3,
      betail2,
      village2,
      lac2,
      montagne2,
      village3,
      champ4,
      montagne3,
      lac3,
      champ5
    ];
    let jsonIndex = 0;
    this.json.forEach(function(ressource) {
      ressource.setId(jsonIndex);
      jsonIndex++;
    });

    let j = 0;
    let k = 1;
    for (let i = 0; i <= this.length; i++) {
      // json[i].setCoordinate(i/k,j)
      if (j == 0 && i < this.width) {
        console.log("ikj " + i, j);
        this.json[i].setCoordinate(i, j);
      } else if (i % this.width == 0) {
        j++;
        console.log("in" + (i - this.width * j + " " + j));
        this.json[i].setCoordinate(i, j);
      } else {
        console.log("ikj " + (i - this.width * j), j);
      }
    }
  }

  displayMap() {
    let mapDom = "<div>";
    for (let i = 0; i <= this.length; i++) {
      if (i == 0) {
        mapDom = mapDom + "<div>";
      } else if (i % this.width == 0) {
        mapDom = mapDom + "</div><br><div>";
      }
      mapDom = mapDom + "<span>" + this.json[i].character + "&#32&#32</span>";
    }
    mapDom = mapDom + "</div>";
    return mapDom;
  }

  getStartingVillage(startingZone) {
    if (this.villages.length > startingZone) {
      return this.villages[startingZone];
    } else {
      return "sorry there is no other place on this server try on another";
    }
  }
}
export default Map;
