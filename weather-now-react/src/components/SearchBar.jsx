import React from 'react'

export default function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <form onSubmit={onSearch} className="mt-2 flex gap-2">
      <label htmlFor="city" className="sr-only">City name</label>
      <input
        id="city"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city (e.g., Mumbai)"
        className="flex-1 p-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-3 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Searching…' : 'Search'}
      </button>
    </form>
  )
}