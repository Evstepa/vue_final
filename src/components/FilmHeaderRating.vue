<template>
    <ul class="list-reset list head__list" v-if="currentFilm">
      <li class="list__item list__item-rating"
        :class="ratingColor"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.00105 12.1733L3.29875 14.8054L4.34897 9.51991L0.392578 5.86118L5.74394 5.22669L8.00105 0.333313L10.2581 5.22669L15.6095 5.86118L11.6531 9.51991L12.7033 14.8054L8.00105 12.1733Z" fill="white"/>
        </svg>
        <span v-if="currentFilm.tmdbRating !== null">
          &nbsp;{{ Number(currentFilm.tmdbRating).toFixed(1) }}
        </span>
      </li>
      <li class="list__item">
        {{ currentFilm.releaseYear }}
      </li>
      <li class="list__item list__item-width">
        {{ currentFilm.genres.join(', ') }}
      </li>
      <li class="list__item">
        {{ formatTime(currentFilm.runtime) }}            
      </li>
    </ul>
  
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  const props = defineProps({
    currentFilm: {
      type: Object,
    }
  });

  const ratingColor = computed(() => {
    let value = 'rating-color-1';
    if (Number(props.currentFilm?.tmdbRating) < 6.3) {
      value = 'rating-color-4'
    } 
    else if (Number(props.currentFilm?.tmdbRating) < 7.5) {
      value = 'rating-color-3'
    } 
    else if (Number(props.currentFilm?.tmdbRating) < 8.6) {
      value = 'rating-color-2'
    }
    return value;
  });

  function formatTime(minutes: number): string {
    const minute = minutes % 60;
    const hour = (minutes - minute) / 60;

    return `${hour} ч ${minute} мин`;
  }

</script>

<style scoped> 
  .head__list {
    display: flex;
    align-items: center;
    column-gap: 16px;
  }

  .list__item-rating {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 16px;
  }
  
  .list__item-rating span {
    color: var(--vt-c-white);
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
  }

  .rating-color-1 {
    background-color: var(--color-rating-1);
  }

  .rating-color-2 {
    background-color: var(--color-rating-2);
  }

  .rating-color-3 {
    background-color: var(--color-rating-3);
  }

  .rating-color-4 {
    background-color: var(--color-rating-4);
  }

  .list__item-width {
    max-width: 45%;
  }

  @media (max-width: 1024px) {
    .head__list {
      flex-wrap: wrap;
      /* justify-content: flex-start; */
      gap: 12px;
    }
  }
</style>
