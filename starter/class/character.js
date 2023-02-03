const { Food } = require('./food.js');

class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.strength = 10;
    this.health = 100;
  }

  applyDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.dropAllItems();
    this.currentRoom = null;
  }

  takeItem(itemName) {
    this.items.push(this.currentRoom.getItemByName(itemName));
    this.currentRoom.removeItemByName(itemName);
  }

  dropAllItems() {
    while (this.items.length > 0) {
      this.dropItem(this.items[0].name);
    }
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

}

module.exports = {
  Character,
};
