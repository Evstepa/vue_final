<template>
  <main class="main">
    <div class="container content__container">
      <h2 class="title content__title">Мой аккаунт</h2>
    
      <div class="tabs">
        <div class="tabs__header flex">
          <button 
            class="btn-reset nav__item tabs__btn tabs__btn-desctop flex"
            :class="{active: activeTab === 1}"
            @click="activeTab = 1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" fill="white"/>
            </svg>
            Избранные фильмы
          </button>
          <button 
            class="btn-reset nav__item tabs__btn tabs__btn-mobile flex"
            :class="{active: activeTab === 1}"
            @click="activeTab = 1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" fill="white"/>
            </svg>
            Избранное
          </button>
          <button 
            class="btn-reset btn nav__item tabs__btn tabs__btn-desctop flex"
            :class="{active: activeTab === 2}"
            @click="activeTab = 2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="white"/>
            </svg>
            Настройка аккаунта
          </button>
          <button 
            class="btn-reset btn nav__item tabs__btn tabs__btn-mobile flex"
            :class="{active: activeTab === 2}"
            @click="activeTab = 2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="white"/>
            </svg>
            Настройки
          </button>
        </div>
        <div class="tabs__body">
          <div class="tabs__body-item" v-show="activeTab === 1">
            <!-- Содержимое вкладки Избранные фильмы -->
            <div class="film-list flex" v-if="!isMobile">
              <film-card 
                v-for="(film, index) in favorites" 
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
                <swiper-slide v-for="(film, index) in favorites" :key="film.id">
                  <film-card                
                    :key="film.id" 
                    :film="film" 
                    :index="index"
                  />
                </swiper-slide>      
              </swiper>
            </div>
          </div>
          <div class="tabs__body-item" v-show="activeTab === 2">
            <!-- Содержимое вкладки Настройки аккаунта -->
            <ul class="list-reset tabs__list flex">
              <li class="tabs__list-item flex">
                <p class="tabs__list-icon flex">
                  {{ getFirstLetter(user.name) }}{{ getFirstLetter(user.surname) }}
                  
                </p>
                <div class="tabs__list-descr flex">
                  <p class="tabs__list-title">
                    Имя Фамилия
                  </p>
                  <p class="tabs__list-content">
                    {{ getUpLetter(user.name) }} {{ getUpLetter(user.surname) }}
                  </p>
                </div>
              </li>
              <li class="tabs__list-item flex">
                <p class="tabs__list-icon flex">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="white"/>
                  </svg>
                </p>
                <div class="tabs__list-descr flex">
                  <p class="tabs__list-title">
                    Электронная почта
                  </p>
                  <p class="tabs__list-content">
                    {{ user.email }}
                  </p>
                </div>
              </li>
            </ul>
            <button class="btn-reset tabs__body-btn" @click="logoutCurrentUser">
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </div>

    </div>

  </main>
</template>

<script setup lang="ts">
  import FilmCard from '@/components/FilmCard.vue'
  import { ref, watch } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useFavoritesStore } from '@/stores/favorites';
  import { storeToRefs } from 'pinia';
  import router from '@/router';
  import { Swiper, SwiperSlide } from "swiper/vue";  
  import 'swiper/css';

  const activeTab = ref(1);

  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  const favoritesStore = useFavoritesStore();
  const { favorites } = storeToRefs(favoritesStore);

  function getUpLetter(word: string): string {
    if (word !== '') {
      return word[0].toUpperCase() + word.substring(1);
    } else {
      return '';
    }
  }

  function getFirstLetter(word: string): string {
    if (word !== '') {
      return word[0].toUpperCase();
    } else {
      return '';
    }
  }

  async function logoutCurrentUser() {
    await userStore.logout();
    router.push('/');
  }

  const isMobile = ref<boolean>(
    window.innerWidth <= 1024
  );

  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 1024;
  });

  watch(router.currentRoute, () => {
    favoritesStore.loadFavorites();
  }, { deep: true});

</script>

<style scoped>
  .content__container {
    padding-top: 40px;
    padding-bottom: 40px;
    width: 100%;
  }

  .content__title {
    margin-bottom: 64px;
    font-size: 48px;
    color: var(--vt-c-white);
    text-align: left;
  }

  .tabs__header {
    column-gap: 64px;
  }

  .tabs__btn {
    align-items: center;
    column-gap: 8px;
    padding: 8px 0;
    font-size: 24px;
    border: none;
    outline: none;
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: border-bottom 0.5s ease-in-out, text-decoration 0.5s ease-in-out, color 0.5s ease-in-out;
  }

  .tabs__btn svg path {
    transition: fill 0.5s ease-in-out;
  }

  .tabs__btn.active {
    border-bottom: 1px solid var(--color-underline);
  }

  .tabs__btn.active svg path {
    fill: var(--color-underline);
  }

  .tabs__btn-mobile {
    display: none;
  }

  .tabs__body-item {
    padding: 0;
    padding-top: 64px;
  }

  .tabs__list {
    flex-direction: column;
    row-gap: 40px;
    margin-bottom: 64px;
  }

  .tabs__list-icon {
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    margin: 0;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: var(--color-content-disabled);
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
  }

  .tabs__list-item {
    column-gap: 16px;
  }

  .tabs__list-descr {
    margin: 0;
    padding: 0;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 4px;
  }

  .tabs__list-title {
    font-size: 18px;
    line-height: 24px;
  }

  .tabs__list-content {
    font-size: 24px;
    font-weight: bold;
    line-height: 32px;
  }

  .tabs__body-btn {
    margin: 0;
    padding: 16px 48px;
    border-radius: 28px;
    font-size: 18px;
    font-weight: bold;
    color: var(--vt-c-white);
    background-color: var(--color-brand-active);
  }

  .film-list {
    flex-wrap: wrap;
    align-items: center;
    column-gap: 40px;
    row-gap: 64px;
    width: 100%;
  }
  
  @media (max-width: 1280px) {
    .film-list {
      justify-content: center;
    }
  }

  @media (max-width: 1024px) {
    .content__container {
      padding-bottom: 150px;
    }

    .tabs__btn-mobile {
      display: flex;
    }

    .tabs__btn-desctop {
      display: none;
    }

    .tabs__list-title {
      color: var( --vt-c-text-dark-2);
    }

    .tabs__body-btn {
      width: -webkit-fill-available;
    }

    .content__title {
      font-size: 24px;
      line-height: 32px;
    }

    .swiper-slide {
      padding: 20px;
    }

  }

</style>