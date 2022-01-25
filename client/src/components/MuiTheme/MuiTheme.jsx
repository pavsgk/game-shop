import {amber, grey} from '@mui/material/colors';
import {ThemeProvider, createTheme} from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: amber[500],
    },
    secondary: {
      main: grey[900],
    },
  },
});

function MuiTheme(props) {
  return <ThemeProvider theme={customTheme}>{props.children}</ThemeProvider>;
}

export default MuiTheme;
