class Kingdom {
  constructor(
    owner = "User1",
    startingZone = 1,
    startingRessources = { food: 10, wood: 10, stone: 5, men: 1 }
  ) {
    this.Owner = owner;
    this.zones = {0:startingZone};
    this.startingRessources = startingRessources;
  }
}
export default Kingdom;
