class Quest {
    constructor (text, acceptText, rewardText, requirementItems, requirementCount, reward) {
        this.text = text;
        this.isDisplayed = false;
        this.acceptText = acceptText;
        this.rewardText = rewardText;
        this.requirementItems = requirementItems;
        this.requirementCount = requirementCount;
        this.reward = reward;
    }
}