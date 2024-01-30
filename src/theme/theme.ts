/* eslint-disable no-mixed-spaces-and-tabs */
import { ThemeOptions } from "@mui/material";
import { Poppins } from "next/font/google";

export const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const getThemeOptions = (mode: "dark" | "light"): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          background: {
            default: "#212121",
            paper: "#424242",
          },
          text: {
            primary: "#fff",
          },
        }
      : {
          background: {
            default: "#fff",
            paper: "#fff",
          },
          text: {
            primary: "#222222",
          },
        }),
    primary: {
      main: "#2b9348",
      light: "#55a630",
      dark: "#007f5f",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#2F66EE",
      light: "#BFC9FF",
      dark: "#1A4CC7",
      contrastText: "#000000",
    },
    success: {
      main: "#039855",
      dark: "#12B76A",
      light: "#A6F4C5",
    },
    warning: {
      main: "#F9A639",
    },
    error: {
      main: "#ff1744",
      dark: "#E0002D",
      light: "#FF476C",
    },
    // text: {
    // 	primary: '#3E4242',
    // },
  },

  typography: {
    fontFamily: poppins.style.fontFamily,
    fontSize: 12,
  },
});
