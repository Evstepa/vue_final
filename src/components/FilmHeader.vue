<template>
  <div class="container wallpaper__container flex">
    <div v-if="currentFilm !== undefined" class="wallpaper__content">
      <div class="wallpaper__head">
        <film-header-rating 
          :currentFilm="currentFilm"
        >
        </film-header-rating>
      </div>
      <h1 class="title wallpaper__title">
        {{ currentFilm.title }}
      </h1>
      <p v-if="route.name !== 'movie'" class="descr wallpaper__descr">
        {{ truncateLine(currentFilm.plot) }}
      </p>
      <p v-else class="descr wallpaper__descr">
        {{ currentFilm.plot }}
      </p>
      <div 
        class="wallpaper__buttons flex"
        :class="{'wallpaper__buttons-movie': route.name === 'movie'}"
      >
        <button 
          class="btn-reset wallpaper__btn is-active wallpaper__btn-first"
          @click="show=true"
        >
          Трейлер
        </button>
        <RouterLink  :to="{ name: 'movie', params: { id: currentFilm.id } }" 
          class="btn-reset wallpaper__btn"
          v-if="route.name !== 'movie'" 
        >
          О фильме
        </RouterLink>
        <button 
          class="btn-reset wallpaper__btn is-round"
          @click="likeDislike"
        >
          <svg v-if="!isLike" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" fill="white"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z" fill="#B4A9FF"/>
          </svg>
        </button>
        <button class="btn-reset wallpaper__btn is-round"
          v-if="route.name !== 'movie'" @click="reloadRandomFilm()"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z" fill="white"/>
          </svg>
        </button>
      </div>
    </div>   

    <div 
      v-if="show" class="shadow-modal modal-video"
      @click.self="closeMovie"
    >
      <div class="video-player">

        <div class="video-container">
              <!--  v-show="videoStop"  v-show="showPause"-->
          <div class="modal__close flex" @click="closeMovie">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.9997 5.5865L11.9495 0.636719L13.3637 2.05093L8.4139 7.0007L13.3637 11.9504L11.9495 13.3646L6.9997 8.4149L2.04996 13.3646L0.635742 11.9504L5.5855 7.0007L0.635742 2.05093L2.04996 0.636719L6.9997 5.5865Z" fill="black" fill-opacity="0.5"/>
            </svg>
          </div>
          <div class="spinner flex" v-if="!isLoad">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.6067 4.3934L23.2495 6.75042C21.1383 4.63917 18.2217 3.33333 15 3.33333C8.55668 3.33333 3.33333 8.55668 3.33333 15C3.33333 21.4433 8.55668 26.6667 15 26.6667C21.4433 26.6667 26.6667 21.4433 26.6667 15H30C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C19.1422 0 22.8922 1.67893 25.6067 4.3934Z" fill="white"/>
            </svg> 
          </div>

          <YouTube 
            v-if="currentFilm" 
            :src="`https://www.youtube.com/embed/${currentFilm?.trailerYouTubeId}`"
            :width="width"
            :height="height"
            :vars="{
              autoplay: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0, 
              showinfo: 0,
            }"
            @ready="onReady" 
            @stateChange="onStateChange"
            allow="autoplay; encrypted-media" 
            ref="youtube" class="video-frame"            
          >
          </YouTube>

          <div class="video-pause" >
            <svg v-if="!showPause"
              width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="80" height="80" rx="40" fill="white"/>
              <path d="M30 25H33.3333V55H30V25ZM46.6667 25H50V55H46.6667V25Z" fill="black"/>
            </svg>

            <svg v-else
              width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="80" height="80" rx="40" fill="white"/>
              <path d="M30 53.6595V26.3404C30 25.0313 31.4399 24.2332 32.55 24.927L54.4053 38.5867C55.4498 39.2393 55.4498 40.7605 54.4053 41.4133L32.55 55.0728C31.4399 55.7667 30 54.9687 30 53.6595Z" fill="black"/>
            </svg>
          </div>

          <div class="video-list" v-if="currentFilm" :key="currentFilm.id">
            <h3>{{currentFilm.title}}</h3>                                     
          </div>
        </div>
      </div>
    </div>

    <figure class="wallpaper-img">
      <img v-if="currentFilm !== undefined && currentFilm.backdropUrl !== null" 
        :src="currentFilm.backdropUrl" 
        :srcset="currentFilm.backdropUrl" 
        :alt="currentFilm.title"
        loading="lazy"
      >
      <img v-else-if="currentFilm !== undefined" 
        src="../../public/img/plug_big.jpg" 
        :alt="currentFilm.title"
        loading="lazy"
      >
    </figure>

    <ModalWindow 
      :open="loginKey"
      :auth="auth"
      @closeLogin="closeLogin"
    >
    </ModalWindow>
  </div>

</template>

<script setup lang="ts">
  import FilmHeaderRating from './FilmHeaderRating.vue';
  import ModalWindow from './ModalWindow.vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  import { useFavoritesStore } from '@/stores/favorites';
  import type { IFilm } from '@/types/film';
  import { computed, ref } from 'vue';
  import YouTube from 'vue3-youtube';

  const props = defineProps({
    currentFilm: {
      type: Object,
    }
  });

  const $emit = defineEmits([
    'loadRandomFilm'
  ]);

  const userStore = useUserStore();
  const favoritesStore = useFavoritesStore();

  const show = ref(false);
  const loginKey = ref(false);
  const isLoad = ref(false);
  const isPaused = ref(false);
  const isPlay = ref(false);

  const onReady = function() {
    isLoad.value = true;
    isPlay.value = true;
  }

  const onStateChange = function(data: any) {
    isPaused.value = data.data == 2;
    isPlay.value = !isPaused.value;
  }

  const showPause = computed(() => {
    return isPaused.value
  });

  const auth = computed(() => {
    return userStore.isAuthorized
  });

  const isLike = computed(() => {
    return userStore.isAuthorized 
      ? userStore.isInFavorites(props.currentFilm?.id)
      : false
  });

  function reloadRandomFilm() {
    $emit('loadRandomFilm');
  }

  const route = useRoute();

  function truncateLine(line: string): string {
    return line.substring(0, 80) + '...';
  }

  const likeDislike = function() {
    if (!auth.value) {
      loginKey.value = true;
    } else {
      if (!isLike.value) {
        favoritesStore.addFilmToFavorites(props.currentFilm as IFilm);
        userStore.addFavoriteFilm(props.currentFilm?.id);
      } else {
        favoritesStore.removeFilmFromFavorites(props.currentFilm as IFilm);
        userStore.removeFilmFromFavorites(props.currentFilm?.id);
      }
      favoritesStore.loadFavorites();    
    }
  }

  const closeMovie = function() {
    show.value = false;
  }

  const closeLogin = function() {
    loginKey.value = false;
  }

  const width = ref(960);

  const height = ref(540);

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) {
      width.value = window.innerWidth;
    } else {
      width.value = 960;
    }
    height.value = width.value * 9 / 16;
  });

</script>

<style scoped>
  .wallpaper__container {
    position: relative;
    margin: 0 auto;
    padding-top: 32px;
    justify-content: space-between;
    align-items: center;
    column-gap: 10px;
  }

  .wallpaper-img {
    max-width: 680px;
    max-height: 550px;
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    object-fit: cover;
  }

  .wallpaper-img img {
    /* height: 100%; */
    width: -webkit-fill-available;
  }

  .wallpaper__content {
    /* position: relative; */
    /* padding-top: 74px;
    padding-bottom: 122px; */
    padding-top: 40px;
    padding-bottom: 40px;
    max-width: 600px;
    width: 100%;
  }

  .wallpaper__head {
    margin: 0;
    margin-bottom: 16px;
    padding: 0;
  }

  .wallpaper__buttons {
    align-items: center;
    row-gap: 16px;
    column-gap: 16px;
    flex-wrap: wrap;
  }
  
  .wallpaper__btn {
    margin: 0;
    padding: 16px 48px;
    border-radius: 28px;
    background-color: var(--color-background-secondary);    
  }

  .wallpaper__btn:hover, 
  .wallpaper__btn:focus-visible {
    background-color: var(--color-brand-active);
  }

  .wallpaper__btn:active {
    background-color: var(--color-background-secondary);
  }

  .is-active {
    background-color: var(--color-brand-active);
  }

  .is-active:hover, 
  .is-active:focus-visible {
    background-color: var(--color-brand-hover);
  }

  .is-active:active {
    background-color: var(--color-brand-active);
  }
  
  .wallpaper__btn.is-round {
    padding-left: 22px;
    padding-right: 22px;
  }

  .is-like svg {
    fill: var(--color-brand-active);
  }

  .is-like svg path {
    fill: var(--color-brand-active);
  }

  .modal-video {
    position: fixed;
    height: 100%;
  }

  .modal__close {
    display: none;
  }

  .video-player {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 960px;
    max-height: 540px;
    width: 100%;
    height: 100%;
    background: var(--color-background-secondary);
    box-shadow: 0 0 20px var(--color-shadow);
    transform: translate(-50%, -50%);
  }

  .video-container {
    position: relative;
  }

  .video-container:hover>.modal__close {
    display: flex;
  }

  .video-container:hover>.video-list,
  .video-container:hover>.video-pause {
    display: block;
  }

  .video-pause {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    padding: 0;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
  }
  
  .spinner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: -webkit-fill-available;
    background-color: var(--color-background-secondary);
    z-index: 10;
  }

  .spinner svg {
    animation-name: rotation;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes rotation {
    0% {
      transform:rotate(0deg);
    }
    25% {
      transform:rotate(90deg);
    }
    50% {
      transform:rotate(180deg);
    }
    75% {
      transform:rotate(270deg);
    }
    100% {
      transform:rotate(360deg);
    }
  }

  .video-frame {
    max-width: 960px;
    max-height: 540px;
    width: 100vw;
    height: 100vh;
  }

  .video-list {
    display: none;
    position: absolute;
    left: 20px;
    bottom: 24px;
    width: calc(100% - 40px);
    height: 80px;
    padding: 24px 40px;
    background-color: rgba(10, 11, 11, 0.5);
  }

  @media (max-width: 1440px) {
    .wallpaper-img {
      max-width: calc(100% - 500px);
      max-height: 400px;
    }

    .wallpaper__content {
      padding-bottom: 74px;
      max-width: 500px;
    }

    .wallpaper__descr {
      margin-bottom: 32px;
    }

    .wallpaper__btn {
      padding-left: 24px;
      padding-right: 24px;
    }

  }

  @media (max-width: 1024px) {
    .wallpaper__container {
      flex-direction: column-reverse;
      align-items: flex-start;
    }

    .wallpaper-img {
      max-width: none;
      max-height: none;
    }

    .wallpaper__content {
      padding: 24px 0;
    }

    .wallpaper__buttons {
      justify-content: space-between;
    }

    .wallpaper__btn:first-child {
      width: -webkit-fill-available;
    }

    .wallpaper__buttons-movie>.wallpaper__btn:first-child {
      width: 70%;
    }

    .modal__close {
      top: 16px;
      right: 16px;
    }
    
    .video-list {
      left: 0;
      bottom: 0;
      width: 100%;
    }

    .video-pause:hover + .video-list,
    .video-pause:focus + .video-list,
    .video-pause:active + .video-list {
      display: block;
    }
  }

</style>
