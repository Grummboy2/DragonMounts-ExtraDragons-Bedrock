import { system, world } from '@minecraft/server';

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('dragonmountsplus_cherry_egg_block:trigger', {
    onPlayerInteract: e => {
      const { x, y, z } = e.block.location;
      e.player.runCommandAsync(`summon dragonmountsplus:cherry_dragon_egg ${x} ${y + 1} ${z}`);
      e.player.runCommandAsync(`setblock ${x} ${y} ${z} air`);
    },
  });
});