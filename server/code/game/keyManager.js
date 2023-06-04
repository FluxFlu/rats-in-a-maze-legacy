class KeyManager {
    constructor () {
        this.keyEffects = {
            "w": player => player.walkQueue.push(() => player.walk(0, -1)),
            "a": player => player.walkQueue.push(() => player.walk(-1, 0)),
            "s": player => player.walkQueue.push(() => player.walk(0, 1)),
            "d": player => player.walkQueue.push(() => player.walk(1, 0)),

            "shift": player => player.walkQueue = [],

            "arrowup": player => player.direction = 0,
            "arrowdown": player => player.direction = 1,
            "arrowleft": player => player.direction = 2,
            "arrowright": player => player.direction = 3,
            
            "l": player => player.interact(),
            
            "i": player => player.inventoryMenu(),
            
            "u": (player, inventorySlot) => { player.consume(inventorySlot) },
            
            "1": (player, inventorySlot) => { player.equip(inventorySlot, 1) },
            "2": (player, inventorySlot) => { player.equip(inventorySlot, 2) },
            "3": (player, inventorySlot) => { player.equip(inventorySlot, 3) },
            "4": (player, inventorySlot) => { player.equip(inventorySlot, 4) },
            "5": (player, inventorySlot) => { player.equip(inventorySlot, 5) },
            
            ",": (player, inventorySlot) => player.swap(inventorySlot, -1),
            ".": (player, inventorySlot) => player.swap(inventorySlot, 1),

            'p': player => player.pickup(),
            '-': (player, inventorySlot) => player.inventory[inventorySlot] = null,
            
            "q": player => player.cast(0),
            "e": player => player.cast(1),
            " ": player => player.cast(2),
            
            "r": player => player.cast(3),
            "f": player => player.cast(4),
            "t": player => player.cast(5),
            
            "c": player => player.cast(6),
            "y": player => player.cast(7),
            "g": player => player.cast(8),
            
            "h": player => player.cast(9),
            "v": player => player.cast(10),
            "z": player => player.cast(11),
            
            "x": player => player.cast(12),
            "b": player => player.cast(13),
            "n": player => player.cast(14),
        }
    }
    handle(key, inventorySlot, player) {
        if (this.keyEffects[key]) this.keyEffects[key](player, inventorySlot);
    }
}