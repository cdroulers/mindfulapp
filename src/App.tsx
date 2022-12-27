import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./components/Home";
import Header from "./components/Header";

import "./App.css";
import ServiceWorkerNotifications from "./components/ServiceWorkerNotifications";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0277bd",
        light: "#58a5f0",
        dark: "#004c8c",
      },
      secondary: {
        main: "#80deea",
        light: "#b4ffff",
        dark: "#4bacb8",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Header />
        <Home></Home>
        <ServiceWorkerNotifications />
      </div>
    </ThemeProvider>
  );
}

export default App;
