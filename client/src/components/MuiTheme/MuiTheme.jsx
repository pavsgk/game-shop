import {ThemeProvider, createTheme} from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1e1e1e',
      light: '#454545',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffc500',
      light: '#fff84f',
      dark: '#c79500',
      contrastText: '#000000',
      multilineColor: '#ffffff',
    },
  },
});

// const customTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#1e1e1e',
//       light: '#454545',
//       dark: '#000000',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       main: '#ffc500',
//       light: '#fff84f',
//       dark: '#c79500',
//       contrastText: '#000000',
//     },
//   },
// });

function MuiTheme(props) {
  return <ThemeProvider theme={customTheme}>{props.children}</ThemeProvider>;
}

export default MuiTheme;
