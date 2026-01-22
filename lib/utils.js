// Utility functions for F1 data processing

/**
 * Parse points value from string to float
 * @param {string|number} points - Points value
 * @returns {number}
 */
export function parsePoints(points) {
  if (typeof points === 'number') return points;
  return parseFloat(points) || 0;
}

/**
 * Check if all items in array have zero points
 * @param {Array} items - Array of drivers or constructors with points field
 * @returns {boolean}
 */
export function allZeroPoints(items) {
  if (!items || items.length === 0) return true;
  return items.every(item => parsePoints(item.points) === 0);
}

/**
 * Sort drivers alphabetically by family name
 * @param {Array} drivers - Array of driver standings
 * @returns {Array} - Sorted array
 */
export function sortDriversAlphabetically(drivers) {
  return [...drivers].sort((a, b) => {
    const nameA = a.Driver?.familyName || '';
    const nameB = b.Driver?.familyName || '';
    return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
  });
}

/**
 * Sort constructors alphabetically by name
 * @param {Array} constructors - Array of constructor standings
 * @returns {Array} - Sorted array
 */
export function sortConstructorsAlphabetically(constructors) {
  return [...constructors].sort((a, b) => {
    const nameA = a.Constructor?.name || '';
    const nameB = b.Constructor?.name || '';
    return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
  });
}
