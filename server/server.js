

const server = new socket("Server");

const game = new Game(server);

game.addPlayer("Client", server);
    

setInterval(() => {
    const player = game.getPlayer("Client");
    game.tick();
    server.emit("gameupdate", game.getAssets("Client"), [player.getInventoryVisual(), player.getEquippedVisual(), player.getInventoryDescriptions(), player.getInventoryColors()], {health: player.health, mana: player.mana, maxHealth: player.maxHealth, maxMana: player.maxMana, cooldowns: Object.values(player.equipped).map(e => !e ? e : e.cooldown / e.currentMaxCooldown), displayText: player.untilMoveText, quest: player?.quest?.text, consumeCooldown: player.consumeCooldown / player.maxConsumeCooldown, movingToWorld: player.movingToWorld, background: player.world.backgroundColor} );
}, 100);

server.on("keypress", (key, inventorySlot) => {
    game.handleKeyPress(key, inventorySlot, "Client");
})