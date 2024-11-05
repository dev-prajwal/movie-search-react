import React from 'react'
import { Grid, Box } from '@mui/material'
import MovieCard from './MovieCard'
import { Movie } from '../api/omdb'

interface MovieListProps {
    movies: Movie[]
}

const MovieList = ({ movies }: MovieListProps) => {
    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2}>
                {movies.map((movie) => (
                    <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MovieList