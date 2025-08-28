const MAP = {
  0: { d: 'Clear sky', n: 'Clear night', e: '☀️', en: '🌙' },
  1: { d: 'Mainly clear', n: 'Mainly clear', e: '🌤️', en: '🌤️' },
  2: { d: 'Partly cloudy', n: 'Partly cloudy', e: '⛅', en: '⛅' },
  3: { d: 'Overcast', n: 'Overcast', e: '☁️', en: '☁️' },
  45: { d: 'Fog', n: 'Fog', e: '🌫️', en: '🌫️' },
  48: { d: 'Depositing rime fog', n: 'Depositing rime fog', e: '🌫️', en: '🌫️' },
  51: { d: 'Light drizzle', n: 'Light drizzle', e: '🌦️', en: '🌦️' },
  53: { d: 'Moderate drizzle', n: 'Moderate drizzle', e: '🌦️', en: '🌦️' },
  55: { d: 'Dense drizzle', n: 'Dense drizzle', e: '🌧️', en: '🌧️' },
  56: { d: 'Light freezing drizzle', n: 'Light freezing drizzle', e: '🌧️', en: '🌧️' },
  57: { d: 'Dense freezing drizzle', n: 'Dense freezing drizzle', e: '🌧️', en: '🌧️' },
  61: { d: 'Slight rain', n: 'Slight rain', e: '🌧️', en: '🌧️' },
  63: { d: 'Moderate rain', n: 'Moderate rain', e: '🌧️', en: '🌧️' },
  65: { d: 'Heavy rain', n: 'Heavy rain', e: '🌧️', en: '🌧️' },
  66: { d: 'Light freezing rain', n: 'Light freezing rain', e: '🌧️', en: '🌧️' },
  67: { d: 'Heavy freezing rain', n: 'Heavy freezing rain', e: '🌧️', en: '🌧️' },
  71: { d: 'Slight snowfall', n: 'Slight snowfall', e: '🌨️', en: '🌨️' },
  73: { d: 'Moderate snowfall', n: 'Moderate snowfall', e: '🌨️', en: '🌨️' },
  75: { d: 'Heavy snowfall', n: 'Heavy snowfall', e: '❄️', en: '❄️' },
  77: { d: 'Snow grains', n: 'Snow grains', e: '🌨️', en: '🌨️' },
  80: { d: 'Slight rain showers', n: 'Slight rain showers', e: '🌦️', en: '🌦️' },
  81: { d: 'Moderate rain showers', n: 'Moderate rain showers', e: '🌦️', en: '🌦️' },
  82: { d: 'Violent rain showers', n: 'Violent rain showers', e: '🌧️', en: '🌧️' },
  85: { d: 'Slight snow showers', n: 'Slight snow showers', e: '🌨️', en: '🌨️' },
  86: { d: 'Heavy snow showers', n: 'Heavy snow showers', e: '❄️', en: '❄️' },
  95: { d: 'Thunderstorm', n: 'Thunderstorm', e: '⛈️', en: '⛈️' },
  96: { d: 'Thunderstorm with hail', n: 'Thunderstorm with hail', e: '⛈️', en: '⛈️' },
  99: { d: 'Thunderstorm with hail', n: 'Thunderstorm with hail', e: '⛈️', en: '⛈️' },
}

export function codeToDescription(code, isDay = 1) {
  const entry = MAP[code] || { d: 'Unknown', n: 'Unknown', e: '❔', en: '❔' }
  const label = isDay ? entry.d : entry.n
  const emoji = isDay ? entry.e : entry.en
  return { label, emoji }
}