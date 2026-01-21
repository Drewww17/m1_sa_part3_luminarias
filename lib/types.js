// Type definitions for F1 data structures
// Using JSDoc comments for type hints in JavaScript

/**
 * @typedef {Object} Driver
 * @property {string} driverId
 * @property {string} permanentNumber
 * @property {string} code
 * @property {string} url
 * @property {string} givenName
 * @property {string} familyName
 * @property {string} dateOfBirth
 * @property {string} nationality
 */

/**
 * @typedef {Object} Constructor
 * @property {string} constructorId
 * @property {string} url
 * @property {string} name
 * @property {string} nationality
 */

/**
 * @typedef {Object} DriverStanding
 * @property {string} position
 * @property {string} positionText
 * @property {string} points
 * @property {string} wins
 * @property {Driver} Driver
 * @property {Constructor[]} Constructors
 */

/**
 * @typedef {Object} ConstructorStanding
 * @property {string} position
 * @property {string} positionText
 * @property {string} points
 * @property {string} wins
 * @property {Constructor} Constructor
 */

/**
 * @typedef {Object} Location
 * @property {string} lat
 * @property {string} long
 * @property {string} locality
 * @property {string} country
 */

/**
 * @typedef {Object} Circuit
 * @property {string} circuitId
 * @property {string} url
 * @property {string} circuitName
 * @property {Location} Location
 */

/**
 * @typedef {Object} Race
 * @property {string} season
 * @property {string} round
 * @property {string} url
 * @property {string} raceName
 * @property {Circuit} Circuit
 * @property {string} date
 * @property {string} time
 * @property {string} [FirstPractice]
 * @property {string} [SecondPractice]
 * @property {string} [ThirdPractice]
 * @property {string} [Qualifying]
 * @property {string} [Sprint]
 */

/**
 * @typedef {Object} RaceResult
 * @property {string} number
 * @property {string} position
 * @property {string} positionText
 * @property {string} points
 * @property {Driver} Driver
 * @property {Constructor} Constructor
 * @property {string} grid
 * @property {string} laps
 * @property {string} status
 * @property {Object} Time
 * @property {string} Time.millis
 * @property {string} Time.time
 * @property {Object} FastestLap
 * @property {string} FastestLap.rank
 * @property {string} FastestLap.lap
 * @property {Object} FastestLap.Time
 * @property {string} FastestLap.Time.time
 * @property {Object} FastestLap.AverageSpeed
 * @property {string} FastestLap.AverageSpeed.units
 * @property {string} FastestLap.AverageSpeed.speed
 */

export {};
