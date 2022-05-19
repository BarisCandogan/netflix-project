import axios from './axios'
import React, { useEffect, useState } from 'react'
import './row.css'

function Row({ title, fetchUrl, largeRow = false }) {
  const [movies, setMovies] = useState([])
  const base_url = 'https://image.tmdb.org/t/p/original/'

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }

    fetchData()
  }, [fetchUrl])

  console.log(movies)

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className='row_posters'>
        {movies.map((movie) => {
          return (
            ((largeRow && movie.poster_path) ||
              (!largeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${largeRow && 'row__posterLarge'}`}
                key={movie.id}
                src={`${base_url}${
                  largeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
          )
        })}
      </div>
    </div>
  )
}

export default Row
