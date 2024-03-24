<script setup>
  import {defineProps} from "vue"

  const { course } = defineProps(["course"])
  let diff_mean = `${course.difficulty_mean}/5`;
  let time_mean = `${course.time_demand_mean}/5`;
  if (course.vote_count == 0) {
    diff_mean = "Sin votos"
    time_mean = "Sin votos"
  } 
</script>


<template>
  <div class="card" @click="$emit('select-course', course)">
    <div class="card-text">
      <h2>{{ course.id }}</h2>
      <h2>{{course.name}}</h2>
    </div>
    <div class="card-scores">
      <h2>{{ diff_mean}}</h2>
      <h2>{{ time_mean }}</h2>
    </div>
  </div>



</template>


<style scoped>

.card {
  width: 310px;
  overflow: hidden;
  border-radius: 2%;
  box-shadow: 1px 1px 10px rgb(0,0,0,0.1);
  margin-bottom: 35px;
  margin-right: 20px;
  cursor: pointer;
  display: flex;
}

.card img {
  width: 100%;
  height: 190px;
  margin: 0;
}

.card .card-text {
  padding: 0 5px;
  width: 90%;
}

.card .card-text h2 {
  font-weight: bold;
  text-align: center;
}
.card .card-scores h2 {
  height: 50%;
  text-align: center;
  text-align: justify;
}


</style>