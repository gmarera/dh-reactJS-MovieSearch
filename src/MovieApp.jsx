import { useState } from 'react'
import './MovieApp.css'

export const MovieApp = () => {

    const [search, setSearch] = useState('')
    const [movieList, setMovieList] = useState([])

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const apiKey = 'API_KEY' // Replace with your actual API key
    const lang = 'es-ES'

    const handleInputChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (search.trim() === '') return
        fetchMovies(search)
    }

    const fetchMovies = async (query) => {
        try {
            const response = await fetch(`${urlBase}?api_key=${apiKey}&language=${lang}&query=${query}`)
            const data = await response.json()
            setMovieList(data.results)
        }
        catch (error) {
            console.error('Ha occurido el siguiente error:', error)
        }
    }

    const clearButton = () => {
        setSearch('')
        setMovieList([])
    }

    return (
        <div className='container'>
            <h1>Buscador de Películas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Buscar una película'
                    value={search}
                    onChange={handleInputChange}
                />
                <button>Buscar</button>
                <button type='button' onClick={() => clearButton()}>Limpiar</button>
            </form>
            {movieList && 
                <div className='movie-list'>
                    {movieList.map((movie) => {
                        return (
                            <div key={movie.id} className='movie-card'>
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                <h2>{movie.title}</h2>
                                <p>{movie.overview}</p>
                            </div>
                        )
                    })}
                </div>
            }

        </div>
    )
}
