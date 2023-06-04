
//@ Skeleton
new Structure("maze_basic", 1, 1, 9500, [
    (world, x, y) => new Animal(world, x, y, "skeleton", true, meleeFollow(5, 1).setAnimal(this), 300, 50, 15, [
        new Item(this, "bone_staff", "Bone Staff\nDeals 40 damage.").addSpell(function (player) {
            const x = player.getDirectionVector().x;
            const y = player.getDirectionVector().y;
            new Projectile(player.world, player, [player], player.x, player.y, "#44adcd", false)
                .setTickAbility(function () { if (Math.abs(this.x + this.y - (player.x + player.y)) > 1) this.health = 0; this.x += x; this.y += y })
                .setAbility(function (entity) { this.hit(entity, 40) })
                .setDiesOnCollide()
        }, 20, 7),
        new Item(this, "skeleton_heart", "Skeleton's Heart\n+60 max health.").addPassive(new Ability(
            AbilityType.Passive,
            function () {
                this.maxHealth += 60;
            }
        ))
    ],
        [70, 30]
    ).addAbility({
        fn: function () {
            if (this.currentPlayer) {
                const xDiff = this.currentPlayer.x - this.x;
                const yDiff = this.currentPlayer.y - this.y;
                const x = !xDiff ? 0 : xDiff > 0 ? 1 : -1;
                const y = !yDiff ? 0 : yDiff > 0 ? 1 : -1;
                new Projectile(world, this, [this], this.x, this.y, "#44adcd", false)
                    .setTickAbility(function () {
                        this.x += x;
                        this.y += y;
                    })
                    .setAbility(function (entity) { this.hit(entity, 30) })
                    .setDiesOnCollide()
            }
        }, cd: 20
    })
]);