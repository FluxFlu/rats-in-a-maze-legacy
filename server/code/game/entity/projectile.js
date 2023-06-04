class Projectile extends Entity {
    constructor(world, caster, exclude, x, y, asset, collides, range, health, damageable) {
        super(world, x, y, asset, collides, 2);
        this.caster = caster;
        this.exclude = exclude;
        this.ability = () => {};
        this.tickAbility = () => {};
        this.damageable = damageable;
        this.range = range || 1;
        this.health = health || 1;
        this.timer = 0;
    }
    canDie() { return true; }
    canTakeDamage() { return this.damageable; }
    hit(entity, damage) {
        entity.takeDamage(this, damage);
    }
    loseHealth(amount) {
        this.health -= amount;
    }
    takeDamage(source, amount) {
        this.loseHealth(amount);
    }

    setDiesOnCollide() {
        this.diesOnCollide = true;
        return this;
    }
    
    setTickAbility(tick) {
        this.tickAbility = tick;
        return this;
    }
    tick() {
        if (this.health <= 0) return;
        
        this.tickAbility();

        const targets = this.getNearBy(this.range).filter(e => !this.exclude.includes(e) && e.canTakeDamage() && ((this.caster instanceof Player) || (this.caster instanceof Animal && e instanceof Player)));
        if (targets.length) {
            for (let e of targets) {
                    this.ability(e);
                    if (this.diesOnCollide) this.health = 0; else this.health--;
            }
        }
        
        if (this.diesOnCollide && this.world.getAllTaken().filter(e => e.x == this.x && e.y == this.y && !this.exclude.includes(e) && e.collides).length)
            this.health = 0;

        super.tick();
    }
    setAbility(ability) {
        this.ability = ability;
        return this;
    }
}