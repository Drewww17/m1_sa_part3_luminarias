// Driver image mapping (driverId -> image path)
export const driverImages = {
  'verstappen': '/drivers/verstappen.webp',
  'norris': '/drivers/norris.webp',
  'leclerc': '/drivers/leclerc.webp',
  'hamilton': '/drivers/hamilton.webp',
  'sainz': '/drivers/sainz.webp',
  'piastri': '/drivers/piastri.webp',
  'russell': '/drivers/russel.webp',
  'alonso': '/drivers/alonso.webp',
  'stroll': '/drivers/stroll.webp',
  'gasly': '/drivers/gasly.webp',
  'ocon': '/drivers/ocon.webp',
  'albon': '/drivers/albon.webp',
  'tsunoda': '/drivers/tsunoda.webp',
  'hulkenberg': '/drivers/hulkenberg.webp',
  'lawson': '/drivers/lawson.webp',
  'hadjar': '/drivers/hadjar.webp',
  'bearman': '/drivers/bearman.webp',
  'antonelli': '/drivers/antonelli.webp',
  'bortoleto': '/drivers/bortoleto.webp',
  'doohan': '/drivers/doohan.webp',
  'colapinto': '/drivers/colapinto.webp', // may not exist, will use fallback
};

// Constructor image mapping (constructorId -> image path)
export const constructorImages = {
  'red_bull': '/teams/redbull.webp',
  'mclaren': '/teams/mclaren.webp',
  'ferrari': '/teams/ferrari.webp',
  'mercedes': '/teams/mercedes.webp',
  'aston_martin': '/teams/astonmartin.webp',
  'alpine': '/teams/alpine.webp',
  'williams': '/teams/willaims.webp',
  'rb': '/teams/rb.webp',
  'sauber': '/teams/sauber.webp',
  'haas': '/teams/haas.webp',
};

// Helper functions
export function getDriverImage(driverId) {
  return driverImages[driverId] || '/drivers/fallback.webp';
}

export function getConstructorImage(constructorId) {
  return constructorImages[constructorId] || '/teams/fallback.webp';
}
