import type { IFilm } from "@/types/film";
import type { IGenre } from "@/types/genre";

const URL = 'https://cinemaguide.skillbox.cc';

const getFilms = async (): Promise<IFilm[]> => {
  const currentUrl = URL + '/movie/top10';
  try {
    const fetchResponse = await fetch(currentUrl);
    const films: IFilm[] = await fetchResponse.json();

    return films;
  } catch (error) {
    throw new Error('Films request failed...')
  }
};

const getRandomFilm = async (): Promise<IFilm> => {
  const currentUrl = URL + '/movie/random';
  try {
    const fetchResponse = await fetch(currentUrl);
    const film: IFilm = await fetchResponse.json();

    return film;
  } catch (error) {
    throw new Error('Randon film request failed...')
  }
};

const getGenres = async (): Promise<IGenre[]> => {
  const currentUrl = URL + '/movie/genres';
  try {
    const fetchResponse = await fetch(currentUrl);
    const genresNames: Array<string> = await fetchResponse.json();

    const genres: IGenre[] = [];
    genresNames.forEach(function(name, index) {
      genres.push({
        id: index,
        title: name,
        posterUrl: '',
      })
    });

    return genres;
  } catch (error) {
    throw new Error('Genres request failed...')
  }
};

const getFilmById = async(id: number): Promise<IFilm> => {
  const currentUrl = URL + `/movie/${id}`;
  try {
    const fetchResponse = await fetch(currentUrl);
    const film: IFilm = await fetchResponse.json();

    return film;
  } catch (error) {
    throw new Error('Film request failed...')
  }
}

const getFilmByGenre = async(
  genre: string, 
  count: number = 1,
  page: number = 1,
): Promise<IFilm[]> => {
  const currentUrl = URL + `/movie?count=${count}&page=${page}&genre=${genre}`;
  try {
    const fetchResponse = await fetch(currentUrl);
    const films: IFilm[] = await fetchResponse.json();

    return films;
  } catch (error) {
    throw new Error('Film by genre request failed...')
  }
}

const getFilmByName = async(name: string): Promise<IFilm[]> => {
  const currentUrl = URL + `/movie?title=${name}`;
  try {
    const fetchResponse = await fetch(currentUrl);
    const films: IFilm[] = await fetchResponse.json();

    return films;
  } catch (error) {
    throw new Error('Film by name request failed...')
  }
}

export { 
  getFilms, 
  getRandomFilm, 
  getGenres, 
  getFilmById, 
  getFilmByGenre, 
  getFilmByName 
}