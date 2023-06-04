const playerDirection = {
    up: 0,
    down: 1,
    left: 2,
    right: 3,
}

const directionAsset = {
    0: "up",
    1: "down",
    2: "left",
    3: "right",
}

const PLAYER_SPREAD = 500;

class Player extends Entity {
    constructor(name, socket, world, x, y) {
        super(world, x, y, "player_up", true, 1);
        this.name = name;
        this.socket = socket;
        this.actionTimer = 0;
        this.walkTimer = 0;
        this.walkQueue = [];
        this.equipped = { 1: null, 2: null, 3: null, 4: null, 5: null }
        this.inventory = Array(30).fill(null);

        this.direction = playerDirection.up;

        this.inventory[0] = new Consumable(this, "cheese", "A block of cheese.\nHeals 300 HP.", function () { this.player.heal(300) });

        this.inventory[2] = new Item(this, "fire_staff", "Match\nDeals 10 damage.").addSpell(function (player) {
            const x = player.getDirectionVector().x;
            const y = player.getDirectionVector().y;
            new Projectile(player.world, player, [player], player.x, player.y, "#cd0000", false)
                .setTickAbility(function () { this.x += x; this.y += y })
                .setAbility(function (entity) { this.hit(entity, 10) })
                .setDiesOnCollide()
        }, 10, 4);

        this.inventory[4] = new BossItem(this, "stone_key", "Stone Key", function () { this.player.moveToWorld("maze_basic", PLAYER_SPREAD) })

        //TEST

        // this.equipped[1] = new Item(this, "bone_staff", "Bone Staff\nDeals 40 damage.").addSpell(function (player) {
        //     const x = player.getDirectionVector().x;
        //     const y = player.getDirectionVector().y;
        //     new Projectile(player.world, player, [player], player.x, player.y, "#44adcd", false)
        //         .setTickAbility(function () { if (Math.abs(this.x + this.y - (player.x + player.y)) > 1) this.health = 0; this.x += x; this.y += y })
        //         .setAbility(function (entity) { this.hit(entity, 40) })
        //         .setDiesOnCollide()
        // }, 20, 7)

        // this.equipped[2] = new Item(this, "heart_grimoire", "Grimoire of Heart\nIt contains three spells.").addSpell(function (player) {
        //     new Projectile(player.world, player, [player], player.x, player.y, "#44adcd", false, 1, 100)
        //         .setTickAbility(function () { this.health--; })
        //         .setAbility(function (entity) { this.hit(entity, 30) })
        //         .setDiesOnCollide()
        // }, 30, 10).addSpell(function (player) {
        //     const dir = player.getDirectionVector(4);
        //     player.move(dir.x, dir.y);
        // }, 40, 20).addSpell(function (player) {
        //     const asset = "player_" + directionAsset[player.direction];
        //     for (let i = 0; i < 12; i++)
        //         new Animal(player.world, player.x + Math.floor(Math.random() * 11) - 5, player.y + Math.floor(Math.random() * 11) - 5, asset, true, doNothing(), 200, 0, 0).addAbility({ fn: function () { if (this.hasTicked) this.remove(); this.hasTicked = true; }, cd: 200 });
        // }, 80, 80)

        // this.inventory[3] = new Item(this, "spider_slayer", "Spider Slayer\nDeals 50 damage.").addSpell(function (player) {
        //     const x = player.getDirectionVector().x;
        //     const y = player.getDirectionVector().y;
        //     new Projectile(player.world, player, [player], player.x, player.y, "#cd0000", false)
        //         .setTickAbility(function () { this.x += x; this.y += y })
        //         .setAbility(function (entity) { this.hit(entity, 50) })
        //         .setDiesOnCollide()
        // }, 100, 20)

        // this.inventory[4] = new Item(this, "fruit_flies", "Time flies like an arrow.\nFruit knives cuts a banana.\n\nThis item consumes 40 health,\nbut causes you to regenerate mana\n2x faster for 6 seconds.").addSpell(function (player) {
        //     player.health -= 40;
        //     player.manaRegen *= 2;
        //     player.eventBus.push({ cd: 60, fn: function () { this.manaRegen /= 2; } })
        // }, 60, 60)
        // this.equipped[3] = new Item(this, "skeleton_heart", "Skeleton's Heart\n+60 max health.").addPassive(new Ability(
        //     AbilityType.Passive,
        //     function () {
        //         this.maxHealth += 60;
        //     }
        // ))
        // this.equipped[4] = new Item(this, "skeleton_heart", "Skeleton's Heart\n+60 max health.").addPassive(new Ability(
        //     AbilityType.Passive,
        //     function () {
        //         this.maxHealth += 60;
        //     }
        // ))
        // this.equipped[5] = new Item(this, "skeleton_heart", "Skeleton's Heart\n+60 max health.").addPassive(new Ability(
        //     AbilityType.Passive,
        //     function () {
        //         this.maxHealth += 60;
        //     }
        // ))
        // this.inventory[8] = new Item(this, "spider_heart", "Spider's Heart\n+120 max mana.").addPassive(new Ability(
        //     AbilityType.Passive,
        //     function () {
        //         this.maxMana += 120;
        //     }
        // ))
        // this.inventory[9] = new Item(this, "spider_heart", "Spider's Heart\n+120 max mana.").addPassive(new Ability(
        //     AbilityType.Passive,
        //     function () {
        //         this.maxMana += 120;
        //     }
        // ))
        // this.inventory[10] = new Item(this, "spider_heart", "Spider's Heart\n+120 max mana.").addPassive(new Ability(
        //     AbilityType.Passive,
        //     function () {
        //         this.maxMana += 120;
        //     }
        // ))
        // this.inventory[11] = new Item(this, "milk_bottle", "Milk Bottle\nHeals 35 HP.").addSpell(function (player) {
        //     player.heal(35);
        // }, 100, 50)
        // this.inventory[12] = new Item(this, "milk_bottle", "Milk Bottle\nHeals 35 HP.").addSpell(function (player) {
        //     player.heal(35);
        // }, 100, 50)
        // this.inventory[13] = new Item(this, "milk_bottle", "Milk Bottle\nHeals 35 HP.").addSpell(function (player) {
        //     player.heal(35);
        // }, 100, 50)
        // this.inventory[14] = new Consumable(this, "pitchforked_tongue", "snake tongue.\nHeals 150 HP.", function () { this.player.heal(150) })
        // this.inventory[15] = new Consumable(this, "pitchforked_tongue", "snake tongue.\nHeals 150 HP.", function () { this.player.heal(150) })
        // this.inventory[16] = new Consumable(this, "pitchforked_tongue", "snake tongue.\nHeals 150 HP.", function () { this.player.heal(150) })
        // this.inventory[17] = new Consumable(this, "pitchforked_tongue", "snake tongue.\nHeals 150 HP.", function () { this.player.heal(150) })
        // this.inventory[18] = new Consumable(this, "pitchforked_tongue", "snake tongue.\nHeals 150 HP.", function () { this.player.heal(150) })
        // this.inventory[19] = new Consumable(this, "pitchforked_tongue", "snake tongue.\nHeals 150 HP.", function () { this.player.heal(150) })
        // this.inventory[20] = new Consumable(this, "pitchforked_tongue", "snake tongue.\nHeals 150 HP.", function () { this.player.heal(150) })
        // this.inventory[21] = new Consumable(this, "pitchforked_tongue", "snake tongue.\nHeals 150 HP.", function () { this.player.heal(150) })
        // this.inventory[22] = new Consumable(this, "pitchforked_tongue", "snake tongue.\nHeals 150 HP.", function () { this.player.heal(150) })
        // this.inventory[23] = new Consumable(this, "pitchforked_tongue", "snake tongue.\nHeals 150 HP.", function () { this.player.heal(150) })

        //TESTEND

        const tutorial = new World(this.world.game, "tutorial_" + this.name, "The Tutorial", "You are lifted out of a large cardboard box and into the maze...", "#222")
            .setOption("backgroundColor", "#2a2a2a");

        for (let x = -5; x <= 5; x++) {
            tutorial.blockList[x + "_1"] = true;
            tutorial.blockList[x + "_-33"] = true;
        }

        for (let y = -33; y < 1; y++) {
            tutorial.blockList["-5_" + y] = true;
            tutorial.blockList["5_" + y] = true;
        }

        this.untilMoveText = "Use WASD to move\nand L to talk to NPCs."

        new TutorialNpc(tutorial, -4, -4, "scarecrow", "This game uses a\nmovement queue system.\nEach time you press a movement key,\nthe game adds that key to a list,\nand every .1 seconds,\n it removes a movement from that\nlist and enacts it.\n\nPressing shift empties the list.\n\nTry holding down the D key\nto see what I mean.")


        new TutorialNpc(tutorial, -4, -8, "scarecrow", "Press I to open your inventory.\nYou can use [] to move the cursor\nand {} to move 5 at a time.\nYou can use the inventory controls\neven when the menu is closed.")


        new TutorialNpc(tutorial, -4, -12, "scarecrow", "The cheese has a green background\nwhile the match has blue.\nAny item with a blue background\nis an equippable and any\nother item is a consumable.")


        new TutorialNpc(tutorial, -4, -16, "scarecrow", "Press 1-5 to equip equippable items\n and U to consume consumables.")


        new TutorialNpc(tutorial, -4, -20, "scarecrow", "You can cast spells using the keys:\n`QE RFTCYGHVZXBN` in that order.")


        let man = new TutorialNpc(tutorial, -4, -24, "scarecrow", "You can use the arrow keys\nto change direction.\nTry facing upwards,\nequipping the match, and\npressing Q to burn these blocks away.\n")

        new ItemEntity(tutorial, 4, -26, new Item(man, "fire_staff", "Match\nDeals 10 damage.").addSpell(function (player) {
            const x = player.getDirectionVector().x;
            const y = player.getDirectionVector().y;
            new Projectile(player.world, player, [player], player.x, player.y, "#cd0000", false)
                .setTickAbility(function () { this.x += x; this.y += y })
                .setAbility(function (entity) { this.hit(entity, 10) })
                .setDiesOnCollide()
        }, 10, 4));

        for (let x = -4; x < 5; x++) {
            new Animal(tutorial, x, -26, "#cdcdcd", true, doNothing(), 10, 0, 0, [], []);
        }

        new TutorialNpc(tutorial, 4, -28, "scarecrow", "Press P to pick up items.\nTry picking up the item dropped\nby the block below me.")

        new TutorialNpc(tutorial, -4, -28, "scarecrow", "Press ,. to move items\n to the left and right,\nand - to delete items.")


        new TutorialNpc(tutorial, -4, -32, "scarecrow", "Use the stone key in your inventory\nto leave the tutorial. Have fun!")

        this.moveToWorld("tutorial_" + this.name)

        this.maxConsumeCooldown = 25;
        this.consumeCooldown = 0;
        this.mana = 0;
        this.originalMaxMana = this.maxMana = 200;
        this.manaRegen = 1;
        this.health = 120;
        this.originalMaxHealth = this.maxHealth = 150;
        this.iFrames = 0;
        this.maxIFrames = 8;
    }
    moveToWorld(world, randomizePosition) {
        super.moveToWorld(this.world.game.worlds.limbo);
        this.movingToWorld = { desc: game.worlds[world].description, name: game.worlds[world].name };

        this.eventBus.push({
            cd: 20, fn: function () {
                this.world.remove(this);
                this.world = game.worlds[world];
                this.world.entities.push(this);
                this.movingToWorld = null;

                if (randomizePosition) {
                    this.x = Math.floor(Math.random() * randomizePosition) - randomizePosition * 2
                    this.y = Math.floor(Math.random() * randomizePosition) - randomizePosition * 2
                    for (let x = -1; x <= 1; x++)
                        for (let y = -1; y <= 1; y++)
                            this.world.getChunk(this.x + x * genStats.chunkSize, this.y + y * genStats.chunkSize);
                            
                    while (this.world.getAllTaken().filter(e => e.x == this.x && e.y == this.y && e.collides && e != this).length) {
                        this.x = Math.floor(Math.random() * randomizePosition) - randomizePosition * 2
                        this.y = Math.floor(Math.random() * randomizePosition) - randomizePosition * 2
                        for (let x = -1; x <= 1; x++)
                            for (let y = -1; y <= 1; y++)
                                this.world.getChunk(this.x + x * genStats.chunkSize, this.y + y * genStats.chunkSize);
                    }
                }
            }
        });
    }
    getDirectionVector(times = 1) {
        switch (this.direction) {
            case playerDirection.up: return { x: 0, y: -1 * times }
            case playerDirection.down: return { x: 0, y: times }
            case playerDirection.left: return { x: -1 * times, y: 0 }
            case playerDirection.right: return { x: times, y: 0 }
        }
    }
    canDie() { return true; }

    canTakeDamage() { return true; }

    pickup() {
        this.world.entities.filter(e => e.x == this.x && e.y == this.y && e instanceof ItemEntity).forEach(e => { if (this.get(e.item)) e.health = 0; });
    }

    interact() {
        const entities = this.world.entities.filter(e => e.x <= this.x + 1 && e.x >= this.x - 1 && e.y <= this.y + 1 && e.y >= this.y - 1 && e.interaction && (!e.talking || e.talking == this));
        if (entities.length != 1) return;
        entities[0].interaction(this);
        entities[0].talking = this;
    }

    get(item) {
        for (let i = 0; i < this.inventory.length; i++) {
            if (!this.inventory[i]) {
                this.inventory[i] = item;
                item.player = this;
                return true;
            }
        }
        return false;
    }

    hit(entity, damage) {
        return entity.takeDamage(this, damage);
    }
    loseHealth(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.movingToWorld = { desc: "", name: "You died.", avoid_have_entered: true };
            // window.location.reload();
        }
        return true;
    }
    takeDamage(source, amount) {
        if (this.iFrames) return false;
        this.iFrames = this.maxIFrames;
        return this.loseHealth(amount);
    }
    move(x, y) {
        if (this.untilMoveText) {
            const entities = this.world.entities.filter(e => e.x <= this.x + 1 && e.x >= this.x - 1 && e.y <= this.y + 1 && e.y >= this.y - 1 && (e instanceof TutorialNpc || (e.interaction && e.talking == this && e?.quests[e?.stage]?.isDisplayed)));
            if (entities.length == 1)
                entities[0].deInteract(this);
        }
        this.untilMoveText = null;
        super.move(x, y);
    }

    walk(x, y) {
        if (this.walkTimer)
            return false;
        this.move(x, y);
        this.walkTimer = 1;
        return true;
    }
    heal(num) {
        if (num + this.health > this.maxHealth)
            this.health = this.maxHealth
        else this.health += num;
    }
    addMana(num) {
        if (num + this.mana > this.maxMana)
            this.mana = this.maxMana
        else this.mana += num;
    }
    tick() {
        this.asset = "player_" + directionAsset[this.direction];

        if (this.iFrames) this.iFrames--;
        if (this.walkTimer) this.walkTimer--;
        if (this.consumeCooldown) this.consumeCooldown--;

        if (this.walkQueue.length && !this.walkTimer) {
            // if (this.walkQueue.length < 5) {
            this.walkQueue.shift()(this);
            // } else {
            //     this.walkQueue.pop();
            // }
        }
        this.maxHealth = this.originalMaxHealth;
        this.maxMana = this.originalMaxMana;

        Object.values(this.equipped).forEach(e => e?.tick());

        if (this.health > this.maxHealth)
            this.health = this.maxHealth;
        this.addMana(Math.floor(this.maxMana / 100) * this.manaRegen);

        super.tick();
    }
    getInventoryVisual() {
        return this.inventory.map(e => e?.asset)
    }
    getInventoryDescriptions() {
        return this.inventory.map(e => e?.description)
    }
    getInventoryColors() {
        return this.inventory.map(e => e instanceof BossItem ? "key" : e instanceof Consumable ? "food" : e ? "other" : null);
    }
    getEquippedVisual() {
        return Object.values(this.equipped).map(e => e?.asset);
    }
    inventoryMenu() {
        this.socket.emit("inventory");
    }
    consume(slot) {
        if (this.inventory[slot] && this.inventory[slot] instanceof Consumable && !this.consumeCooldown) {
            const item = this.inventory[slot];
            this.inventory[slot] = null
            if (item)
                item.effect();

            this.consumeCooldown = this.maxConsumeCooldown;
        }
    }
    equip(slot, equipTo) {
        if (this.consumeCooldown) return;

        const swap = this.equipped[equipTo];

        if (this.inventory[slot] && this.inventory[slot].isEquippable()) {
            const item = this.inventory[slot];

            if (item && item) {
                this.equipped[equipTo] = item;
                this.inventory[slot] = swap;
            } else
                this.equipped[equipTo] = null;

        } else if (!this.inventory[slot]) {
            this.equipped[equipTo] = null;
            if (swap)
                this.inventory[slot] = swap;
        }

        if (this.equipped[equipTo])
            this.consumeCooldown = this.maxConsumeCooldown;
    }
    swap(slot, direction) {
        if (slot + direction <= 30)
            [this.inventory[slot], this.inventory[slot + direction]] = [this.inventory[slot + direction], this.inventory[slot]];
    }
    cast(spell) {
        const spells = Object.values(this.equipped).map(e => e?.spells).flat();
        if (spells[spell])
            spells[spell].cast(this);
    }
}