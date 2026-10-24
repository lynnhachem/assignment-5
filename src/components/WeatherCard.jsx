import WeatherDetails from "./WeatherDetails.jsx";

export default function WeatherCard({ weather }) {
  const updated = new Date(weather.time).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <section className="card">
      <h2>{weather.name}</h2>
      <p className="muted">Updated {updated}</p>
      <div className="current">
        <span className="icon" aria-hidden="true">{weather.icon}</span>
        <div>
          <p className="temp">{Math.round(weather.temperature)}°C</p>
          <p className="conditions">{weather.description}</p>
        </div>
      </div>
      <WeatherDetails
        feelsLike={weather.feelsLike}
        humidity={weather.humidity}
        wind={weather.wind}
        pressure={weather.pressure}
      />
    </section>
  );
}
