<template>
  <div class="wrapper">
    <h1 class="page-title">To Do List</h1>
    <form @submit.prevent="handleFormSubmit" class="add-todo-form">
      <CustomInput v-model="inputText" />
      <CustomButton btn-text="Add" btn-type="submit" />
    </form>

    <section class="tasks-section">
      <h3 class="section-title">Tasks</h3>
      <TransitionGroup name="task-list" class="task-list" tag="ul">
        <ListItem
          v-for="item in todoList"
          :key="item.id"
          :to-do-item="item"
          @toggle-complete-task-status="handleChangeTaskStatus"
          @delete-task="handleDeleteTask"
          @edit-task="handleEditTask"
          v-if="todoList.length > 0"
        />
        <p class="no-tasks" v-else key="0">No tasks yet😉</p>
      </TransitionGroup>
    </section>
  </div>
  <CustomEditTaskDialog ref="dialogEditRef" @save-changes="saveChanges" />
  <!-- <CustomDeleteTaskDialog
    ref="dialogDeleteRef"
    @save-changes="saveChanges"
    @cancel-changes="closeDialod"
  /> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import {
  EmitCompleteTaskType,
  EmitContentTaskType,
  ToDoItemType,
} from "./interfaces/todo.interface";

import CustomInput from "./components/CustomInput.vue";
import CustomButton from "./components/CustomButton.vue";
import ListItem from "./components/ListItem.vue";
import CustomEditTaskDialog from "./components/CustomEditTaskDialog.vue";

const inputText = ref("");
const dialogEditRef = ref<InstanceType<typeof CustomEditTaskDialog>>();

const todoList = useStorage<ToDoItemType[]>("todoList", []);

const handleFormSubmit = () => {
  const newTask = createNewTask();
  if (!newTask) return;
  todoList.value.unshift(newTask);
  inputText.value = "";
};

const createNewTask = (): ToDoItemType | null => {
  if (!inputText.value) return null;
  const newTask: ToDoItemType = {
    id: Date.now(),
    content: inputText.value,
    completed: false,
  };
  return newTask;
};

const handleChangeTaskStatus = (value: EmitCompleteTaskType): void => {
  const taskIndex = todoList.value.findIndex((task) => task.id === value.id);
  if (taskIndex === -1) return;
  todoList.value[taskIndex].completed = value.completed;
};

const handleDeleteTask = (id: number): void => {
  todoList.value = todoList.value.filter((task) => task.id !== id);
};

const handleEditTask = (id: number): void => {
  const foundTask = todoList.value.find((task) => task.id === id);
  if (!foundTask) {
    return;
  }
  dialogEditRef.value?.showDialog(foundTask);
};

const saveChanges = (value: EmitContentTaskType) => {
  const taskIndex = todoList.value.findIndex((task) => task.id === value.id);
  if (taskIndex === -1) return;
  todoList.value[taskIndex].content = value.content;
  dialogEditRef.value?.closeDialog();
};
</script>

<style scoped>
.wrapper {
  position: relative;
  min-height: inherit;
  width: 100%;
  padding: 2rem;
  overflow: hidden;
}

.wrapper .page-title {
  margin-bottom: 1rem;
}

.wrapper .add-todo-form {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.wrapper .section-title {
  margin-bottom: 1rem;
}
.wrapper .tasks-section .task-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
}

.task-list-move,
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.4s ease;
  translate: 0;
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  translate: 0 -30px;
}

.task-list-leave-active {
  position: absolute;
  width: calc(100% - 4rem);
}
</style>
