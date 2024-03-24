<script setup>
import { ref, watch } from "vue"
import LoadingSpinner from "./LoadingSpinner.vue";
import Comment from './Comment.vue';
import { store } from '../stores/store'


const { comments, isLoaded } = defineProps(["comments", 'isLoaded'])
const emit = defineEmits(["add-comment"])


// watch(loggingInfo, () => {
//   log.value = loggingInfo
//   console.log(loggingInfo)
// })



</script>



<template>

  <div class="comment-section">
    <div class="available">
      <div class="title">
        <p>Comentarios</p>
        <p v-if="store.isLogged" @click="$emit('add-comment')">+</p>
      </div>
      
    <div v-if="!store.isLogging && !store.isLogged" class="not-available">
      <p>Los comentarios son exclusivos para los integrantes de USACH, ya que pueden contener
        información sensible de estudiantes y profesores.
      </p>
      <p>
        Inicia sesión para acceder a los comentarios de la comunidad!
      </p>
    </div>

    <div v-if="store.isLogged && !isLoaded" class="is-loading">
      <LoadingSpinner :hide-background="false" :height="150" :width="150" :indeterminate="true" :rotate="true" :rotation-duration="1.5" :fill-duration="1.8"></LoadingSpinner>
    </div>

    <div v-if="isLoaded" class="is-loaded">
        <div class="comment-container">
          <div v-if="comments.length == 0" class="no-comments">
            <p>Nadie ha comentado aún.</p>
            <p>Sé la primera persona en compartir su opinión y recomendaciones sobre el ramo!</p>
          </div>
          <Comment v-for="comment in comments" :comment="comment"></Comment>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .is-loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .is-loaded {
    width: 100%;
    height: 100%;
  }

  .comment-section {
    width: 100%;
    height: 100%;
  }

  .not-available {
    width: 100%;
    height: 100%;
  }

  .available {
    width: 100%;
    height: 100%;
  }

  .title {
    display: flex;
    justify-content: space-between;
    height: 15%;
  }

  .comment-container {
    display: grid;
    height: 85%;
    width: 100%;
    overflow-y: auto;
    grid-template-rows: repeat(1, minmax(0, 1fr));
    row-gap: 10px;
  }

  .no-comments {
    height: 100%;
    width: 100%;
  }

  p {
    font-size: 2rem;
    text-align: center;
    color: black
  }


</style>