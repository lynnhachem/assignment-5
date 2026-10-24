# Weather Dashboard (React)

The Weather Dashboard from the previous lab, rebuilt as a Vite + React app. Weather data comes from the free [Open-Meteo](https://open-meteo.com/) APIs (no API key needed).

## Install and run

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

## Structure

```
src/
  main.jsx                  entry point
  App.jsx                   owns the state and the fetching effect
  weatherApi.js             geocoding + forecast requests, weather-code table
  index.css                 styles
  components/
    Sky.jsx                 animated clouds background
    SearchBar.jsx           search form (holds the input text)
    LoadingSpinner.jsx      loading state
    ErrorMessage.jsx        error state
    WeatherCard.jsx         success state
    WeatherDetails.jsx      feels like / humidity / wind / pressure
```

## How it meets the requirements

- **useState**: `App` keeps `city`, `weather`, `loading` and `error`; `SearchBar` keeps its own `query` since nothing else needs the text while typing.
- **useEffect**: `App` fetches weather whenever `city` changes (dependency array `[city]`). The cleanup aborts the previous request so an outdated response never replaces a newer one.
- **Props**: `App → SearchBar` (`onSearch`, `disabled`), `App → ErrorMessage` (`message`), `App → WeatherCard` (`weather`), `WeatherCard → WeatherDetails`.
- **Conditional rendering**: the loading spinner, error message and weather card are each shown only in their own state.
- **State drilling**: state is never passed more than two levels deep (`App → WeatherCard → WeatherDetails`), so no context or extra state library is needed.
