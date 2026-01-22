// Utility functions for F1 data processing

/**
 * Parse points from a string or number to a float
 * @param {string|number} points - Points value to parse
 * @returns {number} Parsed points as a float
 */
export function parsePoints(points) {
  const parsed = parseFloat(points);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Check if all drivers/constructors in a list have zero points
 * @param {Array} list - Array of driver or constructor standings
 * @returns {boolean} True if all have zero points
 */
export function allZeroPoints(list) {
  if (!Array.isArray(list) || list.length === 0) {
    return true;
  }
  return list.every(item => parsePoints(item.points) === 0);
}

/**
 * Sort drivers alphabetically by family name
 * @param {Array} drivers - Array of driver standings
 * @returns {Array} Sorted array of drivers
 */
export function sortDriversAlphabetically(drivers) {
  if (!Array.isArray(drivers)) {
    return [];
  }
  return [...drivers].sort((a, b) => {
    const nameA = a.Driver?.familyName || '';
    const nameB = b.Driver?.familyName || '';
    return nameA.localeCompare(nameB);
  });
}

/**
 * Sort constructors alphabetically by name
 * @param {Array} constructors - Array of constructor standings
 * @returns {Array} Sorted array of constructors
 */
export function sortConstructorsAlphabetically(constructors) {
  if (!Array.isArray(constructors)) {
    return [];
  }
  return [...constructors].sort((a, b) => {
    const nameA = a.Constructor?.name || '';
    const nameB = b.Constructor?.name || '';
    return nameA.localeCompare(nameB);
  });
}
