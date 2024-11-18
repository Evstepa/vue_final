import type { IFilm } from "@/types/film";

const URL = 'https://cinemaguide.skillbox.cc';

const getFavorites = async (): Promise<IFilm[]> => {
  const currentUrl = URL + '/favorites';
  try {
    const fetchResponse = await fetch(currentUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
      credentials: 'include',
    });
    const response: IFilm[] = await fetchResponse.json();

    return response;
  } catch (error) {
    throw new Error('Get favorites request failed...')
  }
};

const addFavorites = async (film: IFilm): Promise<Boolean> => {
  const currentUrl = URL + '/favorites';
  try {
    const fetchResponse = await fetch(currentUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      body: new URLSearchParams({
        'id': String(film.id) 
      }),
    });
    return fetchResponse.status === 200;
    // const response = await fetchResponse.json();
    // if ('result' in response) {
    //   return response.result;      
    // } else {
    //   return false;
    // }
  } catch (error) {
    throw new Error('Add favorites user request failed...')
  }
};

const deleteFavorites = async (film: IFilm): Promise<Boolean> => {
  const currentUrl = URL + `/favorites/${film.id}`;
  try {
    const fetchResponse = await fetch(currentUrl, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
      },      
      credentials: 'include',
    });
    return fetchResponse.status === 200;
    // const response = await fetchResponse.json();
    // if ('result' in response) {
    //   return response.result;      
    // } else {
    //   return false;
    // }
  } catch (error) {
    throw new Error('Delete favorites request failed...')
  }
};

export { 
  getFavorites,
  addFavorites,
  deleteFavorites
}