const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom, cooldown = 3000) {
    super(name, description, currentRoom);
    this.cooldown = cooldown;
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // generate a random direction from valid exits to currentRoom
    let direction = this.getRandomExit();

    //try to get the room in that direction nextRoom
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    //set currentRoom to the randomly generated valid exit
    this.currentRoom = nextRoom;

    this.cooldown = 3000;
  }

  getRandomExit() {
    //generate an array of valid exits from the currentRoom
    const exits = this.currentRoom.getExits();

    //generate a random key from the exits array
    let direction = exits[Math.floor(Math.random() * exits.length)];

    return direction;
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 3000;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack(damage = 10) {
    this.attackTarget.applyDamage(damage);
    this.cooldown = 3000;
  }

  applyDamage(amount) {
    this.health -= amount;

    this.attackTarget = this.player;
  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in

  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
