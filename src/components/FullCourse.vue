<script setup>
import axios from 'axios';
import { store } from '../stores/store.js'
import { onMounted, reactive, ref, toRef } from 'vue';
import CommentSection from './CommentSection.vue';
import AddCommentForm from './AddCommentForm.vue';
import ScoreSection from './ScoreSection.vue';
import AddVoteWindow from './AddVoteWindow.vue';
import { Icon } from "@iconify/vue";
import Modal from './Modal.vue';

const emit = defineEmits(["close-course"]);

const { course } = defineProps(["course"]);

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
  axios.post("https://osusachdb.ignacioladal.workers.dev/courseComment/getComments", body)
    .then(e => {
      if (!e.data.success) {
        areCommentsLoaded.value = false;
      } else {
        areCommentsLoaded.value = true;
        comments.value = e.data.payload;
      }
  }).catch(e => {
    console.error(e);
    areCommentsLoaded.value = false;
  })
}


const onCourseClose = () => {
  // isCommenting.value = false;
  // isVoting.value = false;

  emit("close-course");
}

const onCommentFormClose = () => {
  isCommenting.value = false;
}

onMounted(() => {
  getComments();
})

</script>

<template>
  <div class="course-modal">
    <AddVoteWindow v-if="isVoting" :course="course" @score-submited="n => updateScoreRef(n)"></AddVoteWindow>
    <header>
      <p class="title">
        <span>#{{ course.id }}</span>
        - {{ course.name }}
      </p>
      <button @click="onCourseClose">
        <Icon height="30" icon="ic:round-close" />
      </button>
    </header>
    <div class="scores">
      <ScoreSection :course="course" :newscore="randomReference" @add-vote="isVoting = true" ></ScoreSection>
    </div>

    <div class="comments">
      <CommentSection :comments="comments" 
        :isLoaded="areCommentsLoaded" 
        @add-comment="isCommenting = true"
      />
    </div>
  </div>
  <Modal :is-visible="isCommenting" @close-modal="onCommentFormClose">
    <AddCommentForm :course="course" 
      @close-comment-form="onCommentFormClose"
      @comment-submited="getComments" 
    />
  </Modal>
</template>


<style scoped>
  button {
    cursor: pointer;
    border: none;
    background: none;  
  }
  .course-modal {
    width: 70%;
    height: 85%;
    padding: 24px;


    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }


  header {
    width: 100%;
    margin-bottom: 25px;

    display: flex;
    justify-content: space-between;

    color: black;
    font-size: 1.8rem;
  }

  .title {
    height: 100%;
  }

  .title span {
    font-weight: 600;
  }

  h1 {
    color: black;
    font-weight: bold;
    font-size: 2.5rem;
  }
  h3 {
    color: black
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
