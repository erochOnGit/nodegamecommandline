/**
 * Created by emile on 30/09/2017.
 */
import Village from "./village";
import RessourseZone from "./ressourceZone";
import villages from "./village.json";
import ressources from "./map.json";

class Map {
  constructor() {
    console.log("user connected map generation started");
    // this.villages = [];
    // let village1;
    // let village2;
    // let village3;
    // this.villages.push((village1 = new Village("name")));
    // this.villages.push((village2 = new Village("name")));
    // this.villages.push((village3 = new Village("name")));
    this.tabVillage = [];
    villages.map(village => {
      this.tabVillage.push(new Village(village.name));
    });

    this.tabRessources = [];
    ressources.map(ressource => {
      this.tabRessources.push(new RessourseZone(ressource.character));
    });

    // let champ1 = new RessourseZone("&#9638");
    // let champ2 = new RessourseZone("&#9638");
    // let champ3 = new RessourseZone("&#9638");
    // let champ4 = new RessourseZone("&#9638");
    // let champ5 = new RessourseZone("&#9638");
    // let montagne1 = new RessourseZone("&#9641");
    // let montagne2 = new RessourseZone("&#9641");
    // let montagne3 = new RessourseZone("&#9641");
    // let lac1 = new RessourseZone("&#9634");
    // let lac2 = new RessourseZone("&#9634");
    // let lac3 = new RessourseZone("&#9634");
    // let betail1 = new RessourseZone("&#9635");
    // let betail2 = new RessourseZone("&#9635");
    this.heigth = 4;
    this.width = 4;
    this.length = 15;
    this.tabMap = [
      this.tabRessources[0],
      this.tabVillage[0],
      this.tabRessources[1],
      this.tabRessources[2],
      this.tabRessources[3],
      this.tabRessources[4],
      this.tabRessources[5],
      this.tabRessources[6],
      this.tabRessources[7],
      this.tabVillage[1],
      this.tabRessources[8],
      this.tabRessources[9],
      this.tabVillage[2],
      this.tabRessources[10],
      this.tabRessources[11],
      this.tabRessources[12]
    ];
    let jsonIndex = 0;

    this.tabMap.forEach(function(azfnjfk) {
      azfnjfk.setId(jsonIndex);
      jsonIndex++;
    });

    let j = 0;
    let k = 1;
    console.log("generating map");
    for (let i = 0; i <= this.length; i++) {
      // json[i].setCoordinate(i/k,j)
      if (j == 0 && i < this.width) {
        console.log("index " + i, j);
        this.tabMap[i].setCoordinate(i, j);
      } else if (i % this.width == 0) {
        j++;
        console.log("index " + (i - this.width * j + " " + j));
        this.tabMap[i].setCoordinate(i - this.width * j, j);
      } else {
        console.log("index " + (i - this.width * j), j);
        this.tabMap[i].setCoordinate(i - this.width * j, j);
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
      mapDom = mapDom + "<span>" + this.tabMap[i].character + "&#32&#32</span>";
    }
    mapDom = mapDom + "</div>";
    return mapDom;
  }

  getStartingVillage(startingZone) {
    if (this.tabVillage.length > startingZone) {
      return this.tabVillage[startingZone];
    } else {
      return "sorry there is no other place on this server try on another";
    }
  }
}
export default Map;
