class Animal extends Entity {
    constructor (world, x, y, asset, collides, AI, health, damage, viewDistance, drops = [], dropRates = []) {
        super(world, x, y, asset, collides, 1);
        this.AI = AI.setAnimal(this);
        this.health = health;
        this.maxHealth = health;
        this.damage = damage;
        this.viewDistance = viewDistance;
        this.drops = drops;
        this.dropRates = dropRates;
        this.iFrames = 0;
        this.maxIFrames = 8;
        this.abilities = [];
        this.abilityCooldowns = [];
        this.subEntities = [];
    }
    
    canDie () { return true; }
    
    canTakeDamage() { return true; }

    hit(entity) {
        if (entity.canTakeDamage())
            entity.takeDamage(this, this.damage);
    }
    loseHealth(amount) {
        this.health -= amount;
    }
    takeDamage(source, amount) {
        if (this.iFrames) return false;
        this.iFrames = this.maxIFrames;
        this.loseHealth(amount);
    }
    die() {
        super.die();
        
        if (!this.drops.length) return;
        
        if (this.drops.length == 1)
            return new ItemEntity(this.world, this.x, this.y, this.drops[0]);
        const rand = Math.random() * this.dropRates.reduce((e, i) => e + i);
        let f = 0;
        for (let i = 1; i < this.dropRates.length; i++) {
            if (this.dropRates[i] > rand)
                f = i;
            else break;
        }
        if (this.drops[f])
            new ItemEntity(this.world, this.x, this.y, this.drops[f]);
            
        
    }
    
    addAbility(ability) {
        ability.fn = ability.fn.bind(this)
        this.abilities.push(ability);
        this.abilityCooldowns.push(0);
        return this;
    }
    tick() {
        for (let i in this.abilities) {
            if (this.abilityCooldowns[i]--)
                continue;
            this.abilities[i].fn(this)
            this.abilityCooldowns[i] = this.abilities[i].cd;
        }
        if (this.iFrames) this.iFrames--;
        const enemies = this.getNearBy(this.viewDistance)
        const immediateEnemies = this.getNearBy(1);
        
        immediateEnemies.filter(e => e instanceof Player).forEach(e => this.hit(e));

        const players = enemies.filter(e => e instanceof Player);

        if (players.length) {
            this.currentPlayer = players.sort((a, b) => {Math.abs(this.x - a.x) + Math.abs(this.y - a.y) > Math.abs(this.x - b.x) + Math.abs(this.y - b.y)})[0];
            this.AI.onPlayer(this.currentPlayer);
        }
        
        this.AI.tick();
        
        super.tick();
    }
}