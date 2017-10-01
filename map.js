/**
 * Created by emile on 30/09/2017.
 */
import Village from "./village"
import RessourseZone from "./ressourceZone"
class Map {
    constructor(socket){
        console.log("user connected map generation started");
        socket.emit('console message', "User connected <br>Map generation started");
        let village1 = new Village();
        let village2 = new Village();
        let village3 = new Village();
        let champ1 = new RessourseZone();
        let champ2 = new RessourseZone();
        let champ3 = new RessourseZone();
        let champ4 = new RessourseZone();
        let montagne1 = new RessourseZone();
        let lac1 = new RessourseZone();
        this.heigth = 3;
        this.width = 3;
        this.length = 8;

        this.json={
            0:village1,1:champ1,2:montagne1,
            3:champ2,4:champ3,5:lac1,
            6:village3,7:champ4,8:village2}
    }

    getMap(){
        let mapDom = "<div>";
        for(let i=0;i<=this.length;i++){
            if(i==0) {
                mapDom = mapDom + "<div>"
            }else if(i%this.width==0){
                mapDom = mapDom + "</div><br><div>"
            }
                console.log(i);
                mapDom = mapDom + "<span>" + this.json[i].character + "&#32&#32</span>"
        }
        mapDom = mapDom + "</div>";
        return mapDom
    }
}
export default Map ;