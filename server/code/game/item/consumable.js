class Consumable extends Item {
    constructor(player, asset, description, effect) {
        super(player, asset, description);
        this.effect = effect;
    }
    isEquippable() { return false; }
}