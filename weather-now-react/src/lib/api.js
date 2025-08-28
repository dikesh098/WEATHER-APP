const GEOCODE_BASE = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_BASE = 'https://api.open-meteo.com/v1/forecast'

export async function searchCities(name) {
  const url = `${GEOCODE_BASE}?name=${encodeURIComponent(name)}&count=5&language=en&format=json`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Geocoding failed')
  const data = await res.json()
  return (data.results || []).map((r) => ({
    id: `${r.id}`,
    name: r.name,
    country: r.country,
    admin1: r.admin1 || '',
    latitude: r.latitude,
    longitude: r.longitude,
  }))
}

export async function getWeather(lat, lon, unit = 'c') {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
    ].join(','),
    timezone: 'auto',
    temperature_unit: unit === 'f' ? 'fahrenheit' : 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
  })
  const url = `${WEATHER_BASE}?${params.toString()}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Weather fetch failed')
  const data = await res.json()
  return data
}