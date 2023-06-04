class Npc extends Entity {
    constructor (world, x, y, asset, quests) {
        super(world, x, y, asset, true, 1);
        
        this.quests = quests.length ? quests : [quests];
        this.stage = 0;
        this.acceptStage = 0;
    }
    setOnEnd(die) {
        this.die = die;
        return this;
    }
    playerHasItems(inventory) {
        let final = true;
        this.quests[this.acceptStage].requirementItems.forEach((item, i) => {if (inventory.filter(e => e?.asset == item).length < this.quests[this.acceptStage].requirementCount[i]) return final = false});
        return final;
    }
    playerConsumeItems(inventory) {
        inventory.forEach((item, i) => {if (item?.asset && this.quests[this.acceptStage].requirementItems.includes(item.asset)) {inventory[i] = null; this.quests[this.acceptStage].requirementCount--; if (this.quests[this.acceptStage].requirementCount == 0) this.quests[this.acceptStage].requirementItems = "_"}})
    }
    interaction(player) {
        if (this.stage > this.acceptStage) {
            if (this.playerHasItems(player.inventory)) {
                this.playerConsumeItems(player.inventory)
                if (this.quests[this.acceptStage].reward)
                    new ItemEntity(this.world, player.x, player.y, this.quests[this.acceptStage].reward);
                player.untilMoveText = this.quests[this.acceptStage].rewardText;
                this.acceptStage++;
                player.quest = null;
                if (this.acceptStage == this.quests.length)
                    this.remove();
            }
        } else if (this.quests[this.stage].isDisplayed) {
            if (player?.quest?.npc && player?.quest?.npc != this) {
                player.quest.npc.remove();
            }
            player.untilMoveText = this.quests[this.stage].acceptText;
            player.quest = this.quests[this.stage];
            this.quests[this.stage].isDisplayed = false;
            this.stage++;
            player.quest.npc = this;
        } else {
            player.untilMoveText = this.quests[this.stage].text + '\n\n[Press L to accept]';
            this.quests[this.stage].isDisplayed = true;
        }
    }
    deInteract() {
        this.quests[this.stage].isDisplayed = false;
    }
}