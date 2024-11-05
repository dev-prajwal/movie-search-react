import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MovieSearchInput from './MovieSearchInput';
import { searchMovies } from '../api/omdb';

jest.mock('../api/omdb');

describe('MovieSearchInput', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search input and button', () => {
    render(<MovieSearchInput onSearch={mockOnSearch} movies={[]} />);

    const input = screen.getByPlaceholderText(/search for movies/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('calls the search function when the button is clicked', () => {
    render(<MovieSearchInput onSearch={mockOnSearch} movies={[]} />);

    const input = screen.getByPlaceholderText(/search for movies/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('displays matched movies in a dropdown list', async () => {
    const mockMovies = [
      { Title: 'Test Movie', Year: '2021', imdbID: '1', Type: 'movie', Poster: 'test.jpg' },
    ];

    (searchMovies as jest.Mock).mockResolvedValue(mockMovies);

    render(<MovieSearchInput onSearch={mockOnSearch} movies={[]} />);

    const input = screen.getByPlaceholderText(/search for movies/i);
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => expect(screen.getByText('Test Movie')).toBeInTheDocument());
  });

  it('calls the search function when a list item is clicked', async () => {
    const mockMovies = [
      { Title: 'Test Movie', Year: '2021', imdbID: '1', Type: 'movie', Poster: 'test.jpg' },
    ];

    (searchMovies as jest.Mock).mockResolvedValue(mockMovies);

    render(<MovieSearchInput onSearch={mockOnSearch} movies={[]} />);

    const input = screen.getByPlaceholderText(/search for movies/i);
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      const listItem = screen.getByText('Test Movie');
      fireEvent.click(listItem);
    });

    expect(mockOnSearch).toHaveBeenCalledWith('Test Movie');
  });
});