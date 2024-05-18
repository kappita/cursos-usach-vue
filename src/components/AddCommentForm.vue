<script setup>
  import { Icon } from "@iconify/vue";
  import axios from "axios"
  import { ref } from "vue"
  import { store } from '../stores/store'

  const { course } = defineProps(["course"])
  const emit = defineEmits(['close-comment-form', 'comment-submited'])


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
      emit('comment-submited');
      emit('close-comment-form');
    })
  }

const onFormClose = () => {
  emit("close-comment-form");
}
</script>



<template>
  <div class="comment-form">
    <div class="comment-form-title">
      <p>Agregar comentario</p>
      <button @click="onFormClose">
        <Icon height="30" icon="ic:round-close" />
      </button>
    </div>
    
    <textarea v-model="comment" 
      type="text" placeholder="Tu comentario va aquí..."
      rows="10">
    </textarea>
    <div class="comment-form-btns">
      <button @click="onFormClose">
        Volver
      </button>
      <button @click="uploadComment">
        Comentar
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
.comment-form {
  width: 65%;
  height: 60%;
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

.comment-form-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment-form-body {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

textarea {
  border: 2px solid black;
  padding: 8px 16px;
  border-radius: 18px;
  resize: vertical;
}

.comment-form-btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.comment-form-btns button {
  border: 2px solid black;
  border-radius: 18px;

  padding: 10px 42px;

  font-weight: 700;
}

.comment-form-btns button:nth-child(1) {
  color: rgb(62, 152, 255);
  border: 2px solid rgb(62, 152, 255);
}

.comment-form-btns button:nth-child(1):hover {
  color: white;
  border: 2px solid rgb(62, 152, 255);
  background-color: rgb(62, 152, 255);
}

.comment-form-btns button:nth-child(2):hover {
  color: white;
  border: 2px solid black;
  background-color: black;
}
</style>