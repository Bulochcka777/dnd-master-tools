/* ============================================
   DnD Master Tools — NPC Generator Engine
   Logic, dice rolling, state & interactions
   ============================================ */

(() => {
  'use strict';

  // --- State ---
  let currentNPC = null;
  let savedNPCs = loadSavedNPCs();
  let audioCtx = null;

  // --- Web Audio API Dice Sound Synthesizer (Realistic Wooden Dice) ---
  function playDiceSound(isShort = false) {
    try {
      if (!audioCtx) {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) audioCtx = new AudioCtxClass();
      }
      if (!audioCtx || audioCtx.state === 'suspended') {
        audioCtx?.resume();
      }
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      // Wooden bounces sequence (time offset, base pitch, volume, duration)
      const bounces = isShort
        ? [
            { time: 0.00, freq: 240, vol: 0.25, dur: 0.07 },
            { time: 0.10, freq: 280, vol: 0.16, dur: 0.05 },
            { time: 0.18, freq: 210, vol: 0.08, dur: 0.04 }
          ]
        : [
            { time: 0.00, freq: 220, vol: 0.30, dur: 0.08 },
            { time: 0.12, freq: 270, vol: 0.24, dur: 0.07 },
            { time: 0.23, freq: 200, vol: 0.19, dur: 0.06 },
            { time: 0.35, freq: 250, vol: 0.14, dur: 0.05 },
            { time: 0.46, freq: 190, vol: 0.09, dur: 0.05 },
            { time: 0.55, freq: 220, vol: 0.05, dur: 0.04 }
          ];

      bounces.forEach(b => {
        const hitTime = now + b.time;

        // 1. Resonant wooden body impact (triangle wave with pitch drop)
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(b.freq, hitTime);
        osc.frequency.exponentialRampToValueAtTime(Math.max(50, b.freq * 0.45), hitTime + b.dur);

        oscGain.gain.setValueAtTime(b.vol, hitTime);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, hitTime + b.dur);

        osc.connect(oscGain);
        oscGain.connect(audioCtx.destination);

        osc.start(hitTime);
        osc.stop(hitTime + b.dur);

        // 2. Wooden surface click (bandpass filtered noise for hollow wood resonance)
        const sampleCount = Math.floor(audioCtx.sampleRate * 0.035);
        const noiseBuffer = audioCtx.createBuffer(1, sampleCount, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let j = 0; j < sampleCount; j++) {
          output[j] = Math.random() * 2 - 1;
        }

        const noise = audioCtx.createBufferSource();
        noise.buffer = noiseBuffer;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(450 + (Math.random() * 100 - 50), hitTime);
        filter.Q.value = 4.0; // Sharp resonant wood resonance

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(b.vol * 0.35, hitTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, hitTime + 0.035);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);

        noise.start(hitTime);
        noise.stop(hitTime + 0.04);
      });
    } catch (e) {
      // Audio not permitted or not supported; gracefully ignore
    }
  }

  // --- LocalStorage Helpers ---
  function loadSavedNPCs() {
    try {
      const data = localStorage.getItem('dnd_master_saved_npcs');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Failed to load saved NPCs from localStorage', e);
      return [];
    }
  }

  function persistSavedNPCs() {
    try {
      localStorage.setItem('dnd_master_saved_npcs', JSON.stringify(savedNPCs));
      updateSavedBadge();
    } catch (e) {
      showToast('Ошибка при сохранении в хранилище');
    }
  }

  // --- Toast Notification ---
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // --- Dice Rolling Rules ---
  // 4d6 drop lowest
  function roll4d6DropLowest() {
    const rolls = [rollDice(6), rollDice(6), rollDice(6), rollDice(6)];
    rolls.sort((a, b) => a - b);
    const sum = rolls[1] + rolls[2] + rolls[3];
    return { sum, rolls, dropped: rolls[0] };
  }

  // Format modifier: +2, -1, +0
  function formatMod(score) {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  }

  function getMod(score) {
    return Math.floor((score - 10) / 2);
  }

  // --- Generator Functions ---
  function generateNPC(options = {}) {
    // 1. Race
    const race = options.raceId && options.raceId !== 'random'
      ? NPC_DATA.races.find(r => r.id === options.raceId) || randomFromArray(NPC_DATA.races)
      : randomFromArray(NPC_DATA.races);

    // 2. Gender
    const gender = options.gender && options.gender !== 'random'
      ? options.gender
      : (Math.random() > 0.5 ? 'male' : 'female');

    // 3. Class
    const cls = options.classId && options.classId !== 'random'
      ? NPC_DATA.classes.find(c => c.id === options.classId) || randomFromArray(NPC_DATA.classes)
      : randomFromArray(NPC_DATA.classes);

    // 4. Level
    const level = options.level ? parseInt(options.level, 10) : 1;
    const profBonus = Math.ceil(level / 4) + 1;

    // 5. Background
    const background = options.bgId && options.bgId !== 'random'
      ? NPC_DATA.backgrounds.find(b => b.id === options.bgId) || randomFromArray(NPC_DATA.backgrounds)
      : randomFromArray(NPC_DATA.backgrounds);

    // 6. Alignment
    const alignment = options.alignId && options.alignId !== 'random'
      ? NPC_DATA.alignments.find(a => a.id === options.alignId) || randomFromArray(NPC_DATA.alignments)
      : randomFromArray(NPC_DATA.alignments);

    // 7. Name & Title
    const namePool = race.names[gender] || race.names.male;
    const firstName = randomFromArray(namePool);
    const surname = randomFromArray(race.names.surname || ['']);
    const title = Math.random() > 0.4 ? randomFromArray(NPC_DATA.titles) : '';
    const fullName = `${firstName} ${surname}`.trim() + (title ? ` «${title}»` : '');

    // 8. Stats Generation (4d6 drop lowest or Standard Array)
    const statMethod = options.statMethod || '4d6';
    const rawScores = {};
    const statKeys = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

    if (statMethod === 'standard') {
      const standardArray = [15, 14, 13, 12, 10, 8];
      // Assign highest to primary class stats
      cls.primaryStats.forEach((pStat, idx) => {
        rawScores[pStat] = standardArray[idx];
      });
      const remainingStats = statKeys.filter(k => !cls.primaryStats.includes(k));
      remainingStats.forEach((rStat, idx) => {
        rawScores[rStat] = standardArray[cls.primaryStats.length + idx];
      });
    } else {
      // 4d6 drop lowest
      statKeys.forEach(k => {
        rawScores[k] = roll4d6DropLowest().sum;
      });
      // Give a slight boost if primary stat rolled too low
      cls.primaryStats.forEach(pStat => {
        if (rawScores[pStat] < 12) rawScores[pStat] = Math.max(rawScores[pStat], 12);
      });
    }

    // Apply racial bonuses
    const finalStats = {};
    statKeys.forEach(k => {
      let bonus = 0;
      if (race.statBonus && race.statBonus[k]) bonus += race.statBonus[k];
      if (race.statBonus && race.statBonus.all) bonus += race.statBonus.all;
      finalStats[k] = rawScores[k] + bonus;
    });

    // 9. Combat Vitals
    const conMod = getMod(finalStats.con);
    const dexMod = getMod(finalStats.dex);
    const wisMod = getMod(finalStats.wis);

    // HP calculation: 1st lvl max hit die + (lvl-1)*(avg hit die + conMod)
    const baseHp = cls.hitDie + conMod;
    const perLvlHp = Math.max(1, Math.floor(cls.hitDie / 2) + 1 + conMod);
    const maxHp = Math.max(1, baseHp + perLvlHp * (level - 1));

    // AC calculation
    let ac = 10 + dexMod;
    if (cls.id === 'barbarian') ac = 10 + dexMod + conMod;
    else if (cls.id === 'monk') ac = 10 + dexMod + wisMod;
    else if (cls.id === 'fighter' || cls.id === 'paladin') ac = 16 + 2; // Heavy + shield
    else if (cls.id === 'cleric') ac = 13 + Math.min(2, dexMod) + 2; // Medium + shield
    else if (cls.id === 'druid') ac = 11 + dexMod + 2;
    else if (cls.id === 'rogue' || cls.id === 'bard' || cls.id === 'warlock') ac = 11 + dexMod;
    else if (cls.id === 'ranger') ac = 12 + dexMod;

    // 10. Narrative Traits
    const ideal = randomFromArray(NPC_DATA.ideals);

    const npc = {
      id: 'npc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: fullName,
      firstName,
      surname,
      title,
      gender: gender === 'male' ? 'Мужчина' : 'Женщина',
      race: race.name,
      raceId: race.id,
      class: cls.name,
      classId: cls.id,
      level,
      profBonus,
      background: background.name,
      bgDesc: background.desc,
      bgFeature: background.feature,
      alignment: alignment.name,
      speed: `${race.speed} фт.`,
      senses: race.senses,
      traits: [...race.traits],
      armorDesc: cls.armorDesc,
      defaultGear: cls.defaultGear,
      stats: finalStats,
      hp: maxHp,
      ac,
      initiative: formatMod(finalStats.dex),
      appearance: randomFromArray(NPC_DATA.appearances),
      speechQuirk: randomFromArray(NPC_DATA.speechQuirks),
      personality: randomFromArray(NPC_DATA.personalityTraits),
      ideal: `${ideal.text} (${ideal.type})`,
      bond: randomFromArray(NPC_DATA.bonds),
      flaw: randomFromArray(NPC_DATA.flaws),
      motivation: randomFromArray(NPC_DATA.motivations),
      secret: randomFromArray(NPC_DATA.secrets),
      createdAt: new Date().toISOString()
    };

    return npc;
  }

  // --- Render Functions ---
  function renderNPC(npc) {
    if (!npc) return;

    // Header Info
    document.getElementById('npc-name').textContent = npc.name;
    document.getElementById('npc-meta').textContent =
      `${npc.race} · ${npc.class} (${npc.level} ур.) · ${npc.background} · ${npc.alignment}`;

    // Vitals
    document.getElementById('vital-hp').textContent = npc.hp;
    document.getElementById('vital-ac').textContent = npc.ac;
    document.getElementById('vital-init').textContent = npc.initiative;
    document.getElementById('vital-speed').textContent = npc.speed;
    document.getElementById('vital-pb').textContent = `+${npc.profBonus}`;

    // Ability Scores
    const statKeys = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    statKeys.forEach(k => {
      const score = npc.stats[k];
      const scoreEl = document.getElementById(`score-${k}`);
      const modEl = document.getElementById(`mod-${k}`);
      if (scoreEl) scoreEl.textContent = score;
      if (modEl) modEl.textContent = formatMod(score);
    });

    // Narrative Elements
    document.getElementById('narrative-appearance').textContent = npc.appearance;
    document.getElementById('narrative-speech').textContent = npc.speechQuirk;
    document.getElementById('narrative-personality').textContent = npc.personality;
    document.getElementById('narrative-ideal').textContent = npc.ideal;
    document.getElementById('narrative-bond').textContent = npc.bond;
    document.getElementById('narrative-flaw').textContent = npc.flaw;
    document.getElementById('narrative-motivation').textContent = npc.motivation;
    document.getElementById('narrative-secret').textContent = npc.secret;

    // Features & Equipment
    const tagsContainer = document.getElementById('features-tags');
    tagsContainer.innerHTML = '';
    npc.traits.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'npc-tag';
      tag.textContent = t;
      tagsContainer.appendChild(tag);
    });

    const bgTag = document.createElement('span');
    bgTag.className = 'npc-tag';
    bgTag.textContent = `Черта: ${npc.bgFeature}`;
    tagsContainer.appendChild(bgTag);

    document.getElementById('narrative-gear').textContent = npc.defaultGear;

    // Update Favorite Button State
    updateFavoriteBtnState();
  }

  // --- Animation & Trigger ---
  function triggerGenerate() {
    playDiceSound(false);
    const overlay = document.getElementById('dice-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }

    setTimeout(() => {
      const options = {
        raceId: document.getElementById('filter-race').value,
        classId: document.getElementById('filter-class').value,
        gender: document.getElementById('filter-gender').value,
        bgId: document.getElementById('filter-bg').value,
        alignId: document.getElementById('filter-align').value,
        level: document.getElementById('filter-level').value,
        statMethod: document.getElementById('filter-stats').value
      };

      currentNPC = generateNPC(options);
      renderNPC(currentNPC);

      if (overlay) {
        overlay.classList.remove('active');
      }

      // Smooth scroll to card if on mobile
      if (window.innerWidth < 768) {
        document.getElementById('npc-sheet').scrollIntoView({ behavior: 'smooth' });
      }
    }, 650);
  }

  // --- Re-roll Single Field ---
  function rerollField(field) {
    if (!currentNPC) return;
    playDiceSound(true);

    switch (field) {
      case 'name': {
        const race = NPC_DATA.races.find(r => r.name === currentNPC.race) || NPC_DATA.races[0];
        const isMale = currentNPC.gender === 'Мужчина';
        const namePool = isMale ? race.names.male : race.names.female;
        const firstName = randomFromArray(namePool);
        const surname = randomFromArray(race.names.surname || ['']);
        const title = Math.random() > 0.4 ? randomFromArray(NPC_DATA.titles) : '';
        currentNPC.name = `${firstName} ${surname}`.trim() + (title ? ` «${title}»` : '');
        document.getElementById('npc-name').textContent = currentNPC.name;
        showToast('Имя обновлено!');
        break;
      }
      case 'appearance':
        currentNPC.appearance = randomFromArray(NPC_DATA.appearances);
        document.getElementById('narrative-appearance').textContent = currentNPC.appearance;
        showToast('Внешность обновлена!');
        break;
      case 'speech':
        currentNPC.speechQuirk = randomFromArray(NPC_DATA.speechQuirks);
        document.getElementById('narrative-speech').textContent = currentNPC.speechQuirk;
        showToast('Манеры обновлены!');
        break;
      case 'personality':
        currentNPC.personality = randomFromArray(NPC_DATA.personalityTraits);
        document.getElementById('narrative-personality').textContent = currentNPC.personality;
        showToast('Характер обновлен!');
        break;
      case 'ideal': {
        const ideal = randomFromArray(NPC_DATA.ideals);
        currentNPC.ideal = `${ideal.text} (${ideal.type})`;
        document.getElementById('narrative-ideal').textContent = currentNPC.ideal;
        showToast('Идеал обновлен!');
        break;
      }
      case 'bond':
        currentNPC.bond = randomFromArray(NPC_DATA.bonds);
        document.getElementById('narrative-bond').textContent = currentNPC.bond;
        showToast('Привязанность обновлена!');
        break;
      case 'flaw':
        currentNPC.flaw = randomFromArray(NPC_DATA.flaws);
        document.getElementById('narrative-flaw').textContent = currentNPC.flaw;
        showToast('Слабость обновлена!');
        break;
      case 'motivation':
        currentNPC.motivation = randomFromArray(NPC_DATA.motivations);
        document.getElementById('narrative-motivation').textContent = currentNPC.motivation;
        showToast('Мотивация обновлена!');
        break;
      case 'secret':
        currentNPC.secret = randomFromArray(NPC_DATA.secrets);
        document.getElementById('narrative-secret').textContent = currentNPC.secret;
        showToast('Тайный секрет обновлен!');
        break;
      case 'stats': {
        const statKeys = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        statKeys.forEach(k => {
          currentNPC.stats[k] = roll4d6DropLowest().sum;
          document.getElementById(`score-${k}`).textContent = currentNPC.stats[k];
          document.getElementById(`mod-${k}`).textContent = formatMod(currentNPC.stats[k]);
        });
        // Recalculate HP & AC
        const conMod = getMod(currentNPC.stats.con);
        const dexMod = getMod(currentNPC.stats.dex);
        currentNPC.hp = Math.max(1, 10 + conMod);
        currentNPC.ac = 10 + dexMod;
        currentNPC.initiative = formatMod(currentNPC.stats.dex);
        document.getElementById('vital-hp').textContent = currentNPC.hp;
        document.getElementById('vital-ac').textContent = currentNPC.ac;
        document.getElementById('vital-init').textContent = currentNPC.initiative;
        showToast('Характеристики переброшены!');
        break;
      }
    }
  }

  // --- Copy / Export ---
  function getMarkdownNPC() {
    if (!currentNPC) return '';
    return `# ${currentNPC.name}
**${currentNPC.race} · ${currentNPC.class} (${currentNPC.level} ур.)**
*${currentNPC.alignment} | ${currentNPC.background} | ${currentNPC.gender}*

---

### Боевые показатели:
- **Хиты (HP):** ${currentNPC.hp}
- **Класс доспеха (AC):** ${currentNPC.ac} (${currentNPC.armorDesc})
- **Инициатива:** ${currentNPC.initiative}
- **Скорость:** ${currentNPC.speed}
- **Бонус мастерства:** +${currentNPC.profBonus}
- **Чувства:** ${currentNPC.senses}

### Характеристики:
| СИЛ | ЛОВ | ТЕЛ | ИНТ | МУД | ХАР |
| :---: | :---: | :---: | :---: | :---: | :---: |
| ${currentNPC.stats.str} (${formatMod(currentNPC.stats.str)}) | ${currentNPC.stats.dex} (${formatMod(currentNPC.stats.dex)}) | ${currentNPC.stats.con} (${formatMod(currentNPC.stats.con)}) | ${currentNPC.stats.int} (${formatMod(currentNPC.stats.int)}) | ${currentNPC.stats.wis} (${formatMod(currentNPC.stats.wis)}) | ${currentNPC.stats.cha} (${formatMod(currentNPC.stats.cha)}) |

---

### Отыгрыш:
- **Внешность:** ${currentNPC.appearance}
- **Манеры и речь:** ${currentNPC.speechQuirk}
- **Черта характера:** ${currentNPC.personality}
- **Идеал:** ${currentNPC.ideal}
- **Привязанность:** ${currentNPC.bond}
- **Слабость:** ${currentNPC.flaw}
- **Цель / Мотивация:** ${currentNPC.motivation}
- **🔒 Тайна:** ${currentNPC.secret}

### Снаряжение и особенности:
- **Снаряжение:** ${currentNPC.defaultGear}
- **Черты:** ${currentNPC.traits.join(', ')}
- **Особенность предыстории:** ${currentNPC.bgFeature}
`;
  }

  function copyMarkdown() {
    const md = getMarkdownNPC();
    if (!md) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md)
        .then(() => showToast('Карточка скопирована в Markdown!'))
        .catch(() => fallbackCopy(md));
    } else {
      fallbackCopy(md);
    }
  }

  function fallbackCopy(text) {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
    showToast('Карточка скопирована!');
  }

  // --- Favorites / Saved NPCs ---
  function updateFavoriteBtnState() {
    const btn = document.getElementById('btn-save-npc');
    if (!btn || !currentNPC) return;
    const isSaved = savedNPCs.some(n => n.id === currentNPC.id || n.name === currentNPC.name);
    if (isSaved) {
      btn.innerHTML = '⭐ В избранном';
      btn.style.borderColor = 'var(--color-gold-bright)';
      btn.style.color = 'var(--color-gold-bright)';
    } else {
      btn.innerHTML = '☆ Сохранить';
      btn.style.borderColor = '';
      btn.style.color = '';
    }
  }

  function toggleSaveCurrentNPC() {
    if (!currentNPC) return;
    const existingIndex = savedNPCs.findIndex(n => n.id === currentNPC.id || n.name === currentNPC.name);

    if (existingIndex >= 0) {
      savedNPCs.splice(existingIndex, 1);
      showToast('Персонаж удалён из избранного');
    } else {
      savedNPCs.unshift({ ...currentNPC });
      showToast('Персонаж сохранён в избранное!');
    }
    persistSavedNPCs();
    updateFavoriteBtnState();
    renderSavedNPCsList();
  }

  function updateSavedBadge() {
    const badge = document.getElementById('saved-count-badge');
    if (badge) {
      badge.textContent = savedNPCs.length;
    }
  }

  function renderSavedNPCsList() {
    const container = document.getElementById('saved-list-container');
    if (!container) return;

    if (savedNPCs.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; color: var(--color-text-muted); padding: var(--space-xl) 0;">
          <p style="font-size: 2rem; margin-bottom: var(--space-xs);">📜</p>
          <p>Пока нет сохранённых персонажей</p>
          <p style="font-size: var(--fs-xs);">Нажмите «Сохранить» на карточке NPC</p>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    savedNPCs.forEach((npc, index) => {
      const card = document.createElement('div');
      card.className = 'saved-npc-card';
      card.innerHTML = `
        <div class="saved-npc-info">
          <h4>${npc.name}</h4>
          <p>${npc.race} · ${npc.class} (${npc.level} ур.)</p>
          <p style="font-style: italic; font-size: 0.75rem; color: var(--color-gold-dim);">${npc.alignment}</p>
        </div>
        <div class="saved-npc-actions">
          <button class="btn-secondary btn-load-npc" data-index="${index}" title="Открыть">👁️</button>
          <button class="btn-secondary btn-delete-npc" data-index="${index}" title="Удалить" style="color: var(--color-crimson-bright);">🗑️</button>
        </div>
      `;
      container.appendChild(card);
    });

    // Attach load & delete listeners
    container.querySelectorAll('.btn-load-npc').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        if (savedNPCs[idx]) {
          currentNPC = { ...savedNPCs[idx] };
          renderNPC(currentNPC);
          closeDrawer();
          showToast(`Загружен NPC: ${currentNPC.name}`);
        }
      });
    });

    container.querySelectorAll('.btn-delete-npc').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        if (savedNPCs[idx]) {
          const removedName = savedNPCs[idx].name;
          savedNPCs.splice(idx, 1);
          persistSavedNPCs();
          renderSavedNPCsList();
          updateFavoriteBtnState();
          showToast(`Удален: ${removedName}`);
        }
      });
    });
  }

  // --- Drawer Handlers ---
  function openDrawer() {
    renderSavedNPCsList();
    document.getElementById('saved-drawer').classList.add('open');
    document.getElementById('drawer-backdrop').classList.add('open');
  }

  function closeDrawer() {
    document.getElementById('saved-drawer').classList.remove('open');
    document.getElementById('drawer-backdrop').classList.remove('open');
  }

  // --- Populate Dropdowns ---
  function initFilters() {
    const raceSelect = document.getElementById('filter-race');
    const classSelect = document.getElementById('filter-class');
    const bgSelect = document.getElementById('filter-bg');
    const alignSelect = document.getElementById('filter-align');

    // Populate Races
    NPC_DATA.races.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.id;
      opt.textContent = r.name;
      raceSelect.appendChild(opt);
    });

    // Populate Classes
    NPC_DATA.classes.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.icon} ${c.name}`;
      classSelect.appendChild(opt);
    });

    // Populate Backgrounds
    NPC_DATA.backgrounds.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b.id;
      opt.textContent = b.name;
      bgSelect.appendChild(opt);
    });

    // Populate Alignments
    NPC_DATA.alignments.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a.id;
      opt.textContent = a.name;
      alignSelect.appendChild(opt);
    });
  }

  // --- Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    updateSavedBadge();

    // Event Listeners: Main Actions
    document.getElementById('btn-generate').addEventListener('click', triggerGenerate);
    document.getElementById('btn-quick-random').addEventListener('click', () => {
      // Reset all selects to 'random'
      document.getElementById('filter-race').value = 'random';
      document.getElementById('filter-class').value = 'random';
      document.getElementById('filter-gender').value = 'random';
      document.getElementById('filter-bg').value = 'random';
      document.getElementById('filter-align').value = 'random';
      document.getElementById('filter-level').value = '1';
      triggerGenerate();
    });

    document.getElementById('btn-copy-md').addEventListener('click', copyMarkdown);
    document.getElementById('btn-print-npc').addEventListener('click', () => window.print());
    document.getElementById('btn-save-npc').addEventListener('click', toggleSaveCurrentNPC);

    // Drawer Listeners
    document.getElementById('btn-open-saved').addEventListener('click', openDrawer);
    document.getElementById('drawer-close').addEventListener('click', closeDrawer);
    document.getElementById('drawer-backdrop').addEventListener('click', closeDrawer);

    // Re-roll Listeners
    document.querySelectorAll('.btn-reroll').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const field = e.currentTarget.dataset.field;
        rerollField(field);
      });
    });

    // Keyboard shortcut: Space generates new NPC when not focusing inputs
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        triggerGenerate();
      }
    });

    // Generate initial NPC on load
    triggerGenerate();
  });
})();
