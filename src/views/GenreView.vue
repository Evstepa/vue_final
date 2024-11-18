<template>
  <main class="main">
    <div class="container genre__container">
      <h2 class="title genre__title">Жанры фильмов</h2>

      <div class="genres__list">
          <genre-card 
            v-for="(genre, index) in genres" 
            :key="genre.id" 
            :genre="genre" 
            :index="index"
          />
      </div>

    </div>

  </main>
</template>

<script setup lang="ts">
  import GenreCard from '@/components/GenreCard.vue'
  import { ref } from 'vue';
  import { getGenres, getFilmByGenre } from '@/api/films';
  import type { IGenre } from '@/types/genre';

  const genres = ref<IGenre[] | undefined>([]);
  const loadGenres = async (): Promise<void> => {
    const response = await getGenres();
    genres.value = response; 
    genres.value?.forEach(async function(genre) {
      const genreFilmExample = await getFilmByGenre(genre.title);
      genre.posterUrl = genreFilmExample[0].posterUrl;
    });
  }
  loadGenres();

</script>

<style>
  .genre__container {
    padding-top: 64px;
    padding-bottom: 64px;
  }

  .genre__title {
    margin-bottom: 64px;
  }
  
  .genres__list {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--column-gap);
    row-gap: var(--row-gap);
    justify-content: space-between;
  }

  @media (max-width: 1290px) {
    .genres__list {
      justify-content: center;
    }
  }

</style>
