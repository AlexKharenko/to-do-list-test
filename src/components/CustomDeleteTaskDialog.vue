<template>
  <teleport to="#modals">
    <transition name="dialog">
      <div class="dialog dialog-confirm" v-if="isDialogOpened">
        <div class="dialog-content">
          <header>
            <h3 class="dialog-header">
              Are you sure you want to delete this task?
            </h3>
          </header>

          <footer class="controls-block">
            <CustomButton
              btn-text="Delete"
              :danger="true"
              @button-clicked="confirmDelete"
            />
            <CustomButton btn-text="Сancel" @button-clicked="cancelDelete" />
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "./CustomButton.vue";

type EmitsType = {
  (e: "confirmDelete", value: number): void;
};

const emit = defineEmits<EmitsType>();

const isDialogOpened = ref(false);

const taskId = ref<number | null>(null);

const showDialog = (id: number) => {
  taskId.value = id;
  isDialogOpened.value = true;
};

const resetData = () => {
  taskId.value = null;
};

const confirmDelete = () => {
  if (!taskId.value) return closeDialog();
  const id = taskId.value;
  resetData();
  emit("confirmDelete", id);
};

const closeDialog = () => {
  isDialogOpened.value = false;
};

const cancelDelete = () => {
  resetData();
  closeDialog();
};

defineExpose({ closeDialog, showDialog });
</script>

<style scoped>
.dialog header {
  margin-bottom: 2rem;
}
.dialog .input-section {
  margin-bottom: 1rem;
}

.dialog .dialog-textarea {
  resize: none;
  display: flex;
  height: 150px;
  overflow-y: auto;
  width: auto;
  outline: none;
  width: 100%;
  border: solid 1px var(--color);
  border-radius: 3px;
  padding: 0.5rem 0.3rem;
}

.dialog .controls-block {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
