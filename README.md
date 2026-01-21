# F1 Hub - Formula 1 Dashboard

A modern, feature-rich Formula 1 dashboard website built with Next.js, featuring live race data, driver standings, team information, and race schedules with stunning animations and a dark racing aesthetic.

## 🏎️ Features

### 🎬 Animated Splash Screen
- Full-screen cinematic intro with F1-themed animations
- Smooth transitions using Framer Motion
- Progress indicator and loading effects

### 📊 Main Dashboard
- **Next Race Information**: Countdown timer and race details
- **Driver Standings**: Top 6 drivers with animated cards
- **Live Updates**: Real-time data from Ergast F1 API
- **Championship Leader**: Highlighted stats for the current leader

### 👨‍✈️ Driver Standings Page
- Complete driver championship standings
- Toggle between card and table views
- Statistics overview (total drivers, leader, points)
- Team affiliations and nationality info

### 🏁 Constructor Standings Page
- Full constructor/team championship standings
- Visual team cards with brand colors
- Detailed point system information
- Toggle between card and table views

### 📅 Race Schedule Page
- Complete 2025 F1 calendar
- Filter races: All, Upcoming, Completed
- Countdown timers for upcoming races
- Circuit information and locations
- Next race highlighted

### 🎨 Design Features
- Dark racing aesthetic with neon accents (#ccff00)
- Smooth animations and transitions with Framer Motion
- Responsive design (mobile, tablet, desktop)
- Hover effects and interactive elements
- Animated background effects
- Live ticker with breaking news
- Loading skeletons for better UX

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.4 (React 19.2.3)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Data Source**: Ergast F1 API (via jolpi.ca proxy)
- **JavaScript**: ES6+ with JSDoc type annotations

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Drewww17/m1_sa_part3_luminarias.git

# Navigate to project directory
cd m1_sa_part3_luminarias

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
/app
  /page.js                  # Splash screen and entry point
  /layout.js                # Root layout with metadata
  /globals.css              # Global styles
  /dashboard/page.js        # Main dashboard page
  /drivers/page.js          # Driver standings page
  /teams/page.js            # Constructor standings page
  /schedule/page.js         # Race calendar page

/components
  /SplashScreen.js          # Animated intro screen
  /Navbar.js                # Navigation component
  /DriverCard.js            # Driver info card
  /TeamCard.js              # Team/constructor card
  /RaceCard.js              # Race event card
  /StandingsTable.js        # Standings table view
  /CountdownTimer.js        # Race countdown component
  /LoadingSkeleton.js       # Loading placeholder

/lib
  /api.js                   # F1 API integration functions
  /types.js                 # JSDoc type definitions
```

## 🔌 API Integration

This project uses the [Ergast Developer API](http://ergast.com/mrd/) via the [jolpi.ca proxy](https://api.jolpi.ca/ergast/) for F1 data:

- **Driver Standings**: Current season championship positions
- **Constructor Standings**: Team championship positions
- **Race Schedule**: Complete calendar with dates and locations
- **Race Results**: Historical race data

### API Functions (lib/api.js)

```javascript
getDriverStandings(season)      // Get driver championship standings
getConstructorStandings(season) // Get team championship standings
getRaceSchedule(season)         // Get full race calendar
getNextRace()                   // Get upcoming race information
getLastRaceResults(season)      // Get most recent race results
```

### Caching

API responses are cached in memory for 5 minutes to improve performance and reduce API calls.

## 🎯 Available Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints for:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Color Palette

- **Primary**: #ccff00 (Neon Yellow/Lime)
- **Background**: #0a0a0a (Deep Black)
- **Surface**: #18181b (Zinc 900)
- **Text**: #ffffff (White)
- **Accent**: Various gradient effects

## 🔧 Customization

### Changing Theme Colors

Edit the colors in your components or add to `globals.css`:

```css
:root {
  --primary: #ccff00;
  --background: #0a0a0a;
}
```

### Adding New Pages

1. Create a new folder in `/app`
2. Add a `page.js` file
3. Import and use existing components
4. Add navigation link in `components/Navbar.js`

### Customizing Animations

Framer Motion animations can be customized by modifying the `initial`, `animate`, and `transition` props in components.

## 🐛 Troubleshooting

### API Errors

If you see "API Error" messages:
- Check internet connection
- Verify Ergast API is accessible
- The app will fall back to demo data automatically

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Ergast Developer API](http://ergast.com/mrd/) for F1 data
- [Formula1Dashboard.com](https://app.formula1dashboard.com/) for design inspiration
- [LandoNorris.com](https://landonorris.com/) for animation inspiration
- Next.js and React teams for the amazing framework

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ for F1 fans by F1 fans
