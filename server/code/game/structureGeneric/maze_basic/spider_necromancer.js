
//@ Spider Necromancer
new Structure("maze_basic", 1, 1, 18000, [
    (world, x, y) => new Animal(world, x, y, "spider_necromancer", true, meleeFollow(5, 1).setAnimal(this), 500, 20, 15, [
        new Item(this, "heart_grimoire", "Grimoire of Heart\nIt contains three spells.").addSpell(function (player) {
                new Projectile(player.world, player, [player], player.x, player.y, "#44adcd", false, 1, 100)
                    .setTickAbility(function () { this.health--; })
                    .setAbility(function (entity) { this.hit(entity, 30) })
                    .setDiesOnCollide()
            }, 30, 10).addSpell(function (player) {
                const dir = player.getDirectionVector(4);
                player.move(dir.x, dir.y);
            }, 40, 20).addSpell(function (player) {
                const asset = "player_" + directionAsset[player.direction];
                for (let i = 0; i < 12; i++)
                    new Animal(player.world, player.x + Math.floor(Math.random() * 11) - 5, player.y + Math.floor(Math.random() * 11) - 5, asset, true, doNothing(), 200, 0, 0).addAbility({fn: function () {if (this.hasTicked) this.remove(); this.hasTicked = true;}, cd: 200});
            }, 80, 80),
        new Item(this, "spider_heart", "Spider's Heart\n+120 max mana.").addPassive(new Ability(
            AbilityType.Passive,
            function () {
                this.maxMana += 120;
            }
        ))
    ],
        [80, 20]
    ).addAbility({
        fn: function () {
            if (this.currentPlayer) {
                new Projectile(world, this, [this], this.x, this.y, "#44adcd", false, 1, 100)
                    .setTickAbility(function () { this.health--; })
                    .setAbility(function (entity) { this.hit(entity, 50) })
                    .setDiesOnCollide()
            }
        }, cd: 15
    }
    ).addAbility({
        fn: function() {
            this.subEntities = this.subEntities.filter(e => e.health > 0)
            if (this.subEntities.length < 6 && this.health < 500)
                this.subEntities.push(new Animal(world, this.x, this.y, "spider", true, meleeFollow(2, 1).setAnimal(this), 50, 30, 12));
        }, cd: 45
    })
]);