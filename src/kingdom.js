class Kingdom {
  constructor(
    socket,
    owner = 1,
    startingZone = 1,
    startingRessources = { food: 10, wood: 10, stone: 5, men: 1 }
  ) {
    socket.emit("console message", "User connected <br>Map generation started");

    this.Owner = owner;
    this.zones = { 0: startingZone };
    this.startingRessources = startingRessources;
  }

  getUserId() {
    return this.Owner;
  }
}
export default Kingdom;
