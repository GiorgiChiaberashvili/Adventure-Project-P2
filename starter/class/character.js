class Character {

  constructor(name, description, currentRoom) {
    // Fill this in
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.health = 100;
    this.strength = 10;
    this.items = [];
  }

  applyDamage(amount) {
    // Fill this in
    this.health -= amount
    if (this.health === 0) {
      this.die()
    }
  }
  die() {
    this.currentRoom.items.push(...this.items)
    this.currentRoom = null;
  }
}

module.exports = {
  Character,
};
