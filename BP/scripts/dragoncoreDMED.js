import { world } from "@minecraft/server";

// Cấu hình: mỗi key ứng với một entity
const summonMap = {
  "dragonmountsplus:essence_sculk": "dragonmountsplus:sculk_dragon",
  "dragonmountsplus:essence_phantom": "dragonmountsplus:phantom_dragon",
  "dragonmountsplus:essence_red": "dragonmountsplus:red_dragon",
  "dragonmountsplus:essence_cherry": "dragonmountsplus:cherry_dragon",
  "dragonmountsplus:essence_guardian": "dragonmountsplus:guardian_dragon"
};

world.beforeEvents.itemUseOn.subscribe(event => {
  const player = event.source;
  const item = event.itemStack;
  const block = event.block;

  if (!player || !item || !block) return;

  const entityId = summonMap[item.typeId];
  if (!entityId || block.typeId !== "dragonmountsplus:dragon_core") return;

  const { x, y, z } = block.location;

  player.runCommandAsync(`clear @s ${item.typeId} 0 1`);
  player.runCommandAsync(`playsound mob.endermen.portal @a ${x} ${y} ${z} 1 1 `);
  player.runCommandAsync(`setblock ${x} ${y} ${z} air`);
  player.runCommandAsync(`summon ${entityId} ${x} ${y} ${z} minecraft:entity_transformed`);
});
