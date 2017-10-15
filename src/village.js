/**
 * Created by emile on 30/09/2017.
 */
class Village {
  constructor(name) {
    this.name = name;
    this.character = "&#9712";
    this.owner;
    this.citizen = 0;
    this.mairie;
    this.x;
    this.y;
  }
  getView() {
    return "citizen : " + this.citizen;
  }
  setCoordinate(x, y) {
    this.x = x;
    this.y = y;
  }
}
export default Village;
