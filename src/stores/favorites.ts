import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFavorites, addFavorites, deleteFavorites } from '@/api/favorites'
import type { IFilm } from '@/types/film';
import { useUserStore } from '@/stores/user';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<IFilm[]>([]);

  async function loadFavorites() {
    const responce = await getFavorites();
    favorites.value = responce;
  };
  
  const userStore = useUserStore();
  if (userStore.user.favorites.length > 0) {
    loadFavorites();
  }

  function isFilmInFavorite(film: IFilm): boolean {
    const found = favorites.value.find((item) => {
      return item.id === film.id;
    });
    return found !== undefined;
  }

  async function addFilmToFavorites(film: IFilm) {
    if (!isFilmInFavorite(film)) {
      const responce = await addFavorites(film);
      if (responce) {
        // favorites.value.push(film);
        await loadFavorites();
      }
    }
  }

  async function removeFilmFromFavorites(film: IFilm) {
    if (isFilmInFavorite(film)) {
      const responce = await deleteFavorites(film);
      if (responce) {
        // const index = favorites.value.indexOf(film);
        // favorites.value.splice(index, 1);
        await loadFavorites();
      }
    }
  }

  return { 
    favorites, 
    isFilmInFavorite, 
    loadFavorites,
    addFilmToFavorites, 
    removeFilmFromFavorites,
  }
})
