class Spell {
    constructor (item, effect, mana, cooldown) {
        this.item = item;
        this.effect = effect;
        this.mana = mana;
        this.cooldown = cooldown;
    }
    canCast(player) {
        return player.mana >= this.mana;
    }
    cast (player) {
        if (!this.canCast(player)) return false;
        if (this.item.cooldown) return false;
        
        player.mana -= this.mana;
        this.effect(player);
        this.item.currentMaxCooldown = this.item.cooldown = this.cooldown;
        return true;
    }
}