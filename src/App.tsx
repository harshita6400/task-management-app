import './App.css';
import { LandingPage } from './container';
import { ThemeProvider, createTheme } from '@mui/material';



const theme = createTheme({
  palette: {
    primary: {
      main: '#040404b5',
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </>
  );
}

export default App;
