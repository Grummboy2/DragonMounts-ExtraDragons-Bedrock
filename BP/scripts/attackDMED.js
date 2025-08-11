import { Player, world, system } from '@minecraft/server';

const cooldownMap = new Map();

function setCooldown(player, tickDelay) {
  cooldownMap.set(player.id, system.currentTick + tickDelay);
}

function isOnCooldown(player) {
  const cooldownEnd = cooldownMap.get(player.id) || 0;
  return system.currentTick < cooldownEnd;
}

const validDragonIds = [
  "dm2:f_cherry_dragon",
  "dm2:cherry_dragon",
  "dm2:sculk_dragon",
  "dm2:guardian_dragon",
  "dm2:f_guardian_dragon",
  "dm2:phantom_dragon",
  "dm2:f_phantom_dragon",
  "dm2:red_dragon"
];

world.afterEvents.itemUse.subscribe(e => {
  const player = e.source;
  if (!(player instanceof Player)) return;
  if (e.itemStack.typeId !== "bj:ruby_wand") return;
  if (isOnCooldown(player)) return;

  const riding = player.getComponent("minecraft:riding")?.entityRidingOn;
  if (!riding) return;
  if (!validDragonIds.includes(riding.typeId)) return;

  player.runCommandAsync("function attack");
  setCooldown(player, 40);
});
