import React, { useEffect, useMemo, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import { searchCities, getWeather } from './lib/api.js'

export default function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(null)
  const [current, setCurrent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [unit, setUnit] = useState('c') // 'c' | 'f'

  // Search cities on submit only (simpler + API friendly)
  const onSearch = async (e) => {
    e?.preventDefault?.()
    const q = query.trim()
    if (!q) return
    setError('')
    setResults([])
    setSelected(null)
    setCurrent(null)
    setLoading(true)
    try {
      const cities = await searchCities(q)
      setResults(cities)
      if (cities.length === 0) setError('No matches found. Try a different city name.')
    } catch (err) {
      console.error(err)
      setError('Could not search for that city. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchWeather = async (place) => {
    setLoading(true)
    setError('')
    setCurrent(null)
    try {
      const w = await getWeather(place.latitude, place.longitude, unit)
      setCurrent({ place, ...w })
    } catch (err) {
      console.error(err)
      setError('Failed to load weather. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Refetch weather when unit changes for the selected place
  useEffect(() => {
    if (selected) {
      fetchWeather(selected)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white text-slate-900">
      <header className="max-w-3xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">🌤️ Weather Now</h1>
        <p className="text-slate-600">Fast current weather for any city — powered by Open‑Meteo.</p>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-24">
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={onSearch}
          loading={loading}
        />

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        {/* City results */}
        {results.length > 0 && (
          <div className="mt-4 grid gap-2">
            <p className="text-sm text-slate-600">Select a location:</p>
            <ul className="grid gap-2">
              {results.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => { setSelected(r); fetchWeather(r); }}
                    className="w-full text-left p-3 rounded-xl border bg-white hover:shadow-glow transition focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <div className="font-medium">
                      {r.name}
                      {r.admin1 ? `, ${r.admin1}` : ''}
                    </div>
                    <div className="text-sm text-slate-600">{r.country} • {r.latitude.toFixed(2)}, {r.longitude.toFixed(2)}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weather */}
        <div className="mt-6">
          {current && (
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-slate-600">
                Showing weather for <span className="font-medium text-slate-800">
                  {current.place.name}{current.place.admin1 ? `, ${current.place.admin1}` : ''}, {current.place.country}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1">
                <button
                  onClick={() => setUnit('c')}
                  className={"px-3 py-1 text-sm rounded-full " + (unit === 'c' ? 'bg-white shadow border' : '')}
                  aria-pressed={unit === 'c'}
                >
                  °C
                </button>
                <button
                  onClick={() => setUnit('f')}
                  className={"px-3 py-1 text-sm rounded-full " + (unit === 'f' ? 'bg-white shadow border' : '')}
                  aria-pressed={unit === 'f'}
                >
                  °F
                </button>
              </div>
            </div>
          )}

          <WeatherCard data={current} loading={loading} />
        </div>

        {/* Helpful empty state */}
        {!current && !loading && !error && (
          <div className="mt-10 p-6 rounded-2xl border bg-white text-center text-slate-600">
            Try searching for a city like <span className="font-medium">Mumbai</span>, <span className="font-medium">Dublin</span>, or <span className="font-medium">New York</span>.
          </div>
        )}
      </main>

      <footer className="max-w-3xl mx-auto px-4 pb-8 text-xs text-slate-500">
        <p>Data from Open‑Meteo. No API key required.</p>
      </footer>
    </div>
  )
}