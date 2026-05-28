import "../styles/globals.css";
import "../styles/cardSwiper.css";
import "../styles/posterSwiper.css";
import "../styles/topTenSwiper.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "black",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 200,
    },
    h2: {
      fontWeight: 200,
    },
    h3: {
      fontWeight: 200,
    },
    h4: {
      fontWeight: 200,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <ScopedCssBaseline>
        <Component {...pageProps} />
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}

export default MyApp;
