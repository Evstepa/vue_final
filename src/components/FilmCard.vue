<template>
  <div class="card" v-if="film">
    <RouterLink :to="{ name: 'movie', params: { id: film.id } }" class="card__link">
    </RouterLink>
    <div class="card-number" v-if="index !== undefined && route.name === 'home'">
      {{ index + 1 }}
    </div>
    <button 
      v-if="index !== undefined && route.name === 'profile'"
      class="btn-reset card-remove" 
      @click="removeFilmFromFavorites"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.9997 5.5865L11.9495 0.636719L13.3637 2.05093L8.4139 7.0007L13.3637 11.9504L11.9495 13.3646L6.9997 8.4149L2.04996 13.3646L0.635742 11.9504L5.5855 7.0007L0.635742 2.05093L2.04996 0.636719L6.9997 5.5865Z" fill="black" fill-opacity="0.5"/>
      </svg>
    </button>
    <img v-if="film.posterUrl !== null" 
        :src="film.posterUrl" 
        :srcset="film.posterUrl" 
        :alt="film.title"
        class="card-img"
        loading="lazy"
      >
    <div v-else class="card-img not-img">
      {{ film.title }}
    </div>
    
  </div>

</template>


<script setup lang="ts">
  const props = defineProps({
    index: {
      type: Number,
    },
    film: {
      type: Object,
    }
  })

  import { RouterLink, useRoute } from 'vue-router';
  import { useFavoritesStore } from '@/stores/favorites';
  import { useUserStore } from '@/stores/user';
  import type { IFilm } from '@/types/film';

  const route = useRoute();

  const favoritesStore = useFavoritesStore();
  const userStore = useUserStore();

  const removeFilmFromFavorites = async function() {
    await favoritesStore.removeFilmFromFavorites(props.film as IFilm);
    userStore.removeFilmFromFavorites(props.film?.id);
  }
  
</script>

<style>
  .card {
    position: relative;
    width: 224px;
    height: 336px;
    border-radius: 16px;
    box-shadow: 0 0 80px var(--color-shadow);
    outline: 2px solid transparent;
    transition: outline 0.5s ease-in-out;
    -webkit-transition: outline 0.5s ease-in-out;
    -moz-transition: outline 0.5s ease-in-out;
    -ms-transition: outline 0.5s ease-in-out;
    -o-transition: outline 0.5s ease-in-out;
  }
  
  .card__link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 16px;
    stroke-width: 1px;
    stroke-opacity: 0.25;
    stroke: black;
  }

  .not-img {
    background-image: url('../../public/img/plug.jpg');
    margin: 0;
    padding: 30px 0;
    text-align: center;
    color: var(--vt-c-black);
  }

  .card-number {
    position: absolute;
    top: -12px;
    left: -12px;
    padding: 8px 24px;
    border-radius: 50px;
    background-color: var(--vt-c-white); 
    color: var(--color-brand-active);
    font-weight: bold;
    text-align: center;
  }

  .card-remove {
    position: absolute;
    top: -20px;
    right: -20px;
    padding: 8px 14px;
    border-radius: 50px;
    background-color: var(--vt-c-white); 
    color: var(--color-brand-active);
    font-weight: bold;
    text-align: center;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .card:hover, card:focus-visible {
    outline: 2px solid var(--vt-c-white);
  }

  .card:active {
    outline: 2px solid transparent;
  }

  .card:hover .card-remove, card:focus-visible .card-remove {
    opacity: 1;
  }

  @media (max-width: 1024px) {
    .card {
      box-shadow: 0 0 40px var(--color-shadow);
    }
    
  }

</style>
