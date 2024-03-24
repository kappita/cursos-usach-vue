
<script setup>
  import {ref} from "vue"
  const { progress } = defineProps(['progress', 'title'])
  const real_progress = progress > 100 ? 100 : progress
  const fullpart = ref(`${real_progress}%`)


</script>



<template>
  <div class="bar-container">
    <div class="score-number">
      <h3>
        {{ title }}
      </h3>
    </div>
    <div class="bar">
      <div class="filled-bar" :style="{width: fullpart}" ></div>
      <div class="empty-bar"></div>
    </div>
  </div>
</template>

<style scoped>
  @keyframes bar-animation {
    0% {width: 0%}
  }

  .bar-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .score-number {
    width: 10%;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  
  .score-number h3 {
    text-align: center;
    font-size: 2vh;
    font-weight: bold;
  }

  .bar {
    width: 90%;
    height: 40%;
    display: flex;
    position: relative;

  }

  .empty-bar {
    width: 100%;
    height: 100%;
    background-color: grey;
    border-radius: 9%;
    position: absolute;
  }

  .filled-bar {
    height: 100%;
    background-color: green;
    border-radius: 9%;
    animation-name: bar-animation;
    animation-duration: 1s;
    transition: 1s;
    display: inline-block;
    position: absolute;
    z-index: 4;

  }

</style>