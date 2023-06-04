class Game {
    constructor () {
        this.keyManager = new KeyManager();
        this.worlds = {};
        this.players = {};
        this.timer = 0n;
        this.worldList = [];
        
        new World(this, "limbo", "Limbo", "Not a real world. This is where the player exists while the screen naming the world they are moving to is displayed.");
        
            
        
        new World(this, "maze_basic", "Maze Basic", "You hear the crawl of spiders echo in the distance.", "#222")
            .setOption("backgroundColor", "#2a2a2a")
            .setOption("blockGen", function(x, y) {
                if (Math.random() > .9 && !(this.getEntities().filter(e => e.x == x && e.y == y).length)) {
                    this.world.blockList[x + "_" + y] = true;
                }
            })
        
        new World(this, "deserted_cells", "The Deserted Cells", "The sound of nails scraping rings out through the cold and dark area.", "#9a9a9a")
            .setOption("backgroundColor", "#4a4a4a")
            .setOption("blockGen", function(x, y) {
                if (Math.random() > .96 && !(this.getEntities().filter(e => e.x <= x + 1 && e.x >= x - 1 && e.y <= y + 1 && e.y >= y - 1).length)) {
                    for (let i = -1; i <= 1; i++)
                        for (let j = -1; j <= 1; j++) {
                            this.world.blockList[(x + i) + "_" + (y + j)] = true;
                        }
                }
            })
    }
    updateWorlds() {
        this.worldList = Object.values(this.worlds)
    }
    tick() {
        this.timer++;
        Object.values(this.players).forEach(e => {
            for (let x = -1; x <= 1; x++)
                for (let y = -1; y <= 1; y++)
                    e.world.getChunk(e.x + x * genStats.chunkSize, e.y + y * genStats.chunkSize).tick();
        });
        this.worldList.forEach(level => level.entities.filter(e => e.removed || (e.canDie() && e.health <= 0)).forEach(e => e.die()));
        this.worldList.forEach(level => level.entities = level.entities.filter(e => !e.removed && (!e.canDie() || e.health > 0)));
    }
    getPlayer(name) {
        return this.players[name];
    }
    addPlayer(name, socket) {
        const player = new Player(name, socket, this.worlds.maze_basic, 0, 0);
        this.players[name] = player;
    }
    getAssets(playerName) {
        const player = this.getPlayer(playerName);
        
        const final = [ [], [], [] ];
        
        for (let i = player.x - 6; i <= player.x + 6; i++) {
            for (let j = player.y - 6; j <= player.y + 6; j++) {
                if (player.world.blockList[i + '_' + j]) {
                    final[0].push({x: i - player.x + 6, y: j - player.y + 6, asset: player.world.blockColor})
                }
            }
        }
        
        const entities = player.getNearBy(6);
        entities.push(player);
        
        entities.forEach(e => final[e.displayLayer].push({x: e.x - player.x + 6, y: e.y - player.y + 6, asset: e.asset, health: e.health && e.maxHealth && e != player ? e.health / e.maxHealth : null}));
        return final;
    }
    // getBlockPositions() {
    //     return Object.keys(this.blockList).map(e => e.split('_')).map(e => {return {x: e[0], y: e[1], collides: true}});
    // }
    handleKeyPress(key, inventorySlot, playerName) {
        this.keyManager.handle(key, inventorySlot, this.getPlayer(playerName));
    }
}