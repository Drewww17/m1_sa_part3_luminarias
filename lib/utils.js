// Utility functions for standings and roster manipulation

/**
 * Parse points value to a number
 * @param {string|number} p - Points value
 * @returns {number}
 */
export function parsePoints(p) {
  const parsed = parseFloat(p);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Check if all entries have zero points
 * @param {Array} entries - Array of standings entries with points property
 * @returns {boolean}
 */
export function allZeroPoints(entries) {
  if (!entries || entries.length === 0) return true;
  return entries.every(entry => parsePoints(entry.points) === 0);
}

/**
 * Sort drivers alphabetically by family name
 * @param {Array} items - Array of driver standings
 * @returns {Array}
 */
export function sortDriversAlphabetically(items) {
  return [...items].sort((a, b) => {
    const nameA = a.Driver?.familyName || '';
    const nameB = b.Driver?.familyName || '';
    return nameA.localeCompare(nameB);
  });
}

/**
 * Sort constructors alphabetically by name
 * @param {Array} items - Array of constructor standings
 * @returns {Array}
 */
export function sortConstructorsAlphabetically(items) {
  return [...items].sort((a, b) => {
    const nameA = a.Constructor?.name || '';
    const nameB = b.Constructor?.name || '';
    return nameA.localeCompare(nameB);
  });
}
