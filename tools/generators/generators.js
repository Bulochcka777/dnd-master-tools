/* ============================================
   DnD Master Tools — Random Forge (Кузница Случайностей)
   Logic & Scene Switching (Generators <-> Full Scene Sheet)
   ============================================ */

(function () {
  'use strict';

  // --- App State ---
  const state = {
    currentView: 'generators', // 'generators' or 'scene'
    scene: null // Stores generated scene data & text
  };

  // --- Helper Functions ---
  function pick(arr) {
    if (!arr || arr.length === 0) return '';
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  function copyToClipboard(text, successMsg = 'Скопировано в буфер!') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(successMsg)).catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (e) {
      showToast('Не удалось скопировать');
    }
    document.body.removeChild(ta);
  }

  function triggerDiceAnimation(btn) {
    if (!btn) return;
    const icon = btn.querySelector('.dice-icon') || btn.querySelector('span');
    if (icon) {
      icon.classList.remove('dice-spinning');
      void icon.offsetWidth;
      icon.classList.add('dice-spinning');
    }
  }

  // --- View Switcher: Generators Grid <-> Full Scene Sheet ---
  function switchToView(targetView) {
    state.currentView = targetView;
    const viewGens = document.getElementById('view-generators');
    const viewScene = document.getElementById('view-scene');
    const barToScene = document.getElementById('bar-to-scene');

    if (targetView === 'scene') {
      if (viewGens) viewGens.style.display = 'none';
      if (viewScene) viewScene.style.display = 'block';
      if (barToScene) barToScene.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (viewGens) viewGens.style.display = 'block';
      if (viewScene) viewScene.style.display = 'none';
      if (barToScene && state.scene) {
        barToScene.style.display = 'flex';
        const labelTitle = document.getElementById('label-goto-scene-title');
        if (labelTitle) labelTitle.textContent = `«${state.scene.title}»`;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ==========================================
  // 1. GENERATOR: NAMES (Compact In-Card)
  // ==========================================
  function generateName(raceId, gender) {
    const races = Object.keys(GENERATORS_DATA.names);
    const chosenRace = (raceId === 'any' || !GENERATORS_DATA.names[raceId]) ? pick(races) : raceId;
    const raceData = GENERATORS_DATA.names[chosenRace];

    let chosenGender = gender;
    if (gender === 'any') {
      chosenGender = Math.random() < 0.5 ? 'male' : 'female';
    }

    const firstName = pick(raceData[chosenGender] || raceData.male);
    let fullName = firstName;
    let detail = `Раса: ${raceData.raceName}, ${chosenGender === 'male' ? 'Мужской' : 'Женский'}`;

    if (chosenRace === 'goliath') {
      const clan = pick(raceData.surnames);
      const epithet = pick(raceData.epithets);
      fullName = `${firstName} «${epithet}» ${clan}`;
    } else if (chosenRace === 'tiefling') {
      if (Math.random() < 0.4) {
        fullName = `${firstName} (${pick(raceData.surnames)})`;
      } else {
        fullName = `${firstName} ${pick(raceData.surnames)}`;
      }
    } else {
      const surname = pick(raceData.surnames);
      if (Math.random() < 0.85) {
        fullName = `${firstName} ${surname}`;
      } else {
        fullName = `${firstName} ${pick(raceData.epithets || [])}`;
      }
    }

    return { fullName, detail, raceName: raceData.raceName, gender: chosenGender };
  }

  function handleRollNames() {
    const btn = document.getElementById('btn-roll-names');
    triggerDiceAnimation(btn);

    const race = document.getElementById('name-race').value;
    const gender = document.getElementById('name-gender').value;
    const count = parseInt(document.getElementById('name-count').value, 10) || 1;
    const container = document.getElementById('result-names');

    if (count === 1) {
      const res = generateName(race, gender);
      container.innerHTML = `
        <div class="gen-result__header">
          <span class="gen-result__tag">${res.raceName} · ${res.gender === 'male' ? 'Мужской' : 'Женский'}</span>
          <button class="btn-copy-result" data-copy="${res.fullName}">📋 Копировать</button>
        </div>
        <div class="gen-result__main-text">${res.fullName}</div>
        <div class="gen-result__meta">${res.detail}</div>
      `;
    } else {
      const namesList = [];
      for (let i = 0; i < count; i++) {
        namesList.push(generateName(race, gender));
      }

      const allText = namesList.map(n => n.fullName).join(', ');
      let listHtml = namesList.map(n => `
        <div class="gen-name-item" title="${n.detail}">
          <span>${n.fullName}</span>
          <button class="btn-copy-result" style="padding:0; margin:0;" data-copy="${n.fullName}">📋</button>
        </div>
      `).join('');

      container.innerHTML = `
        <div class="gen-result__header">
          <span class="gen-result__tag">Список: ${count} имён (${race === 'any' ? 'разные расы' : namesList[0].raceName})</span>
          <button class="btn-copy-result" data-copy="${allText}">📋 Копировать все</button>
        </div>
        <div class="gen-names-list">${listHtml}</div>
      `;
    }

    attachCopyHandlers(container);
  }

  // ==========================================
  // 2. GENERATOR: SETTLEMENTS (Compact In-Card)
  // ==========================================
  function generateSettlement(scaleId) {
    const data = GENERATORS_DATA.settlements;
    const scale = (scaleId === 'any' || !data.scales.find(s => s.id === scaleId))
      ? pick(data.scales)
      : data.scales.find(s => s.id === scaleId);

    const nameMode = Math.random();
    let name = '';
    if (nameMode < 0.45) {
      name = `${pick(data.roots.prefixes)}${pick(data.roots.suffixes)}`;
    } else if (nameMode < 0.8) {
      name = pick(data.roots.metaphors);
    } else {
      name = pick(data.roots.historical);
    }

    const landmark = pick(data.landmarks);
    const ruler = pick(data.rulers);
    const crisis = pick(data.crises);

    return { name, scale: scale.name, scaleId: scale.id, population: scale.population, landmark, ruler, crisis };
  }

  function handleRollSettlement() {
    const btn = document.getElementById('btn-roll-settlement');
    triggerDiceAnimation(btn);

    const scale = document.getElementById('settlement-scale').value;
    const res = generateSettlement(scale);
    const container = document.getElementById('result-settlement');

    const copyText = `${res.name} (${res.scale}, ${res.population})\n• Правитель: ${res.ruler}\n• Достопримечательность: ${res.landmark}\n• Кризис: ${res.crisis}`;

    container.innerHTML = `
      <div class="gen-result__header">
        <span class="gen-result__tag">${res.scale} · ${res.population}</span>
        <button class="btn-copy-result" data-copy="${copyText}">📋 Копировать</button>
      </div>
      <div class="gen-result__main-text">🏰 ${res.name}</div>
      <div class="gen-result__meta">
        <div class="gen-result__meta-item"><strong>👑 Власть:</strong> ${res.ruler}</div>
        <div class="gen-result__meta-item"><strong>🏛️ Особенность:</strong> ${res.landmark}</div>
        <div class="gen-result__meta-item" style="color: #f87171;"><strong>⚠️ Кризис:</strong> ${res.crisis}</div>
      </div>
    `;

    attachCopyHandlers(container);
  }

  // ==========================================
  // 3. GENERATOR: TAVERNS (Compact In-Card)
  // ==========================================
  function generateTavern(typeId) {
    const data = GENERATORS_DATA.taverns;
    const type = (typeId === 'any' || !data.types.find(t => t.id === typeId))
      ? pick(data.types)
      : data.types.find(t => t.id === typeId);

    const pool = (data.byType && data.byType[type.id]) ? data.byType[type.id] : data.byType.cozy;

    const name = pick(pool.names);
    const innkeeper = pick(pool.innkeepers);
    const food = pick(pool.foods);
    const drink = pick(pool.drinks);
    const event = pick(pool.events);

    return { name, type: type.name, typeId: type.id, typeDesc: type.desc, innkeeper, food, drink, event };
  }

  function handleRollTavern() {
    const btn = document.getElementById('btn-roll-tavern');
    triggerDiceAnimation(btn);

    const type = document.getElementById('tavern-type').value;
    const res = generateTavern(type);
    const container = document.getElementById('result-tavern');

    const copyText = `Таверна ${res.name} (${res.type})\n• Трактирщик: ${res.innkeeper.name} (${res.innkeeper.race}, ${res.innkeeper.quirk})\n• Фирменное блюдо: ${res.food}\n• Выпивка: ${res.drink}\n• В зале: ${res.event}`;

    container.innerHTML = `
      <div class="gen-result__header">
        <span class="gen-result__tag">${res.type}</span>
        <button class="btn-copy-result" data-copy="${copyText}">📋 Копировать</button>
      </div>
      <div class="gen-result__main-text">🍺 Таверна ${res.name}</div>
      <div class="gen-result__meta">
        <div class="gen-result__meta-item"><strong>👤 Хозяин:</strong> ${res.innkeeper.name} (${res.innkeeper.race} — ${res.innkeeper.quirk})</div>
        <div class="gen-result__meta-item"><strong>🍖 Блюдо:</strong> ${res.food}</div>
        <div class="gen-result__meta-item"><strong>🍷 Напиток:</strong> ${res.drink}</div>
        <div class="gen-result__meta-item" style="font-style: italic;"><strong>🎲 Обстановка:</strong> ${res.event}</div>
      </div>
    `;

    attachCopyHandlers(container);
  }

  // ==========================================
  // 4. GENERATOR: ENCOUNTERS (Compact In-Card)
  // ==========================================
  function generateEncounter(biomeId) {
    const biomes = GENERATORS_DATA.encounters.biomes;
    const biomeKeys = Object.keys(biomes);
    const chosenBiome = (biomeId === 'any' || !biomes[biomeId]) ? pick(biomeKeys) : biomeId;
    const biomeData = biomes[chosenBiome];
    const encounter = pick(biomeData.encounters);

    return { biomeName: biomeData.name, ...encounter };
  }

  function handleRollEncounter() {
    const btn = document.getElementById('btn-roll-encounter');
    triggerDiceAnimation(btn);

    const biome = document.getElementById('encounter-biome').value;
    const res = generateEncounter(biome);
    const container = document.getElementById('result-encounter');

    const copyText = `Энкаунтер: ${res.title} (${res.biomeName} · ${res.type})\n${res.description}\n• Тактика/Условия: ${res.tactics}\n• Решение: ${res.solution}`;

    container.innerHTML = `
      <div class="gen-result__header">
        <span class="gen-result__tag">${res.biomeName} · ${res.type}</span>
        <button class="btn-copy-result" data-copy="${copyText}">📋 Копировать</button>
      </div>
      <div class="gen-result__main-text">${res.title}</div>
      <div class="gen-result__meta">
        <div class="gen-result__meta-item">${res.description}</div>
        <div class="gen-result__meta-item"><strong>🛡️ Тактика:</strong> ${res.tactics}</div>
        <div class="gen-result__meta-item" style="color: #4ade80;"><strong>💡 Решение:</strong> ${res.solution}</div>
      </div>
    `;

    attachCopyHandlers(container);
  }

  // ==========================================
  // 5. GENERATOR: RUMORS (Compact In-Card)
  // ==========================================
  function generateRumor() {
    const data = GENERATORS_DATA.rumors;
    return pick(data);
  }

  function handleRollRumor() {
    const btn = document.getElementById('btn-roll-rumor');
    triggerDiceAnimation(btn);

    const res = generateRumor();
    const container = document.getElementById('result-rumor');

    let badgeClass = 'truth-badge--truth';
    if (res.truthLevel.includes('Полуправда')) badgeClass = 'truth-badge--half';
    if (res.truthLevel.includes('Ложь')) badgeClass = 'truth-badge--lie';

    const copyText = `Слух (${res.source}): ${res.rumor}\nДостоверность: ${res.truthLevel}\n(Правда для Мастера: ${res.truthDetail})`;

    container.innerHTML = `
      <div class="gen-result__header">
        <span class="gen-result__tag">Источник: ${res.source}</span>
        <button class="btn-copy-result" data-copy="${copyText}">📋 Копировать</button>
      </div>
      <div class="gen-result__main-text" style="font-size: 1.05rem; font-style: italic; font-weight: normal; color: var(--color-text-parchment);">
        ${res.rumor}
      </div>
      <div class="gen-result__meta">
        <span class="truth-badge ${badgeClass}">${res.truthLevel}</span>
        <div class="gen-result__meta-item" style="margin-top: 6px;">
          <strong>🤫 Для Мастера:</strong> ${res.truthDetail}
        </div>
      </div>
    `;

    attachCopyHandlers(container);
  }

  // ==========================================
  // 6. GENERATOR: LOOT & TRINKETS (Compact In-Card)
  // ==========================================
  function generateLoot(targetId) {
    const data = GENERATORS_DATA.loot;
    const target = (targetId === 'any' || !data.targets.find(t => t.id === targetId))
      ? pick(data.targets)
      : data.targets.find(t => t.id === targetId);

    const rollFn = data.coinRolls[target.id] || data.coinRolls.pockets;
    const coins = rollFn();
    const trinket = pick(data.trinkets);
    const valuable = pick(data.valuables);

    return { targetName: target.name, coins, trinket, valuable };
  }

  function handleRollLoot() {
    const btn = document.getElementById('btn-roll-loot');
    triggerDiceAnimation(btn);

    const target = document.getElementById('loot-target').value;
    const res = generateLoot(target);
    const container = document.getElementById('result-loot');

    const copyText = `Добыча (${res.targetName}):\n• Монеты: ${res.coins}\n• Безделушка D&D: ${res.trinket}\n• Ценный предмет: ${res.valuable}`;

    container.innerHTML = `
      <div class="gen-result__header">
        <span class="gen-result__tag">${res.targetName}</span>
        <button class="btn-copy-result" data-copy="${copyText}">📋 Копировать</button>
      </div>
      <div class="gen-result__main-text">💰 ${res.coins}</div>
      <div class="gen-result__meta">
        <div class="gen-result__meta-item"><strong>🎲 Безделушка:</strong> ${res.trinket}</div>
        <div class="gen-result__meta-item"><strong>💎 Ценная вещь:</strong> ${res.valuable}</div>
      </div>
    `;

    attachCopyHandlers(container);
  }

  // ==========================================
  // 7. FULL SCENE GENERATOR (REPLACES ENTIRE SCREEN)
  // ==========================================
  function handleGenerateScene() {
    const city = generateSettlement('any');

    // Context-aware tavern selection matching city scale & atmosphere
    let tavernTypeId = 'any';
    if (city.scaleId === 'metropolis') {
      tavernTypeId = pick(['elite', 'dive', 'roadside']);
    } else if (city.scaleId === 'port') {
      tavernTypeId = pick(['harbor', 'dive']);
    } else if (city.scaleId === 'village') {
      tavernTypeId = 'cozy';
    } else if (city.scaleId === 'fortress' || city.scaleId === 'mining') {
      tavernTypeId = pick(['roadside', 'dive']);
    } else if (city.scaleId === 'magic_spire') {
      tavernTypeId = pick(['elite', 'cozy']);
    } else {
      tavernTypeId = pick(['roadside', 'cozy', 'elite']);
    }
    const tavern = generateTavern(tavernTypeId);

    // Context-aware NPC role in the tavern
    const char = generateName('any', 'any');
    let npcRole = 'Посетитель таверны';
    if (tavern.typeId === 'elite') {
      npcRole = pick([
        'Обедневший виконт, ищущий доверенных наёмников для тайного поручения',
        'Элегантная дама с веером, оказавшаяся королевским тайным агентом',
        'Молодой маг-академик, изучающий древний зашифрованный фолиант',
        'Влиятельный торговый эмиссар с охраной, ждущий важных новостей'
      ]);
    } else if (tavern.typeId === 'dive') {
      npcRole = pick([
        'Мрачный скупщик краденого в надвинутом капюшоне',
        'Шулер-виртуоз, прячущий в рукаве краплёную колоду карт',
        'Беглый каторжник с клеймом на предплечье и ценной информацией',
        'Наёмный убийца, готовый поделиться контрактом за долю в золоте'
      ]);
    } else if (tavern.typeId === 'harbor') {
      npcRole = pick([
        'Бывалый штурман с картой необитаемого кораллового рифа',
        'Боцман в отставке, ищущий команду для подъёма затонувшего галеона',
        'Охотник на морских чудовищ с гарпуном и банкой фосфорной наживки',
        'Юнга-дезертир, знающий тайный фарватер контрабандистов'
      ]);
    } else if (tavern.typeId === 'cozy') {
      npcRole = pick([
        'Странствующий бард с лютней и ворохом дорожных историй',
        'Местный егерь-травник, знающий все тайные тропы в окрестностях',
        'Беглый дворянский оруженосец под вымышленным простым именем',
        'Пожилой пасечник, случайно нашедший на холме вход в древний курган'
      ]);
    } else {
      npcRole = pick([
        'Опытный начальник каравана, ищущий надёжный боевой эскорт',
        'Охотник за головами с королевской грамотой и ориентировкой на беглеца',
        'Королевский гонец со срочной депешей, у которого пала лошадь',
        'Пилигрим в широкополой шляпе с резным посохом и святым символом'
      ]);
    }

    // Context-aware encounter biome
    let encounterBiome = 'any';
    if (city.scaleId === 'port') {
      encounterBiome = pick(['sea', 'city', 'road']);
    } else if (city.scaleId === 'fortress' || city.scaleId === 'mining') {
      encounterBiome = pick(['mountains', 'dungeon']);
    } else if (city.scaleId === 'village') {
      encounterBiome = pick(['forest', 'road', 'swamp']);
    } else if (city.scaleId === 'metropolis') {
      encounterBiome = pick(['city', 'dungeon', 'road']);
    } else {
      encounterBiome = pick(['forest', 'road', 'mountains', 'dungeon', 'city', 'swamp', 'sea']);
    }
    const encounter = generateEncounter(encounterBiome);

    const rumor = generateRumor();

    let lootTarget = 'any';
    if (tavern.typeId === 'elite') lootTarget = pick(['noble_desk', 'mage_bag', 'chest']);
    else if (tavern.typeId === 'dive') lootTarget = pick(['pockets', 'chest']);
    else lootTarget = pick(['pockets', 'chest', 'altar', 'monster_lair']);
    const loot = generateLoot(lootTarget);

    const sceneTitle = `${city.name} · Таверна ${tavern.name}`;

    const fullSceneText = [
      `СКОМПЛЕКТОВАННАЯ СЦЕНА ПРИКЛЮЧЕНИЯ`,
      `==============================`,
      `1. ЛОКАЦИЯ: Город ${city.name} (${city.scale})`,
      `• Власть: ${city.ruler}`,
      `• Достопримечательность: ${city.landmark}`,
      `• Кризис: ${city.crisis}`,
      ``,
      `2. МЕСТО СБОРА: Таверна ${tavern.name} (${tavern.type})`,
      `• Трактирщик: ${tavern.innkeeper.name} (${tavern.innkeeper.race} — ${tavern.innkeeper.quirk})`,
      `• Блюдо и выпивка: ${tavern.food} / ${tavern.drink}`,
      `• Событие в зале: ${tavern.event}`,
      ``,
      `3. КЛЮЧЕВОЙ NPC У СТОЙКИ: ${char.fullName} (${char.detail})`,
      `• Роль: ${npcRole}`,
      ``,
      `4. ПОДСЛУШАННЫЙ СЛУХ:`,
      `${rumor.rumor} (Источник: ${rumor.source})`,
      `[Истина для DM: ${rumor.truthLevel} — ${rumor.truthDetail}]`,
      ``,
      `5. ОПАСНОСТЬ / ВСТРЕЧА ЗА ГОРОДОМ:`,
      `${encounter.title} (${encounter.biomeName} · ${encounter.type})`,
      `${encounter.description}`,
      `• Тактика: ${encounter.tactics}`,
      `• Варианты: ${encounter.solution}`,
      ``,
      `6. ВОЗМОЖНАЯ ДОБЫЧА:`,
      `• ${loot.coins}`,
      `• Безделушка: ${loot.trinket}`,
      `• Ценность: ${loot.valuable}`
    ].join('\n');

    let badgeClass = 'truth-badge--truth';
    if (rumor.truthLevel.includes('Полуправда')) badgeClass = 'truth-badge--half';
    if (rumor.truthLevel.includes('Ложь')) badgeClass = 'truth-badge--lie';

    // Save into state
    state.scene = {
      title: sceneTitle,
      fullText: fullSceneText
    };

    // Render the Scene Sheet (in NPC Generator Style)
    const content = document.getElementById('forge-scene-content');
    if (content) {
      content.innerHTML = `
        <div class="forge-sheet__header">
          <span class="forge-sheet__tag">⚡ Готовая сцена приключения</span>
          <h2 class="forge-sheet__title">${city.name} · Таверна ${tavern.name}</h2>
          <p class="forge-sheet__subtitle">Полный сюжетный комплект: локация, таверна, NPC, слух, засада и сокровища</p>
        </div>

        <div class="forge-sheet__grid-2">
          <!-- 1. City Block -->
          <div class="forge-sheet__section">
            <h3 class="forge-sheet__section-title">🏰 Город: ${city.name} (${city.scale})</h3>
            <div class="forge-sheet__content">
              <p><strong>👑 Власть:</strong> ${city.ruler}</p>
              <p><strong>🏛️ Достопримечательность:</strong> ${city.landmark}</p>
              <p style="color: #f87171; margin-top: 6px;"><strong>⚠️ Беда / Кризис:</strong> ${city.crisis}</p>
            </div>
          </div>

          <!-- 2. Tavern Block -->
          <div class="forge-sheet__section">
            <h3 class="forge-sheet__section-title">🍺 Таверна ${tavern.name} (${tavern.type})</h3>
            <div class="forge-sheet__content">
              <p><strong>👤 Хозяин / Мэтрдотель:</strong> ${tavern.innkeeper.name} (${tavern.innkeeper.race} — ${tavern.innkeeper.quirk})</p>
              <p><strong>🍖 Угощение:</strong> ${tavern.food} · <em>${tavern.drink}</em></p>
              <p style="font-style: italic; margin-top: 6px;"><strong>🎲 В зале:</strong> ${tavern.event}</p>
            </div>
          </div>
        </div>

        <!-- 3. NPC & Rumor Block -->
        <div class="forge-sheet__section">
          <h3 class="forge-sheet__section-title">🧙‍♂️ Персонаж у стойки: ${char.fullName} (${char.detail})</h3>
          <div class="forge-sheet__content">
            <p style="margin-bottom: 6px; font-weight: 600; color: var(--color-gold);">🎭 Роль: ${npcRole}</p>
            <p style="font-size: 1.1rem; font-style: italic; color: var(--color-gold-bright); margin-bottom: 8px;">
              «${rumor.rumor}»
            </p>
            <div>
              <span class="truth-badge ${badgeClass}">${rumor.truthLevel}</span>
              <span style="font-size: 0.85rem; color: var(--color-text-muted); margin-left: 8px;">Источник: ${rumor.source}</span>
            </div>
            <p style="font-size: 0.9rem; margin-top: 8px; color: var(--color-text-light);">
              <strong>🤫 Для Мастера:</strong> ${rumor.truthDetail}
            </p>
          </div>
        </div>

        <!-- 4. Encounter Block -->
        <div class="forge-sheet__section">
          <h3 class="forge-sheet__section-title">⚔️ Встреча / Засада за воротами: ${encounter.title} (${encounter.biomeName} · ${encounter.type})</h3>
          <div class="forge-sheet__content">
            <p style="margin-bottom: 10px;">${encounter.description}</p>
            <div class="forge-sheet__grid-2" style="margin-bottom: 0;">
              <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; border: 1px solid rgba(201,168,76,0.15);">
                <strong>🛡️ Тактическое окружение:</strong>
                <p style="margin-top: 4px; font-size: 0.9rem;">${encounter.tactics}</p>
              </div>
              <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 4px; border: 1px solid rgba(46,204,113,0.25);">
                <strong style="color: #4ade80;">💡 Варианты разрешения:</strong>
                <p style="margin-top: 4px; font-size: 0.9rem;">${encounter.solution}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Loot Block -->
        <div class="forge-sheet__section" style="margin-bottom: 0;">
          <h3 class="forge-sheet__section-title">💰 Трофеи и добыча</h3>
          <div class="forge-sheet__content">
            <p><strong>Звенящие монеты:</strong> ${loot.coins}</p>
            <p><strong>Безделушка (Trinket):</strong> ${loot.trinket}</p>
            <p><strong>Ценный предмет:</strong> ${loot.valuable}</p>
          </div>
        </div>
      `;
    }

    // Switch view to scene screen
    switchToView('scene');
    showToast('Готовая сцена сгенерирована!');
  }

  // --- Attach copy events to buttons with [data-copy] ---
  function attachCopyHandlers(container) {
    container.querySelectorAll('.btn-copy-result').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.getAttribute('data-copy');
        if (text) {
          copyToClipboard(text);
        }
      });
    });
  }

  // --- Filter Tabs ---
  function initFilterTabs() {
    const tabs = document.querySelectorAll('.forge-tab');
    const cards = document.querySelectorAll('.gen-card');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;

        cards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- DOM Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Compact Generator Buttons (generate in their card, don't switch view)
    document.getElementById('btn-roll-names')?.addEventListener('click', handleRollNames);
    document.getElementById('btn-roll-settlement')?.addEventListener('click', handleRollSettlement);
    document.getElementById('btn-roll-tavern')?.addEventListener('click', handleRollTavern);
    document.getElementById('btn-roll-encounter')?.addEventListener('click', handleRollEncounter);
    document.getElementById('btn-roll-rumor')?.addEventListener('click', handleRollRumor);
    document.getElementById('btn-roll-loot')?.addEventListener('click', handleRollLoot);

    // 2. Full Scene Generator (Hero button)
    document.getElementById('btn-forge-scene')?.addEventListener('click', handleGenerateScene);

    // 3. Bidirectional Navigation Buttons (only when scene is generated)
    document.getElementById('btn-back-to-generators')?.addEventListener('click', () => {
      switchToView('generators');
    });

    document.getElementById('btn-goto-scene')?.addEventListener('click', () => {
      switchToView('scene');
    });

    // 4. Scene Action Buttons
    document.getElementById('btn-reroll-scene')?.addEventListener('click', handleGenerateScene);
    document.getElementById('btn-copy-scene')?.addEventListener('click', () => {
      if (state.scene && state.scene.fullText) {
        copyToClipboard(state.scene.fullText, 'Сценарий скопирован в буфер!');
      }
    });

    // 5. Category Tabs
    initFilterTabs();

    // 6. Initial rolls for cards on startup (compact in-card, no screen switch)
    handleRollNames();
    handleRollSettlement();
    handleRollTavern();
    handleRollEncounter();
    handleRollRumor();
    handleRollLoot();
  });
})();
