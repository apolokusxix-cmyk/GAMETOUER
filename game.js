(() => {
  'use strict';

  const W = 1672;
  const H = 941;
  const SETTINGS_KEY = 'defensa_portales_settings_v1';
  const defaultSettings = {
    difficulty: 'normal',
    rewards: { skeleton: 5, lilac: 12, blackBalloon: 40, purpleBalloon: 60 }
  };
  const difficultyStats = {
    easy: { hp: 0.78, speed: 0.84, label: 'Tranquilo' },
    normal: { hp: 1, speed: 1, label: 'Normal' },
    hard: { hp: 1.35, speed: 1.14, label: 'Difícil' },
    nightmare: { hp: 1.8, speed: 1.3, label: 'Pesadilla' }
  };
  const maps = [
    {
      name: 'Sendero del Guardián', short: 'SENDERO I', subtitle: 'Una ruta amplia junto a las cascadas', art: 'assets/mapa_01.webp',
      sites: [[.26,.14],[.29,.33],[.51,.21],[.57,.41],[.73,.44],[.165,.62],[.34,.63],[.48,.74],[.67,.68],[.81,.69]],
      ground: [[0,.19],[.075,.19],[.14,.20],[.21,.215],[.28,.23],[.35,.245],[.42,.255],[.49,.27],[.55,.28],[.60,.30],[.635,.325],[.655,.36],[.66,.405],[.66,.45],[.65,.49],[.63,.525],[.60,.55],[.56,.575],[.51,.59],[.46,.60],[.41,.595],[.36,.585],[.32,.57],[.285,.555],[.26,.55],[.245,.565],[.24,.59],[.245,.625],[.26,.66],[.285,.695],[.325,.725],[.38,.75],[.45,.77],[.53,.78],[.61,.78],[.69,.77],[.76,.75],[.82,.73],[.87,.70],[.905,.665],[.925,.625],[.935,.59],[.96,.58],[1,.58]],
      air: [[0,.21],[.075,.21],[.12,.215],[.155,.23],[.18,.255],[.19,.29],[.19,.34],[.19,.40],[.19,.47],[.19,.54],[.195,.60],[.205,.65],[.23,.695],[.275,.73],[.34,.755],[.42,.775],[.51,.785],[.60,.785],[.68,.775],[.75,.755],[.81,.73],[.86,.70],[.90,.665],[.925,.625],[.94,.59],[.97,.58],[1,.58]]
    },
    {
      name: 'Curva de las Dos Cascadas', short: 'SENDERO II', subtitle: 'Un paso serpenteante entre piedra y agua', art: 'assets/mapa_02.webp',
      sites: [[.21,.25],[.44,.18],[.70,.21],[.48,.35],[.74,.44],[.26,.53],[.74,.64],[.42,.72],[.51,.87],[.82,.87]],
      ground: [[0,.66],[.075,.66],[.14,.665],[.21,.675],[.26,.68],[.295,.675],[.32,.655],[.34,.625],[.35,.59],[.35,.55],[.34,.515],[.32,.48],[.29,.45],[.25,.43],[.21,.415],[.17,.395],[.135,.37],[.11,.34],[.105,.305],[.11,.27],[.13,.24],[.165,.215],[.21,.20],[.27,.20],[.34,.205],[.41,.225],[.48,.25],[.55,.275],[.62,.29],[.665,.30],[.69,.32],[.705,.35],[.71,.39],[.71,.435],[.70,.475],[.68,.51],[.65,.535],[.675,.55],[.72,.56],[.78,.56],[.835,.55],[.875,.535],[.90,.51],[.915,.48],[.92,.45],[.945,.435],[.975,.425],[1,.42]],
      air: [[0,.68],[.075,.68],[.14,.69],[.20,.705],[.255,.73],[.30,.755],[.35,.775],[.42,.79],[.51,.80],[.60,.80],[.69,.80],[.77,.795],[.82,.785],[.85,.765],[.86,.735],[.86,.69],[.86,.64],[.865,.59],[.875,.54],[.89,.50],[.915,.47],[.945,.45],[.975,.44],[1,.42]]
    },
    {
      name: 'Paso de la Luna', short: 'SENDERO III', subtitle: 'Defiende el portal bajo los riscos', art: 'assets/mapa_03.webp',
      sites: [[.29,.25],[.455,.27],[.80,.15],[.86,.32],[.215,.44],[.45,.57],[.55,.58],[.82,.64],[.33,.75],[.65,.75]],
      ground: [[0,.35],[.075,.35],[.15,.35],[.23,.355],[.29,.36],[.33,.38],[.355,.415],[.37,.455],[.37,.50],[.375,.545],[.385,.585],[.405,.625],[.44,.665],[.485,.695],[.535,.715],[.58,.72],[.615,.71],[.645,.685],[.66,.65],[.67,.605],[.67,.555],[.67,.505],[.665,.455],[.665,.405],[.68,.36],[.705,.32],[.745,.285],[.795,.26],[.855,.245],[.92,.235],[.96,.22],[1,.20]],
      air: [[0,.35],[.08,.345],[.16,.34],[.25,.34],[.34,.345],[.43,.35],[.52,.35],[.60,.345],[.67,.33],[.72,.305],[.77,.275],[.83,.25],[.89,.235],[.95,.22],[1,.20]]
    }
  ];

  const towers = {
    archer: { name: 'Arqueros', label: 'Torre de arqueros', count: 13, cost: 100, damage: 2, rate: .48, range: 174, kind: 'arrow', color: '#ecd49c', target: 'Tierra y aire', desc: 'Flechas medievales · disparo rápido' },
    fire: { name: 'Láser de fuego', label: 'Torre de fuego', count: 6, cost: 150, damage: 6, rate: .42, range: 238, kind: 'laser', color: '#ff8c52', target: 'Tierra y aire', desc: 'Rayo ígneo · alcance amplio' },
    electric: { name: 'Láser eléctrico', label: 'Torre eléctrica', count: 16, cost: 140, damage: 4, rate: .3, range: 220, kind: 'chain', color: '#8de8e9', target: 'Tierra y aire', desc: 'Descarga en cadena · varios blancos' },
    mortar: { name: 'Mortero', label: 'Mortero', count: 14, cost: 190, damage: 10, rate: 2.1, range: 405, kind: 'mortar', color: '#ffc15b', target: 'Solo tierra', desc: 'Bala explosiva · alcance enorme' }
  };
  const towerOrder = ['archer', 'fire', 'electric', 'mortar'];
  const towerAssetPrefix = { archer: 'torre_arqueros', fire: 'torre_fuego', electric: 'torre_electrica', mortar: 'torre_mortero' };
  const towerArt = {};
  for (const key of towerOrder) {
    towerArt[key] = [];
    for (let level = 1; level <= towers[key].count; level++) {
      const img = new Image();
      img.src = `assets/${towerAssetPrefix[key]}_${level}.png`;
      towerArt[key][level] = img;
    }
  }
  maps.forEach(map => { map.image = new Image(); map.image.src = map.art; });

  let settings = loadSettings();
  let chosenMap = 0;
  let state = null;
  let rafId = null;
  let previousFrame = 0;
  let toastTimer = 0;
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  function loadSettings() {
    try {
      const stored = JSON.parse(localStorage.getItem(SETTINGS_KEY));
      if (!stored) return structuredClone(defaultSettings);
      return {
        difficulty: difficultyStats[stored.difficulty] ? stored.difficulty : 'normal',
        rewards: { ...defaultSettings.rewards, ...(stored.rewards || {}) }
      };
    } catch (_) { return structuredClone(defaultSettings); }
  }

  function persistSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (_) { /* settings remain active for this page */ }
  }

  const mapGrid = document.getElementById('mapSelectGrid');
  maps.forEach((map, index) => {
    const card = document.createElement('button');
    card.className = `map-card${index === chosenMap ? ' selected' : ''}`;
    card.type = 'button';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `<img class="map-thumb" src="${map.art}" alt="${map.name}"><span class="map-chip">${String(index + 1).padStart(2, '0')} · BOSQUE</span><span class="map-meta"><span><b>${map.name}</b><small>${map.subtitle}</small></span><span class="map-arrow">↗</span></span>`;
    card.addEventListener('click', () => {
      chosenMap = index;
      [...mapGrid.children].forEach((el, i) => el.classList.toggle('selected', i === index));
      document.querySelector('.map-count').textContent = `${String(index + 1).padStart(2, '0')} — 03`;
    });
    mapGrid.appendChild(card);
  });

  document.getElementById('startGameButton').addEventListener('click', beginGame);
  document.getElementById('backToMaps').addEventListener('click', event => {
    event.preventDefault();
    if (state && state.enemies.length && state.phase === 'wave') {
      showToast('Termina la oleada antes de cambiar de mapa.');
      return;
    }
    document.getElementById('battleScreen').classList.add('hidden');
    document.getElementById('setupScreen').classList.remove('hidden');
  });
  document.getElementById('waveButton').addEventListener('click', () => {
    if (!state) return;
    if (state.phase === 'ready') startWave();
    else if (state.phase === 'gameover') resetRun();
  });
  document.getElementById('pauseButton').addEventListener('click', () => {
    if (!state || state.phase !== 'wave') return;
    state.paused = !state.paused;
    document.getElementById('pauseButton').textContent = state.paused ? '▶' : 'Ⅱ';
    document.getElementById('pauseButton').title = state.paused ? 'Continuar' : 'Pausar';
    document.getElementById('arenaOverlay').classList.toggle('dismissed', !state.paused);
    if (state.paused) setOverlay('Partida en pausa', 'Pulsa continuar cuando estés listo.');
    renderMessage(state.paused ? 'La defensa está en pausa.' : 'La defensa continúa.');
  });
  document.getElementById('speedButton').addEventListener('click', () => {
    if (!state) return;
    state.speed = state.speed === 1 ? 1.5 : state.speed === 1.5 ? 2 : 1;
    document.getElementById('speedButton').textContent = `${state.speed}×`;
  });

  function beginGame() {
    document.getElementById('setupScreen').classList.add('hidden');
    document.getElementById('battleScreen').classList.remove('hidden');
    const map = maps[chosenMap];
    state = {
      mapIndex: chosenMap, phase: 'ready', paused: false, speed: 1,
      lives: 20, gold: 300, score: 0, wave: 0, enemies: [], towers: Array(map.sites.length).fill(null),
      projectiles: [], effects: [], particles: [], spawnQueue: [], selectedSite: null, placingType: null,
      clock: 0, waveClock: 0, pendingWave: false, gameTime: 0
    };
    document.getElementById('battleMapTitle').textContent = map.name;
    document.getElementById('mapBadgeName').textContent = map.short;
    document.getElementById('pauseButton').textContent = 'Ⅱ';
    document.getElementById('speedButton').textContent = '1×';
    document.getElementById('arenaOverlay').classList.remove('dismissed');
    setOverlay('El sendero está en calma', 'Coloca tus torres y prepara la primera oleada.');
    renderMessage('Elige un puesto y construye tu primera torre.');
    renderPanel();
    updateStats();
    if (rafId) cancelAnimationFrame(rafId);
    previousFrame = performance.now();
    rafId = requestAnimationFrame(frame);
  }

  function resetRun() {
    const mapIndex = state ? state.mapIndex : chosenMap;
    chosenMap = mapIndex;
    beginGame();
  }

  function startWave() {
    if (!state || state.phase !== 'ready') return;
    state.wave += 1;
    state.phase = 'wave';
    state.paused = false;
    state.waveClock = 0;
    state.pendingWave = false;
    state.spawnQueue = makeWave(state.wave);
    document.getElementById('pauseButton').textContent = 'Ⅱ';
    document.getElementById('arenaOverlay').classList.add('dismissed');
    document.getElementById('waveButton').innerHTML = 'Oleada en curso <span>···</span>';
    renderMessage(`Oleada ${state.wave}: las huellas se acercan al portal.`);
    updateStats();
  }

  function makeWave(wave) {
    const count = 6 + Math.min(20, wave * 2);
    const queue = [];
    for (let i = 0; i < count; i++) {
      const type = wave >= 2 && i % 4 === 3 && i >= 3 ? 'lilac' : 'skeleton';
      queue.push({ at: i * Math.max(.38, .82 - wave * .012), type });
    }
    if (wave >= 5 && wave % 5 === 0) {
      const type = wave % 10 === 5 ? 'blackBalloon' : 'purpleBalloon';
      queue.push({ at: count * Math.max(.38, .82 - wave * .012) + .5, type });
    }
    return queue.sort((a, b) => a.at - b.at);
  }

  function spawnEnemy(type, drop = false, progress = 0, routeOverride = null) {
    if (!state) return;
    const balloon = type === 'blackBalloon' || type === 'purpleBalloon';
    const baseHP = type === 'skeleton' ? 50 : type === 'lilac' ? 100 : type === 'blackBalloon' ? 200 : 300;
    const difficulty = difficultyStats[settings.difficulty] || difficultyStats.normal;
    const waveScale = 1 + Math.max(0, state.wave - 1) * .045;
    const route = routeOverride || getRoute(balloon);
    state.enemies.push({
      id: Math.random().toString(36).slice(2), type, balloon, air: balloon, drop,
      hp: Math.round(baseHP * difficulty.hp * waveScale), maxHp: Math.round(baseHP * difficulty.hp * waveScale),
      progress: Math.max(0, progress), routeLength: route.total, route,
      speed: (balloon ? 36 : type === 'lilac' ? 36 : drop ? 47 : 42) * difficulty.speed * (1 + Math.max(0, state.wave - 1) * .012),
      age: 0, dropClock: balloon ? 1.8 : 0, dropped: 0, burnTime: 0, burnDps: 0, dead: false
    });
  }

  function getRoute(air) {
    const map = maps[state ? state.mapIndex : chosenMap];
    const points = (air ? map.air : map.ground).map(([x, y]) => ({ x: x * W, y: y * H }));
    let length = 0;
    for (let i = 1; i < points.length; i++) {
      length += distance(points[i - 1], points[i]);
      points[i].start = length;
    }
    points[0].start = 0;
    points.total = length;
    return points;
  }

  function routePosition(route, progress) {
    const amount = Math.max(0, Math.min(route.total, progress));
    for (let i = 1; i < route.length; i++) {
      const before = route[i - 1];
      const after = route[i];
      const segmentLength = after.start - before.start;
      if (amount <= after.start || i === route.length - 1) {
        const t = segmentLength ? Math.max(0, Math.min(1, (amount - before.start) / segmentLength)) : 0;
        return { x: before.x + (after.x - before.x) * t, y: before.y + (after.y - before.y) * t };
      }
    }
    return route[route.length - 1];
  }

  function nearestRouteProgress(route, position) {
    let nearestDistance = Infinity;
    let nearestProgress = 0;
    for (let i = 1; i < route.length; i++) {
      const before = route[i - 1];
      const after = route[i];
      const dx = after.x - before.x;
      const dy = after.y - before.y;
      const lengthSquared = dx * dx + dy * dy;
      const t = lengthSquared ? Math.max(0, Math.min(1, ((position.x - before.x) * dx + (position.y - before.y) * dy) / lengthSquared)) : 0;
      const x = before.x + dx * t;
      const y = before.y + dy * t;
      const distanceToSegment = Math.hypot(position.x - x, position.y - y);
      if (distanceToSegment < nearestDistance) {
        nearestDistance = distanceToSegment;
        nearestProgress = before.start + (after.start - before.start) * t;
      }
    }
    return nearestProgress;
  }

  function frame(now) {
    if (!state) return;
    const dt = Math.min(.05, (now - previousFrame) / 1000 || 0);
    previousFrame = now;
    if (!state.paused && state.phase !== 'gameover') update(dt * state.speed);
    draw();
    updateStats();
    rafId = requestAnimationFrame(frame);
  }

  function update(dt) {
    state.gameTime += dt;
    if (state.phase === 'wave') {
      state.waveClock += dt;
      while (state.spawnQueue.length && state.spawnQueue[0].at <= state.waveClock) {
        spawnEnemy(state.spawnQueue.shift().type);
      }
    }

    for (const enemy of state.enemies) {
      if (enemy.dead) continue;
      enemy.age += dt;
      if (enemy.burnTime > 0) {
        enemy.burnTime -= dt;
        enemy.hp -= enemy.burnDps * dt;
        if (Math.random() < dt * 9) addParticle(enemyPosition(enemy), '#ff8a45', 2, 2.5);
      }
      if (enemy.balloon && enemy.dropped < 4) {
        enemy.dropClock -= dt;
        if (enemy.dropClock <= 0) {
          enemy.dropped++;
          enemy.dropClock = 2.25;
          // After landing, the minion is a ground unit: project the drop onto the sand road.
          const dropPoint = enemyPosition(enemy);
          const landingRoute = getRoute(false);
          const landingProgress = nearestRouteProgress(landingRoute, dropPoint);
          const landingPosition = routePosition(landingRoute, landingProgress);
          spawnEnemy('skeleton', true, landingProgress, landingRoute);
          addParticle({ x: landingPosition.x + (Math.random() - .5) * 9, y: landingPosition.y + 8 }, '#d7cfb6', 5, 5);
          renderMessage('Un globo dejó caer un pequeño esqueleto en el sendero.');
        }
      }
      enemy.progress += enemy.speed * dt;
      if (enemy.progress >= enemy.routeLength) {
        enemy.dead = true;
        state.lives = Math.max(0, state.lives - (enemy.balloon ? 2 : 1));
        addParticle(enemyPosition(enemy), enemy.type.includes('Balloon') ? '#b18deb' : '#30332d', 8, 4);
        if (state.lives <= 0) finishGame();
      }
      if (enemy.hp <= 0 && !enemy.dead) killEnemy(enemy);
    }
    state.enemies = state.enemies.filter(enemy => !enemy.dead);

    for (const tower of state.towers.filter(Boolean)) {
      tower.cooldown -= dt;
      if (tower.cooldown > 0 || state.phase !== 'wave') continue;
      const stats = towerStats(tower.type, tower.level);
      const center = sitePosition(tower.site);
      const targets = state.enemies.filter(enemy => !enemy.dead && !(tower.type === 'mortar' && enemy.air))
        .map(enemy => ({ enemy, pos: enemyPosition(enemy) }))
        .filter(item => distance(center, item.pos) <= stats.range)
        .sort((a, b) => (b.enemy.progress / b.enemy.routeLength) - (a.enemy.progress / a.enemy.routeLength));
      if (!targets.length) continue;
      tower.cooldown = stats.rate;
      tower.aim = Math.atan2(targets[0].pos.y - center.y, targets[0].pos.x - center.x);
      fireTower(tower, targets, stats, center);
    }

    updateProjectiles(dt);
    state.enemies = state.enemies.filter(enemy => !enemy.dead);
    updateEffects(dt);
    updateParticles(dt);

    if (state.phase === 'wave' && state.spawnQueue.length === 0 && state.enemies.length === 0) {
      state.phase = 'ready';
      state.pendingWave = true;
      const bonus = 22 + state.wave * 7;
      state.gold += bonus;
      state.score += 15 + state.wave * 4;
      document.getElementById('arenaOverlay').classList.remove('dismissed');
      setOverlay(`Oleada ${state.wave} superada`, `+${bonus} de oro · El sendero vuelve a estar en calma.`);
      document.getElementById('waveButton').innerHTML = 'Siguiente oleada <span>→</span>';
      renderMessage(`Oleada limpia. Bonificación de ${bonus} monedas.`);
    }
  }

  function towerStats(type, level) {
    const data = towers[type];
    const damage = Math.max(data.damage, Math.round(data.damage * (1 + (level - 1) * .12)));
    let targets = 1;
    let range = data.range + Math.floor((level - 1) * (type === 'mortar' ? 5 : 2));
    let rate = data.rate * Math.max(.68, 1 - (level - 1) * .018);
    if (type === 'electric') targets = level < 5 ? 2 : level < 10 ? 3 : level < 15 ? 4 : 5;
    if (type === 'mortar') range = data.range + (level - 1) * 7;
    return { damage, range, rate, targets, splash: 48 + Math.min(45, level * 2.5), burn: type === 'mortar' && level >= 10 };
  }

  function fireTower(tower, targets, stats, center) {
    const data = towers[tower.type];
    const selected = targets.slice(0, stats.targets);
    if (tower.type === 'arrow' || tower.type === 'archer') {
      const target = selected[0];
      state.projectiles.push({ type: 'arrow', x: center.x, y: center.y - 20, startX: center.x, startY: center.y - 20, targetX: target.pos.x, targetY: target.pos.y, targetId: target.enemy.id, progress: 0, duration: .22, damage: stats.damage, color: data.color });
      return;
    }
    if (tower.type === 'fire') {
      const target = selected[0];
      applyDamage(target.enemy, stats.damage);
      state.effects.push({ type: 'laser', x1: center.x, y1: center.y - 15, x2: target.pos.x, y2: target.pos.y, time: .17, max: .17, color: '#ff8c52' });
      addParticle(target.pos, '#ffc36c', 3, 2);
      return;
    }
    if (tower.type === 'electric') {
      selected.forEach((target, index) => {
        applyDamage(target.enemy, stats.damage);
        state.effects.push({ type: 'electric', x1: center.x, y1: center.y - 16, x2: target.pos.x, y2: target.pos.y, time: .16, max: .16, color: index % 2 ? '#b594ff' : '#7cffff' });
        addParticle(target.pos, '#acffff', 2, 2);
      });
      return;
    }
    const target = selected[0];
    state.projectiles.push({ type: 'mortar', x: center.x, y: center.y - 20, startX: center.x, startY: center.y - 20, targetX: target.pos.x, targetY: target.pos.y, progress: 0, duration: .8, damage: stats.damage, splash: stats.splash, size: tower.level >= 10 ? 17 : tower.level >= 8 ? 13 : 9, burning: stats.burn, color: stats.burn ? '#ff7a39' : '#ffc15b' });
  }

  function updateProjectiles(dt) {
    for (const projectile of state.projectiles) {
      projectile.progress += dt / projectile.duration;
      const t = Math.min(1, projectile.progress);
      projectile.x = projectile.startX + (projectile.targetX - projectile.startX) * t;
      projectile.y = projectile.startY + (projectile.targetY - projectile.startY) * t - (projectile.type === 'mortar' ? Math.sin(t * Math.PI) * 95 : 0);
      if (t >= 1 && !projectile.done) {
        projectile.done = true;
        if (projectile.type === 'arrow') {
          const target = state.enemies.find(enemy => enemy.id === projectile.targetId && !enemy.dead);
          if (target) { applyDamage(target, projectile.damage); addParticle(enemyPosition(target), '#e8d29c', 3, 2); }
        } else {
          state.effects.push({ type: projectile.burning ? 'fireblast' : 'blast', x: projectile.targetX, y: projectile.targetY, time: .34, max: .34, color: projectile.color });
          for (const enemy of state.enemies) {
            if (enemy.dead || enemy.air) continue;
            if (distance(enemyPosition(enemy), { x: projectile.targetX, y: projectile.targetY }) <= projectile.splash) {
              applyDamage(enemy, projectile.damage);
              if (projectile.burning) { enemy.burnTime = Math.max(enemy.burnTime, 2.8); enemy.burnDps = Math.max(enemy.burnDps, Math.ceil(projectile.damage * .18)); }
            }
          }
          addParticle({ x: projectile.targetX, y: projectile.targetY }, projectile.color, 15, 6);
        }
      }
    }
    state.projectiles = state.projectiles.filter(projectile => !projectile.done);
  }

  function applyDamage(enemy, amount) {
    if (!enemy || enemy.dead) return;
    enemy.hp -= amount;
    if (enemy.hp <= 0) killEnemy(enemy);
  }

  function killEnemy(enemy) {
    if (enemy.dead) return;
    enemy.dead = true;
    const rewardKey = enemy.type;
    const points = Number(settings.rewards[rewardKey] ?? 0);
    state.score += points;
    const coins = enemy.balloon ? (enemy.type === 'blackBalloon' ? 36 : 52) : enemy.type === 'lilac' ? 13 : 8;
    state.gold += coins;
    const pos = enemyPosition(enemy);
    const colors = enemy.type === 'lilac' || enemy.type === 'purpleBalloon' ? ['#b286ee','#2b2535','#6f47a1','#151922'] : enemy.balloon ? ['#393833','#806c4c','#171c1c'] : ['#111616','#282c2a','#443f35'];
    for (let i = 0; i < (enemy.balloon ? 18 : enemy.drop ? 9 : 13); i++) addParticle(pos, colors[i % colors.length], enemy.balloon ? 4 : 3, enemy.balloon ? 4.5 : 3.7);
    renderMessage(`${enemy.drop ? 'Esqueleto pequeño' : enemy.balloon ? 'Globo derribado' : 'Esqueleto derrotado'} · +${points} puntos`);
  }

  function finishGame() {
    state.phase = 'gameover';
    state.paused = false;
    state.spawnQueue = [];
    state.enemies = [];
    document.getElementById('arenaOverlay').classList.remove('dismissed');
    setOverlay('El portal ha caído', `Llegaste a la oleada ${state.wave}. Puedes volver a intentarlo.`);
    document.getElementById('waveButton').innerHTML = 'Volver a intentar <span>↻</span>';
    renderMessage('El bosque necesita un nuevo guardián.');
  }

  function updateEffects(dt) {
    for (const effect of state.effects) effect.time -= dt;
    state.effects = state.effects.filter(effect => effect.time > 0);
  }

  function updateParticles(dt) {
    for (const p of state.particles) {
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += p.gravity * dt;
    }
    state.particles = state.particles.filter(p => p.life > 0);
  }

  function addParticle(pos, color, count = 1, spread = 2) {
    if (!state) return;
    for (let i = 0; i < count; i++) {
      state.particles.push({ x: pos.x, y: pos.y, vx: (Math.random() - .5) * spread * 26, vy: -Math.random() * spread * 18, gravity: 54, size: Math.random() < .65 ? 4 : 6, color, life: .28 + Math.random() * .35, max: .63 });
    }
  }

  function draw() {
    if (!state) return;
    const map = maps[state.mapIndex];
    ctx.clearRect(0, 0, W, H);
    ctx.imageSmoothingEnabled = true;
    if (map.image.complete && map.image.naturalWidth) ctx.drawImage(map.image, 0, 0, W, H);
    else { ctx.fillStyle = '#29402a'; ctx.fillRect(0, 0, W, H); }
    drawRangeRing();
    drawBuildSites(map);
    state.towers.forEach(tower => { if (tower) drawTower(tower); });
    state.enemies.slice().sort((a, b) => enemyPosition(a).y - enemyPosition(b).y).forEach(drawEnemy);
    drawProjectiles();
    drawEffects();
    drawParticles();
    ctx.imageSmoothingEnabled = false;
  }

  function drawBuildSites(map) {
    map.sites.forEach(([nx, ny], index) => {
      if (state.towers[index]) return;
      const p = { x: nx * W, y: ny * H };
      const chosen = state.selectedSite === index;
      const hover = state.hoverSite === index;
      const pulse = 1 + Math.sin(state.gameTime * 2.2 + index) * .035;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(pulse, pulse);
      ctx.fillStyle = chosen ? '#20392b' : '#26372b';
      ctx.strokeStyle = chosen || hover ? '#ffe18d' : '#d4b15d';
      ctx.lineWidth = chosen || hover ? 4 : 2.4;
      ctx.shadowColor = chosen || hover ? '#f9d66c' : '#0e1b12';
      ctx.shadowBlur = chosen || hover ? 20 : 8;
      roundRect(ctx, -28, -26, 56, 52, 8, true, true);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#ffffff37'; ctx.lineWidth = 1;
      roundRect(ctx, -21, -19, 42, 38, 6, false, true);
      ctx.fillStyle = '#ead28e'; ctx.font = 'bold 25px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(chosen ? '⌖' : '+', 0, 0);
      ctx.restore();
      ctx.save(); ctx.font = '10px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff1c3'; ctx.globalAlpha = .9; ctx.fillText(String(index + 1).padStart(2, '0'), p.x, p.y + 37); ctx.restore();
    });
  }

  function drawRangeRing() {
    if (state.selectedSite == null || !state.towers[state.selectedSite]) return;
    const tower = state.towers[state.selectedSite];
    const center = sitePosition(tower.site);
    const stats = towerStats(tower.type, tower.level);
    ctx.save();
    ctx.beginPath(); ctx.arc(center.x, center.y, stats.range, 0, Math.PI * 2);
    ctx.fillStyle = tower.type === 'electric' ? '#95edff10' : '#ffda8220'; ctx.fill();
    ctx.setLineDash([7, 9]); ctx.strokeStyle = tower.type === 'electric' ? '#99e4ff99' : '#ffe393a6'; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
  }

  function drawTower(tower) {
    const center = sitePosition(tower.site);
    const selected = state.selectedSite === tower.site;
    const sprite = towerArt[tower.type][tower.level];
    ctx.save();
    ctx.fillStyle = '#09120c65'; ctx.beginPath(); ctx.ellipse(center.x, center.y + 21, 31, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#485238'; ctx.strokeStyle = selected ? '#ffe392' : '#dbb45b'; ctx.lineWidth = selected ? 3 : 2;
    roundRect(ctx, center.x - 25, center.y - 24, 50, 48, 8, true, true);
    ctx.fillStyle = '#d6b65f'; ctx.fillRect(center.x - 5, center.y + 18, 10, 5);
    if (sprite && sprite.complete && sprite.naturalWidth) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(sprite, center.x - 34, center.y - 41, 68, 68);
    } else drawTowerFallback(center, tower.type, tower.level);
    if (selected) {
      ctx.fillStyle = '#14231d'; ctx.strokeStyle = '#ffdf86'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(center.x + 22, center.y - 24, 11, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fff0bb'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(tower.level), center.x + 22, center.y - 24);
    }
    ctx.restore();
  }

  function drawTowerFallback(center, type, level) {
    const color = towers[type].color;
    ctx.fillStyle = color; ctx.fillRect(center.x - 5, center.y - 19, 10, 35);
    ctx.fillRect(center.x - 12, center.y - 4, 24, 6);
    ctx.fillRect(center.x - 16, center.y + 12, 32, 8);
    ctx.fillRect(center.x - 4, center.y - 26, 8, 9);
    ctx.fillStyle = '#fff0ad'; ctx.font = '10px monospace'; ctx.textAlign = 'center'; ctx.fillText(String(level), center.x, center.y + 34);
  }

  function drawEnemy(enemy) {
    const p = enemyPosition(enemy);
    const bob = Math.sin(enemy.age * (enemy.balloon ? 3 : 8)) * (enemy.balloon ? 4 : 1.6);
    if (enemy.balloon) drawBalloon(enemy, p.x, p.y + bob);
    else drawSkeleton(enemy, p.x, p.y + bob);
    if (enemy.burnTime > 0) {
      ctx.fillStyle = '#ff9c41'; ctx.fillRect(p.x - 10, p.y - 30, 4, 6); ctx.fillRect(p.x + 7, p.y - 24, 4, 5);
    }
    const width = enemy.balloon ? 45 : enemy.drop ? 24 : 30;
    const y = p.y - (enemy.balloon ? 48 : enemy.drop ? 32 : 42);
    ctx.fillStyle = '#07110dcc'; roundRect(ctx, p.x - width / 2, y, width, 5, 2, true, false);
    ctx.fillStyle = enemy.hp / enemy.maxHp < .3 ? '#ed7771' : enemy.balloon && enemy.type === 'purpleBalloon' ? '#c19bff' : '#97ce7b';
    ctx.fillRect(p.x - width / 2 + 1, y + 1, Math.max(1, (width - 2) * Math.max(0, enemy.hp / enemy.maxHp)), 3);
  }

  function drawSkeleton(enemy, x, y) {
    const lilac = enemy.type === 'lilac';
    const mini = enemy.drop;
    const scale = mini ? .82 : 1;
    const cycle = Math.sin(enemy.age * 10.4);
    ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.scale(scale, scale);
    ctx.fillStyle = '#0a130c77'; ctx.beginPath(); ctx.ellipse(0, 3, 13, 4, 0, 0, Math.PI * 2); ctx.fill();
    // Legs swing separately at the hips; each bone is drawn on a whole-pixel grid.
    [-1, 1].forEach(side => {
      ctx.save(); ctx.translate(side * 3, -9); ctx.rotate(side * cycle * .25);
      pixelBone(-1, 0, 3, 8, '#e6dcc0', '#8a887e');
      ctx.translate(0, 7); ctx.rotate(-side * cycle * .3);
      pixelBone(-1, 0, 3, 7, '#d7d1bd', '#77766e');
      ctx.fillStyle = '#bcb8aa'; ctx.fillRect(-4, 6, 8, 3); ctx.fillRect(-5, 8, 7, 2);
      ctx.restore();
    });
    // Rib cage and pelvis.
    ctx.fillStyle = '#c9c5b4'; ctx.fillRect(-4, -14, 8, 3); ctx.fillRect(-6, -11, 12, 2); ctx.fillRect(-5, -8, 10, 2); ctx.fillRect(-4, -5, 8, 2);
    ctx.fillStyle = '#6e716a'; ctx.fillRect(-2, -16, 4, 3);
    ctx.fillStyle = '#c7c1ad'; ctx.fillRect(-5, -3, 10, 4); ctx.fillStyle = '#7b7b71'; ctx.fillRect(-3, -2, 2, 2); ctx.fillRect(1, -2, 2, 2);
    // Arms swing independently from their shoulders.
    [-1, 1].forEach(side => {
      ctx.save(); ctx.translate(side * 6, -14); ctx.rotate(side * (.17 + cycle * .31));
      pixelBone(-1, 0, 3, 8, '#ddd6c1', '#88867b');
      ctx.translate(0, 7); ctx.rotate(-side * cycle * .35);
      pixelBone(-1, 0, 3, 7, '#d1ccb9', '#72736d');
      ctx.fillStyle = '#c4bda9'; ctx.fillRect(-2, 6, 5, 4); ctx.fillRect(-3, 8, 2, 2); ctx.fillRect(2, 8, 2, 2);
      if (side === 1) {
        ctx.save(); ctx.translate(2, 8); ctx.rotate(-.48 - cycle * .13);
        ctx.fillStyle = '#8b6237'; ctx.fillRect(-1, 0, 2, 11); ctx.fillStyle = '#d6d9d3'; ctx.fillRect(-1, -8, 2, 9); ctx.fillRect(-3, -5, 6, 2); ctx.fillStyle = '#bba572'; ctx.fillRect(-1, 8, 2, 4);
        ctx.restore();
      }
      ctx.restore();
    });
    // Skull and face.
    ctx.fillStyle = '#d8d3c1'; ctx.fillRect(-7, -27, 14, 10); ctx.fillRect(-5, -29, 10, 3); ctx.fillRect(-8, -24, 2, 5); ctx.fillRect(6, -24, 2, 5); ctx.fillRect(-5, -17, 10, 2);
    ctx.fillStyle = '#323734'; ctx.fillRect(-5, -23, 4, 4); ctx.fillRect(2, -23, 4, 4); ctx.fillRect(-1, -19, 2, 2);
    ctx.fillStyle = lilac ? (Math.sin(enemy.age * 3) > -.82 ? '#c88aff' : '#875ac4') : '#f2dd91';
    ctx.fillRect(-4, -22, 2, 2); ctx.fillRect(3, -22, 2, 2);
    ctx.fillStyle = '#ada896'; ctx.fillRect(-3, -16, 2, 1); ctx.fillRect(1, -16, 2, 1);
    if (lilac) {
      ctx.fillStyle = '#643a9a'; ctx.fillRect(-9, -30, 18, 3); ctx.fillRect(-7, -34, 14, 5); ctx.fillStyle = '#b688f0'; ctx.fillRect(-6, -33, 11, 2); ctx.fillStyle = '#523477'; ctx.fillRect(-8, -29, 16, 2);
      ctx.fillStyle = '#84542e'; ctx.fillRect(-7, -10, 3, 2); ctx.fillRect(-4, -8, 3, 2); ctx.fillRect(0, -10, 3, 2);
    }
    ctx.restore();
  }

  function pixelBone(x, y, width, height, light, shade) {
    ctx.fillStyle = shade; ctx.fillRect(x, y, width, height);
    ctx.fillStyle = light; ctx.fillRect(x, y + 1, width - 1, Math.max(1, height - 2));
    ctx.fillStyle = '#f0e9d3'; ctx.fillRect(x, y + 1, 1, Math.max(1, height - 3));
    ctx.fillRect(x - 1, y - 1, width + 2, 2); ctx.fillRect(x - 1, y + height - 1, width + 2, 2);
  }

  function drawBalloon(enemy, x, y) {
    const purple = enemy.type === 'purpleBalloon';
    const wobble = Math.sin(enemy.age * 2.3) * .035;
    const dark = purple ? '#473385' : '#282927';
    const accent = purple ? '#8660da' : '#725b3c';
    ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(wobble);
    ctx.fillStyle = '#08100c69'; ctx.beginPath(); ctx.ellipse(0, 4, 27, 6, 0, 0, Math.PI * 2); ctx.fill();
    // Balloon envelope, built from blocky bands to stay crisp at every scale.
    ctx.fillStyle = dark; ctx.fillRect(-19, -39, 38, 4); ctx.fillRect(-24, -35, 48, 5); ctx.fillRect(-27, -30, 54, 19); ctx.fillRect(-23, -11, 46, 6); ctx.fillRect(-15, -5, 30, 4);
    ctx.fillStyle = accent; ctx.fillRect(-17, -34, 34, 4); ctx.fillRect(-23, -29, 7, 18); ctx.fillRect(16, -29, 7, 18);
    ctx.fillStyle = purple ? '#aa8eff' : '#4a4941'; ctx.fillRect(-15, -28, 30, 4);
    ctx.fillStyle = purple ? '#36275f' : '#171918'; ctx.fillRect(-16, -23, 32, 12);
    ctx.fillStyle = '#e5deca'; ctx.fillRect(-7, -24, 13, 11); ctx.fillRect(-10, -21, 3, 6); ctx.fillRect(6, -21, 3, 6); ctx.fillRect(-5, -11, 9, 2);
    ctx.fillStyle = '#282a28'; ctx.fillRect(-5, -21, 3, 3); ctx.fillRect(2, -21, 3, 3); ctx.fillRect(-1, -16, 2, 3);
    if (purple) { ctx.fillStyle = '#d4a85b'; ctx.fillRect(-25, -25, 3, 11); ctx.fillRect(22, -25, 3, 11); }
    // Ropes, wooden basket and three dangling skeleton passengers.
    ctx.fillStyle = '#c5a36a'; ctx.fillRect(-18, -7, 2, 16); ctx.fillRect(16, -7, 2, 16); ctx.fillRect(-11, -5, 2, 15); ctx.fillRect(9, -5, 2, 15);
    ctx.fillStyle = '#976b3d'; ctx.fillRect(-17, 7, 34, 11); ctx.fillStyle = '#bf8b4d'; ctx.fillRect(-18, 7, 36, 3); ctx.fillRect(-16, 15, 32, 3);
    ctx.fillStyle = '#d2c9b3';
    [-10, 0, 10].forEach((sx, i) => {
      const sway = Math.round(Math.sin(enemy.age * 8 + i) * 2);
      ctx.fillRect(sx + sway - 2, 9, 4, 4); ctx.fillRect(sx + sway - 3, 9, 1, 2); ctx.fillRect(sx + sway + 2, 9, 1, 2);
      ctx.fillStyle = '#393a35'; ctx.fillRect(sx + sway - 1, 10, 1, 1); ctx.fillRect(sx + sway + 1, 10, 1, 1); ctx.fillStyle = '#d2c9b3';
      ctx.fillRect(sx + sway - 1, 13, 2, 3);
    });
    ctx.fillStyle = purple ? '#b68bff' : '#efdf9b'; ctx.fillRect(-3, -4, 6, 3);
    ctx.restore();
  }

  function drawProjectiles() {
    for (const p of state.projectiles) {
      if (p.type === 'arrow') {
        const angle = Math.atan2(p.targetY - p.startY, p.targetX - p.startX);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(angle);
        ctx.fillStyle = '#503820'; ctx.fillRect(-7, -1, 15, 2); ctx.fillStyle = '#ddd9c7'; ctx.fillRect(6, -2, 4, 4); ctx.fillStyle = '#dbb879'; ctx.fillRect(-6, -3, 3, 2); ctx.fillRect(-6, 1, 3, 2); ctx.restore();
      } else {
        const size = p.size || 10;
        ctx.fillStyle = p.burning ? '#ff752e' : '#303337'; ctx.fillRect(Math.round(p.x) - size / 2, Math.round(p.y) - size / 2, size, size);
        ctx.fillStyle = p.burning ? '#ffd065' : '#d9b567'; ctx.fillRect(Math.round(p.x) - 3, Math.round(p.y) - 3, 6, 6);
      }
    }
  }

  function drawEffects() {
    for (const effect of state.effects) {
      const alpha = Math.max(.12, effect.time / effect.max);
      ctx.save(); ctx.globalAlpha = alpha;
      if (effect.type === 'laser') {
        ctx.shadowColor = effect.color; ctx.shadowBlur = 16; ctx.strokeStyle = '#fff3d4'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(effect.x1, effect.y1); ctx.lineTo(effect.x2, effect.y2); ctx.stroke();
        ctx.strokeStyle = effect.color; ctx.lineWidth = 11; ctx.globalAlpha *= .38; ctx.stroke();
      } else if (effect.type === 'electric') {
        ctx.shadowColor = effect.color; ctx.shadowBlur = 12; ctx.strokeStyle = effect.color; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(effect.x1, effect.y1);
        const dx = effect.x2 - effect.x1, dy = effect.y2 - effect.y1;
        for (let i = 1; i < 6; i++) ctx.lineTo(effect.x1 + dx * i / 6 + Math.sin(i * 9 + effect.time * 70) * 8, effect.y1 + dy * i / 6 + Math.cos(i * 7) * 8);
        ctx.lineTo(effect.x2, effect.y2); ctx.stroke();
      } else {
        const r = (1 - effect.time / effect.max) * 38 + 8;
        ctx.fillStyle = effect.color; ctx.globalAlpha *= .36; ctx.beginPath(); ctx.arc(effect.x, effect.y, r, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = alpha; ctx.strokeStyle = effect.type === 'fireblast' ? '#ff994e' : '#ffe2a2'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(effect.x, effect.y, r, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.restore();
    }
  }

  function drawParticles() {
    for (const p of state.particles) {
      ctx.globalAlpha = Math.min(1, p.life / .17);
      ctx.fillStyle = p.color; ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }

  function enemyPosition(enemy) { return routePosition(enemy.route, enemy.progress); }
  function sitePosition(index) {
    const [x, y] = maps[state.mapIndex].sites[index];
    return { x: x * W, y: y * H };
  }
  function distance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function roundRect(context, x, y, width, height, radius, fill, stroke) {
    context.beginPath(); context.roundRect(x, y, width, height, radius); if (fill) context.fill(); if (stroke) context.stroke();
  }

  canvas.addEventListener('pointermove', event => {
    if (!state) return;
    const pos = pointerPosition(event);
    state.hoverSite = findSite(pos.x, pos.y);
  });
  canvas.addEventListener('pointerleave', () => { if (state) state.hoverSite = null; });
  canvas.addEventListener('click', event => {
    if (!state || state.phase === 'gameover') return;
    const pos = pointerPosition(event);
    const index = findSite(pos.x, pos.y);
    if (index == null) return;
    state.selectedSite = index;
    const tower = state.towers[index];
    if (tower) state.placingType = null;
    else if (state.placingType) {
      buildTower(state.placingType, index);
      state.placingType = null;
    }
    document.getElementById('arenaOverlay').classList.add('dismissed');
    renderPanel();
  });

  function pointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * W / rect.width, y: (event.clientY - rect.top) * H / rect.height };
  }
  function findSite(x, y) {
    const sites = maps[state.mapIndex].sites;
    let closest = null, best = 54;
    sites.forEach(([nx, ny], i) => {
      const d = Math.hypot(nx * W - x, ny * H - y);
      if (d < best) { best = d; closest = i; }
    });
    return closest;
  }

  function buildTower(type, site) {
    if (state.towers[site]) { showToast('Ese puesto ya tiene una torre.'); return; }
    const cost = towers[type].cost;
    if (state.gold < cost) { showToast(`Necesitas ${cost} monedas para esa torre.`); return; }
    state.gold -= cost;
    state.towers[site] = { type, site, level: 1, cooldown: .2, aim: -Math.PI / 2 };
    state.selectedSite = site;
    renderMessage(`${towers[type].label} construida. ¡Lista para defender!`);
    renderPanel(); updateStats();
  }

  function selectBuild(type) {
    if (!state || state.phase === 'gameover') return;
    state.placingType = type;
    renderMessage(`Toca un puesto vacío para construir ${towers[type].label.toLowerCase()}.`);
    renderPanel();
  }

  const detailPanel = document.getElementById('detailPanel');
  detailPanel.addEventListener('click', event => {
    const build = event.target.closest('[data-build]');
    const upgrade = event.target.closest('[data-upgrade]');
    const sell = event.target.closest('[data-sell]');
    if (build) {
      const site = state && state.selectedSite;
      if (site != null && !state.towers[site]) buildTower(build.dataset.build, site);
      else selectBuild(build.dataset.build);
      return;
    }
    if (upgrade && state && state.selectedSite != null) {
      const tower = state.towers[state.selectedSite];
      if (tower) upgradeTower(tower);
    }
    if (sell && state && state.selectedSite != null) sellTower(state.selectedSite);
  });

  function upgradeTower(tower) {
    const def = towers[tower.type];
    if (tower.level >= def.count) { showToast('Esta torre ya alcanzó su nivel máximo.'); return; }
    const cost = upgradeCost(tower);
    if (state.gold < cost) { showToast(`Necesitas ${cost} monedas para mejorarla.`); return; }
    state.gold -= cost;
    tower.level++;
    renderMessage(`${def.label} mejorada al nivel ${tower.level}.`);
    renderPanel(); updateStats();
  }
  function upgradeCost(tower) { return Math.round(towers[tower.type].cost * (.62 + tower.level * .2)); }
  function sellTower(site) {
    const tower = state.towers[site];
    if (!tower) return;
    const refund = Math.round(towers[tower.type].cost * .48 + (tower.level - 1) * towers[tower.type].cost * .19);
    state.gold += refund; state.towers[site] = null; state.selectedSite = null;
    renderMessage(`Torre retirada · recuperaste ${refund} monedas.`);
    renderPanel(); updateStats();
  }

  function renderPanel() {
    if (!state) return;
    const title = document.getElementById('panelTitle');
    const subtitle = document.getElementById('panelSubtitle');
    const tower = state.selectedSite == null ? null : state.towers[state.selectedSite];
    const siteOpen = state.selectedSite != null && !tower;
    if (tower) {
      const def = towers[tower.type];
      const stats = towerStats(tower.type, tower.level);
      const cost = tower.level < def.count ? upgradeCost(tower) : null;
      title.textContent = def.label;
      subtitle.textContent = `${def.desc} · Nivel ${tower.level} de ${def.count}`;
      const image = towerArt[tower.type][tower.level];
      const src = image && image.src;
      const levelText = `${tower.level} / ${def.count}`;
      detailPanel.innerHTML = `<div class="tower-detail"><div class="tower-detail-head"><img src="${src}" alt="${def.label}, nivel ${tower.level}"><span><b>${def.label}</b><small>NIVEL ${levelText}</small></span></div><div class="tower-stats"><div class="tower-stat"><span>Daño</span><b>${stats.damage} por impacto</b></div><div class="tower-stat"><span>Alcance</span><b>${stats.range} m</b></div><div class="tower-stat"><span>Objetivos</span><b>${stats.targets} ${tower.type === 'electric' ? 'en cadena' : 'a la vez'}</b></div><div class="tower-stat"><span>Puede atacar</span><b>${def.target}</b></div></div><div class="tower-actions"><button class="upgrade-button" data-upgrade ${cost == null || state.gold < cost ? 'disabled' : ''}>${cost == null ? 'Nivel máximo' : `Mejorar · ◆ ${cost}`}</button><button class="sell-button" data-sell>Vender</button></div></div>`;
    } else if (siteOpen) {
      title.textContent = `Puesto ${String(state.selectedSite + 1).padStart(2, '0')}`;
      subtitle.textContent = state.placingType ? `Modo de construcción: ${towers[state.placingType].label}.` : 'Elige una torre para colocar en este puesto.';
      detailPanel.innerHTML = `<div class="build-options">${towerOrder.map(key => {
        const def = towers[key]; const image = towerArt[key][1];
        return `<button class="build-card" type="button" data-build="${key}" ${state.gold < def.cost ? 'disabled' : ''}><img class="build-sprite" src="${image.src}" alt=""><span class="build-info"><b>${def.label}</b><small>${def.damage} daño · ${def.target.toLowerCase()}</small></span><span class="build-price">◆ ${def.cost}</span></button>`;
      }).join('')}</div>`;
    } else {
      title.textContent = 'Tus defensas';
      subtitle.textContent = state.placingType ? `Ahora toca un puesto vacío para construir ${towers[state.placingType].label.toLowerCase()}.` : 'Toca un puesto del mapa para construir.';
      detailPanel.innerHTML = '<div class="empty-selection"><span class="empty-glyph">⌖</span><strong>Sin puesto seleccionado</strong><small>Escoge un espacio del mapa para ver tus opciones.</small></div>';
    }
    document.getElementById('towerCount').textContent = `${state.towers.filter(Boolean).length} / ${state.towers.length}`;
  }

  function updateStats() {
    if (!state) return;
    document.getElementById('livesValue').textContent = state.lives;
    document.getElementById('goldValue').textContent = Math.floor(state.gold);
    document.getElementById('scoreValue').textContent = Math.floor(state.score).toLocaleString('es');
    document.getElementById('waveValue').textContent = String(state.wave).padStart(2, '0');
    document.getElementById('waveButton').disabled = state.phase === 'wave';
    if (state.phase === 'ready' && !state.pendingWave) document.getElementById('waveButton').innerHTML = 'Iniciar oleada <span>→</span>';
  }

  function setOverlay(title, message) {
    const overlay = document.getElementById('arenaOverlay');
    overlay.querySelector('strong').textContent = title;
    overlay.querySelector('small').textContent = message;
  }
  function renderMessage(message) { document.getElementById('battleMessage').innerHTML = `<span class="message-spark">✦</span> ${message}`; }
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message; toast.classList.add('show');
    window.clearTimeout(toastTimer); toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  }

  document.addEventListener('keydown', event => {
    if (!state || state.phase === 'gameover') return;
    const index = Number(event.key) - 1;
    if (index >= 0 && index < towerOrder.length) selectBuild(towerOrder[index]);
    if (event.code === 'Space') {
      event.preventDefault();
      if (state.phase === 'ready') startWave();
      else if (state.phase === 'wave') document.getElementById('pauseButton').click();
    }
  });
})();
