<script setup>
  import { ref, watch } from "vue";
  import Bar from "./Bar.vue";
  
  const { data } = defineProps(['data'])

    
  const isDataAvailable = ref(true)
  const bruh = ref(0)
  const oneStar = ref(0)
  const twoStars = ref(0)
  const threeStars = ref(0)
  const fourStars = ref(0)
  const fiveStars = ref(0)


  if (data.voteCount > 0) {
    isDataAvailable.value = true
    bruh.value = data.scores.average
    oneStar.value = data.scores.scores[0].votes / data.voteCount * 100
    twoStars.value = data.scores.scores[1].votes / data.voteCount * 100
    threeStars.value = data.scores.scores[2].votes / data.voteCount * 100
    fourStars.value = data.scores.scores[3].votes / data.voteCount * 100
    fiveStars.value = data.scores.scores[4].votes / data.voteCount * 100
  } else {
    isDataAvailable.value = false

  }

  watch(data, () => {
    console.log("observado lol")
    console.log(data)
    bruh.value = 0
    bruh.value = data.scores.average
    if (data.voteCount > 0) {
      console.log("actualizando puntajes")
      isDataAvailable.value = true

      oneStar.value = data.scores.scores[0].votes / data.voteCount * 100
      twoStars.value = data.scores.scores[1].votes / data.voteCount * 100
      threeStars.value = data.scores.scores[2].votes / data.voteCount * 100
      fourStars.value = data.scores.scores[3].votes / data.voteCount * 100
      fiveStars.value = data.scores.scores[4].votes / data.voteCount * 100
    } else {
      isDataAvailable.value = false

  }
  })
  

</script>


<template>
  <div class="course-score">
    <div v-if="!isDataAvailable" class="no-data">
      <h1>
        No hay información disponible sobre el ramo
      </h1>
      <h3>Sé el primero en dar su opinión!</h3>
    </div>
    <div v-if="isDataAvailable" class="scores-container">
      <div class="bars-container">
        <Bar :progress="oneStar" :title="1"></Bar>
        <Bar :progress="twoStars" :title="2"></Bar>
        <Bar :progress="threeStars" :title="3"></Bar>
        <Bar :progress="fourStars" :title="4"></Bar>
        <Bar :progress="fiveStars" :title="5"></Bar>
      </div>
  
      <div class="score-container">
        <div class="score">
          <h1>
            {{ bruh.toFixed(1) }}
          </h1>
          <h3>
            {{ data.voteCount }} opiniones
          </h3>
        </div>
      </div>
      </div>
  </div>


</template>


<style scoped>

  @keyframes bar-animation {
    0% { width: 0% }
  
  }

  @keyframes number-animation {
    0% { initial-value: 0}
  }

  .course-score {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .score {
    width: 100%;
  }

  .no-data {
    position: absolute;
    width: 100%;
    height: 100%;
    justify-items: center;
    align-items: center;
    justify-content: center;
    z-index: 10;
    background-color: rgb(0,0,0,0.7);
    overflow: hidden;
  }

  .no-data h1 {
    text-align: center;
    text-justify: center;
    transition: top 1s ease;
    font-size: 100%;
  }

  .no-data h2 {
    text-align: center;
  }

  .scores-container {
    height: 100%;
    width: 100%;
    align-items: center;
    display: flex;
    position: relative;
  }

  .score-container {
    height: 100%;
    width: 30%;
    align-items: center;
    justify-items: center;
    display: flex;
  }

  .score-container h1 {
    font-size: 2vw;
    width: 100%;
    justify-content: center;
    text-align: center;
    align-items: center;
    animation-name: number-animation;
    animation-duration: 1s;
    transition: number-animation 1s
  }

  .score-container h3 {
    font-size: 1rem;
    width: 100%;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  .bars-container {
    margin-top: 10%;
    margin-bottom: 10%;
    padding-right: 2.5%;
    padding-left: 2.5%;
    width: 65%;
    height: 80%;
    display: grid;
    grid-template-rows: repeat(5, minmax(0, 1fr));
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }








</style>