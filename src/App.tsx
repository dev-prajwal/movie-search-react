import React, { useState } from 'react'
import { Container, Typography, Box } from '@mui/material'
import MovieSearchInput from './components/MovieSearchInput'
import MovieList from './components/MovieList'
import { searchMovies, Movie } from './api/omdb'

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([])

  const handleSearch = async (query: string) => {
    const results = await searchMovies(query)
    setMovies(results)
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Movie Search App
        </Typography>
        <MovieSearchInput onSearch={handleSearch} movies={movies} />
        <Box my={4}>
          <MovieList movies={movies} />
        </Box>
      </Box>
    </Container>
  )
}

export default App