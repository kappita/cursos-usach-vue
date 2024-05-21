<script setup>
import VoteRow from './VoteRow.vue';
import axios from 'axios'
import { ref, watch } from 'vue'
import { store } from '../stores/store'
import { Icon } from '@iconify/vue';

const { course } = defineProps(['course'])
const emit = defineEmits(['score-submited', 'close-vote-form'])

const diff_rate = ref(0);
const time_rate = ref(0);

const body = {
  token: store.value.jwt,
  vote: {
    course_id: course.id,
    difficulty_score: diff_rate.value,
    time_score: time_rate.value
  }
}



const sendVote = () => {
  console.log({ diff: diff_rate.value, time: time_rate.value });

  if (diff_rate.value == 0 || time_rate.value == 0) {
    return;
  }

  body.vote.difficulty_score = diff_rate.value
  body.vote.time_score = time_rate.value
  body.token = store.value.jwt,

  console.log(JSON.stringify(body))
  axios.post("https://osusachdb.ignacioladal.workers.dev/courseVote/addVote", body).then(e=> {
    const emitResponse = { difficulty_score: diff_rate.value, time_score: time_rate.value}
    emit('score-submited', emitResponse)
  }).catch(n => {
    console.log(n)
  })
}

  // watch(data, ()=> {
  //   body.token = data.jwt
  // })
const onFormClose = () => {
  emit("close-vote-form");
}

const formatStarString = (rated) => {
  if (rated != 1) return rated + " estrellas";
  return rated + " estrella";
}
</script>



<template>
  <div class="vote-form">
    <div class="title">
      <p>Calificar</p>
      <button @click="onFormClose">
        <Icon height="30" icon="ic:round-close" />
      </button>
    </div>
    <div class="vote-form-body">
      <div class="vote-row">
        <p class="row-title">La dificultad del ramo es...</p>
        <VoteRow @rating="n => diff_rate = n" />
        <p>{{ formatStarString(diff_rate) }}</p>
      </div>
      <div class="vote-row">
        <p class="row-title">¿Cuánto tiempo exige el ramo?</p>
        <VoteRow @rating="n => time_rate = n" />
        <p>{{ formatStarString(time_rate) }}</p>
      </div>
    </div>
    <div class="vote-form-btns">
      <button @click="onFormClose">
        Volver
      </button>
      <button @click="sendVote">
        Votar
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  background: none;
  border: none;
  cursor: pointer;
}

.vote-form {
  width: 65%;
  height: 70%;
  overflow-y: auto;
  padding: 16px 32px;

  border-radius: 16px;
  background-color: #fff;

  color: black;
  font-size: 2rem;

  z-index: 20;

  display: flex;
  flex-direction: column;
  gap: 22px;
}

.title {
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: space-between;
  padding-left: 3%;
  padding-right: 3%;
}


.vote-form-body {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 0px;
}

.vote-row {
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 1.5rem;
}


.vote-form-btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.vote-form-btns button {
  border-radius: 18px;

  padding: 10px 42px;

  font-weight: 700;
}

.vote-form-btns button:nth-child(1) {
  color: black;
  text-decoration: underline;
  text-underline-offset: 2.5px;
}

.vote-form-btns button:nth-child(2) {
  color: white;
  border: 2px solid rgb(62, 152, 255);
  background-color: rgb(62, 152, 255);

  transition: 90ms ease;
}


.vote-form-btns button:nth-child(1):hover {
  color: white;
  border: 2px solid black;
  background-color: black;
}

.vote-form-btns button:nth-child(2):hover {
  color: rgb(62, 152, 255);
  background-color: white;
}

@media (max-width: 565px) {
  .vote-form-btns {
    flex-direction: column;
    gap: 0.5rem;
  }

  .stars-container {
    flex-wrap: wrap;
    justify-content: center;
  }

  .stars-container button {
    flex: 0 0 33.3%;
  }
}
</style>