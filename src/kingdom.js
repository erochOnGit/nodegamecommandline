class Kingdom {
  constructor(
    socket,
    worldMap,
    owner = 1,
    startingZone = 1,
    ressources = { food: 10, wood: 10, stone: 5, men: 1 },
    zonesInvaded = []
  ) {
    socket.emit("console message", "User connected <br>Map generation started");
    this.id;
    this.Owner = owner;
    this.zones = [];
    this.zones.push(worldMap.getStartingVillage(startingZone));
    this.Ressources = ressources;
    //for zonesInvaded zones.push zone
  }

  getUserId() {
    return this.Owner;
  }

  getRessources() {
    return this.Ressources;
  }

  getZones() {
    console.log(JSON.stringify(this.zones));
    return this.zones[0].getView() + "<br>";
  }
}
export default Kingdom;
