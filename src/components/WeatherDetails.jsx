export default function WeatherDetails({ feelsLike, humidity, wind, pressure }) {
  const rows = [
    ["Feels like", `${Math.round(feelsLike)}°C`],
    ["Humidity", `${Math.round(humidity)}%`],
    ["Wind", `${Math.round(wind)} km/h`],
    ["Pressure", `${Math.round(pressure)} hPa`],
  ];

  return (
    <dl className="details">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
