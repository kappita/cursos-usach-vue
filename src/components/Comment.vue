<script setup>

  const { comment } = defineProps(["comment"])
  console.log(JSON.stringify(comment))
</script>


<template>
  <div class="comment">
    <div class="author">
      <img :src="comment.user_profile_img" alt="">
      <p>{{ comment.user_name }}</p>
    </div>
    <div class="content">
      <p>{{ comment.content }}</p>
    </div>
  </div>


</template>

<style scoped>
.comment {
  display:flex;
  flex-direction: column;
  gap: 8px;

  border-radius: 25px;
  background-color: antiquewhite;

  padding: 12px;
  padding-bottom: 16px;
  
  color: black;
}
  
.author {
  display: flex;
  gap: 10px;
}

.author p {
  font-weight: 500;
}
.content {
  border-radius: 50px;
  min-height: 10px;
}


img {
  width: 38px;
  height: 38px;
  object-fit: cover;
  border-radius: 100%;
}
</style>