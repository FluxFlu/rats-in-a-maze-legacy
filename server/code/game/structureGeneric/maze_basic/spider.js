
//@ Spider
new Structure("maze_basic", 1, 1, 2500, [
    (world, x, y) => new Animal(world, x, y, "spider", true, meleeFollow(4, 1).setAnimal(this), 200, 20, 8, [new Consumable(this, "spider_carcass", "The carcass of a spider.\nHeals 90 HP.", function () {this.player.heal(90)})], [1])
]);