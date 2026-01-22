// Utility functions for data processing and sorting

/**
 * Parse points from string or number to float
 * @param {string|number} points - Points value
 * @returns {number} - Parsed points as number
 */
export function parsePoints(points) {
  if (typeof points === 'number') return points;
  const parsed = parseFloat(points);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Check if all drivers/constructors have zero points
 * @param {Array} items - Array of drivers or constructors with points
 * @returns {boolean} - True if all points are zero
 */
export function allZeroPoints(items) {
  if (!items || items.length === 0) return true;
  return items.every(item => parsePoints(item.points) === 0);
}

/**
 * Sort drivers alphabetically by last name
 * @param {Array} drivers - Array of driver standings
 * @returns {Array} - Sorted array of drivers
 */
export function sortDriversAlphabetically(drivers) {
  return [...drivers].sort((a, b) => {
    const lastNameA = a.Driver?.familyName || '';
    const lastNameB = b.Driver?.familyName || '';
    return lastNameA.localeCompare(lastNameB);
  });
}

/**
 * Sort constructors alphabetically by name
 * @param {Array} constructors - Array of constructor standings
 * @returns {Array} - Sorted array of constructors
 */
export function sortConstructorsAlphabetically(constructors) {
  return [...constructors].sort((a, b) => {
    const nameA = a.Constructor?.name || '';
    const nameB = b.Constructor?.name || '';
    return nameA.localeCompare(nameB);
  });
}
