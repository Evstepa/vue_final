<template>
  <span class="svg-search">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" fill="white" fill-opacity="0.5"/>
    </svg>
  </span>
  <input 
    id="headerSearch" 
    class="search header__search" 
    type="text" 
    placeholder="Поиск"
    v-model="searchQuery"
    v-on:input="searchFiles"
    v-on:keyup.esc="closeSearch"
  >
  <button 
    class="btn-reset svg-close" 
    :class="{'unvisible': unvisible}"
    v-on:click="closeSearch"
  >
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.9997 5.5865L11.9495 0.636719L13.3637 2.05093L8.4139 7.0007L13.3637 11.9504L11.9495 13.3646L6.9997 8.4149L2.04996 13.3646L0.635742 11.9504L5.5855 7.0007L0.635742 2.05093L2.04996 0.636719L6.9997 5.5865Z" fill="white" fill-opacity="0.5"/>
    </svg>
  </button>

  <div class="search__result" :class="{'unvisible': unvisible}">
    <div class="search__list" v-if="!isMobile">
      <search-card
        v-for="(film, index) in films" 
          :key="film.id" 
          :film="film" 
          :index="index"
          :mobile="isMobile"
          @closeSearch="closeSearch"
      >
      </search-card>
    </div>
    <div class="search-slider" v-else>
      <swiper
        :slidesPerView="1"
        :spaceBetween="16"
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
        <swiper-slide v-for="(film, index) in films" :key="film.id">
          <search-card                
            :key="film.id" 
            :film="film" 
            :index="index"
            :mobile="isMobile"
            @closeSearch="closeSearch"
          />
        </swiper-slide>      
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { getFilmByName } from '@/api/films';
  import type { IFilm } from '@/types/film';
  import SearchCard from './SearchCard.vue';

  import { Swiper, SwiperSlide } from "swiper/vue";  
  import "swiper/swiper-bundle.min.css";  
  import "swiper/swiper.min.css";  

  // import { useRoute } from 'vue-router';

  // const route = useRoute();

  const $emit = defineEmits([
    'closeSearchModal',
  ]);

  const searchQuery = ref('');
  const unvisible = ref(true);

  const films = ref<IFilm[]>([]);
  const loadFilms = async (): Promise<void> => {
    if (searchQuery.value) {
      const response = await getFilmByName(searchQuery.value);
      const tempArray = response;    
      films.value = tempArray.slice(0, 5);
    }
  }

  const searchFiles = function() {    
      if (searchQuery.value) {
        loadFilms();  
        unvisible.value = false;
      } else {
        searchQuery.value = '';
        films.value = [];
        unvisible.value = true;
      }
  };

  const closeSearch = function() {
    unvisible.value = true;
    searchQuery.value = '';
    $emit('closeSearchModal');
  };

  const isMobile = ref<boolean>(
    window.innerWidth <= 1024
  );

  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 1024;
  });

</script>


<style scoped>
  .header__search {
    position: relative;
    padding: 12px 52px;
    border-radius: 8px;
    max-width: var(--search-width);
    width: var(--search-width);
    background-color: var(--color-background-secondary);
  }

  .svg-search {
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px;
    z-index: 2;
  }

  .svg-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px;
    z-index: 2;
  }

  .search__result {
    position: absolute;
    display: block;
    margin: 0;
    margin-top: 24px;
    padding: 8px;
    max-width: var(--search-width);
    width: 100%;
    border-radius: 8px;
    background-color: var(--color-background-secondary);
  }

  @media (max-width: 1440px) {
    .svg-search {
      padding: 10px;
    }
  }

  @media (max-width: 1024px) {
    .header__search {
      max-width: none;
      width: -webkit-fill-available;
    }

    .svg-search {
      top: 15px;
      left: 36px;
    }

    .svg-search svg path {
      fill-opacity: 1;
    }

    .svg-close {
      top: 15px;
      right: 16px;
    }

    .svg-close svg path {
      fill-opacity: 1;
    }

    .search__result {
      position: relative;
      padding: 24px 20px;
    }

    /* .search-slider {
      
    } */
  }


</style>
