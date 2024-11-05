import axios from "axios";

const API_KEY = '#####';
const API_URL = 'http://www.omdbapi.com/';

export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export async function searchMovies(query: string): Promise<Movie[]> {
    try {
        const response = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${query}`);
        return response.data.Search || [];
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}