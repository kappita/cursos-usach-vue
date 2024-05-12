<script setup>
import axios from "axios"
import {ref, watch} from "vue"

defineEmits(['select-career'])

const faculty = ref("")
const faculties = ref([])
const allFaculties = axios("https://osusachdb.ignacioladal.workers.dev/faculties/allFaculties").then(e=> faculties.value = e.data.payload)
const careers = ref([])
const career = ref("")

const getCareers = () => {
  axios(`https://osusachdb.ignacioladal.workers.dev/careers/byFaculty/${faculty.value}`).then( e=> careers.value = e.data.payload)
}

watch(faculty, e => {
  console.log(faculty.value)
  getCareers()
})

</script>




<template >
  <div class="selectors-parent">
    <select class="selector" v-model="faculty" >
      <option disabled value="">Facultad</option>
      <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
    </select>
    <select class="selector" v-model="career" @change="$emit('select-career', career)">
      <option disabled value="">Carrera</option>
      <option v-for="career in careers" :key="career.id" :value="career.id">{{ career.id }} - {{ career.name }}</option>
    </select>
  </div>



</template>


<style scoped>
.selectors-parent {
  display: flex;
  gap: 8px;
}

.selector {
  width: 50%;
  height: 38px;
  padding-left: 12px;
}

.selector option {
  max-width: 100%;
  text-overflow: ellipsis;
  
  font-size: 15px;
}
</style>