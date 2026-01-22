// Utility functions for F1 app

/**
 * Parse points from string or number to a number
 * @param {string | number} points - Points value to parse
 * @returns {number} - Parsed points as a number
 */
export function parsePoints(points) {
  if (typeof points === 'number') return points;
  const parsed = parseFloat(points);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Check if all entries in the list have zero points
 * @param {Array} entries - List of standings entries with points property
 * @returns {boolean} - True if all entries have zero points
 */
export function allZeroPoints(entries) {
  if (!Array.isArray(entries) || entries.length === 0) return false;
  return entries.every(entry => parsePoints(entry.points) === 0);
}

/**
 * Sort drivers alphabetically by family name
 * @param {Array} drivers - List of driver standings
 * @returns {Array} - Sorted list of drivers
 */
export function sortDriversAlphabetically(drivers) {
  return [...drivers].sort((a, b) => {
    const nameA = a.Driver?.familyName || '';
    const nameB = b.Driver?.familyName || '';
    return nameA.localeCompare(nameB);
  });
}

/**
 * Sort constructors alphabetically by name
 * @param {Array} constructors - List of constructor standings
 * @returns {Array} - Sorted list of constructors
 */
export function sortConstructorsAlphabetically(constructors) {
  return [...constructors].sort((a, b) => {
    const nameA = a.Constructor?.name || '';
    const nameB = b.Constructor?.name || '';
    return nameA.localeCompare(nameB);
  });
}
