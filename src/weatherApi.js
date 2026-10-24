const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

// weather code -> [description, day icon, night icon]
const WMO = {
  0: ["Clear sky", "☀️", "🌙"], 1: ["Mainly clear", "🌤️", "🌙"], 2: ["Partly cloudy", "⛅", "☁️"],
  3: ["Overcast", "☁️", "☁️"], 45: ["Fog", "🌫️", "🌫️"], 48: ["Rime fog", "🌫️", "🌫️"],
  51: ["Light drizzle", "🌦️", "🌦️"], 53: ["Drizzle", "🌦️", "🌦️"], 55: ["Dense drizzle", "🌧️", "🌧️"],
  56: ["Freezing drizzle", "🌧️", "🌧️"], 57: ["Freezing drizzle", "🌧️", "🌧️"],
  61: ["Light rain", "🌦️", "🌧️"], 63: ["Rain", "🌧️", "🌧️"], 65: ["Heavy rain", "🌧️", "🌧️"],
  66: ["Freezing rain", "🌧️", "🌧️"], 67: ["Freezing rain", "🌧️", "🌧️"],
  71: ["Light snow", "🌨️", "🌨️"], 73: ["Snow", "❄️", "❄️"], 75: ["Heavy snow", "❄️", "❄️"],
  77: ["Snow grains", "❄️", "❄️"], 80: ["Rain showers", "🌦️", "🌧️"], 81: ["Rain showers", "🌧️", "🌧️"],
  82: ["Violent rain showers", "⛈️", "⛈️"], 85: ["Snow showers", "🌨️", "🌨️"], 86: ["Snow showers", "🌨️", "🌨️"],
  95: ["Thunderstorm", "⛈️", "⛈️"], 96: ["Thunderstorm with hail", "⛈️", "⛈️"], 99: ["Thunderstorm with hail", "⛈️", "⛈️"],
};

async function getJson(url, signal) {
  let response;
  try {
    response = await fetch(url, { signal });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new Error("Network error. Check your internet connection and try again.");
  }
  if (!response.ok) {
    if (response.status === 404) throw new Error("City not found. Check the spelling and try again.");
    if (response.status === 429) throw new Error("Too many requests. Please wait a minute and try again.");
    if (response.status >= 500) throw new Error("The weather service is having problems. Try again later.");
    throw new Error(`Request failed (HTTP ${response.status}).`);
  }
  try {
    return await response.json();
  } catch {
    throw new Error("Received an unreadable response from the weather service.");
  }
}

export async function fetchWeather(city, signal) {
  const geo = await getJson(
    `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
    signal
  );
  if (!geo.results || geo.results.length === 0) {
    throw new Error(`No city found matching "${city}". Check the spelling and try again.`);
  }
  const place = geo.results[0];

  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    timezone: "auto",
    wind_speed_unit: "kmh",
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,pressure_msl,is_day",
  });
  const data = await getJson(`${FORECAST_URL}?${params}`, signal);
  if (!data.current) throw new Error("Weather data was missing from the response.");

  const c = data.current;
  const [description, dayIcon, nightIcon] = WMO[c.weather_code] || ["Unknown conditions", "🌡️", "🌡️"];
  return {
    name: [place.name, place.admin1, place.country].filter(Boolean).join(", "),
    time: c.time,
    temperature: c.temperature_2m,
    feelsLike: c.apparent_temperature,
    humidity: c.relative_humidity_2m,
    wind: c.wind_speed_10m,
    pressure: c.pressure_msl,
    description,
    icon: c.is_day ? dayIcon : nightIcon,
  };
}
