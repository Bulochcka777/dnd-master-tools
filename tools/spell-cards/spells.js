/* ============================================
   DnD Master Tools — Spell Cards Engine
   Exact card replica, custom size modal, 9 on A4
   ============================================ */

(() => {
  'use strict';

  // School Colors
  const SCHOOL_COLORS = {
    'Преобразование': '#b87e28',
    'Воплощение': '#b23225',
    'Ограждение': '#2b5fa8',
    'Некромантия': '#446835',
    'Вызов': '#693394',
    'Иллюзия': '#1f7785',
    'Очарование': '#942b63',
    'Прорицание': '#947a26',
    'Псионика': '#7c3aed',
    'Воинское искусство': '#475569'
  };

  // Class Icons
  const CLASS_ICONS = {
    'druid': '🍃',
    'artificer': '⚙️',
    'wizard': '📜',
    'sorcerer': '🔮',
    'warlock': '👁️',
    'cleric': '☀️',
    'bard': '🎭',
    'paladin': '🛡️',
    'ranger': '🏹',
    'fighter': '⚔️',
    'воин': '⚔️',
    'пси-воин': '🔮',
    'rogue': '🗡️',
    'плут': '🗡️',
    'barbarian': '🪓',
    'варвар': '🪓',
    'monk': '👊',
    'монах': '👊'
  };

  const SPELL_CLASSES = [
    { id: 'wizard', name: 'Волшебник', icon: '📜' },
    { id: 'sorcerer', name: 'Чародей', icon: '🔮' },
    { id: 'warlock', name: 'Колдун', icon: '👁️' },
    { id: 'cleric', name: 'Жрец', icon: '☀️' },
    { id: 'druid', name: 'Друид', icon: '🍃' },
    { id: 'bard', name: 'Бард', icon: '🎭' },
    { id: 'paladin', name: 'Паладин', icon: '🛡️' },
    { id: 'ranger', name: 'Следопыт', icon: '🏹' },
    { id: 'artificer', name: 'Изобретатель', icon: '⚙️' },
    { id: 'fighter', name: 'Воин', icon: '⚔️' },
    { id: 'rogue', name: 'Плут', icon: '🗡️' },
    { id: 'barbarian', name: 'Варвар', icon: '🪓' },
    { id: 'monk', name: 'Монах', icon: '👊' }
  ];

  // Elemental / School Vector Ornaments for Ribbon
  const SCHOOL_ORNAMENTS = {
    'Преобразование': `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4 C11 16, 21 28, 16 40 C11 52, 21 58, 16 62" stroke="rgba(255,255,255,0.45)" stroke-width="1.3" stroke-linecap="round"/>
        <path d="M15 17 C9 14, 7 21, 14 21" fill="rgba(255,255,255,0.4)"/>
        <path d="M18 29 C24 26, 26 33, 18 33" fill="rgba(255,255,255,0.4)"/>
        <path d="M15 41 C9 38, 7 45, 14 45" fill="rgba(255,255,255,0.4)"/>
        <path d="M18 53 C24 50, 26 57, 18 57" fill="rgba(255,255,255,0.4)"/>
        <circle cx="16" cy="32" r="2" fill="rgba(255,255,255,0.65)"/>
      </svg>
    `,
    'Воплощение': `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 58 C8 46, 8 35, 16 22 C18 30, 23 32, 16 58 Z" fill="rgba(255,255,255,0.3)"/>
        <path d="M16 50 C11 42, 11 32, 16 14 C18 26, 21 36, 16 50 Z" fill="rgba(255,255,255,0.45)"/>
        <path d="M16 30 C13 24, 14 15, 16 6 C18 15, 19 24, 16 30 Z" fill="rgba(255,255,255,0.6)"/>
        <circle cx="9" cy="27" r="1.2" fill="rgba(255,255,255,0.6)"/>
        <circle cx="23" cy="21" r="1" fill="rgba(255,255,255,0.6)"/>
        <circle cx="16" cy="4" r="1.3" fill="rgba(255,255,255,0.7)"/>
      </svg>
    `,
    'Ограждение': `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 10 L25 15 L25 34 C25 46, 16 56, 16 60 C16 56, 7 46, 7 34 L7 15 Z" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" fill="rgba(255,255,255,0.15)"/>
        <path d="M16 17 L21 20 L21 32 C21 40, 16 47, 16 50 C16 47, 11 40, 11 32 L11 20 Z" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
        <path d="M16 22 L16 44 M11 29 L21 29" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
      </svg>
    `,
    'Некромантия': `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 22 C11 14, 21 14, 21 22 C21 27, 19 32, 18 36 L14 36 C13 32, 11 27, 11 22 Z" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" fill="rgba(255,255,255,0.2)"/>
        <circle cx="13.5" cy="22" r="1.5" fill="rgba(255,255,255,0.7)"/>
        <circle cx="18.5" cy="22" r="1.5" fill="rgba(255,255,255,0.7)"/>
        <path d="M14.5 31 L17.5 31" stroke="rgba(255,255,255,0.6)" stroke-width="0.9"/>
        <path d="M16 42 C12 47, 20 52, 16 59" stroke="rgba(255,255,255,0.35)" stroke-width="1" stroke-dasharray="2 2"/>
      </svg>
    `,
    'Вызов': `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="32" r="11" stroke="rgba(255,255,255,0.4)" stroke-width="1" stroke-dasharray="3 2"/>
        <circle cx="16" cy="32" r="6.5" stroke="rgba(255,255,255,0.5)" stroke-width="1.1"/>
        <circle cx="16" cy="32" r="2" fill="rgba(255,255,255,0.75)"/>
        <path d="M16 12 L16 52 M6 32 L26 32" stroke="rgba(255,255,255,0.35)" stroke-width="0.8"/>
        <polygon points="16,19 19,29 29,32 19,35 16,45 13,35 3,32 13,29" fill="rgba(255,255,255,0.35)"/>
      </svg>
    `,
    'Иллюзия': `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 32 Q16 18 26 32 Q16 46 6 32 Z" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" fill="rgba(255,255,255,0.15)"/>
        <circle cx="16" cy="32" r="4.5" stroke="rgba(255,255,255,0.6)" stroke-width="1" fill="rgba(255,255,255,0.4)"/>
        <circle cx="16" cy="32" r="1.7" fill="#ffffff"/>
        <path d="M9 16 Q16 21 23 16 M9 48 Q16 43 23 48" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
      </svg>
    `,
    'Очарование': `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 38 C8 30, 6 20, 13 17 C16 15, 16 19, 16 19 C16 19, 16 15, 19 17 C26 20, 24 30, 16 38 Z" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" fill="rgba(255,255,255,0.2)"/>
        <path d="M16 42 C12 47, 20 53, 16 60" stroke="rgba(255,255,255,0.35)" stroke-width="1.2"/>
        <circle cx="16" cy="25" r="2" fill="rgba(255,255,255,0.7)"/>
      </svg>
    `,
    'Прорицание': `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 14 A11 11 0 0 0 16 50 A11 11 0 0 1 16 14" fill="rgba(255,255,255,0.3)"/>
        <circle cx="16" cy="32" r="3.5" fill="rgba(255,255,255,0.6)"/>
        <path d="M16 8 L16 56 M4 32 L28 32" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
        <circle cx="16" cy="32" r="1.3" fill="#ffffff"/>
      </svg>
    `,
    'Псионика': `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="16,6 26,22 16,38 6,22" stroke="rgba(255,255,255,0.65)" stroke-width="1.2" fill="rgba(255,255,255,0.18)"/>
        <line x1="16" y1="6" x2="16" y2="38" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
        <line x1="6" y1="22" x2="26" y2="22" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>
        <polygon points="16,38 23,54 16,60 9,54" stroke="rgba(255,255,255,0.55)" stroke-width="1" fill="rgba(255,255,255,0.12)"/>
        <circle cx="16" cy="22" r="2.8" fill="#ffffff"/>
      </svg>
    `,
    'Воинское искусство': `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 10 L26 16 L26 40 C26 50, 16 58, 16 58 C16 58, 6 50, 6 40 L6 16 Z" stroke="rgba(255,255,255,0.65)" stroke-width="1.2" fill="rgba(255,255,255,0.15)"/>
        <line x1="8" y1="14" x2="24" y2="48" stroke="rgba(255,255,255,0.6)" stroke-width="1.1"/>
        <line x1="24" y1="14" x2="8" y2="48" stroke="rgba(255,255,255,0.6)" stroke-width="1.1"/>
        <circle cx="16" cy="31" r="2.5" fill="#ffffff"/>
      </svg>
    `
  };

  // High-contrast Elemental Watermarks for Card Body Background
  const SCHOOL_WATERMARKS = {
    'Преобразование': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 C35 35, 65 60, 50 85 C38 105, 55 115, 50 120" stroke="var(--school-color)" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M47 36 C30 28, 25 45, 45 47" fill="var(--school-color)" fill-opacity="0.25" stroke="var(--school-color)" stroke-width="1.8"/>
        <path d="M53 58 C70 50, 75 67, 55 69" fill="var(--school-color)" fill-opacity="0.25" stroke="var(--school-color)" stroke-width="1.8"/>
        <path d="M48 82 C30 74, 26 92, 45 94" fill="var(--school-color)" fill-opacity="0.25" stroke="var(--school-color)" stroke-width="1.8"/>
        <circle cx="50" cy="60" r="8" fill="var(--school-color)" fill-opacity="0.3"/>
        <polygon points="50,25 56,40 70,45 56,50 50,65 44,50 30,45 44,40" fill="var(--school-color)" fill-opacity="0.18"/>
      </svg>
    `,
    'Воплощение': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 115 C20 90, 20 60, 50 20 C56 40, 70 45, 50 115 Z" fill="var(--school-color)" fill-opacity="0.2" stroke="var(--school-color)" stroke-width="2.2"/>
        <path d="M50 95 C32 75, 32 50, 50 10 C58 35, 65 55, 50 95 Z" fill="var(--school-color)" fill-opacity="0.28" stroke="var(--school-color)" stroke-width="2.2"/>
        <circle cx="28" cy="45" r="4.5" fill="var(--school-color)" fill-opacity="0.35"/>
        <circle cx="72" cy="35" r="4" fill="var(--school-color)" fill-opacity="0.35"/>
      </svg>
    `,
    'Ограждение': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15 L80 25 L80 65 C80 90, 50 110, 50 115 C50 110, 20 90, 20 65 L20 25 Z" stroke="var(--school-color)" stroke-width="2.8" fill="var(--school-color)" fill-opacity="0.2"/>
        <path d="M50 30 L70 37 L70 65 C70 82, 50 95, 50 100 C50 95, 30 82, 30 65 L30 37 Z" stroke="var(--school-color)" stroke-width="1.8" fill="var(--school-color)" fill-opacity="0.15"/>
        <line x1="50" y1="35" x2="50" y2="92" stroke="var(--school-color)" stroke-width="2.5"/>
        <line x1="30" y1="55" x2="70" y2="55" stroke="var(--school-color)" stroke-width="2.5"/>
      </svg>
    `,
    'Некромантия': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 45 C30 20, 70 20, 70 45 C70 60, 64 72, 60 80 L40 80 C36 72, 30 60, 30 45 Z" stroke="var(--school-color)" stroke-width="2.8" fill="var(--school-color)" fill-opacity="0.22"/>
        <circle cx="42" cy="45" r="6.5" fill="var(--school-color)" fill-opacity="0.5"/>
        <circle cx="58" cy="45" r="6.5" fill="var(--school-color)" fill-opacity="0.5"/>
        <path d="M44 68 L56 68" stroke="var(--school-color)" stroke-width="2.2"/>
        <path d="M50 90 C38 100, 62 108, 50 120" stroke="var(--school-color)" stroke-width="2.5" stroke-dasharray="4 3"/>
      </svg>
    `,
    'Вызов': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="60" r="38" stroke="var(--school-color)" stroke-width="2.2" stroke-dasharray="6 4"/>
        <circle cx="50" cy="60" r="24" stroke="var(--school-color)" stroke-width="2.4"/>
        <circle cx="50" cy="60" r="9" fill="var(--school-color)" fill-opacity="0.35"/>
        <polygon points="50,22 58,50 86,60 58,70 50,98 42,70 14,60 42,50" fill="var(--school-color)" fill-opacity="0.25" stroke="var(--school-color)" stroke-width="1.5"/>
      </svg>
    `,
    'Иллюзия': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 60 Q50 20, 85 60 Q50 100, 15 60 Z" stroke="var(--school-color)" stroke-width="2.8" fill="var(--school-color)" fill-opacity="0.18"/>
        <circle cx="50" cy="60" r="16" stroke="var(--school-color)" stroke-width="2.2" fill="var(--school-color)" fill-opacity="0.3"/>
        <circle cx="50" cy="60" r="6" fill="var(--school-color)" fill-opacity="0.65"/>
        <path d="M25 30 Q50 42, 75 30 M25 90 Q50 78, 75 90" stroke="var(--school-color)" stroke-width="2"/>
      </svg>
    `,
    'Очарование': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 85 C25 60, 18 35, 35 25 C45 20, 48 30, 50 32 C52 30, 55 20, 65 25 C82 35, 75 60, 50 85 Z" stroke="var(--school-color)" stroke-width="2.8" fill="var(--school-color)" fill-opacity="0.25"/>
        <path d="M50 92 C36 102, 64 110, 50 120" stroke="var(--school-color)" stroke-width="2.5"/>
        <circle cx="50" cy="50" r="8" fill="var(--school-color)" fill-opacity="0.35"/>
      </svg>
    `,
    'Прорицание': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 20 A38 38 0 0 0 50 100 A38 38 0 0 1 50 20" fill="var(--school-color)" fill-opacity="0.25" stroke="var(--school-color)" stroke-width="2.2"/>
        <circle cx="50" cy="60" r="12" fill="var(--school-color)" fill-opacity="0.4"/>
        <line x1="50" y1="8" x2="50" y2="112" stroke="var(--school-color)" stroke-width="2.2"/>
        <line x1="8" y1="60" x2="92" y2="60" stroke="var(--school-color)" stroke-width="2.2"/>
        <circle cx="50" cy="60" r="4.5" fill="var(--school-color)" fill-opacity="0.75"/>
      </svg>
    `,
    'Псионика': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,10 82,45 50,110 18,45" stroke="var(--school-color)" stroke-width="2.5" fill="var(--school-color)" fill-opacity="0.18"/>
        <line x1="50" y1="10" x2="50" y2="110" stroke="var(--school-color)" stroke-width="1.8"/>
        <line x1="18" y1="45" x2="82" y2="45" stroke="var(--school-color)" stroke-width="1.8"/>
        <polygon points="50,25 70,45 50,85 30,45" stroke="var(--school-color)" stroke-width="2" fill="var(--school-color)" fill-opacity="0.25"/>
        <circle cx="50" cy="45" r="9" fill="var(--school-color)" fill-opacity="0.5"/>
        <path d="M12 30 C20 18, 35 12, 50 12 C65 12, 80 18, 88 30" stroke="var(--school-color)" stroke-width="1.8" stroke-dasharray="3 3"/>
        <path d="M8 55 C12 75, 28 92, 50 98 C72 92, 88 75, 92 55" stroke="var(--school-color)" stroke-width="1.8" stroke-dasharray="3 3"/>
      </svg>
    `,
    'Воинское искусство': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 L86 24 L86 65 C86 92, 50 115, 50 115 C50 115, 14 92, 14 65 L14 24 Z" stroke="var(--school-color)" stroke-width="2.6" fill="var(--school-color)" fill-opacity="0.16"/>
        <line x1="22" y1="20" x2="78" y2="95" stroke="var(--school-color)" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="78" y1="20" x2="22" y2="95" stroke="var(--school-color)" stroke-width="2.6" stroke-linecap="round"/>
        <circle cx="50" cy="58" r="14" stroke="var(--school-color)" stroke-width="2" fill="var(--school-color)" fill-opacity="0.3"/>
        <circle cx="50" cy="58" r="5" fill="var(--school-color)" fill-opacity="0.7"/>
      </svg>
    `
  };

  // --- State ---
  const state = {
    deck: [],
    customSpells: [],
    settings: {
      preset: 'a4-gap',
      widthMm: 64.0,
      heightMm: 91.0,
      gapMm: 2.5,
      cornerStyle: 'rounded', // 'rounded' or 'sharp'
      printBacks: true,
      colorMode: 'color', // 'color' or 'bw'
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

  function getAllSpells() {
    return [...SPELLS_DATA, ...state.customSpells];
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

  // --- Cross-tool Shared Settings ---
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
      localStorage.setItem('dnd_master_spell_deck_v2', JSON.stringify({
        deckCards: state.deck,
        settings: state.settings,
        customSpells: state.customSpells
      }));
      saveSharedSettings(state.settings);
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }

  function loadDeckFromStorage() {
    try {
      const raw = localStorage.getItem('dnd_master_spell_deck_v2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.settings) state.settings = { ...state.settings, ...parsed.settings };
        if (parsed.customSpells) state.customSpells = parsed.customSpells;
        if (parsed.deckCards && Array.isArray(parsed.deckCards)) {
          state.deck = parsed.deckCards;
        } else if (parsed.deckIds && Array.isArray(parsed.deckIds)) {
          const all = getAllSpells();
          state.deck = parsed.deckIds.map(id => all.find(s => s.id === id)).filter(Boolean);
        }
      }
      // Apply cross-tool shared settings if available
      const shared = getSharedSettings();
      if (shared) {
        state.settings = { ...state.settings, ...shared };
      }
    } catch (e) {
      console.warn('Storage load error', e);
    }
  }

  // --- Catalog Rendering ---
  function renderCatalog() {
    const container = document.getElementById('catalog-list');
    if (!container) return;

    const query = (document.getElementById('search-spell')?.value || '').toLowerCase().trim();
    const filterClass = document.getElementById('filter-catalog-class')?.value || 'all';
    const filterLevel = document.getElementById('filter-catalog-level')?.value || 'all';

    const spells = getAllSpells().filter(s => {
      const matchQuery = s.name.toLowerCase().includes(query) || (s.nameEn && s.nameEn.toLowerCase().includes(query));
      const matchClass = filterClass === 'all'
        ? true
        : filterClass === 'custom'
          ? (s.isCustom === true)
          : (s.classes && s.classes.some(c => c.toLowerCase().includes(filterClass) || filterClass.includes(c.toLowerCase())));
      const matchLevel = filterLevel === 'all' || s.level.toString() === filterLevel;
      return matchQuery && matchClass && matchLevel;
    });

    container.innerHTML = '';
    if (spells.length === 0) {
      container.innerHTML = '<div style="padding: 12px; color: var(--color-text-muted); font-size: 0.8rem; text-align: center;">Заклинания не найдены</div>';
      return;
    }

    spells.forEach(spell => {
      const item = document.createElement('div');
      item.className = 'catalog-item';
      const isAlreadyInDeck = state.deck.some(d => d.id === spell.id);

      const isCustomBadge = spell.isCustom
        ? `<span class="catalog-item__badge-custom" title="Пользовательская способность">Своё</span>`
        : '';

      const customActions = spell.isCustom ? `
        <button class="catalog-item__btn-edit" data-id="${spell.id}" title="Редактировать">✏️</button>
        <button class="catalog-item__btn-delete" data-id="${spell.id}" title="Удалить способность">🗑️</button>
      ` : '';

      item.innerHTML = `
        <div class="catalog-item__info">
          <span class="catalog-item__level">${spell.level === 0 ? '0' : spell.level}</span>
          <span style="font-weight: 600;">${spell.name}</span>
          ${isCustomBadge}
          <span style="font-size: 0.72rem; color: var(--color-text-muted); font-style: italic;">(${spell.school})</span>
        </div>
        <div class="catalog-item__actions">
          ${customActions}
          <button class="catalog-item__btn-add" data-id="${spell.id}">
            ${isAlreadyInDeck ? '+ ещё' : '+ Добавить'}
          </button>
        </div>
      `;
      container.appendChild(item);
    });

    container.querySelectorAll('.catalog-item__btn-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        addSpellToDeck(id);
      });
    });

    container.querySelectorAll('.catalog-item__btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const spell = state.customSpells.find(s => s.id === id);
        if (spell) openCustomSpellModal(spell);
      });
    });

    container.querySelectorAll('.catalog-item__btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        deleteCustomSpell(id);
      });
    });
  }

  function addSpellToDeck(spellId) {
    const spell = getAllSpells().find(s => s.id === spellId);
    if (!spell) return;
    state.deck.push(spell);
    renderDeckList();
    renderSheets();
    saveDeckToStorage();
    showToast(`«${spell.name}» добавлено`);
  }

  function removeSpellFromDeck(index) {
    if (index >= 0 && index < state.deck.length) {
      const removed = state.deck.splice(index, 1)[0];
      renderDeckList();
      renderSheets();
      saveDeckToStorage();
      showToast(`«${removed.name}» удалено`);
    }
  }

  // --- Deck List Rendering ---
  function renderDeckList() {
    const container = document.getElementById('deck-list');
    const summary = document.getElementById('deck-summary-text');
    if (!container) return;

    const count = state.deck.length;
    const pages = Math.ceil(count / 9) || 0;
    const backsInfo = state.settings.printBacks && count > 0 ? ` • с рубашками: ${pages * 2} стр.` : '';
    if (summary) {
      summary.textContent = `Карт в колоде: ${count} (${pages} ${pages === 1 ? 'лист А4' : 'листов А4'}${backsInfo})`;
    }

    container.innerHTML = '';
    if (count === 0) {
      container.innerHTML = '<div style="padding: 12px; color: var(--color-text-muted); font-size: 0.8rem; text-align: center;">Колода пуста. Добавьте заклинания из каталога.</div>';
      return;
    }

    state.deck.forEach((spell, idx) => {
      const row = document.createElement('div');
      row.className = 'deck-item';
      row.innerHTML = `
        <span><strong>${idx + 1}.</strong> ${spell.name} (${spell.level === 0 ? 'Заговор' : spell.level + ' кр.'})</span>
        <button class="deck-item__remove" data-index="${idx}" title="Удалить">✕</button>
      `;
      container.appendChild(row);
    });

    container.querySelectorAll('.deck-item__remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        removeSpellFromDeck(idx);
      });
    });
  }

  // --- Clean Text Formatting Helper ---
  function formatDescription(desc) {
    if (!desc) return '';
    return desc
      .split('\n\n')
      .map(block => {
        let text = block.trim();
        if (!text) return '';
        // Если блок является готовой HTML таблицей
        if (text.startsWith('<table')) {
          return text;
        }
        // Выделение костей бросков и дальностей
        text = text
          .replace(/(\b\d+[dк]\d+(?:\s*[+-]\s*\d+)?\b)/gi, '<strong>$1</strong>')
          .replace(/(Большой|Огромный|Крошечный|Средний)/g, '<strong>$1</strong>');

        // Если блок содержит маркированный список
        if (text.includes('• ')) {
          const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
          const listItems = lines.map(l => `<li>${l.replace(/^•\s*/, '')}</li>`).join('');
          return `<ul class="card-list">${listItems}</ul>`;
        }

        return `<p class="card-p">${text}</p>`;
      })
      .join('');
  }

  // Extract material description cleanly
  function getMaterialDesc(spell) {
    if (spell.materialDesc) return spell.materialDesc;
    if (spell.components && spell.components.includes('(')) {
      const match = spell.components.match(/\(([^)]+)\)/);
      return match ? match[1] : '';
    }
    return '';
  }

  function getCleanComponents(components) {
    if (!components) return '—';
    const trimmed = components.trim();
    if (trimmed === '' || trimmed === '—' || trimmed === '-' || trimmed.toLowerCase() === 'нет') return '—';
    return components.replace(/\s*\([^)]*\)/g, '').replace(/,/g, '').replace(/\s+/g, '');
  }

  function getShortRange(range) {
    if (!range) return '—';
    if (range.includes('На себя')) return 'Себя';
    if (range.includes('Касание')) return 'Кас.';
    if (range.toLowerCase().includes('оружие')) return 'Оруж.';
    const numMatch = range.match(/\d+/);
    return numMatch ? numMatch[0] : (range.length > 6 ? range.slice(0, 5) + '.' : range);
  }

  function getCleanCastingBadge(castingTime) {
    if (!castingTime) return '1 действ.';
    const lower = castingTime.toLowerCase();
    if (lower.includes('бонус')) return '1 бон. действ.';
    if (lower.includes('реакц')) return '1 реакция';
    if (lower.includes('свободн')) return 'Свободное';
    if (lower.includes('1 действие') || lower.includes('действие')) return '1 действие';
    if (castingTime.includes('(')) return castingTime.split('(')[0].trim();
    if (castingTime.includes(',')) return castingTime.split(',')[0].trim();
    return castingTime.length > 15 ? castingTime.slice(0, 15) + '...' : castingTime;
  }

  // --- Combat Highlights Helper ---
  function getCombatHighlights(spell) {
    const highlights = [];
    const desc = (spell.description || '').toLowerCase();

    // 1. Damage / Healing detection
    if (desc.includes('колющего урона') || desc.includes('колющего')) highlights.push({ icon: '💥', text: 'Колющий урон' });
    else if (desc.includes('урона огнём') || desc.includes('урона огнем')) highlights.push({ icon: '🔥', text: 'Урон огнём' });
    else if (desc.includes('силового урона')) highlights.push({ icon: '✨', text: 'Силовой урон' });
    else if (desc.includes('урона излучением')) highlights.push({ icon: '☀️', text: 'Излучение' });
    else if (desc.includes('урона холодом')) highlights.push({ icon: '❄️', text: 'Урон холодом' });
    else if (desc.includes('урона электричеством')) highlights.push({ icon: '⚡', text: 'Электричество' });
    else if (desc.includes('урона звуком')) highlights.push({ icon: '📢', text: 'Урон звуком' });
    else if (desc.includes('психического урона')) highlights.push({ icon: '🧠', text: 'Психический урон' });
    else if (desc.includes('некротического урона')) highlights.push({ icon: '💀', text: 'Некротический' });
    else if (desc.includes('восстанавливает') && desc.includes('хит')) highlights.push({ icon: '💚', text: 'Исцеление' });

    // 2. Attack type
    if (desc.includes('рукопашную атаку заклинанием') || desc.includes('рукопашную атаку')) highlights.push({ icon: '🎯', text: 'Рукопашная атака' });
    else if (desc.includes('дальнобойную атаку заклинанием') || desc.includes('дальнобойную атаку')) highlights.push({ icon: '🎯', text: 'Дальнобойная атака' });

    // 3. Save detection
    if (desc.includes('спасбросок ловкости')) highlights.push({ icon: '🛡️', text: 'Спас: Ловкость' });
    else if (desc.includes('спасбросок телосложения')) highlights.push({ icon: '🛡️', text: 'Спас: Телосложение' });
    else if (desc.includes('спасбросок мудрости')) highlights.push({ icon: '🛡️', text: 'Спас: Мудрость' });
    else if (desc.includes('спасбросок интеллекта')) highlights.push({ icon: '🛡️', text: 'Спас: Интеллект' });
    else if (desc.includes('спасбросок силы')) highlights.push({ icon: '🛡️', text: 'Спас: Сила' });
    else if (desc.includes('спасбросок харизмы')) highlights.push({ icon: '🛡️', text: 'Спас: Харизма' });

    // 4. Key conditions (strictly matching the condition to avoid false positives like "Невидимый барьер")
    if (desc.includes('парализован')) highlights.push({ icon: '⛓️', text: 'Эффект: Паралич' });
    else if (/\b(становится невидимым|состояние «невидимый»|состояние невидимости|эффект невидимости)\b/i.test(desc)) highlights.push({ icon: '👻', text: 'Эффект: Невидимость' });
    else if (desc.includes('опутан')) highlights.push({ icon: '🕸️', text: 'Эффект: Опутан' });

    return highlights;
  }

  // --- Arcane Magic Circle Vector Generator (Based on User Reference) ---
  function getMagicCircleSvg(isBw = false, isCompact = false) {
    const strokeColor = isBw ? '#000000' : '#ff4d29';
    const strokeAlt = isBw ? '#000000' : '#f59e0b';
    const textColor = isBw ? '#000000' : '#ffedd5';
    const glowClass = isBw ? '' : 'style="filter: drop-shadow(0 0 5px rgba(255, 77, 41, 0.65));"';

    // 10 decagram vertices
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

    // 10 node glyphs
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
      <svg class="card-back__magic-circle ${isCompact ? 'card-back__magic-circle--compact' : ''}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" ${glowClass}>
        <defs>
          <path id="spell-circle-runepath" d="M 100,14 A 86,86 0 1,1 99.9,14" fill="none" />
          <radialGradient id="spell-circle-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${isBw ? 'transparent' : 'rgba(255, 77, 41, 0.22)'}"/>
            <stop offset="70%" stop-color="${isBw ? 'transparent' : 'rgba(245, 158, 11, 0.08)'}"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>

        <!-- Subtle ambient radial core -->
        <circle cx="100" cy="100" r="92" fill="url(#spell-circle-glow)"/>

        <!-- Outer Boundary Rings -->
        <circle cx="100" cy="100" r="94" stroke="${strokeColor}" stroke-width="2.2"/>
        <circle cx="100" cy="100" r="91" stroke="${strokeAlt}" stroke-width="1"/>
        <circle cx="100" cy="100" r="77" stroke="${strokeAlt}" stroke-width="1"/>
        <circle cx="100" cy="100" r="75" stroke="${strokeColor}" stroke-width="1.8"/>

        <!-- Arcane Runes Band -->
        <text font-family="'Cinzel', Georgia, serif" font-size="7" font-weight="600" fill="${textColor}" letter-spacing="4px">
          <textPath href="#spell-circle-runepath">✦ ARCANUM ✦ MAGICA ✦ POTENTIA ✦ AETERNA ✦ VITA ✦ MORTIS ✦ CAELUM ✦</textPath>
        </text>

        <!-- Interlaced Decagram Chords -->
        <g stroke-linecap="round">
          ${chordLines}
        </g>

        <!-- Intermediate Boundary Ring -->
        <circle cx="100" cy="100" r="55" stroke="${strokeColor}" stroke-width="1.2" stroke-dasharray="2 1.5"/>
        <circle cx="100" cy="100" r="38" stroke="${strokeAlt}" stroke-width="1.4"/>
        <circle cx="100" cy="100" r="35" stroke="${strokeColor}" stroke-width="1.8"/>

        <!-- Glyphic Nodes -->
        ${nodeCircles}

        <!-- Center Mystic Core -->
        <circle cx="100" cy="100" r="22" stroke="${strokeColor}" stroke-width="1.2" fill="${isBw ? 'none' : 'rgba(255, 77, 41, 0.12)'}"/>
        <polygon points="100,81 116,94 110,113 90,113 84,94" stroke="${strokeAlt}" stroke-width="1" fill="none"/>
        <circle cx="100" cy="100" r="5" fill="${isBw ? '#000000' : '#ff4d29'}"/>
      </svg>
    `;
  }

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
          <radialGradient id="spell-d20-glow-${isBw ? 'bw' : 'col'}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${isBw ? 'transparent' : 'rgba(245, 200, 66, 0.28)'}"/>
            <stop offset="60%" stop-color="${isBw ? 'transparent' : 'rgba(201, 168, 76, 0.08)'}"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="92" fill="url(#spell-d20-glow-${isBw ? 'bw' : 'col'})"/>

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
          <radialGradient id="spell-prism-glow-${isBw ? 'bw' : 'col'}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${isBw ? 'transparent' : 'rgba(168, 85, 247, 0.32)'}"/>
            <stop offset="60%" stop-color="${isBw ? 'transparent' : 'rgba(201, 168, 76, 0.12)'}"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
          <radialGradient id="spell-prism-eye-${isBw ? 'bw' : 'col'}" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="${isBw ? '#ffffff' : '#c084fc'}"/>
            <stop offset="50%" stop-color="${isBw ? '#888888' : '#7e22ce'}"/>
            <stop offset="100%" stop-color="${isBw ? '#000000' : '#3b0764'}"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="url(#spell-prism-glow-${isBw ? 'bw' : 'col'})"/>
        
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
        <circle cx="100" cy="100" r="15" fill="url(#spell-prism-eye-${isBw ? 'bw' : 'col'})" stroke="${strokeGold}" stroke-width="1.5"/>
        <circle cx="100" cy="100" r="6" fill="${isBw ? '#000000' : '#ffffff'}"/>
        <circle cx="102" cy="98" r="2.2" fill="${isBw ? '#ffffff' : '#f5c842'}"/>
      </svg>
    `;
  }

  // --- Content Splitting Logic for Long Spells (Carries overflow to Card Back) ---
  function splitSpellContent(spell) {
    const desc = spell.description || '';
    const higher = spell.higherLevels || '';
    const totalLen = desc.length + higher.length;

    // Spells up to 750 characters fit comfortably on front side
    if (totalLen <= 750) {
      return {
        hasBackContent: false,
        frontDesc: desc,
        frontHigher: higher,
        backDesc: '',
        backHigher: ''
      };
    }

    // 1. If spell contains an HTML table, keep table intact as a single block!
    if (desc.includes('<table')) {
      const tableIndex = desc.indexOf('<table');
      const beforeTable = desc.slice(0, tableIndex).trim();
      const tablePart = desc.slice(tableIndex).trim();

      // Intro text goes to front, full table + higherLevels goes to back
      if (beforeTable.length > 0) {
        return {
          hasBackContent: true,
          frontDesc: beforeTable,
          frontHigher: '',
          backDesc: tablePart,
          backHigher: higher
        };
      }
    }

    // 2. If description fits comfortably on front (<= 650 chars) and higher levels is substantial
    if (higher && desc.length <= 650 && higher.length >= 150) {
      return {
        hasBackContent: true,
        frontDesc: desc,
        frontHigher: '',
        backDesc: '',
        backHigher: higher
      };
    }

    // 3. Balanced split around totalLen / 2 to maximize text fill on both sides
    const targetHalf = Math.floor(totalLen / 2);
    const paragraphs = desc.split('\n\n');
    let frontParagraphs = [];
    let backParagraphs = [];
    let cumLen = 0;

    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i].trim();
      if (!p) continue;
      // Balance content between both sides
      if (cumLen === 0 || (cumLen + p.length <= targetHalf + 100 && i < paragraphs.length - 1)) {
        frontParagraphs.push(p);
        cumLen += p.length;
      } else {
        backParagraphs.push(p);
      }
    }

    // If first paragraph was more than half of the text
    if (frontParagraphs.length === 1 && backParagraphs.length === 0) {
      const text = frontParagraphs[0];
      const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [text];
      let fText = '';
      let bText = '';
      let sLen = 0;
      for (const s of sentences) {
        if (sLen === 0 || sLen + s.length <= targetHalf + 60) {
          fText += s;
          sLen += s.length;
        } else {
          bText += s;
        }
      }
      if (bText) {
        frontParagraphs = [fText.trim()];
        backParagraphs = [bText.trim()];
      }
    }

    return {
      hasBackContent: true,
      frontDesc: frontParagraphs.join('\n\n'),
      frontHigher: '',
      backDesc: backParagraphs.join('\n\n'),
      backHigher: higher
    };
  }

  // --- Embedded Item Card Renderer for Mixed Print Sheets ---
  function createEmbeddedItemCard(item, isZoomed = false) {
    const card = document.createElement('div');
    card.className = 'spell-card spell-card--item';
    card.dataset.spellId = item.id;
    card.style.setProperty('--school-color', '#c9a84c');

    if (!isZoomed) {
      card.title = 'Нажмите, чтобы приблизить предмет';
      card.addEventListener('click', () => openCardZoomModal(item, 'front'));
    }

    card.innerHTML = `
      <div class="card-header" style="background: #1f1b24;">
        <div class="card-header__info">
          <div class="card-title" title="${item.name}">${item.icon || '✨'} ${item.name}</div>
          <div class="card-level-school">${item.categoryName || 'Магический предмет'} • ${item.rarity || 'Редкий'}</div>
        </div>
        <div class="card-header__stats">
          <div class="card-time-badge" style="background: #c9a84c; color: #0d0d1a;">${item.cost || '—'}</div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-body__inner">
          <div class="card-body__meta" style="border-bottom: 0.3pt solid #e0d8c7; padding-bottom: 2px; margin-bottom: 4px; font-size: 0.85em; font-weight: 600; color: #6b2d18;">
            ${item.attunement ? '★ ' + item.attunement : 'Без настройки'} ${item.properties ? '• ' + item.properties : ''}
          </div>
          <div class="card-description-rich">
            <p>${item.description || ''}</p>
          </div>
          ${item.lore ? `<div style="font-style: italic; font-size: 0.82em; color: #665; margin-top: 4px; border-top: 0.3pt dotted #ccc; padding-top: 2px;">${item.lore}</div>` : ''}
        </div>
      </div>
      <div class="card-footer">
        <div class="card-footer__left">D&amp;D 5e • Предмет</div>
        <div class="card-footer__signature">By Shiz</div>
      </div>
    `;

    return card;
  }

  // --- Embedded Note Blank Card Renderer for Mixed Print Sheets ---
  function createEmbeddedNoteCard(blank, isZoomed = false) {
    const card = document.createElement('div');
    card.className = 'spell-card';
    card.dataset.spellId = blank.id;
    card.style.setProperty('--school-color', '#6b7280');

    if (!isZoomed) {
      card.title = 'Нажмите, чтобы приблизить бланк';
      card.addEventListener('click', () => openCardZoomModal(blank, 'front'));
    }

    card.innerHTML = `
      <div class="card-header" style="background: #2b251d;">
        <div class="card-header__info">
          <div class="card-title">📝 Бланк для заметок</div>
          <div class="card-level-school">Заметки заклинателя / Слоты</div>
        </div>
      </div>
      <div class="card-body" style="padding: 4mm;">
        <div style="font-size: 0.85em; color: #444; border-bottom: 0.3pt dotted #999; padding-bottom: 3px; margin-bottom: 4px;">Персонаж: ________________________</div>
        <div style="font-size: 0.8em; color: #777; line-height: 2.2;">
          <div style="border-bottom: 0.25mm dotted #ccc; height: 4mm;"></div>
          <div style="border-bottom: 0.25mm dotted #ccc; height: 4mm;"></div>
          <div style="border-bottom: 0.25mm dotted #ccc; height: 4mm;"></div>
          <div style="border-bottom: 0.25mm dotted #ccc; height: 4mm;"></div>
          <div style="border-bottom: 0.25mm dotted #ccc; height: 4mm;"></div>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-footer__left">DnD Master Tools</div>
        <div class="card-footer__signature">By Shiz</div>
      </div>
    `;

    return card;
  }

  // --- Card Element Builder (Front replica) ---
  function createCardElement(spell, isZoomed = false, splitContent = null) {
    if (spell.isItem) {
      return createEmbeddedItemCard(spell, isZoomed);
    }
    if (spell.isNoteBlank) {
      return createEmbeddedNoteCard(spell, isZoomed);
    }

    const card = document.createElement('div');
    card.className = 'spell-card';
    card.dataset.spellId = spell.id;

    if (!isZoomed) {
      card.title = 'Нажмите, чтобы приблизить и прочитать';
      card.addEventListener('click', () => openCardZoomModal(spell, 'front'));
    }

    const descToRender = (splitContent && splitContent.hasBackContent) ? splitContent.frontDesc : spell.description;
    const higherToRender = (splitContent && splitContent.hasBackContent) ? splitContent.frontHigher : spell.higherLevels;

    // Dynamic density auto-scaling to fill the card as much as possible
    const effectiveLen = (descToRender || '').length + (higherToRender || '').length;
    if (effectiveLen > 1100) {
      card.classList.add('card--micro');
    } else if (effectiveLen > 720) {
      card.classList.add('card--compact');
    } else if (effectiveLen > 450) {
      card.classList.add('card--dense');
    } else if (effectiveLen > 260) {
      card.classList.add('card--medium');
    } else {
      card.classList.add('card--large');
    }

    const baseSchool = (spell.school || '').split('(')[0].trim();
    const schoolColor = SCHOOL_COLORS[spell.school] || SCHOOL_COLORS[baseSchool] || '#7c3aed';
    card.style.setProperty('--school-color', schoolColor);

    const compShort = getCleanComponents(spell.components);
    const rangeShort = getShortRange(spell.range);
    const materialText = getMaterialDesc(spell);
    const combatItems = getCombatHighlights(spell);
    const badgeCasting = getCleanCastingBadge(spell.castingTime);

    const combatHtml = combatItems.length > 0
      ? combatItems.map(it => `<span class="card-combat-pill">${it.icon} ${it.text}</span>`).join('<span style="color:#aaa;">·</span>')
      : '';

    // Class icons string
    const classIconsHtml = (spell.classes || [])
      .map(cId => `<span title="${cId}">${CLASS_ICONS[cId.toLowerCase()] || '✦'}</span>`)
      .join('');

    card.innerHTML = `
      <!-- Left Ribbon -->
      <aside class="card-ribbon">
        <div class="card-ribbon__crest">
          <span class="card-ribbon__level-num">${spell.level === 0 ? '0' : spell.level}</span>
        </div>
        <div class="card-ribbon__quick-icons">
          <div class="card-ribbon__icon-item">
            <span class="card-ribbon__glyph">⚡</span>
          </div>
          <div class="card-ribbon__icon-item">
            <span>${rangeShort}</span>
          </div>
          <div class="card-ribbon__icon-item">
            <span>${compShort}</span>
          </div>
        </div>
        <div class="card-ribbon__ornament">
          ${SCHOOL_ORNAMENTS[spell.school] || SCHOOL_ORNAMENTS[baseSchool] || ''}
        </div>
        <div class="card-ribbon__school">
          ${(baseSchool || spell.school || 'МАГИЯ').toUpperCase()}
        </div>
      </aside>

      <!-- Main Card Body -->
      <main class="card-main">
        <!-- Subtle centered watermark -->
        <div class="card-watermark">
          ${SCHOOL_WATERMARKS[spell.school] || SCHOOL_WATERMARKS[baseSchool] || ''}
        </div>

        <h3 class="card-title" title="${spell.name}">${spell.name}</h3>

        <div class="card-badges">
          <span class="card-badge" title="${spell.castingTime}">⚡ ${badgeCasting}</span>
          <span class="card-badge">📐 ${spell.range}</span>
          <span class="card-badge">🤘 ${compShort}</span>
          <span class="card-badge">🕒 ${spell.duration}</span>
        </div>

        ${combatHtml ? `<div class="card-combat-bar">${combatHtml}</div>` : ''}

        ${materialText ? `
          <div class="card-material">
            <span>⚗</span>
            <span><em>${materialText}</em></span>
          </div>
        ` : ''}

        <div class="card-divider"></div>

        <div class="card-body-text">
          ${formatDescription(descToRender)}
        </div>

        ${higherToRender ? `
          <div class="card-higher-levels-block">
            <div class="card-higher-title">На больших уровнях •</div>
            <div class="card-higher-text">${formatDescription(higherToRender)}</div>
          </div>
        ` : ''}

        <div class="card-footer-row">
          <div class="card-footer__classes">
            ${classIconsHtml}
          </div>
          <div class="card-footer__en-name">
            [${spell.nameEn ? spell.nameEn : (spell.isCustom ? 'Способность' : spell.name)}]
          </div>
        </div>
      </main>
    `;

    return card;
  }

  // --- Card Back Builder (By Shiz & Continuation) ---
  function createCardBackElement(spell, backContent = null, isBw = false, isZoomed = false) {
    const back = document.createElement('div');
    back.className = 'card-back';
    if (spell) {
      back.dataset.spellId = spell.id;
      if (!isZoomed) {
        back.title = 'Нажмите, чтобы приблизить рубашку и прочитать продолжение';
        back.addEventListener('click', () => openCardZoomModal(spell, 'back'));
      }
    }

    const isUnified = state.settings.backDesignMode === 'unified';

    // 1. If it's an Item Card added via slot filler
    if (spell && spell.isItem) {
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

    const hasOverflow = backContent && (backContent.backDesc || backContent.backHigher);

    if (hasOverflow) {
      back.classList.add('card-back--with-text');

      if (!isZoomed) {
        const totalBackLen = (backContent.backDesc || '').length + (backContent.backHigher || '').length;
        if (totalBackLen > 1100) {
          back.classList.add('card-back--micro');
        } else if (totalBackLen > 700) {
          back.classList.add('card-back--dense');
        } else if (totalBackLen > 480) {
          back.classList.add('card-back--regular');
        } else if (totalBackLen > 260) {
          back.classList.add('card-back--medium');
        } else {
          back.classList.add('card-back--large');
        }
      }

      const schoolLabel = (spell.school || 'Заклинание').toUpperCase();

      back.innerHTML = `
        <div class="card-back__continuation-block">
          <div class="card-back__cont-header">
            <div class="card-back__cont-title-wrap">
              <div class="card-back__cont-title" title="${spell.name}">${spell.name}</div>
              <div class="card-back__cont-subtitle">${schoolLabel}</div>
            </div>
            <span class="card-back__cont-badge">Продолжение</span>
          </div>
          <div class="card-back__cont-text">
            ${formatDescription(backContent.backDesc)}
            ${backContent.backHigher ? `
              <div class="card-higher-levels-block" style="margin-top: 1mm; padding-top: 0.6mm; border-top: 0.3pt solid #d8d2c4;">
                <div class="card-higher-title">На больших уровнях •</div>
                <div class="card-higher-text">${formatDescription(backContent.backHigher)}</div>
              </div>
            ` : ''}
          </div>
        </div>
        <div class="card-back__emblem card-back__emblem--compact">
          ${isUnified ? getD20Svg(isBw, true) : getMagicCircleSvg(isBw, true)}
          <div class="card-back__signature">By Shiz</div>
        </div>
      `;
    } else {
      // Pure ornamental full-art back
      const title = isUnified ? 'D&amp;D 5E' : 'D&amp;D SPELL';
      const emblemSvg = isUnified ? getD20Svg(isBw, false) : getMagicCircleSvg(isBw, false);
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
    }

    return back;
  }

  // --- Slot Filler Controls ---
  function updateSlotFillerButton() {
    const btn = document.getElementById('btn-open-slot-filler');
    if (!btn) return;

    const count = state.deck.length;
    const remainder = count % 9;
    const needed = remainder === 0 ? 0 : 9 - remainder;

    if (needed > 0) {
      btn.style.display = 'inline-flex';
      btn.innerHTML = `✨ Заполнить лист (+${needed})`;
    } else {
      btn.style.display = 'none';
    }
  }

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

  function executeSpellSlotFill(type) {
    const count = state.deck.length;
    const remainder = count % 9;
    const needed = remainder === 0 ? 0 : 9 - remainder;

    if (needed === 0) {
      showToast('Лист уже полностью заполнен (кратен 9)!');
      closeSlotFillerModal();
      return;
    }

    if (type === 'items') {
      const items = (typeof ITEMS_DATA !== 'undefined' && Array.isArray(ITEMS_DATA)) ? ITEMS_DATA : [];
      if (items.length > 0) {
        const popularItems = items.filter(it => it.category === 'potion' || it.category === 'scroll' || it.rarity === 'rare' || it.rarity === 'uncommon');
        const pool = popularItems.length > 0 ? popularItems : items;

        for (let i = 0; i < needed; i++) {
          const it = pool[i % pool.length];
          state.deck.push({
            id: 'item_' + it.id + '_' + i,
            name: it.name,
            nameEn: it.nameEn,
            categoryName: it.categoryName,
            rarity: it.rarity,
            icon: it.icon,
            cost: it.cost,
            attunement: it.attunement,
            properties: it.properties,
            description: it.description,
            lore: it.lore,
            isItem: true,
            instanceId: 'inst_' + Math.random().toString(36).slice(2, 9)
          });
        }
        showToast(`Добавлено ${needed} полезных предметов к листу!`);
      } else {
        showToast('База предметов не найдена');
      }
    } else if (type === 'duplicates') {
      if (state.deck.length === 0) {
        showToast('Колода пуста, нечего дублировать');
        return;
      }
      const existing = [...state.deck];
      for (let i = 0; i < needed; i++) {
        const sp = existing[i % existing.length];
        state.deck.push({ ...sp, instanceId: 'inst_' + Math.random().toString(36).slice(2, 9) });
      }
      showToast(`Продублировано ${needed} заклинаний!`);
    } else if (type === 'notes') {
      for (let i = 0; i < needed; i++) {
        state.deck.push({
          id: 'note_blank_' + Date.now() + '_' + i,
          name: 'Бланк заметок',
          isNoteBlank: true,
          instanceId: 'inst_' + Math.random().toString(36).slice(2, 9)
        });
      }
      showToast(`Добавлено ${needed} бланков для заметок!`);
    }

    closeSlotFillerModal();
    renderDeckList();
    renderSheets();
    saveDeckToStorage();
  }

  // --- Render Sheets (Strictly 9 cards per A4 page, optional mirrored backs) ---
  function renderSheets() {
    const container = document.getElementById('sheets-container');
    if (!container) return;
    container.innerHTML = '';

    applyCardDimensions();
    updateSlotFillerButton();

    const isBw = state.settings.colorMode === 'bw';
    document.body.classList.toggle('theme--bw', isBw);

    const spells = state.deck;
    const cardsPerPage = 9;
    const totalPages = Math.ceil(spells.length / cardsPerPage) || 1;

    for (let page = 0; page < totalPages; page++) {
      const startIndex = page * cardsPerPage;
      const pageSpells = spells.slice(startIndex, startIndex + cardsPerPage);

      // 1. FRONT SHEET
      const frontSheet = document.createElement('section');
      frontSheet.className = 'print-sheet print-sheet--front';
      frontSheet.innerHTML = `<div class="cards-grid"></div>`;
      const frontGrid = frontSheet.querySelector('.cards-grid');

      // Prepare 9 slot items for this page
      const pageSlots = [];
      for (let i = 0; i < cardsPerPage; i++) {
        if (i < pageSpells.length) {
          const spell = pageSpells[i];
          const split = state.settings.printBacks ? splitSpellContent(spell) : null;
          pageSlots.push({ spell, split, isBlank: false });
        } else {
          pageSlots.push({ spell: null, split: null, isBlank: true });
        }
      }

      // Populate front grid
      pageSlots.forEach(slot => {
        if (slot.isBlank) {
          const blank = document.createElement('div');
          blank.className = 'spell-card spell-card--blank';
          blank.innerHTML = '<span>✦ ПУСТАЯ КАРТА ✦</span>';
          frontGrid.appendChild(blank);
        } else {
          frontGrid.appendChild(createCardElement(slot.spell, false, slot.split));
        }
      });

      container.appendChild(frontSheet);

      // 2. BACK SHEET (Horizontally mirrored columns: [2,1,0, 5,4,3, 8,7,6] for duplex printing)
      if (state.settings.printBacks) {
        const backSheet = document.createElement('section');
        backSheet.className = 'print-sheet print-sheet--back';
        backSheet.innerHTML = `<div class="cards-grid"></div>`;
        const backGrid = backSheet.querySelector('.cards-grid');

        const mirroredIndices = [2, 1, 0, 5, 4, 3, 8, 7, 6];

        mirroredIndices.forEach(idx => {
          const slot = pageSlots[idx];
          if (!slot || slot.isBlank) {
            const blank = document.createElement('div');
            blank.className = 'card-back spell-card--blank';
            blank.style.opacity = '0.15';
            blank.innerHTML = '<span>✦ ПУСТАЯ РУБАШКА ✦</span>';
            backGrid.appendChild(blank);
          } else {
            backGrid.appendChild(createCardBackElement(slot.spell, slot.split, isBw));
          }
        });

        container.appendChild(backSheet);
      }
    }
  }

  // --- Preset & Custom Size Modal Handlers ---
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

  // --- Card Zoom Lightbox Modal (Front & Back Interactive Preview) ---
  let currentZoomSpell = null;
  let currentZoomSide = 'front';

  function renderZoomCard(spell, side = 'front') {
    const container = document.getElementById('zoom-modal-card-target');
    const btnFront = document.getElementById('zoom-btn-front');
    const btnBack = document.getElementById('zoom-btn-back');
    if (!container || !spell) return;

    currentZoomSpell = spell;
    currentZoomSide = side;

    const isBw = state.settings.colorMode === 'bw';
    const split = state.settings.printBacks ? splitSpellContent(spell) : null;

    if (btnFront && btnBack) {
      btnFront.classList.toggle('active', side === 'front');
      btnBack.classList.toggle('active', side === 'back');

      if (split && split.hasBackContent) {
        btnBack.innerHTML = '🎴 Рубашка <span style="font-size: 0.72em; opacity: 0.9;">(Продолжение)</span>';
      } else {
        btnBack.innerHTML = '🎴 Рубашка <span style="font-size: 0.72em; opacity: 0.9;">(By Shiz)</span>';
      }
    }

    container.innerHTML = '';
    if (side === 'front') {
      const cardEl = createCardElement(spell, true, split);
      container.appendChild(cardEl);
    } else {
      const backEl = createCardBackElement(spell, split, isBw, true);
      container.appendChild(backEl);
    }
  }

  function openCardZoomModal(spell, side = 'front') {
    const modal = document.getElementById('card-zoom-modal');
    if (!modal || !spell) return;

    renderZoomCard(spell, side);
    modal.classList.add('open');
  }

  function closeCardZoomModal() {
    document.getElementById('card-zoom-modal')?.classList.remove('open');
    currentZoomSpell = null;
  }

  // --- Custom Spell / Ability Modal Handlers ---
  function openCustomSpellModal(spellToEdit = null) {
    const modal = document.getElementById('custom-spell-modal');
    if (!modal) return;

    const titleEl = document.getElementById('custom-spell-title');
    const idInput = document.getElementById('cs-id');
    const nameInput = document.getElementById('cs-name');
    const nameEnInput = document.getElementById('cs-name-en');
    const schoolSelect = document.getElementById('cs-school');
    const levelSelect = document.getElementById('cs-level');
    const castingInput = document.getElementById('cs-casting-time');
    const rangeInput = document.getElementById('cs-range');
    const compInput = document.getElementById('cs-components');
    const durInput = document.getElementById('cs-duration');
    const matInput = document.getElementById('cs-material');
    const classesInput = document.getElementById('cs-classes');
    const descTextarea = document.getElementById('cs-desc');
    const higherTextarea = document.getElementById('cs-higher');

    if (spellToEdit) {
      if (titleEl) titleEl.textContent = '✏️ Редактировать способность';
      idInput.value = spellToEdit.id;
      nameInput.value = spellToEdit.name || '';
      nameEnInput.value = spellToEdit.nameEn || '';
      schoolSelect.value = spellToEdit.school || 'Псионика';
      levelSelect.value = spellToEdit.level !== undefined ? spellToEdit.level.toString() : '1';
      castingInput.value = spellToEdit.castingTime || '1 действие';
      rangeInput.value = spellToEdit.range || '30 футов';
      compInput.value = spellToEdit.components || '—';
      durInput.value = spellToEdit.duration || 'Мгновенная';
      matInput.value = spellToEdit.materialDesc || '';
      classesInput.value = (spellToEdit.classes || []).join(', ');
      descTextarea.value = spellToEdit.description || '';
      higherTextarea.value = spellToEdit.higherLevels || '';
    } else {
      if (titleEl) titleEl.textContent = '✨ Создать способность / заклинание';
      idInput.value = '';
      nameInput.value = '';
      nameEnInput.value = '';
      schoolSelect.value = 'Псионика';
      levelSelect.value = '1';
      castingInput.value = '1 бонусное действие';
      rangeInput.value = 'На себя';
      compInput.value = '—';
      durInput.value = 'Мгновенная';
      matInput.value = '';
      classesInput.value = 'Воин, Пси-воин';
      descTextarea.value = '';
      higherTextarea.value = '';
    }

    modal.classList.add('open');
  }

  function closeCustomSpellModal() {
    document.getElementById('custom-spell-modal')?.classList.remove('open');
  }

  function saveCustomSpellFromForm() {
    const name = document.getElementById('cs-name')?.value.trim();
    const desc = document.getElementById('cs-desc')?.value.trim();

    if (!name) {
      alert('Пожалуйста, укажите название способности.');
      return;
    }
    if (!desc) {
      alert('Пожалуйста, укажите описание эффекта.');
      return;
    }

    const id = document.getElementById('cs-id')?.value || `custom-${Date.now()}`;
    const nameEn = document.getElementById('cs-name-en')?.value.trim() || '';
    const school = document.getElementById('cs-school')?.value || 'Псионика';
    const level = parseInt(document.getElementById('cs-level')?.value || '0', 10);
    const castingTime = document.getElementById('cs-casting-time')?.value.trim() || '1 действие';
    const range = document.getElementById('cs-range')?.value.trim() || '30 футов';
    const components = document.getElementById('cs-components')?.value.trim() || '—';
    const duration = document.getElementById('cs-duration')?.value.trim() || 'Мгновенная';
    const materialDesc = document.getElementById('cs-material')?.value.trim() || '';
    const classesRaw = document.getElementById('cs-classes')?.value || 'Воин, Пси-воин';
    const classes = classesRaw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    const higherLevels = document.getElementById('cs-higher')?.value.trim() || '';

    const spellObj = {
      id,
      name,
      nameEn,
      level,
      school,
      castingTime,
      range,
      components,
      materialDesc,
      duration,
      classes,
      description: desc,
      higherLevels,
      isCustom: true
    };

    const existingIdx = state.customSpells.findIndex(s => s.id === id);
    if (existingIdx >= 0) {
      state.customSpells[existingIdx] = spellObj;
      state.deck = state.deck.map(s => s.id === id ? spellObj : s);
      showToast(`«${name}» обновлено`);
    } else {
      state.customSpells.unshift(spellObj);
      state.deck.push(spellObj);
      showToast(`«${name}» добавлено в колоду!`);
    }

    saveDeckToStorage();
    renderCatalog();
    renderDeckList();
    renderSheets();
    closeCustomSpellModal();
  }

  function deleteCustomSpell(id) {
    const spell = state.customSpells.find(s => s.id === id);
    if (!spell) return;
    if (confirm(`Удалить способность «${spell.name}» навсегда?`)) {
      state.customSpells = state.customSpells.filter(s => s.id !== id);
      state.deck = state.deck.filter(s => s.id !== id);
      saveDeckToStorage();
      renderCatalog();
      renderDeckList();
      renderSheets();
      showToast(`«${spell.name}» удалено`);
    }
  }

  // --- Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    loadDeckFromStorage();

    // Populate class filter in catalog
    const classSelect = document.getElementById('filter-catalog-class');
    if (classSelect) {
      classSelect.innerHTML = `
        <option value="all">Все классы</option>
        <option value="custom">✨ Мои способности</option>
      `;
      SPELL_CLASSES.forEach(cls => {
        const opt = document.createElement('option');
        opt.value = cls.id;
        opt.textContent = `${cls.icon} ${cls.name}`;
        classSelect.appendChild(opt);
      });
    }

    // Default deck if empty: Thorn Whip + 8 other spells for a full sheet of 9
    if (state.deck.length === 0) {
      const defaultIds = [
        'thorn-whip', 'fire-bolt', 'eldritch-blast', 'magic-missile',
        'shield', 'cure-wounds', 'healing-word', 'thunderwave', 'misty-step'
      ];
      state.deck = defaultIds.map(id => SPELLS_DATA.find(s => s.id === id)).filter(Boolean);
    }

    // Sync preset dropdown
    const presetSelect = document.getElementById('select-size-preset');
    if (presetSelect) {
      presetSelect.value = state.settings.preset || 'a4-gap';
      presetSelect.addEventListener('change', (e) => handlePresetSelect(e.target.value));
    }

    // Modal listeners: Custom size
    document.getElementById('modal-close')?.addEventListener('click', closeCustomSizeModal);
    document.getElementById('modal-btn-cancel')?.addEventListener('click', closeCustomSizeModal);
    document.getElementById('modal-btn-save')?.addEventListener('click', applyCustomDimensions);
    document.getElementById('btn-open-custom-size')?.addEventListener('click', openCustomSizeModal);

    document.getElementById('custom-size-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'custom-size-modal') closeCustomSizeModal();
    });

    // Modal listeners: Custom Spell / Ability
    document.getElementById('btn-open-create-spell')?.addEventListener('click', () => openCustomSpellModal());
    document.getElementById('custom-spell-close')?.addEventListener('click', closeCustomSpellModal);
    document.getElementById('cs-btn-cancel')?.addEventListener('click', closeCustomSpellModal);
    document.getElementById('cs-btn-save')?.addEventListener('click', saveCustomSpellFromForm);
    document.getElementById('custom-spell-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'custom-spell-modal') closeCustomSpellModal();
    });

    // Modal listeners: Card Zoom & Two-sided inspection
    document.getElementById('zoom-modal-close')?.addEventListener('click', closeCardZoomModal);
    document.getElementById('zoom-btn-front')?.addEventListener('click', () => {
      if (currentZoomSpell) renderZoomCard(currentZoomSpell, 'front');
    });
    document.getElementById('zoom-btn-back')?.addEventListener('click', () => {
      if (currentZoomSpell) renderZoomCard(currentZoomSpell, 'back');
    });
    document.getElementById('card-zoom-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'card-zoom-modal') {
        closeCardZoomModal();
      }
    });

    // Slot filler modal listeners
    document.getElementById('btn-open-slot-filler')?.addEventListener('click', openSlotFillerModal);
    document.getElementById('slot-filler-close')?.addEventListener('click', closeSlotFillerModal);
    document.getElementById('slot-filler-btn-cancel')?.addEventListener('click', closeSlotFillerModal);
    document.getElementById('slot-filler-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'slot-filler-modal') closeSlotFillerModal();
    });

    document.getElementById('btn-fill-items')?.addEventListener('click', () => executeSpellSlotFill('items'));
    document.getElementById('btn-fill-duplicates')?.addEventListener('click', () => executeSpellSlotFill('duplicates'));
    document.getElementById('btn-fill-notes')?.addEventListener('click', () => executeSpellSlotFill('notes'));

    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCardZoomModal();
        closeCustomSizeModal();
        closeCustomSpellModal();
        closeSlotFillerModal();
      }
    });

    // Search and filter listeners
    document.getElementById('search-spell')?.addEventListener('input', renderCatalog);
    document.getElementById('filter-catalog-class')?.addEventListener('change', renderCatalog);
    document.getElementById('filter-catalog-level')?.addEventListener('change', renderCatalog);

    // Deck actions
    document.getElementById('btn-clear-deck')?.addEventListener('click', () => {
      if (confirm('Очистить всю колоду?')) {
        state.deck = [];
        renderDeckList();
        renderSheets();
        saveDeckToStorage();
        showToast('Колода очищена');
      }
    });

    // Toggle Print Backs (d20 By Shiz)
    const printBacksCheckbox = document.getElementById('toggle-print-backs');
    if (printBacksCheckbox) {
      printBacksCheckbox.checked = state.settings.printBacks !== false;
      printBacksCheckbox.addEventListener('change', (e) => {
        state.settings.printBacks = e.target.checked;
        saveDeckToStorage();
        renderDeckList();
        renderSheets();
        showToast(state.settings.printBacks ? 'Печать рубашек включена' : 'Печать рубашек отключена');
      });
    }

    // Color Mode (Color vs B&W Ink-Saver)
    const colorModeSelect = document.getElementById('select-color-mode');
    if (colorModeSelect) {
      colorModeSelect.value = state.settings.colorMode || 'color';
      colorModeSelect.addEventListener('change', (e) => {
        state.settings.colorMode = e.target.value;
        document.body.classList.toggle('theme--bw', state.settings.colorMode === 'bw');
        saveDeckToStorage();
        renderSheets();
        showToast(state.settings.colorMode === 'bw' ? 'Включён чёрно-белый режим' : 'Включён цветной режим');
      });
    }

    // Corner Style (Rounded vs Sharp 90deg)
    const cornerStyleSelect = document.getElementById('select-corner-style');
    if (cornerStyleSelect) {
      cornerStyleSelect.value = state.settings.cornerStyle || 'rounded';
      cornerStyleSelect.addEventListener('change', (e) => {
        state.settings.cornerStyle = e.target.value;
        applyCardDimensions();
        saveSharedSettings(state.settings);
        saveDeckToStorage();
        renderSheets();
        showToast(state.settings.cornerStyle === 'sharp' ? 'Установлены прямые углы (для резки)' : 'Установлены скруглённые углы (2.5 мм)');
      });
    }

    // Back Style Select (Separate vs Unified)
    const backStyleSelect = document.getElementById('select-back-style');
    if (backStyleSelect) {
      backStyleSelect.value = state.settings.backDesignMode || 'separate';
      backStyleSelect.addEventListener('change', (e) => {
        state.settings.backDesignMode = e.target.value;
        saveSharedSettings(state.settings);
        saveDeckToStorage();
        renderSheets();
        showToast(state.settings.backDesignMode === 'unified' 
          ? 'Включена единая рубашка d20 (для всей колоды)' 
          : 'Включены раздельные рубашки (d20 для магии, Призма для предметов)');
      });
    }

    // Print Button with instant feedback
    const handlePrint = () => {
      const printBtn = document.getElementById('btn-print');
      if (printBtn) printBtn.textContent = '⏳ Открытие окна печати...';
      setTimeout(() => {
        window.print();
        if (printBtn) printBtn.textContent = '🖨️ Распечатать / Сохранить в PDF';
      }, 60);
    };

    document.getElementById('btn-print')?.addEventListener('click', handlePrint);

    // Initial Renders
    renderCatalog();
    renderDeckList();
    renderSheets();

    // Cross-tab / Cross-tool real-time settings synchronization
    window.addEventListener('storage', (e) => {
      if (e.key === SHARED_SETTINGS_KEY) {
        try {
          const updated = JSON.parse(e.newValue);
          if (updated) {
            state.settings = { ...state.settings, ...updated };
            applyCardDimensions();
            renderSheets();
            const presetSelect = document.getElementById('select-size-preset');
            if (presetSelect && state.settings.preset) presetSelect.value = state.settings.preset;
            const colorSelect = document.getElementById('select-color-mode');
            if (colorSelect && state.settings.colorMode) colorSelect.value = state.settings.colorMode;
            const cornerSelect = document.getElementById('select-corner-style');
            if (cornerSelect && state.settings.cornerStyle) cornerSelect.value = state.settings.cornerStyle;
            const backsCheck = document.getElementById('toggle-print-backs');
            if (backsCheck && state.settings.printBacks !== undefined) backsCheck.checked = state.settings.printBacks;
            const backStyleSelect = document.getElementById('select-back-style');
            if (backStyleSelect && state.settings.backDesignMode) backStyleSelect.value = state.settings.backDesignMode;
          }
        } catch (err) {}
      }
    });
  });
})();
