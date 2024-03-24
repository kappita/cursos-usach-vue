<script setup>
defineEmits(['rating'])
</script>


<template>
  <div class="stars-container">
    <div class="star-container" @click="$emit('rating', 1)">
      <div class="star"></div>
      <div class="border"></div>
    </div>
    <div class="star-container" @click="$emit('rating', 2)">
      <div class="star"></div>
      <div class="border"></div>
    </div>
    <div class="star-container" @click="$emit('rating', 3)">
      <div class="star"></div>
      <div class="border"></div>
    </div>
    <div class="star-container" @click="$emit('rating', 4)">
      <div class="star"></div>
      <div class="border"></div>
    </div>
    <div class="star-container" @click="$emit('rating', 5)">
      <div class="star"></div>
      <div class="border"></div>
    </div>
  </div>
</template>


<style scoped>
  .stars-container {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(1, minmax(0, 1fr));
    width:100%;
    height: 100%;
    background-color: white;
  }

  .star-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer
  }


  .star {
    color: yellow;
    position: absolute;
    text-align: center;
    text-justify: center;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    background: yellow;
    height: 80%;
    aspect-ratio: 1;
    z-index: 20;
  }

  .border {
    color: black;
    font-size: 5rem;
    position: absolute;
    text-align: center;
    text-justify: center;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    background: black;
    height: 100%;
    aspect-ratio: 1;
  }

</style>