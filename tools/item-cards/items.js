/* ============================================
   DnD Master Tools — Magic Items & Artifacts Engine
   Printable 9 on A4 cards, Sync Sizes, Slot Filler, Duplex Back
   ============================================ */

(() => {
  'use strict';

  // --- Classic d20 Vector Generator (Old Spell Back & Unified Deck) ---
  function getD20Svg(isBw = false, isCompact = false) {
    const strokeGold = isBw ? '#000000' : '#c9a84c';
    const strokeBright = isBw ? '#000000' : '#f5c842';
    const fillCenter = isBw ? '#ffffff' : 'rgba(15, 17, 34, 0.95)';
    const textColor = isBw ? '#000000' : '#f5c842';
    const glowClass = isBw ? '' : 'style="filter: drop-shadow(0 0 6px rgba(245, 200, 66, 0.45));"';

    return `
      <svg class="card-back__d20 ${isCompact ? 'card-back__d20--compact' : ''}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" ${glowClass}>
        <defs>
          <radialGradient id="item-d20-glow-${isBw ? 'bw' : 'col'}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${isBw ? 'transparent' : 'rgba(245, 200, 66, 0.28)'}"/>
            <stop offset="60%" stop-color="${isBw ? 'transparent' : 'rgba(201, 168, 76, 0.08)'}"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="92" fill="url(#item-d20-glow-${isBw ? 'bw' : 'col'})"/>

        <!-- Center Inverted Triangle (Contains '20') -->
        <polygon points="62,78 138,78 100,144" fill="${fillCenter}" stroke="${strokeBright}" stroke-width="2.4" stroke-linejoin="round"/>
        <text x="100" y="118" text-anchor="middle" font-family="'Cinzel', Georgia, serif" font-weight="900" font-size="30" fill="${textColor}" letter-spacing="1px">20</text>

        <!-- Surrounding Triangular Faces of icosahedron -->
        <polygon points="100,14 62,78 138,78" fill="${isBw ? 'none' : 'rgba(245, 200, 66, 0.16)'}" stroke="${strokeGold}" stroke-width="1.8" stroke-linejoin="round"/>
        <polygon points="100,14 26,57 62,78" fill="${isBw ? 'none' : 'rgba(201, 168, 76, 0.09)'}" stroke="${strokeGold}" stroke-width="1.6" stroke-linejoin="round"/>
        <polygon points="26,57 26,143 62,78" fill="${isBw ? 'none' : 'rgba(201, 168, 76, 0.05)'}" stroke="${strokeGold}" stroke-width="1.6" stroke-linejoin="round"/>
        <polygon points="26,143 100,144 62,78" fill="${isBw ? 'none' : 'rgba(201, 168, 76, 0.12)'}" stroke="${strokeGold}" stroke-width="1.6" stroke-linejoin="round"/>
        <polygon points="26,143 100,186 100,144" fill="${isBw ? 'none' : 'rgba(201, 168, 76, 0.08)'}" stroke="${strokeGold}" stroke-width="1.6" stroke-linejoin="round"/>
        <polygon points="100,186 174,143 100,144" fill="${isBw ? 'none' : 'rgba(201, 168, 76, 0.14)'}" stroke="${strokeGold}" stroke-width="1.6" stroke-linejoin="round"/>
        <polygon points="100,144 174,143 138,78" fill="${isBw ? 'none' : 'rgba(201, 168, 76, 0.10)'}" stroke="${strokeGold}" stroke-width="1.6" stroke-linejoin="round"/>
        <polygon points="174,143 174,57 138,78" fill="${isBw ? 'none' : 'rgba(201, 168, 76, 0.06)'}" stroke="${strokeGold}" stroke-width="1.6" stroke-linejoin="round"/>
        <polygon points="100,14 138,78 174,57" fill="${isBw ? 'none' : 'rgba(245, 200, 66, 0.12)'}" stroke="${strokeGold}" stroke-width="1.6" stroke-linejoin="round"/>

        <!-- Outer Boundary Hexagon -->
        <polygon points="100,14 174,57 174,143 100,186 26,143 26,57" fill="none" stroke="${strokeBright}" stroke-width="2.2" stroke-linejoin="round"/>
      </svg>
    `;
  }

  // --- Variant 4: Sacred Relic Prism & Celestial Eye (Chosen Artifact Design) ---
  function getArtifactPrismSvg(isBw = false, isCompact = false) {
    const strokeGold = isBw ? '#000000' : '#c9a84c';
    const strokeBright = isBw ? '#000000' : '#f5c842';
    const fillShieldBg = isBw ? '#ffffff' : 'rgba(15, 17, 34, 0.94)';
    const glow = isBw ? '' : 'style="filter: drop-shadow(0 0 6px rgba(245, 200, 66, 0.55));"';

    return `
      <svg class="card-back__artifact-emblem ${isCompact ? 'card-back__artifact-emblem--compact' : ''}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" ${glow}>
        <defs>
          <radialGradient id="item-prism-glow-${isBw ? 'bw' : 'col'}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${isBw ? 'transparent' : 'rgba(168, 85, 247, 0.32)'}"/>
            <stop offset="60%" stop-color="${isBw ? 'transparent' : 'rgba(201, 168, 76, 0.12)'}"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
          <radialGradient id="item-prism-eye-${isBw ? 'bw' : 'col'}" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="${isBw ? '#ffffff' : '#c084fc'}"/>
            <stop offset="50%" stop-color="${isBw ? '#888888' : '#7e22ce'}"/>
            <stop offset="100%" stop-color="${isBw ? '#000000' : '#3b0764'}"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="url(#item-prism-glow-${isBw ? 'bw' : 'col'})"/>
        
        <!-- Outer Boundary Astrolabe Rings -->
        <circle cx="100" cy="100" r="94" stroke="${strokeGold}" stroke-width="2"/>
        <circle cx="100" cy="100" r="88" stroke="${strokeBright}" stroke-width="1.2"/>
        <circle cx="100" cy="100" r="84" stroke="${strokeGold}" stroke-width="0.8" stroke-dasharray="3 2"/>

        <!-- 12 Radiating Beam Flairs -->
        <g stroke="${strokeGold}" stroke-width="0.9" opacity="0.7">
          <line x1="100" y1="10" x2="100" y2="35"/>
          <line x1="100" y1="165" x2="100" y2="190"/>
          <line x1="10" y1="100" x2="35" y2="100"/>
          <line x1="165" y1="100" x2="190" y2="100"/>
          <line x1="36" y1="36" x2="54" y2="54"/>
          <line x1="164" y1="36" x2="146" y2="54"/>
          <line x1="36" y1="164" x2="54" y2="146"/>
          <line x1="164" y1="164" x2="146" y2="146"/>
        </g>

        <!-- Double Interlaced Triangles (Hexagram / Mystic Prism of Creation) -->
        <polygon points="100,32 158,134 42,134" stroke="${strokeBright}" stroke-width="2" fill="${isBw ? 'none' : 'rgba(201, 168, 76, 0.08)'}"/>
        <polygon points="100,168 42,66 158,66" stroke="${strokeGold}" stroke-width="1.8" fill="${isBw ? 'none' : 'rgba(168, 85, 247, 0.06)'}"/>

        <!-- Inscribed Sacred Circle with Orbit Nodes -->
        <circle cx="100" cy="100" r="42" stroke="${strokeBright}" stroke-width="1.4" stroke-dasharray="3 2"/>
        <circle cx="100" cy="58" r="2.5" fill="${strokeBright}"/>
        <circle cx="100" cy="142" r="2.5" fill="${strokeBright}"/>
        <circle cx="58" cy="100" r="2.5" fill="${strokeBright}"/>
        <circle cx="142" cy="100" r="2.5" fill="${strokeBright}"/>

        <!-- Central Diamond Prism / Celestial Eye of the Ancient Relic -->
        <path d="M 62,100 Q 100,74 138,100 Q 100,126 62,100 Z" fill="${fillShieldBg}" stroke="${strokeBright}" stroke-width="2"/>
        <circle cx="100" cy="100" r="15" fill="url(#item-prism-eye-${isBw ? 'bw' : 'col'})" stroke="${strokeGold}" stroke-width="1.5"/>
        <circle cx="100" cy="100" r="6" fill="${isBw ? '#000000' : '#ffffff'}"/>
        <circle cx="102" cy="98" r="2.2" fill="${isBw ? '#ffffff' : '#f5c842'}"/>
      </svg>
    `;
  }

  // --- Arcane Magic Circle Vector Generator (for Spells mixed into deck) ---
  function getMagicCircleSvg(isBw = false, isCompact = false) {
    const strokeColor = isBw ? '#000000' : '#ff4d29';
    const strokeAlt = isBw ? '#000000' : '#f59e0b';
    const textColor = isBw ? '#000000' : '#ffedd5';
    const glowClass = isBw ? '' : 'style="filter: drop-shadow(0 0 5px rgba(255, 77, 41, 0.65));"';

    const pts = [
      [100, 25], [144.08, 39.32], [171.33, 76.82], [171.33, 123.18], [144.08, 160.68],
      [100, 175], [55.92, 160.68], [28.67, 123.18], [28.67, 76.82], [55.92, 39.32]
    ];

    let chordLines = '';
    for (let i = 0; i < 10; i++) {
      const p1 = pts[i];
      const p2 = pts[(i + 3) % 10];
      const p3 = pts[(i + 4) % 10];
      chordLines += `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="${strokeColor}" stroke-width="1.3"/>`;
      chordLines += `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p3[0]}" y2="${p3[1]}" stroke="${strokeAlt}" stroke-width="1.1"/>`;
    }

    const glyphs = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ'];
    const nodeRadius = 55;
    let nodeCircles = '';
    for (let i = 0; i < 10; i++) {
      const rad = (i * 36 - 90) * Math.PI / 180;
      const nx = +(100 + nodeRadius * Math.cos(rad)).toFixed(2);
      const ny = +(100 + nodeRadius * Math.sin(rad)).toFixed(2);
      nodeCircles += `
        <circle cx="${nx}" cy="${ny}" r="4.2" fill="${isBw ? '#ffffff' : 'rgba(13, 13, 26, 0.9)'}" stroke="${strokeColor}" stroke-width="1.2"/>
        <text x="${nx}" y="${ny + 1.2}" text-anchor="middle" dominant-baseline="middle" font-family="'Cinzel', Georgia, serif" font-weight="700" font-size="5" fill="${textColor}">${glyphs[i]}</text>
      `;
    }

    return `
      <svg class="card-back__relic-svg ${isCompact ? 'card-back__relic-svg--compact' : ''}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" ${glowClass}>
        <defs>
          <path id="item-spell-circle-runepath" d="M 100,14 A 86,86 0 1,1 99.9,14" fill="none" />
          <radialGradient id="item-spell-circle-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${isBw ? 'transparent' : 'rgba(255, 77, 41, 0.22)'}"/>
            <stop offset="70%" stop-color="${isBw ? 'transparent' : 'rgba(245, 158, 11, 0.08)'}"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="url(#item-spell-circle-glow)"/>
        <circle cx="100" cy="100" r="94" stroke="${strokeColor}" stroke-width="2.2"/>
        <circle cx="100" cy="100" r="91" stroke="${strokeAlt}" stroke-width="1"/>
        <circle cx="100" cy="100" r="77" stroke="${strokeAlt}" stroke-width="1"/>
        <circle cx="100" cy="100" r="75" stroke="${strokeColor}" stroke-width="1.8"/>
        <text font-family="'Cinzel', Georgia, serif" font-size="7" font-weight="600" fill="${textColor}" letter-spacing="4px">
          <textPath href="#item-spell-circle-runepath">✦ ARCANUM ✦ MAGICA ✦ POTENTIA ✦ AETERNA ✦ VITA ✦ MORTIS ✦ CAELUM ✦</textPath>
        </text>
        <g stroke-linecap="round">${chordLines}</g>
        <circle cx="100" cy="100" r="55" stroke="${strokeColor}" stroke-width="1.2" stroke-dasharray="2 1.5"/>
        <circle cx="100" cy="100" r="38" stroke="${strokeAlt}" stroke-width="1.4"/>
        <circle cx="100" cy="100" r="35" stroke="${strokeColor}" stroke-width="1.8"/>
        ${nodeCircles}
        <circle cx="100" cy="100" r="22" stroke="${strokeColor}" stroke-width="1.2" fill="${isBw ? 'none' : 'rgba(255, 77, 41, 0.12)'}"/>
        <polygon points="100,81 116,94 110,113 90,113 84,94" stroke="${strokeAlt}" stroke-width="1" fill="none"/>
        <circle cx="100" cy="100" r="5" fill="${isBw ? '#000000' : '#ff4d29'}"/>
      </svg>
    `;
  }

  // --- State ---
  const state = {
    deck: [],
    customItems: [],
    settings: {
      preset: 'a4-gap',
      widthMm: 64.0,
      heightMm: 91.0,
      gapMm: 2.5,
      cornerStyle: 'rounded',
      printBacks: true,
      colorMode: 'color',
      backDesignMode: 'separate' // 'separate' or 'unified'
    }
  };

  // --- Helpers ---
  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  function getAllItems() {
    return [...ITEMS_DATA, ...state.customItems];
  }

  function applyCardDimensions() {
    const w = parseFloat(state.settings.widthMm) || 64.0;
    const h = parseFloat(state.settings.heightMm) || 91.0;
    const g = parseFloat(state.settings.gapMm) || 0.0;
    const radius = state.settings.cornerStyle === 'sharp' ? '0mm' : '2.5mm';
    document.documentElement.style.setProperty('--card-width', `${w}mm`);
    document.documentElement.style.setProperty('--card-height', `${h}mm`);
    document.documentElement.style.setProperty('--card-gap', `${g}mm`);
    document.documentElement.style.setProperty('--card-radius', radius);
  }

  // --- Shared Settings Sync Across Tools ---
  const SHARED_SETTINGS_KEY = 'dnd_shared_card_print_settings';

  function getSharedSettings() {
    try {
      const raw = localStorage.getItem(SHARED_SETTINGS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  function saveSharedSettings(settings) {
    try {
      localStorage.setItem(SHARED_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {}
  }

  // --- LocalStorage persistence ---
  function saveDeckToStorage() {
    try {
      localStorage.setItem('dnd_master_item_deck_v1', JSON.stringify({
        deck: state.deck,
        settings: state.settings,
        customItems: state.customItems
      }));
      saveSharedSettings(state.settings);
    } catch (e) {
      console.warn('Item deck save error', e);
    }
  }

  function loadDeckFromStorage() {
    try {
      // 1. Check shared print settings first to stay 1-to-1 synchronized!
      const shared = getSharedSettings();
      if (shared) {
        state.settings = { ...state.settings, ...shared };
      }

      // 2. Load item tool specifics
      const raw = localStorage.getItem('dnd_master_item_deck_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.customItems && Array.isArray(parsed.customItems)) {
          state.customItems = parsed.customItems;
        }
        if (parsed.deck && Array.isArray(parsed.deck)) {
          state.deck = parsed.deck;
        }
        if (parsed.settings && !shared) {
          state.settings = { ...state.settings, ...parsed.settings };
        }
      }
    } catch (e) {
      console.warn('Item deck load error', e);
    }

    // Default starter deck if empty
    if (state.deck.length === 0) {
      const sampleIds = ['holy-avenger', 'sun-blade', 'staff-of-power', 'ring-of-protection', 'potion-of-healing', 'vorpal-sword', 'eye-of-vecna', 'boots-of-speed', 'bag-of-holding'];
      const all = getAllItems();
      sampleIds.forEach(id => {
        const item = all.find(it => it.id === id);
        if (item) state.deck.push(item);
      });
    }
  }

  // Listen to cross-window or cross-tab print size changes
  window.addEventListener('storage', (e) => {
    if (e.key === SHARED_SETTINGS_KEY && e.newValue) {
      try {
        const newSettings = JSON.parse(e.newValue);
        state.settings = { ...state.settings, ...newSettings };
        syncUiSettingsControls();
        applyCardDimensions();
        renderSheets();
      } catch (err) {}
    }
  });

  function syncUiSettingsControls() {
    const presetSelect = document.getElementById('select-size-preset');
    const toggleBacks = document.getElementById('toggle-print-backs');
    const colorModeSelect = document.getElementById('select-color-mode');
    const cornerStyleSelect = document.getElementById('select-corner-style');
    const backStyleSelect = document.getElementById('select-back-style');

    if (presetSelect) presetSelect.value = state.settings.preset || 'a4-gap';
    if (toggleBacks) toggleBacks.checked = state.settings.printBacks !== false;
    if (colorModeSelect) colorModeSelect.value = state.settings.colorMode || 'color';
    if (cornerStyleSelect) cornerStyleSelect.value = state.settings.cornerStyle || 'rounded';
    if (backStyleSelect) backStyleSelect.value = state.settings.backDesignMode || 'separate';
  }

  // --- Text Formatting Helper ---
  function formatDescription(desc) {
    if (!desc) return '';
    return desc
      .split('\n\n')
      .map(p => {
        let text = p.trim();
        if (!text) return '';

        // Highlight dice rolls: 1к6, 2к8+3, etc.
        text = text.replace(/(\b\d+к\d+(?:\s*[+-]\s*\d+)?\b)/g, '<strong>$1</strong>');

        // Highlight Difficulty Class (СЛ 15, СЛ 17)
        text = text.replace(/(СЛ\s*\d+)/g, '<strong>$1</strong>');

        // Highlight attack bonuses: +1, +2, +3
        text = text.replace(/(\+[1-3]\s*к\s*(?:броскам\s*атаки\s*и\s*урона|атакам|броскам|КД))/g, '<strong>$1</strong>');

        return `<p>${text}</p>`;
      })
      .join('');
  }

  // --- Split Long Item Content (Carries to Card Back) ---
  function splitItemContent(item) {
    const desc = item.description || '';
    if (desc.length <= 700) {
      return {
        hasBackContent: false,
        frontDesc: desc,
        backDesc: ''
      };
    }

    const paragraphs = desc.split('\n\n');
    let front = [];
    let back = [];
    let cum = 0;

    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i].trim();
      if (!p) continue;
      if (cum === 0 || (cum + p.length <= 600 && i < paragraphs.length - 1)) {
        front.push(p);
        cum += p.length;
      } else {
        back.push(p);
      }
    }

    return {
      hasBackContent: back.length > 0,
      frontDesc: front.join('\n\n'),
      backDesc: back.join('\n\n')
    };
  }

  // --- Create Item Card Element (Front Side) ---
  function createItemCardElement(item, isZoom = false, split = null) {
    // 1. If it's a Spell Card (mixed in via slot-filler)
    if (item.isSpell) {
      return createSpellCardElement(item, isZoom);
    }

    // 2. If it's a Note / Loot blank card
    if (item.isNoteBlank) {
      return createNoteBlankCardElement(item, isZoom);
    }

    const card = document.createElement('article');
    const rarity = item.rarity || 'common';
    const rarityDef = ITEM_RARITIES[rarity] || ITEM_RARITIES.common;

    card.className = `item-card item-card--${rarity}`;
    card.setAttribute('data-id', item.id);

    const descToUse = split ? split.frontDesc : item.description;

    // Charges Tracker Generation
    let chargesHtml = '';
    const chargeCount = parseInt(item.charges, 10) || 0;
    if (chargeCount > 0) {
      const pips = Array.from({ length: Math.min(chargeCount, 15) }, () => '○').join(' ');
      const extraCountText = chargeCount > 15 ? ` (+${chargeCount - 15})` : '';
      chargesHtml = `
        <div class="item-card__charges-row">
          <div class="item-card__charges-line">
            <span>Заряды (${chargeCount}):</span>
            <span class="item-card__charge-pips" title="Отмечайте потраченные заряды карандашом">${pips}${extraCountText}</span>
          </div>
          ${item.chargesReset ? `<div class="item-card__charges-reset">${item.chargesReset}</div>` : ''}
        </div>
      `;
    }

    const attunementBadge = item.attunement ? `<span class="item-card__attunement-badge">★ Настройка</span>` : '';
    const propertiesRibbon = item.properties ? `<div class="item-card__props-ribbon">⚔️ ${item.properties}</div>` : '';

    card.innerHTML = `
      <div class="item-card__border"></div>

      <!-- Header -->
      <header class="item-card__header">
        <div class="item-card__header-left">
          <span class="item-card__icon">${item.icon || '✨'}</span>
          <div class="item-card__title-group">
            <span class="item-card__title" title="${item.name}">${item.name}</span>
            <span class="item-card__subtitle">${item.nameEn || item.categoryName || ''}</span>
          </div>
        </div>
        <div class="item-card__header-badges">
          <span class="item-card__rarity-badge">${rarityDef.name}</span>
          ${attunementBadge}
        </div>
      </header>

      <!-- Sub-ribbon (Category, Weight, Cost) -->
      <div class="item-card__meta-bar">
        <span class="item-card__meta-type">${item.categoryName || 'Магический предмет'}</span>
        <div class="item-card__meta-stats">
          ${item.weight && item.weight !== '—' ? `<span>⚖️ ${item.weight}</span>` : ''}
          ${item.cost && item.cost !== '—' ? `<span>💰 ${item.cost}</span>` : ''}
        </div>
      </div>

      <!-- Properties Ribbon -->
      ${propertiesRibbon}

      <!-- Charges Tracker Row -->
      ${chargesHtml}

      <!-- Main Description Body -->
      <div class="item-card__body">
        <div class="item-card__text">
          ${formatDescription(descToUse)}
        </div>
        ${item.lore ? `<div class="item-card__lore">${item.lore}</div>` : ''}
      </div>

      <!-- Footer Signature -->
      <footer class="item-card__footer">
        <span>D&amp;D 5e • ${rarityDef.name}</span>
        <span>By Shiz</span>
      </footer>
    `;

    if (!isZoom) {
      card.addEventListener('click', () => openCardZoomModal(item, 'front'));
    }

    return card;
  }

  // --- Spell Card Element Generator (For Mixed Slot-Filling) ---
  function createSpellCardElement(spell, isZoom = false) {
    const card = document.createElement('article');
    card.className = 'item-card item-card--rare';
    card.setAttribute('data-id', spell.id);
    card.style.setProperty('--card-rarity-color', '#3b82f6');

    const levelText = spell.level === 0 ? 'Заговор' : `${spell.level} круг`;

    card.innerHTML = `
      <div class="item-card__border"></div>
      <header class="item-card__header" style="background: #1a1a2e;">
        <div class="item-card__header-left">
          <span class="item-card__icon">📜</span>
          <div class="item-card__title-group">
            <span class="item-card__title" title="${spell.name}">${spell.name}</span>
            <span class="item-card__subtitle">${spell.nameEn || spell.school}</span>
          </div>
        </div>
        <div class="item-card__header-badges">
          <span class="item-card__rarity-badge" style="background: #3b82f6;">${levelText}</span>
          <span class="item-card__attunement-badge">${spell.school || ''}</span>
        </div>
      </header>

      <div class="item-card__meta-bar">
        <span class="item-card__meta-type">⏳ ${spell.castingTime || '1 действие'} • 📏 ${spell.range || '30 фт'}</span>
        <div class="item-card__meta-stats">
          <span>🕒 ${spell.duration || 'Мгновенная'}</span>
        </div>
      </div>

      <div class="item-card__props-ribbon" style="color: #2b5fa8;">
        Компоненты: ${spell.components || 'В, С'} ${spell.classes ? `• ${(spell.classes).slice(0, 3).join(', ')}` : ''}
      </div>

      <div class="item-card__body">
        <div class="item-card__text">
          ${formatDescription(spell.description)}
        </div>
      </div>

      <footer class="item-card__footer">
        <span>D&amp;D 5e • Заклинание</span>
        <span>By Shiz</span>
      </footer>
    `;

    if (!isZoom) {
      card.addEventListener('click', () => openCardZoomModal(spell, 'front'));
    }

    return card;
  }

  // --- Note / Loot Blank Card Element ---
  function createNoteBlankCardElement(blankItem, isZoom = false) {
    const card = document.createElement('article');
    card.className = 'item-card item-card--common';
    card.setAttribute('data-id', blankItem.id);

    card.innerHTML = `
      <div class="item-card__border"></div>
      <header class="item-card__header" style="background: #2b251d;">
        <div class="item-card__header-left">
          <span class="item-card__icon">📝</span>
          <div class="item-card__title-group">
            <span class="item-card__title">Трофей / Заметка</span>
            <span class="item-card__subtitle">Loot &amp; Notes</span>
          </div>
        </div>
        <div class="item-card__header-badges">
          <span class="item-card__rarity-badge" style="background: #6b7280;">Бланк</span>
        </div>
      </header>

      <div class="item-card__meta-bar">
        <span>Владелец: ___________________</span>
        <span>Цена: ________</span>
      </div>

      <div class="item-card__body" style="padding: 2mm 3mm; justify-content: flex-start; gap: 2.5mm;">
        <div style="font-size: 1.9mm; font-weight: 700; color: #4a4237; border-bottom: 0.3mm dotted #999; padding-bottom: 1.2mm;">
          Предмет: _____________________________________
        </div>
        <div style="font-size: 1.8mm; color: #666; line-height: 2.2;">
          <div>Свойства / Эффект:</div>
          <div style="border-bottom: 0.25mm dotted #bbb; height: 3.5mm;"></div>
          <div style="border-bottom: 0.25mm dotted #bbb; height: 3.5mm;"></div>
          <div style="border-bottom: 0.25mm dotted #bbb; height: 3.5mm;"></div>
          <div style="border-bottom: 0.25mm dotted #bbb; height: 3.5mm;"></div>
          <div style="border-bottom: 0.25mm dotted #bbb; height: 3.5mm;"></div>
        </div>
      </div>

      <footer class="item-card__footer">
        <span>DnD Master Tools • Бланк добычи</span>
        <span>By Shiz</span>
      </footer>
    `;

    if (!isZoom) {
      card.addEventListener('click', () => openCardZoomModal(blankItem, 'front'));
    }

    return card;
  }

  // --- Create Card Back Cover Element ---
  function createCardBackElement(item, split = null, isBw = false, isZoom = false) {
    const back = document.createElement('div');
    back.className = 'card-back';

    const isUnified = state.settings.backDesignMode === 'unified';

    // 1. If it's a Spell Card added via slot filler
    if (item && item.isSpell) {
      const title = isUnified ? 'D&amp;D 5E' : 'D&amp;D SPELL';
      const emblemSvg = isUnified ? getD20Svg(isBw, false) : getSpellCircleSvg(isBw, false);
      back.innerHTML = `
        <div class="card-back__inner-frame"></div>
        <div class="card-back__corner card-back__corner--tl"></div>
        <div class="card-back__corner card-back__corner--tr"></div>
        <div class="card-back__corner card-back__corner--bl"></div>
        <div class="card-back__corner card-back__corner--br"></div>
        <div class="card-back__emblem">
          ${emblemSvg}
          <div class="card-back__title">${title}</div>
          <div class="card-back__signature">By Shiz</div>
        </div>
      `;
      return back;
    }

    // 2. If it has Continuation Content on Back
    if (split && split.hasBackContent) {
      const emblemSvg = isUnified ? getD20Svg(isBw, true) : getArtifactPrismSvg(isBw, true);
      back.innerHTML = `
        <div class="card-back__continuation-block">
          <div class="card-back__cont-header">
            <span class="card-back__cont-title">${item.name}</span>
            <span class="card-back__cont-badge">Продолжение</span>
          </div>
          <div class="card-back__cont-text">
            ${formatDescription(split.backDesc)}
          </div>
        </div>
        <div class="card-back__emblem card-back__emblem--compact">
          ${emblemSvg}
          <div class="card-back__signature">By Shiz</div>
        </div>
      `;
      return back;
    }

    // 3. Normal Pure Ornamental Back Cover
    if (isUnified) {
      back.innerHTML = `
        <div class="card-back__inner-frame"></div>
        <div class="card-back__corner card-back__corner--tl"></div>
        <div class="card-back__corner card-back__corner--tr"></div>
        <div class="card-back__corner card-back__corner--bl"></div>
        <div class="card-back__corner card-back__corner--br"></div>
        <div class="card-back__emblem">
          ${getD20Svg(isBw, false)}
          <div class="card-back__title">D&amp;D 5E</div>
          <div class="card-back__signature">By Shiz</div>
        </div>
      `;
    } else {
      back.innerHTML = `
        <div class="card-back__inner-frame"></div>
        <div class="card-back__corner card-back__corner--tl"></div>
        <div class="card-back__corner card-back__corner--tr"></div>
        <div class="card-back__corner card-back__corner--bl"></div>
        <div class="card-back__corner card-back__corner--br"></div>
        <div class="card-back__emblem">
          ${getArtifactPrismSvg(isBw, false)}
          <div class="card-back__title">D&amp;D ARTIFACT</div>
          <div class="card-back__signature">By Shiz</div>
        </div>
      `;
    }

    return back;
  }

  // --- Render Sheets (Strictly 3x3 Cards per A4 Page) ---
  function renderSheets() {
    const container = document.getElementById('sheets-container');
    if (!container) return;
    container.innerHTML = '';

    applyCardDimensions();

    const isBw = state.settings.colorMode === 'bw';
    document.body.classList.toggle('theme--bw', isBw);

    const items = state.deck;
    const cardsPerPage = 9;
    const totalPages = Math.ceil(items.length / cardsPerPage) || 1;

    // Update Deck Summary Text & Slot Filler Button
    const summaryEl = document.getElementById('deck-summary-text');
    if (summaryEl) {
      summaryEl.textContent = `Карт в колоде: ${items.length} (${totalPages} ${totalPages === 1 ? 'лист А4' : 'листа А4'})`;
    }

    updateSlotFillerButton();

    for (let page = 0; page < totalPages; page++) {
      const startIndex = page * cardsPerPage;
      const pageItems = items.slice(startIndex, startIndex + cardsPerPage);

      // 1. FRONT SHEET
      const frontSheet = document.createElement('section');
      frontSheet.className = 'print-sheet print-sheet--front';
      frontSheet.setAttribute('data-sheet-title', `Лист ${page + 1} из ${totalPages} (Лицевая сторона)`);
      frontSheet.innerHTML = `<div class="cards-grid"></div>`;
      const frontGrid = frontSheet.querySelector('.cards-grid');

      const pageSlots = [];
      for (let i = 0; i < cardsPerPage; i++) {
        if (i < pageItems.length) {
          const item = pageItems[i];
          const split = state.settings.printBacks ? splitItemContent(item) : null;
          pageSlots.push({ item, split, isBlank: false });
        } else {
          pageSlots.push({ item: null, split: null, isBlank: true });
        }
      }

      pageSlots.forEach(slot => {
        if (slot.isBlank) {
          const blank = document.createElement('div');
          blank.className = 'item-card item-card--blank';
          blank.innerHTML = '<span>✦ ПУСТАЯ КАРТА ✦</span>';
          frontGrid.appendChild(blank);
        } else {
          frontGrid.appendChild(createItemCardElement(slot.item, false, slot.split));
        }
      });

      container.appendChild(frontSheet);

      // 2. BACK SHEET (Horizontally mirrored columns: [2,1,0, 5,4,3, 8,7,6] for duplex printing)
      if (state.settings.printBacks) {
        const backSheet = document.createElement('section');
        backSheet.className = 'print-sheet print-sheet--back';
        backSheet.setAttribute('data-sheet-title', `Лист ${page + 1} из ${totalPages} (Рубашка — зеркально)`);
        backSheet.innerHTML = `<div class="cards-grid"></div>`;
        const backGrid = backSheet.querySelector('.cards-grid');

        const mirroredIndices = [2, 1, 0, 5, 4, 3, 8, 7, 6];

        mirroredIndices.forEach(idx => {
          const slot = pageSlots[idx];
          if (!slot || slot.isBlank) {
            const blank = document.createElement('div');
            blank.className = 'card-back item-card--blank';
            blank.style.opacity = '0.15';
            blank.innerHTML = '<span>✦ ПУСТАЯ РУБАШКА ✦</span>';
            backGrid.appendChild(blank);
          } else {
            backGrid.appendChild(createCardBackElement(slot.item, slot.split, isBw));
          }
        });

        container.appendChild(backSheet);
      }
    }
  }

  // --- Slot Filler Status Checker & Button Updater ---
  function updateSlotFillerButton() {
    const btn = document.getElementById('btn-open-slot-filler');
    if (!btn) return;

    const count = state.deck.length;
    const remainder = count % 9;
    const needed = remainder === 0 ? 0 : 9 - remainder;

    if (needed > 0) {
      btn.style.display = 'inline-flex';
      btn.innerHTML = `✨ Заполнить лист (+${needed})`;
      btn.setAttribute('data-needed', needed);
    } else {
      btn.style.display = 'none';
    }
  }

  // --- Slot Filler Modal Handlers ---
  function openSlotFillerModal() {
    const modal = document.getElementById('slot-filler-modal');
    const neededEl = document.getElementById('slot-filler-needed-count');
    if (!modal) return;

    const count = state.deck.length;
    const remainder = count % 9;
    const needed = remainder === 0 ? 0 : 9 - remainder;

    if (neededEl) neededEl.textContent = needed;
    modal.classList.add('open');
  }

  function closeSlotFillerModal() {
    document.getElementById('slot-filler-modal')?.classList.remove('open');
  }

  function executeSlotFill(type) {
    const count = state.deck.length;
    const remainder = count % 9;
    const needed = remainder === 0 ? 0 : 9 - remainder;

    if (needed === 0) {
      showToast('Лист уже полностью заполнен (кратен 9)!');
      closeSlotFillerModal();
      return;
    }

    if (type === 'potions') {
      // Pick useful potions & scrolls
      const all = getAllItems();
      const potionScrolls = all.filter(it => it.category === 'potion' || it.category === 'scroll');
      for (let i = 0; i < needed; i++) {
        const itemToCopy = potionScrolls[i % potionScrolls.length] || all[0];
        // Clone with unique instance id
        state.deck.push({ ...itemToCopy, instanceId: 'inst_' + Math.random().toString(36).slice(2, 9) });
      }
      showToast(`Добавлено ${needed} полезных зелий и свитков!`);
    } else if (type === 'spells') {
      // Pick iconic spells from SPELLS_DATA if available
      const spells = (typeof SPELLS_DATA !== 'undefined' && Array.isArray(SPELLS_DATA)) ? SPELLS_DATA : [];
      if (spells.length > 0) {
        const popularSpellIds = ['shield', 'fireball', 'cure-wounds', 'misty-step', 'magic-missile', 'healing-word', 'counterspell', 'haste', 'spirit-guardians'];
        const selectedSpells = spells.filter(s => popularSpellIds.includes(s.id));
        const pool = selectedSpells.length > 0 ? selectedSpells : spells;

        for (let i = 0; i < needed; i++) {
          const sp = pool[i % pool.length];
          state.deck.push({
            id: 'spell_' + sp.id + '_' + i,
            name: sp.name,
            nameEn: sp.nameEn,
            school: sp.school,
            level: sp.level,
            castingTime: sp.castingTime,
            range: sp.range,
            components: sp.components,
            duration: sp.duration,
            description: sp.description,
            classes: sp.classes,
            isSpell: true,
            instanceId: 'inst_' + Math.random().toString(36).slice(2, 9)
          });
        }
        showToast(`Добавлено ${needed} карт заклинаний к листу!`);
      } else {
        showToast('База заклинаний не найдена');
      }
    } else if (type === 'duplicates') {
      // Duplicate existing deck cards
      if (state.deck.length === 0) {
        showToast('Колода пуста, нечего дублировать');
        return;
      }
      const existing = [...state.deck];
      for (let i = 0; i < needed; i++) {
        const it = existing[i % existing.length];
        state.deck.push({ ...it, instanceId: 'inst_' + Math.random().toString(36).slice(2, 9) });
      }
      showToast(`Продублировано ${needed} карт из колоды!`);
    } else if (type === 'notes') {
      // Add Blank Loot / Notes cards
      for (let i = 0; i < needed; i++) {
        state.deck.push({
          id: 'note_blank_' + Date.now() + '_' + i,
          name: 'Бланк трофеев',
          nameEn: 'Loot Tracker',
          category: 'wondrous',
          rarity: 'common',
          isNoteBlank: true,
          instanceId: 'inst_' + Math.random().toString(36).slice(2, 9)
        });
      }
      showToast(`Добавлено ${needed} бланков для заметок и трофеев!`);
    }

    closeSlotFillerModal();
    renderDeckList();
    renderSheets();
    saveDeckToStorage();
  }

  // --- Catalog & Deck List Rendering ---
  function renderCatalogList() {
    const listEl = document.getElementById('catalog-list');
    const searchVal = (document.getElementById('search-item')?.value || '').toLowerCase().trim();
    const catVal = document.getElementById('filter-catalog-category')?.value || 'all';
    const rarityVal = document.getElementById('filter-catalog-rarity')?.value || 'all';

    if (!listEl) return;
    listEl.innerHTML = '';

    const all = getAllItems();
    const filtered = all.filter(item => {
      // 1. Search text
      if (searchVal) {
        const matchName = (item.name || '').toLowerCase().includes(searchVal);
        const matchEn = (item.nameEn || '').toLowerCase().includes(searchVal);
        const matchDesc = (item.description || '').toLowerCase().includes(searchVal);
        if (!matchName && !matchEn && !matchDesc) return false;
      }

      // 2. Category
      if (catVal === 'custom') {
        if (!state.customItems.some(c => c.id === item.id)) return false;
      } else if (catVal !== 'all' && item.category !== catVal) {
        return false;
      }

      // 3. Rarity
      if (rarityVal !== 'all' && item.rarity !== rarityVal) {
        return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = '<div style="padding: 10px; color: var(--color-text-muted); font-size: var(--fs-xs); text-align: center;">Ничего не найдено</div>';
      return;
    }

    filtered.forEach(item => {
      const row = document.createElement('div');
      row.className = 'catalog-item-row';

      const rarityDef = ITEM_RARITIES[item.rarity] || ITEM_RARITIES.common;

      row.innerHTML = `
        <div class="catalog-item-row__info">
          <span class="catalog-item-row__icon">${item.icon || '✨'}</span>
          <div class="catalog-item-row__names">
            <span class="catalog-item-row__title">${item.name}</span>
            <span class="catalog-item-row__meta" style="color: ${rarityDef.color}">${rarityDef.name} • ${item.categoryName || item.category}</span>
          </div>
        </div>
        <div class="catalog-item-row__actions">
          <button class="btn-add-item" title="Добавить в колоду печати">+</button>
        </div>
      `;

      row.querySelector('.btn-add-item').addEventListener('click', (e) => {
        e.stopPropagation();
        addItemToDeck(item);
      });

      row.addEventListener('click', () => {
        openCardZoomModal(item, 'front');
      });

      listEl.appendChild(row);
    });
  }

  function addItemToDeck(item) {
    state.deck.push({ ...item, instanceId: 'inst_' + Math.random().toString(36).slice(2, 9) });
    renderDeckList();
    renderSheets();
    saveDeckToStorage();
    showToast(`Добавлено: ${item.name}`);
  }

  function renderDeckList() {
    const listEl = document.getElementById('deck-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    if (state.deck.length === 0) {
      listEl.innerHTML = '<div style="padding: 8px; color: var(--color-text-muted); font-size: var(--fs-xs); text-align: center;">Колода пуста</div>';
      return;
    }

    state.deck.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'deck-item-row';

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
          <span style="font-size: 1rem;">${item.icon || '✨'}</span>
          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--color-text-parchment);">${item.name}</span>
        </div>
        <button class="deck-item-row__del" title="Удалить из колоды">✕</button>
      `;

      row.querySelector('.deck-item-row__del').addEventListener('click', (e) => {
        e.stopPropagation();
        state.deck.splice(index, 1);
        renderDeckList();
        renderSheets();
        saveDeckToStorage();
      });

      row.addEventListener('click', () => {
        openCardZoomModal(item, 'front');
      });

      listEl.appendChild(row);
    });
  }

  // --- Preset & Custom Size Modal Handlers ---
  function handlePresetSelect(presetVal) {
    state.settings.preset = presetVal;

    if (presetVal === 'a4-gap') {
      state.settings.widthMm = 64.0;
      state.settings.heightMm = 91.0;
      state.settings.gapMm = 2.5;
      renderSheets();
      saveDeckToStorage();
    } else if (presetVal === 'a4-max') {
      state.settings.widthMm = 66.0;
      state.settings.heightMm = 94.0;
      state.settings.gapMm = 0.0;
      renderSheets();
      saveDeckToStorage();
    } else if (presetVal === 'mtg') {
      state.settings.widthMm = 63.5;
      state.settings.heightMm = 88.9;
      state.settings.gapMm = 3.0;
      renderSheets();
      saveDeckToStorage();
    } else if (presetVal === 'bridge') {
      state.settings.widthMm = 57.0;
      state.settings.heightMm = 89.0;
      state.settings.gapMm = 4.0;
      renderSheets();
      saveDeckToStorage();
    } else if (presetVal === 'custom') {
      openCustomSizeModal();
    }
  }

  function openCustomSizeModal() {
    const modal = document.getElementById('custom-size-modal');
    const inputW = document.getElementById('modal-input-width');
    const inputH = document.getElementById('modal-input-height');
    const inputG = document.getElementById('modal-input-gap');

    if (inputW) inputW.value = state.settings.widthMm;
    if (inputH) inputH.value = state.settings.heightMm;
    if (inputG) inputG.value = state.settings.gapMm !== undefined ? state.settings.gapMm : 2.5;

    modal?.classList.add('open');
  }

  function closeCustomSizeModal() {
    document.getElementById('custom-size-modal')?.classList.remove('open');
  }

  function applyCustomDimensions() {
    const inputW = document.getElementById('modal-input-width');
    const inputH = document.getElementById('modal-input-height');
    const inputG = document.getElementById('modal-input-gap');

    const w = parseFloat(inputW?.value) || 64.0;
    const h = parseFloat(inputH?.value) || 91.0;
    const g = parseFloat(inputG?.value) >= 0 ? parseFloat(inputG.value) : 2.5;

    state.settings.widthMm = w;
    state.settings.heightMm = h;
    state.settings.gapMm = g;
    state.settings.preset = 'custom';

    const presetSelect = document.getElementById('select-size-preset');
    if (presetSelect) presetSelect.value = 'custom';

    closeCustomSizeModal();
    renderSheets();
    saveDeckToStorage();
    showToast(`Установлен размер: ${w} × ${h} мм (зазор ${g} мм)`);
  }

  // --- Custom Item Modal Handlers ---
  function openCustomItemModal() {
    const modal = document.getElementById('custom-item-modal');
    if (!modal) return;
    document.getElementById('custom-item-form')?.reset();
    document.getElementById('ci-id').value = '';
    modal.classList.add('open');
  }

  function closeCustomItemModal() {
    document.getElementById('custom-item-modal')?.classList.remove('open');
  }

  function saveCustomItem() {
    const name = document.getElementById('ci-name')?.value.trim();
    if (!name) {
      showToast('Введите название артефакта');
      return;
    }

    const newItem = {
      id: document.getElementById('ci-id')?.value || 'custom_item_' + Date.now(),
      name: name,
      nameEn: document.getElementById('ci-name-en')?.value.trim(),
      category: document.getElementById('ci-category')?.value || 'wondrous',
      categoryName: document.getElementById('ci-category-name')?.value.trim() || 'Магический предмет',
      rarity: document.getElementById('ci-rarity')?.value || 'artifact',
      icon: document.getElementById('ci-icon')?.value.trim() || '👑',
      weight: document.getElementById('ci-weight')?.value.trim() || '—',
      cost: document.getElementById('ci-cost')?.value.trim() || 'Бесценно',
      attunement: document.getElementById('ci-attunement')?.value.trim() || '',
      charges: parseInt(document.getElementById('ci-charges')?.value, 10) || 0,
      chargesReset: document.getElementById('ci-charges-reset')?.value.trim() || '',
      properties: document.getElementById('ci-properties')?.value.trim() || '',
      description: document.getElementById('ci-desc')?.value.trim() || '',
      lore: document.getElementById('ci-lore')?.value.trim() || ''
    };

    const existingIdx = state.customItems.findIndex(it => it.id === newItem.id);
    if (existingIdx >= 0) {
      state.customItems[existingIdx] = newItem;
    } else {
      state.customItems.push(newItem);
    }

    addItemToDeck(newItem);
    closeCustomItemModal();
    renderCatalogList();
    showToast(`Артефакт «${newItem.name}» успешно сохранён!`);
  }

  // --- Zoom Lightbox Modal ---
  let currentZoomItem = null;
  let currentZoomSide = 'front';

  function renderZoomCard(item, side = 'front') {
    const container = document.getElementById('zoom-modal-card-target');
    const btnFront = document.getElementById('zoom-btn-front');
    const btnBack = document.getElementById('zoom-btn-back');
    if (!container || !item) return;

    currentZoomItem = item;
    currentZoomSide = side;

    const isBw = state.settings.colorMode === 'bw';
    const split = state.settings.printBacks ? splitItemContent(item) : null;

    if (btnFront && btnBack) {
      btnFront.classList.toggle('active', side === 'front');
      btnBack.classList.toggle('active', side === 'back');
      if (item.isSpell) {
        btnBack.innerHTML = '🎴 Рубашка заклинания (Круг)';
      } else {
        btnBack.innerHTML = '👑 Рубашка артефакта (Реликвия)';
      }
    }

    container.innerHTML = '';
    if (side === 'front') {
      const cardEl = createItemCardElement(item, true, split);
      container.appendChild(cardEl);
    } else {
      const backEl = createCardBackElement(item, split, isBw, true);
      container.appendChild(backEl);
    }
  }

  function openCardZoomModal(item, side = 'front') {
    const modal = document.getElementById('card-zoom-modal');
    if (!modal || !item) return;
    renderZoomCard(item, side);
    modal.classList.add('open');
  }

  function closeCardZoomModal() {
    document.getElementById('card-zoom-modal')?.classList.remove('open');
    currentZoomItem = null;
  }

  // --- Initialization ---
  function init() {
    loadDeckFromStorage();
    syncUiSettingsControls();
    applyCardDimensions();
    renderCatalogList();
    renderDeckList();
    renderSheets();

    // Event Listeners: Preset Select
    document.getElementById('select-size-preset')?.addEventListener('change', (e) => {
      handlePresetSelect(e.target.value);
    });

    // Event Listeners: Backs Toggle
    document.getElementById('toggle-print-backs')?.addEventListener('change', (e) => {
      state.settings.printBacks = e.target.checked;
      renderSheets();
      saveDeckToStorage();
    });

    // Event Listeners: Color Mode
    document.getElementById('select-color-mode')?.addEventListener('change', (e) => {
      state.settings.colorMode = e.target.value;
      renderSheets();
      saveDeckToStorage();
    });

    // Event Listeners: Corner Style
    document.getElementById('select-corner-style')?.addEventListener('change', (e) => {
      state.settings.cornerStyle = e.target.value;
      applyCardDimensions();
      saveSharedSettings(state.settings);
      saveDeckToStorage();
    });

    // Event Listeners: Back Style Select (Separate vs Unified)
    document.getElementById('select-back-style')?.addEventListener('change', (e) => {
      state.settings.backDesignMode = e.target.value;
      saveSharedSettings(state.settings);
      saveDeckToStorage();
      renderSheets();
      showToast(e.target.value === 'unified'
        ? 'Включена единая рубашка d20 (для всей колоды)'
        : 'Включены раздельные рубашки (d20 для магии, Призма для предметов)');
    });

    // Event Listeners: Custom Size Modal
    document.getElementById('btn-open-custom-size')?.addEventListener('click', openCustomSizeModal);
    document.getElementById('modal-close')?.addEventListener('click', closeCustomSizeModal);
    document.getElementById('modal-btn-cancel')?.addEventListener('click', closeCustomSizeModal);
    document.getElementById('modal-btn-save')?.addEventListener('click', applyCustomDimensions);

    // Event Listeners: Search & Catalog Filters
    document.getElementById('search-item')?.addEventListener('input', renderCatalogList);
    document.getElementById('filter-catalog-category')?.addEventListener('change', renderCatalogList);
    document.getElementById('filter-catalog-rarity')?.addEventListener('change', renderCatalogList);

    // Clear Deck
    document.getElementById('btn-clear-deck')?.addEventListener('click', () => {
      if (confirm('Очистить всю колоду выбранных карт?')) {
        state.deck = [];
        renderDeckList();
        renderSheets();
        saveDeckToStorage();
      }
    });

    // Custom Item Modal
    document.getElementById('btn-open-create-item')?.addEventListener('click', openCustomItemModal);
    document.getElementById('custom-item-close')?.addEventListener('click', closeCustomItemModal);
    document.getElementById('ci-btn-cancel')?.addEventListener('click', closeCustomItemModal);
    document.getElementById('ci-btn-save')?.addEventListener('click', saveCustomItem);

    // Charges input visibility toggle
    document.getElementById('ci-charges')?.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) || 0;
      const wrap = document.getElementById('ci-charges-reset-wrap');
      if (wrap) wrap.style.display = val > 0 ? 'block' : 'none';
    });

    // Slot Filler Modal
    document.getElementById('btn-open-slot-filler')?.addEventListener('click', openSlotFillerModal);
    document.getElementById('slot-filler-close')?.addEventListener('click', closeSlotFillerModal);
    document.getElementById('slot-filler-btn-cancel')?.addEventListener('click', closeSlotFillerModal);

    document.getElementById('btn-fill-potions')?.addEventListener('click', () => executeSlotFill('potions'));
    document.getElementById('btn-fill-spells')?.addEventListener('click', () => executeSlotFill('spells'));
    document.getElementById('btn-fill-duplicates')?.addEventListener('click', () => executeSlotFill('duplicates'));
    document.getElementById('btn-fill-notes')?.addEventListener('click', () => executeSlotFill('notes'));

    // Print Button
    document.getElementById('btn-print')?.addEventListener('click', () => {
      window.print();
    });

    // Card Zoom Modal Controls
    document.getElementById('zoom-modal-close')?.addEventListener('click', closeCardZoomModal);
    document.getElementById('zoom-btn-front')?.addEventListener('click', () => {
      if (currentZoomItem) renderZoomCard(currentZoomItem, 'front');
    });
    document.getElementById('zoom-btn-back')?.addEventListener('click', () => {
      if (currentZoomItem) renderZoomCard(currentZoomItem, 'back');
    });

    // Backdrop click close
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    });

    // Keyboard ESC to close modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
      }
    });
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
