
//@ Fruit Flies
new Structure("maze_basic", 1, 1, 10000, [
(game, x, y) => new Animal(game, x, y, "fruit_flies", true, meleeFollow(4, 1).setAnimal(this), 180, 40, 10, [new Item(this, "fruit_flies", "Time flies like an arrow.\nFruit knives cuts a banana.\n\nThis item consumes 40 health,\nbut causes you to regenerate\nmana 2x faster for 6 seconds.").addSpell(function (player) {
        player.health -= 40;
        player.manaRegen *= 2;
        player.eventBus.push({cd: 60, fn: function() {this.manaRegen /= 2;}})
        }, 60, 60), null], [1, 9])
        
        .addAbility({
        fn: function () {
            if (this.currentPlayer) {
                const radius = Math.sqrt((this.currentPlayer.x - this.x)**2 + (this.currentPlayer.y - this.y)**2);
                const angle = Math.random() * Math.PI * 2;
                this.x = this.currentPlayer.x + Math.floor(Math.cos(angle) * radius);
                this.y = this.currentPlayer.y + Math.floor(Math.sin(angle) * radius);
            }
        }, cd: 20
    })
]);