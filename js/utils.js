/* ============================================
   DnD Master Tools — Utility Functions
   Dice rolling, random helpers, formatters
   ============================================ */

/**
 * Roll a single die with given number of sides.
 * @param {number} sides - Number of sides (e.g. 6 for d6)
 * @returns {number} Result between 1 and sides (inclusive)
 */
function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Roll multiple dice of the same type.
 * @param {number} count - Number of dice to roll
 * @param {number} sides - Number of sides per die
 * @returns {{ rolls: number[], total: number }}
 */
function rollMultiple(count, sides) {
  const rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push(rollDice(sides));
  }
  return {
    rolls,
    total: rolls.reduce((sum, r) => sum + r, 0),
  };
}

/**
 * Parse and evaluate a dice formula string.
 * Supports formats: "2d6", "1d20+5", "3d8-2", "d12", "4d6+1d4+3"
 * @param {string} formula - Dice formula string
 * @returns {{ formula: string, parts: Array, rolls: number[][], total: number }}
 */
function rollFormula(formula) {
  const cleaned = formula.toLowerCase().replace(/\s/g, '');
  const parts = [];
  const allRolls = [];
  let total = 0;

  // Split by + and -, keeping the sign
  const tokens = cleaned.match(/[+-]?[^+-]+/g);
  if (!tokens) {
    throw new Error(`Invalid dice formula: "${formula}"`);
  }

  for (const token of tokens) {
    const sign = token.startsWith('-') ? -1 : 1;
    const cleanToken = token.replace(/^[+-]/, '');

    // Check if it's a dice expression (e.g., "2d6") or a constant
    const diceMatch = cleanToken.match(/^(\d*)d(\d+)$/);

    if (diceMatch) {
      const count = parseInt(diceMatch[1] || '1', 10);
      const sides = parseInt(diceMatch[2], 10);
      const result = rollMultiple(count, sides);
      const signedTotal = result.total * sign;

      parts.push({
        type: 'dice',
        count,
        sides,
        sign,
        rolls: result.rolls,
        subtotal: signedTotal,
      });

      allRolls.push(result.rolls);
      total += signedTotal;
    } else {
      const value = parseInt(cleanToken, 10);
      if (isNaN(value)) {
        throw new Error(`Invalid token in formula: "${token}"`);
      }

      const signedValue = value * sign;
      parts.push({
        type: 'modifier',
        value: signedValue,
      });

      total += signedValue;
    }
  }

  return { formula, parts, rolls: allRolls, total };
}

/**
 * Pick a random element from an array.
 * @param {Array} arr - Source array
 * @returns {*} Random element
 */
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Pick N unique random elements from an array.
 * @param {Array} arr - Source array
 * @param {number} n - Number of elements to pick
 * @returns {Array} Array of N unique random elements
 */
function randomMultipleFromArray(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
}

/**
 * Format a numeric modifier with sign.
 * @param {number} num - The modifier value
 * @returns {string} Formatted string, e.g. "+2", "-1", "+0"
 */
function formatModifier(num) {
  return num >= 0 ? `+${num}` : `${num}`;
}

/**
 * Calculate ability modifier from ability score (D&D 5e formula).
 * @param {number} score - Ability score (1-30)
 * @returns {number} Modifier value
 */
function abilityModifier(score) {
  return Math.floor((score - 10) / 2);
}

/**
 * Generate a random integer between min and max (inclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Capitalize first letter of a string.
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Save data to localStorage with JSON serialization.
 * @param {string} key
 * @param {*} data
 */
function saveToStorage(key, data) {
  try {
    localStorage.setItem(`dnd-tools-${key}`, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

/**
 * Load data from localStorage with JSON parsing.
 * @param {string} key
 * @param {*} defaultValue - Value to return if key doesn't exist
 * @returns {*}
 */
function loadFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(`dnd-tools-${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
    return defaultValue;
  }
}

/**
 * Create a debounced version of a function.
 * @param {Function} fn
 * @param {number} delay - Delay in ms
 * @returns {Function}
 */
function debounce(fn, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Export for module usage (if needed later)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    rollDice,
    rollMultiple,
    rollFormula,
    randomFromArray,
    randomMultipleFromArray,
    formatModifier,
    abilityModifier,
    randomInt,
    capitalize,
    saveToStorage,
    loadFromStorage,
    debounce,
  };
}
