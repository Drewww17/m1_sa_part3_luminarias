/**
 * Utility functions for F1 standings data processing
 */

/**
 * Parse points value from string or number to float
 * @param {string|number} points - Points value
 * @returns {number}
 */
export function parsePoints(points) {
  if (typeof points === 'number') return points;
  return parseFloat(points) || 0;
}

/**
 * Check if all drivers/constructors have zero points
 * @param {Array} standings - Array of standings objects
 * @returns {boolean}
 */
export function allZeroPoints(standings) {
  if (!standings || standings.length === 0) return true;
  return standings.every(item => parsePoints(item.points) === 0);
}

/**
 * Sort drivers alphabetically by last name
 * @param {Array} drivers - Array of driver standings
 * @returns {Array}
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
 * @param {Array} constructors - Array of constructor standings
 * @returns {Array}
 */
export function sortConstructorsAlphabetically(constructors) {
  return [...constructors].sort((a, b) => {
    const nameA = a.Constructor?.name || '';
    const nameB = b.Constructor?.name || '';
    return nameA.localeCompare(nameB);
  });
}
