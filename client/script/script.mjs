
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext("2d");

const io = new socket("Client");

let inventory = [];

let equipped = [];

const itemColors = {
    "key" : "#ff00ff2c",
    "food" : "#00cd002c",
    "ticket": "#",
    "other" : "#0000cd2c",
}

let colors = [];

let inventoryDisplayed = false;

let menuDisplayed = true;
let itemsDisplayed = true;

let questDisplayed = false;

let inventorySelected = 0;

io.on("inventory", () => { inventoryDisplayed = !inventoryDisplayed });

ctx.textAlign = "center";

io.on("gameupdate", (layers, inv, playerData) => {
    if (playerData.movingToWorld) {
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const str = (playerData.movingToWorld.desc).split('\n');
            ctx.fillStyle = "#ffffffdf";
            ctx.font = "bold 95% serif";
            let i;
            for (i in str)
                ctx.fillText(str[i], 330, i * 25 + 120);
            ctx.font = "bold 135% serif";
            ctx.fillText('You have entered ' + playerData.movingToWorld.name, 330, 200 + i * 25)
        return;
    }
    inventory = inv[0];
    equipped = inv[1];
    descriptions = inv[2];
    colors = inv[3];
    ctx.fillStyle = playerData.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < layers.length; j++) {
        const assets = layers[j];
        for (let i = 0; i < assets.length; i++) {
            if (assets[i].asset[0] == '#') {
                ctx.fillStyle = assets[i].asset;
                ctx.fillRect(assets[i].x * 50, assets[i].y * 50, 50, 50);
            } else ctx.drawImage(document.getElementById(assets[i].asset), assets[i].x * 50, assets[i].y * 50, 50, 50);
            if (assets[i].health) {
                ctx.fillStyle = "#000";
                ctx.fillRect(assets[i].x * 50 - 5, assets[i].y * 50 - 25, 60, 20);
                ctx.fillStyle = "#00bd00";
                ctx.fillRect(assets[i].x * 50 - 5, assets[i].y * 50 - 25, assets[i].health * 60, 20);
            }
        }
    }
    if (inventoryDisplayed) {
        ctx.fillStyle = "#ffffffdf";
        ctx.fillRect(360, 40, 270, 520);
        for (let i in equipped)
            if (equipped[i])
                ctx.drawImage(document.getElementById(equipped[i]), 370 + i % 5 * 50, 60, 50, 50);
        for (let i in inventory)
            if (inventory[i]) {
                ctx.fillStyle = itemColors[colors[i]];
                ctx.fillRect(370 + i % 5 * 50, 120 + Math.floor(i / 5) * 50, 50, 50);
                ctx.fillStyle = "#ffffffdf";
                ctx.drawImage(document.getElementById(inventory[i]), 370 + i % 5 * 50, 120 + Math.floor(i / 5) * 50, 50, 50);
            }
        ctx.strokeRect(370 + inventorySelected % 5 * 50, 120 + Math.floor(inventorySelected / 5) * 50, 50, 50);
        ctx.fillStyle = "#000";
        ctx.fillRect(370, 112, 250, 2);
        if (descriptions[inventorySelected]) {
            ctx.fillStyle = "#ffffffdf";
            const str = descriptions[inventorySelected].split('\n');
            ctx.fillRect(20, 40, 270, 70 + (str.length - 1) * 40);
            ctx.fillStyle = "#000";
            ctx.font = "bold 95% serif";
            for (let i in str)
                ctx.fillText(str[i], 155, i * 40 + 80);
        }
    }
    // Player data
    if (menuDisplayed) {
        ctx.fillStyle = "#000";
        ctx.fillRect(30, 580, 290, 50);
        if (playerData.health) {
            ctx.fillStyle = "#00bd00";
            ctx.fillRect(30, 580, playerData.health / playerData.maxHealth * 290, 50);
        }
        ctx.fillStyle = "#fff";
        ctx.font = "bold 190% serif";
        ctx.fillText(playerData.health + " / " + playerData.maxHealth, 175, 616);
        ctx.fillStyle = "#000";
        ctx.fillRect(330, 580, 290, 50);
        if (playerData.mana) {
            ctx.fillStyle = "#009dbd";
            const num = playerData.mana / playerData.maxMana * 290
            ctx.fillRect(620 - num, 580, num, 50);
        }
        ctx.fillStyle = "#fff";
        ctx.fillText(playerData.mana + " / " + playerData.maxMana, 475, 616);
    }
        
    if (itemsDisplayed) {
        for (let i in equipped)
            if (equipped[i])
                ctx.drawImage(document.getElementById(equipped[i]), 142 + i % 5 * 80, 508, 50, 50);
        
        ctx.fillStyle = "#ffffff9f";
        
        if (inventory[inventorySelected])
            ctx.drawImage(document.getElementById(inventory[inventorySelected]), 32, 508, 50, 50);
        ctx.fillRect(30, 508, 52 * playerData.consumeCooldown, 52);
        ctx.strokeRect(30, 508, 52, 52);
        
        ctx.fillRect(140, 508, 52 * playerData.cooldowns[0], 52);
        ctx.fillRect(220, 508, 52 * playerData.cooldowns[1], 52);
        ctx.fillRect(300, 508, 52 * playerData.cooldowns[2], 52);
        ctx.fillRect(380, 508, 52 * playerData.cooldowns[3], 52);
        ctx.fillRect(460, 508, 52 * playerData.cooldowns[4], 52);
    
        ctx.strokeRect(140, 508, 52, 52);
        ctx.strokeRect(220, 508, 52, 52);
        ctx.strokeRect(300, 508, 52, 52);
        ctx.strokeRect(380, 508, 52, 52);
        ctx.strokeRect(460, 508, 52, 52);
    }
    if (playerData.displayText) {
        ctx.fillStyle = "#ffffffdf";
        const str = (playerData.displayText).split('\n');
        ctx.fillRect(165, 80, 330, 70 + (str.length - 1) * 25);
        ctx.fillStyle = "#000";
        ctx.font = "bold 95% serif";
        for (let i in str)
            ctx.fillText(str[i], 330, i * 25 + 120);
    }
    if (questDisplayed && playerData.quest) {
        ctx.fillStyle = "#ffffffdf";
        const str = playerData.quest.split('\n');
        ctx.fillRect(20, 40, 330, 70 + (str.length - 1) * 25);
        ctx.fillStyle = "#000";
        ctx.font = "bold 95% serif";
        for (let i in str)
            ctx.fillText(str[i], 185, i * 25 + 80);
    }
});

const clientKeys = {

    "[": () => { if (inventorySelected) inventorySelected-- },
    "{": () => { if (inventorySelected > 5) inventorySelected -= 5; else inventorySelected = 0 },

    "]": () => { if (inventorySelected < 29) inventorySelected++ },
    "}": () => { if (inventorySelected < 25) inventorySelected += 5; else inventorySelected = 29 },
    
    ";": () => { menuDisplayed = !menuDisplayed },
    
    "'": () => { itemsDisplayed = !itemsDisplayed },
    
    "m": () => { questDisplayed = !questDisplayed },
}

const allowKeys = {
    "-": true,
    "=": true,
    "_": true,
    "+": true,
}

addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    
    if (key[0] == 'f' && key[1])
        return;
    
    if (clientKeys[key])
        clientKeys[key]()
    else
        io.emit("keypress", key, inventorySelected);
        
    if (!allowKeys[key])
        event.preventDefault();
});