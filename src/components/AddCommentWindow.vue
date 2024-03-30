<script setup>
  import axios from "axios"
  import { ref } from "vue"
  import { store } from '../stores/store'

  const { course } = defineProps(["course"])
  const emit = defineEmits(['close-window', 'comment-submited'])
  const comment = ref("")

  const body = {
    token: store.value.jwt,
    comment: {
      course_id: course.id,
      content: comment.value,
      is_anonymous: false
    }
  }

  const uploadComment = () => {
    body.comment.content = comment.value
    axios.post("https://osusachdb.ignacioladal.workers.dev/courseComment/addComment", body).then(e => {
      console.log(e.data)
      emit('comment-submited')
      emit('close-window')
    })
  }

</script>



<template>
  <div class="add-comment">
    <div class="window">
      <div class="title">
        <p>Agregar comentario</p>
        <p @click="$emit('close-window')">X</p>
      </div>
      <div class="form">
        <input v-model="comment" type="text" placeholder="Tu comentario">
        <button @click="uploadComment()">
          Comentar
        </button>
      </div>
    </div>
  </div>

</template>

<style scoped>

  .add-comment {
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
    background-color: yellow;
    z-index: 20;
    padding: 1%;
  }

  .title {
    display: flex;
    width: 100%;
    height: 10%;
    justify-content: space-between;
    padding-left: 3%;
    padding-right: 3%;
  }

  .form {
    height: 90%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

  }

  input {
    width: 90%;
    height: 60%
  }

  p {
    font-size: 2rem;
    color: black;
  }

  button {
    margin-top: 5%;
    height: 10%;
    width: 20%;
  }
</style>