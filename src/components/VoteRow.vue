<script setup>
import IconStar from "./icons/IconStar.vue";
import { ref, watch } from "vue";

const emit = defineEmits(['rating']);

const MAX_RATING = 5;
// f2ec36
const colorYellow = "#f2ec36";
const colorWhite = "rgb(255, 255, 255)";

const ratings = ref([
  ...Array(MAX_RATING)
  .fill({})
  .map((_, idx) => ({
    ratingNumber: idx + 1,
    seen: false,
    fill: colorWhite,
  }))
]);

const clickedStar = ref(false);

const restartStarFills = () => {
  if (clickedStar.value) {
    return;
  }

  for (let i = 0; i < MAX_RATING; i++) {
    ratings.value[i].fill = colorWhite;
  }
}

const onStarHover = (index) => {
  if (clickedStar.value) { 
    return;
  }

  for (let i = 0; i <= index; i++) {
    ratings.value[i].fill = colorYellow;
  }
}

const onStarClick = (index, ratingNumber) => {
  if (clickedStar.value) {
    clickedStar.value = false;
    restartStarFills();

    emit('rating', 0);
    return;
  }

  clickedStar.value = true;
  onStarHover(index);
  
  emit('rating', ratingNumber);
}

// watch(clickedStar, () => {
//   console.log(clickedStar.value);
// });

</script>


<template>
  <div class="stars-container" @mouseout="restartStarFills">
    <button v-for="(rating, index) in ratings" 
      @click="() => onStarClick(index, rating.ratingNumber)"
      @mouseover="() => onStarHover(index)">
      <IconStar :fill="rating.fill" />
    </button>
  </div>
</template>


<style scoped>
button {
  background: none;
  border: 0;
  cursor: pointer;
  font-size: inherit;
}

.stars-container {
  display: flex;
  gap: 16px;

  background-color: white;
}

</style>