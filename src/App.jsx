import { useEffect, useState } from "react";
import Sky from "./components/Sky.jsx";
import SearchBar from "./components/SearchBar.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import { fetchWeather } from "./weatherApi.js";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch whenever a new city is submitted. The cleanup aborts the previous
  // request so a slow, outdated response can never overwrite a newer one.
  useEffect(() => {
    if (!city) return;
    const controller = new AbortController();

    setLoading(true);
    setError("");
    setWeather(null);

    fetchWeather(city, controller.signal)
      .then((data) => setWeather(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [city]);

  function handleSearch(name) {
    if (!name) {
      setWeather(null);
      setError("Please enter a city name.");
      return;
    }
    setCity(name);
  }

  return (
    <>
      <Sky />
      <main className="app">
        <h1>Weather Dashboard</h1>
        <SearchBar onSearch={handleSearch} disabled={loading} />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {weather && <WeatherCard weather={weather} />}
      </main>
    </>
  );
}
