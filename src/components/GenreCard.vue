<template>
  <div v-if="genre !== undefined" class="genreCard">
    <RouterLink  :to="{ name: 'genre-films', query: { genre: genre.title } }" 
      class="card__link"
    >
    </RouterLink>

    <img v-if="genre.posterUrl !== null" 
        :src="genre.posterUrl" 
        :srcset="genre.posterUrl" 
        :alt="genre.title"
        class="genreCard-img"
        loading="lazy"
      >
    <img v-else 
      src="../../public/img/plug_square.jpg" 
      :alt="genre.title"
      class="genreCard-img"
      loading="lazy"
      >
    <p v-if="genre !== undefined" class="descr genre__desrc">
      {{ getUpLetter(genre.title) }}
    </p>
  
  </div>
</template>


<script setup lang="ts">
  const props = defineProps({
    index: {
      type: Number,
    },
    genre: {
      type: Object,
    }
  });

  function getUpLetter(word: string): string {
    return word[0].toUpperCase() + word.substring(1);
  }
  
</script>

<style>
  .genreCard {
    position: relative;
    padding-bottom: 30px;
    width: 290px;
    height: 304px;
    border-radius: 24px;
    background-color: var(--color-background);
    box-shadow: 0 0 80px var(--color-shadow);
  }
  
  .genreCard-img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    object-position: top;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    stroke-width: 1px;
    stroke-opacity: 0.25;
    stroke: black;
  }

  .genre__desrc {
    margin-top: 22px;
    text-align: center;
    color: var(--vt-c-white);
  }

  @media (max-width: 1024px) {
    .genreCard {
      width: 335px;
    }
  }

</style>
