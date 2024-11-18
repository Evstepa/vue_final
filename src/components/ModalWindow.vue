<template>
  <ModalWindowTemplate
    v-if="open && loginKey"
    @closeModal="closeModal"
  >
  <template v-slot:title v-if="loginFailed">
    <h3 class="title modal__title title__error">
      Неверный email или пароль. Попробуйте ещё раз.
    </h3>
  </template>
  <template v-slot:body>
    <form class="modal__content flex" @submit.prevent="loginCurrentUser">
      <ul class="list-reset modal__list flex">
        <li 
          class="modal__item flex"
          :class="{ error: isEmailWrong }"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="black" fill-opacity="0.4"/>
          </svg>
          <input 
            id="mail"
            type="mail" 
            class="modal__input" 
            placeholder="Электронная почта"
            required
            v-model="email"
            v-on:input="checkEmail"
          >
        </li>
        <li 
          class="modal__item flex"
          :class="{ error: isPasswordWrong }"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z" fill="black" fill-opacity="0.4"/>
          </svg>
          <input 
            id="password" 
            type="password" 
            class="modal__input" 
            placeholder="Пароль"
            required
            v-model="password"
            v-on:input="checkPassword"
          >
        </li>
      </ul>
      <button 
        id="btnLogin"
        :disabled="!isReadyToLogin" 
        class="btn-reset modal__content-btn" 
        type="submit"
      >
        Войти
      </button>
    </form>
  </template>
  <template v-slot:footer>
    <button class="modal__footer-btn" @click="showRegister">
      Регистрация
    </button>
  </template>
  </ModalWindowTemplate>

  <ModalWindowTemplate
    v-if="open && registerKey"
    @closeModal="closeModal"
  >
    <template v-slot:title>
      <h3 class="title modal__title">
        Регистрация
      </h3>
    </template>
    <template v-slot:body>
      <form class="modal__content flex">
          <ul class="list-reset modal__list flex">
            <li 
              class="modal__item flex"
              :class="{ error: user.email === '' }"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="black" fill-opacity="0.4"/>
              </svg>
              <input 
                id="mail"
                type="mail" 
                class="modal__input" 
                placeholder="Электронная почта"
                required
                v-model="email"
                v-on:input="checkEmail"
              >
            </li>
            <li 
              class="modal__item flex"
              :class="{ error: user.name === '' }"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="black" fill-opacity="0.4"/>
              </svg>
              <input 
                id="name" 
                type="text" 
                class="modal__input" 
                placeholder="Имя"
                required
                v-model="name"
                v-on:input="checkName"                        
              >
            </li>
            <li 
              class="modal__item flex"
              :class="{ error: user.surname === '' }"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="black" fill-opacity="0.4"/>
              </svg>
              <input 
                id="surname" 
                type="text" 
                class="modal__input" 
                placeholder="Фамилия"
                required
                v-model="surname"
                v-on:input="checkSurame"    
              >
            </li>
            <li 
              class="modal__item flex"
              :class="{ error: user.password === '' }"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z" fill="black" fill-opacity="0.4"/>
              </svg>
              <input 
                id="password" 
                type="password" 
                class="modal__input" 
                placeholder="Пароль"
                required
                v-model="password"
                v-on:input="checkPassword"
              >
            </li>
            <li 
              class="modal__item flex"
              :class="{ error: !checkPasswordDouble() }"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z" fill="black" fill-opacity="0.4"/>
              </svg>
              <input 
                id="passwordDouble" 
                type="password" 
                class="modal__input" 
                placeholder="Подтвердите пароль"
                required
                v-model="passwordDouble"
                v-on:input="checkPasswordDouble"
              >
            </li>
          </ul>
          <button 
            id="btnCreate"
            class="btn-reset modal__content-btn" 
            :disabled="!isReadyToRegister||passwordDouble===''" 
            type="submit"
            @click.prevent="createNewUser"
          >
            Создать аккаунт
          </button>
      </form>
    </template>
    <template v-slot:footer>
      <button class="modal__footer-btn" @click="showLogin">
        У меня есть пароль
      </button>
    </template>
  </ModalWindowTemplate>

  <ModalWindowTemplate
    v-if="open && infoKey"
    @closeModal="closeModal"
  >
    <template v-slot:title>
      <h3 class="title modal__title">
        Регистрация завершена
      </h3>
    </template>
    <template v-slot:body>
      <div class="modal__content flex">
        <p class="modal__descr">
          Используйте вашу электронную почту для входа
        </p>
        <button 
          class="btn-reset modal__content-btn" 
          type="button"
          @click="showLogin"
        >
          Войти
        </button>
      </div>
    </template>
  </ModalWindowTemplate>
</template>

<script setup lang="ts">
  import ModalWindowTemplate from './ModalWindowTemplate.vue';
  import { computed, ref } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useFavoritesStore } from '@/stores/favorites';
  import { storeToRefs } from 'pinia';
  import router from '@/router';

  const props = defineProps({
    auth: {
      type: Boolean,
    },
    open: {
      type: Boolean,
    },
  });

  const $emit = defineEmits([
    'closeLogin'
  ]);

  const userStore = useUserStore();
  const { isAuthorized } = storeToRefs(userStore);
  const { isReadyToLogin } = storeToRefs(userStore);
  const { isReadyToRegister } = storeToRefs(userStore);
  const { user } = storeToRefs(userStore);

  const favoritesStore = useFavoritesStore();

  const loginKey = ref(true);
  const registerKey = ref(false);
  const infoKey = ref(false);

  const loginFailed = ref(false);

  const email = ref('');
  const password = ref('');
  const passwordDouble = ref('');
  const name = ref('');
  const surname = ref('');
  
  const isEmailWrong = computed(() => {
    return user.value.email === '' && email.value.length > 0
  });

  const isPasswordWrong = computed(() => {
    return user.value.password === '' && password.value.length > 0
  });

  const closeModal = function () {
    loginKey.value = true;
    registerKey.value = false;
    infoKey.value = false;
    $emit('closeLogin');
    document.body.style.overflow = '';
  }  

  const showLogin = function() {
    if (isAuthorized.value) {
      router.push('/profile');      
    } else {
      loginKey.value = true;
      registerKey.value = false;
      infoKey.value = false;
    }
  }

  const showRegister = function() {
    loginKey.value = false;
    registerKey.value = true;
    infoKey.value = false;
  }

   const showInfo = function() {
    loginKey.value = false;
    registerKey.value = false;
    infoKey.value = true;
  }
  
  const checkEmail = function() {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i;
    user.value.email = re.test(email.value) ? email.value : '';
  }

  const checkPassword = function() {
    const re = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    user.value.password = re.test(password.value) ? password.value : '';
    // user.value.password = password.value;
  }

  const checkPasswordDouble = function() {
    return passwordDouble.value === user.value.password 
      && passwordDouble.value !== '';
  }

  const checkName = function() {
    user.value.name = name.value.length > 1 ? name.value : '';
  }

  const checkSurame = function() {
    user.value.surname = surname.value.length > 1 ? surname.value : '';
  }

  async function loginCurrentUser() {
    if (!isReadyToLogin) {
      return;
    }
    const result = await userStore.login(user.value);
    if (result) {
      email.value = '';
      password.value = '';
      await userStore.loadProfile();
      loginFailed.value = false;
      $emit('closeLogin');
      closeModal;
      await favoritesStore.loadFavorites();
    } else {
      loginFailed.value = true;
    }
  }

  async function createNewUser() {
    if (!isReadyToRegister) {
      return;
    }
    const result = await userStore.create(user.value);
    showInfo;   
  }

</script>

<style scoped>
  .title__error {
    color: red; 
  }

</style>