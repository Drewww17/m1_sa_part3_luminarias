// F1 API Integration Layer
// Handles pure live data fetching from Ergast API (Jolpica mirror) and OpenF1 API

const ERGAST_BASE_URL = 'https://api.jolpi.ca/ergast/f1';
const OPENF1_BASE_URL = 'https://api.openf1.org/v1';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

/**
 * Generic fetch with caching
 * @param {string} url 
 * @param {number} cacheDuration 
 * @returns {Promise<any>}
 */
async function fetchWithCache(url, cacheDuration = CACHE_DURATION) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < cacheDuration) {
    return cached.data;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

/**
 * Get driver standings for a season
 * @param {string} [season='current']
 * @returns {Promise<import('./types').DriverStanding[]>}
 */
export async function getDriverStandings(season = 'current') {
  const url = `${ERGAST_BASE_URL}/${season}/driverStandings.json`;
  const data = await fetchWithCache(url);
  return data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings || [];
}

/**
 * Get constructor standings for a season
 * @param {string} [season='current']
 * @returns {Promise<import('./types').ConstructorStanding[]>}
 */
export async function getConstructorStandings(season = 'current') {
  const url = `${ERGAST_BASE_URL}/${season}/constructorStandings.json`;
  const data = await fetchWithCache(url);
  return data?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings || [];
}

/**
 * Get race schedule for a season
 * @param {string} [season='current']
 * @returns {Promise<import('./types').Race[]>}
 */
export async function getRaceSchedule(season = 'current') {
  const url = `${ERGAST_BASE_URL}/${season}.json`;
  const data = await fetchWithCache(url);
  return data?.MRData?.RaceTable?.Races || [];
}

/**
 * Get next upcoming race
 * @param {string} [season='current']
 * @returns {Promise<import('./types').Race | null>}
 */
export async function getNextRace(season = 'current') {
  const races = await getRaceSchedule(season);
  if (!races.length) return null;
  const now = new Date();
  
  const upcomingRace = races.find(race => {
    const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
    return raceDate > now;
  });
  
  return upcomingRace || races[races.length - 1] || null;
}

/**
 * Get last race results
 * @param {string} [season='current']
 * @returns {Promise<{race: import('./types').Race, results: import('./types').RaceResult[]}>}
 */
export async function getLastRaceResults(season = 'current') {
  const url = `${ERGAST_BASE_URL}/${season}/last/results.json`;
  const data = await fetchWithCache(url);
  const raceData = data?.MRData?.RaceTable?.Races[0];
  return {
    race: raceData || null,
    results: raceData?.Results || []
  };
}

/**
 * Get specific driver information
 * @param {string} driverId
 * @param {string} [season='current']
 * @returns {Promise<import('./types').DriverStanding | null>}
 */
export async function getDriverInfo(driverId, season = 'current') {
  const url = `${ERGAST_BASE_URL}/${season}/drivers/${driverId}/driverStandings.json`;
  const data = await fetchWithCache(url);
  return data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings[0] || null;
}

/**
 * Get specific constructor information
 * @param {string} constructorId
 * @param {string} [season='current']
 * @returns {Promise<import('./types').ConstructorStanding | null>}
 */
export async function getConstructorInfo(constructorId, season = 'current') {
  const url = `${ERGAST_BASE_URL}/${season}/constructors/${constructorId}/constructorStandings.json`;
  const data = await fetchWithCache(url);
  return data?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings[0] || null;
}

/**
 * Get circuit information
 * @param {string} circuitId
 * @returns {Promise<import('./types').Circuit | null>}
 */
export async function getCircuitInfo(circuitId) {
  const url = `${ERGAST_BASE_URL}/circuits/${circuitId}.json`;
  const data = await fetchWithCache(url);
  return data?.MRData?.CircuitTable?.Circuits[0] || null;
}

/**
 * Clear the in-memory cache
 */
export function clearCache() {
  cache.clear();
}

/**
 * Get live track weather conditions from OpenF1 API
 * @returns {Promise<import('./types').TrackWeather | null>}
 */
export async function getLiveTrackWeather() {
  const url = `${OPENF1_BASE_URL}/weather?session_key=latest`;
  const data = await fetchWithCache(url, 30 * 1000); // 30s cache
  if (Array.isArray(data) && data.length > 0) {
    const latest = data[data.length - 1];
    return {
      air_temperature: latest.air_temperature ?? 0,
      track_temperature: latest.track_temperature ?? 0,
      humidity: latest.humidity ?? 0,
      wind_speed: latest.wind_speed ?? 0,
      wind_direction: latest.wind_direction ?? 0,
      rainfall: latest.rainfall ?? 0,
      date: latest.date || new Date().toISOString()
    };
  }
  return null;
}

/**
 * Get live session telemetry for a driver from OpenF1 API
 * @param {number} [driverNumber=1]
 * @returns {Promise<import('./types').TelemetryData | null>}
 */
export async function getSessionTelemetry(driverNumber = 1) {
  const url = `${OPENF1_BASE_URL}/car_data?session_key=latest&driver_number=${driverNumber}`;
  const data = await fetchWithCache(url, 15 * 1000); // 15s cache
  if (Array.isArray(data) && data.length > 0) {
    const latest = data[data.length - 1];
    return {
      speed: latest.speed ?? 0,
      rpm: latest.rpm ?? 0,
      n_gear: latest.n_gear ?? 0,
      throttle: latest.throttle ?? 0,
      brake: latest.brake ?? 0,
      drs: latest.drs ?? 0,
      date: latest.date || new Date().toISOString()
    };
  }
  return null;
}

/**
 * Get qualifying session results
 * @param {string} [season='current']
 * @param {string} [round='last']
 * @returns {Promise<import('./types').QualifyingResult[]>}
 */
export async function getQualifyingResults(season = 'current', round = 'last') {
  const url = `${ERGAST_BASE_URL}/${season}/${round}/qualifying.json`;
  const data = await fetchWithCache(url);
  return data?.MRData?.RaceTable?.Races[0]?.QualifyingResults || [];
}

/**
 * Get pit stop duration statistics
 * @param {string} [season='current']
 * @param {string} [round='last']
 * @returns {Promise<import('./types').PitStop[]>}
 */
export async function getPitStops(season = 'current', round = 'last') {
  const url = `${ERGAST_BASE_URL}/${season}/${round}/pitstops.json`;
  const data = await fetchWithCache(url);
  return data?.MRData?.RaceTable?.Races[0]?.PitStops || [];
}

/**
 * Compare two drivers head-to-head for a season
 * @param {string} driver1Id
 * @param {string} driver2Id
 * @param {string} [season='current']
 * @returns {Promise<import('./types').DriverComparison | null>}
 */
export async function compareDrivers(driver1Id, driver2Id, season = 'current') {
  const standings = await getDriverStandings(season);
  if (!standings.length) return null;

  const d1 = standings.find(s => s.Driver.driverId === driver1Id) || standings[0];
  const d2 = standings.find(s => s.Driver.driverId === driver2Id) || standings[1];

  const p1 = parseInt(d1?.points || '0', 10);
  const p2 = parseInt(d2?.points || '0', 10);
  const w1 = parseInt(d1?.wins || '0', 10);
  const w2 = parseInt(d2?.wins || '0', 10);

  return {
    driver1: d1,
    driver2: d2,
    h2h: {
      pointsDiff: Math.abs(p1 - p2),
      winsDiff: Math.abs(w1 - w2),
      headToHeadWinner: p1 >= p2 ? d1.Driver.familyName : d2.Driver.familyName
    }
  };
}

/**
 * Fetch available historical F1 seasons directly from API
 * @returns {Promise<string[]>}
 */
export async function getSeasonsList() {
  const url = `${ERGAST_BASE_URL}/seasons.json?limit=100`;
  const data = await fetchWithCache(url);
  const seasons = data?.MRData?.SeasonTable?.Seasons || [];
  return seasons.map(s => s.season).reverse();
}

/**
 * Get historical driver standings for a specific year
 * @param {string} season
 * @returns {Promise<import('./types').DriverStanding[]>}
 */
export async function getHistoricalStandings(season) {
  return getDriverStandings(season);
}

/**
 * Get detailed profile and bio stats for a driver
 * @param {string} driverId
 * @returns {Promise<any>}
 */
export async function getDriverDetailedProfile(driverId) {
  const standings = await getDriverStandings();
  const standing = standings.find(s => s.Driver.driverId === driverId) || standings[0];
  if (!standing) return null;
  return {
    standing,
    bio: {
      code: standing.Driver.code,
      permanentNumber: standing.Driver.permanentNumber,
      givenName: standing.Driver.givenName,
      familyName: standing.Driver.familyName,
      nationality: standing.Driver.nationality,
      dateOfBirth: standing.Driver.dateOfBirth,
      constructor: standing.Constructors[0]?.name || 'Formula 1',
      points: standing.points,
      wins: standing.wins,
      position: standing.position
    }
  };
}
