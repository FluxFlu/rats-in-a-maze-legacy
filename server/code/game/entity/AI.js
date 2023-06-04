class AI {
    constructor(tick = () => { }, onPlayer = () => { }, onAnimal = () => { }) {
        this.tick = tick;
        this.onPlayer = onPlayer;
        this.onAnimal = onAnimal;
        this.timer = 0;
        this.x = 0;
        this.y = 0;
    }
    
    setAnimal(animal) {
        this.animal = animal;
        this.world = animal.world;
        return this;
    }

    emptyInitBfs() {
        this.entities = [];
    }
    initBfs() {
        this.entities = this.animal.getAllTakenNearBy(this.animal.viewDistance).filter(e => e instanceof Projectile && !e.exclude.includes(this.animal) || e.collides)
    }
    actualBfs(target_x, target_y, distance, from_x, from_y, currentLine, queue, visited, endPointer, numRecursions) {
        if (endPointer && endPointer[0])
            return endPointer[0]
        if (from_x === undefined) from_x = this.animal.x;
        if (from_y === undefined) from_y = this.animal.y;
        if (!queue) queue = [];
        if (!visited) visited = [];
        if (!endPointer) endPointer = {};
        if (!currentLine) currentLine = [];
        if (!numRecursions) numRecursions = 0;
        else if (numRecursions > 5000) return endPointer[0] = {x: Math.floor(Math.random() * 3) - 1, y: Math.floor(Math.random() * 3) - 1};
        
        const entityFilter = (e) => e.x == from_x + this.x && e.y == from_y + this.y;

        const validBlockFilter = (e) => e.x == from_x + this.x && e.y == from_y + this.y;

        const makeQueueObj = (e) => {return {x: e.x, y: e.y, path: e.path}}
        
        visited.push({ x: from_x, y: from_y });
        
        for (this.x = -1; this.x <= 1; this.x++)
            for (this.y = -1; this.y <= 1; this.y++) {
                if (this.x | this.y) {
                    const entities = this.entities.filter(entityFilter);
                    if (from_x + this.x == target_x && from_y + this.y == target_y) {
                        
                        endPointer[0] = currentLine[0] || {x: target_x, y: target_y};
                        return endPointer[0]
                    }
                    if (!entities.length && !visited.filter(validBlockFilter).length && !queue.filter(validBlockFilter).length) {
                        queue.push({ x: from_x + this.x, y: from_y + this.y, path: currentLine.map(makeQueueObj).concat([{x: from_x + this.x, y: from_y + this.y}]) });
                    }
                }
            }
        while (queue.length) {
            const e = queue.shift();
            this.actualBfs(target_x, target_y, distance, e.x, e.y, e.path, queue, visited, endPointer, numRecursions + 1);
            if (endPointer[0])
                return endPointer[0]
        }
    }
    Bfs(target_x, target_y, distance) {
        this.initBfs()
        return this.actualBfs(target_x, target_y, distance);
    }
    emptyBfs(target_x, target_y, distance) {
        this.emptyInitBfs()
        return this.actualBfs(target_x, target_y, distance);
    }
}