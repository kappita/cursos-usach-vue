<script setup>
import axios from 'axios';
import { store } from '../stores/store.js'
import { reactive, ref } from 'vue';
import CommentSection from './CommentSection.vue';
import AddCommentWindow from './AddCommentWindow.vue';
import ScoreSection from './ScoreSection.vue';
import AddVoteWindow from './AddVoteWindow.vue';


const { course } = defineProps(["course"])


const areCommentsLoaded = ref(false)
const isCommenting = ref(false)
const isVoting = ref(false)
const comments = ref([])
const randomReference = ref({difficulty_score: 0, time_score: 0, needs_update: false})


const updateScoreRef = (n) => {
  console.log("Updating score")
  isVoting.value = false
  randomReference.value.difficulty_score = n.difficulty_score
  randomReference.value.time_score = n.time_score
  // Se genera "un tick" de actualización
  randomReference.value.needs_update = true
  setTimeout(50, () => {
    randomReference.value.needs_update = false
    console.log("desactivado")
  })
}

const body = {
  token: store.value.jwt,
  course_id: course.id
}


const getComments = () => {
  areCommentsLoaded.value = false
  axios.post("https://osusachdb.ignacioladal.workers.dev/courseComment/getComments", body).then(e => {
    areCommentsLoaded.value = true
    comments.value = e.data.payload
  }).catch(e=> {
    areCommentsLoaded.value = true
  })
}


getComments()


</script>

<template>

  <div class="full-course">
    <div class="window">
      <AddCommentWindow v-if="isCommenting" @close-window="isCommenting = false" :course="course" @comment-submited="getComments()"></addCommentWindow>
      <AddVoteWindow v-if="isVoting" @close-window="isVoting = false" :course="course" @score-submited="n => updateScoreRef(n)"></AddVoteWindow>
      <header>
        <div class="title">
          <h1>{{ course.name }}</h1>
          <h3>{{ course.id }}</h3>
        </div>
        <div class="close-button">
          <h1 @click="$emit('close-window')">X</h1>
        </div>
      </header>
      <div class="scores">
        <ScoreSection :course="course" :newscore="randomReference" @add-vote="isVoting = true" ></ScoreSection>
      </div>

      <div class="comments">
        <CommentSection :comments="comments" :isLoaded="areCommentsLoaded" @add-comment="isCommenting = true">
        </CommentSection>

      </div>
    </div>

  </div>


</template>


<style scoped>
  .full-course {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgb(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .window {
    width: 50%;
    height: 85%;
    background-color: white;
    border-radius: 2%;
    padding: 0% 1%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }


  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: 15%;
    margin-top: 0;
    padding: 0% 0%;
    width: 100%
  }

  .title {
    height: 100%;
  }

  h1 {
    color: black;
    font-weight: bold;
    font-size: 2.5rem;
  }
  h3 {
    color: black
  }

  .close-button h1 {
    cursor: pointer;
  }

  .scores-container {
    width: 100%;
    height: 35%;
    display: flex;
    justify-content: center;
  }

  .scores {
    width: 80%;
    height: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  

  .vote-section {
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .vote-container {
    width: 70%;
    height: 100%;
  }


  .comments {
    height: 45%;
    width: 100%;
  }

</style>./AddCommentWindow.vue
