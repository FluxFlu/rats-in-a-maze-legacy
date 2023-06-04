
//@ Snake
new Structure("maze_basic", 1, 1, 8000, [
    (world, x, y) => new Animal(world, x, y, "snake", true, meleeFollow(3, 1).setAnimal(this), 400, 40, 9, [new Consumable(this, "pitchforked_tongue", "The pitchforked tongue\nof a snake.\nHeals 150 HP.", function () {this.player.heal(150)})], [1])
]);