<script setup>
  import VoteRow from './VoteRow.vue';
  import axios from 'axios'
  import { ref, watch } from 'vue'
  import { store } from '../stores/store'


  const { course } = defineProps(['course'])
  const emit = defineEmits(['score-submited', 'close-window'])

  const diff_rate = ref(0)
  const time_rate = ref(0)

  const body = {
    token: store.value.jwt,
    vote: {
      course_id: course.id,
      difficulty_score: diff_rate.value,
      time_score: time_rate.value
    }
  }



  const sendVote = () => {
    if (diff_rate.value == 0 || time_rate.value == 0) {
      return
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

</script>



<template>
  <div class="add-vote">
    <div class="window">
      <div class="title">
        <p>Calificar</p>
        <p @click="$emit('close-window')">X</p>
      </div>
      <div class="can-vote">
        <div class="vote-row">
          <div class="row-title">
            <p> La dificultad del ramo</p>
          </div>
          <VoteRow @rating="n => diff_rate = n"></VoteRow>
        </div>
        <div class="vote-row">
          <div class="row-title">
            <p>Cuánto tiempo exige el ramo</p>
          </div>
          <VoteRow @rating="n => time_rate = n"></VoteRow>
        </div>
        <button @click="sendVote()"></button>
      </div>
    </div>
  </div>



</template>

<style scoped>

  .title {
    display: flex;
    width: 100%;
    height: 10%;
    justify-content: space-between;
    padding-left: 3%;
    padding-right: 3%;
  }


  .add-vote {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 40;
  }

  .window {
    width: 70%;
    height: 60%;
    border-radius: 25px;
    background-color: white;
    z-index: 20;
    padding: 1%;
  }


  .can-vote {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .vote-row {
    height: 33%;
    width: 80%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    font-size: 3vh;
    color: black;
  }

  button {
    width: 80%;
    height: 33%;
  }

  .row-title {
    height: 50%;
  }
</style>