
//@ Wolf
new Structure("deserted_cells", 1, 1, 1000, [
    (world, x, y) => new Animal(world, x, y, "wolf", true, throughBlocks(3, 1).setAnimal(this), 400, 45, 8, [new Consumable(this, "wolf_carcass", "The carcass of a wolf.\nHeals 170 HP.", function () {this.player.heal(170)}),
        new Item(this, "wolf_fang", "Wolf Fang\nDeals 65 damage.").addSpell(function (player) {
            const x = player.getDirectionVector().x;
            const y = player.getDirectionVector().y;
            new Projectile(player.world, player, [player], player.x, player.y, "#ff2bc3", false)
                .setTickAbility(function () { if (Math.abs(this.x + this.y - (player.x + player.y)) > 3) this.health = 0; this.x += x; this.y += y })
                .setAbility(function (entity) { this.hit(entity, 65) })
                .setDiesOnCollide()
        }, 20, 7)
    ], [9, 1])
    .addAbility({
        fn: function () {
            if (this.currentPlayer) {
                const xDiff = this.currentPlayer.x - this.x;
                const yDiff = this.currentPlayer.y - this.y;
                const x = xDiff > 0 ? 1 : -1;
                const y = yDiff > 0 ? 1 : -1;
                new Projectile(world, this, [this], this.x, this.y, "#ff2bc3", false)
                    .setTickAbility(function () {
                        if (!(this.x == this.caster.x && this.y == this.caster.y))
                        this.world.blockList[this.x + '_' + this.y] = true;
                        this.x += x;
                        this.y += y;
                    })
                    .setAbility(function (entity) { this.hit(entity, 45) })
                    .setDiesOnCollide()
            }
        }, cd: 20
    })
    .setDie(function () {
        for (let x = -1; x <= 1; x++)
            for (let y = -1; y <= 1; y++)
                this.world.blockList[(this.x + x) + '_' + (this.y + y)] = false;
    })
]);