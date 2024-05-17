<script setup>
import {ref, watch} from "vue";
import { store } from './stores/store.js'
import CourseCard from "./components/CourseCard.vue";
import Filter from "./components/Filter.vue";
import FullCourseWindow from "./components/FullCourseWindow.vue";
import Modal from "./components/Modal.vue";
import FullCourse from "./components/FullCourse.vue";
import Profile from "./components/Profile.vue";
import SignInButton from "./components/SignInButton.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

import axios from "axios"

const profile = ref({})
const courses = ref([])
const seenCourses = ref([])
const search = ref("")
const isWatchingCourse = ref(false)
const currentCourse = ref({ id: null, name: null })


const closeCourse = () => isWatchingCourse.value = false;

watch(search, () => {
  seenCourses.value = courses.value.filter(e=> e.name.toLowerCase().includes(search.value.toLocaleLowerCase()))
}
)
const updateCourses = (newCourses) => {
  courses.value = newCourses;
  seenCourses.value = newCourses.filter(e=> e.name.toLowerCase().includes(search.value.toLocaleLowerCase()))
}

const filterByCareer = (careerId)=> {
  axios(`https://osusachdb.ignacioladal.workers.dev/courses/byCareer/${careerId}`).then(e=> updateCourses(e.data.payload))
}

const updateFullCourse = (course) => {
  isWatchingCourse.value = true
  currentCourse.value = course
}

const login = (user_profile, newCred) => {
  store.value.setIsLogged(true)
  store.value.setIsLogging(false)
  store.value.setJwt(newCred)
  profile.value = user_profile.payload
}

const updateLoggingInfo = (n) => {
  store.value.setIsLogging(n.h ? true : false) 
}

axios("https://osusachdb.ignacioladal.workers.dev/courses/1").then(e=> updateCourses(e.data.payload))

</script>


<template>
  <div class="screen">
    <header>
      <div class="logo">
        <h1>Cursos</h1>
        <input v-model="search" type="text" placeholder="Buscar...">
      </div>
      <SignInButton class="sign-in" v-if="!store.isLogged" @logged-in="(n, credential) => login(n, credential)" @logging-in="n => updateLoggingInfo(n)"></SignInButton>
      <Profile v-if="store.isLogged" :profile="profile"></Profile>
    </header>
    <Filter @select-career="(n) => filterByCareer(n)"></Filter>
    <div class="courses">
      <div class="courses-container">
        <CourseCard v-for="course in seenCourses" :key="course.id" :course="course" @select-course="n => updateFullCourse(n)"></CourseCard>
      </div>
    </div>
  </div>
  <!-- <FullCourseWindow v-if="isWatchingCourse" :course="currentCourse" @close-window="isWatchingCourse = false">
  </FullCourseWindow> -->
  <Modal :is-visible="isWatchingCourse" @close-modal="closeCourse">
    <FullCourse :course="currentCourse" @close-course="closeCourse" />
  </Modal>
</template>


<style scoped>

.screen {
  max-width: 65%;
  margin: 0 auto;
  height: 100vh;
}

.logo {
  display: flex
}

.courses {
  padding-left: 12px;
  padding-right: 12px;

  overflow-y: auto;
  height: 85%
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1%;
  padding-bottom: 1%;
  height: 10%;
  width: 100%;
}

header h1{
  font-weight: bold;
  margin-right: 30px;
}

header input {
  border: none;
  background-color: rgba(128, 128, 128, 0.1);
  padding: 10px;
  border-radius: 10px;
}


.courses-container {
  display: grid;
  justify-items: center;
  gap: 12px;

  margin-top: 20px;

  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  
}



</style>./components/FullCourseWindow.vue