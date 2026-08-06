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

/**
 * @typedef {Object} TrackWeather
 * @property {number} air_temperature
 * @property {number} track_temperature
 * @property {number} humidity
 * @property {number} wind_speed
 * @property {number} wind_direction
 * @property {number} rainfall
 * @property {string} date
 */

/**
 * @typedef {Object} TelemetryData
 * @property {number} speed
 * @property {number} rpm
 * @property {number} n_gear
 * @property {number} throttle
 * @property {number} brake
 * @property {number} drs
 * @property {string} date
 */

/**
 * @typedef {Object} PitStop
 * @property {string} driverId
 * @property {string} lap
 * @property {string} stop
 * @property {string} time
 * @property {string} duration
 */

/**
 * @typedef {Object} QualifyingResult
 * @property {string} number
 * @property {string} position
 * @property {Driver} Driver
 * @property {Constructor} Constructor
 * @property {string} [Q1]
 * @property {string} [Q2]
 * @property {string} [Q3]
 */

/**
 * @typedef {Object} DriverComparison
 * @property {DriverStanding} driver1
 * @property {DriverStanding} driver2
 * @property {Object} h2h
 * @property {number} h2h.pointsDiff
 * @property {number} h2h.winsDiff
 * @property {string} h2h.headToHeadWinner
 */

export {};

