<template>
  <main class="main">
      <film-header
      :currentFilm="currentFilm"
     />

      <div v-if="currentFilm" class="container content__container">
        <h2 class="title content__title">О фильме</h2>

        <div class="about film__about">
          <ul class="list-reset about__descr flex">
            <li class="about__item item flex">
              <span class="item__block flex">
                <span class="item__name">Язык&nbsp;оригинала</span>
                <span class="item__dot"></span>
              </span>
              <span class="item__value">{{ languageName(String(currentFilm.language)) }}</span>
            </li>
            <li class="about__item item flex">
              <span class="item__block flex">
                <span class="item__name">Бюджет</span>
                <span class="item__dot"></span>
              </span>
              <span class="item__value">{{ numberFormat(Number(currentFilm.budget)) }}</span>
            </li>
            <li class="about__item item flex">
              <span class="item__block flex">
                <span class="item__name">Выручка</span>
                <span class="item__dot"></span>
              </span>
              <span class="item__value">{{ numberFormat(Number(currentFilm.revenue)) }}</span>
            </li>
            <li class="about__item item flex">
              <span class="item__block flex">
                <span class="item__name">Режиссёр</span>
                <span class="item__dot"></span>
              </span>
              <span class="item__value">{{ currentFilm.director }}</span>
            </li>
            <li class="about__item item flex">
              <span class="item__block flex">
                <span class="item__name">Продакшен</span>
                <span class="item__dot"></span>
              </span>
              <span class="item__value">{{ currentFilm.production }}</span>
            </li>
            <li class="about__item item flex">
              <span class="item__block flex">
                <span class="item__name">Награды</span>
                <span class="item__dot"></span>
              </span>
              <span class="item__value">{{ currentFilm.awardsSummary }}</span>
            </li>
          </ul>
        </div>

      </div>
  </main>
</template>

<script setup lang="ts">
  import FilmHeader from '@/components/FilmHeader.vue';
  import { ref } from 'vue';
  import { getFilmById } from '@/api/films';
  import type { IFilm } from '@/types/film';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const currentFilm = ref<IFilm | undefined>();
  const loadFilm = async (id: number): Promise<void> => {
    const response = await getFilmById(id);
    currentFilm.value = response; 
  }
  loadFilm(Number(route.params.id));

  function numberFormat(amount: number): string {
    const ru = new Intl.NumberFormat("ru").format(amount);
    return ru + ' руб.';
  }

  function languageName(language: string): string {
    const lang = new Intl.DisplayNames("ru", {type: "language"})
      .of(String(language));
    return lang ? lang : '';  
  }
  
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

  .about__descr {
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    row-gap: 24px;
    width: 100%;
  }

  .item__block {
    max-width: 450px;
    width: 100%;
  }

  .item__dot {
    border-bottom: 1px var(--vt-c-white) dotted;
    width: -webkit-fill-available;
  }

  @media (max-width: 1024px) {
    .content__container {
      padding: var(--top-bottom-gap) var(--left-right-gap);
    }

    .content__title {
      margin-bottom: 40px;
      font-size: 24px;
      line-height: 32px;
    }

    .about__descr {
      row-gap: 12px;
    }

    .about__item {
      flex-direction: column;
      row-gap: 4px;
    }

    .item__dot {
      display: none;
    }

    .item__name {
      color: var(--vt-c-text-dark-2);
      font-size: 14px;
      line-height: 20px;
    }

    .item__value {
      font-size: 18px;
      line-height: 24px;
    }
  }
</style>