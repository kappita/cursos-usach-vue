<script setup>
import { toRef } from 'vue';

const props = defineProps({
  isVisible: Boolean,
});

const isVisible = toRef(() => props.isVisible);

</script>

<template>
  <Teleport to="#modal">
    <div v-if="isVisible" class="modal">
      <slot></slot>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: absolute;       
  left: 0;                  
  top: 0;                   
  width: 100%;             
  height: 100vh;            
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>