class Item {
    constructor (player, asset, description) {
        this.player = player;
        this.asset = asset;
        this.description = description;
        this.spells = [];
        this.passives = [];
        this.cooldown = 0;
        this.currentMaxCooldown = 2;
    }
    
    isEquippable() { return true; }
    
    tick() {
        if (this.cooldown) this.cooldown--;

        this.passives.filter(e => e.type == AbilityType.Passive).forEach(e => e.effect.bind(this.player)());
    }
    
    addSpell(effect, mana, cooldown) {
        this.spells.push(new Spell(this, effect, mana, cooldown));
        return this;
    }
    
    addPassive(passive) {
        this.passives.push(passive);
        return this;
    }
}