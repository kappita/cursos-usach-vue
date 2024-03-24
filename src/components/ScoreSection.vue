<script setup>
import { watch, ref } from "vue"
import axios from "axios"
import CourseScore from "./CourseScore.vue";
import VotingForm from "./VotingForm.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import { store } from '../stores/store'

const { course, newscore } = defineProps(["course", "newscore"]) 
console.log(newscore)
defineEmits(["add-vote"])

const diffData = ref({})
const timeData = ref({})
const areScoresLoaded = ref(false)
const areVotesLoaded = ref(false)
const isLoaded = ref(false)
const canVote = ref(false)


axios.get(`https://osusachdb.ignacioladal.workers.dev/courseVote/byCourse/${course.id}`).then(e=>{
  const difficulty = {
    voteCount: e.data.payload.total_votes,
    scores: e.data.payload.difficulty
  }
  const time = {
    voteCount: e.data.payload.total_votes,
    scores: e.data.payload.time
  }

  diffData.value = difficulty
  timeData.value = time
  areScoresLoaded.value = true
  isLoaded.value = areScoresLoaded.value && areVotesLoaded.value
})

const updateScores = (newScore) => {
  areScoresLoaded.value = false
  const diff = diffData.value
  diff.scores.average = (diff.scores.average * diff.voteCount + newScore.difficulty_score) / (diff.voteCount + 1)
  diff.scores.scores[newScore.difficulty_score - 1].votes += 1
  diff.voteCount += 1
  const time = timeData.value
  time.scores.average = (time.scores.average * time.voteCount + newScore.time_score) / (time.voteCount + 1)
  time.scores.scores[newScore.time_score - 1].votes += 1
  time.voteCount += 1

  diffData.value = diff
  timeData.value = time
  areScoresLoaded.value = true
}


const canVoteBody = {
  course_id: course.id,
  token: store.value.jwt
}


axios.post("https://osusachdb.ignacioladal.workers.dev/courseVote/canVote", canVoteBody).then(e => {
  canVote.value = e.data.payload.can_vote
  areVotesLoaded.value = true
  isLoaded.value = areScoresLoaded.value && areVotesLoaded.value
}).catch(e => {
  areVotesLoaded.value = true
  isLoaded.value = areScoresLoaded.value && areVotesLoaded.value
})


console.log(newscore)

watch(newscore, () => {
  console.log("Scores updated")
  // updateScores(newscore)
})


</script>



<template>
  <div class="score-section">
    <div v-if="!isLoaded" class="loading">
      <LoadingSpinner :hide-background="false" :height="150" :width="150" :indeterminate="true" :rotate="true" :rotation-duration="1.5" :fill-duration="1.8"></LoadingSpinner>
    </div>
    <div v-if="isLoaded" class="loaded">
      <div class="stats">
        <div class="difficulty-stat">
          <CourseScore :data="diffData"></CourseScore>
        </div>
        <div class="time-stat">
          <CourseScore :data="timeData"></CourseScore>
        </div>
      </div>
      <div class="vote-form">
        <VotingForm @add-vote="$emit('add-vote')" :can-vote="canVote"></VotingForm>
      </div>
    </div>
  </div>



</template>


<style scoped>
  .score-section {
    height: 100%;
    width: 100%;
  }

  .loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .loaded {
    width: 100%;
    height: 100%;
  }

  .stats {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
  }
  .difficulty-stat {
    background-color: pink;
    width: 50%;
    height: 100%;
  }

  .time-stat {
    background-color: peru;
    width: 50%;
    height: 100%;
  }

  .vote-form {
    height: 30%;
    width: 100%;
    display: flex;
    justify-content: center;
  }


</style>