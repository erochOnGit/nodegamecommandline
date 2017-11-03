/**
 * Created by emile on 30/09/2017.
 */
class RessourceZone {
  constructor(character = "&#x26C6") {
    this.character = character;
    this.id;
    this.x;
    this.y;
  }
  setId(id) {
    this.id = id;
  }
  setX(x) {
    this.x = x;
  }
  getX() {
    return this.x;
  }
  setY(y) {
    this.y = y;
  }
  getY() {
    return this.y;
  }
  setCoordinate(x, y) {
    this.setX(x);
    this.setY(y);
  }
}
export default RessourceZone;
