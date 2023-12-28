import { ThemeProvider } from 'styled-components';
import WheelStructure from './Components/WheelStructure';
import theme from './Theme';
import GlobalStyles from './Components/Styles/Global';
import Spinner from './Components/Spinner';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Spinner />
      <GlobalStyles />
      <WheelStructure />
    </ThemeProvider>
  );
}

export default App;
