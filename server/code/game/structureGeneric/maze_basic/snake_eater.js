
//@ Snake Eater
new Structure("maze_basic", 1, 1, 30000, [
    (world, x, y) => new Npc(world, x, y, "snake",
        new Quest(
            "Could you bring me\nfive snake tongues, please?",
            "",
            "Thank you.",
            ["pitchforked_tongue"], [5],
            null
        )
    )
]);