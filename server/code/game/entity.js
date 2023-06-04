class Entity {
    constructor (world, x, y, asset, collides, displayLayer) {
        this.world = world;
        this.autoAdd();
        this.x = x;
        this.y = y;
        this.asset = asset;
        this.collides = collides;
        this.displayLayer = displayLayer;
        this.eventBus = [];
    }
    autoAdd() { this.world.addEntity(this); }
    canDie() { return false; }
    canTakeDamage() { return false; }
    remove() { this.removed = true; }
    die() { if (this.dieFn) this.dieFn(); }
    setDie(die) { this.dieFn = die; return this; }
    getNearBy(distance) {
        return this.world.getNearBy(this.x, this.y, distance).filter(e => e != this);
    }
    getAllTakenNearBy(distance) {
        return this.world.getAllTakenNearBy(this.x, this.y, distance).filter(e => e != this);
    }
    canMove (x, y) {
        if (this.world.blockList[(this.x + x) + "_" + (this.y + y)])
            return false;
            
        const entities = this.getNearBy(6);
        for (let e of entities)
            if (e.collides && e.x == this.x + x && e.y == this.y + y)
                return false;
                
        return true;
    }
    move (x, y) {
        if (!this.canMove(x, y))
            return false;
        this.x += x;
        this.y += y;
        return true;
    }
    forceMove (x, y) {
        this.x += x;
        this.y += y;
    }
    moveToWorld(world) {
        this.world.remove(this);
        this.world = world;
        world.addEntity(this)
    }
    tick() {
        for (let i in this.eventBus) {
            if (!this.eventBus[i].cd--) {
                this.eventBus[i].fn.bind(this)();
                this.eventBus.splice(i, 1);
            }
        }
    }
    setStructure(structure) {
        this.structure = structure;
        return this;
    }
}