class ItemEntity extends Entity {
    constructor(world, x, y, item) {
        super(world, x, y, item.asset, false, 0);
        this.item = item;
        this.health = 1;
    }
    canDie() { return true; }
    canTakeDamage() { return false; }
}