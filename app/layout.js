import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata = {
  title: "F1 Live Telemetry & Dashboard",
  description: "Real-time F1 Telemetry, Standings, & Head-to-Head Analytics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}