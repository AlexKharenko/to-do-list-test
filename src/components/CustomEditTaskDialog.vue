<template>
  <teleport to="#modals">
    <transition name="dialog">
      <div class="dialog dialog-prompt" v-if="isDialogOpened">
        <div class="dialog-content">
          <header>
            <h3 class="dialog-header">Edit task</h3>
          </header>
          <section class="input-section">
            <textarea
              class="dialog-textarea"
              v-model="newText"
              placeholder="Type here..."
            ></textarea>
          </section>
          <footer class="controls-block">
            <CustomButton btn-text="Save" @button-clicked="saveChanges" />
            <CustomButton btn-text="Сancel" @button-clicked="cancelEditing" />
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  EmitContentTaskType,
  ToDoItemType,
} from "../interfaces/todo.interface";
import CustomButton from "./CustomButton.vue";

type EmitsType = {
  (e: "saveChanges", value: EmitContentTaskType): void;
};

const emit = defineEmits<EmitsType>();

const isDialogOpened = ref(false);

const newText = ref("");
const taskId = ref<number | null>(null);

const showDialog = (task: ToDoItemType) => {
  taskId.value = task.id;
  newText.value = task?.content;
  isDialogOpened.value = true;
};

const resetData = () => {
  taskId.value = null;
  newText.value = "";
};

const saveChanges = () => {
  if (!taskId.value || !newText.value) return;
  const editedTask: EmitContentTaskType = {
    id: taskId.value,
    content: newText.value,
  };
  resetData();
  emit("saveChanges", editedTask);
};

const closeDialog = () => {
  isDialogOpened.value = false;
};

const cancelEditing = () => {
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
