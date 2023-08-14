<template>
  <teleport to="#modals">
    <transition name="dialog">
      <div class="dialog" v-if="isOpened">
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

type PropsType = {
  isOpened: boolean;
};

type EmitsType = {
  (e: "saveChanges", value: EmitContentTaskType): void;
  (e: "cancelChanges", value: void): void;
};

defineProps<PropsType>();
const emit = defineEmits<EmitsType>();

const newText = ref("");
const taskId = ref<number | null>(null);

const setData = (task: ToDoItemType) => {
  taskId.value = task.id;
  newText.value = task?.content;
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

const cancelEditing = () => {
  resetData();
  emit("cancelChanges");
};

defineExpose({ setData });
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: #4d4c4cbd;
  backdrop-filter: blur(1px);
  z-index: 1000;
}
.dialog-content {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  background: var(--background-color);
  width: 50%;
  max-width: 300px;
  min-width: 220px;
}

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

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-active .dialog-content,
.dialog-leave-active .dialog-content {
  transition: translate 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .dialog-content,
.dialog-leave-to .dialog-content {
  opacity: 0;
  translate: -50%;
}
</style>
