// Mock F1 Data - Current Season
// Used as fallback when Ergast API is unavailable or returns no data
// Data automatically updates to reflect the current year

/**
 * Get current season year
 */
const getCurrentSeason = () => new Date().getFullYear().toString();

/**
 * Mock driver standings data
 * FINAL 2025 F1 Season Standings - All 21 drivers
 */
export const mockDriverStandings = [
  { position: "1", points: "423", wins: "4", Driver: { driverId: "norris", permanentNumber: "4", code: "NOR", givenName: "Lando", familyName: "Norris", nationality: "British" }, Constructors: [{ constructorId: "mclaren", name: "McLaren", nationality: "British" }] },
  { position: "2", points: "421", wins: "9", Driver: { driverId: "verstappen", permanentNumber: "1", code: "VER", givenName: "Max", familyName: "Verstappen", nationality: "Dutch" }, Constructors: [{ constructorId: "red_bull", name: "Red Bull Racing", nationality: "Austrian" }] },
  { position: "3", points: "410", wins: "3", Driver: { driverId: "piastri", permanentNumber: "81", code: "PIA", givenName: "Oscar", familyName: "Piastri", nationality: "Australian" }, Constructors: [{ constructorId: "mclaren", name: "McLaren", nationality: "British" }] },
  { position: "4", points: "319", wins: "3", Driver: { driverId: "russell", permanentNumber: "63", code: "RUS", givenName: "George", familyName: "Russell", nationality: "British" }, Constructors: [{ constructorId: "mercedes", name: "Mercedes", nationality: "German" }] },
  { position: "5", points: "242", wins: "3", Driver: { driverId: "leclerc", permanentNumber: "16", code: "LEC", givenName: "Charles", familyName: "Leclerc", nationality: "Monegasque" }, Constructors: [{ constructorId: "ferrari", name: "Ferrari", nationality: "Italian" }] },
  { position: "6", points: "156", wins: "0", Driver: { driverId: "hamilton", permanentNumber: "44", code: "HAM", givenName: "Lewis", familyName: "Hamilton", nationality: "British" }, Constructors: [{ constructorId: "ferrari", name: "Ferrari", nationality: "Italian" }] },
  { position: "7", points: "150", wins: "0", Driver: { driverId: "antonelli", permanentNumber: "12", code: "ANT", givenName: "Kimi", familyName: "Antonelli", nationality: "Italian" }, Constructors: [{ constructorId: "mercedes", name: "Mercedes", nationality: "German" }] },
  { position: "8", points: "73", wins: "0", Driver: { driverId: "albon", permanentNumber: "23", code: "ALB", givenName: "Alexander", familyName: "Albon", nationality: "Thai" }, Constructors: [{ constructorId: "williams", name: "Williams", nationality: "British" }] },
  { position: "9", points: "64", wins: "0", Driver: { driverId: "sainz", permanentNumber: "55", code: "SAI", givenName: "Carlos", familyName: "Sainz", nationality: "Spanish" }, Constructors: [{ constructorId: "williams", name: "Williams", nationality: "British" }] },
  { position: "10", points: "56", wins: "0", Driver: { driverId: "alonso", permanentNumber: "14", code: "ALO", givenName: "Fernando", familyName: "Alonso", nationality: "Spanish" }, Constructors: [{ constructorId: "aston_martin", name: "Aston Martin", nationality: "British" }] },
  { position: "11", points: "51", wins: "0", Driver: { driverId: "hulkenberg", permanentNumber: "27", code: "HUL", givenName: "Nico", familyName: "Hulkenberg", nationality: "German" }, Constructors: [{ constructorId: "sauber", name: "Kick Sauber", nationality: "Swiss" }] },
  { position: "12", points: "51", wins: "0", Driver: { driverId: "hadjar", permanentNumber: "6", code: "HAD", givenName: "Isack", familyName: "Hadjar", nationality: "French" }, Constructors: [{ constructorId: "rb", name: "RB", nationality: "Italian" }] },
  { position: "13", points: "41", wins: "0", Driver: { driverId: "bearman", permanentNumber: "87", code: "BEA", givenName: "Oliver", familyName: "Bearman", nationality: "British" }, Constructors: [{ constructorId: "haas", name: "Haas", nationality: "American" }] },
  { position: "14", points: "38", wins: "0", Driver: { driverId: "lawson", permanentNumber: "30", code: "LAW", givenName: "Liam", familyName: "Lawson", nationality: "New Zealander" }, Constructors: [{ constructorId: "rb", name: "RB", nationality: "Italian" }] },
  { position: "15", points: "38", wins: "0", Driver: { driverId: "ocon", permanentNumber: "31", code: "OCO", givenName: "Esteban", familyName: "Ocon", nationality: "French" }, Constructors: [{ constructorId: "haas", name: "Haas", nationality: "American" }] },
  { position: "16", points: "33", wins: "0", Driver: { driverId: "stroll", permanentNumber: "18", code: "STR", givenName: "Lance", familyName: "Stroll", nationality: "Canadian" }, Constructors: [{ constructorId: "aston_martin", name: "Aston Martin", nationality: "British" }] },
  { position: "17", points: "33", wins: "0", Driver: { driverId: "tsunoda", permanentNumber: "22", code: "TSU", givenName: "Yuki", familyName: "Tsunoda", nationality: "Japanese" }, Constructors: [{ constructorId: "red_bull", name: "Red Bull Racing", nationality: "Austrian" }] },
  { position: "18", points: "22", wins: "0", Driver: { driverId: "gasly", permanentNumber: "10", code: "GAS", givenName: "Pierre", familyName: "Gasly", nationality: "French" }, Constructors: [{ constructorId: "alpine", name: "Alpine", nationality: "French" }] },
  { position: "19", points: "19", wins: "0", Driver: { driverId: "bortoleto", permanentNumber: "5", code: "BOR", givenName: "Gabriel", familyName: "Bortoleto", nationality: "Brazilian" }, Constructors: [{ constructorId: "sauber", name: "Kick Sauber", nationality: "Swiss" }] },
  { position: "20", points: "0", wins: "0", Driver: { driverId: "colapinto", permanentNumber: "43", code: "COL", givenName: "Franco", familyName: "Colapinto", nationality: "Argentine" }, Constructors: [{ constructorId: "alpine", name: "Alpine", nationality: "French" }] },
  { position: "21", points: "0", wins: "0", Driver: { driverId: "doohan", permanentNumber: "7", code: "DOO", givenName: "Jack", familyName: "Doohan", nationality: "Australian" }, Constructors: [{ constructorId: "alpine", name: "Alpine", nationality: "French" }] },
];

/**
 * Mock constructor standings data
 * FINAL 2025 F1 Constructor Championship Standings
 */
export const mockConstructorStandings = [
  { position: "1", points: "833", wins: "7", Constructor: { constructorId: "mclaren", name: "McLaren", nationality: "British" } },
  { position: "2", points: "469", wins: "3", Constructor: { constructorId: "mercedes", name: "Mercedes", nationality: "German" } },
  { position: "3", points: "451", wins: "9", Constructor: { constructorId: "red_bull", name: "Red Bull Racing", nationality: "Austrian" } },
  { position: "4", points: "398", wins: "3", Constructor: { constructorId: "ferrari", name: "Ferrari", nationality: "Italian" } },
  { position: "5", points: "137", wins: "0", Constructor: { constructorId: "williams", name: "Williams", nationality: "British" } },
  { position: "6", points: "92", wins: "0", Constructor: { constructorId: "rb", name: "RB", nationality: "Italian" } },
  { position: "7", points: "89", wins: "0", Constructor: { constructorId: "aston_martin", name: "Aston Martin", nationality: "British" } },
  { position: "8", points: "79", wins: "0", Constructor: { constructorId: "haas", name: "Haas", nationality: "American" } },
  { position: "9", points: "70", wins: "0", Constructor: { constructorId: "sauber", name: "Kick Sauber", nationality: "Swiss" } },
  { position: "10", points: "22", wins: "0", Constructor: { constructorId: "alpine", name: "Alpine", nationality: "French" } },
];

/**
 * Mock race schedule data - generates schedule for current year
 * Based on typical F1 calendar structure
 */
export const getMockRaceSchedule = () => {
  const currentYear = getCurrentSeason();
  return [
    {
      season: currentYear,
      round: "1",
      raceName: "Bahrain Grand Prix",
      date: `${currentYear}-03-02`,
      time: "15:00:00Z",
      Circuit: {
        circuitId: "bahrain",
        circuitName: "Bahrain International Circuit",
        Location: {
          lat: "26.0325",
          long: "50.5106",
          locality: "Sakhir",
          country: "Bahrain"
        }
      }
    },
    {
      season: currentYear,
      round: "2",
      raceName: "Saudi Arabian Grand Prix",
      date: `${currentYear}-03-09`,
      time: "17:00:00Z",
      Circuit: {
        circuitId: "jeddah",
        circuitName: "Jeddah Corniche Circuit",
        Location: {
          lat: "21.6319",
          long: "39.1044",
          locality: "Jeddah",
          country: "Saudi Arabia"
        }
      }
    },
    {
      season: currentYear,
      round: "3",
      raceName: "Australian Grand Prix",
      date: `${currentYear}-03-23`,
      time: "05:00:00Z",
      Circuit: {
        circuitId: "albert_park",
        circuitName: "Albert Park Circuit",
        Location: {
          lat: "-37.8497",
          long: "144.968",
          locality: "Melbourne",
          country: "Australia"
        }
      }
    },
  {
    season: `${currentYear}`,
    round: "4",
    raceName: "Japanese Grand Prix",
    date: "`${currentYear}-04-06",
    time: "05:00:00Z",
    Circuit: {
      circuitId: "suzuka",
      circuitName: "Suzuka International Racing Course",
      Location: {
        lat: "34.8431",
        long: "136.541",
        locality: "Suzuka",
        country: "Japan"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "5",
    raceName: "Chinese Grand Prix",
    date: "`${currentYear}-04-20",
    time: "07:00:00Z",
    Circuit: {
      circuitId: "shanghai",
      circuitName: "Shanghai International Circuit",
      Location: {
        lat: "31.3389",
        long: "121.22",
        locality: "Shanghai",
        country: "China"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "6",
    raceName: "Miami Grand Prix",
    date: "`${currentYear}-05-04",
    time: "19:30:00Z",
    Circuit: {
      circuitId: "miami",
      circuitName: "Miami International Autodrome",
      Location: {
        lat: "25.9581",
        long: "-80.2389",
        locality: "Miami",
        country: "USA"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "7",
    raceName: "Emilia Romagna Grand Prix",
    date: "`${currentYear}-05-18",
    time: "13:00:00Z",
    Circuit: {
      circuitId: "imola",
      circuitName: "Autodromo Enzo e Dino Ferrari",
      Location: {
        lat: "44.3439",
        long: "11.7167",
        locality: "Imola",
        country: "Italy"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "8",
    raceName: "Monaco Grand Prix",
    date: "`${currentYear}-05-25",
    time: "13:00:00Z",
    Circuit: {
      circuitId: "monaco",
      circuitName: "Circuit de Monaco",
      Location: {
        lat: "43.7347",
        long: "7.42056",
        locality: "Monte-Carlo",
        country: "Monaco"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "9",
    raceName: "Spanish Grand Prix",
    date: "`${currentYear}-06-01",
    time: "13:00:00Z",
    Circuit: {
      circuitId: "catalunya",
      circuitName: "Circuit de Barcelona-Catalunya",
      Location: {
        lat: "41.57",
        long: "2.26111",
        locality: "Montmeló",
        country: "Spain"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "10",
    raceName: "Canadian Grand Prix",
    date: "`${currentYear}-06-15",
    time: "18:00:00Z",
    Circuit: {
      circuitId: "villeneuve",
      circuitName: "Circuit Gilles Villeneuve",
      Location: {
        lat: "45.5",
        long: "-73.5228",
        locality: "Montreal",
        country: "Canada"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "11",
    raceName: "Austrian Grand Prix",
    date: "`${currentYear}-06-29",
    time: "13:00:00Z",
    Circuit: {
      circuitId: "red_bull_ring",
      circuitName: "Red Bull Ring",
      Location: {
        lat: "47.2197",
        long: "14.7647",
        locality: "Spielberg",
        country: "Austria"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "12",
    raceName: "British Grand Prix",
    date: "`${currentYear}-07-06",
    time: "14:00:00Z",
    Circuit: {
      circuitId: "silverstone",
      circuitName: "Silverstone Circuit",
      Location: {
        lat: "52.0786",
        long: "-1.01694",
        locality: "Silverstone",
        country: "UK"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "13",
    raceName: "Belgian Grand Prix",
    date: "`${currentYear}-07-27",
    time: "13:00:00Z",
    Circuit: {
      circuitId: "spa",
      circuitName: "Circuit de Spa-Francorchamps",
      Location: {
        lat: "50.4372",
        long: "5.97139",
        locality: "Spa",
        country: "Belgium"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "14",
    raceName: "Hungarian Grand Prix",
    date: "`${currentYear}-08-03",
    time: "13:00:00Z",
    Circuit: {
      circuitId: "hungaroring",
      circuitName: "Hungaroring",
      Location: {
        lat: "47.5789",
        long: "19.2486",
        locality: "Budapest",
        country: "Hungary"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "15",
    raceName: "Dutch Grand Prix",
    date: "`${currentYear}-08-31",
    time: "13:00:00Z",
    Circuit: {
      circuitId: "zandvoort",
      circuitName: "Circuit Zandvoort",
      Location: {
        lat: "52.3888",
        long: "4.54092",
        locality: "Zandvoort",
        country: "Netherlands"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "16",
    raceName: "Italian Grand Prix",
    date: "`${currentYear}-09-07",
    time: "13:00:00Z",
    Circuit: {
      circuitId: "monza",
      circuitName: "Autodromo Nazionale di Monza",
      Location: {
        lat: "45.6156",
        long: "9.28111",
        locality: "Monza",
        country: "Italy"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "17",
    raceName: "Azerbaijan Grand Prix",
    date: "`${currentYear}-09-21",
    time: "11:00:00Z",
    Circuit: {
      circuitId: "baku",
      circuitName: "Baku City Circuit",
      Location: {
        lat: "40.3725",
        long: "49.8533",
        locality: "Baku",
        country: "Azerbaijan"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "18",
    raceName: "Singapore Grand Prix",
    date: "`${currentYear}-10-05",
    time: "12:00:00Z",
    Circuit: {
      circuitId: "marina_bay",
      circuitName: "Marina Bay Street Circuit",
      Location: {
        lat: "1.2914",
        long: "103.864",
        locality: "Marina Bay",
        country: "Singapore"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "19",
    raceName: "United States Grand Prix",
    date: "`${currentYear}-10-19",
    time: "19:00:00Z",
    Circuit: {
      circuitId: "americas",
      circuitName: "Circuit of the Americas",
      Location: {
        lat: "30.1328",
        long: "-97.6411",
        locality: "Austin",
        country: "USA"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "20",
    raceName: "Mexico City Grand Prix",
    date: "`${currentYear}-10-26",
    time: "20:00:00Z",
    Circuit: {
      circuitId: "rodriguez",
      circuitName: "Autódromo Hermanos Rodríguez",
      Location: {
        lat: "19.4042",
        long: "-99.0907",
        locality: "Mexico City",
        country: "Mexico"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "21",
    raceName: "São Paulo Grand Prix",
    date: "`${currentYear}-11-02",
    time: "17:00:00Z",
    Circuit: {
      circuitId: "interlagos",
      circuitName: "Autódromo José Carlos Pace",
      Location: {
        lat: "-23.7036",
        long: "-46.6997",
        locality: "São Paulo",
        country: "Brazil"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "22",
    raceName: "Las Vegas Grand Prix",
    date: "`${currentYear}-11-22",
    time: "06:00:00Z",
    Circuit: {
      circuitId: "vegas",
      circuitName: "Las Vegas Street Circuit",
      Location: {
        lat: "36.1147",
        long: "-115.173",
        locality: "Las Vegas",
        country: "USA"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "23",
    raceName: "Qatar Grand Prix",
    date: "`${currentYear}-11-30",
    time: "16:00:00Z",
    Circuit: {
      circuitId: "losail",
      circuitName: "Losail International Circuit",
      Location: {
        lat: "25.49",
        long: "51.4542",
        locality: "Al Daayen",
        country: "Qatar"
      }
    }
  },
  {
    season: `${currentYear}`,
    round: "24",
    raceName: "Abu Dhabi Grand Prix",
    date: "`${currentYear}-12-07",
    time: "13:00:00Z",
    Circuit: {
      circuitId: "yas_marina",
      circuitName: "Yas Marina Circuit",
      Location: {
        lat: "24.4672",
        long: "54.6031",
        locality: "Abu Dhabi",
        country: "UAE"
      }
    }
  }
  ];
};

// Keep legacy export for backward compatibility
export const mockRaceSchedule = getMockRaceSchedule();

/**
 * Abu Dhabi Grand Prix 2025 - Final Race Results
 * The concluding race of the 2025 F1 season
 */
export const mockLastRaceResults = {
  race: {
    raceName: "Abu Dhabi Grand Prix",
    round: "24",
    date: "2025-12-07",
    time: "13:00:00Z",
    Circuit: {
      circuitName: "Yas Marina Circuit",
      Location: { country: "UAE", locality: "Abu Dhabi" }
    }
  },
  results: [
    { position: "1", number: "1", Driver: { driverId: "verstappen", code: "VER", givenName: "Max", familyName: "Verstappen" }, Constructor: { constructorId: "red_bull", name: "Red Bull Racing" }, Time: { time: "1:26:07.469" }, points: "25", grid: "1" },
    { position: "2", number: "81", Driver: { driverId: "piastri", code: "PIA", givenName: "Oscar", familyName: "Piastri" }, Constructor: { constructorId: "mclaren", name: "McLaren" }, Time: { time: "+12.594s" }, points: "18", grid: "2" },
    { position: "3", number: "4", Driver: { driverId: "norris", code: "NOR", givenName: "Lando", familyName: "Norris" }, Constructor: { constructorId: "mclaren", name: "McLaren" }, Time: { time: "+16.572s" }, points: "15", grid: "3" },
    { position: "4", number: "16", Driver: { driverId: "leclerc", code: "LEC", givenName: "Charles", familyName: "Leclerc" }, Constructor: { constructorId: "ferrari", name: "Ferrari" }, Time: { time: "+23.279s" }, points: "12", grid: "4" },
    { position: "5", number: "63", Driver: { driverId: "russell", code: "RUS", givenName: "George", familyName: "Russell" }, Constructor: { constructorId: "mercedes", name: "Mercedes" }, Time: { time: "+48.563s" }, points: "10", grid: "5" },
    { position: "6", number: "14", Driver: { driverId: "alonso", code: "ALO", givenName: "Fernando", familyName: "Alonso" }, Constructor: { constructorId: "aston_martin", name: "Aston Martin" }, Time: { time: "+67.562s" }, points: "8", grid: "6" },
    { position: "7", number: "31", Driver: { driverId: "ocon", code: "OCO", givenName: "Esteban", familyName: "Ocon" }, Constructor: { constructorId: "haas", name: "Haas" }, Time: { time: "+69.876s" }, points: "6", grid: "7" },
    { position: "8", number: "44", Driver: { driverId: "hamilton", code: "HAM", givenName: "Lewis", familyName: "Hamilton" }, Constructor: { constructorId: "ferrari", name: "Ferrari" }, Time: { time: "+72.670s" }, points: "4", grid: "8" },
    { position: "9", number: "27", Driver: { driverId: "hulkenberg", code: "HUL", givenName: "Nico", familyName: "Hulkenberg" }, Constructor: { constructorId: "sauber", name: "Kick Sauber" }, Time: { time: "+79.014s" }, points: "2", grid: "9" },
    { position: "10", number: "18", Driver: { driverId: "stroll", code: "STR", givenName: "Lance", familyName: "Stroll" }, Constructor: { constructorId: "aston_martin", name: "Aston Martin" }, Time: { time: "+79.523s" }, points: "1", grid: "10" },
  ],
  polePosition: { Driver: { driverId: "verstappen", code: "VER", familyName: "Verstappen" }, time: "1:22.207" },
  fastestLap: { Driver: { driverId: "leclerc", code: "LEC", familyName: "Leclerc" }, time: "1:26.725", lap: "45" }
};
