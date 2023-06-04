
//@ Scarecrow
new Structure("maze_basic", 5, 5, 21000, [
    (world, x, y) => new Npc(world, 2 + x, 3 + y, "scarecrow",
        new Quest(
            "Spiders keep eating my crops.\n\nCould you kill five of them and\nbring me their corpses, please?\n\nI would like to put them up on spikes\nto scare away any future thieves.",
            "Thank you. Good luck out there!",
            "Thank you for the spiders!\n\nHere, take this Spider Slayer,\nI won't need it anymore...",
            ["spider_carcass"], [5],
            new Item(this, "spider_slayer", "Spider Slayer\nDeals 50 damage.").addSpell(function (player) {
            const x = player.getDirectionVector().x;
            const y = player.getDirectionVector().y;
            new Projectile(player.world, player, [player], player.x, player.y, "#cd0000", false)
                .setTickAbility(function () { this.x += x; this.y += y })
                .setAbility(function (entity) { this.hit(entity, 50) })
                .setDiesOnCollide()
        }, 100, 20)
        )
    ).setOnEnd(function () {this.structure.forEach(e => e.remove())}),
    (world, x, y) => new Block(world, 0 + x, 1 + y, "wheat", false),
    (world, x, y) => new Block(world, 1 + x, 1 + y, "wheat", false),
    (world, x, y) => new Block(world, 2 + x, 1 + y, "wheat", false),
    (world, x, y) => new Block(world, 3 + x, 1 + y, "wheat", false),
    (world, x, y) => new Block(world, 4 + x, 1 + y, "wheat", false),
    (world, x, y) => new Block(world, 0 + x, 2 + y, "wheat", false),
    (world, x, y) => new Block(world, 1 + x, 2 + y, "wheat", false),
    (world, x, y) => new Block(world, 2 + x, 2 + y, "wheat", false),
    (world, x, y) => new Block(world, 3 + x, 2 + y, "wheat", false),
    (world, x, y) => new Block(world, 4 + x, 2 + y, "wheat", false),
    
    (world, x, y) => new Block(world, 0 + x, 4 + y, "wheat", false),
    (world, x, y) => new Block(world, 1 + x, 4 + y, "wheat", false),
    (world, x, y) => new Block(world, 2 + x, 4 + y, "wheat", false),
    (world, x, y) => new Block(world, 3 + x, 4 + y, "wheat", false),
    (world, x, y) => new Block(world, 4 + x, 4 + y, "wheat", false),
    (world, x, y) => new Block(world, 0 + x, 5 + y, "wheat", false),
    (world, x, y) => new Block(world, 1 + x, 5 + y, "wheat", false),
    (world, x, y) => new Block(world, 2 + x, 5 + y, "wheat", false),
    (world, x, y) => new Block(world, 3 + x, 5 + y, "wheat", false),
    (world, x, y) => new Block(world, 4 + x, 5 + y, "wheat", false),
]);