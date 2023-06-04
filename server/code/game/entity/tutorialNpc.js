class TutorialNpc extends Entity {
    constructor(world, x, y, asset, text) {
        super(world, x, y, asset, true, 1);
        this.text = text;
    }
    setOnEnd(die) {
        this.die = die;
        return this;
    }
    interaction(player) {
        player.untilMoveText = this.text;
    }
    deInteract(player) {
        player.untilMoveText = null;
    }
}