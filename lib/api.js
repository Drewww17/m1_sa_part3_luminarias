// F1 API Integration Layer
// Handles data fetching from Ergast API and OpenF1 API

import { mockDriverStandings, mockConstructorStandings, mockRaceSchedule } from './mockData.js';

const ERGAST_BASE_URL = 'https://api.jolpi.ca/ergast/f1';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Simple in-memory cache
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

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Debug logging for non-OK responses (don't consume the body)
      console.warn(`[fetchWithCache] HTTP ${response.status} for ${url}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    cache.set(url, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    // Return cached data if available, even if expired
    if (cached) {
      return cached.data;
    }
    throw error;
  }
}

/**
 * Get current season driver standings
 * @param {string} [season='current'] - Season year or 'current'
 * @returns {Promise<import('./types').DriverStanding[]>}
 */
export async function getDriverStandings(season = 'current') {
  try {
    const url = `${ERGAST_BASE_URL}/${season}/driverStandings.json`;
    const data = await fetchWithCache(url);
    const standings = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
    
    // If API returns empty data or no standings, use mock data
    if (standings.length === 0) {
      console.log('Using mock driver standings data');
      return mockDriverStandings;
    }
    
    return standings;
  } catch (error) {
    console.error('Failed to fetch driver standings, using mock data:', error);
    return mockDriverStandings;
  }
}

/**
 * Get current season constructor standings
 * @param {string} [season='current'] - Season year or 'current'
 * @returns {Promise<import('./types').ConstructorStanding[]>}
 */
export async function getConstructorStandings(season = 'current') {
  try {
    const url = `${ERGAST_BASE_URL}/${season}/constructorStandings.json`;
    const data = await fetchWithCache(url);
    const standings = data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || [];
    
    // If API returns empty data or no standings, use mock data
    if (standings.length === 0) {
      console.log('Using mock constructor standings data');
      return mockConstructorStandings;
    }
    
    return standings;
  } catch (error) {
    console.error('Failed to fetch constructor standings, using mock data:', error);
    return mockConstructorStandings;
  }
}

/**
 * Get race schedule for the season
 * @param {string} [season='current'] - Season year or 'current'
 * @returns {Promise<import('./types').Race[]>}
 */
export async function getRaceSchedule(season = 'current') {
  try {
    const url = `${ERGAST_BASE_URL}/${season}.json`;
    const data = await fetchWithCache(url);
    const races = data.MRData.RaceTable.Races || [];
    
    // If API returns empty data or no races, use mock data
    if (races.length === 0) {
      console.log('Using mock race schedule data');
      return mockRaceSchedule;
    }
    
    return races;
  } catch (error) {
    console.error('Failed to fetch race schedule, using mock data:', error);
    return mockRaceSchedule;
  }
}

/**
 * Get next race information
 * @returns {Promise<import('./types').Race | null>}
 */
export async function getNextRace() {
  const races = await getRaceSchedule();
  const now = new Date();
  
  const upcomingRace = races.find(race => {
    const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
    return raceDate > now;
  });
  
  return upcomingRace || races[races.length - 1] || null;
}

/**
 * Get last race results
 * @param {string} [season='current'] - Season year or 'current'
 * @returns {Promise<{race: import('./types').Race, results: import('./types').RaceResult[]}>}
 */
export async function getLastRaceResults(season = 'current') {
  const url = `${ERGAST_BASE_URL}/${season}/last/results.json`;
  const data = await fetchWithCache(url);
  const raceData = data.MRData.RaceTable.Races[0];
  return {
    race: raceData,
    results: raceData?.Results || []
  };
}

/**
 * Get specific driver information
 * @param {string} driverId - Driver ID (e.g., 'alonso', 'hamilton')
 * @param {string} [season='current'] - Season year or 'current'
 * @returns {Promise<import('./types').DriverStanding | null>}
 */
export async function getDriverInfo(driverId, season = 'current') {
  const url = `${ERGAST_BASE_URL}/${season}/drivers/${driverId}/driverStandings.json`;
  const data = await fetchWithCache(url);
  return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings[0] || null;
}

/**
 * Get specific constructor information
 * @param {string} constructorId - Constructor ID (e.g., 'mclaren', 'ferrari')
 * @param {string} [season='current'] - Season year or 'current'
 * @returns {Promise<import('./types').ConstructorStanding | null>}
 */
export async function getConstructorInfo(constructorId, season = 'current') {
  const url = `${ERGAST_BASE_URL}/${season}/constructors/${constructorId}/constructorStandings.json`;
  const data = await fetchWithCache(url);
  return data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings[0] || null;
}

/**
 * Get circuit information
 * @param {string} circuitId - Circuit ID (e.g., 'monaco', 'silverstone')
 * @returns {Promise<import('./types').Circuit | null>}
 */
export async function getCircuitInfo(circuitId) {
  const url = `${ERGAST_BASE_URL}/circuits/${circuitId}.json`;
  const data = await fetchWithCache(url);
  return data.MRData.CircuitTable.Circuits[0] || null;
}

/**
 * Clear the cache
 */
export function clearCache() {
  cache.clear();
}

/**
 * Get drivers list/roster for a season
 * @param {string} [season='current'] - Season year or 'current'
 * @returns {Promise<{season: string, drivers: Array, isMock: boolean}>}
 */
export async function getDriversList(season = 'current') {
  try {
    const url = `${ERGAST_BASE_URL}/${season}/drivers.json`;
    const data = await fetchWithCache(url);
    const drivers = data.MRData.DriverTable?.Drivers || [];
    
    return {
      season: season,
      drivers: drivers,
      isMock: false
    };
  } catch (error) {
    console.error('Failed to fetch drivers list:', error);
    return {
      season: season,
      drivers: [],
      isMock: true
    };
  }
}

/**
 * Get constructor details/metadata
 * @param {string} constructorId - Constructor ID (e.g., 'ferrari', 'mclaren')
 * @returns {Promise<Object|null>}
 */
export async function getConstructorDetails(constructorId) {
  try {
    const url = `${ERGAST_BASE_URL}/constructors/${constructorId}.json`;
    const data = await fetchWithCache(url);
    const constructor = data.MRData.ConstructorTable?.Constructors?.[0];
    return constructor || null;
  } catch (error) {
    console.error('Failed to fetch constructor details:', error);
    return null;
  }
}
