class Structure {
    static structures = {
        "maze_basic": [],
        "deserted_cells": []
    };
    constructor (worldName, width, height, rarity, entities) {
        this.width = width;
        this.height = height;
        this.rarity = rarity;
        this.entities = entities;
        Structure.structures[worldName].push(this);
    }
    generate(world, x, y) {
        this.world = world;
        const entities = this.entities.map(e => e(world, x, y));
        entities.forEach(e => e.setStructure(entities));
    }
}