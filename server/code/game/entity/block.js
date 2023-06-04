class Block extends Entity {
    constructor (world, x, y, asset, collides, tick = () => {}) {
        super(world, x, y, asset, collides, 0);
        this.tick = tick;
    }
}