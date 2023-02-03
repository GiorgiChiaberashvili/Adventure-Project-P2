const { Character } = require('./character');
const { Enemy } = require('./enemy');
const { Food } = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {

    this.items.push(this.currentRoom.getItemByName(itemName));
    this.currentRoom.removeItemByName(itemName);

  }

  dropItem(itemName) {

    let item = this.getItemByName(itemName);

    this.currentRoom.items.push(item);

    this.removeItemByName(itemName);

  }

  eatItem(itemName) {

    let item = this.getItemByName(itemName);

    if (item instanceof Food) {
      this.removeItemByName(itemName);
    }

  }

  getItemByName(name) {

    let i = this.getItemIndexByName(name);
    return this.items[i];

  }

  getItemIndexByName(itemName) {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.name === itemName) {
        return i;
      }
    };
  }

  removeItemByName(itemName) {
    let i = this.getItemIndexByName(itemName);
    this.items.splice(i);
  }

  hit(name) {

    let enemy = this.currentRoom.getEnemyByName(name);
    enemy.applyDamage();

  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
