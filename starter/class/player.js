const { Character } = require('./character');
const { Enemy } = require('./enemy');
const { Food } = require('./food');
const { Room } = require('./room')
const { Item } = require('./item')

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

    // Fill this in
    if (this.currentRoom instanceof Room) {
      let currentRoomItems = this.currentRoom.items;
      for (let i = 0; i < currentRoomItems.length; i++) {
        let currentItem = currentRoomItems[i];
        if (currentItem instanceof Item) {
          if (currentItem.name === itemName) {
            this.items.push(this.currentRoom.items.pop(itemName));
          }
        }
      }
    }
  }

  dropItem(itemName) {

    // Fill this in
    let currentRoomItems = this.currentRoom.items;
    for (let i = 0; i < this.items.length; i++) {
      let currentItem = this.items[i];
      if (currentItem instanceof Item) {
        if (currentItem.name === itemName) {
          this.items.pop(currentItem);
          currentRoomItems.push(currentItem);
        }
      }
    }
  }

  eatItem(itemName) {

    // Fill this in
    for (let i = 0; i < this.items.length; i++) {
      let currentItem = this.items[i];
      if (currentItem instanceof Food) {
        if (currentItem.name === itemName) {
          this.items.pop(currentItem);
        }
      }
    }
  }

  getItemByName(name) {

    // Fill this in
    for (let i = 0; i < this.items.length; i++) {
      let currentItem = this.items[i];
      if (currentItem instanceof Item) {
        if (currentItem.name === name) {
          return this.items.pop(currentItem);
        }
      }
    }
  }

  hit(name) {

    // Fill this in

  }


  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
