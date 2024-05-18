<script setup>
import { onMounted, onUnmounted, } from 'vue';

const props = defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["close-modal"]);

const scapePressedCb = (e) => {
  if (e.key == "Escape") {
    emit('close-modal');
  }
}

onMounted(() => {
  window.addEventListener('keydown', scapePressedCb);
});

onUnmounted(() => {
  window.removeEventListener('keydown', scapePressedCb);
});

const closeModal = () => {
  emit('close-modal');
}

</script>

<template>
  <Teleport to="#modal">
    <div v-if="isVisible" class="modal" @click.self="closeModal">
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