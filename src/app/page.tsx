import { Box, Link } from "@mui/material";
import TrendingFlat from "@mui/icons-material/TrendingFlat";

import "./home.scss";

export default function Home() {
  return (
    <main className="home-page">
      <article className="welcome-content">
        <h1 className="welcome-heading">Welcome to Budget Tracker</h1>
        <h2 className="welcome-message">
          Take control of your finances—track your budget and watch your savings
          grow!
        </h2>
        <Box display="flex">
          <Link href="/signup" underline="hover" className="link">
            Get started <TrendingFlat sx={{ fontSize: 20, marginLeft: 1 }} />
          </Link>
        </Box>
      </article>
    </main>
  );
}
