(() => {
  'use strict';
  const key = 'defensa_portales_settings_v1';
  const defaults = { difficulty: 'normal', rewards: { skeleton: 5, lilac: 12, blackBalloon: 40, purpleBalloon: 60 } };
  const factors = {
    easy: { hp: '×0,78', speed: '×0,84' },
    normal: { hp: '×1,00', speed: '×1,00' },
    hard: { hp: '×1,35', speed: '×1,14' },
    nightmare: { hp: '×1,80', speed: '×1,30' }
  };
  let saveTimer;

  function read() {
    try {
      const stored = JSON.parse(localStorage.getItem(key));
      return stored ? {
        difficulty: factors[stored.difficulty] ? stored.difficulty : 'normal',
        rewards: { ...defaults.rewards, ...(stored.rewards || {}) }
      } : structuredClone(defaults);
    } catch (_) { return structuredClone(defaults); }
  }

  let settings = read();
  const radios = [...document.querySelectorAll('input[name="difficulty"]')];
  const rewardInputs = [...document.querySelectorAll('[data-reward]')];
  const hpLabel = document.getElementById('hpFactorLabel');
  const speedLabel = document.getElementById('speedFactorLabel');
  const saveStatus = document.getElementById('saveStatus');

  function paint() {
    radios.forEach(radio => { radio.checked = radio.value === settings.difficulty; });
    rewardInputs.forEach(input => { input.value = Math.max(0, Number(settings.rewards[input.dataset.reward] ?? 0)); });
    const stat = factors[settings.difficulty] || factors.normal;
    hpLabel.textContent = stat.hp;
    speedLabel.textContent = stat.speed;
  }

  function save() {
    clearTimeout(saveTimer);
    saveStatus.textContent = 'Guardando…';
    saveStatus.style.color = '#e7c66d';
    try { localStorage.setItem(key, JSON.stringify(settings)); } catch (_) { /* active page values are kept */ }
    saveTimer = setTimeout(() => {
      saveStatus.textContent = 'Guardado automáticamente';
      saveStatus.style.color = '#8fbc7b';
    }, 350);
  }

  radios.forEach(radio => radio.addEventListener('change', () => {
    if (!radio.checked) return;
    settings.difficulty = radio.value;
    paint(); save();
  }));

  rewardInputs.forEach(input => input.addEventListener('change', () => {
    const value = Math.max(0, Math.min(9999, Math.floor(Number(input.value) || 0)));
    input.value = value;
    settings.rewards[input.dataset.reward] = value;
    save();
  }));

  document.getElementById('resetSettings').addEventListener('click', () => {
    settings = structuredClone(defaults);
    paint(); save();
  });

  paint();
})();
