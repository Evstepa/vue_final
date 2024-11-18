<template>
  <div class="search__card flex" 
      :class="{'search__card-mobile': mobile}"
  >
    <button 
      class="btn-reset search__card-link"
      @click="goToSearchTarget"
    >
    </button>
    <img v-if="film !== undefined && film.posterUrl !== null" 
        :src="film.posterUrl" 
        :srcset="film.posterUrl" 
        :alt="film.title"
        class="search__card-img"
    >
    <img v-else 
      src="../../public/img/plug_square.jpg" 
      :alt="film?.title"
      class="search__card-img"
    >
    <div class="search__card-block flex">
      <div class="search__card-info flex">
        <film-header-rating 
            :currentFilm="film"
        >
        </film-header-rating>
      </div>
      <h5 class="title search__card-title">
        {{ truncateLine(film?.title) }}
      </h5>      
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
    },
    mobile: {
      type: Boolean,
    }
  });

  const $emit = defineEmits([
    'closeSearch',
  ]);

  import FilmHeaderRating from './FilmHeaderRating.vue';
  import router from '@/router';

  function truncateLine(line: string): string {
    return line.length > 40 ? line.substring(0, 60) + '...' : line;
  }

  const goToSearchTarget = function() {
    $emit('closeSearch');
    router.push({ name: 'movie', params: { id: props.film?.id } });
  }

</script>

<style>
  .search__card {
    position: relative;
    column-gap: 16px;
    margin: 0;
    padding: 20px 8px;
    width: 100%;
    height: 92px;
    border-radius: 16px;
    outline: none;
    color: var(--color-text);
    transition: outline 0.5s ease-in-out;
  }
  
  .search__card:focus,
  .search__card:hover {
    outline: 1px solid var(--color-content-disabled);
  }

  .search__card-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .search__card-img {
    width: 40px;
    height: 52px;
    object-fit: cover;
    object-position: center;
    stroke-width: 1px;
    stroke-opacity: 0.25;
    stroke: black;
  }

  .search__card-block {
    flex-direction: column;
    row-gap: 8px;
  }

  .search__card-info {
    column-gap: 12px;
    width: -webkit-fill-available;
    font-size: 14px;
  }

  .search__card-info .list__item-rating span{
    font-size: 12px;
    line-height: 16px;
  }

  .search__card-title {
    margin: 0;
    margin-top: 8px;
    padding: 0;
    font-size: 18px;
    line-height: 24px;
  }

  .search__card-mobile {
    flex-direction: column;
    padding: 0;
    max-width: 220px;
    width: 100%;
    height: auto;
    border-radius: 0;
  }
  
  .search__card-mobile>.search__card-img {
    margin-bottom: 16px;
    width: 158px;
    height: 206px;
  }

  .search__card-mobile>.search__card-info {
    flex-wrap: wrap;
    row-gap: 12px;
  }

</style>
