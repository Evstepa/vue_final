<template>
  <div class="shadow-modal" @click.self="closeModalWindow">
      <div class="modal">
          <div class="modal__close flex" @click="closeModalWindow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.9997 5.5865L11.9495 0.636719L13.3637 2.05093L8.4139 7.0007L13.3637 11.9504L11.9495 13.3646L6.9997 8.4149L2.04996 13.3646L0.635742 11.9504L5.5855 7.0007L0.635742 2.05093L2.04996 0.636719L6.9997 5.5865Z" fill="black" fill-opacity="0.5"/>
            </svg>
          </div>
          <div class="modal__title">
            <img 
                src="@/assets/svg/logo_white.svg" 
                alt="CinemaGuide" 
                width="240" height="32"
                class="modal__img"
              >
          </div>
          <slot name="title">
          </slot>
          <slot name="body">
          </slot>
          <div class="modal__footer flex">
            <slot name="footer">
            </slot>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
  const $emit = defineEmits([
    'closeModal'
  ]);

  function closeModalWindow() {
    $emit('closeModal');
  }

  document.body.style.overflow = 'hidden';
</script>

<style scoped>

</style>