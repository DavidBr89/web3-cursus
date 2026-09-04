import { useEffect, useState } from 'react';
import type { Movie } from './movies';

type MovieOverviewProps = {
  movies: Movie[];
  searchTerm: string;
};

export const MovieOverview = ({ movies, searchTerm }: MovieOverviewProps) => {
  // TODO: onderzoek waarom deze afgeleide data geen afzonderlijke state en
  // Effect nodig heeft. Herschrijf zonder dubbele bron van waarheid.
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setFilteredMovies(
      movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [movies, searchTerm]);

  // TODO: deze listener wordt bij iedere render toegevoegd en nooit verwijderd.
  // Verplaats de logica naar een correct opgebouwde custom hook.
  window.addEventListener('online', () => {
    console.log('De verbinding is hersteld');
  });

  return (
    <ul>
      {filteredMovies.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
};
