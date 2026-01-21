// Mock F1 Data - 2024/2025 Season
// Used as fallback when Ergast API is unavailable or returns no data

/**
 * Mock driver standings data
 * Based on real 2024/2025 F1 driver lineup
 */
export const mockDriverStandings = [
  {
    position: "1",
    points: "549",
    wins: "19",
    Driver: {
      driverId: "max_verstappen",
      permanentNumber: "1",
      code: "VER",
      givenName: "Max",
      familyName: "Verstappen",
      dateOfBirth: "1997-09-30",
      nationality: "Dutch"
    },
    Constructors: [
      {
        constructorId: "red_bull",
        name: "Red Bull Racing",
        nationality: "Austrian"
      }
    ]
  },
  {
    position: "2",
    points: "223",
    wins: "2",
    Driver: {
      driverId: "norris",
      permanentNumber: "4",
      code: "NOR",
      givenName: "Lando",
      familyName: "Norris",
      dateOfBirth: "1999-11-13",
      nationality: "British"
    },
    Constructors: [
      {
        constructorId: "mclaren",
        name: "McLaren",
        nationality: "British"
      }
    ]
  },
  {
    position: "3",
    points: "194",
    wins: "3",
    Driver: {
      driverId: "leclerc",
      permanentNumber: "16",
      code: "LEC",
      givenName: "Charles",
      familyName: "Leclerc",
      dateOfBirth: "1997-10-16",
      nationality: "Monegasque"
    },
    Constructors: [
      {
        constructorId: "ferrari",
        name: "Ferrari",
        nationality: "Italian"
      }
    ]
  },
  {
    position: "4",
    points: "190",
    wins: "0",
    Driver: {
      driverId: "piastri",
      permanentNumber: "81",
      code: "PIA",
      givenName: "Oscar",
      familyName: "Piastri",
      dateOfBirth: "2001-04-06",
      nationality: "Australian"
    },
    Constructors: [
      {
        constructorId: "mclaren",
        name: "McLaren",
        nationality: "British"
      }
    ]
  },
  {
    position: "5",
    points: "177",
    wins: "2",
    Driver: {
      driverId: "sainz",
      permanentNumber: "55",
      code: "SAI",
      givenName: "Carlos",
      familyName: "Sainz",
      dateOfBirth: "1994-09-01",
      nationality: "Spanish"
    },
    Constructors: [
      {
        constructorId: "ferrari",
        name: "Ferrari",
        nationality: "Italian"
      }
    ]
  },
  {
    position: "6",
    points: "151",
    wins: "2",
    Driver: {
      driverId: "hamilton",
      permanentNumber: "44",
      code: "HAM",
      givenName: "Lewis",
      familyName: "Hamilton",
      dateOfBirth: "1985-01-07",
      nationality: "British"
    },
    Constructors: [
      {
        constructorId: "mercedes",
        name: "Mercedes",
        nationality: "German"
      }
    ]
  },
  {
    position: "7",
    points: "144",
    wins: "0",
    Driver: {
      driverId: "perez",
      permanentNumber: "11",
      code: "PER",
      givenName: "Sergio",
      familyName: "Pérez",
      dateOfBirth: "1990-01-26",
      nationality: "Mexican"
    },
    Constructors: [
      {
        constructorId: "red_bull",
        name: "Red Bull Racing",
        nationality: "Austrian"
      }
    ]
  },
  {
    position: "8",
    points: "143",
    wins: "1",
    Driver: {
      driverId: "russell",
      permanentNumber: "63",
      code: "RUS",
      givenName: "George",
      familyName: "Russell",
      dateOfBirth: "1998-02-15",
      nationality: "British"
    },
    Constructors: [
      {
        constructorId: "mercedes",
        name: "Mercedes",
        nationality: "German"
      }
    ]
  },
  {
    position: "9",
    points: "73",
    wins: "0",
    Driver: {
      driverId: "alonso",
      permanentNumber: "14",
      code: "ALO",
      givenName: "Fernando",
      familyName: "Alonso",
      dateOfBirth: "1981-07-29",
      nationality: "Spanish"
    },
    Constructors: [
      {
        constructorId: "aston_martin",
        name: "Aston Martin",
        nationality: "British"
      }
    ]
  },
  {
    position: "10",
    points: "60",
    wins: "0",
    Driver: {
      driverId: "hulkenberg",
      permanentNumber: "27",
      code: "HUL",
      givenName: "Nico",
      familyName: "Hülkenberg",
      dateOfBirth: "1987-08-19",
      nationality: "German"
    },
    Constructors: [
      {
        constructorId: "haas",
        name: "Haas F1 Team",
        nationality: "American"
      }
    ]
  },
  {
    position: "11",
    points: "48",
    wins: "0",
    Driver: {
      driverId: "tsunoda",
      permanentNumber: "22",
      code: "TSU",
      givenName: "Yuki",
      familyName: "Tsunoda",
      dateOfBirth: "2000-05-11",
      nationality: "Japanese"
    },
    Constructors: [
      {
        constructorId: "rb",
        name: "RB",
        nationality: "Italian"
      }
    ]
  },
  {
    position: "12",
    points: "46",
    wins: "0",
    Driver: {
      driverId: "gasly",
      permanentNumber: "10",
      code: "GAS",
      givenName: "Pierre",
      familyName: "Gasly",
      dateOfBirth: "1996-02-07",
      nationality: "French"
    },
    Constructors: [
      {
        constructorId: "alpine",
        name: "Alpine F1 Team",
        nationality: "French"
      }
    ]
  },
  {
    position: "13",
    points: "24",
    wins: "0",
    Driver: {
      driverId: "stroll",
      permanentNumber: "18",
      code: "STR",
      givenName: "Lance",
      familyName: "Stroll",
      dateOfBirth: "1998-10-29",
      nationality: "Canadian"
    },
    Constructors: [
      {
        constructorId: "aston_martin",
        name: "Aston Martin",
        nationality: "British"
      }
    ]
  },
  {
    position: "14",
    points: "20",
    wins: "0",
    Driver: {
      driverId: "ocon",
      permanentNumber: "31",
      code: "OCO",
      givenName: "Esteban",
      familyName: "Ocon",
      dateOfBirth: "1996-09-17",
      nationality: "French"
    },
    Constructors: [
      {
        constructorId: "alpine",
        name: "Alpine F1 Team",
        nationality: "French"
      }
    ]
  },
  {
    position: "15",
    points: "17",
    wins: "0",
    Driver: {
      driverId: "albon",
      permanentNumber: "23",
      code: "ALB",
      givenName: "Alexander",
      familyName: "Albon",
      dateOfBirth: "1996-03-23",
      nationality: "Thai"
    },
    Constructors: [
      {
        constructorId: "williams",
        name: "Williams",
        nationality: "British"
      }
    ]
  },
  {
    position: "16",
    points: "15",
    wins: "0",
    Driver: {
      driverId: "ricciardo",
      permanentNumber: "3",
      code: "RIC",
      givenName: "Daniel",
      familyName: "Ricciardo",
      dateOfBirth: "1989-07-01",
      nationality: "Australian"
    },
    Constructors: [
      {
        constructorId: "rb",
        name: "RB",
        nationality: "Italian"
      }
    ]
  },
  {
    position: "17",
    points: "13",
    wins: "0",
    Driver: {
      driverId: "kevin_magnussen",
      permanentNumber: "20",
      code: "MAG",
      givenName: "Kevin",
      familyName: "Magnussen",
      dateOfBirth: "1992-10-05",
      nationality: "Danish"
    },
    Constructors: [
      {
        constructorId: "haas",
        name: "Haas F1 Team",
        nationality: "American"
      }
    ]
  },
  {
    position: "18",
    points: "7",
    wins: "0",
    Driver: {
      driverId: "bottas",
      permanentNumber: "77",
      code: "BOT",
      givenName: "Valtteri",
      familyName: "Bottas",
      dateOfBirth: "1989-08-28",
      nationality: "Finnish"
    },
    Constructors: [
      {
        constructorId: "sauber",
        name: "Kick Sauber",
        nationality: "Swiss"
      }
    ]
  },
  {
    position: "19",
    points: "6",
    wins: "0",
    Driver: {
      driverId: "zhou",
      permanentNumber: "24",
      code: "ZHO",
      givenName: "Guanyu",
      familyName: "Zhou",
      dateOfBirth: "1999-05-30",
      nationality: "Chinese"
    },
    Constructors: [
      {
        constructorId: "sauber",
        name: "Kick Sauber",
        nationality: "Swiss"
      }
    ]
  },
  {
    position: "20",
    points: "4",
    wins: "0",
    Driver: {
      driverId: "sargeant",
      permanentNumber: "2",
      code: "SAR",
      givenName: "Logan",
      familyName: "Sargeant",
      dateOfBirth: "2000-12-31",
      nationality: "American"
    },
    Constructors: [
      {
        constructorId: "williams",
        name: "Williams",
        nationality: "British"
      }
    ]
  }
];

/**
 * Mock constructor standings data
 * Based on real 2024/2025 F1 team lineup
 */
export const mockConstructorStandings = [
  {
    position: "1",
    points: "693",
    wins: "19",
    Constructor: {
      constructorId: "red_bull",
      name: "Red Bull Racing",
      nationality: "Austrian",
      url: "http://www.redbullracing.com/"
    }
  },
  {
    position: "2",
    points: "413",
    wins: "2",
    Constructor: {
      constructorId: "mclaren",
      name: "McLaren",
      nationality: "British",
      url: "http://www.mclaren.com/"
    }
  },
  {
    position: "3",
    points: "371",
    wins: "5",
    Constructor: {
      constructorId: "ferrari",
      name: "Ferrari",
      nationality: "Italian",
      url: "http://www.ferrari.com/"
    }
  },
  {
    position: "4",
    points: "294",
    wins: "3",
    Constructor: {
      constructorId: "mercedes",
      name: "Mercedes",
      nationality: "German",
      url: "http://www.mercedesamgf1.com/"
    }
  },
  {
    position: "5",
    points: "97",
    wins: "0",
    Constructor: {
      constructorId: "aston_martin",
      name: "Aston Martin",
      nationality: "British",
      url: "http://www.astonmartinf1.com/"
    }
  },
  {
    position: "6",
    points: "73",
    wins: "0",
    Constructor: {
      constructorId: "haas",
      name: "Haas F1 Team",
      nationality: "American",
      url: "http://www.haasf1team.com/"
    }
  },
  {
    position: "7",
    points: "63",
    wins: "0",
    Constructor: {
      constructorId: "rb",
      name: "RB",
      nationality: "Italian",
      url: "http://www.visacashapprb.com/"
    }
  },
  {
    position: "8",
    points: "66",
    wins: "0",
    Constructor: {
      constructorId: "alpine",
      name: "Alpine F1 Team",
      nationality: "French",
      url: "http://www.alpinecars.com/"
    }
  },
  {
    position: "9",
    points: "21",
    wins: "0",
    Constructor: {
      constructorId: "williams",
      name: "Williams",
      nationality: "British",
      url: "http://www.williamsf1.com/"
    }
  },
  {
    position: "10",
    points: "13",
    wins: "0",
    Constructor: {
      constructorId: "sauber",
      name: "Kick Sauber",
      nationality: "Swiss",
      url: "http://www.sauber-group.com/"
    }
  }
];

/**
 * Mock race schedule data
 * Based on 2024 F1 calendar with projections for 2025
 */
export const mockRaceSchedule = [
  {
    season: "2025",
    round: "1",
    raceName: "Bahrain Grand Prix",
    date: "2025-03-02",
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
    season: "2025",
    round: "2",
    raceName: "Saudi Arabian Grand Prix",
    date: "2025-03-09",
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
    season: "2025",
    round: "3",
    raceName: "Australian Grand Prix",
    date: "2025-03-23",
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
    season: "2025",
    round: "4",
    raceName: "Japanese Grand Prix",
    date: "2025-04-06",
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
    season: "2025",
    round: "5",
    raceName: "Chinese Grand Prix",
    date: "2025-04-20",
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
    season: "2025",
    round: "6",
    raceName: "Miami Grand Prix",
    date: "2025-05-04",
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
    season: "2025",
    round: "7",
    raceName: "Emilia Romagna Grand Prix",
    date: "2025-05-18",
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
    season: "2025",
    round: "8",
    raceName: "Monaco Grand Prix",
    date: "2025-05-25",
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
    season: "2025",
    round: "9",
    raceName: "Spanish Grand Prix",
    date: "2025-06-01",
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
    season: "2025",
    round: "10",
    raceName: "Canadian Grand Prix",
    date: "2025-06-15",
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
    season: "2025",
    round: "11",
    raceName: "Austrian Grand Prix",
    date: "2025-06-29",
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
    season: "2025",
    round: "12",
    raceName: "British Grand Prix",
    date: "2025-07-06",
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
    season: "2025",
    round: "13",
    raceName: "Belgian Grand Prix",
    date: "2025-07-27",
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
    season: "2025",
    round: "14",
    raceName: "Hungarian Grand Prix",
    date: "2025-08-03",
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
    season: "2025",
    round: "15",
    raceName: "Dutch Grand Prix",
    date: "2025-08-31",
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
    season: "2025",
    round: "16",
    raceName: "Italian Grand Prix",
    date: "2025-09-07",
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
    season: "2025",
    round: "17",
    raceName: "Azerbaijan Grand Prix",
    date: "2025-09-21",
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
    season: "2025",
    round: "18",
    raceName: "Singapore Grand Prix",
    date: "2025-10-05",
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
    season: "2025",
    round: "19",
    raceName: "United States Grand Prix",
    date: "2025-10-19",
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
    season: "2025",
    round: "20",
    raceName: "Mexico City Grand Prix",
    date: "2025-10-26",
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
    season: "2025",
    round: "21",
    raceName: "São Paulo Grand Prix",
    date: "2025-11-02",
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
    season: "2025",
    round: "22",
    raceName: "Las Vegas Grand Prix",
    date: "2025-11-22",
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
    season: "2025",
    round: "23",
    raceName: "Qatar Grand Prix",
    date: "2025-11-30",
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
    season: "2025",
    round: "24",
    raceName: "Abu Dhabi Grand Prix",
    date: "2025-12-07",
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
