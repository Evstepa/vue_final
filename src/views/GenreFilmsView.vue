<template>
  <main class="main">
    <div v-if="route.query.genre" class="container genre__container">
      <h2 class="title genre__title">
        <RouterLink :to="{ name: 'genre'}" 
          class="">
          &lt;&nbsp;{{ getUpLetter(String(route.query.genre)) }}
        </RouterLink>
      </h2>
      
      <div class="film-list flex">
        <film-card 
          v-for="(film, index) in films" 
          :key="film.id" 
          :film="film" 
          :index="index"
        />
      </div>

      <div v-if="films.length > 0" class="btn-block">
        <button class="btn-reset btn-more" @click="loadMoreFilms">
          Показать ещё
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import FilmCard from '@/components/FilmCard.vue';
  import { ref } from 'vue';
  import { getFilmByGenre } from '@/api/films';
  import { RouterLink, useRoute } from 'vue-router';
  import type { IFilm } from '@/types/film';

  const route = useRoute();

  const films = ref<IFilm[]>([]);
  const loadFilms = async (page: number = 1): Promise<void> => {
    if (route.query.genre !== undefined) {
      const response = await getFilmByGenre(String(route.query.genre), 10, page);
      const tempArray = response.sort(
        (a: IFilm, b: IFilm) => (b.tmdbRating - a.tmdbRating)
      );
      tempArray.forEach((item: IFilm) => {
        films.value.push(item);
      }); 
    }
  }
  loadFilms();

  function getUpLetter(word: string): string {
    return word[0].toUpperCase() + word.substring(1);
  }

  let page = 1;
  function loadMoreFilms() {
    page++;
    loadFilms(page);
  }

</script>

<style scoped>
  .film-list {
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    column-gap: var(--column-gap);
    row-gap: var(--row-gap);
    margin-bottom: 64px;
    width: 100%;
  }

  .btn-block {
    display: flex;
    justify-content: center;
  }

  .btn-more {
    margin: 0;
    padding: 16px 48px;
    border-radius: 28px;
    background-color: var(--color-brand-active);
    transition: background-color 0.5s ease-in-out;
    -webkit-transition: background-color 0.5s ease-in-out;
    -moz-transition: background-color 0.5s ease-in-out;
    -ms-transition: background-color 0.5s ease-in-out;
    -o-transition: background-color 0.5s ease-in-out;
  }

  .btn-more:hover,
  .btn-more:focus-visible {
    background-color: var(--color-brand-hover);
  }
  
  .btn-more:active{
    background-color: var(--color-brand-active);
  }

  @media (max-width: 1300px) {
    .film-list {
      justify-content: center;
    }
  }

  @media (max-width: 1024px) {
    .film-list {
      justify-content: center;
    }

    .card {
      width: 335px;
      height: 502px;
    }
  }
</style>
