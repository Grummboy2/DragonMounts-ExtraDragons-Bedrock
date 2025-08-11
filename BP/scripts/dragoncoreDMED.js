import { world } from "@minecraft/server";

// Cấu hình: mỗi key ứng với một entity
const summonMap = {
  "dm2:essence_sculk": "dm2:sculk_dragon",
  "dm2:essence_phantom": "dm2:phantom_dragon",
  "dm2:essence_red": "dm2:red_dragon",
  "dm2:essence_cherry": "dm2:cherry_dragon",
  "dm2:essence_guardian": "dm2:guardian_dragon"
};

world.beforeEvents.itemUseOn.subscribe(event => {
  const player = event.source;
  const item = event.itemStack;
  const block = event.block;

  if (!player || !item || !block) return;

  const entityId = summonMap[item.typeId];
  if (!entityId || block.typeId !== "dragonmounts:dragon_core") return;

  const { x, y, z } = block.location;

  player.runCommandAsync(`clear @s ${item.typeId} 0 1`);
  player.runCommandAsync(`playsound mob.endermen.portal @a ${x} ${y} ${z} 1 1 `);
  player.runCommandAsync(`setblock ${x} ${y} ${z} air`);
  player.runCommandAsync(`summon ${entityId} ${x} ${y} ${z} minecraft:entity_transformed`);
});
