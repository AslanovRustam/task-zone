import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme();

const primaryNew = baseTheme.palette.augmentColor({
  color: {
    main: "#fff",
    contrastText: "#000000",
  },
  name: "primaryNew",
});

export const theme = createTheme({
  palette: {
    primaryNew,
  },
});

export default theme;

declare module "@mui/material/styles" {
  interface Palette {
    primaryNew: Palette["primary"];
  }
  interface PaletteOptions {
    primaryNew?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primaryNew: true;
  }
}
