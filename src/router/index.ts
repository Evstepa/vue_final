import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('@/views/FilmView.vue'),
    },
    {
      path: '/genre',
      name: 'genre',
      component: () => import('@/views/GenreView.vue'),
    },
    {
      path: '/genre/films',
      name: 'genre-films',
      component: () => import('@/views/GenreFilmsView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
  ]
});

export default router;
