const throughBlocks = (interval, distance) => new AI(
    function () {
        this.timer++;
    },
    function (player) {
        if (this.timer >= interval) {
            const ifn = this.emptyBfs(player.x, player.y, distance)
            this.animal.forceMove(ifn.x - this.animal.x, ifn.y - this.animal.y)
            
            this.timer = 0;
        }
    }
);