import React from 'react'
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'
import { Movie } from '../api/omdb'

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Image'}
        alt={movie.Title}
        sx={{
          height: 400,
          objectFit: 'cover',
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography gutterBottom variant="h6" component="div">
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Year: {movie.Year}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Type: {movie.Type}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MovieCard