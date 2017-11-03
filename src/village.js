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
    this.id;
  }
  getView() {
    return (
      "citizen : " +
      this.citizen +
      "<br>" +
      "name : " +
      this.name +
      "<br>" +
      "x : " +
      this.getX() +
      "<br>" +
      "y : " +
      this.getY() +
      "<br>"
    );
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
  setId(id) {
    this.id = id;
  }
}
export default Village;
