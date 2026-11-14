/* ==========================================================================
   DnD Master Tools — Верстак картодела
   Единый движок печати: Заклинания, Артефакты и Магические предметы.
   Сетка 3×3 (9 карт на А4), Дуплекс, Раздельные / Единые рубашки.
   ========================================================================== */

(() => {
  'use strict';

  // --- Constants: Spells ---
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

  const CLASS_ICONS = {
    'druid': '🍃', 'artificer': '⚙️', 'wizard': '📜', 'sorcerer': '🔮',
    'warlock': '👁️', 'cleric': '☀️', 'bard': '🎭', 'paladin': '🛡️',
    'ranger': '🏹', 'fighter': '⚔️', 'воин': '⚔️', 'пси-воин': '🔮',
    'rogue': '🗡️', 'плут': '🗡️', 'barbarian': '🪓', 'варвар': '🪓',
    'monk': '👊', 'монах': '👊'
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
        <path d="M4 32 Q16 14 28 32 Q16 50 4 32 Z" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" fill="rgba(255,255,255,0.12)"/>
        <circle cx="16" cy="32" r="7" stroke="rgba(255,255,255,0.7)" stroke-width="1.1"/>
        <circle cx="16" cy="32" r="2.8" fill="#ffffff"/>
        <circle cx="16" cy="18" r="1.2" fill="rgba(255,255,255,0.6)"/>
        <circle cx="16" cy="46" r="1.2" fill="rgba(255,255,255,0.6)"/>
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

  const SCHOOL_WATERMARKS = {
    'Преобразование': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 C35 35, 65 60, 50 85 C38 105, 55 115, 50 120" stroke="var(--school-color)" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M47 36 C30 28, 25 45, 45 47" fill="var(--school-color)" fill-opacity="0.25" stroke="var(--school-color)" stroke-width="1.8"/>
        <path d="M53 58 C70 50, 75 67, 55 69" fill="var(--school-color)" fill-opacity="0.25" stroke="var(--school-color)" stroke-width="1.8"/>
        <path d="M48 82 C30 74, 26 92, 45 94" fill="var(--school-color)" fill-opacity="0.25" stroke="var(--school-color)" stroke-width="1.8"/>
        <circle cx="50" cy="60" r="8" fill="var(--school-color)" fill-opacity="0.3"/>
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
      </svg>
    `,
    'Вызов': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="60" r="38" stroke="var(--school-color)" stroke-width="2.2" stroke-dasharray="6 4"/>
        <circle cx="50" cy="60" r="24" stroke="var(--school-color)" stroke-width="2.4"/>
        <circle cx="50" cy="60" r="9" fill="var(--school-color)" fill-opacity="0.35"/>
      </svg>
    `,
    'Иллюзия': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 60 Q50 20, 85 60 Q50 100, 15 60 Z" stroke="var(--school-color)" stroke-width="2.8" fill="var(--school-color)" fill-opacity="0.18"/>
        <circle cx="50" cy="60" r="16" stroke="var(--school-color)" stroke-width="2.2" fill="var(--school-color)" fill-opacity="0.3"/>
        <circle cx="50" cy="60" r="6" fill="var(--school-color)" fill-opacity="0.65"/>
      </svg>
    `,
    'Очарование': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 85 C25 60, 18 35, 35 25 C45 20, 48 30, 50 32 C52 30, 55 20, 65 25 C82 35, 75 60, 50 85 Z" stroke="var(--school-color)" stroke-width="2.8" fill="var(--school-color)" fill-opacity="0.25"/>
        <circle cx="50" cy="50" r="8" fill="var(--school-color)" fill-opacity="0.35"/>
      </svg>
    `,
    'Прорицание': `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 60 Q50 25, 90 60 Q50 95, 10 60 Z" stroke="var(--school-color)" stroke-width="2.8" fill="var(--school-color)" fill-opacity="0.2"/>
        <circle cx="50" cy="60" r="18" stroke="var(--school-color)" stroke-width="2.4"/>
        <circle cx="50" cy="60" r="7" fill="var(--school-color)" fill-opacity="0.75"/>
      </svg>
    `
  };

  // --- Constants: Items ---
  const DEFAULT_RARITIES = {
    common: { id: 'common', name: 'Обычный', color: '#9ca3af', border: '#6b7280' },
    uncommon: { id: 'uncommon', name: 'Необычный', color: '#2ecc71', border: '#27ae60' },
    rare: { id: 'rare', name: 'Редкий', color: '#3b82f6', border: '#2563eb' },
    very_rare: { id: 'very_rare', name: 'Очень редкий', color: '#a855f7', border: '#9333ea' },
    legendary: { id: 'legendary', name: 'Легендарный', color: '#f59e0b', border: '#d97706' },
    artifact: { id: 'artifact', name: 'Артефакт', color: '#ef4444', border: '#dc2626' }
  };

  // --- Application State ---
  const state = {
    deck: [],
    customSpells: [],
    customItems: [],
    activeTab: 'spells',
    zoomTarget: null,
    zoomSide: 'front',
    settings: {
      preset: 'a4-gap',
      widthMm: 64.0,
      heightMm: 91.0,
      gapMm: 2.5,
      cornerStyle: 'rounded',
      printBacks: true,
      colorMode: 'color',
      backDesignMode: 'separate',
      itemCardLayout: 'v5c' // 'v5c' | 'spell_light' | 'hybrid' | 'duplex_art'
    }
  };

  // --- Storage Keys ---
  const STORAGE_WORKSHOP_KEY = 'dnd_card_workshop_deck_v1';
  const SHARED_SETTINGS_KEY = 'dnd_shared_card_print_settings';
  const LEGACY_SPELLS_KEY = 'dnd_master_spell_deck_v2';
  const LEGACY_ITEMS_KEY = 'dnd_item_cards_state_v1';

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

  // Reliable database access without depending on window attachment
  function getAllSpells() {
    let base = [];
    try {
      if (typeof SPELLS_DATA !== 'undefined' && Array.isArray(SPELLS_DATA)) {
        base = SPELLS_DATA;
      } else if (typeof window !== 'undefined' && Array.isArray(window.SPELLS_DATA)) {
        base = window.SPELLS_DATA;
      }
    } catch (e) {
      console.warn('SPELLS_DATA lookup', e);
    }
    return [...base, ...state.customSpells];
  }

  function getAllItems() {
    let base = [];
    try {
      if (typeof ITEMS_DATA !== 'undefined' && Array.isArray(ITEMS_DATA)) {
        base = ITEMS_DATA;
      } else if (typeof window !== 'undefined' && Array.isArray(window.ITEMS_DATA)) {
        base = window.ITEMS_DATA;
      }
    } catch (e) {
      console.warn('ITEMS_DATA lookup', e);
    }
    return [...base, ...state.customItems];
  }

  function applyCardDimensions() {
    const w = parseFloat(state.settings.widthMm) || 64.0;
    const h = parseFloat(state.settings.heightMm) || 91.0;
    const g = parseFloat(state.settings.gapMm) !== undefined ? parseFloat(state.settings.gapMm) : 2.5;
    const radius = state.settings.cornerStyle === 'sharp' ? '0mm' : '2.5mm';
    document.documentElement.style.setProperty('--card-width', `${w}mm`);
    document.documentElement.style.setProperty('--card-height', `${h}mm`);
    document.documentElement.style.setProperty('--card-gap', `${g}mm`);
    document.documentElement.style.setProperty('--card-radius', radius);
  }

  function formatDescription(desc) {
    if (!desc) return '';
    if (desc.includes('<p>') || desc.includes('<table>') || desc.includes('<ul>')) {
      return desc;
    }
    return desc
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => `<p>${p}</p>`)
      .join('');
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

  function getMaterialDesc(spell) {
    if (spell.materialDesc) return spell.materialDesc;
    if (spell.components && spell.components.includes('(')) {
      const match = spell.components.match(/\(([^)]+)\)/);
      return match ? match[1] : '';
    }
    return '';
  }

  function getCombatHighlights(spell) {
    const highlights = [];
    const desc = (spell.description || '').toLowerCase();

    if (desc.includes('колющего')) highlights.push({ icon: '💥', text: 'Колющий урон' });
    else if (desc.includes('урона огнём') || desc.includes('урона огнем')) highlights.push({ icon: '🔥', text: 'Урон огнём' });
    else if (desc.includes('силового урона')) highlights.push({ icon: '✨', text: 'Силовой урон' });
    else if (desc.includes('урона излучением')) highlights.push({ icon: '☀️', text: 'Излучение' });
    else if (desc.includes('урона холодом')) highlights.push({ icon: '❄️', text: 'Урон холодом' });
    else if (desc.includes('урона электричеством')) highlights.push({ icon: '⚡', text: 'Электричество' });
    else if (desc.includes('урона звуком')) highlights.push({ icon: '📢', text: 'Урон звуком' });
    else if (desc.includes('психического урона')) highlights.push({ icon: '🧠', text: 'Психический урон' });
    else if (desc.includes('некротического урона')) highlights.push({ icon: '💀', text: 'Некротический' });
    else if (desc.includes('восстанавливает') && desc.includes('хит')) highlights.push({ icon: '💚', text: 'Исцеление' });

    if (desc.includes('рукопашную атаку')) highlights.push({ icon: '🎯', text: 'Рукопашная атака' });
    else if (desc.includes('дальнобойную атаку')) highlights.push({ icon: '🎯', text: 'Дальнобойная атака' });

    if (desc.includes('спасбросок ловкости')) highlights.push({ icon: '🛡️', text: 'Спас: Ловкость' });
    else if (desc.includes('спасбросок телосложения')) highlights.push({ icon: '🛡️', text: 'Спас: Телосложение' });
    else if (desc.includes('спасбросок мудрости')) highlights.push({ icon: '🛡️', text: 'Спас: Мудрость' });
    else if (desc.includes('спасбросок интеллекта')) highlights.push({ icon: '🛡️', text: 'Спас: Интеллект' });
    else if (desc.includes('спасбросок силы')) highlights.push({ icon: '🛡️', text: 'Спас: Сила' });
    else if (desc.includes('спасбросок харизмы')) highlights.push({ icon: '🛡️', text: 'Спас: Харизма' });

    return highlights;
  }

  // --- Content Splitting for Long Spells (Overflow onto Card Back) ---
  function splitSpellContent(spell) {
    const desc = spell.description || '';
    const higher = spell.higherLevels || '';
    const totalLen = desc.length + higher.length;

    if (totalLen <= 750) {
      return { hasBackContent: false, frontDesc: desc, frontHigher: higher, backDesc: '', backHigher: '' };
    }

    if (desc.includes('<table')) {
      const tableIndex = desc.indexOf('<table');
      const beforeTable = desc.slice(0, tableIndex).trim();
      const tablePart = desc.slice(tableIndex).trim();
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

    if (higher && desc.length <= 650 && higher.length >= 150) {
      return { hasBackContent: true, frontDesc: desc, frontHigher: '', backDesc: '', backHigher: higher };
    }

    const targetHalf = Math.floor(totalLen / 2);
    const paragraphs = desc.split('\n\n');
    let frontParagraphs = [];
    let backParagraphs = [];
    let cumLen = 0;

    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i].trim();
      if (!p) continue;
      if (cumLen === 0 || (cumLen + p.length <= targetHalf + 100 && i < paragraphs.length - 1)) {
        frontParagraphs.push(p);
        cumLen += p.length;
      } else {
        backParagraphs.push(p);
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

  // --- Content Splitting for Long Items (Overflow onto Card Back) ---
  function splitItemContent(item) {
    const desc = item.description || '';
    if (desc.length <= 800) {
      return { hasBackContent: false, frontDesc: desc, backDesc: '' };
    }
    const paragraphs = desc.split('\n\n');
    let front = [];
    let back = [];
    let cum = 0;
    const half = Math.floor(desc.length / 2);

    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i].trim();
      if (!p) continue;
      if (cum === 0 || (cum + p.length <= half + 80 && i < paragraphs.length - 1)) {
        front.push(p);
        cum += p.length;
      } else {
        back.push(p);
      }
    }

    return {
      hasBackContent: true,
      frontDesc: front.join('\n\n'),
      backDesc: back.join('\n\n')
    };
  }

  // ==========================================================================
  // SVG GENERATORS FOR CARD BACKS
  // ==========================================================================

  // 1. Arcane Magic Circle (User Reference Decagram with Runes for Spell Cards)
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
      <svg class="card-back__magic-circle ${isCompact ? 'card-back__magic-circle--compact' : ''}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" ${glowClass}>
        <defs>
          <path id="workshop-circle-runepath" d="M 100,14 A 86,86 0 1,1 99.9,14" fill="none" />
          <radialGradient id="workshop-circle-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${isBw ? 'transparent' : 'rgba(255, 77, 41, 0.22)'}"/>
            <stop offset="70%" stop-color="${isBw ? 'transparent' : 'rgba(245, 158, 11, 0.08)'}"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="92" fill="url(#workshop-circle-glow)"/>

        <!-- Outer Boundary Rings -->
        <circle cx="100" cy="100" r="94" stroke="${strokeColor}" stroke-width="2.2"/>
        <circle cx="100" cy="100" r="91" stroke="${strokeAlt}" stroke-width="1"/>
        <circle cx="100" cy="100" r="77" stroke="${strokeAlt}" stroke-width="1"/>
        <circle cx="100" cy="100" r="75" stroke="${strokeColor}" stroke-width="1.8"/>

        <!-- Arcane Runes Band -->
        <text font-family="'Cinzel', Georgia, serif" font-size="7" font-weight="600" fill="${textColor}" letter-spacing="4px">
          <textPath href="#workshop-circle-runepath">✦ ARCANUM ✦ MAGICA ✦ POTENTIA ✦ AETERNA ✦ VITA ✦ MORTIS ✦ CAELUM ✦</textPath>
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

  // 2. Variant 4: Sacred Relic Prism & Celestial Eye (For Artifacts and Magic Items)
  function getArtifactPrismSvg(isBw = false, isCompact = false) {
    const strokeGold = isBw ? '#000000' : '#c9a84c';
    const strokeBright = isBw ? '#000000' : '#f5c842';
    const fillShieldBg = isBw ? '#ffffff' : 'rgba(15, 17, 34, 0.94)';
    const glow = isBw ? '' : 'style="filter: drop-shadow(0 0 6px rgba(245, 200, 66, 0.55));"';

    return `
      <svg class="card-back__artifact-emblem ${isCompact ? 'card-back__artifact-emblem--compact' : ''}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" ${glow}>
        <defs>
          <radialGradient id="ws-prism-glow-${isBw ? 'bw' : 'col'}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${isBw ? 'transparent' : 'rgba(168, 85, 247, 0.32)'}"/>
            <stop offset="60%" stop-color="${isBw ? 'transparent' : 'rgba(201, 168, 76, 0.12)'}"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
          <radialGradient id="ws-prism-eye-${isBw ? 'bw' : 'col'}" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stop-color="${isBw ? '#ffffff' : '#c084fc'}"/>
            <stop offset="50%" stop-color="${isBw ? '#888888' : '#7e22ce'}"/>
            <stop offset="100%" stop-color="${isBw ? '#000000' : '#3b0764'}"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="url(#ws-prism-glow-${isBw ? 'bw' : 'col'})"/>
        
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
        <circle cx="100" cy="100" r="15" fill="url(#ws-prism-eye-${isBw ? 'bw' : 'col'})" stroke="${strokeGold}" stroke-width="1.5"/>
        <circle cx="100" cy="100" r="6" fill="${isBw ? '#000000' : '#ffffff'}"/>
        <circle cx="102" cy="98" r="2.2" fill="${isBw ? '#ffffff' : '#f5c842'}"/>
      </svg>
    `;
  }

  // 3. Classic d20 (For Unified Deck Mode)
  function getD20Svg(isBw = false, isCompact = false) {
    const strokeGold = isBw ? '#000000' : '#c9a84c';
    const strokeBright = isBw ? '#000000' : '#f5c842';
    const fillCenter = isBw ? '#ffffff' : 'rgba(15, 17, 34, 0.95)';
    const textColor = isBw ? '#000000' : '#f5c842';
    const glowClass = isBw ? '' : 'style="filter: drop-shadow(0 0 6px rgba(245, 200, 66, 0.45));"';

    return `
      <svg class="card-back__d20 ${isCompact ? 'card-back__d20--compact' : ''}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" ${glowClass}>
        <defs>
          <radialGradient id="ws-d20-glow-${isBw ? 'bw' : 'col'}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${isBw ? 'transparent' : 'rgba(245, 200, 66, 0.28)'}"/>
            <stop offset="60%" stop-color="${isBw ? 'transparent' : 'rgba(201, 168, 76, 0.08)'}"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="92" fill="url(#ws-d20-glow-${isBw ? 'bw' : 'col'})"/>

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

  // ==========================================================================
  // CARD BUILDERS (FRONT & BACK)
  // ==========================================================================

  // --- Spell Card Front ---
  function createSpellCardElement(spell, isZoomed = false, splitContent = null) {
    const card = document.createElement('div');
    card.className = 'spell-card';
    card.dataset.id = spell.id;

    if (!isZoomed) {
      card.title = 'Нажмите, чтобы приблизить карту заклинания';
      card.addEventListener('click', () => openCardZoomModal(spell, 'front'));
    }

    const descToRender = splitContent ? splitContent.frontDesc : spell.description;
    const higherToRender = splitContent ? splitContent.frontHigher : spell.higherLevels;
    const textLen = (descToRender || '').length + (higherToRender || '').length;

    if (textLen > 1100) card.classList.add('card--micro');
    else if (textLen > 650) card.classList.add('card--compact');
    else if (textLen > 380) card.classList.add('card--dense');
    else if (textLen > 180) card.classList.add('card--medium');
    else card.classList.add('card--large');

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
        <div class="card-watermark">
          ${SCHOOL_WATERMARKS[spell.school] || SCHOOL_WATERMARKS[baseSchool] || ''}
        </div>

        <h3 class="card-title" title="${spell.name}">${spell.name}</h3>

        <div class="card-badges">
          <span class="card-badge" title="${spell.castingTime}">⚡ ${badgeCasting}</span>
          <span class="card-badge">📐 ${spell.range || 'На себя'}</span>
          <span class="card-badge">🤘 ${compShort}</span>
          <span class="card-badge">🕒 ${spell.duration || 'Мгновенно'}</span>
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

  // ==========================================================================
  // LIGHT MANUSCRIPT ITEM CARDS (SPELL CARD STYLE)
  // Clean white parchment, Left Rarity Ribbon, Strict Item Type Drawings & Typography
  // ==========================================================================

  // --- Visual Type Detector for Items & Artifacts ---
  function detectItemVisualType(item) {
    const name = (item.name || '').toLowerCase();
    const cat = (item.category || '').toLowerCase();
    const catName = (item.categoryName || '').toLowerCase();
    const icon = item.icon || '';

    // 1. Books / Tomes / Grimoires
    if (
      icon === '📖' || icon === '📚' ||
      name.includes('книг') || name.includes('гримуар') || name.includes('фолиант') || name.includes('том ') ||
      name.includes('book') || name.includes('tome') || name.includes('grimoire') ||
      catName.includes('книг') || catName.includes('фолиант')
    ) {
      return 'book';
    }

    // 2. Scrolls
    if (
      icon === '📜' || cat === 'scroll' ||
      name.includes('свиток') || name.includes('манускрипт') || name.includes('scroll')
    ) {
      return 'scroll';
    }

    // 3. Potions & Elixirs / Flasks
    if (
      icon === '🧪' || cat === 'potion' ||
      name.includes('зелье') || name.includes('эликсир') || name.includes('масло') || name.includes('флакон') ||
      name.includes('potion') || name.includes('elixir') || name.includes('oil')
    ) {
      return 'potion';
    }

    // 4. Rings
    if (
      icon === '💍' || cat === 'ring' ||
      name.includes('кольцо') || name.includes('перстень') || name.includes('ring')
    ) {
      return 'ring';
    }

    // 5. Shields & Armor
    if (
      icon === '🛡️' || cat === 'armor' ||
      name.includes('доспех') || name.includes('щит') || name.includes('кираса') || name.includes('кольчуга') ||
      name.includes('лат') || name.includes('шлем') || name.includes('поножи') || name.includes('рукавиц') ||
      name.includes('shield') || name.includes('armor') || name.includes('plate') || name.includes('mail') ||
      catName.includes('доспех') || catName.includes('щит')
    ) {
      return 'armor';
    }

    // 6. Staves & Wands & Rods
    if (
      icon === '🦯' || icon === '🪄' || cat === 'rod' || cat === 'staff' ||
      name.includes('посох') || name.includes('жезл') || name.includes('скипетр') ||
      name.includes('staff') || name.includes('wand') || name.includes('rod')
    ) {
      return 'staff';
    }

    // 7. Weapons (Swords, Axes, Bows, Daggers, Hammers, Maces, Spears)
    if (
      icon === '⚔️' || icon === '🗡️' || icon === '🪓' || icon === '🏹' || icon === '🔨' || cat === 'weapon' ||
      name.includes('меч') || name.includes('клинок') || name.includes('кинжал') || name.includes('рапир') ||
      name.includes('топор') || name.includes('секир') || name.includes('лук') || name.includes('арбалет') ||
      name.includes('молот') || name.includes('булава') || name.includes('копь') || name.includes('трезубец') ||
      name.includes('sword') || name.includes('blade') || name.includes('dagger') || name.includes('axe') ||
      name.includes('bow') || name.includes('hammer') || catName.includes('оружие')
    ) {
      return 'weapon';
    }

    // 8. Artifacts / Relics / Crown
    if (
      icon === '👑' || icon === '🖐️' || cat === 'artifact' ||
      name.includes('корона') || name.includes('венец') || name.includes('тиара') || name.includes('сфера') ||
      name.includes('глаз') || name.includes('рука') || name.includes('артефакт') || name.includes('crown') ||
      catName.includes('артефакт')
    ) {
      return 'artifact';
    }

    // 9. Amulets / Wondrous / Gems / Cloaks
    if (
      icon === '📿' || icon === '💎' || icon === '🔮' ||
      name.includes('амулет') || name.includes('ожерелье') || name.includes('талисман') || name.includes('медальон') ||
      name.includes('плащ') || name.includes('мантия') || name.includes('сапоги') || name.includes('перчатки') ||
      name.includes('браслет') || name.includes('пояс') || name.includes('камень') || name.includes('кристалл')
    ) {
      return 'wondrous';
    }

    return 'wondrous';
  }

  function getItemCrestIcon(visualType, item) {
    if (item.icon && item.icon.length <= 4) return item.icon;
    switch (visualType) {
      case 'book': return '📖';
      case 'scroll': return '📜';
      case 'potion': return '🧪';
      case 'ring': return '💍';
      case 'armor': return '🛡️';
      case 'staff': return '🪄';
      case 'weapon': return '⚔️';
      case 'artifact': return '👑';
      default: return '🔮';
    }
  }

  function getItemCategoryRibbonLabel(visualType, item) {
    switch (visualType) {
      case 'book': return 'ФОЛИАНТ';
      case 'scroll': return 'СВИТОК';
      case 'potion': return 'ЗЕЛЬЕ';
      case 'ring': return 'КОЛЬЦО';
      case 'armor': return 'ДОСПЕХ';
      case 'staff': return 'ПОСОХ';
      case 'weapon': return 'ОРУЖИЕ';
      case 'artifact': return 'АРТЕФАКТ';
      default: return (item.categoryName || 'ПРЕДМЕТ').toUpperCase();
    }
  }

  // Watermarks matching each Item Type
  const ITEM_WATERMARKS = {
    book: (color) => `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 50 85 C 40 80, 20 80, 10 85 L 10 35 C 20 30, 40 30, 50 35 C 60 30, 80 30, 90 35 L 90 85 C 80 80, 60 80, 50 85 Z" stroke="${color}" stroke-width="2.5" fill="${color}" fill-opacity="0.12"/>
        <line x1="50" y1="35" x2="50" y2="85" stroke="${color}" stroke-width="2.2"/>
        <path d="M 20 45 L 42 45 M 20 55 L 42 55 M 20 65 L 38 65" stroke="${color}" stroke-width="1.8" stroke-dasharray="2 3"/>
        <path d="M 58 45 L 80 45 M 58 55 L 80 55 M 58 65 L 75 65" stroke="${color}" stroke-width="1.8" stroke-dasharray="2 3"/>
        <circle cx="50" cy="22" r="4.5" fill="${color}" fill-opacity="0.25"/>
      </svg>
    `,
    scroll: (color) => `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 25 30 C 25 22, 35 22, 35 30 L 75 30 C 75 22, 85 22, 85 30 L 85 85 C 85 93, 75 93, 75 85 L 35 85 C 35 93, 25 93, 25 85 Z" stroke="${color}" stroke-width="2.5" fill="${color}" fill-opacity="0.12"/>
        <circle cx="55" cy="85" r="7" fill="${color}" fill-opacity="0.3"/>
        <line x1="38" y1="42" x2="72" y2="42" stroke="${color}" stroke-width="1.8" stroke-dasharray="3 3"/>
        <line x1="38" y1="52" x2="72" y2="52" stroke="${color}" stroke-width="1.8" stroke-dasharray="3 3"/>
        <line x1="38" y1="62" x2="65" y2="62" stroke="${color}" stroke-width="1.8" stroke-dasharray="3 3"/>
      </svg>
    `,
    potion: (color) => `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 45 25 L 45 35 C 30 50, 25 75, 38 95 C 48 105, 62 105, 72 95 C 85 75, 80 50, 65 35 L 65 25 Z" stroke="${color}" stroke-width="2.5" fill="${color}" fill-opacity="0.15"/>
        <path d="M 32 75 Q 55 65 78 75 C 77 92, 65 100, 55 100 C 45 100, 33 92, 32 75 Z" fill="${color}" fill-opacity="0.25"/>
        <circle cx="50" cy="55" r="4" fill="${color}" fill-opacity="0.3"/>
        <circle cx="58" cy="85" r="3" fill="#ffffff" fill-opacity="0.6"/>
      </svg>
    `,
    ring: (color) => `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="68" rx="38" ry="24" stroke="${color}" stroke-width="3" fill="none"/>
        <ellipse cx="50" cy="68" rx="28" ry="16" stroke="${color}" stroke-width="1.8" fill="${color}" fill-opacity="0.08"/>
        <polygon points="50,22 62,38 38,38" stroke="${color}" stroke-width="2.2" fill="${color}" fill-opacity="0.3"/>
        <line x1="50" y1="22" x2="50" y2="38" stroke="${color}" stroke-width="1.8"/>
      </svg>
    `,
    armor: (color) => `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 22 25 L 78 25 C 78 25, 82 65, 50 105 C 18 65, 22 25, 22 25 Z" stroke="${color}" stroke-width="2.8" fill="${color}" fill-opacity="0.12"/>
        <line x1="50" y1="25" x2="50" y2="95" stroke="${color}" stroke-width="2"/>
        <line x1="28" y1="48" x2="72" y2="48" stroke="${color}" stroke-width="2"/>
        <circle cx="50" cy="48" r="6" fill="${color}" fill-opacity="0.35"/>
      </svg>
    `,
    staff: (color) => `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="25" x2="50" y2="105" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="50" cy="20" r="8" stroke="${color}" stroke-width="2" fill="${color}" fill-opacity="0.25"/>
        <polygon points="50,14 54,20 50,26 46,20" fill="${color}"/>
        <circle cx="50" cy="45" r="3" fill="${color}" fill-opacity="0.3"/>
      </svg>
    `,
    weapon: (color) => `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="25" y1="95" x2="75" y2="25" stroke="${color}" stroke-width="2.8" stroke-linecap="round"/>
        <line x1="75" y1="95" x2="25" y2="25" stroke="${color}" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="50" cy="60" r="10" stroke="${color}" stroke-width="2" fill="${color}" fill-opacity="0.2"/>
      </svg>
    `,
    artifact: (color) => `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,80 25,48 40,65 50,32 60,65 75,48 80,80" stroke="${color}" stroke-width="2.6" fill="${color}" fill-opacity="0.2" stroke-linejoin="round"/>
        <line x1="18" y1="83" x2="82" y2="83" stroke="${color}" stroke-width="3.2"/>
        <circle cx="50" cy="30" r="4" fill="${color}"/>
        <circle cx="25" cy="46" r="3" fill="${color}"/>
        <circle cx="75" cy="46" r="3" fill="${color}"/>
      </svg>
    `,
    wondrous: (color) => `
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="60" r="32" stroke="${color}" stroke-width="2.2" stroke-dasharray="4 3"/>
        <polygon points="50,36 57,53 74,60 57,67 50,84 43,67 26,60 43,53" stroke="${color}" stroke-width="2" fill="${color}" fill-opacity="0.25"/>
        <circle cx="50" cy="60" r="6" fill="${color}"/>
      </svg>
    `
  };

  function getItemWatermarkSvg(visualType, rarityColor) {
    const generator = ITEM_WATERMARKS[visualType] || ITEM_WATERMARKS.wondrous;
    return generator(rarityColor);
  }

  // Ribbon Ornaments matching each Item Type
  const ITEM_RIBBON_ORNAMENTS = {
    book: `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 6 12 C 11 10, 21 10, 26 12 L 26 50 C 21 48, 11 48, 6 50 Z" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" fill="rgba(255,255,255,0.15)"/>
        <line x1="16" y1="11" x2="16" y2="49" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
        <circle cx="16" cy="24" r="2" fill="#ffffff"/>
        <circle cx="16" cy="36" r="2" fill="#ffffff"/>
      </svg>
    `,
    scroll: `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="14" rx="7" ry="3" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" fill="rgba(255,255,255,0.2)"/>
        <line x1="9" y1="14" x2="9" y2="50" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/>
        <line x1="23" y1="14" x2="23" y2="50" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/>
        <ellipse cx="16" cy="50" rx="7" ry="3" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" fill="rgba(255,255,255,0.2)"/>
        <line x1="12" y1="26" x2="20" y2="26" stroke="rgba(255,255,255,0.5)" stroke-width="1" stroke-dasharray="1 2"/>
        <line x1="12" y1="36" x2="20" y2="36" stroke="rgba(255,255,255,0.5)" stroke-width="1" stroke-dasharray="1 2"/>
      </svg>
    `,
    potion: `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 13 14 L 13 22 L 8 34 C 6 39, 7 46, 12 50 C 16 53, 21 51, 23 48 C 26 43, 26 37, 21 28 L 19 22 L 19 14 Z" stroke="rgba(255,255,255,0.6)" stroke-width="1.2" fill="rgba(255,255,255,0.18)"/>
        <circle cx="16" cy="38" r="2" fill="#ffffff"/>
        <circle cx="18" cy="44" r="1.3" fill="#ffffff"/>
      </svg>
    `,
    ring: `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="34" rx="9" ry="15" stroke="rgba(255,255,255,0.65)" stroke-width="1.2" fill="rgba(255,255,255,0.12)"/>
        <polygon points="16,13 21,18 16,23 11,18" fill="#ffffff" stroke="rgba(255,255,255,0.8)" stroke-width="1"/>
      </svg>
    `,
    armor: `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 8 16 L 24 16 C 24 16, 25 36, 16 50 C 7 36, 8 16, 8 16 Z" stroke="rgba(255,255,255,0.65)" stroke-width="1.2" fill="rgba(255,255,255,0.15)"/>
        <line x1="16" y1="16" x2="16" y2="46" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
        <line x1="10" y1="28" x2="22" y2="28" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
      </svg>
    `,
    staff: `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="16" y1="14" x2="16" y2="52" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"/>
        <polygon points="16,8 20,14 16,20 12,14" fill="#ffffff" stroke="rgba(255,255,255,0.8)" stroke-width="1"/>
        <circle cx="16" cy="30" r="1.5" fill="#ffffff"/>
        <circle cx="16" cy="42" r="1.5" fill="#ffffff"/>
      </svg>
    `,
    weapon: `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="16" y1="8" x2="16" y2="54" stroke="rgba(255,255,255,0.7)" stroke-width="1.4"/>
        <line x1="10" y1="44" x2="22" y2="44" stroke="rgba(255,255,255,0.7)" stroke-width="1.2"/>
        <polygon points="16,8 18,16 14,16" fill="#ffffff"/>
        <circle cx="16" cy="54" r="2" fill="#ffffff"/>
      </svg>
    `,
    artifact: `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 7 36 L 9 24 L 13 29 L 16 18 L 19 29 L 23 24 L 25 36 Z" stroke="rgba(255,255,255,0.7)" stroke-width="1.2" fill="rgba(255,255,255,0.2)"/>
        <line x1="6" y1="38" x2="26" y2="38" stroke="rgba(255,255,255,0.8)" stroke-width="1.4"/>
        <circle cx="16" cy="16" r="1.8" fill="#ffffff"/>
        <circle cx="16" cy="48" r="2.5" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
      </svg>
    `,
    wondrous: `
      <svg class="ribbon-ornament" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="16,14 20,24 30,24 22,30 25,40 16,34 7,40 10,30 2,24 12,24" stroke="rgba(255,255,255,0.65)" stroke-width="1" fill="rgba(255,255,255,0.18)"/>
        <circle cx="16" cy="27" r="2.5" fill="#ffffff"/>
      </svg>
    `
  };

  function getItemRibbonOrnament(visualType, isBw) {
    return ITEM_RIBBON_ORNAMENTS[visualType] || ITEM_RIBBON_ORNAMENTS.wondrous;
  }

  // --- Vector Line-Art Vignettes for Items (White background, Crisp Ink-Saving Black Line-Art) ---
  function getItemLineArtSvg(visualType, isBw = false) {
    const strokeCol = isBw ? '#000000' : '#1e293b';

    if (visualType === 'book') {
      return `
        <svg class="item-line-art-svg" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 80 43 C 70 40, 40 39, 20 43 L 20 14 C 40 10, 70 11, 80 14 C 90 11, 120 10, 140 14 L 140 43 C 120 39, 90 40, 80 43 Z" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.4" stroke-linejoin="round"/>
          <line x1="80" y1="14" x2="80" y2="43" stroke="${strokeCol}" stroke-width="1.4"/>
          <path d="M 23 40 C 42 36, 68 37, 77 40 L 77 15 C 68 12, 42 11, 23 15 Z" fill="#ffffff" stroke="${strokeCol}" stroke-width="0.9"/>
          <path d="M 137 40 C 118 36, 92 37, 83 40 L 83 15 C 92 12, 118 11, 137 15 Z" fill="#ffffff" stroke="${strokeCol}" stroke-width="0.9"/>
          <line x1="32" y1="20" x2="68" y2="20" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="2 3"/>
          <line x1="32" y1="25" x2="68" y2="25" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="3 2"/>
          <line x1="32" y1="30" x2="64" y2="30" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="2 2"/>
          <line x1="32" y1="35" x2="60" y2="35" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="3 3"/>
          <line x1="92" y1="20" x2="128" y2="20" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="3 2"/>
          <line x1="92" y1="25" x2="128" y2="25" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="2 3"/>
          <line x1="92" y1="30" x2="124" y2="30" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="2 2"/>
          <line x1="92" y1="35" x2="120" y2="35" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="3 3"/>
          <path d="M 80 14 Q 82 28 85 45 L 80 42 L 75 45 Q 78 28 80 14 Z" fill="${isBw ? '#e5e7eb' : '#dc2626'}" stroke="${strokeCol}" stroke-width="0.9"/>
          <circle cx="14" cy="28" r="1.5" fill="${strokeCol}"/>
          <circle cx="146" cy="28" r="1.5" fill="${strokeCol}"/>
        </svg>
      `;
    }

    if (visualType === 'scroll') {
      return `
        <svg class="item-line-art-svg" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 32 15 C 32 10, 42 10, 42 15 L 118 15 C 118 10, 128 10, 128 15 L 128 35 C 128 40, 118 40, 118 35 L 42 35 C 42 40, 32 40, 32 35 Z" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.3" stroke-linejoin="round"/>
          <ellipse cx="32" cy="25" rx="5" ry="12" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.2"/>
          <path d="M 32 13 C 27 13, 27 37, 32 37" stroke="${strokeCol}" stroke-width="1.2"/>
          <ellipse cx="128" cy="25" rx="5" ry="12" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.2"/>
          <path d="M 128 13 C 133 13, 133 37, 128 37" stroke="${strokeCol}" stroke-width="1.2"/>
          <line x1="44" y1="20" x2="116" y2="20" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="3 3"/>
          <line x1="44" y1="25" x2="116" y2="25" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="4 2"/>
          <line x1="44" y1="30" x2="100" y2="30" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="2 3"/>
          <circle cx="80" cy="36" r="6" fill="${isBw ? '#e5e7eb' : '#b91c1c'}" stroke="${strokeCol}" stroke-width="1"/>
          <path d="M 77 42 L 75 49 L 79 46 L 81 49 L 83 42 Z" fill="${isBw ? '#d1d5db' : '#991b1b'}" stroke="${strokeCol}" stroke-width="0.8"/>
          <circle cx="80" cy="36" r="3" fill="none" stroke="#ffffff" stroke-width="0.8"/>
        </svg>
      `;
    }

    if (visualType === 'potion') {
      return `
        <svg class="item-line-art-svg" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="76,8 84,8 82,14 78,14" fill="${isBw ? '#e5e7eb' : '#a16207'}" stroke="${strokeCol}" stroke-width="1.1"/>
          <rect x="75" y="14" width="10" height="3" rx="1" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.1"/>
          <path d="M 77 17 L 77 22 L 67 31 C 63 35, 63 41, 68 45 C 73 48, 87 48, 92 45 C 97 41, 97 35, 93 31 L 83 22 L 83 17 Z" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.3" stroke-linejoin="round"/>
          <path d="M 68 35 Q 80 32 92 35 C 95 38, 95 43, 90 45 C 85 47, 75 47, 70 45 C 65 43, 65 38, 68 35 Z" fill="${isBw ? '#e5e7eb' : '#e0e7ff'}" stroke="${strokeCol}" stroke-width="0.9"/>
          <circle cx="75" cy="40" r="1.5" fill="${strokeCol}"/>
          <circle cx="84" cy="38" r="1.2" fill="${strokeCol}"/>
          <circle cx="79" cy="43" r="1" fill="${strokeCol}"/>
          <circle cx="80" cy="27" r="1.3" fill="none" stroke="${strokeCol}" stroke-width="0.8"/>
          <path d="M 45 25 C 52 20, 58 28, 62 25" stroke="${strokeCol}" stroke-width="1" stroke-linecap="round"/>
          <circle cx="43" cy="25" r="2" fill="${strokeCol}"/>
          <path d="M 115 25 C 108 20, 102 28, 98 25" stroke="${strokeCol}" stroke-width="1" stroke-linecap="round"/>
          <circle cx="117" cy="25" r="2" fill="${strokeCol}"/>
        </svg>
      `;
    }

    if (visualType === 'ring') {
      return `
        <svg class="item-line-art-svg" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="80" cy="28" rx="28" ry="14" fill="#ffffff" stroke="${strokeCol}" stroke-width="2.2"/>
          <ellipse cx="80" cy="28" rx="22" ry="10" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.1"/>
          <polygon points="73,18 80,8 87,18" fill="${isBw ? '#ffffff' : '#fef08a'}" stroke="${strokeCol}" stroke-width="1.2"/>
          <polygon points="76,18 80,11 84,18" fill="${isBw ? '#e5e7eb' : '#38bdf8'}" stroke="${strokeCol}" stroke-width="0.9"/>
          <line x1="80" y1="11" x2="80" y2="18" stroke="${strokeCol}" stroke-width="0.8"/>
          <line x1="72" y1="17" x2="74" y2="13" stroke="${strokeCol}" stroke-width="1.2"/>
          <line x1="88" y1="17" x2="86" y2="13" stroke="${strokeCol}" stroke-width="1.2"/>
          <circle cx="73" cy="38" r="1" fill="${strokeCol}"/>
          <circle cx="80" cy="39" r="1.2" fill="${strokeCol}"/>
          <circle cx="87" cy="38" r="1" fill="${strokeCol}"/>
          <path d="M 70 8 L 65 5 M 80 5 L 80 1 M 90 8 L 95 5" stroke="${strokeCol}" stroke-width="1.1" stroke-linecap="round"/>
          <line x1="30" y1="28" x2="44" y2="28" stroke="${strokeCol}" stroke-width="1" stroke-dasharray="2 3"/>
          <line x1="116" y1="28" x2="130" y2="28" stroke="${strokeCol}" stroke-width="1" stroke-dasharray="2 3"/>
        </svg>
      `;
    }

    if (visualType === 'armor') {
      return `
        <svg class="item-line-art-svg" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 64 10 L 96 10 C 96 10, 98 28, 80 44 C 62 28, 64 10, 64 10 Z" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.4" stroke-linejoin="round"/>
          <path d="M 68 13 L 92 13 C 92 13, 94 27, 80 39 C 66 27, 68 13, 68 13 Z" fill="#ffffff" stroke="${strokeCol}" stroke-width="0.9"/>
          <line x1="80" y1="13" x2="80" y2="39" stroke="${strokeCol}" stroke-width="1.1"/>
          <line x1="68" y1="22" x2="92" y2="22" stroke="${strokeCol}" stroke-width="1.1"/>
          <circle cx="80" cy="22" r="3" fill="${isBw ? '#e5e7eb' : '#d4af37'}" stroke="${strokeCol}" stroke-width="1"/>
          <circle cx="68" cy="14" r="0.8" fill="${strokeCol}"/>
          <circle cx="92" cy="14" r="0.8" fill="${strokeCol}"/>
          <circle cx="80" cy="12" r="0.8" fill="${strokeCol}"/>
          <path d="M 40 25 L 56 25 M 56 21 L 61 25 L 56 29 Z" fill="${strokeCol}" stroke="${strokeCol}" stroke-width="0.8"/>
          <path d="M 120 25 L 104 25 M 104 21 L 99 25 L 104 29 Z" fill="${strokeCol}" stroke="${strokeCol}" stroke-width="0.8"/>
        </svg>
      `;
    }

    if (visualType === 'staff') {
      return `
        <svg class="item-line-art-svg" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="18" y1="25" x2="132" y2="25" stroke="${strokeCol}" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="35" y1="22" x2="35" y2="28" stroke="${isBw ? '#6b7280' : '#d4af37'}" stroke-width="1.3"/>
          <line x1="40" y1="22" x2="40" y2="28" stroke="${isBw ? '#6b7280' : '#d4af37'}" stroke-width="1.3"/>
          <line x1="80" y1="22" x2="80" y2="28" stroke="${isBw ? '#6b7280' : '#d4af37'}" stroke-width="1.3"/>
          <line x1="120" y1="22" x2="120" y2="28" stroke="${isBw ? '#6b7280' : '#d4af37'}" stroke-width="1.3"/>
          <path d="M 132 21 C 137 18, 142 20, 145 25 C 142 30, 137 32, 132 29 Z" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.2"/>
          <polygon points="144,25 151,19 157,25 151,31" fill="${isBw ? '#e5e7eb' : '#818cf8'}" stroke="${strokeCol}" stroke-width="1.1"/>
          <circle cx="151" cy="14" r="1.2" fill="${strokeCol}"/>
          <circle cx="151" cy="36" r="1.2" fill="${strokeCol}"/>
        </svg>
      `;
    }

    if (visualType === 'artifact') {
      return `
        <svg class="item-line-art-svg" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 52 38 L 108 38 L 108 33 L 52 33 Z" fill="${isBw ? '#e5e7eb' : '#d4af37'}" stroke="${strokeCol}" stroke-width="1.2"/>
          <polygon points="52,33 55,19 65,27 80,13 95,27 105,19 108,33" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.3" stroke-linejoin="round"/>
          <circle cx="55" cy="18" r="2" fill="${strokeCol}"/>
          <circle cx="80" cy="12" r="2.5" fill="${isBw ? '#ffffff' : '#ef4444'}" stroke="${strokeCol}" stroke-width="0.9"/>
          <circle cx="105" cy="18" r="2" fill="${strokeCol}"/>
          <circle cx="62" cy="35.5" r="1.3" fill="${strokeCol}"/>
          <circle cx="71" cy="35.5" r="1.3" fill="${strokeCol}"/>
          <circle cx="80" cy="35.5" r="1.5" fill="${strokeCol}"/>
          <circle cx="89" cy="35.5" r="1.3" fill="${strokeCol}"/>
          <circle cx="98" cy="35.5" r="1.3" fill="${strokeCol}"/>
          <path d="M 80 6 L 80 2 M 72 8 L 68 4 M 88 8 L 92 4" stroke="${strokeCol}" stroke-width="1" stroke-linecap="round"/>
          <path d="M 32 35 Q 42 35 48 31" stroke="${strokeCol}" stroke-width="1"/>
          <circle cx="30" cy="35" r="1.5" fill="${strokeCol}"/>
          <path d="M 128 35 Q 118 35 112 31" stroke="${strokeCol}" stroke-width="1"/>
          <circle cx="130" cy="35" r="1.5" fill="${strokeCol}"/>
        </svg>
      `;
    }

    if (visualType === 'weapon') {
      return `
        <svg class="item-line-art-svg" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 46 25 L 56 21 L 140 24 L 152 25 L 140 26 L 56 29 Z" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.3" stroke-linejoin="round"/>
          <line x1="56" y1="25" x2="132" y2="25" stroke="${strokeCol}" stroke-width="0.9"/>
          <circle cx="70" cy="25" r="1.5" fill="${strokeCol}"/>
          <circle cx="95" cy="25" r="1.5" fill="${strokeCol}"/>
          <circle cx="120" cy="25" r="1.5" fill="${strokeCol}"/>
          <path d="M 54 13 C 55 18, 54 22, 54 25 C 54 28, 55 32, 54 37 C 51 38, 48 35, 49 32 L 49 18 C 48 15, 51 12, 54 13 Z" fill="${isBw ? '#e5e7eb' : '#d4af37'}" stroke="${strokeCol}" stroke-width="1.2"/>
          <rect x="24" y="22.5" width="25" height="5" rx="1" fill="${isBw ? '#374151' : '#451a03'}" stroke="${strokeCol}" stroke-width="1.1"/>
          <line x1="28" y1="22.5" x2="30" y2="27.5" stroke="${strokeCol}" stroke-width="0.8"/>
          <line x1="34" y1="22.5" x2="36" y2="27.5" stroke="${strokeCol}" stroke-width="0.8"/>
          <line x1="40" y1="22.5" x2="42" y2="27.5" stroke="${strokeCol}" stroke-width="0.8"/>
          <circle cx="18" cy="25" r="5" fill="${isBw ? '#e5e7eb' : '#d4af37'}" stroke="${strokeCol}" stroke-width="1.2"/>
          <circle cx="18" cy="25" r="2" fill="${strokeCol}"/>
          <circle cx="146" cy="14" r="1.2" fill="${strokeCol}"/>
          <circle cx="134" cy="36" r="1.2" fill="${strokeCol}"/>
        </svg>
      `;
    }

    // Default: Wondrous Item / Arcane Amulet
    return `
      <svg class="item-line-art-svg" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 60 8 L 80 22 L 100 8" stroke="${strokeCol}" stroke-width="1.1" stroke-dasharray="2 2"/>
        <circle cx="80" cy="22" r="2.5" fill="none" stroke="${strokeCol}" stroke-width="1.1"/>
        <polygon points="80,24 85,32 94,32 87,37 90,46 80,41 70,46 73,37 66,32 75,32" fill="#ffffff" stroke="${strokeCol}" stroke-width="1.2"/>
        <circle cx="80" cy="35" r="4" fill="${isBw ? '#e5e7eb' : '#a855f7'}" stroke="${strokeCol}" stroke-width="1"/>
        <circle cx="80" cy="35" r="1.5" fill="#ffffff"/>
        <circle cx="48" cy="25" r="1.2" fill="${strokeCol}"/>
        <circle cx="112" cy="25" r="1.2" fill="${strokeCol}"/>
      </svg>
    `;
  }

  // --- Format: Light Manuscript Item Card (In Spell Cards Style) ---
  function createItemSpellStyleCardElement(item, isZoomed = false, splitContent = null) {
    const card = document.createElement('div');
    card.className = 'spell-card spell-card--item';
    card.dataset.id = item.id;

    if (!isZoomed) {
      card.title = 'Нажмите, чтобы приблизить карту предмета';
      card.addEventListener('click', () => openCardZoomModal(item, 'front'));
    }

    const isBw = state.settings.colorMode === 'bw';
    const rarityKey = (item.rarity || 'common').toLowerCase();
    const rarityInfo = DEFAULT_RARITIES[rarityKey] || DEFAULT_RARITIES.common;
    const rarityColor = rarityInfo.border || rarityInfo.color || '#475569';
    card.style.setProperty('--school-color', rarityColor);
    card.style.setProperty('--card-rarity-color', rarityColor);

    const visualType = detectItemVisualType(item);
    const crestIcon = getItemCrestIcon(visualType, item);
    const ribbonLabel = getItemCategoryRibbonLabel(visualType, item);

    const descToRender = splitContent ? splitContent.frontDesc : item.description;
    const textLen = (descToRender || '').length;
    const hasCustomImage = Boolean(item.image);
    const hideArt = Boolean(item.hideArt) || (!hasCustomImage && textLen > 320);

    if (hideArt) {
      card.classList.add('item-card--no-art');
    }

    if (hideArt) {
      if (textLen > 1100) card.classList.add('card--micro');
      else if (textLen > 700) card.classList.add('card--compact');
      else if (textLen > 420) card.classList.add('card--dense');
      else if (textLen > 220) card.classList.add('card--medium');
      else card.classList.add('card--large');
    } else {
      if (textLen > 650) card.classList.add('card--micro');
      else if (textLen > 420) card.classList.add('card--compact');
      else if (textLen > 250) card.classList.add('card--dense');
      else if (textLen > 140) card.classList.add('card--medium');
      else card.classList.add('card--large');
    }

    // Quick Ribbon Stats
    const attuneIconHtml = item.attunement ? `
      <div class="card-ribbon__icon-item" title="Требуется настройка: ${item.attunement}">
        <span class="card-ribbon__glyph">🔮</span>
      </div>
    ` : '';

    const chargesRibbonHtml = (item.charges && item.charges > 0) ? `
      <div class="card-ribbon__icon-item" title="Заряды">
        <span>⚡${item.charges}</span>
      </div>
    ` : '';

    const weightRibbonHtml = (item.weight && item.weight !== '—') ? `
      <div class="card-ribbon__icon-item" title="Вес">
        <span>⚖️${item.weight.replace(' кг', 'к')}</span>
      </div>
    ` : '';

    const costRibbonHtml = (item.cost && item.cost !== 'Бесценно' && !item.attunement) ? `
      <div class="card-ribbon__icon-item" title="Цена">
        <span>💰${item.cost.replace(' зм', 'з')}</span>
      </div>
    ` : '';

    // Badges capsules row
    const rarityPill = `<span class="card-badge card-badge--rarity" style="border-color: ${rarityColor};">★ ${rarityInfo.name || item.rarity}</span>`;
    const typePill = `<span class="card-badge">${crestIcon} ${item.categoryName || item.category || 'Предмет'}</span>`;
    const attunePill = item.attunement ? `<span class="card-badge" title="${item.attunement}">🔮 Настройка</span>` : '';
    const tacticalBadge = getItemTacticalBadge(item);
    const tacticalPill = tacticalBadge ? `<span class="card-badge" style="font-weight: 700;">${tacticalBadge}</span>` : '';
    const chargesPill = (item.charges && item.charges > 0) ? `<span class="card-badge">⚡ ${item.charges} зар.</span>` : '';
    const weightPill = (item.weight && item.weight !== '—') ? `<span class="card-badge">⚖️ ${item.weight}</span>` : '';

    // Combat highlights bar
    const combatHighlights = getItemCombatHighlights(item);
    const combatHtml = combatHighlights.length > 0
      ? combatHighlights.map(h => `<span class="card-combat-pill">${h}</span>`).join('<span style="color:#aaa;">·</span>')
      : '';

    // Art Slot
    let artSlotHtml = '';
    if (hasCustomImage) {
      artSlotHtml = `
        <div class="card-art-box card-art-box--custom">
          <img src="${item.image}" alt="${item.name}" class="item-card__user-img">
        </div>
      `;
    } else if (!hideArt) {
      artSlotHtml = `
        <div class="card-art-box card-art-box--vignette">
          ${getItemLineArtSvg(visualType, isBw)}
        </div>
      `;
    } else {
      artSlotHtml = `
        <div class="card-divider-accent">
          <span class="card-divider-glyph">${crestIcon}</span>
        </div>
      `;
    }

    card.innerHTML = `
      <!-- Left Ribbon -->
      <aside class="card-ribbon">
        <div class="card-ribbon__crest">
          <span class="card-ribbon__level-num" style="font-size: 11pt; line-height: 1;">${crestIcon}</span>
        </div>
        <div class="card-ribbon__quick-icons">
          ${attuneIconHtml}
          ${chargesRibbonHtml}
          ${weightRibbonHtml}
          ${costRibbonHtml}
        </div>
        <div class="card-ribbon__ornament">
          ${getItemRibbonOrnament(visualType, isBw)}
        </div>
        <div class="card-ribbon__school">
          ${ribbonLabel}
        </div>
      </aside>

      <!-- Main Card Body -->
      <main class="card-main">
        <div class="card-watermark">
          ${getItemWatermarkSvg(visualType, rarityColor)}
        </div>

        <h3 class="card-title" title="${item.name}">${item.name}</h3>

        <div class="card-badges">
          ${rarityPill}
          ${typePill}
          ${attunePill}
          ${tacticalPill}
          ${chargesPill}
          ${weightPill}
        </div>

        ${combatHtml ? `<div class="card-combat-bar">${combatHtml}</div>` : ''}

        ${artSlotHtml}

        <div class="card-divider"></div>

        <div class="card-body-text">
          ${formatDescription(descToRender)}
        </div>

        ${item.lore ? `<div class="item-lore-line"><em>${item.lore}</em></div>` : ''}

        <div class="card-footer-row">
          <div class="card-footer__classes">
            <span>${crestIcon} ${rarityInfo.name || item.rarity}</span>
          </div>
          <div class="card-footer__en-name">
            [${item.nameEn ? item.nameEn : (item.isCustom ? 'Артефакт' : item.name)}]
          </div>
        </div>
      </main>
    `;

    return card;
  }

  // --- Item Art Themes & Watercolor Aura (Updated to accurately support all categories) ---
  function getItemArtTheme(item) {
    const visualType = detectItemVisualType(item);
    const name = (item.name || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const props = (item.properties || '').toLowerCase();

    if (visualType === 'book') {
      return {
        type: 'book',
        washColor1: 'rgba(254, 240, 199, 0.65)',
        washColor2: 'rgba(230, 215, 185, 0.45)',
        accent: '#9a3412',
        pedestal: '#451a03'
      };
    }

    if (visualType === 'potion') {
      return {
        type: 'potion',
        washColor1: 'rgba(233, 213, 255, 0.65)',
        washColor2: 'rgba(196, 181, 253, 0.35)',
        accent: '#9333ea',
        pedestal: '#4c1d95'
      };
    }

    if (visualType === 'ring') {
      return {
        type: 'ring',
        washColor1: 'rgba(254, 243, 199, 0.7)',
        washColor2: 'rgba(253, 230, 138, 0.4)',
        accent: '#d97706',
        pedestal: '#451a03'
      };
    }

    if (visualType === 'scroll') {
      return {
        type: 'scroll',
        washColor1: 'rgba(254, 240, 199, 0.65)',
        washColor2: 'rgba(243, 232, 215, 0.45)',
        accent: '#b45309',
        pedestal: '#3e2723'
      };
    }

    if (visualType === 'armor') {
      return {
        type: 'armor',
        washColor1: 'rgba(226, 232, 240, 0.75)',
        washColor2: 'rgba(203, 213, 225, 0.45)',
        accent: '#475569',
        pedestal: '#1e293b'
      };
    }

    if (visualType === 'staff') {
      return {
        type: 'staff',
        washColor1: 'rgba(224, 231, 255, 0.7)',
        washColor2: 'rgba(199, 210, 254, 0.4)',
        accent: '#4f46e5',
        pedestal: '#1e1b4b'
      };
    }

    if (visualType === 'artifact') {
      return {
        type: 'artifact',
        washColor1: 'rgba(254, 226, 226, 0.7)',
        washColor2: 'rgba(254, 202, 202, 0.45)',
        accent: '#dc2626',
        pedestal: '#7f1d1d'
      };
    }

    // Weapons & blades
    if (visualType === 'weapon') {
      if (name.includes('лед') || name.includes('мороз') || name.includes('холод') || name.includes('frost') || desc.includes('холод') || props.includes('холод')) {
        return {
          type: 'ice-sword',
          washColor1: 'rgba(165, 230, 226, 0.65)',
          washColor2: 'rgba(125, 211, 230, 0.35)',
          accent: '#0284c7',
          pedestal: '#1e3a5f'
        };
      }
      if (name.includes('пламен') || name.includes('огонь') || name.includes('огн') || name.includes('flame') || name.includes('fire') || desc.includes('огонь') || props.includes('огонь')) {
        return {
          type: 'flame-sword',
          washColor1: 'rgba(254, 202, 202, 0.7)',
          washColor2: 'rgba(253, 230, 138, 0.45)',
          accent: '#dc2626',
          pedestal: '#7f1d1d'
        };
      }
      if (name.includes('солн') || name.includes('свет') || name.includes('sun') || name.includes('holy') || desc.includes('лучист') || props.includes('лучист')) {
        return {
          type: 'sun-blade',
          washColor1: 'rgba(254, 240, 138, 0.65)',
          washColor2: 'rgba(253, 230, 138, 0.4)',
          accent: '#f59e0b',
          pedestal: '#78350f'
        };
      }
      if (name.includes('яд') || name.includes('токсин') || name.includes('venom') || name.includes('poison') || desc.includes('яд')) {
        return {
          type: 'dagger-venom',
          washColor1: 'rgba(167, 243, 208, 0.65)',
          washColor2: 'rgba(110, 231, 183, 0.35)',
          accent: '#059669',
          pedestal: '#064e3b'
        };
      }
      return {
        type: 'sword',
        washColor1: 'rgba(209, 213, 219, 0.6)',
        washColor2: 'rgba(229, 231, 235, 0.35)',
        accent: '#4b5563',
        pedestal: '#1f2937'
      };
    }

    return {
      type: 'wondrous',
      washColor1: 'rgba(224, 231, 255, 0.65)',
      washColor2: 'rgba(216, 180, 254, 0.35)',
      accent: '#7c3aed',
      pedestal: '#2e1065'
    };
  }

  // --- Authentic Fantasy Frame SVG (inspired by user reference image) ---
  function getItemFrameSvg({ rarityColor = '#3b82f6', isBw = false, isRulesBack = false, isHybrid = false }) {
    const bracketStroke = isBw ? '#000000' : '#1e293b';
    const bracketFill = isBw ? '#e5e7eb' : '#b2c5d4';
    const mainStroke = isBw ? '#000000' : '#2c3e50';
    const pedestalFill = isBw ? '#374151' : '#2b4c7e';

    if (isRulesBack) {
      return `
        <svg class="item-card__fantasy-frame" viewBox="0 0 240 340" preserveAspectRatio="none">
          <rect x="4" y="4" width="232" height="332" rx="2" fill="none" stroke="${mainStroke}" stroke-width="1.4"/>
          <path d="M 8 8 L 65 8 L 65 14 L 14 14 L 14 65 L 8 65 Z" fill="${bracketFill}" stroke="${bracketStroke}" stroke-width="1.2"/>
          <path d="M 232 8 L 175 8 L 175 14 L 226 14 L 226 65 L 232 65 Z" fill="${bracketFill}" stroke="${bracketStroke}" stroke-width="1.2"/>
          <path d="M 8 332 L 65 332 L 65 326 L 14 326 L 14 275 L 8 275 Z" fill="${bracketFill}" stroke="${bracketStroke}" stroke-width="1.2"/>
          <path d="M 232 332 L 175 332 L 175 326 L 226 326 L 226 275 L 232 275 Z" fill="${bracketFill}" stroke="${bracketStroke}" stroke-width="1.2"/>
          <path d="M 65 14 L 104 14 L 110 24 L 130 24 L 136 14 L 175 14" fill="none" stroke="${mainStroke}" stroke-width="1.4"/>
          <path d="M 14 65 L 14 150 L 8 155 L 8 175 L 14 180 L 14 275" fill="none" stroke="${mainStroke}" stroke-width="1.4"/>
          <path d="M 226 65 L 226 150 L 232 155 L 232 175 L 226 180 L 226 275" fill="none" stroke="${mainStroke}" stroke-width="1.4"/>
        </svg>
      `;
    }

    if (isHybrid) {
      return `
        <svg class="item-card__fantasy-frame" viewBox="0 0 240 340" preserveAspectRatio="none">
          <rect x="4" y="4" width="232" height="332" rx="2" fill="none" stroke="${mainStroke}" stroke-width="1.4"/>
          <path d="M 8 8 L 50 8 L 50 14 L 14 14 L 14 50 L 8 50 Z" fill="${bracketFill}" stroke="${bracketStroke}" stroke-width="1.2"/>
          <path d="M 232 8 L 190 8 L 190 14 L 226 14 L 226 50 L 232 50 Z" fill="${bracketFill}" stroke="${bracketStroke}" stroke-width="1.2"/>
          <path d="M 8 332 L 50 332 L 50 326 L 14 326 L 14 290 L 8 290 Z" fill="${bracketFill}" stroke="${bracketStroke}" stroke-width="1.2"/>
          <path d="M 232 332 L 190 332 L 190 326 L 226 326 L 226 290 L 232 290 Z" fill="${bracketFill}" stroke="${bracketStroke}" stroke-width="1.2"/>
          <path d="M 50 14 L 105 14 L 112 22 L 128 22 L 135 14 L 190 14" fill="none" stroke="${mainStroke}" stroke-width="1.4"/>
        </svg>
      `;
    }

    // Full Art Frame (exact replica of user reference)
    return `
      <svg class="item-card__fantasy-frame" viewBox="0 0 240 340" preserveAspectRatio="none">
        <defs>
          <linearGradient id="frameGrad-${isBw ? 'bw' : 'col'}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${isBw ? '#e5e7eb' : '#d0dde8'}"/>
            <stop offset="100%" stop-color="${isBw ? '#9ca3af' : '#9bb5c9'}"/>
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="232" height="332" rx="2" fill="none" stroke="${mainStroke}" stroke-width="1.4"/>
        <!-- Top Left Stepped Bracket -->
        <path d="M 8 8 L 65 8 L 65 14 L 14 14 L 14 65 L 8 65 Z" fill="url(#frameGrad-${isBw ? 'bw' : 'col'})" stroke="${bracketStroke}" stroke-width="1.2"/>
        <path d="M 14 14 L 20 20 L 20 50 L 14 50" fill="none" stroke="${bracketStroke}" stroke-width="0.8" opacity="0.6"/>
        <!-- Top Right Stepped Bracket -->
        <path d="M 232 8 L 175 8 L 175 14 L 226 14 L 226 65 L 232 65 Z" fill="url(#frameGrad-${isBw ? 'bw' : 'col'})" stroke="${bracketStroke}" stroke-width="1.2"/>
        <path d="M 226 14 L 220 20 L 220 50 L 226 50" fill="none" stroke="${bracketStroke}" stroke-width="0.8" opacity="0.6"/>
        <!-- Bottom Left Stepped Bracket -->
        <path d="M 8 296 L 65 296 L 65 290 L 14 290 L 14 245 L 8 245 Z" fill="url(#frameGrad-${isBw ? 'bw' : 'col'})" stroke="${bracketStroke}" stroke-width="1.2"/>
        <!-- Bottom Right Stepped Bracket -->
        <path d="M 232 296 L 175 296 L 175 290 L 226 290 L 226 245 L 232 245 Z" fill="url(#frameGrad-${isBw ? 'bw' : 'col'})" stroke="${bracketStroke}" stroke-width="1.2"/>
        <!-- Top Notch (Trapezoidal Cutout) -->
        <path d="M 65 14 L 104 14 L 110 24 L 130 24 L 136 14 L 175 14" fill="none" stroke="${mainStroke}" stroke-width="1.4"/>
        <!-- Left Side Notch -->
        <path d="M 14 65 L 14 150 L 8 155 L 8 175 L 14 180 L 14 245" fill="none" stroke="${mainStroke}" stroke-width="1.4"/>
        <!-- Right Side Notch -->
        <path d="M 226 65 L 226 150 L 232 155 L 232 175 L 226 180 L 226 245" fill="none" stroke="${mainStroke}" stroke-width="1.4"/>
        <!-- Bottom Boundary Lines -->
        <path d="M 14 296 L 45 296 M 195 296 L 226 296" fill="none" stroke="${mainStroke}" stroke-width="1.4"/>
        <!-- Bottom Pedestal Platform with Medallion Arch -->
        <path d="M 45 296 L 52 288 L 105 288 A 15 15 0 0 1 135 288 L 188 288 L 195 296 Z" fill="${pedestalFill}" stroke="${bracketStroke}" stroke-width="1.2"/>
        <circle cx="120" cy="285" r="8" fill="${rarityColor}" stroke="#ffffff" stroke-width="1" opacity="0.95"/>
        <!-- Bottom Enclosed Nameplate Box -->
        <rect x="14" y="302" width="212" height="24" rx="1" fill="${isBw ? '#ffffff' : '#faf7f0'}" stroke="${mainStroke}" stroke-width="1.2"/>
      </svg>
    `;
  }

  // --- Watercolor Aura & Vector Art Generator ---
  function getItemArtworkSvg(item, isBw = false, isCompact = false) {
    const theme = getItemArtTheme(item);
    const strokeMain = isBw ? '#111827' : '#1e293b';
    const bladeFill = isBw ? '#f3f4f6' : '#e0f2fe';
    const bladeGlint = isBw ? '#ffffff' : '#ffffff';
    const hiltGold = isBw ? '#d1d5db' : '#c9a84c';

    if (isCompact) {
      // 220 x 120 viewbox for hybrid top plate
      let artInner = '';
      if (theme.type === 'ice-sword') {
        artInner = `
          <g transform="translate(110, 60) rotate(-62) translate(-22, -80)">
            <path d="M 16 28 C 16 28, 26 62, 23 98 C 20 134, 7 165, 7 165 C 7 165, 28 140, 33 104 C 37 70, 28 28, 28 28 Z" fill="${bladeFill}" stroke="${strokeMain}" stroke-width="1.5"/>
            <path d="M 22 28 C 22 28, 29 72, 26 102 C 23 128, 7 165, 7 165" fill="none" stroke="${isBw ? '#9ca3af' : '#7dd3fc'}" stroke-width="1.2"/>
            <path d="M 12 28 C 8 26, 6 22, 10 18 C 16 16, 28 16, 34 18 C 38 22, 36 26, 32 28 Z" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.3"/>
            <circle cx="22" cy="22" r="2.5" fill="${isBw ? '#4b5563' : '#0284c7'}"/>
            <path d="M 18 18 C 17 12, 18 6, 21 0 C 24 6, 25 12, 24 18 Z" fill="${isBw ? '#374151' : '#1e3a5f'}" stroke="${strokeMain}" stroke-width="1.2"/>
            <path d="M 21 0 C 18 -4, 15 -7, 12 -5 C 10 -3, 11 1, 14 2 Z" fill="${isBw ? '#4b5563' : '#1e3a5f'}" stroke="${strokeMain}" stroke-width="1.1"/>
          </g>
        `;
      } else if (theme.type === 'flame-sword') {
        artInner = `
          <g transform="translate(110, 60) rotate(-62) translate(-22, -80)">
            <path d="M 14 30 Q 8 60 12 85 Q 6 115 14 135 Q 22 155 20 160 Q 28 135 26 110 Q 34 80 28 50 Z" fill="rgba(239, 68, 68, 0.45)" stroke="#f97316" stroke-width="1"/>
            <path d="M 18 30 L 22 155 L 26 30 Z" fill="${bladeFill}" stroke="${strokeMain}" stroke-width="1.4"/>
            <path d="M 8 30 Q 22 24 36 30 L 22 34 Z" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.2"/>
            <rect x="20" y="8" width="4" height="16" rx="1" fill="#7f1d1d" stroke="${strokeMain}" stroke-width="1"/>
            <circle cx="22" cy="6" r="3.5" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.1"/>
          </g>
        `;
      } else if (theme.type === 'book') {
        artInner = `
          <g transform="translate(68, 20)">
            <path d="M 42 65 C 32 60, 12 60, 2 65 L 2 15 C 12 10, 32 10, 42 15 C 52 10, 72 10, 82 15 L 82 65 C 72 60, 52 60, 42 65 Z" fill="#ffffff" stroke="${strokeMain}" stroke-width="1.6"/>
            <line x1="42" y1="15" x2="42" y2="65" stroke="${strokeMain}" stroke-width="1.4"/>
            <line x1="10" y1="26" x2="35" y2="26" stroke="${isBw ? '#9ca3af' : '#b45309'}" stroke-width="1" stroke-dasharray="2 2"/>
            <line x1="10" y1="36" x2="35" y2="36" stroke="${isBw ? '#9ca3af' : '#b45309'}" stroke-width="1" stroke-dasharray="2 2"/>
            <line x1="49" y1="26" x2="74" y2="26" stroke="${isBw ? '#9ca3af' : '#b45309'}" stroke-width="1" stroke-dasharray="2 2"/>
            <line x1="49" y1="36" x2="74" y2="36" stroke="${isBw ? '#9ca3af' : '#b45309'}" stroke-width="1" stroke-dasharray="2 2"/>
            <path d="M 42 15 Q 44 35 46 68 L 42 64 L 38 68 Q 40 35 42 15 Z" fill="${isBw ? '#9ca3af' : '#dc2626'}"/>
          </g>
        `;
      } else if (theme.type === 'artifact') {
        artInner = `
          <g transform="translate(70, 22)">
            <polygon points="5,45 10,15 25,28 40,5 55,28 70,15 75,45" fill="${isBw ? '#ffffff' : '#fef08a'}" stroke="${hiltGold}" stroke-width="2"/>
            <rect x="0" y="45" width="80" height="12" rx="2" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.4"/>
            <circle cx="40" cy="5" r="4" fill="${isBw ? '#ffffff' : '#ef4444'}" stroke="${strokeMain}" stroke-width="1"/>
          </g>
        `;
      } else if (theme.type === 'potion') {
        artInner = `
          <g transform="translate(85, 20)">
            <path d="M 24 14 L 24 25 C 12 37, 8 58, 17 72 C 25 81, 41 81, 49 72 C 58 58, 54 37, 42 25 L 42 14 Z" fill="${isBw ? '#ffffff' : 'rgba(255,255,255,0.7)'}" stroke="${strokeMain}" stroke-width="1.6"/>
            <path d="M 16 50 Q 33 42 50 50 C 55 60, 48 73, 42 76 C 33 79, 24 76, 18 69 Z" fill="${isBw ? '#9ca3af' : theme.accent}" opacity="0.75"/>
            <circle cx="27" cy="60" r="2" fill="#ffffff" opacity="0.8"/>
            <circle cx="38" cy="66" r="1.5" fill="#ffffff" opacity="0.8"/>
            <rect x="22" y="6" width="22" height="8" rx="2" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.2"/>
          </g>
        `;
      } else {
        // Universal Sword or Item
        artInner = `
          <g transform="translate(110, 60) rotate(-62) translate(-22, -80)">
            <path d="M 18 30 L 22 155 L 26 30 Z" fill="${bladeFill}" stroke="${strokeMain}" stroke-width="1.4"/>
            <line x1="22" y1="30" x2="22" y2="140" stroke="${isBw ? '#9ca3af' : '#94a3b8'}" stroke-width="1.1"/>
            <rect x="10" y="27" width="24" height="4" rx="1" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.2"/>
            <rect x="20" y="10" width="4" height="17" rx="1" fill="#334155" stroke="${strokeMain}" stroke-width="1"/>
            <circle cx="22" cy="7" r="3.5" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.1"/>
          </g>
        `;
      }

      return `
        <svg viewBox="0 0 220 120" preserveAspectRatio="xMidYMid meet">
          ${!isBw ? `
            <path d="M 60 20 C 30 40, 20 80, 50 100 C 90 115, 140 110, 175 85 C 205 60, 195 30, 160 18 C 130 8, 90 10, 60 20 Z" fill="${theme.washColor1}" filter="blur(4px)"/>
            <path d="M 75 30 C 50 50, 45 85, 70 100 C 105 110, 155 100, 170 75 C 185 50, 170 30, 140 22 Z" fill="${theme.washColor2}" filter="blur(2px)"/>
          ` : `
            <path d="M 60 20 C 30 40, 20 80, 50 100 C 90 115, 140 110, 175 85 C 205 60, 195 30, 160 18 Z" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.12)" stroke-width="0.8" stroke-dasharray="2 2"/>
          `}
          ${artInner}
        </svg>
      `;
    }

    // Full 240 x 280 viewbox for Full Art Card (exact replica of user reference)
    let fullArtInner = '';
    if (theme.type === 'ice-sword') {
      fullArtInner = `
        <g transform="translate(122, 138) rotate(-34) translate(-22, -80)">
          <!-- Ice Blade -->
          <path d="M 16 28 C 16 28, 26 62, 23 98 C 20 134, 7 165, 7 165 C 7 165, 28 140, 33 104 C 37 70, 28 28, 28 28 Z"
            fill="${bladeFill}" stroke="${strokeMain}" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M 22 28 C 22 28, 29 72, 26 102 C 23 128, 7 165, 7 165"
            fill="none" stroke="${isBw ? '#9ca3af' : '#7dd3fc'}" stroke-width="1.2"/>
          <path d="M 19 32 L 23 92 L 13 145"
            fill="none" stroke="${bladeGlint}" stroke-width="1.2" opacity="0.9"/>
          <!-- Elven Guard -->
          <path d="M 12 28 C 8 26, 6 22, 10 18 C 16 16, 28 16, 34 18 C 38 22, 36 26, 32 28 Z"
            fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.3"/>
          <circle cx="22" cy="22" r="2.5" fill="${isBw ? '#4b5563' : '#0284c7'}" stroke="${strokeMain}" stroke-width="0.8"/>
          <!-- Grip -->
          <path d="M 18 18 C 17 12, 18 6, 21 0 C 24 6, 25 12, 24 18 Z"
            fill="${isBw ? '#374151' : '#1e3a5f'}" stroke="${strokeMain}" stroke-width="1.2"/>
          <line x1="18" y1="14" x2="24" y2="12" stroke="${hiltGold}" stroke-width="1"/>
          <line x1="19" y1="8" x2="23" y2="6" stroke="${hiltGold}" stroke-width="1"/>
          <!-- Carved Animal Pommel -->
          <path d="M 21 0 C 18 -4, 15 -7, 12 -5 C 10 -3, 11 1, 14 2 C 16 3, 20 4, 21 0 Z"
            fill="${isBw ? '#4b5563' : '#1e3a5f'}" stroke="${strokeMain}" stroke-width="1.1"/>
          <circle cx="14" cy="-3" r="0.9" fill="${isBw ? '#ffffff' : '#38bdf8'}"/>
        </g>
      `;
    } else if (theme.type === 'flame-sword') {
      fullArtInner = `
        <g transform="translate(122, 138) rotate(-32) translate(-22, -80)">
          <path d="M 14 30 Q 8 60 12 85 Q 6 115 14 135 Q 22 155 20 160 Q 28 135 26 110 Q 34 80 28 50 Z" fill="rgba(239, 68, 68, 0.45)" stroke="#f97316" stroke-width="1.2"/>
          <path d="M 18 30 L 22 155 L 26 30 Z" fill="${bladeFill}" stroke="${strokeMain}" stroke-width="1.5"/>
          <path d="M 8 30 Q 22 24 36 30 L 22 34 Z" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.3"/>
          <rect x="20" y="8" width="4" height="16" rx="1" fill="#7f1d1d" stroke="${strokeMain}" stroke-width="1.2"/>
          <circle cx="22" cy="6" r="3.5" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.2"/>
        </g>
      `;
    } else if (theme.type === 'potion') {
      fullArtInner = `
        <g transform="translate(90, 85)">
          <path d="M 30 18 L 30 32 C 15 48, 10 75, 22 92 C 32 104, 52 104, 62 92 C 74 75, 69 48, 54 32 L 54 18 Z"
            fill="${isBw ? '#ffffff' : 'rgba(255,255,255,0.75)'}" stroke="${strokeMain}" stroke-width="2"/>
          <path d="M 20 65 Q 42 55 64 65 C 70 78, 62 94, 54 98 C 42 102, 30 98, 22 90 Z"
            fill="${isBw ? '#9ca3af' : theme.accent}" opacity="0.75"/>
          <circle cx="34" cy="78" r="3" fill="#ffffff" opacity="0.85"/>
          <circle cx="48" cy="85" r="2" fill="#ffffff" opacity="0.85"/>
          <rect x="28" y="8" width="28" height="10" rx="2" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.4"/>
        </g>
      `;
    } else if (theme.type === 'book') {
      fullArtInner = `
        <g transform="translate(120, 140)">
          <path d="M 0 50 C -25 40, -65 42, -90 52 L -90 -45 C -65 -55, -25 -52, 0 -42 C 25 -52, 65 -55, 90 -45 L 90 52 C 65 42, 25 40, 0 50 Z"
            fill="${isBw ? '#ffffff' : '#fefdfa'}" stroke="${strokeMain}" stroke-width="3" stroke-linejoin="round"/>
          <line x1="0" y1="-42" x2="0" y2="50" stroke="${strokeMain}" stroke-width="2.5"/>
          <polygon points="-90,-45 -70,-45 -90,-25" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.2"/>
          <polygon points="90,-45 70,-45 90,-25" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.2"/>
          <polygon points="-90,52 -70,52 -90,32" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.2"/>
          <polygon points="90,52 70,52 90,32" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.2"/>
          <line x1="-75" y1="-25" x2="-15" y2="-25" stroke="${isBw ? '#9ca3af' : '#78350f'}" stroke-width="1.8" stroke-dasharray="4 4"/>
          <line x1="-75" y1="-10" x2="-15" y2="-10" stroke="${isBw ? '#9ca3af' : '#78350f'}" stroke-width="1.8" stroke-dasharray="6 3"/>
          <line x1="-75" y1="5" x2="-25" y2="5" stroke="${isBw ? '#9ca3af' : '#78350f'}" stroke-width="1.8" stroke-dasharray="3 4"/>
          <line x1="-75" y1="20" x2="-35" y2="20" stroke="${isBw ? '#9ca3af' : '#78350f'}" stroke-width="1.8" stroke-dasharray="5 3"/>
          <line x1="15" y1="-25" x2="75" y2="-25" stroke="${isBw ? '#9ca3af' : '#78350f'}" stroke-width="1.8" stroke-dasharray="5 3"/>
          <line x1="15" y1="-10" x2="75" y2="-10" stroke="${isBw ? '#9ca3af' : '#78350f'}" stroke-width="1.8" stroke-dasharray="4 4"/>
          <line x1="15" y1="5" x2="65" y2="5" stroke="${isBw ? '#9ca3af' : '#78350f'}" stroke-width="1.8" stroke-dasharray="6 3"/>
          <line x1="15" y1="20" x2="55" y2="20" stroke="${isBw ? '#9ca3af' : '#78350f'}" stroke-width="1.8" stroke-dasharray="3 4"/>
          <path d="M 0 -42 Q 4 -5 6 62 L 0 57 L -6 62 Q -2 -5 0 -42 Z" fill="${isBw ? '#4b5563' : '#b91c1c'}" stroke="${strokeMain}" stroke-width="1.2"/>
        </g>
      `;
    } else if (theme.type === 'artifact') {
      fullArtInner = `
        <g transform="translate(120, 140)">
          <polygon points="-75,45 -70,-15 -35,5 0,-45 35,5 70,-15 75,45" fill="${isBw ? '#ffffff' : '#fef08a'}" stroke="${hiltGold}" stroke-width="3" stroke-linejoin="round"/>
          <rect x="-80" y="45" width="160" height="15" rx="3" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="2"/>
          <circle cx="0" cy="-45" r="7" fill="${isBw ? '#ffffff' : '#ef4444'}" stroke="${strokeMain}" stroke-width="1.5"/>
          <circle cx="-70" cy="-15" r="5" fill="${isBw ? '#ffffff' : '#3b82f6'}" stroke="${strokeMain}" stroke-width="1.2"/>
          <circle cx="70" cy="-15" r="5" fill="${isBw ? '#ffffff' : '#3b82f6'}" stroke="${strokeMain}" stroke-width="1.2"/>
        </g>
      `;
    } else if (theme.type === 'ring') {
      fullArtInner = `
        <g transform="translate(120, 140)">
          <ellipse cx="0" cy="15" rx="55" ry="32" fill="none" stroke="${hiltGold}" stroke-width="10"/>
          <ellipse cx="0" cy="15" rx="55" ry="32" fill="none" stroke="${isBw ? '#ffffff' : '#f5c842'}" stroke-width="3"/>
          <path d="M -18 -8 L 0 -28 L 18 -8 L 12 5 L -12 5 Z" fill="${isBw ? '#374151' : '#1e40af'}" stroke="${hiltGold}" stroke-width="2"/>
          <polygon points="0,-28 14,-10 0,2 -14,-10" fill="${isBw ? '#4b5563' : '#3b82f6'}"/>
          <polygon points="0,-28 0,2 14,-10" fill="${isBw ? '#9ca3af' : '#60a5fa'}" opacity="0.6"/>
          <circle cx="-2" cy="-14" r="3" fill="#ffffff" opacity="0.9"/>
        </g>
      `;
    } else if (theme.type === 'armor') {
      fullArtInner = `
        <g transform="translate(120, 140)">
          <path d="M 0 -70 C 45 -70, 55 -60, 55 -10 C 55 45, 0 75, 0 75 C 0 75, -55 45, -55 -10 C -55 -60, -45 -70, 0 -70 Z"
            fill="${isBw ? '#4b5563' : '#334155'}" stroke="${hiltGold}" stroke-width="4"/>
          <path d="M 0 -62 C 38 -62, 46 -52, 46 -8 C 46 38, 0 64, 0 64 C 0 64, -46 38, -46 -8 C -46 -52, -38 -62, 0 -62 Z"
            fill="${isBw ? '#1f2937' : '#1e293b'}" stroke="${hiltGold}" stroke-width="1.5"/>
          <polygon points="0,-45 10,-10 40,-10 15,10 25,45 0,25 -25,45 -15,10 -40,-10 -10,-10" fill="${hiltGold}"/>
          <circle cx="0" cy="0" r="6" fill="${isBw ? '#ffffff' : '#dc2626'}"/>
        </g>
      `;
    } else if (theme.type === 'scroll') {
      fullArtInner = `
        <g transform="translate(120, 140)">
          <path d="M -50 -60 C -30 -70, 30 -70, 50 -60 L 45 60 C 25 50, -35 50, -55 60 Z"
            fill="${isBw ? '#f3f4f6' : '#fef3c7'}" stroke="${strokeMain}" stroke-width="2"/>
          <path d="M -50 -60 C -60 -60, -60 -50, -50 -50 C -40 -50, -40 -60, -50 -60"
            fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.5"/>
          <path d="M 50 -60 C 60 -60, 60 -50, 50 -50 C 40 -50, 40 -60, 50 -60"
            fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.5"/>
          <path d="M -55 60 C -65 60, -65 70, -55 70 C -45 70, -45 60, -55 60"
            fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.5"/>
          <path d="M 45 60 C 55 60, 55 70, 45 70 C 35 70, 35 60, 45 60"
            fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.5"/>
          <line x1="-30" y1="-30" x2="30" y2="-30" stroke="${isBw ? '#9ca3af' : '#b45309'}" stroke-width="1.5" stroke-dasharray="4 3"/>
          <line x1="-30" y1="-10" x2="25" y2="-10" stroke="${isBw ? '#9ca3af' : '#b45309'}" stroke-width="1.5" stroke-dasharray="6 2"/>
          <circle cx="0" cy="15" r="10" fill="none" stroke="${isBw ? '#4b5563' : '#7c3aed'}" stroke-width="1.5"/>
          <polygon points="0,7 6,19 -6,19" fill="${isBw ? '#4b5563' : '#7c3aed'}"/>
        </g>
      `;
    } else if (theme.type === 'sun-blade') {
      fullArtInner = `
        <g transform="translate(122, 138) rotate(-32) translate(-22, -80)">
          <rect x="19" y="30" width="6" height="135" rx="3" fill="#ffffff" stroke="${isBw ? '#4b5563' : '#f59e0b'}" stroke-width="2"/>
          <line x1="22" y1="30" x2="22" y2="160" stroke="${isBw ? '#9ca3af' : '#fef08a'}" stroke-width="1.5"/>
          <circle cx="22" cy="165" r="4" fill="${isBw ? '#ffffff' : '#fbbf24'}" opacity="0.8"/>
          <rect x="8" y="26" width="28" height="5" rx="1" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.3"/>
          <rect x="19" y="8" width="6" height="18" rx="1" fill="${isBw ? '#1f2937' : '#78350f'}" stroke="${strokeMain}" stroke-width="1.2"/>
          <circle cx="22" cy="5" r="4" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.2"/>
        </g>
      `;
    } else if (theme.type === 'dagger-venom') {
      fullArtInner = `
        <g transform="translate(122, 138) rotate(-40) translate(-22, -80)">
          <path d="M 16 35 Q 22 75 14 120 Q 22 135 22 140 Q 22 135 30 120 Q 22 75 28 35 Z" fill="${isBw ? '#d1d5db' : '#a7f3d0'}" stroke="${strokeMain}" stroke-width="1.5"/>
          <path d="M 18 60 Q 22 80 18 100" stroke="${isBw ? '#4b5563' : '#059669'}" stroke-width="2" fill="none"/>
          <rect x="8" y="32" width="28" height="4" rx="1" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.3"/>
          <rect x="19" y="14" width="6" height="18" rx="1" fill="#1e293b" stroke="${strokeMain}" stroke-width="1.2"/>
          <circle cx="22" cy="10" r="3.5" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.2"/>
        </g>
      `;
    } else {
      fullArtInner = `
        <g transform="translate(122, 138) rotate(-34) translate(-22, -80)">
          <path d="M 18 30 L 22 155 L 26 30 Z" fill="${bladeFill}" stroke="${strokeMain}" stroke-width="1.5"/>
          <line x1="22" y1="30" x2="22" y2="140" stroke="${isBw ? '#9ca3af' : '#94a3b8'}" stroke-width="1.2"/>
          <rect x="10" y="27" width="24" height="4" rx="1" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.3"/>
          <rect x="20" y="10" width="4" height="17" rx="1" fill="#334155" stroke="${strokeMain}" stroke-width="1.2"/>
          <circle cx="22" cy="7" r="3.5" fill="${hiltGold}" stroke="${strokeMain}" stroke-width="1.2"/>
        </g>
      `;
    }

    return `
      <svg viewBox="0 0 240 280" preserveAspectRatio="xMidYMid meet">
        ${!isBw ? `
          <path d="M 75 50 C 35 75, 25 135, 45 180 C 70 225, 150 235, 190 195 C 225 155, 220 95, 180 60 C 145 30, 105 35, 75 50 Z"
            fill="${theme.washColor1}" filter="blur(6px)"/>
          <path d="M 90 65 C 55 95, 50 150, 75 185 C 105 220, 175 210, 190 165 C 205 120, 185 75, 150 55 C 120 40, 105 50, 90 65 Z"
            fill="${theme.washColor2}" filter="blur(3px)"/>
        ` : `
          <path d="M 75 50 C 35 75, 25 135, 45 180 C 70 225, 150 235, 190 195 Z" fill="rgba(0,0,0,0.04)" stroke="rgba(0,0,0,0.12)" stroke-width="0.8" stroke-dasharray="3 3"/>
        `}
        ${fullArtInner}
      </svg>
    `;
  }

  // --- Quick highlights for item properties ---
  function getItemCombatHighlights(item) {
    const pills = [];
    if (item.categoryName) pills.push(item.categoryName);
    if (item.properties) {
      const parts = item.properties.split(',').map(p => p.trim());
      if (parts[0]) pills.push(parts[0]);
    }
    if (item.attunement && item.attunement.trim()) {
      pills.push('🔮 Настройка');
    }
    return pills;
  }

  // --- Hybrid Item Card Front (All-in-one: Art Window + Nameplate + Stats + Rules) ---
  function createItemHybridCardElement(item, isZoomed = false, splitContent = null) {
    const card = document.createElement('div');
    card.className = 'item-card item-card--hybrid';
    card.dataset.id = item.id;

    if (!isZoomed) {
      card.title = 'Нажмите, чтобы приблизить карту предмета';
      card.addEventListener('click', () => openCardZoomModal(item, 'front'));
    }

    const isBw = state.settings.colorMode === 'bw';
    const rarityKey = (item.rarity || 'common').toLowerCase();
    const rarityInfo = DEFAULT_RARITIES[rarityKey] || DEFAULT_RARITIES.common;
    card.style.setProperty('--card-rarity-color', rarityInfo.border);

    // Charge pips
    let chargesHtml = '';
    if (item.charges && item.charges > 0) {
      const pips = '● '.repeat(Math.min(item.charges, 12)).trim();
      chargesHtml = `
        <div class="item-card__charges-bar">
          <span>Заряды (${item.charges}):</span>
          <span class="item-card__charge-pips">${pips}</span>
        </div>
      `;
    }

    const descToRender = splitContent ? splitContent.frontDesc : item.description;
    const combatHighlights = getItemCombatHighlights(item);
    const combatBarHtml = combatHighlights.length > 0
      ? `<div class="item-card__combat-bar">${combatHighlights.map(h => `<span>${h}</span>`).join('<span>·</span>')}</div>`
      : '';

    card.innerHTML = `
      ${getItemFrameSvg({ rarityColor: rarityInfo.color, isBw, isHybrid: true })}

      <!-- Top Art Plate with Watercolor Wash -->
      <div class="item-card__art-plate">
        ${getItemArtworkSvg(item, isBw, true)}
      </div>

      <!-- Nameplate Banner -->
      <div class="item-card__nameplate">
        <h3 class="item-card__title" title="${item.name}">${item.name}</h3>
        <span class="item-card__rarity-pill">${item.rarity || 'Предмет'}</span>
      </div>

      <!-- Main Body: Stats, Properties, Rules -->
      <div class="item-card__body">
        ${combatBarHtml}
        ${chargesHtml}

        <div class="item-card__text">
          ${formatDescription(descToRender)}
        </div>

        ${item.lore ? `<div class="item-card__lore">${item.lore}</div>` : ''}
      </div>

      <!-- Footer Signature -->
      <footer class="item-card__footer">
        <span>D&amp;D 5e • ${item.categoryName || 'Предмет'}</span>
        <span>By Shiz</span>
      </footer>
    `;

    return card;
  }

  // --- Full Art Item Card Front (Exact replica of user reference image) ---
  function createItemFullArtCardElement(item, isZoomed = false) {
    const card = document.createElement('div');
    card.className = 'item-card item-card--full-art';
    card.dataset.id = item.id;

    if (!isZoomed) {
      card.title = 'Нажмите, чтобы приблизить лицевую сторону';
      card.addEventListener('click', () => openCardZoomModal(item, 'front'));
    }

    const isBw = state.settings.colorMode === 'bw';
    const rarityKey = (item.rarity || 'common').toLowerCase();
    const rarityInfo = DEFAULT_RARITIES[rarityKey] || DEFAULT_RARITIES.common;
    card.style.setProperty('--card-rarity-color', rarityInfo.border);

    card.innerHTML = `
      ${getItemFrameSvg({ rarityColor: rarityInfo.color, isBw, hasNameplate: true })}

      <!-- Central Full-Height Art Plate with Watercolor Aura -->
      <div class="item-card__art-full">
        ${getItemArtworkSvg(item, isBw, false)}
      </div>

      <!-- Bottom Framed Nameplate Banner -->
      <div class="item-card__full-nameplate">
        ${item.name}
      </div>
    `;

    return card;
  }

  // --- Rules Card Back for Duplex Art Mode (Matching reference right card) ---
  function createItemRulesCardElement(item, isZoomed = false) {
    const card = document.createElement('div');
    card.className = 'item-card item-card--rules-back';
    card.dataset.id = item.id;

    if (!isZoomed) {
      card.title = 'Нажмите, чтобы приблизить оборотную сторону';
      card.addEventListener('click', () => openCardZoomModal(item, 'back'));
    }

    const isBw = state.settings.colorMode === 'bw';
    const rarityKey = (item.rarity || 'common').toLowerCase();
    const rarityInfo = DEFAULT_RARITIES[rarityKey] || DEFAULT_RARITIES.common;
    card.style.setProperty('--card-rarity-color', rarityInfo.border);

    let chargesHtml = '';
    if (item.charges && item.charges > 0) {
      const pips = '● '.repeat(Math.min(item.charges, 12)).trim();
      chargesHtml = `
        <div class="item-card__charges-bar" style="margin-bottom: 1.2mm;">
          <span>Заряды (${item.charges}):</span>
          <span class="item-card__charge-pips">${pips}</span>
        </div>
      `;
    }

    const combatHighlights = getItemCombatHighlights(item);
    const combatBarHtml = combatHighlights.length > 0
      ? `<div class="rules-combat-bar">${combatHighlights.map(h => `<span>${h}</span>`).join('<span>·</span>')}</div>`
      : '';

    card.innerHTML = `
      ${getItemFrameSvg({ rarityColor: rarityInfo.color, isBw, isRulesBack: true })}

      <div class="rules-header">
        <h3 class="rules-title">${item.name}</h3>
        <div class="rules-meta">
          ${item.categoryName || 'Магический предмет'} • ${item.rarity || 'Обычный'}
          ${item.attunement ? ` • ${item.attunement}` : ''}
          ${item.weight && item.weight !== '—' ? ` • ⚖️ ${item.weight}` : ''}
        </div>
      </div>

      ${combatBarHtml}
      ${chargesHtml}

      <div class="rules-text">
        ${formatDescription(item.description)}
        ${item.lore ? `<div class="rules-lore">${item.lore}</div>` : ''}
      </div>

      <div class="rules-footer">
        <span>D&amp;D 5e • ${item.rarity || 'Предмет'}</span>
        <span>By Shiz</span>
      </div>
    `;

    return card;
  }

  // Helper to extract tactical combat badge
  function getItemTacticalBadge(item) {
    if (item.damage) return `💥 ${item.damage}`;
    const cat = (item.category || '').toLowerCase();
    const props = (item.properties || '');
    const desc = (item.description || '');

    // Look for damage dice in properties or desc (e.g. 1к8, 2к6, 1к10+3)
    const dmgMatch = (props + ' ' + desc).match(/\b(\d+к\d+(?:\s*[+-]\s*\d+)?)\b/i);

    if (cat === 'weapon') {
      if (dmgMatch) return `💥 ${dmgMatch[1]}`;
      return `💥 1к8+СИЛ`;
    }
    if (cat === 'armor' || cat === 'shield') {
      const acMatch = (props + ' ' + desc).match(/\+(\d+)\s*(?:к\s*кд|к\s*КД|ac|AC)?/i);
      if (acMatch) return `🛡️ +${acMatch[1]} к КД`;
      return `🛡️ Доспех/Щит`;
    }
    if (cat === 'potion') {
      if (dmgMatch) return `❤️ ${dmgMatch[1]}`;
      return `🧪 Зелье`;
    }
    if (cat === 'ring') return `💍 Кольцо`;
    if (cat === 'scroll') return `📜 Свиток`;
    if (cat === 'rod' || cat === 'staff' || cat === 'wand') return `🪄 Фокусировка`;
    if (dmgMatch) return `💥 ${dmgMatch[1]}`;
    return `👑 Артефакт`;
  }

  // --- Variant 5C: Tactical Light Front (Collector HUD, White/Light theme, Compact Art, Max Rules Space) ---
  function createItemV5CCardElement(item, isZoomed = false, splitContent = null) {
    const card = document.createElement('div');
    card.className = 'item-card item-card--v5c card--variant-5c';
    card.dataset.id = item.id;

    if (!isZoomed) {
      card.title = 'Нажмите, чтобы приблизить карту предмета (5C)';
      card.addEventListener('click', () => openCardZoomModal(item, 'front'));
    }

    const isBw = state.settings.colorMode === 'bw';
    const rarityKey = (item.rarity || 'common').toLowerCase();
    const rarityInfo = DEFAULT_RARITIES[rarityKey] || DEFAULT_RARITIES.common;
    const rarityColor = isBw ? '#475569' : (rarityInfo.border || rarityInfo.color || '#c9a84c');
    card.style.setProperty('--card-rarity-color', rarityColor);

    const visualType = detectItemVisualType(item);
    const crestIcon = getItemCrestIcon(visualType, item);

    const descToRender = splitContent ? splitContent.frontDesc : item.description;
    const textLen = (descToRender || '').length;

    // Check if custom user image exists
    const hasCustomImage = Boolean(item.image);
    const hasImage = hasCustomImage && !item.hideArt;

    if (!hasImage) {
      card.classList.add('v5c--no-art');
      if (textLen > 1100) card.classList.add('card--compact');
      else if (textLen > 650) card.classList.add('card--dense');
      else if (textLen > 320) card.classList.add('card--medium');
      else card.classList.add('card--large');
    } else {
      if (textLen > 650) card.classList.add('card--compact');
      else if (textLen > 380) card.classList.add('card--dense');
      else if (textLen > 180) card.classList.add('card--medium');
      else card.classList.add('card--large');
    }

    // 1. Artwork: Only render compact art container if user uploaded an image!
    let artHtml = '';
    if (hasImage) {
      artHtml = `
        <div class="v5c-compact-art">
          <img src="${item.image}" alt="${item.name}" class="v5c-art-img">
        </div>
      `;
    }

    // 2. Tactical Row: Damage / AC badge + Charges tracker or Meta
    const tacticalBadge = getItemTacticalBadge(item);
    let chargesHtml = '';
    if (item.charges && item.charges > 0) {
      const maxPips = Math.min(item.charges, 8);
      const filledPips = '●'.repeat(maxPips);
      const emptyPips = '○'.repeat(Math.max(0, Math.min(4, 8 - maxPips)));
      chargesHtml = `
        <div class="v5c-charges-pips">
          <span>Заряды [${item.charges}]:</span>
          <span class="v5c-pips-icons">${filledPips}${emptyPips}</span>
        </div>
      `;
    } else if (item.weight && item.weight !== '—') {
      chargesHtml = `
        <div class="v5c-charges-pips">
          <span>⚖️ Вес:</span>
          <span class="v5c-meta-val">${item.weight}</span>
        </div>
      `;
    } else if (item.cost && item.cost !== 'Бесценно') {
      chargesHtml = `
        <div class="v5c-charges-pips">
          <span>💰 Цена:</span>
          <span class="v5c-meta-val">${item.cost}</span>
        </div>
      `;
    } else if (item.attunement) {
      chargesHtml = `
        <div class="v5c-charges-pips">
          <span>🔮</span>
          <span>${item.attunement}</span>
        </div>
      `;
    }

    const tacticalRowHtml = `
      <div class="v5c-tactical-row">
        <div class="v5c-damage-badge">${tacticalBadge}</div>
        ${chargesHtml}
      </div>
    `;

    // 3. Combat Bar (Category, Properties, Extra)
    const combatHighlights = getItemCombatHighlights(item);
    const combatBarHtml = combatHighlights.length > 0
      ? `<div class="v5-combat-bar">${combatHighlights.map(h => `<span>${h}</span>`).join('<span>·</span>')}</div>`
      : '';

    // Watermark in background
    const watermarkHtml = `
      <div class="v5c-watermark">
        ${getItemWatermarkSvg(visualType, rarityColor)}
      </div>
    `;

    card.innerHTML = `
      ${watermarkHtml}

      <!-- Floating Capsule Header with Icon -->
      <div class="v5-floating-header">
        <div class="v5-title-wrap">
          <span class="v5-header-icon">${crestIcon}</span>
          <h3 class="v5-title" title="${item.name}">${item.name}</h3>
        </div>
        <span class="v5-rarity-pill">${item.rarity || 'Предмет'}</span>
      </div>

      ${artHtml}

      <!-- Tactical Rules Plate (NO FOOTER, Maximized Rules Space) -->
      <div class="v5-acrylic-plate">
        ${tacticalRowHtml}
        ${combatBarHtml}

        <div class="v5-rules-text">
          ${formatDescription(descToRender)}
        </div>

        ${item.lore ? `<div class="v5-lore">${item.lore}</div>` : ''}
      </div>
    `;

    return card;
  }

  // --- Dispatcher for Item Card Front ---
  function createItemCardElement(item, isZoomed = false, splitContent = null) {
    return createItemV5CCardElement(item, isZoomed, splitContent);
  }

  // --- Note Blank Card Front ---
  function createNoteBlankCardElement(blank, isZoomed = false) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.dataset.id = blank.id;
    card.style.setProperty('--card-rarity-color', '#6b7280');

    if (!isZoomed) {
      card.title = 'Нажмите, чтобы приблизить бланк';
      card.addEventListener('click', () => openCardZoomModal(blank, 'front'));
    }

    card.innerHTML = `
      <header class="item-card__header" style="background: #2b251d;">
        <div class="item-card__header-top">
          <span class="item-card__icon-badge">📝</span>
          <div class="item-card__titles">
            <h3 class="item-card__title">Бланк для заметок / Трофеи</h3>
            <div class="item-card__subtitle">DM Notes &amp; Loot Tracker</div>
          </div>
          <span class="item-card__rarity-pill">Бланк</span>
        </div>
      </header>
      <div class="item-card__meta-bar">
        <span>Владелец: ____________________</span>
        <span>Цена: ________</span>
      </div>
      <div class="item-card__body" style="padding: 2.5mm;">
        <div style="font-weight: 700; color: #4a4237; border-bottom: 0.3mm dotted #999; padding-bottom: 1mm; margin-bottom: 1.5mm; font-size: 5pt;">
          Предмет: __________________________________________________
        </div>
        <div style="line-height: 2.2; font-size: 4.5pt; color: #666;">
          <div>Свойства / Заметки партии:</div>
          <div style="border-bottom: 0.25mm dotted #ccc; height: 3.5mm;"></div>
          <div style="border-bottom: 0.25mm dotted #ccc; height: 3.5mm;"></div>
          <div style="border-bottom: 0.25mm dotted #ccc; height: 3.5mm;"></div>
          <div style="border-bottom: 0.25mm dotted #ccc; height: 3.5mm;"></div>
          <div style="border-bottom: 0.25mm dotted #ccc; height: 3.5mm;"></div>
        </div>
      </div>
      <footer class="item-card__footer">
        <span>DnD Master Tools • Бланк</span>
        <span>By Shiz</span>
      </footer>
    `;

    return card;
  }

  // --- Dispatcher Front Element ---
  function createCardFront(cardData, isZoomed = false, splitContent = null) {
    if (cardData.isItem) {
      return createItemCardElement(cardData, isZoomed, splitContent);
    }
    if (cardData.isNoteBlank) {
      return createNoteBlankCardElement(cardData, isZoomed);
    }
    return createSpellCardElement(cardData, isZoomed, splitContent);
  }

  // --- Card Back Element Builder ---
  function createCardBackElement(cardData, splitContent = null, isBw = false, isZoomed = false) {
    // DUPLEX ART MODE: If item and duplex_art layout is active, back renders as the Rules Card!
    if (state.settings.itemCardLayout === 'duplex_art' && cardData && cardData.isItem) {
      return createItemRulesCardElement(cardData, isZoomed);
    }

    const back = document.createElement('div');
    back.className = 'card-back';

    if (cardData && !isZoomed) {
      back.dataset.id = cardData.id;
      back.title = 'Нажмите, чтобы приблизить рубашку';
      back.addEventListener('click', () => openCardZoomModal(cardData, 'back'));
    }

    const isItemCard = Boolean(cardData && cardData.isItem);
    const hasOverflow = splitContent && (splitContent.backDesc || splitContent.backHigher);

    // 1. BACK WITH OVERFLOW TEXT CONTINUATION
    if (hasOverflow) {
      back.classList.add('card-back--with-text');

      const backTextLen = (splitContent.backDesc || '').length + (splitContent.backHigher || '').length;
      if (backTextLen > 1100) back.classList.add('card--micro');
      else if (backTextLen > 650) back.classList.add('card--compact');
      else if (backTextLen > 360) back.classList.add('card--dense');
      else if (backTextLen > 180) back.classList.add('card--medium');
      else back.classList.add('card--large');

      const emblemSvg = isItemCard
        ? getArtifactPrismSvg(isBw, true)
        : getMagicCircleSvg(isBw, true);

      const isLongTitle = Boolean(cardData.name && cardData.name.length > 17);
      const titleClass = isLongTitle ? 'card-back__cont-title card-back__cont-title--long' : 'card-back__cont-title';

      back.innerHTML = `
        <div class="card-back__continuation-block">
          <div class="card-back__cont-header">
            <div class="card-back__cont-title-wrap">
              <span class="${titleClass}" title="${cardData.name}">${cardData.name}</span>
              <span class="card-back__cont-subtitle">${cardData.school || cardData.categoryName || 'Продолжение'}</span>
            </div>
            <span class="card-back__cont-badge">Оборотная сторона</span>
          </div>
          <div class="card-back__cont-text">
            ${formatDescription(splitContent.backDesc)}
            ${splitContent.backHigher ? `
              <div class="card-back__cont-higher">
                <strong>На больших уровнях:</strong> ${formatDescription(splitContent.backHigher)}
              </div>
            ` : ''}
          </div>
        </div>
        <div class="card-back__emblem card-back__emblem--compact">
          ${emblemSvg}
          <div class="card-back__signature">By Shiz</div>
        </div>
      `;
      return back;
    }

    // 2. PURE ORNAMENTAL ART BACK: Magic Circle for Spells, Sacred Prism for Artifacts
    const emblemSvg = isItemCard
      ? getArtifactPrismSvg(isBw, false)
      : getMagicCircleSvg(isBw, false);
    const title = isItemCard ? 'D&amp;D ARTIFACT' : 'D&amp;D SPELL';

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

  // ==========================================================================
  // SHEET RENDERING (3x3 = 9 CARDS PER A4)
  // ==========================================================================
  function renderSheets() {
    const container = document.getElementById('sheets-container');
    if (!container) return;
    container.innerHTML = '';

    applyCardDimensions();
    updateSlotFillerButton();

    const isBw = state.settings.colorMode === 'bw';
    document.body.classList.toggle('theme--bw', isBw);

    const deck = state.deck;
    const cardsPerPage = 9;
    const totalPages = Math.ceil(deck.length / cardsPerPage) || 1;

    for (let page = 0; page < totalPages; page++) {
      const startIndex = page * cardsPerPage;
      const pageCards = deck.slice(startIndex, startIndex + cardsPerPage);

      // FRONT SHEET
      const frontSheet = document.createElement('section');
      frontSheet.className = 'print-sheet print-sheet--front';
      frontSheet.innerHTML = `<div class="cards-grid"></div>`;
      const frontGrid = frontSheet.querySelector('.cards-grid');

      const pageSlots = [];
      for (let i = 0; i < cardsPerPage; i++) {
        if (i < pageCards.length) {
          const card = pageCards[i];
          let split = null;
          if (state.settings.printBacks) {
            split = card.isItem ? splitItemContent(card) : splitSpellContent(card);
          }
          pageSlots.push({ card, split, isBlank: false });
        } else {
          pageSlots.push({ card: null, split: null, isBlank: true });
        }
      }

      pageSlots.forEach(slot => {
        if (slot.isBlank) {
          const blank = document.createElement('div');
          blank.className = 'workshop-card--blank';
          blank.innerHTML = '<span>✦ ПУСТАЯ КАРТА ✦</span>';
          frontGrid.appendChild(blank);
        } else {
          frontGrid.appendChild(createCardFront(slot.card, false, slot.split));
        }
      });

      container.appendChild(frontSheet);

      // BACK SHEET (Mirrored columns [2,1,0, 5,4,3, 8,7,6] for duplex printing)
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
            blank.className = 'card-back workshop-card--blank';
            blank.style.opacity = '0.2';
            blank.innerHTML = '<span>✦ ПУСТАЯ РУБАШКА ✦</span>';
            backGrid.appendChild(blank);
          } else {
            backGrid.appendChild(createCardBackElement(slot.card, slot.split, isBw));
          }
        });

        container.appendChild(backSheet);
      }
    }
  }

  // ==========================================================================
  // DECK MANAGEMENT
  // ==========================================================================
  function addSpellToDeck(spellId) {
    const spell = getAllSpells().find(s => s.id === spellId);
    if (!spell) return;
    state.deck.push({ ...spell, isSpell: true, instanceId: 'inst_' + Math.random().toString(36).slice(2, 9) });
    renderDeckList();
    renderSheets();
    saveStateToStorage();
    showToast(`«${spell.name}» добавлено в колоду`);
  }

  function addItemToDeck(itemId) {
    const item = getAllItems().find(i => i.id === itemId);
    if (!item) return;
    state.deck.push({ ...item, isItem: true, instanceId: 'inst_' + Math.random().toString(36).slice(2, 9) });
    renderDeckList();
    renderSheets();
    saveStateToStorage();
    showToast(`«${item.name}» добавлено в колоду`);
  }

  function removeDeckItem(index) {
    if (index >= 0 && index < state.deck.length) {
      const removed = state.deck.splice(index, 1)[0];
      renderDeckList();
      renderSheets();
      saveStateToStorage();
      showToast(`«${removed.name}» удалено`);
    }
  }

  function clearDeck() {
    if (state.deck.length === 0) return;
    if (confirm('Очистить всю колоду карт для печати?')) {
      state.deck = [];
      renderDeckList();
      renderSheets();
      saveStateToStorage();
      showToast('Колода очищена');
    }
  }

  function renderDeckList() {
    const container = document.getElementById('deck-list');
    const summary = document.getElementById('deck-summary-text');
    if (!container) return;

    const count = state.deck.length;
    const pages = Math.ceil(count / 9) || 0;
    const spellsCount = state.deck.filter(c => !c.isItem && !c.isNoteBlank).length;
    const itemsCount = state.deck.filter(c => c.isItem).length;
    const backsInfo = state.settings.printBacks && count > 0 ? ` • стр. с рубашками: ${pages * 2}` : '';

    if (summary) {
      summary.textContent = `Карт: ${count} (${pages} ${pages === 1 ? 'лист' : 'листов'} А4${backsInfo}) • 📜 ${spellsCount} | 🗡️ ${itemsCount}`;
    }

    container.innerHTML = '';
    if (count === 0) {
      container.innerHTML = '<div style="padding: 10px; color: var(--color-text-muted); font-size: 0.78rem; text-align: center;">Колода пуста. Выберите заклинания или предметы из каталога выше.</div>';
      return;
    }

    state.deck.forEach((card, idx) => {
      const row = document.createElement('div');
      row.className = 'deck-item';

      const typeIcon = card.isItem ? (card.icon || '🗡️') : (card.isNoteBlank ? '📝' : '📜');
      const badge = card.isItem ? (card.rarity || 'Предмет') : (card.isNoteBlank ? 'Бланк' : `${card.level} круг`);

      row.innerHTML = `
        <div class="deck-item__info">
          <span class="deck-item__type">${typeIcon}</span>
          <span class="deck-item__name" title="${card.name}">${card.name}</span>
          <span style="font-size: 0.68rem; color: var(--color-gold-dim); margin-left: 4px;">(${badge})</span>
        </div>
        <button class="deck-item__remove" data-index="${idx}" title="Удалить из колоды">✕</button>
      `;

      container.appendChild(row);
    });

    container.querySelectorAll('.deck-item__remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index, 10);
        removeDeckItem(index);
      });
    });
  }

  // ==========================================================================
  // CATALOG RENDERING & TABS
  // ==========================================================================
  function switchCatalogTab(tab) {
    state.activeTab = tab;

    const btnSpells = document.getElementById('tab-spells');
    const btnItems = document.getElementById('tab-items');
    const panelSpells = document.getElementById('panel-spells-catalog');
    const panelItems = document.getElementById('panel-items-catalog');

    if (tab === 'spells') {
      btnSpells?.classList.add('active');
      btnSpells?.setAttribute('aria-selected', 'true');
      btnItems?.classList.remove('active');
      btnItems?.setAttribute('aria-selected', 'false');
      if (panelSpells) panelSpells.style.display = 'block';
      if (panelItems) panelItems.style.display = 'none';
      renderSpellsCatalog();
    } else {
      btnItems?.classList.add('active');
      btnItems?.setAttribute('aria-selected', 'true');
      btnSpells?.classList.remove('active');
      btnSpells?.setAttribute('aria-selected', 'false');
      if (panelItems) panelItems.style.display = 'block';
      if (panelSpells) panelSpells.style.display = 'none';
      renderItemsCatalog();
    }
  }

  function renderSpellsCatalog() {
    const container = document.getElementById('catalog-spells-list');
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
        ? `<span class="catalog-item__badge" style="background: rgba(124, 58, 237, 0.25); border-color: #a78bfa; color: #c4b5fd;">Своё</span>`
        : '';

      item.innerHTML = `
        <div class="catalog-item__info">
          <span class="catalog-item__badge">${spell.level === 0 ? '0' : spell.level}</span>
          <span class="catalog-item__name">${spell.name}</span>
          ${isCustomBadge}
          <span style="font-size: 0.7rem; color: var(--color-text-muted); font-style: italic;">(${spell.school})</span>
        </div>
        <button class="catalog-item__btn-add" data-id="${spell.id}">
          ${isAlreadyInDeck ? '+ ещё' : '+ Добавить'}
        </button>
      `;

      container.appendChild(item);
    });

    container.querySelectorAll('.catalog-item__btn-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        addSpellToDeck(e.currentTarget.dataset.id);
      });
    });
  }

  function renderItemsCatalog() {
    const container = document.getElementById('catalog-items-list');
    if (!container) return;

    const query = (document.getElementById('search-item')?.value || '').toLowerCase().trim();
    const filterCategory = document.getElementById('filter-catalog-category')?.value || 'all';
    const filterRarity = document.getElementById('filter-catalog-rarity')?.value || 'all';

    const items = getAllItems().filter(i => {
      const matchQuery = i.name.toLowerCase().includes(query) ||
        (i.nameEn && i.nameEn.toLowerCase().includes(query)) ||
        (i.properties && i.properties.toLowerCase().includes(query)) ||
        (i.categoryName && i.categoryName.toLowerCase().includes(query));
      const matchCategory = filterCategory === 'all'
        ? true
        : filterCategory === 'custom'
          ? (i.isCustom === true)
          : (i.category === filterCategory);
      const matchRarity = filterRarity === 'all' || (i.rarity && i.rarity.toLowerCase() === filterRarity);
      return matchQuery && matchCategory && matchRarity;
    });

    container.innerHTML = '';
    if (items.length === 0) {
      container.innerHTML = '<div style="padding: 12px; color: var(--color-text-muted); font-size: 0.8rem; text-align: center;">Предметы не найдены</div>';
      return;
    }

    items.forEach(itemData => {
      const row = document.createElement('div');
      row.className = 'catalog-item';
      const isAlreadyInDeck = state.deck.some(d => d.id === itemData.id);

      const isCustomBadge = itemData.isCustom
        ? `<span class="catalog-item__badge" style="background: rgba(124, 58, 237, 0.25); border-color: #a78bfa; color: #c4b5fd;">Своё</span>
           <button type="button" class="catalog-item__btn-del" data-del-id="${itemData.id}" title="Удалить артефакт" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:0.75rem; padding: 0 3px; line-height: 1;">🗑️</button>`
        : '';

      row.innerHTML = `
        <div class="catalog-item__info">
          <span class="catalog-item__icon">${itemData.icon || '⚔️'}</span>
          <span class="catalog-item__name">${itemData.name}</span>
          ${isCustomBadge}
          <span class="catalog-item__badge">${itemData.rarity || 'Обычный'}</span>
        </div>
        <button class="catalog-item__btn-add" data-id="${itemData.id}">
          ${isAlreadyInDeck ? '+ ещё' : '+ Добавить'}
        </button>
      `;

      container.appendChild(row);
    });

    container.querySelectorAll('.catalog-item__btn-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        addItemToDeck(e.currentTarget.dataset.id);
      });
    });

    container.querySelectorAll('.catalog-item__btn-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const delId = e.currentTarget.dataset.delId;
        const it = state.customItems.find(x => x.id === delId);
        if (!it) return;
        if (confirm(`Удалить артефакт «${it.name}»?`)) {
          state.customItems = state.customItems.filter(x => x.id !== delId);
          state.deck = state.deck.filter(d => d.id !== delId);
          saveStateToStorage();
          renderItemsCatalog();
          renderDeckList();
          renderSheets();
          showToast(`Артефакт «${it.name}» удалён`);
        }
      });
    });
  }

  // ==========================================================================
  // SMART SLOT FILLER ("БЕЗ ПУСТЫХ МЕСТ НА А4")
  // ==========================================================================
  function updateSlotFillerButton() {
    const btn = document.getElementById('btn-open-slot-filler');
    if (!btn) return;

    const count = state.deck.length;
    if (count === 0) {
      btn.style.display = 'none';
      return;
    }

    const remainder = count % 9;
    const needed = (9 - remainder) % 9;

    if (needed > 0) {
      btn.style.display = 'inline-flex';
      btn.textContent = `✨ Заполнить лист (+${needed})`;
      btn.title = `Нажмите, чтобы заполнить оставшиеся ${needed} свободных мест на листе А4`;
    } else {
      btn.style.display = 'none';
    }
  }

  function openSlotFillerModal() {
    const modal = document.getElementById('slot-filler-modal');
    const neededCount = document.getElementById('slot-filler-needed-count');
    const remainder = state.deck.length % 9;
    const needed = (9 - remainder) % 9;

    if (neededCount) neededCount.textContent = needed;
    modal?.classList.add('open');
  }

  function closeSlotFillerModal() {
    document.getElementById('slot-filler-modal')?.classList.remove('open');
  }

  function applySlotFiller(type) {
    const remainder = state.deck.length % 9;
    const needed = (9 - remainder) % 9;
    if (needed <= 0) {
      closeSlotFillerModal();
      return;
    }

    if (type === 'potions') {
      const allItems = getAllItems();
      const potionsAndScrolls = allItems.filter(i => i.category === 'potion' || i.category === 'scroll');
      const pool = potionsAndScrolls.length > 0 ? potionsAndScrolls : allItems;
      for (let i = 0; i < needed; i++) {
        const item = pool[i % pool.length];
        state.deck.push({ ...item, isItem: true, instanceId: 'inst_' + Math.random().toString(36).slice(2, 9) });
      }
      showToast(`Добавлено ${needed} зелий и свитков!`);
    } else if (type === 'spells') {
      const allSpells = getAllSpells();
      for (let i = 0; i < needed; i++) {
        const spell = allSpells[i % allSpells.length];
        state.deck.push({ ...spell, isSpell: true, instanceId: 'inst_' + Math.random().toString(36).slice(2, 9) });
      }
      showToast(`Добавлено ${needed} заклинаний!`);
    } else if (type === 'artifacts') {
      const allItems = getAllItems();
      for (let i = 0; i < needed; i++) {
        const item = allItems[i % allItems.length];
        state.deck.push({ ...item, isItem: true, instanceId: 'inst_' + Math.random().toString(36).slice(2, 9) });
      }
      showToast(`Добавлено ${needed} магических предметов!`);
    } else if (type === 'duplicates') {
      if (state.deck.length === 0) return;
      const existing = [...state.deck];
      for (let i = 0; i < needed; i++) {
        const c = existing[i % existing.length];
        state.deck.push({ ...c, instanceId: 'inst_' + Math.random().toString(36).slice(2, 9) });
      }
      showToast(`Продублировано ${needed} карт колоды!`);
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
    saveStateToStorage();
  }

  // ==========================================================================
  // CARD ZOOM LIGHTBOX
  // ==========================================================================
  function openCardZoomModal(cardData, side = 'front') {
    state.zoomTarget = cardData;
    state.zoomSide = side;

    const modal = document.getElementById('card-zoom-modal');
    const btnFront = document.getElementById('zoom-btn-front');
    const btnBack = document.getElementById('zoom-btn-back');

    if (cardData && cardData.isItem && state.settings.itemCardLayout === 'duplex_art') {
      if (btnFront) btnFront.textContent = 'Лицевая (Арт)';
      if (btnBack) btnBack.textContent = 'Оборот (Правила)';
    } else {
      if (btnFront) btnFront.textContent = 'Лицевая сторона';
      if (btnBack) btnBack.textContent = 'Рубашка карты';
    }

    btnFront?.classList.toggle('active', side === 'front');
    btnBack?.classList.toggle('active', side === 'back');

    renderZoomTarget();
    modal?.classList.add('open');
  }

  function closeCardZoomModal() {
    document.getElementById('card-zoom-modal')?.classList.remove('open');
    state.zoomTarget = null;
  }

  function renderZoomTarget() {
    const targetContainer = document.getElementById('zoom-modal-card-target');
    if (!targetContainer || !state.zoomTarget) return;
    targetContainer.innerHTML = '';

    const isBw = state.settings.colorMode === 'bw';

    if (state.zoomSide === 'front') {
      let split = null;
      if (state.settings.printBacks) {
        split = state.zoomTarget.isItem ? splitItemContent(state.zoomTarget) : splitSpellContent(state.zoomTarget);
      }
      const cardEl = createCardFront(state.zoomTarget, true, split);
      cardEl.classList.add('spell-card--zoomed');
      targetContainer.appendChild(cardEl);
    } else {
      let split = null;
      if (state.settings.printBacks) {
        split = state.zoomTarget.isItem ? splitItemContent(state.zoomTarget) : splitSpellContent(state.zoomTarget);
      }
      const backEl = createCardBackElement(state.zoomTarget, split, isBw, true);
      backEl.classList.add('spell-card--zoomed');
      targetContainer.appendChild(backEl);
    }
  }

  // ==========================================================================
  // CUSTOM CARD SIZE MODAL
  // ==========================================================================
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
    } else if (presetVal === 'a4-max') {
      state.settings.widthMm = 66.0;
      state.settings.heightMm = 94.0;
      state.settings.gapMm = 0.0;
    } else if (presetVal === 'mtg') {
      state.settings.widthMm = 63.5;
      state.settings.heightMm = 88.9;
      state.settings.gapMm = 3.0;
    } else if (presetVal === 'bridge') {
      state.settings.widthMm = 57.0;
      state.settings.heightMm = 89.0;
      state.settings.gapMm = 4.0;
    } else if (presetVal === 'custom') {
      openCustomSizeModal();
      return;
    }

    renderSheets();
    saveStateToStorage();
  }

  // ==========================================================================
  // CUSTOM SPELL MODAL
  // ==========================================================================
  function openCustomSpellModal() {
    const modal = document.getElementById('custom-spell-modal');
    const container = document.getElementById('cs-classes-container');
    if (container && container.children.length === 0) {
      container.innerHTML = SPELL_CLASSES.map(cls => `
        <label class="custom-class-checkbox">
          <input type="checkbox" value="${cls.id}" name="cs-class-checkbox" style="accent-color: var(--color-gold);">
          <span>${cls.icon} ${cls.name}</span>
        </label>
      `).join('');
    }
    modal?.classList.add('open');
  }

  function closeCustomSpellModal() {
    document.getElementById('custom-spell-modal')?.classList.remove('open');
  }

  function saveCustomSpell() {
    const name = document.getElementById('cs-name')?.value.trim();
    if (!name) {
      alert('Пожалуйста, укажите название заклинания или способности!');
      return;
    }

    const nameEn = document.getElementById('cs-name-en')?.value.trim();
    const school = document.getElementById('cs-school')?.value || 'Воплощение';
    const level = parseInt(document.getElementById('cs-level')?.value || '0', 10);
    const castingTime = document.getElementById('cs-casting-time')?.value.trim() || '1 действие';
    const range = document.getElementById('cs-range')?.value.trim() || 'На себя';
    const duration = document.getElementById('cs-duration')?.value.trim() || 'Мгновенная';
    const components = document.getElementById('cs-components')?.value.trim() || '—';
    const isConcentration = document.getElementById('cs-concentration')?.checked || false;
    const isRitual = document.getElementById('cs-ritual')?.checked || false;
    const desc = document.getElementById('cs-description')?.value.trim() || '';
    const higher = document.getElementById('cs-higher-levels')?.value.trim() || '';

    const selectedClasses = [];
    document.querySelectorAll('input[name="cs-class-checkbox"]:checked').forEach(cb => {
      selectedClasses.push(cb.value);
    });

    const newSpell = {
      id: 'custom_spell_' + Date.now(),
      name,
      nameEn,
      school,
      level,
      castingTime,
      range,
      duration,
      components,
      isConcentration,
      isRitual,
      classes: selectedClasses,
      description: desc,
      higherLevels: higher,
      isCustom: true
    };

    state.customSpells.push(newSpell);
    closeCustomSpellModal();
    renderSpellsCatalog();
    saveStateToStorage();
    showToast(`Способность «${name}» сохранена!`);
  }

  // ==========================================================================
  // CUSTOM ITEM MODAL
  // ==========================================================================
  let customItemImage = '';

  function openCustomItemModal() {
    const modal = document.getElementById('custom-item-modal');
    modal?.classList.add('open');
    customItemImage = '';
    const fileInput = document.getElementById('ci-image-file');
    const urlInput = document.getElementById('ci-image-url');
    const previewWrap = document.getElementById('ci-image-preview-wrap');
    const previewImg = document.getElementById('ci-image-preview');
    const btnRemove = document.getElementById('ci-btn-remove-image');
    const chkHideArt = document.getElementById('ci-hide-art');

    if (fileInput) fileInput.value = '';
    if (urlInput) urlInput.value = '';
    if (previewImg) previewImg.src = '';
    if (previewWrap) previewWrap.style.display = 'none';
    if (btnRemove) btnRemove.style.display = 'none';
    if (chkHideArt) chkHideArt.checked = false;
  }

  function closeCustomItemModal() {
    document.getElementById('custom-item-modal')?.classList.remove('open');
  }

  function saveCustomItem() {
    const name = document.getElementById('ci-name')?.value.trim();
    if (!name) {
      alert('Пожалуйста, укажите название предмета или артефакта!');
      return;
    }

    const nameEn = document.getElementById('ci-name-en')?.value.trim();
    const category = document.getElementById('ci-category')?.value || 'wondrous';
    const rarity = document.getElementById('ci-rarity')?.value || 'artifact';
    const icon = document.getElementById('ci-icon')?.value.trim() || '👑';
    const categoryName = document.getElementById('ci-category-name')?.value.trim() || 'Чудесный предмет';
    const weight = document.getElementById('ci-weight')?.value.trim() || '—';
    const cost = document.getElementById('ci-cost')?.value.trim() || 'Бесценно';
    const attunement = document.getElementById('ci-attunement')?.value.trim() || '';
    const charges = parseInt(document.getElementById('ci-charges')?.value || '0', 10);
    const properties = document.getElementById('ci-properties')?.value.trim() || '';
    const desc = document.getElementById('ci-desc')?.value.trim() || '';
    const lore = document.getElementById('ci-lore')?.value.trim() || '';
    const hideArt = Boolean(document.getElementById('ci-hide-art')?.checked);

    const newItem = {
      id: 'custom_item_' + Date.now(),
      name,
      nameEn,
      category,
      categoryName,
      rarity,
      icon,
      weight,
      cost,
      attunement,
      charges,
      properties,
      description: desc,
      lore,
      image: customItemImage || '',
      hideArt,
      isCustom: true
    };

    state.customItems.push(newItem);
    closeCustomItemModal();
    renderItemsCatalog();
    saveStateToStorage();
    showToast(`Артефакт «${name}» сохранён!`);
  }

  // ==========================================================================
  // STORAGE (LOAD & SAVE)
  // ==========================================================================
  function saveStateToStorage() {
    try {
      localStorage.setItem(STORAGE_WORKSHOP_KEY, JSON.stringify({
        deck: state.deck,
        settings: state.settings,
        customSpells: state.customSpells,
        customItems: state.customItems
      }));

      // Cross-tool sync
      localStorage.setItem(SHARED_SETTINGS_KEY, JSON.stringify(state.settings));
    } catch (e) {
      console.warn('Workshop storage save error', e);
    }
  }

  function loadStateFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_WORKSHOP_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.deck && Array.isArray(parsed.deck) && parsed.deck.length > 0) {
          state.deck = parsed.deck;
        }
        if (parsed.settings) {
          state.settings = { ...state.settings, ...parsed.settings };
          if (!parsed.settings.itemCardLayout || !localStorage.getItem('dnd_workshop_v5c_migrated_v5')) {
            state.settings.itemCardLayout = 'v5c';
            localStorage.setItem('dnd_workshop_v5c_migrated_v5', 'true');
          }
        }
        if (parsed.customSpells) state.customSpells = parsed.customSpells;
        if (parsed.customItems) state.customItems = parsed.customItems;
      }

      // Check legacy spell and item stores if user had saved custom abilities or decks
      try {
        const legacySpellsRaw = localStorage.getItem(LEGACY_SPELLS_KEY);
        if (legacySpellsRaw) {
          const p = JSON.parse(legacySpellsRaw);
          if (p.customSpells && Array.isArray(p.customSpells) && state.customSpells.length === 0) {
            state.customSpells = p.customSpells;
          }
          if (state.deck.length === 0 && p.deckCards && Array.isArray(p.deckCards) && p.deckCards.length > 0) {
            p.deckCards.forEach(s => state.deck.push({ ...s, isSpell: true }));
          }
        }
        const legacyItemsRaw = localStorage.getItem(LEGACY_ITEMS_KEY);
        if (legacyItemsRaw) {
          const p = JSON.parse(legacyItemsRaw);
          if (p.customItems && Array.isArray(p.customItems) && state.customItems.length === 0) {
            state.customItems = p.customItems;
          }
          if (state.deck.length === 0 && p.deck && Array.isArray(p.deck) && p.deck.length > 0) {
            p.deck.forEach(it => state.deck.push({ ...it, isItem: true }));
          }
        }
      } catch (err) {}

      // If STILL empty (first run with no prior deck), populate with 9 iconic cards (5 spells + 4 items)
      // so the 3x3 sheet is immediately alive and ready to evaluate!
      if (state.deck.length === 0) {
        const allSpells = getAllSpells();
        const allItems = getAllItems();
        const starterSpellIds = ['shield', 'fireball', 'cure-wounds', 'magic-missile', 'misty-step'];
        const starterItemIds = ['ice-sword-elven', 'sun-blade', 'potion-healing', 'ring-of-protection'];

        starterSpellIds.forEach(id => {
          const s = allSpells.find(sp => sp.id === id);
          if (s) state.deck.push({ ...s, isSpell: true, instanceId: 'init_' + Math.random().toString(36).slice(2, 7) });
        });
        starterItemIds.forEach(id => {
          const it = allItems.find(item => item.id === id);
          if (it) state.deck.push({ ...it, isItem: true, instanceId: 'init_' + Math.random().toString(36).slice(2, 7) });
        });
      }

      // Check shared settings
      const shared = localStorage.getItem(SHARED_SETTINGS_KEY);
      if (shared) {
        const s = JSON.parse(shared);
        state.settings = { ...state.settings, ...s };
      }
    } catch (e) {
      console.warn('Workshop storage load error', e);
    }
  }

  // ==========================================================================
  // INITIALIZATION & EVENT LISTENERS
  // ==========================================================================
  function init() {
    loadStateFromStorage();

    // Populate class filter in catalog with all 13 D&D classes
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

    // Sync UI with settings
    const selPreset = document.getElementById('select-size-preset');
    const chkBacks = document.getElementById('toggle-print-backs');
    const selColor = document.getElementById('select-color-mode');
    const selCorner = document.getElementById('select-corner-style');
    if (selPreset) selPreset.value = state.settings.preset || 'a4-gap';
    if (chkBacks) chkBacks.checked = state.settings.printBacks;
    if (selColor) selColor.value = state.settings.colorMode || 'color';
    if (selCorner) selCorner.value = state.settings.cornerStyle || 'rounded';

    // Tabs setup
    document.getElementById('tab-spells')?.addEventListener('click', () => switchCatalogTab('spells'));
    document.getElementById('tab-items')?.addEventListener('click', () => switchCatalogTab('items'));

    // Settings listeners
    selPreset?.addEventListener('change', (e) => handlePresetSelect(e.target.value));
    chkBacks?.addEventListener('change', (e) => {
      state.settings.printBacks = e.target.checked;
      renderDeckList();
      renderSheets();
      saveStateToStorage();
    });
    selColor?.addEventListener('change', (e) => {
      state.settings.colorMode = e.target.value;
      renderSheets();
      saveStateToStorage();
    });
    selCorner?.addEventListener('change', (e) => {
      state.settings.cornerStyle = e.target.value;
      renderSheets();
      saveStateToStorage();
    });

    // Custom Size Modal
    document.getElementById('btn-open-custom-size')?.addEventListener('click', openCustomSizeModal);
    document.getElementById('modal-close')?.addEventListener('click', closeCustomSizeModal);
    document.getElementById('modal-btn-cancel')?.addEventListener('click', closeCustomSizeModal);
    document.getElementById('modal-btn-save')?.addEventListener('click', () => {
      const w = parseFloat(document.getElementById('modal-input-width')?.value) || 64;
      const h = parseFloat(document.getElementById('modal-input-height')?.value) || 91;
      const g = parseFloat(document.getElementById('modal-input-gap')?.value) !== undefined
        ? parseFloat(document.getElementById('modal-input-gap')?.value) : 2.5;
      state.settings.widthMm = w;
      state.settings.heightMm = h;
      state.settings.gapMm = g;
      state.settings.preset = 'custom';
      if (selPreset) selPreset.value = 'custom';
      closeCustomSizeModal();
      renderSheets();
      saveStateToStorage();
      showToast(`Размер карт установлен: ${w} × ${h} мм (зазор ${g} мм)`);
    });

    // Search & Filters (Spells)
    document.getElementById('search-spell')?.addEventListener('input', renderSpellsCatalog);
    document.getElementById('filter-catalog-class')?.addEventListener('change', renderSpellsCatalog);
    document.getElementById('filter-catalog-level')?.addEventListener('change', renderSpellsCatalog);

    // Search & Filters (Items)
    document.getElementById('search-item')?.addEventListener('input', renderItemsCatalog);
    document.getElementById('filter-catalog-category')?.addEventListener('change', renderItemsCatalog);
    document.getElementById('filter-catalog-rarity')?.addEventListener('change', renderItemsCatalog);

    // Deck actions
    document.getElementById('btn-clear-deck')?.addEventListener('click', clearDeck);
    document.getElementById('btn-print')?.addEventListener('click', () => window.print());

    // Slot Filler
    document.getElementById('btn-open-slot-filler')?.addEventListener('click', openSlotFillerModal);
    document.getElementById('slot-filler-close')?.addEventListener('click', closeSlotFillerModal);
    document.getElementById('slot-filler-btn-cancel')?.addEventListener('click', closeSlotFillerModal);
    document.getElementById('btn-fill-potions')?.addEventListener('click', () => applySlotFiller('potions'));
    document.getElementById('btn-fill-spells')?.addEventListener('click', () => applySlotFiller('spells'));
    document.getElementById('btn-fill-artifacts')?.addEventListener('click', () => applySlotFiller('artifacts'));
    document.getElementById('btn-fill-duplicates')?.addEventListener('click', () => applySlotFiller('duplicates'));
    document.getElementById('btn-fill-notes')?.addEventListener('click', () => applySlotFiller('notes'));

    // Custom Spell Modal
    document.getElementById('btn-open-create-spell')?.addEventListener('click', openCustomSpellModal);
    document.getElementById('custom-spell-close')?.addEventListener('click', closeCustomSpellModal);
    document.getElementById('cs-btn-cancel')?.addEventListener('click', closeCustomSpellModal);
    document.getElementById('cs-btn-save')?.addEventListener('click', saveCustomSpell);

    // Custom Item Modal
    document.getElementById('btn-open-create-item')?.addEventListener('click', openCustomItemModal);
    document.getElementById('custom-item-close')?.addEventListener('click', closeCustomItemModal);
    document.getElementById('ci-btn-cancel')?.addEventListener('click', closeCustomItemModal);
    document.getElementById('ci-btn-save')?.addEventListener('click', saveCustomItem);

    // Custom Item Image Upload & URL
    const ciFileInput = document.getElementById('ci-image-file');
    const ciUrlInput = document.getElementById('ci-image-url');
    const ciBtnRemove = document.getElementById('ci-btn-remove-image');
    const ciPreviewWrap = document.getElementById('ci-image-preview-wrap');
    const ciPreviewImg = document.getElementById('ci-image-preview');

    ciFileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        customItemImage = evt.target.result;
        if (ciPreviewImg) ciPreviewImg.src = customItemImage;
        if (ciPreviewWrap) ciPreviewWrap.style.display = 'flex';
        if (ciBtnRemove) ciBtnRemove.style.display = 'inline-flex';
        if (ciUrlInput) ciUrlInput.value = '';
      };
      reader.readAsDataURL(file);
    });

    ciUrlInput?.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      customItemImage = val;
      if (val) {
        if (ciPreviewImg) ciPreviewImg.src = val;
        if (ciPreviewWrap) ciPreviewWrap.style.display = 'flex';
        if (ciBtnRemove) ciBtnRemove.style.display = 'inline-flex';
      } else {
        if (ciPreviewWrap) ciPreviewWrap.style.display = 'none';
        if (ciBtnRemove) ciBtnRemove.style.display = 'none';
      }
    });

    ciBtnRemove?.addEventListener('click', () => {
      customItemImage = '';
      if (ciFileInput) ciFileInput.value = '';
      if (ciUrlInput) ciUrlInput.value = '';
      if (ciPreviewWrap) ciPreviewWrap.style.display = 'none';
      if (ciBtnRemove) ciBtnRemove.style.display = 'none';
    });

    // Zoom Lightbox
    document.getElementById('zoom-modal-close')?.addEventListener('click', closeCardZoomModal);
    document.getElementById('zoom-btn-front')?.addEventListener('click', () => {
      state.zoomSide = 'front';
      document.getElementById('zoom-btn-front')?.classList.add('active');
      document.getElementById('zoom-btn-back')?.classList.remove('active');
      renderZoomTarget();
    });
    document.getElementById('zoom-btn-back')?.addEventListener('click', () => {
      state.zoomSide = 'back';
      document.getElementById('zoom-btn-back')?.classList.add('active');
      document.getElementById('zoom-btn-front')?.classList.remove('active');
      renderZoomTarget();
    });

    // Close modals on Escape key or backdrop click
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCardZoomModal();
        closeCustomSizeModal();
        closeCustomSpellModal();
        closeCustomItemModal();
        closeSlotFillerModal();
      }
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    });

    // Initial render
    switchCatalogTab('spells');
    renderDeckList();
    renderSheets();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
