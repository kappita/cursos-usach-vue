<script setup>
  import {defineProps} from "vue";
  import { Icon } from "@iconify/vue";

  const { course } = defineProps(["course"])
  let diff_mean = `${course.difficulty_mean.toFixed(1)}/5`;
  let time_mean = `${course.time_demand_mean.toFixed(1)}/5`;
  if (course.vote_count == 0) {
    diff_mean = "Sin votos";
    time_mean = "Sin votos";
  } 
</script>


<template>
  <div class="card" @click="$emit('select-course', course)">
    <div class="card-title">
      <p style="font-weight: 700;">#{{ course.id }}</p>
      <p>{{ course.name }}</p>
    </div>
    <div class="card-scores">
      <div title="Dificultad promedio" class="card-score">
        <Icon height="25" icon="ri:puzzle-line" />
        <p>{{ diff_mean }}</p>
      </div>
      <div title="Demanda de tiempo promedio" class="card-score">
        <Icon height="25" icon="ion:time-outline" />
        <p>{{ time_mean }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  padding: 15px 20px;
  
  background-color: #171420;
  
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  cursor: pointer;
}

.card-title {
  font-size: 18px;
  text-align: center;
}

.card-scores {
  display: flex;
  justify-content: space-around;

  font-family: 15px;
}

.card-score {
  display: flex;
  gap: 8px;

  align-items: center;
  justify-content: center;

  letter-spacing: 2px;
}


</style>