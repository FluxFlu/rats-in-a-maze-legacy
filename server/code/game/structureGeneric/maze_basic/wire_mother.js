
//@ Wire Mother
new Structure("maze_basic", 1, 1, 42000, [
    (world, x, y) => new Npc(world, x, y, "wire_mother",
        new Quest(
            "The wire frame creaks.\n\"could you...\nbring me my child?\"",
            "\"thank you.\"",
            "You watch as she hugs the monkey.\n\n\"thank you.\ni won't need this anymore...\"",
            ["baby_monkey_carcass"], [1],
            new Item(this, "milk_bottle", "Milk Bottle\nHeals 35 HP.").addSpell(function (player) {
                player.heal(35);
        }, 100, 50)
        )
    ),
    (world, x, y) => new Animal(world, x + Math.ceil(Math.random() * 15) - 30, y + Math.ceil(Math.random() * 15) - 30, "baby_monkey", true, meleeFollow(3, 1).setAnimal(this), 200, 60, 30, [new Consumable(this, "baby_monkey_carcass", "The carcass of a baby monkey.\nEverything above the jaw\nand the front leg are gone.\nHeals 200 HP.", function () {this.player.heal(200)})], [1])
]);