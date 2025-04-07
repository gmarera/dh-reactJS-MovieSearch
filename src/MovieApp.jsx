import { useState } from 'react'
import './MovieApp.css'

export const MovieApp = () => {

    const [search, setSearch] = useState('')
    const [movieList, setMovieList] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const apiKey = 'api_key' // Reemplaza con tu API key de TMDB
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

    const openModal = (movie) => {
        setSelectedMovie(movie)
    }

    const closeModal = () => {
        setSelectedMovie(null)
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
                            <div key={movie.id} className='movie-card' onClick={() => openModal(movie)}>
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                <h2>{movie.title}</h2>
                                <p className='truncate'>{movie.overview}</p>
                                <button className='ver-mas-btn' onClick={() => openModal(movie)}>Ver Más</button>
                            </div>
                        )
                    })}
                </div>
            }

            {selectedMovie && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeModal}>X</button>
                        <img src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`} alt={selectedMovie.title} />
                        <h2>{selectedMovie.title}</h2>
                        <p><strong>Descripción:</strong> {selectedMovie.overview}</p>
                        <p><strong>Fecha de estreno:</strong> {selectedMovie.release_date}</p>
                        <p><strong>Popularidad:</strong> {selectedMovie.popularity}</p>
                        <p><strong>Idioma original:</strong> {selectedMovie.original_language}</p>
                        <p><strong>Voto promedio:</strong> {selectedMovie.vote_average}</p>
                        <p><strong>Total de votos:</strong> {selectedMovie.vote_count}</p>
                    </div>
                </div>
            )}

        </div>
    )
}
