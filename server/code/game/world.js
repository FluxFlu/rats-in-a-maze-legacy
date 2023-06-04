
const genStats = {
    chunkSize: 13,
}

class Chunk {
    constructor(world, x, y) {
        this.world = world;
        this.x = x;
        this.y = y;
        this.structs = Structure.structures[this.world.id] || [];
        this.generate();
    }
    genSquare(x, y) {
        for (let struct of this.structs) {
            if (!(Math.floor(Math.random() * struct.rarity) || this.world.getAllTaken().filter(e => e.x >= x && e.x < x + struct.width && e.y >= y && e.y < y + struct.height).length)) {
                struct.generate(this.world, x, y);
                break;
            }
        }
        if (this.world.blockGen)
            this.world.blockGen.bind(this)(x, y)
        
    }
    generate() {
        let x = this.x * genStats.chunkSize;
        let y = this.y * genStats.chunkSize;
        
        const xMax = x + genStats.chunkSize;
        const yMax = y + genStats.chunkSize;
        for (let i = x; i < xMax; i++) {
            for (let j = y; j < yMax; j++) {
                this.genSquare(i, j);
            }
        }
    }
    
    getEntities() {
        return this.world.entities.filter(e => e.x < this.x * genStats.chunkSize + genStats.chunkSize && e.x >= this.x * genStats.chunkSize && e.y < this.y * genStats.chunkSize + genStats.chunkSize && e.y >= this.y * genStats.chunkSize);
    }
    tick() {
        this.getEntities().forEach(e => e.tick());
    }
}

class World {
    constructor (game, id, name, description, blockColor) {
        this.data = {};
        this.game = game;
        game.worlds[id] = this;
        this.game.updateWorlds();
        this.id = id;
        this.name = name;
        this.description = description;
        this.entities = [];
        this.blockList = {};
        this.blockColor = blockColor;
    }
    setOption(option, to) {
        this[option] = to;
        return this;
    }
    key(x, y) {
        return x + ":" + y;
    }
    getChunk(x, y) {
        x = Math.floor(x / genStats.chunkSize);
        y = Math.floor(y / genStats.chunkSize);
        const key = this.key(x, y);
        if (!this.data[key])
            this.data[key] = new Chunk(this, x, y);
        return this.data[key];
    }
    getNearBy(x, y, distance) {
        return this.entities.filter(e => e.x <= x + distance && e.x >= x - distance && e.y >= y - distance && e.y <= y + distance);
    }
    getAllTakenNearBy(x, y, distance) {
        return this.getAllTaken().filter(e => e.x <= x + distance && e.x >= x - distance && e.y >= y - distance && e.y <= y + distance);
    }
    getPlayer(player) {
        return this.game.getPlayer(player);
    }
    addEntity(entity) {
        this.entities.push(entity);
    }
    getAllTaken() {
        return Object.keys(this.blockList).map(e => { const f = e.split('_'); return {x: f[0], y: f[1], collides: true} }).concat(this.entities)
    }
    remove(entity) {
        this.entities.splice(this.entities.indexOf(entity), 1);
    }
}