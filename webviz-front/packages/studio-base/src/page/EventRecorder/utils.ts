import { createTheme } from '@mui/material/styles';


export const EventPrioritys:Record<string,string> = {
  Highest:"Highest",
  High:"High",
  Medium:"Medium",
  Low:"Low",
  Lowest:"Lowest",
}

export const PriorityColors:Record<string,string> = {
  Highest: "#ef5350",//error
  High: "#ef5350",//error
  Medium:"#ff9800", //warning
  Low:"#42a5f5",//info
  Lowest:"#42a5f5",
}


export const darkTheme = createTheme({
  // name:"light",
  // mode:"light",
  typography: {
    // 中文字符和日文字符通常比较大，
    // 所以选用一个略小的 fontsize 会比较合适。
    fontSize: 14,
  },
  palette: {
    "mode": "light",
    "primary": {
        "50": "#F0F7FF",
        "100": "#C2E0FF",
        "200": "#99CCF3",
        "300": "#66B2FF",
        "400": "#3399FF",
        "500": "#007FFF",
        "600": "#0072E5",
        "700": "#0059B2",
        "800": "#004C99",
        "900": "#003A75",
        "main": "#007FFF",
        "light": "#ff0000",
        "dark": "#0059B2",
        "contrastText": "#fff"
    },
    "divider": "#E7EBF0",
    // "primaryDark": {
    //     "50": "#E2EDF8",
    //     "100": "#CEE0F3",
    //     "200": "#91B9E3",
    //     "300": "#5090D3",
    //     "400": "#265D97",
    //     "500": "#1E4976",
    //     "600": "#173A5E",
    //     "700": "#132F4C",
    //     "800": "#001E3C",
    //     "900": "#0A1929",
    //     "main": "#5090D3"
    // },
    "common": {
        "black": "#1D1D1D",
        "white": "#fff"
    },
    "text": {
        "primary": "#1A2027",
        "secondary": "#3E5060",
        "disabled": "rgba(0, 0, 0, 0.38)"
    },
    "grey": {
        "50": "#fafafa",
        "100": "#f5f5f5",
        "200": "#eeeeee",
        "300": "#e0e0e0",
        "400": "#bdbdbd",
        "500": "#9e9e9e",
        "600": "#757575",
        "700": "#616161",
        "800": "#424242",
        "900": "#212121",
        // "main": "#E7EBF0",
        // "contrastText": "#6F7E8C",
        "A100": "#f5f5f5",
        "A200": "#eeeeee",
        "A400": "#bdbdbd",
        "A700": "#616161"
    },
    "error": {
        "50": "#FFF0F1",
        "100": "#FFDBDE",
        "200": "#FFBDC2",
        "300": "#FF99A2",
        "400": "#FF7A86",
        "500": "#FF505F",
        "600": "#EB0014",
        "700": "#C70011",
        "800": "#94000D",
        "900": "#570007",
        "main": "#EB0014",
        "light": "#FF99A2",
        "dark": "#C70011",
        "contrastText": "#fff"
    },
    "success": {
        "50": "#E9FBF0",
        "100": "#C6F6D9",
        "200": "#9AEFBC",
        "300": "#6AE79C",
        "400": "#3EE07F",
        "500": "#21CC66",
        "600": "#1DB45A",
        "700": "#1AA251",
        "800": "#178D46",
        "900": "#0F5C2E",
        "main": "#1AA251",
        "light": "#6AE79C",
        "dark": "#1AA251",
        "contrastText": "#fff"
    },
    "warning": {
        "50": "#FFF9EB",
        "100": "#FFF3C1",
        "200": "#FFECA1",
        "300": "#FFDC48",
        "400": "#F4C000",
        "500": "#DEA500",
        "600": "#D18E00",
        "700": "#AB6800",
        "800": "#8C5800",
        "900": "#5A3600",
        "main": "#DEA500",
        "light": "#FFDC48",
        "dark": "#AB6800",
        "contrastText": "rgba(0, 0, 0, 0.87)"
    },
    "secondary": {
        "main": "#9c27b0",
        "light": "#ba68c8",
        "dark": "#7b1fa2",
        "contrastText": "#fff"
    },
    "info": {
        "main": "#0288d1",
        "light": "#03a9f4",
        "dark": "#01579b",
        "contrastText": "#fff"
    },
    "contrastThreshold": 3,
    "tonalOffset": 0.2,
    "background": {
        "paper": "#fff",
        "default": "#fff"
    },
    "action": {
        "active": "rgba(0, 0, 0, 0.54)",
        "hover": "rgba(0, 0, 0, 0.04)",
        "hoverOpacity": 0.04,
        "selected": "rgba(0, 0, 0, 0.08)",
        "selectedOpacity": 0.08,
        "disabled": "rgba(0, 0, 0, 0.26)",
        "disabledBackground": "rgba(0, 0, 0, 0.12)",
        "disabledOpacity": 0.38,
        "focus": "rgba(0, 0, 0, 0.12)",
        "focusOpacity": 0.12,
        "activatedOpacity": 0.12
    }
}
});


// declare module '@mui/material/styles/createTheme' {
//   interface Theme {
//     status: {
//       danger: React.CSSProperties['color'];
//     };
//   }
//   interface PaletteColor {
//     darker?: string;
//   }
//   interface SimplePaletteColorOptions {
//     darker?: string;
//   }
//   interface ThemeOptions {
//     status: {
//       danger: React.CSSProperties['color'];
//     };
//   }
// }

// declare module '@mui/material/styles/createPalette' {
//   interface Palette {
//     neutral: Palette['primary'];
//   }
//   interface PaletteOptions {
//     neutral: PaletteOptions['primary'];
//   }
// }

export function timestampToString(stamp:number){
  return new Date(stamp).toLocaleTimeString()
}
