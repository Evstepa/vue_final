<template>
  <main class="main">
    <film-header 
      :currentFilm="randomFilm" @loadRandomFilm="loadRandomFilm()"
    />
    <div class="container content__container">
      <h2 class="title content__title">Топ 10 фильмов</h2>

      <div class="film-list flex" v-if="!isMobile">
        <film-card 
          v-for="(film, index) in films" 
          :key="film.id" 
          :film="film" 
          :index="index"
        />
      </div>
      <div class="film-slider" v-else>
        <swiper
          :slidesPerView="1"
          :spaceBetween="40"
          :slidesPerGroup="1"
          :breakpoints="{
            '375': {
              slidesPerView: 1.5,
            },
            '520': {
              slidesPerView: 2,
            },
            '640': {
              slidesPerView: 2.5,
            },
            '768': {
              slidesPerView: 3,
            },
          }"
          class="mySwiper"
        >
          <SwiperSlide v-for="(film, index) in films" :key="index">
            <FilmCard                
              :key="film.id" 
              :film="film" 
              :index="index"
            />
          </SwiperSlide>      
        </swiper>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import FilmHeader from '@/components/FilmHeader.vue';
  import FilmCard from '@/components/FilmCard.vue'
  import { ref, computed } from 'vue';
  import { getFilms, getRandomFilm } from '@/api/films';
  import type { IFilm } from '@/types/film';
  import { Swiper, SwiperSlide } from "swiper/vue";  
  import 'swiper/css';

  const films = ref<IFilm[]>([]);
  const loadFilms = async (): Promise<void> => {
    const response = await getFilms();
    films.value = response;    
  }
  loadFilms();

  const randomFilm = ref<IFilm | undefined>();
  const loadRandomFilm = async (): Promise<void> => {
    const response = await getRandomFilm();
    randomFilm.value = response; 
  }
  loadRandomFilm();

  const isMobile = ref<boolean>(
    window.innerWidth <= 1024
  );

  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 1024;
  });

</script>

<style scoped>
  .main {
    position: relative;
  }

  .content__container {
    padding-top: var(--top-bottom-gap);
    padding-bottom: var(--top-bottom-gap);
    width: 100%;
  }

  .content__title {
    margin-bottom: 64px;
    font-size: 48px;
    color: var(--vt-c-white);
    text-align: left;
  }

  .film-list {
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    column-gap: var(--column-gap);
    row-gap: var(--row-gap);
    width: 100%;
  }

  @media (max-width: 1280px) {
    .film-list {
      justify-content: center;
    }
  }
  
  @media (max-width: 1024px) {
    .swiper-slide {
      padding: 15px;
    }

    .content__container {
      padding-left: 5px;
    }

    .content__title {
      margin-bottom: 25px;
      margin-left: 15px;
      font-size: 24px;
    }
  }

</style>