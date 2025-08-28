import React from 'react'
import { codeToDescription } from '../utils/weatherCodes.js'

export default function WeatherCard({ data, loading }) {
  if (loading) {
    return (
      <div className="mt-2 p-6 rounded-2xl border bg-white animate-pulse">
        Loading weather…
      </div>
    )
  }
  if (!data) return null

  const c = data.current
  const details = codeToDescription(c.weather_code, c.is_day)

  const windDir = (deg) => {
    const dirs = ['N','NE','E','SE','S','SW','W','NW']
    const idx = Math.round(deg / 45) % 8
    return dirs[idx]
  }

  return (
    <article className="mt-2 p-6 rounded-2xl border bg-white">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-6xl font-semibold leading-none">{Math.round(c.temperature_2m)}°</div>
          <div className="text-slate-600">Feels like {Math.round(c.apparent_temperature)}°</div>
        </div>
        <div className="text-right">
          <div className="text-2xl">{details.emoji} {details.label}</div>
          <div className="text-sm text-slate-600 mt-1">
            Updated: {new Date(c.time).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
          </div>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-50">
          <dt className="text-xs text-slate-500">Humidity</dt>
          <dd className="text-lg font-medium">{c.relative_humidity_2m}%</dd>
        </div>
        <div className="p-3 rounded-xl bg-slate-50">
          <dt className="text-xs text-slate-500">Wind</dt>
          <dd className="text-lg font-medium">{Math.round(c.wind_speed_10m)} km/h <span className="text-slate-500">({windDir(c.wind_direction_10m)})</span></dd>
        </div>
        <div className="p-3 rounded-xl bg-slate-50">
          <dt className="text-xs text-slate-500">Precipitation</dt>
          <dd className="text-lg font-medium">{c.precipitation ?? 0} mm</dd>
        </div>
        <div className="p-3 rounded-xl bg-slate-50">
          <dt className="text-xs text-slate-500">Daylight</dt>
          <dd className="text-lg font-medium">{c.is_day ? 'Day' : 'Night'}</dd>
        </div>
      </dl>
    </article>
  )
}