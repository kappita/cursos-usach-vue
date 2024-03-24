<script setup>

  const { comment } = defineProps(["comment"])
  console.log(JSON.stringify(comment))
</script>




<template>
  <div class="comment">
    <div class="details">
      <div class="author">
        <img :src="comment.user_profile_img" alt="">
        <p> {{ comment.user_name }}</p>
      </div>
      <div class="creation-date">
        <p>{{ comment.creation_date }}</p>
      </div>
    </div>
    <div class="content">
      <p> {{ comment.content }}</p>
    </div>
  </div>


</template>

<style scoped>

  .comment {
    width: 97%;
    height: 100%;
    padding: 1.5%;
    border-radius: 25px;
    background-color: antiquewhite;
  }

  .details {
    display: flex;
    justify-content: space-between;
    height: 30%;
    width: 100%;
  }
  
  .author {
    display: flex;
    align-items: center;
    height: 100%;
    width: 40%;
  }

  .content {
    border-radius: 50px;
    width: 100%;
    height: 70%;
  }


  p {
    width: 100%;
    height: 100%;
    color: black;
  }
  
  img {
    height: 100%;
    border-radius: 100%;
    margin-right: 3%;
  }
</style>