<script setup> 

import { watch } from "vue"
import { store } from '../stores/store'


const { canVote } = defineProps(["canVote"])
defineEmits(['add-vote'])

</script>


<template>
  <div class="voting-form">
    <div v-if="!canVote" class="cant-vote">
      <p v-if="store.isLogged">Ya has votado por este curso</p>
      <p v-if="!store.isLogged">Debes iniciar sesión para votar</p>
    </div>
    <div v-if="canVote" class="can-vote">
      <button @click="$emit('add-vote')"> Votar </button>
    </div>
  </div>



</template>

<style scoped>

  .voting-form {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .cant-vote {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .can-vote {
    width: 100%;
    height: 100%;
  }

  .vote-row {
    height: 33%;
    width: 100%;
  }

  p {
    font-size: 3vh;
    color: black;
  }

  button {
    width: 80%;
    height: 33%;
  }
</style>