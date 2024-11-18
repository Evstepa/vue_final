import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { loginUser, logoutUser, createUser, getProfile } from '@/api/users'
import type { IUser } from '@/types/user';
import { useFavoritesStore } from './favorites';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>({
    'name': '',
    'surname': '',
    'email': '',
    'password': '',
    'favorites': []
  });

  const ls = localStorage.getItem('currentUser');
  if (ls) {
    user.value = JSON.parse(ls) as IUser;
  }

  // const isAuthorized = computed(() => {
  //   const ls = localStorage.getItem('currentUser');
  //   if (ls) {
  //     const userLs = JSON.parse(ls);
  //     if (userLs['name'] !== '' && isReadyToLogin) {
  //       return true;
  //     } 
  //   }
  //   return false;
  //   // isReadyToLogin && user.value.name !== '' //работает, но...
  //   // localStorage.getItem('currentUser') !== null && isReadyToLogin
  //   // && JSON.parse(localStorage.getItem('currentUser')) !== ''
  // }
  // );

  const isAuthorized = ref<boolean>(
    localStorage.getItem('currentUser') !== null && user.value.name !== ''
  );

  const isReadyToLogin = computed(() => 
    user.value.email !== '' && user.value.password !== ''
  );
  
  const isReadyToRegister = computed(() => 
    !isAuthorized
    && user.value.email !== '' 
    && user.value.password !== '' 
    && user.value.name !== '' 
    && user.value.surname !== ''      
  );

  function reset() {
    user.value = {
      'name': '',
      'surname': '',
      'email': '',
      'password': '',
      'favorites': []
    }
  }

  async function login(currentUser: IUser) {
    if (!isReadyToLogin) {
      isAuthorized.value = false;
      return false;
    }
    const responce = await loginUser(currentUser);
    if (responce) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      isAuthorized.value = true;
      // console.log(localStorage.getItem('currentUser'));
    }
    return responce;  
  }

  async function logout() {
    if (await logoutUser()) {
      reset();
      localStorage.clear();
      isAuthorized.value = false;
    }  
  }

  async function loadProfile() {
    const responce = await getProfile();
    user.value = responce;
    localStorage.setItem('currentUser', JSON.stringify(user.value));
    isAuthorized.value = true;
  }
  
  async function create(currentUser: IUser) {
    if (!isReadyToRegister) {
      return false;
    }
    return await createUser(currentUser);  
  }

  function addFavoriteFilm(id: string) {
    if (user.value.favorites.indexOf(id, 0) && isAuthorized) {
      user.value.favorites.push(String(id));
      localStorage.setItem('currentUser', JSON.stringify(user.value));
    }    
  }

  function removeFilmFromFavorites(id: number) {
    const index = user.value.favorites.indexOf(String(id), 0);
    if (index > -1 && isAuthorized) {
      user.value.favorites.splice(index, 1);
      localStorage.setItem('currentUser', JSON.stringify(user.value));
    }
  }

  function isInFavorites(id: number): boolean {
    return user.value.favorites.includes(String(id));
  }

  return { 
    user, 
    isAuthorized, 
    isReadyToLogin,
    isReadyToRegister,
    reset, 
    login, 
    logout, 
    loadProfile, 
    create,
    addFavoriteFilm,
    removeFilmFromFavorites,
    isInFavorites,
  }
})
