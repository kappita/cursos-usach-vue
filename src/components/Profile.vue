<script setup>
  const { profile } = defineProps(['profile'])
</script>


<template>
  <div class="profile">
    <h3>Hola {{ profile.name }}!</h3>
    <img :src="profile.profile_img">
  </div>
  
</template>


<style scoped>
  .profile {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
  }

  h3 {
    margin-right: 10px;
  }
  img {
    border-radius: 100%;
    height: 100%;
  }

</style>