
//@ Green Cultist
new Structure("maze_basic", 1, 1, 24000, [
    (world, x, y) => new Animal(world, x, y, "green_cultist", true, meleeFollow(5, 1).setAnimal(this), 500, 40, 15, [
        new BossItem(this, "green_totem", "A totem to the god\n\"Green Green Grass of Home\"", function () {
            this.player.y = this.player.x = 0;
            world = new World(this.player.world.game, "GGGH_" + this.player.name, "Green Green Grass of Home", "The totem disappears from your hand as the world around you grows to be warm and kind.", "#222");
            this.player.moveToWorld("GGGH_" + this.player.name);
            
            this.player.untilMoveText = "You're just a scarecrow with\nno spikes and no field of wheat.";
            
            new Animal(world, 0, -13, "green_green_grass_of_home", true, meleeFollow(5, 1).setAnimal(this), 900, 70, 16, [
                new BossItem(this, "green_key", "There is a note\nattached to the key.\n\n\"You'll be alone without me...\"\n\"Nothing to live for...\"\n\n\"Good luck, scarecrow!\"", function () {
                    //this.player.moveToWorld("deserted_cells", PLAYER_SPREAD)
                    // alert("You win! Check back later for more content, pilgrim!");
                    this.movingToWorld = { desc: "Check back later for more content, pilgrim.", name: "You win!", avoid_have_entered: true };
                })
            ],
                [1]
            ).addAbility({
                fn: function () {
                    if (this.currentPlayer) {
                        const xDiff = this.currentPlayer.x - this.x;
                        const yDiff = this.currentPlayer.y - this.y;
                        const xMov = xDiff >= 0 ? 1 : -1;
                        const yMov = yDiff >= 0 ? 1 : -1;

                        const fn = (Math.abs(xDiff) > Math.abs(yDiff)) ? function() { this.x += xMov } : function () {this.y += yMov}

                        for (let x = -5; x <= 5; x += 5)
                            for (let y = -5; y <= 5; y += 5)
                                if (x | y)
                                    new Projectile(world, this, [this], this.x + x, this.y + y, "#22b14d", false, 1, 70)
                                        .setTickAbility(fn)
                                        .setAbility(function (entity) { this.hit(entity, 105) })
                                        .setDiesOnCollide()
                    }
                }, cd: 15
            });
            
            world.blockList["-4_2"] = true;
            world.blockList["-3_2"] = true;
            world.blockList["-2_2"] = true;
            world.blockList["-1_2"] = true;
            world.blockList["0_2"] = true;
            world.blockList["1_2"] = true;
            world.blockList["2_2"] = true;
            world.blockList["3_2"] = true;
            world.blockList["4_2"] = true;
            
            world.blockList["-4_1"] = true;
            world.blockList["-4_0"] = true;
            world.blockList["-4_-1"] = true;
            world.blockList["-4_-2"] = true;
            world.blockList["-4_-3"] = true;
            world.blockList["-4_-4"] = true;
            world.blockList["-4_-5"] = true;
            world.blockList["-4_-6"] = true;
            world.blockList["-4_-7"] = true;
            
            world.blockList["-5_-7"] = true;
            world.blockList["-5_-8"] = true;
            world.blockList["-6_-8"] = true;
            world.blockList["-6_-9"] = true;
            
            world.blockList["-7_-9"] = true;
            world.blockList["-8_-9"] = true;
            world.blockList["-9_-9"] = true;
            world.blockList["-10_-9"] = true;
            world.blockList["-11_-9"] = true;
            world.blockList["-12_-9"] = true;
            world.blockList["-13_-9"] = true;
            world.blockList["-14_-9"] = true;
            world.blockList["-15_-9"] = true;
            
            world.blockList["-15_-10"] = true;
            world.blockList["-15_-11"] = true;
            world.blockList["-15_-12"] = true;
            world.blockList["-15_-13"] = true;
            world.blockList["-15_-14"] = true;
            world.blockList["-15_-15"] = true;
            world.blockList["-15_-16"] = true;
            world.blockList["-15_-17"] = true;
            
            world.blockList["-7_-17"] = true;
            world.blockList["-8_-17"] = true;
            world.blockList["-9_-17"] = true;
            world.blockList["-10_-17"] = true;
            world.blockList["-11_-17"] = true;
            world.blockList["-12_-17"] = true;
            world.blockList["-13_-17"] = true;
            world.blockList["-14_-17"] = true;
            world.blockList["-15_-17"] = true;
            
            world.blockList["-6_-17"] = true;
            world.blockList["-6_-18"] = true;
            world.blockList["-5_-18"] = true;
            world.blockList["-5_-19"] = true;
            
            world.blockList["-4_-19"] = true;
            world.blockList["-4_-20"] = true;
            world.blockList["-4_-21"] = true;
            world.blockList["-4_-22"] = true;
            world.blockList["-4_-23"] = true;
            world.blockList["-4_-24"] = true;
            world.blockList["-4_-25"] = true;
            world.blockList["-4_-26"] = true;
            world.blockList["-4_-27"] = true;
            
            world.blockList["4_1"] = true;
            world.blockList["4_0"] = true;
            world.blockList["4_-1"] = true;
            world.blockList["4_-2"] = true;
            world.blockList["4_-3"] = true;
            world.blockList["4_-4"] = true;
            world.blockList["4_-5"] = true;
            world.blockList["4_-6"] = true;
            world.blockList["4_-7"] = true;
            
            world.blockList["5_-7"] = true;
            world.blockList["5_-8"] = true;
            world.blockList["6_-8"] = true;
            world.blockList["6_-9"] = true;
            
            world.blockList["7_-9"] = true;
            world.blockList["8_-9"] = true;
            world.blockList["9_-9"] = true;
            world.blockList["10_-9"] = true;
            world.blockList["11_-9"] = true;
            world.blockList["12_-9"] = true;
            world.blockList["13_-9"] = true;
            world.blockList["14_-9"] = true;
            world.blockList["15_-9"] = true;
            
            world.blockList["15_-10"] = true;
            world.blockList["15_-11"] = true;
            world.blockList["15_-12"] = true;
            world.blockList["15_-13"] = true;
            world.blockList["15_-14"] = true;
            world.blockList["15_-15"] = true;
            world.blockList["15_-16"] = true;
            world.blockList["15_-17"] = true;
            
            world.blockList["7_-17"] = true;
            world.blockList["8_-17"] = true;
            world.blockList["9_-17"] = true;
            world.blockList["10_-17"] = true;
            world.blockList["11_-17"] = true;
            world.blockList["12_-17"] = true;
            world.blockList["13_-17"] = true;
            world.blockList["14_-17"] = true;
            world.blockList["15_-17"] = true;
            
            world.blockList["6_-17"] = true;
            world.blockList["6_-18"] = true;
            world.blockList["5_-18"] = true;
            world.blockList["5_-19"] = true;
            
            world.blockList["4_-19"] = true;
            world.blockList["4_-20"] = true;
            world.blockList["4_-21"] = true;
            world.blockList["4_-22"] = true;
            world.blockList["4_-23"] = true;
            world.blockList["4_-24"] = true;
            world.blockList["4_-25"] = true;
            world.blockList["4_-26"] = true;
            world.blockList["4_-27"] = true;
            
            world.blockList["4_-28"] = true;
            world.blockList["3_-28"] = true;
            world.blockList["2_-28"] = true;
            world.blockList["1_-28"] = true;
            world.blockList["0_-28"] = true;
            world.blockList["-1_-28"] = true;
            world.blockList["-2_-28"] = true;
            world.blockList["-3_-28"] = true;
            world.blockList["-4_-28"] = true;
            
        }),
        null
    ],
        [1, 2]
    ).addAbility({
        fn: function () {
            if (this.currentPlayer) {
                const xDiff = this.currentPlayer.x - this.x;
                const yDiff = this.currentPlayer.y - this.y;
                const xMov = xDiff >= 0 ? 1 : -1;
                const yMov = yDiff >= 0 ? 1 : -1;

                const fn = (Math.abs(xDiff) > Math.abs(yDiff)) ? function() { this.x += xMov } : function () {this.y += yMov}

                for (let x = -5; x <= 5; x += 5)
                    for (let y = -5; y <= 5; y += 5)
                        if (x && y)
                            new Projectile(world, this, [this], this.x + x, this.y + y, "#22b14d", false, 1, 70)
                                .setTickAbility(fn)
                                .setAbility(function (entity) { this.hit(entity, 65) })
                                .setDiesOnCollide()
            }
        }, cd: 15
    }
    )
]);