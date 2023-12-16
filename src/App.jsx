import "./App.css";
import { LocaitonProvider } from "./context/LocationContext";
import { WeatherProvider } from "./context/WeatherContext";
import Container from "./components/Container";
function App() {
  return (
    <>
      <LocaitonProvider>
        <WeatherProvider>
          <Container />
        </WeatherProvider>
      </LocaitonProvider>
    </>
  );
}

export default App;
