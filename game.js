(() => {
  'use strict';

  const W = 1672;
  const H = 941;
  const SETTINGS_KEY = 'defensa_portales_settings_v1';
  const defaultSettings = {
    difficulty: 'normal',
    rewards: { skeleton: 5, lilac: 14, blackBalloon: 45, purpleBalloon: 65, bost: 140, aereo: 110, crystalGolem: 180, crystalShard: 30, dragon: 300, necromancer: 650, troll: 15, witch: 450 }
  };
  const difficultyStats = {
    easy: { hp: 0.78, speed: 0.84, cost: 0.9, label: 'Tranquilo' },
    normal: { hp: 1, speed: 1, cost: 1, label: 'Normal' },
    hard: { hp: 1.35, speed: 1.14, cost: 1.15, label: 'Difícil' },
    nightmare: { hp: 1.8, speed: 1.3, cost: 1.3, label: 'Pesadilla' }
  };
  const maps = [
    {
      name: 'Sendero del Guardián', short: 'SENDERO I', subtitle: 'Una ruta amplia junto a las cascadas', art: 'mapa_01.webp',
      sites: [[.26,.14],[.29,.33],[.51,.21],[.57,.41],[.73,.44],[.165,.62],[.34,.63],[.48,.74],[.67,.68],[.81,.69]],
      ground: [[0,.19],[.075,.19],[.14,.20],[.21,.215],[.28,.23],[.35,.245],[.42,.255],[.49,.27],[.55,.28],[.60,.30],[.635,.325],[.655,.36],[.66,.405],[.66,.45],[.65,.49],[.63,.525],[.60,.55],[.56,.575],[.51,.59],[.46,.60],[.41,.595],[.36,.585],[.32,.57],[.285,.555],[.26,.55],[.245,.565],[.24,.59],[.245,.625],[.26,.66],[.285,.695],[.325,.725],[.38,.75],[.45,.77],[.53,.78],[.61,.78],[.69,.77],[.76,.75],[.82,.73],[.87,.70],[.905,.665],[.925,.625],[.935,.59],[.96,.58],[1,.58]],
      air: [[0,.21],[.075,.21],[.12,.215],[.155,.23],[.18,.255],[.19,.29],[.19,.34],[.19,.40],[.19,.47],[.19,.54],[.195,.60],[.205,.65],[.23,.695],[.275,.73],[.34,.755],[.42,.775],[.51,.785],[.60,.785],[.68,.775],[.75,.755],[.81,.73],[.86,.70],[.90,.665],[.925,.625],[.94,.59],[.97,.58],[1,.58]]
    },
    {
      name: 'Curva de las Dos Cascadas', short: 'SENDERO II', subtitle: 'Un paso serpenteante entre piedra y agua', art: 'mapa_02.webp',
      sites: [[.21,.25],[.44,.18],[.70,.21],[.48,.35],[.74,.44],[.26,.53],[.74,.64],[.42,.72],[.51,.87],[.82,.87]],
      ground: [[0,.66],[.075,.66],[.14,.665],[.21,.675],[.26,.68],[.295,.675],[.32,.655],[.34,.625],[.35,.59],[.35,.55],[.34,.515],[.32,.48],[.29,.45],[.25,.43],[.21,.415],[.17,.395],[.135,.37],[.11,.34],[.105,.305],[.11,.27],[.13,.24],[.165,.215],[.21,.20],[.27,.20],[.34,.205],[.41,.225],[.48,.25],[.55,.275],[.62,.29],[.665,.30],[.69,.32],[.705,.35],[.71,.39],[.71,.435],[.70,.475],[.68,.51],[.65,.535],[.675,.55],[.72,.56],[.78,.56],[.835,.55],[.875,.535],[.90,.51],[.915,.48],[.92,.45],[.945,.435],[.975,.425],[1,.42]],
      air: [[0,.68],[.075,.68],[.14,.69],[.20,.705],[.255,.73],[.30,.755],[.35,.775],[.42,.79],[.51,.80],[.60,.80],[.69,.80],[.77,.795],[.82,.785],[.85,.765],[.86,.735],[.86,.69],[.86,.64],[.865,.59],[.875,.54],[.89,.50],[.915,.47],[.945,.45],[.975,.44],[1,.42]]
    },
    {
      name: 'Paso de la Luna', short: 'SENDERO III', subtitle: 'Defiende el portal bajo los riscos', art: 'mapa_03.webp',
      sites: [[.29,.25],[.455,.27],[.80,.15],[.86,.32],[.215,.44],[.45,.57],[.55,.58],[.82,.64],[.33,.75],[.65,.75]],
      ground: [[0,.35],[.075,.35],[.15,.35],[.23,.355],[.29,.36],[.33,.38],[.355,.415],[.37,.455],[.37,.50],[.375,.545],[.385,.585],[.405,.625],[.44,.665],[.485,.695],[.535,.715],[.58,.72],[.615,.71],[.645,.685],[.66,.65],[.67,.605],[.67,.555],[.67,.505],[.665,.455],[.665,.405],[.68,.36],[.705,.32],[.745,.285],[.795,.26],[.855,.245],[.92,.235],[.96,.22],[1,.20]],
      air: [[0,.35],[.08,.345],[.16,.34],[.25,.34],[.34,.345],[.43,.35],[.52,.35],[.60,.345],[.67,.33],[.72,.305],[.77,.275],[.83,.25],[.89,.235],[.95,.22],[1,.20]]
    },
    {
      name: 'Bosque de la Luna', short: 'SENDERO IV', subtitle: 'La senda serpentea entre ruinas nocturnas', art: 'mapa_04.webp', theme: 'BOSQUE NOCTURNO',
      sites: [[.80,.15],[.291,.25],[.455,.299],[.214,.446],[.866,.325],[.446,.569],[.555,.569],[.329,.744],[.65,.744],[.823,.65]],
      ground: [[0,.344],[.10,.344],[.22,.344],[.32,.344],[.355,.35],[.375,.38],[.38,.44],[.39,.52],[.405,.59],[.43,.65],[.48,.69],[.55,.71],[.62,.71],[.68,.70],[.73,.67],[.77,.62],[.79,.56],[.80,.49],[.81,.42],[.83,.35],[.86,.29],[.90,.26],[.96,.245],[1,.235]],
      air: [[0,.344],[.10,.344],[.22,.344],[.32,.344],[.355,.35],[.375,.38],[.38,.44],[.39,.52],[.405,.59],[.43,.65],[.48,.69],[.55,.71],[.62,.71],[.68,.70],[.73,.67],[.77,.62],[.79,.56],[.80,.49],[.81,.42],[.83,.35],[.86,.29],[.90,.26],[.96,.245],[1,.235]]
    },
    {
      name: 'Bosque de las Almas', short: 'SENDERO V', subtitle: 'Una curva larga bajo la luz de la luna', art: 'mapa_05.webp', theme: 'BOSQUE NOCTURNO',
      sites: [[.211,.242],[.439,.19],[.697,.21],[.482,.354],[.736,.443],[.262,.538],[.736,.632],[.424,.727],[.511,.871],[.821,.871]],
      ground: [[0,.655],[.08,.655],[.18,.655],[.25,.655],[.29,.65],[.32,.62],[.33,.58],[.32,.53],[.30,.49],[.27,.46],[.23,.44],[.19,.42],[.16,.39],[.145,.35],[.14,.30],[.15,.26],[.18,.23],[.23,.21],[.30,.21],[.38,.215],[.46,.225],[.55,.235],[.64,.245],[.69,.26],[.715,.30],[.72,.35],[.74,.40],[.79,.44],[.86,.45],[.94,.445],[1,.44]],
      air: [[0,.655],[.08,.655],[.18,.655],[.25,.655],[.29,.65],[.32,.62],[.33,.58],[.32,.53],[.30,.49],[.27,.46],[.23,.44],[.19,.42],[.16,.39],[.145,.35],[.14,.30],[.15,.26],[.18,.23],[.23,.21],[.30,.21],[.38,.215],[.46,.225],[.55,.235],[.64,.245],[.69,.26],[.715,.30],[.72,.35],[.74,.40],[.79,.44],[.86,.45],[.94,.445],[1,.44]]
    },
    {
      name: 'Sendero de los Espíritus', short: 'SENDERO VI', subtitle: 'Dos caminos se reúnen ante el portal', art: 'mapa_06.webp', theme: 'BOSQUE NOCTURNO',
      sites: [[.262,.143],[.508,.208],[.286,.342],[.482,.357],[.564,.41],[.728,.445],[.165,.621],[.344,.64],[.482,.731],[.667,.67],[.80,.676]],
      ground: [[0,.63],[.10,.63],[.20,.63],[.29,.64],[.36,.67],[.42,.71],[.50,.74],[.59,.75],[.67,.75],[.73,.73],[.77,.69],[.78,.64],[.78,.59],[.80,.55],[.87,.54],[.94,.54],[1,.54]],
      air: [[0,.20],[.10,.20],[.22,.20],[.34,.20],[.45,.21],[.55,.24],[.64,.28],[.70,.33],[.73,.39],[.74,.45],[.77,.50],[.81,.53],[.88,.54],[.95,.54],[1,.54]]
    },
    {
      name: 'Valle de Lava', short: 'SENDERO VII', subtitle: 'Defiende el paso entre brasas y ceniza', art: 'mapa_07.webp', theme: 'REINO VOLCÁNICO',
      sites: [[.262,.143],[.508,.208],[.728,.417],[.165,.621],[.344,.64],[.564,.41],[.667,.67],[.482,.731],[.80,.676],[.842,.655]],
      ground: [[0,.62],[.08,.62],[.16,.62],[.23,.63],[.29,.66],[.34,.70],[.42,.73],[.50,.74],[.59,.74],[.66,.72],[.71,.69],[.74,.65],[.75,.60],[.76,.56],[.81,.54],[.90,.54],[1,.54]],
      air: [[0,.18],[.10,.18],[.20,.18],[.31,.18],[.42,.19],[.53,.21],[.62,.24],[.68,.29],[.70,.35],[.71,.41],[.72,.47],[.76,.52],[.83,.54],[.91,.54],[1,.54]]
    },
    {
      name: 'Caldera Carmesí', short: 'SENDERO VIII', subtitle: 'Una ruta ardiente entre dos portales', art: 'mapa_08.webp', theme: 'REINO VOLCÁNICO',
      sites: [[.211,.242],[.697,.20],[.482,.354],[.736,.443],[.262,.538],[.736,.635],[.424,.727],[.511,.871],[.821,.871],[.80,.65]],
      ground: [[0,.63],[.08,.63],[.17,.63],[.25,.65],[.32,.68],[.38,.72],[.46,.76],[.55,.78],[.64,.78],[.72,.77],[.78,.74],[.82,.70],[.84,.65],[.86,.60],[.89,.55],[.94,.52],[1,.52]],
      air: [[0,.20],[.10,.20],[.21,.20],[.32,.20],[.42,.21],[.53,.22],[.63,.23],[.70,.26],[.73,.32],[.74,.38],[.77,.44],[.82,.48],[.89,.50],[.95,.50],[1,.50]]
    }
  ];

  const towers = {
    archer: { name: 'Arqueros', label: 'Torre de arqueros', count: 13, cost: 130, damage: 2, rate: .48, range: 174, kind: 'arrow', color: '#ecd49c', target: 'Tierra y aire', desc: 'Flechas medievales · disparo rápido' },
    fire: { name: 'Láser de fuego', label: 'Torre de fuego', count: 6, cost: 200, damage: 6, rate: .42, range: 238, kind: 'laser', color: '#ff8c52', target: 'Tierra y aire', desc: 'Rayo ígneo · alcance amplio' },
    electric: { name: 'Láser eléctrico', label: 'Torre eléctrica', count: 16, cost: 185, damage: 4, rate: .3, range: 220, kind: 'chain', color: '#8de8e9', target: 'Tierra y aire', desc: 'Descarga en cadena · varios blancos' },
    mortar: { name: 'Mortero', label: 'Mortero', count: 14, cost: 255, damage: 10, rate: 2.1, range: 405, kind: 'mortar', color: '#ffc15b', target: 'Solo tierra', desc: 'Bala explosiva · alcance enorme' },
    fireworks: { name: 'Fuegos artificiales', label: 'Torre de fuegos artificiales', count: 12, cost: 300, currency: 'score', damage: 80, rate: 1.35, range: 320, kind: 'firework', color: '#ff9f54', target: 'Solo aire', desc: 'Cohetes antiaéreos · 80 de daño' },
    cannon: { name: 'Cañón', label: 'Cañón', count: 21, cost: 200, currency: 'score', damage: 50, rate: 1.8, range: 270, kind: 'cannon', color: '#ffc15b', target: 'Solo tierra', desc: 'Tres disparos simultáneos · 50 de daño' },
    judgement: { name: 'Torre del Juicio', label: 'Torre del Juicio', count: 1, cost: 1000, currency: 'score', damage: 100, rate: 1.4, range: 460, kind: 'judgement', color: '#ffcc58', target: 'Tierra y aire', desc: 'Meteoro de área · 100 de daño' }
  };
  const towerOrder = ['archer', 'fire', 'electric', 'mortar', 'fireworks', 'cannon', 'judgement'];
  const enemyCounterInfo = {
    skeleton: { label: 'Huesos', image: 'enemigo_esqueleto_hd.png' },
    lilac: { label: 'Sombra lila', image: 'enemigo_esqueleto_lila_hd.png' },
    blackBalloon: { label: 'Globo negro', image: 'enemigo_globo_negro_hd.png' },
    purpleBalloon: { label: 'Globo lila', image: 'enemigo_globo_lila_hd.png' },
    bost: { label: 'Rey duende', image: 'enemigo_bost_hd.png' },
    aereo: { label: 'Barco aéreo', image: 'enemigo_aereo_hd.png' },
    crystalGolem: { label: 'Gólem cristal', image: 'enemigo_golem_cristal_hd.png' },
    crystalShard: { label: 'Fragmentos', image: 'enemigo_fragmento_cristal_hd.png' },
    dragon: { label: 'Dragón', image: 'enemigo_dragon_hd.png' },
    necromancer: { label: 'Nigromante', image: 'enemigo_nigromante_hd.png' },
    troll: { label: 'Trol cristalino', image: 'enemigo_trol_cristales_hd.png' },
    witch: { label: 'Bruja', image: 'enemigo_hechicera_hd.png' }
  };
  const towerIconPrefix = { archer: 'torre_arqueros', fire: 'torre_fuego', electric: 'torre_electrica', mortar: 'torre_mortero', fireworks: 'torre_fuegos', cannon: 'torre_canon', judgement: 'torre_suprema' };
  const towerIcons = {};
  for (const key of towerOrder) {
    towerIcons[key] = new Image();
    towerIcons[key].src = `${towerIconPrefix[key]}_hd.png`;
  }
  const enemySprites = {};
  for (const [key, file] of Object.entries({
    skeleton: 'enemigo_esqueleto_hd.png', lilac: 'enemigo_esqueleto_lila_hd.png',
    blackBalloon: 'enemigo_globo_negro_hd.png', purpleBalloon: 'enemigo_globo_lila_hd.png',
    aereo: 'enemigo_aereo_hd.png', bost: 'enemigo_bost_hd.png',
    crystalGolem: 'enemigo_golem_cristal_hd.png', crystalShard: 'enemigo_fragmento_cristal_hd.png',
    dragon: 'enemigo_dragon_hd.png', necromancer: 'enemigo_nigromante_hd.png',
    troll: 'enemigo_trol_cristales_hd.png', witch: 'enemigo_hechicera_hd.png'
  })) {
    enemySprites[key] = new Image();
    enemySprites[key].src = file;
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
    card.innerHTML = `<img class="map-thumb" src="${map.art}" alt="${map.name}"><span class="map-chip">${String(index + 1).padStart(2, '0')} · ${map.theme || 'BOSQUE'}</span><span class="map-meta"><span><b>${map.name}</b><small>${map.subtitle}</small></span><span class="map-arrow">↗</span></span>`;
    card.addEventListener('click', () => {
      chosenMap = index;
      [...mapGrid.children].forEach((el, i) => el.classList.toggle('selected', i === index));
      document.querySelector('.map-count').textContent = `${String(index + 1).padStart(2, '0')} — ${String(maps.length).padStart(2, '0')}`;
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
      clock: 0, waveClock: 0, pendingWave: false, gameTime: 0, waveRemaining: null
    };
    document.getElementById('battleMapTitle').textContent = map.name;
    document.getElementById('mapBadgeName').textContent = map.short;
    document.getElementById('pauseButton').textContent = 'Ⅱ';
    document.getElementById('speedButton').textContent = '1×';
    document.getElementById('arenaOverlay').classList.remove('dismissed');
    setOverlay('El sendero está en calma', 'Coloca tus torres y prepara la primera oleada.');
    renderMessage('Elige un puesto y construye tu primera torre.');
    renderWaveEnemyCounts();
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
    state.waveRemaining = {};
    state.spawnQueue.forEach(item => { state.waveRemaining[item.type] = (state.waveRemaining[item.type] || 0) + 1; });
    renderWaveEnemyCounts();
    document.getElementById('pauseButton').textContent = 'Ⅱ';
    document.getElementById('arenaOverlay').classList.add('dismissed');
    document.getElementById('waveButton').innerHTML = 'Oleada en curso <span>···</span>';
    renderMessage(`Oleada ${state.wave}: las huellas se acercan al portal.`);
    updateStats();
  }

  function makeWave(wave) {
    const count = 7 + Math.min(35, Math.floor(wave * 1.25));
    const queue = [];
    const lilacEvery = wave < 12 ? 4 : wave < 30 ? 3 : 2;
    for (let i = 0; i < count; i++) {
      const type = wave >= 2 && i % lilacEvery === lilacEvery - 1 ? 'lilac' : 'skeleton';
      queue.push({ at: i * Math.max(.38, .82 - wave * .012), type });
    }
    if (wave >= 5 && wave % 5 === 0) {
      const type = wave % 10 === 5 ? 'blackBalloon' : 'purpleBalloon';
      queue.push({ at: count * Math.max(.38, .82 - wave * .012) + .5, type });
    }
    const bossAt = count * Math.max(.38, .82 - wave * .012) + 1.1;
    if (wave === 10) queue.push({ at: bossAt, type: 'crystalGolem' });
    if (wave === 20) queue.push({ at: bossAt, type: 'bost' });
    if (wave === 30) queue.push({ at: bossAt, type: 'aereo' });
    if (wave === 40) queue.push({ at: bossAt, type: 'dragon' });
    if (wave === 50) queue.push({ at: bossAt, type: 'necromancer' });
    if ([5, 15, 25, 45, 55, 65, 75, 85, 95].includes(wave)) queue.push({ at: bossAt + .35, type: 'troll' });
    if (wave >= 60 && wave <= 100) {
      ['crystalGolem', 'bost', 'aereo', 'dragon', 'necromancer'].forEach((type, index) => queue.push({ at: bossAt + index * .28, type }));
    }
    if (wave === 100) queue.push({ at: bossAt + 1.12, type: 'witch' });
    return queue.sort((a, b) => a.at - b.at);
  }

  function spawnEnemy(type, drop = false, progress = 0, routeOverride = null) {
    if (!state) return;
    const balloon = type === 'blackBalloon' || type === 'purpleBalloon';
    const air = balloon || type === 'aereo' || type === 'dragon';
    const baseHP = type === 'skeleton' ? 50 : type === 'lilac' ? 100 : type === 'crystalShard' ? 180 : type === 'blackBalloon' ? 200 : type === 'purpleBalloon' ? 300 : type === 'bost' ? 1500 : type === 'aereo' ? 1900 : type === 'crystalGolem' ? 900 : type === 'dragon' ? 2800 : type === 'necromancer' ? (state.wave >= 100 ? 10000 : 4800) : type === 'witch' ? 7500 : type === 'troll' ? 500 : 50;
    const difficulty = difficultyStats[settings.difficulty] || difficultyStats.normal;
    const wavesPassed = Math.max(0, state.wave - 1);
    const waveScale = 1 + wavesPassed * .06 + wavesPassed * wavesPassed * .00035;
    const bossWaveScale = 1 + Math.max(0, Math.min(40, state.wave - 60)) * .0125;
    const route = routeOverride || getRoute(air);
    const fixedSpecialHP = ['bost', 'aereo', 'crystalGolem', 'crystalShard', 'dragon', 'necromancer', 'witch', 'troll'].includes(type);
    const hp = Math.round(baseHP * difficulty.hp * (fixedSpecialHP ? bossWaveScale : waveScale));
    const baseSpeed = type === 'bost' ? 42 : type === 'crystalGolem' ? 32 : type === 'crystalShard' ? 39 : type === 'dragon' ? 34 : type === 'aereo' ? 38 : type === 'necromancer' ? 24 : type === 'witch' ? 23 : type === 'troll' ? 31 : balloon ? 36 : type === 'lilac' ? 36 : drop ? 47 : 42;
    state.enemies.push({
      id: Math.random().toString(36).slice(2), type, balloon, air, drop,
      enemyClass: type === 'witch' ? 'semi-bost' : ['crystalGolem', 'bost', 'aereo', 'dragon', 'necromancer'].includes(type) ? 'bost' : 'normal',
      hp, maxHp: hp,
      progress: Math.max(0, progress), routeLength: route.total, route,
      speed: baseSpeed * difficulty.speed * (fixedSpecialHP ? 1 : 1 + Math.max(0, state.wave - 1) * .012),
      age: 0, dropClock: balloon || type === 'aereo' ? 1.8 : 0, dropped: 0, dropType: type === 'aereo' ? 'lilac' : 'skeleton',
      summonClock: 2.8, trailClock: 0, burnTime: 0, burnDps: 0, hitsReceived: 0, stunTime: 0, airAttackCooldown: type === 'aereo' ? 2.2 : 1.3,
      dead: false
    });
  }

  function renderWaveEnemyCounts() {
    const container = document.getElementById('waveEnemyCounts');
    if (!container) return;
    if (!state || state.phase !== 'wave' || !state.waveRemaining) {
      container.classList.add('hidden');
      container.innerHTML = '';
      return;
    }
    const entries = Object.entries(state.waveRemaining);
    container.classList.toggle('hidden', entries.length === 0);
    container.innerHTML = entries.map(([type, remaining]) => {
      const info = enemyCounterInfo[type] || { label: type, image: '', mark: '✦' };
      const icon = info.image ? `<img src="${info.image}" alt="">` : `<span class="enemy-count-mark">${info.mark || '✦'}</span>`;
      return `<div class="enemy-count-card"><span class="enemy-count-icon">${icon}</span><span class="enemy-count-name">${info.label}</span><strong>${remaining}</strong><small>restan</small></div>`;
    }).join('');
  }

  function changeWaveEnemyCount(type, amount) {
    if (!state || !state.waveRemaining) return;
    state.waveRemaining[type] = Math.max(0, (state.waveRemaining[type] || 0) + amount);
    renderWaveEnemyCounts();
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
      if (enemy.stunTime > 0) enemy.stunTime = Math.max(0, enemy.stunTime - dt);
      if (enemy.stunTime <= 0 && ['crystalGolem', 'bost', 'aereo', 'dragon', 'necromancer', 'witch'].includes(enemy.type)) {
        enemy.trailClock -= dt;
        if (enemy.trailClock <= 0) {
          enemy.trailClock = .105;
          const trailColors = enemy.type === 'crystalGolem' ? ['#dc78ff', '#9d5cff', '#6b48c8']
            : enemy.type === 'bost' ? ['#5ce4b1', '#73ad7e', '#77d6ce']
              : enemy.type === 'aereo' ? ['#9dc4d7', '#d4c39a', '#718caa']
              : enemy.type === 'dragon' ? ['#ff674d', '#b34cff', '#e5358b']
                : enemy.type === 'witch' ? ['#ff78dc', '#d06cff', '#8b55dc']
                  : ['#5dff9a', '#71dfa6', '#be68ff'];
          const trailPos = enemyPosition(enemy);
          addParticle({ x: trailPos.x + (Math.random() - .5) * 25, y: trailPos.y - (enemy.air ? 45 : 4) + (Math.random() - .5) * 20 }, trailColors[Math.floor(Math.random() * trailColors.length)], 2, 1.8);
        }
      }
      if (enemy.burnTime > 0) {
        enemy.burnTime -= dt;
        enemy.hp -= enemy.burnDps * dt;
        if (Math.random() < dt * 9) addParticle(enemyPosition(enemy), '#ff8a45', 2, 2.5);
      }
      if ((enemy.balloon || enemy.type === 'aereo') && enemy.dropped < 4) {
        enemy.dropClock -= dt;
        if (enemy.dropClock <= 0) {
          enemy.dropped++;
          enemy.dropClock = 2.25;
          // After landing, the minion is a ground unit: project the drop onto the sand road.
          const dropPoint = enemyPosition(enemy);
          const landingRoute = getRoute(false);
          const landingProgress = nearestRouteProgress(landingRoute, dropPoint);
          const landingPosition = routePosition(landingRoute, landingProgress);
          spawnEnemy(enemy.dropType, true, landingProgress, landingRoute);
          changeWaveEnemyCount(enemy.dropType, 1);
          addParticle({ x: landingPosition.x + (Math.random() - .5) * 9, y: landingPosition.y + 8 }, enemy.dropType === 'lilac' ? '#b98aff' : '#d7cfb6', 5, 5);
          renderMessage(enemy.type === 'aereo' ? 'El Aéreo soltó esqueletos de casco lila sobre el sendero.' : 'Un globo dejó caer un pequeño esqueleto en el sendero.');
        }
      }
      if (enemy.type === 'necromancer') {
        enemy.summonClock -= dt;
        const minions = state.enemies.filter(other => !other.dead && other.summonedBy === enemy.id).length;
        if (enemy.summonClock <= 0 && minions < 5) {
          const progress = Math.max(0, enemy.progress - 18);
          spawnEnemy('lilac', false, progress, enemy.route);
          const minion = state.enemies[state.enemies.length - 1];
          minion.summonedBy = enemy.id;
          changeWaveEnemyCount('lilac', 1);
          const summonPos = enemyPosition(minion);
          addParticle(summonPos, '#8d62ff', 24, 8);
          addParticle(summonPos, '#62eea2', 18, 6);
          renderMessage('El Nigromante invocó esqueletos de ojos lilas.');
          enemy.summonClock = 3.2;
        } else if (enemy.summonClock <= 0) enemy.summonClock = .8;
      }
      if (enemy.type === 'aereo') attackNearestTower(enemy, dt, 1);
      if (enemy.type === 'dragon') attackNearestTower(enemy, dt, 5);
      if (enemy.stunTime <= 0) enemy.progress += enemy.speed * dt;
      if (enemy.progress >= enemy.routeLength) {
        enemy.dead = true;
        changeWaveEnemyCount(enemy.type, -1);
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
      const targets = state.enemies.filter(enemy => !enemy.dead
        && !(['mortar', 'cannon'].includes(tower.type) && enemy.air)
        && !(tower.type === 'fireworks' && !enemy.air))
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
      renderWaveEnemyCounts();
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

  function attackNearestTower(enemy, dt, shotsToDestroy) {
    enemy.airAttackCooldown -= dt;
    if (enemy.airAttackCooldown > 0) return;
    const from = enemyPosition(enemy);
    const target = state.towers.filter(Boolean)
      .map(tower => ({ tower, pos: sitePosition(tower.site) }))
      .filter(item => distance(from, item.pos) <= 300)
      .sort((a, b) => distance(from, a.pos) - distance(from, b.pos))[0];
    if (!target) { enemy.airAttackCooldown = .7; return; }
    enemy.airAttackCooldown = enemy.type === 'dragon' ? 2.0 : 3.2;
    const sourceY = from.y - (enemy.type === 'dragon' ? 73 : 58);
    state.projectiles.push({
      type: enemy.type === 'dragon' ? 'dragonFire' : 'airBomb',
      x: from.x, y: sourceY, startX: from.x, startY: sourceY,
      targetX: target.pos.x, targetY: target.pos.y - 8,
      progress: 0, duration: .42, towerId: target.tower.id, shotsToDestroy,
      burning: enemy.type === 'dragon', size: enemy.type === 'dragon' ? 12 : 10,
      color: enemy.type === 'dragon' ? '#ff7044' : '#252a2b'
    });
    addParticle({ x: from.x, y: sourceY }, enemy.type === 'dragon' ? '#ff9d55' : '#b7d5df', 4, 3);
  }

  function towerStats(type, level) {
    const data = towers[type];
    const damage = Math.max(data.damage, Math.round(data.damage * (1 + (level - 1) * .12)));
    let targets = 1;
    let range = data.range + Math.floor((level - 1) * (type === 'mortar' ? 5 : type === 'judgement' ? 4 : 2));
    let rate = data.rate * Math.max(.68, 1 - (level - 1) * .018);
    if (type === 'electric') targets = level < 5 ? 2 : level < 10 ? 3 : level < 15 ? 4 : 5;
    if (type === 'cannon') targets = 3;
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
    if (tower.type === 'fireworks' || tower.type === 'cannon') {
      const kind = tower.type === 'fireworks' ? 'firework' : 'cannonball';
      selected.forEach((target, index) => state.projectiles.push({
        type: kind, x: center.x, y: center.y - 24, startX: center.x, startY: center.y - 24,
        targetX: target.pos.x, targetY: target.pos.y, targetId: target.enemy.id,
        progress: 0, duration: tower.type === 'cannon' ? .72 + index * .04 : .38,
        damage: stats.damage, size: tower.type === 'cannon' ? 11 : 8, color: tower.type === 'cannon' ? '#4a3424' : '#ff9f54'
      }));
      return;
    }
    if (tower.type === 'judgement') {
      const target = selected[0];
      state.projectiles.push({ type: 'judgementMeteor', x: center.x, y: center.y - 28, startX: center.x, startY: center.y - 28, targetX: target.pos.x, targetY: target.pos.y, targetId: target.enemy.id, progress: 0, duration: .82, damage: stats.damage, splash: 132, size: 56, color: '#ff7a32' });
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
      const arc = projectile.type === 'judgementMeteor' ? 190 : projectile.type === 'mortar' ? 95 : projectile.type === 'cannonball' ? 64 : 0;
      projectile.y = projectile.startY + (projectile.targetY - projectile.startY) * t - Math.sin(t * Math.PI) * arc;
      if (projectile.type === 'judgementMeteor' && t < 1) {
        projectile.trailClock = (projectile.trailClock || 0) - dt;
        if (projectile.trailClock <= 0) {
          projectile.trailClock = .035;
          addParticle({ x: projectile.x + (Math.random() - .5) * 14, y: projectile.y + 16 + Math.random() * 18 }, Math.random() < .55 ? '#ffb83d' : '#f35a34', 3, 3.5);
        }
      }
      if (t >= 1 && !projectile.done) {
        projectile.done = true;
        if (projectile.type === 'airBomb' || projectile.type === 'dragonFire') {
          const tower = state.towers.find(item => item && item.id === projectile.towerId);
          if (tower) {
            if (projectile.type === 'dragonFire') tower.dragonHits = (tower.dragonHits || 0) + 1;
            const center = sitePosition(tower.site);
            const colors = projectile.type === 'dragonFire' ? ['#ff633d','#ffc04c','#492423'] : ['#353b3b','#96a8a0','#d8bb78'];
            state.effects.push({ type: 'fireblast', x: center.x, y: center.y - 12, time: .45, max: .45, color: projectile.color });
            addParticle(center, projectile.color, 12, 5);
            if (projectile.type === 'airBomb' || tower.dragonHits >= 5) {
              const site = tower.site;
              state.towers[site] = null;
              if (state.selectedSite === site) state.selectedSite = null;
              for (let i = 0; i < 16; i++) addParticle({ x: center.x + (Math.random() - .5) * 24, y: center.y + (Math.random() - .5) * 24 }, colors[i % colors.length], 5, 5);
              renderPanel();
              renderMessage(projectile.type === 'dragonFire' ? 'El dragón destruyó una torre tras cinco llamas.' : 'El disparo del Aéreo destruyó una torre de un impacto.');
            }
          }
        } else if (projectile.type === 'judgementMeteor') {
          const impact = { x: projectile.targetX, y: projectile.targetY };
          state.effects.push({ type: 'meteorimpact', x: impact.x, y: impact.y, time: .72, max: .72, radius: projectile.splash, color: projectile.color });
          for (const enemy of state.enemies) {
            if (enemy.dead) continue;
            const targetPos = enemyPosition(enemy);
            const gap = distance(targetPos, impact);
            if (gap <= projectile.splash) {
              const falloff = gap <= 52 ? 1 : .45 + .55 * (projectile.splash - gap) / (projectile.splash - 52);
              applyDamage(enemy, Math.max(1, Math.round(projectile.damage * falloff)));
            }
          }
          const pixelColors = ['#fff5ad', '#ffd35b', '#ff8c35', '#f34e32', '#b74fff'];
          for (const color of pixelColors) addParticle(impact, color, 30, 14);
          for (let i = 0; i < 28; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 12 + Math.random() * 60;
            addParticle({ x: impact.x + Math.cos(angle) * radius, y: impact.y + Math.sin(angle) * radius * .65 }, pixelColors[i % pixelColors.length], 1, 5);
          }
        } else if (projectile.type === 'arrow' || projectile.type === 'firework' || projectile.type === 'cannonball') {
          const target = state.enemies.find(enemy => enemy.id === projectile.targetId && !enemy.dead);
          if (target) {
            applyDamage(target, projectile.damage);
            const pos = enemyPosition(target);
            if (projectile.type === 'firework') {
              state.effects.push({ type: 'fireblast', x: pos.x, y: pos.y - 20, time: .36, max: .36, color: '#ff9f54' });
              addParticle(pos, '#ffe079', 7, 3);
            } else addParticle(pos, projectile.type === 'cannonball' ? '#d3b27a' : '#e8d29c', 4, 2.5);
          }
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
    if (enemy.type === 'troll') addOrbBurst(enemyPosition(enemy));
    if (enemy.type === 'bost') {
      enemy.hitsReceived++;
      if (enemy.hitsReceived >= 10) {
        enemy.hitsReceived = 0;
        enemy.stunTime = 1.25;
        addParticle(enemyPosition(enemy), '#a9ff8a', 14, 4);
        renderMessage('Bost quedó aturdido por el décimo impacto.');
      }
    }
    enemy.hp -= amount;
    if (enemy.type === 'witch' && enemy.hp > 0) {
      const minions = state.enemies.filter(other => !other.dead && other.summonedBy === enemy.id).length;
      if (minions < 6) {
        const progress = Math.max(0, enemy.progress - 18);
        spawnEnemy('skeleton', false, progress, enemy.route);
        const minion = state.enemies[state.enemies.length - 1];
        minion.summonedBy = enemy.id;
        changeWaveEnemyCount('skeleton', 1);
        const summonPos = enemyPosition(minion);
        addParticle(summonPos, '#bc72ff', 14, 7);
        addParticle(summonPos, '#f180dc', 10, 5);
        renderMessage('La Bruja invocó un esqueleto al recibir daño.');
      }
    }
    if (enemy.hp <= 0) killEnemy(enemy);
  }

  function killEnemy(enemy) {
    if (enemy.dead) return;
    enemy.dead = true;
    changeWaveEnemyCount(enemy.type, -1);
    const rewardKey = enemy.type;
    const points = Number(settings.rewards[rewardKey] ?? 0);
    state.score += points;
    const coins = enemy.type === 'necromancer' ? 180 : enemy.type === 'witch' ? 155 : enemy.type === 'dragon' ? 120 : enemy.type === 'crystalGolem' ? 60 : enemy.type === 'bost' ? 90 : enemy.type === 'aereo' ? 75 : enemy.type === 'troll' ? 12 : enemy.type === 'crystalShard' ? 16 : enemy.balloon ? (enemy.type === 'blackBalloon' ? 36 : 52) : enemy.type === 'lilac' ? 13 : 8;
    state.gold += coins;
    const pos = enemyPosition(enemy);
    const colors = enemy.type === 'crystalGolem' || enemy.type === 'crystalShard' ? ['#c28cff','#9a70ef','#4e3d76','#32283e'] : enemy.type === 'troll' ? ['#9f82ff','#6caeff','#ef76ed','#342848'] : enemy.type === 'witch' ? ['#ee78dc','#b876ff','#55367b','#241d37'] : enemy.type === 'bost' ? ['#8aff90','#63beb2','#263e42','#172d31'] : enemy.type === 'dragon' ? ['#ff7147','#bd5b94','#6048ad','#322858'] : enemy.type === 'necromancer' ? ['#68f0a2','#a657ff','#6235b6','#251f46'] : enemy.type === 'lilac' || enemy.type === 'purpleBalloon' ? ['#b286ee','#2b2535','#6f47a1','#151922'] : enemy.balloon ? ['#393833','#806c4c','#171c1c'] : ['#111616','#282c2a','#443f35'];
    for (let i = 0; i < (enemy.balloon ? 18 : enemy.drop ? 9 : 13); i++) addParticle(pos, colors[i % colors.length], enemy.balloon ? 4 : 3, enemy.balloon ? 4.5 : 3.7);
    if (enemy.type === 'crystalGolem') {
      for (let i = 0; i < 3; i++) {
        spawnEnemy('crystalShard', true, Math.min(enemy.progress + i * 18, enemy.routeLength - 1), enemy.route);
        state.enemies[state.enemies.length - 1].shardIndex = i;
        changeWaveEnemyCount('crystalShard', 1);
      }
      renderMessage('¡El gólem se dividió en tres fragmentos de cristal!');
    } else {
      const defeatedName = enemy.type === 'bost' ? 'Rey duende de roca' : enemy.type === 'aereo' ? 'Barco aéreo' : enemy.type === 'dragon' ? 'Dragón' : enemy.type === 'necromancer' ? 'Nigromante' : enemy.type === 'witch' ? 'Bruja' : enemy.type === 'troll' ? 'Trol cristalino' : enemy.type === 'crystalShard' ? 'Fragmento de cristal' : enemy.balloon ? 'Globo derribado' : enemy.drop && enemy.type !== 'lilac' ? 'Esqueleto pequeño' : enemy.type === 'lilac' ? 'Esqueleto de ojos lilas' : 'Esqueleto derrotado';
      renderMessage(`${defeatedName} · +${points} puntos`);
    }
  }

  function finishGame() {
    state.phase = 'gameover';
    state.paused = false;
    state.spawnQueue = [];
    state.enemies = [];
    renderWaveEnemyCounts();
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

  function addOrbBurst(pos) {
    if (!state) return;
    const colors = ['#ff78dc', '#ef5fc8', '#ffd1f3'];
    for (let i = 0; i < 7; i++) {
      state.particles.push({
        x: pos.x + (Math.random() - .5) * 30, y: pos.y - 25 + (Math.random() - .5) * 35,
        vx: (Math.random() - .5) * 95, vy: -28 - Math.random() * 85, gravity: 35,
        size: 4 + Math.random() * 3, color: colors[i % colors.length], life: .42 + Math.random() * .25, max: .67, shape: 'orb'
      });
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
    ctx.imageSmoothingEnabled = true;
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
    const sprite = towerIcons[tower.type];
    ctx.save();
    ctx.fillStyle = '#09120c65'; ctx.beginPath(); ctx.ellipse(center.x, center.y + 21, 31, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#485238'; ctx.strokeStyle = selected ? '#ffe392' : '#dbb45b'; ctx.lineWidth = selected ? 3 : 2;
    roundRect(ctx, center.x - 25, center.y - 24, 50, 48, 8, true, true);
    ctx.fillStyle = '#d6b65f'; ctx.fillRect(center.x - 5, center.y + 18, 10, 5);
    if (tower.type === 'cannon') {
      drawFieldCannon(center, tower, selected);
    } else if (sprite && sprite.complete && sprite.naturalWidth) {
      ctx.imageSmoothingEnabled = true;
      const size = tower.type === 'judgement' ? 76 : 70;
      ctx.drawImage(sprite, center.x - size / 2, center.y - 48, size, size);
      if (tower.level >= 4) {
        ctx.globalAlpha = Math.min(.3, .08 + tower.level * .012);
        ctx.fillStyle = '#ffe49a'; ctx.beginPath(); ctx.arc(center.x, center.y - 11, 25 + Math.min(8, tower.level), 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
      }
    } else {
      drawTowerFallback(center, tower.type, tower.level);
    }
    if (tower.dragonHits > 0) {
      for (let i = 0; i < Math.min(5, tower.dragonHits); i++) {
        ctx.fillStyle = '#ff7048'; ctx.beginPath(); ctx.arc(center.x - 12 + i * 6, center.y + 27, 2.2, 0, Math.PI * 2); ctx.fill();
      }
    }
    if (selected) {
      ctx.fillStyle = '#14231d'; ctx.strokeStyle = '#ffdf86'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(center.x + 22, center.y - 24, 11, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fff0bb'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(tower.level), center.x + 22, center.y - 24);
    }
    ctx.restore();
  }

  function drawFieldCannon(center, tower, selected) {
    ctx.save();
    ctx.translate(center.x, center.y - 4);
    ctx.fillStyle = '#09120c72';
    ctx.beginPath(); ctx.ellipse(0, 15, 31, 13, 0, 0, Math.PI * 2); ctx.fill();

    for (const side of [-1, 1]) {
      const x = side * 13;
      ctx.fillStyle = '#202322'; ctx.strokeStyle = '#aeb3a4'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(x, 9, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = '#80502d'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, 9, 5, 0, Math.PI * 2); ctx.stroke();
      for (let spoke = 0; spoke < 4; spoke++) {
        const angle = spoke * Math.PI / 2 + .25;
        ctx.beginPath(); ctx.moveTo(x, 9); ctx.lineTo(x + Math.cos(angle) * 4.5, 9 + Math.sin(angle) * 4.5); ctx.stroke();
      }
    }
    const wood = ctx.createLinearGradient(-17, -2, 16, 11);
    wood.addColorStop(0, '#a76b35'); wood.addColorStop(.45, '#5e3824'); wood.addColorStop(1, '#312721');
    ctx.fillStyle = wood; ctx.strokeStyle = '#d6a354'; ctx.lineWidth = 1.6;
    roundRect(ctx, -19, -3, 38, 15, 5, true, true);
    ctx.strokeStyle = '#d3ad69'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(-12, 1); ctx.lineTo(12, 1); ctx.moveTo(-12, 6); ctx.lineTo(12, 6); ctx.stroke();
    ctx.fillStyle = '#e4c477'; ctx.beginPath(); ctx.arc(0, -5, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#59412d'; ctx.beginPath(); ctx.arc(0, -5, 4, 0, Math.PI * 2); ctx.fill();

    ctx.save();
    ctx.translate(0, -7);
    ctx.rotate(Number.isFinite(tower.aim) ? tower.aim : -Math.PI / 2);
    const barrel = ctx.createLinearGradient(0, -10, 0, 9);
    barrel.addColorStop(0, '#bfc6c1'); barrel.addColorStop(.2, '#414847'); barrel.addColorStop(.58, '#202827'); barrel.addColorStop(1, '#101716');
    ctx.shadowColor = selected ? '#ffe07b' : '#000000'; ctx.shadowBlur = selected ? 12 : 4;
    ctx.fillStyle = barrel; ctx.strokeStyle = '#d8b55b'; ctx.lineWidth = 1.8;
    roundRect(ctx, -1, -8, 35, 16, 6, true, true);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#c7983e'; roundRect(ctx, 1, -10, 5, 20, 2, true, false);
    ctx.fillStyle = '#e7c873'; roundRect(ctx, 26, -11, 6, 22, 2, true, false);
    ctx.fillStyle = '#111817'; ctx.strokeStyle = '#a8a99b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(34, 0, 3.4, 8.8, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();

    if (tower.level >= 6) {
      ctx.fillStyle = '#f2cb67';
      for (let i = 0; i < Math.min(3, Math.floor(tower.level / 6)); i++) {
        ctx.beginPath(); ctx.arc(-13 + i * 9, -3, 1.5, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawTowerFallback(center, type, level) {
    const color = towers[type].color;
    const gradient = ctx.createLinearGradient(center.x - 18, center.y - 30, center.x + 18, center.y + 22);
    gradient.addColorStop(0, '#f4e5be'); gradient.addColorStop(.35, color); gradient.addColorStop(1, '#29302d');
    ctx.fillStyle = gradient; ctx.strokeStyle = '#f3d27a'; ctx.lineWidth = 2;
    roundRect(ctx, center.x - 15, center.y - 31, 30, 43, 9, true, true);
    ctx.fillStyle = '#fff0ad'; ctx.beginPath(); ctx.arc(center.x, center.y - 17, 6 + Math.min(3, level / 4), 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d6b65f'; roundRect(ctx, center.x - 20, center.y + 9, 40, 12, 5, true, true);
  }

  function drawEnemy(enemy) {
    const p = enemyPosition(enemy);
    if (enemy.type === 'crystalShard') p.x += (enemy.shardIndex - 1) * 19;
    const flying = enemy.air;
    const bob = Math.sin(enemy.age * (flying ? 3 : 7)) * (flying ? 5 : 2.5);
    const sizes = {
      skeleton: [56, 68], lilac: [61, 74], blackBalloon: [75, 102], purpleBalloon: [75, 102],
      aereo: [106, 105], bost: [94, 98], crystalGolem: [84, 90], crystalShard: [42, 48], dragon: [128, 105], necromancer: [112, 132], troll: [122, 132], witch: [106, 132]
    };
    const sprite = enemySprites[enemy.type] || enemySprites.skeleton;
    let [width, height] = sizes[enemy.type] || [50, 60];
    if (enemy.type === 'necromancer' && state.wave >= 100) { width *= 1.38; height *= 1.38; }
    if (enemy.drop) { width *= .78; height *= .78; }
    const anchorY = enemy.type === 'dragon' ? p.y - 67 + bob : enemy.type === 'aereo' ? p.y - 34 + bob : enemy.balloon ? p.y - 17 + bob : p.y + bob;
    if (sprite && sprite.complete && sprite.naturalWidth) {
      ctx.save();
      ctx.translate(p.x, anchorY);
      if (enemy.stunTime > 0) ctx.globalAlpha = .72 + Math.sin(enemy.age * 25) * .16;
      if (!flying) ctx.rotate(Math.sin(enemy.age * 8) * (enemy.type === 'bost' ? .025 : .035));
      drawImageContain(sprite, 0, 0, width, height, flying);
      ctx.restore();
    } else {
      drawEnemyPlaceholder(enemy, p.x, anchorY, width, height);
    }
    if (enemy.type === 'bost' && enemy.stunTime > 0) {
      ctx.fillStyle = '#b8ff94';
      for (let i = 0; i < 3; i++) { const angle = enemy.age * 4 + i * 2.1; ctx.beginPath(); ctx.arc(p.x + Math.cos(angle) * 26, p.y - 67 + Math.sin(angle) * 5, 3, 0, Math.PI * 2); ctx.fill(); }
    }
    if (enemy.burnTime > 0) {
      ctx.fillStyle = '#ff9c41'; ctx.fillRect(p.x - 10, p.y - 30, 4, 6); ctx.fillRect(p.x + 7, p.y - 24, 4, 5);
    }
    const barWidth = enemy.type === 'dragon' || enemy.type === 'necromancer' || enemy.type === 'witch' ? 72 : enemy.type === 'troll' || enemy.type === 'bost' || enemy.type === 'crystalGolem' ? 64 : flying ? 48 : enemy.drop ? 32 : 38;
    const y = enemy.type === 'necromancer' ? p.y - (state.wave >= 100 ? 190 : 160) : enemy.type === 'witch' ? p.y - 160 : enemy.type === 'troll' ? p.y - 146 : enemy.type === 'dragon' ? p.y - 124 : enemy.type === 'aereo' ? p.y - 100 : enemy.balloon ? p.y - 78 : enemy.type === 'bost' || enemy.type === 'crystalGolem' ? p.y - 112 : enemy.drop ? p.y - 48 : p.y - 62;
    ctx.fillStyle = '#07110dcc'; roundRect(ctx, p.x - barWidth / 2, y, barWidth, 6, 3, true, false);
    ctx.fillStyle = enemy.hp / enemy.maxHp < .3 ? '#ed7771' : enemy.balloon && enemy.type === 'purpleBalloon' ? '#c19bff' : '#97ce7b';
    ctx.fillRect(p.x - barWidth / 2 + 1, y + 1, Math.max(1, (barWidth - 2) * Math.max(0, enemy.hp / enemy.maxHp)), 4);
  }

  function drawImageContain(image, x, anchorY, boxWidth, boxHeight, centerAnchor = false) {
    const ratio = Math.min(boxWidth / image.naturalWidth, boxHeight / image.naturalHeight);
    const w = image.naturalWidth * ratio, h = image.naturalHeight * ratio;
    ctx.drawImage(image, x - w / 2, centerAnchor ? anchorY - h / 2 : anchorY - h, w, h);
  }

  function drawEnemyPlaceholder(enemy, x, anchorY, width, height) {
    const color = enemy.type === 'bost' ? '#47766d' : enemy.type.includes('crystal') ? '#9b70dd' : enemy.type === 'dragon' ? '#7952b8' : '#d7cdb7';
    const cy = enemy.air ? anchorY : anchorY - height / 2;
    const gradient = ctx.createRadialGradient(x - width * .2, cy - height * .22, 2, x, cy, width * .55);
    gradient.addColorStop(0, '#fff0c9'); gradient.addColorStop(.35, color); gradient.addColorStop(1, '#18211e');
    ctx.fillStyle = gradient; ctx.beginPath(); ctx.ellipse(x, cy, width * .38, height * .44, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d9c16e'; ctx.beginPath(); ctx.arc(x, cy - height * .1, Math.max(3, width * .07), 0, Math.PI * 2); ctx.fill();
  }

  function drawProjectiles() {
    for (const p of state.projectiles) {
      if (p.type === 'arrow') {
        const angle = Math.atan2(p.targetY - p.startY, p.targetX - p.startX);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(angle);
        ctx.strokeStyle = '#563b20'; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(8, 0); ctx.stroke();
        ctx.fillStyle = '#e6dfc8'; ctx.beginPath(); ctx.moveTo(12, 0); ctx.lineTo(6, -3); ctx.lineTo(6, 3); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#b68f59'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(-9, -3); ctx.lineTo(-4, 0); ctx.lineTo(-9, 3); ctx.stroke(); ctx.restore();
      } else if (p.type === 'judgementMeteor') {
        const size = p.size || 40;
        ctx.save(); ctx.translate(p.x, p.y); ctx.shadowColor = '#ff7136'; ctx.shadowBlur = 22;
        const tail = ctx.createLinearGradient(0, 0, 0, size * 1.7);
        tail.addColorStop(0, '#fff5b0'); tail.addColorStop(.24, '#ffc33f'); tail.addColorStop(.72, '#f04b2e'); tail.addColorStop(1, '#9639c8');
        ctx.fillStyle = tail; ctx.beginPath(); ctx.moveTo(-size * .33, size * .12); ctx.lineTo(-size * .18, size * 1.18); ctx.lineTo(0, size * 1.7); ctx.lineTo(size * .18, size * 1.18); ctx.lineTo(size * .33, size * .12); ctx.closePath(); ctx.fill();
        const core = ctx.createRadialGradient(-size * .18, -size * .2, 1, 0, 0, size * .62);
        core.addColorStop(0, '#fffbd0'); core.addColorStop(.34, '#ffd34e'); core.addColorStop(.72, '#ff7132'); core.addColorStop(1, '#bc3d37');
        ctx.fillStyle = core; ctx.beginPath(); ctx.arc(0, 0, size * .56, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#fff2aa'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, size * .5, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      } else if (p.type === 'firework') {
        ctx.save(); ctx.shadowColor = '#ff9d4e'; ctx.shadowBlur = 13;
        ctx.strokeStyle = '#ff9f54'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(p.x - 3, p.y + 10); ctx.lineTo(p.x, p.y + 2); ctx.stroke();
        const glow = ctx.createRadialGradient(p.x - 1, p.y - 2, 1, p.x, p.y, 7);
        glow.addColorStop(0, '#fff7c6'); glow.addColorStop(.45, '#ffc25b'); glow.addColorStop(1, '#ff633e');
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      } else {
        const size = p.size || 10;
        const fireball = p.type === 'dragonFire' || p.burning;
        ctx.save(); ctx.shadowColor = fireball ? '#ff6a38' : '#b9a278'; ctx.shadowBlur = fireball ? 15 : 5;
        const shell = ctx.createRadialGradient(p.x - size * .18, p.y - size * .22, 1, p.x, p.y, size * .72);
        shell.addColorStop(0, fireball ? '#fff0a5' : '#d9d5c9'); shell.addColorStop(.35, fireball ? '#ff9b3f' : '#6c665c'); shell.addColorStop(1, fireball ? '#ba3428' : '#24282b');
        ctx.fillStyle = shell; ctx.beginPath(); ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    }
  }

  function drawEffects() {
    for (const effect of state.effects) {
      const alpha = Math.max(.12, effect.time / effect.max);
      ctx.save(); ctx.globalAlpha = alpha;
      if (effect.type === 'meteorimpact') {
        const progress = 1 - effect.time / effect.max;
        const radius = 20 + progress * (effect.radius || 132);
        const flare = ctx.createRadialGradient(effect.x, effect.y, 1, effect.x, effect.y, radius);
        flare.addColorStop(0, '#fffbd0'); flare.addColorStop(.16, '#ffd861'); flare.addColorStop(.43, '#ff7b31aa'); flare.addColorStop(.72, '#c94eee5c'); flare.addColorStop(1, '#9427d000');
        ctx.fillStyle = flare; ctx.beginPath(); ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ffe78c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(effect.x, effect.y, radius * .72, 0, Math.PI * 2); ctx.stroke();
      } else if (effect.type === 'laser') {
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
      ctx.fillStyle = p.color;
      if (p.shape === 'orb') {
        ctx.save(); ctx.shadowColor = p.color; ctx.shadowBlur = 9;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      } else ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
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
    const def = towers[type];
    const cost = effectiveTowerCost(type);
    const currency = def.currency || 'gold';
    if (state[currency] < cost) { showToast(`Necesitas ${cost} ${currency === 'score' ? 'puntos' : 'monedas'} para esa torre.`); return; }
    state[currency] -= cost;
    state.towers[site] = { id: Math.random().toString(36).slice(2), type, site, level: 1, cooldown: .2, aim: -Math.PI / 2, dragonHits: 0 };
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
  function effectiveTowerCost(type) {
    const def = towers[type];
    const currency = def.currency || 'gold';
    const difficulty = difficultyStats[settings.difficulty] || difficultyStats.normal;
    return Math.round(def.cost * (currency === 'gold' ? difficulty.cost : 1));
  }
  function upgradeCost(tower) { return Math.round(effectiveTowerCost(tower.type) * (.62 + tower.level * .2)); }
  function sellTower(site) {
    const tower = state.towers[site];
    if (!tower) return;
    const baseCost = effectiveTowerCost(tower.type);
    const refund = Math.round(baseCost * .48 + (tower.level - 1) * baseCost * .19);
    const currency = towers[tower.type].currency || 'gold';
    state[currency] += refund; state.towers[site] = null; state.selectedSite = null;
    renderMessage(`Torre retirada · recuperaste ${refund} ${currency === 'score' ? 'puntos' : 'monedas'}.`);
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
      const image = towerIcons[tower.type];
      const src = image && image.src;
      const levelText = `${tower.level} / ${def.count}`;
      const objectives = tower.type === 'electric' ? `${stats.targets} en cadena` : `${stats.targets} a la vez`;
      const towerImage = image && image.src;
      detailPanel.innerHTML = `<div class="tower-detail"><div class="tower-detail-head"><img src="${towerImage}" alt="${def.label}, nivel ${tower.level}"><span><b>${def.label}</b><small>NIVEL ${levelText}</small></span></div><div class="tower-stats"><div class="tower-stat"><span>Daño</span><b>${stats.damage} por impacto</b></div><div class="tower-stat"><span>Alcance</span><b>${stats.range} m</b></div><div class="tower-stat"><span>Objetivos</span><b>${objectives}</b></div><div class="tower-stat"><span>Puede atacar</span><b>${def.target}</b></div></div><div class="tower-actions"><button class="upgrade-button" data-upgrade ${cost == null || state.gold < cost ? 'disabled' : ''}>${cost == null ? 'Nivel máximo' : `Mejorar · ◆ ${cost}`}</button><button class="sell-button" data-sell>Vender</button></div></div>`;
    } else if (siteOpen) {
      title.textContent = `Puesto ${String(state.selectedSite + 1).padStart(2, '0')}`;
      subtitle.textContent = state.placingType ? `Modo de construcción: ${towers[state.placingType].label}.` : 'Elige una torre para colocar en este puesto.';
      detailPanel.innerHTML = `<div class="build-options">${towerOrder.map(key => {
        const def = towers[key]; const image = towerIcons[key]; const currency = def.currency || 'gold'; const cost = effectiveTowerCost(key);
        const resource = state[currency]; const symbol = currency === 'score' ? '✦' : '◆';
        return `<button class="build-card" type="button" data-build="${key}" ${resource < cost ? 'disabled' : ''}><img class="build-sprite" src="${image.src}" alt=""><span class="build-info"><b>${def.label}</b><small>${def.damage} daño · ${def.target.toLowerCase()}</small></span><span class="build-price">${symbol} ${cost}${currency === 'score' ? ' pts' : ''}</span></button>`;
      }).join('')}</div>`;
    } else {
      title.textContent = 'Tus defensas';
      subtitle.textContent = state.placingType ? `Ahora toca un puesto vacío para construir ${towers[state.placingType].label.toLowerCase()}.` : 'Toca un puesto del mapa para construir.';
      detailPanel.innerHTML = '<div class="empty-selection"><span class="empty-glyph">⌖</span><strong>Sin puesto seleccionado</strong><small>Escoge un espacio del mapa para ver tus opciones.</small></div>';
    }
    document.getElementById('towerCount').textContent = `${state.towers.filter(Boolean).length} / ${state.towers.length}`;
    detailPanel.querySelectorAll('[data-build]').forEach(button => {
      const def = towers[button.dataset.build];
      button.disabled = state[def.currency || 'gold'] < effectiveTowerCost(button.dataset.build);
    });
  }

  function updateStats() {
    if (!state) return;
    document.getElementById('livesValue').textContent = state.lives;
    document.getElementById('goldValue').textContent = Math.floor(state.gold);
    document.getElementById('scoreValue').textContent = Math.floor(state.score).toLocaleString('es');
    document.getElementById('waveValue').textContent = String(state.wave).padStart(2, '0');
    document.getElementById('waveButton').disabled = state.phase === 'wave';
    detailPanel.querySelectorAll('[data-build]').forEach(button => {
      const def = towers[button.dataset.build];
      button.disabled = state[def.currency || 'gold'] < effectiveTowerCost(button.dataset.build);
    });
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
