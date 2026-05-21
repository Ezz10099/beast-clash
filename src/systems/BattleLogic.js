export class BattleLogic {
  static createFighter(animalData, team, slot) {
    return {
      ...animalData,
      team,
      slot,
      hp: animalData.maxHp,
      statuses: [],
      alive: true,
      sprite: null,
      hpBar: null,
      nameText: null,
      statusText: null,
    };
  }

  static getTurnOrder(fighters) {
    return fighters
      .filter(f => f.alive)
      .sort((a, b) => b.speed - a.speed);
  }

  static chooseTarget(attacker, fighters) {
    const enemies = fighters.filter(f => f.team !== attacker.team && f.alive);
    if (enemies.length === 0) return null;
    return enemies.sort((a, b) => a.hp - b.hp)[0];
  }

  static applyDamage(target, amount) {
    target.hp = Math.max(0, target.hp - amount);
    if (target.hp <= 0) {
      target.alive = false;
    }
  }

  static tryApplyStatus(attacker, target) {
    const status = attacker.statusOnHit;
    if (!status) return null;
    if (Math.random() > status.chance) return null;

    target.statuses.push({
      type: status.type,
      turns: status.turns,
      damage: status.damage || 0,
    });

    return status.type;
  }

  static processStartOfTurn(fighter) {
    const events = [];

    for (const status of fighter.statuses) {
      if (status.type === 'poison' || status.type === 'bleed') {
        this.applyDamage(fighter, status.damage);
        events.push({
          type: status.type,
          damage: status.damage,
          target: fighter,
        });
      }

      status.turns -= 1;
    }

    fighter.statuses = fighter.statuses.filter(s => s.turns > 0);
    return events;
  }

  static isStunned(fighter) {
    return fighter.statuses.some(s => s.type === 'stun');
  }

  static clearOneStun(fighter) {
    const index = fighter.statuses.findIndex(s => s.type === 'stun');
    if (index >= 0) fighter.statuses.splice(index, 1);
  }

  static teamAlive(fighters, team) {
    return fighters.some(f => f.team === team && f.alive);
  }
}
