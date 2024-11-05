import React, { useState, useEffect } from 'react'
import { Box, Button, TextField, List, ListItem, ListItemText } from '@mui/material'
import { searchMovies, Movie } from '../api/omdb'

interface MovieSearchInputProps {
    onSearch: (query: string) => void,
    movies: Movie[]
}

const MovieSearchInput = ({ onSearch }: MovieSearchInputProps) => {
    const [query, setQuery] = useState('')
    const [matchedMovies, setMatchedMovies] = useState<Movie[]>([])
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        const fetchMatchedMovies = async () => {
            if (query.trim() === '') return
            const results = await searchMovies(query)
            setMatchedMovies(results)
        }
        fetchMatchedMovies()
    }, [query])

    const handleSearch = (movieTitle: string) => {
        onSearch(movieTitle)
        setQuery(movieTitle)
        setIsSearching(true)
    }

    return (
        <form>
            <Box display="flex" alignItems="stretch">
                <TextField
                    variant="outlined"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsSearching(false);
                    }}
                    placeholder="Search for movies..."
                    fullWidth
                    size="medium"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            height: '100%',
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                        marginLeft: '1rem',
                        height: '56px',
                        minWidth: '100px',
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        onSearch(query);
                        setIsSearching(true);
                    }}
                >
                    Search
                </Button>
            </Box>
            {!isSearching && matchedMovies.length > 0 && (
                <List sx={{ maxHeight: '200px', overflowY: 'auto', padding: 0 }}>
                    {matchedMovies.map((movie) => (
                        <ListItem
                            key={movie.imdbID}
                            component="div"
                            onClick={() => handleSearch(movie.Title)}
                        >
                            <ListItemText primary={movie.Title} />
                        </ListItem>
                    ))}
                </List>
            )}
        </form>
    )
}

export default MovieSearchInput