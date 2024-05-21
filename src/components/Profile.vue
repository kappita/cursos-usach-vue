<script setup>
import { computed } from 'vue';

  const { profile } = defineProps(['profile']);

  const profileName = computed(() => {
    if (profile.name.length > 10) {
      const firstName = profile.name.split(" ")[0];
      return firstName;
    }

    return profile.name;
  });
</script>


<template>
  <div class="profile">
    <h3>Hola {{ profileName }}!</h3>
    <img :src="profile.profile_img">
  </div>
  
</template>


<style scoped>
  .profile {
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;

  }

  img {
    border-radius: 100%;
    width: 38px;
    aspect-ratio: 1/1;
    object-fit: cover;
  }

  @media (max-width: 650px) {
  .profile {
    padding: 0.5rem 0;
    justify-content: center;
  }
}

</style>