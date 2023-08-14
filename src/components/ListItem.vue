<template>
  <li class="list-item">
    <CustomCheckbox
      :id="toDoItem.id"
      :checked="toDoItem.completed"
      @update-checked="handleCompletedUpdate"
    />
    <p
      class="item-content"
      :class="{ completed: toDoItem.completed }"
      @click="handleContentClick"
    >
      {{ toDoItem.content }}
    </p>
    <p class="time-created">{{ dateCreated }}</p>
    <div class="btn-controls">
      <button class="control-btn edit-btn" @click="editTask">
        <svg
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m19 20.25c0-.402-.356-.75-.75-.75-2.561 0-11.939 0-14.5 0-.394 0-.75.348-.75.75s.356.75.75.75h14.5c.394 0 .75-.348.75-.75zm-7.403-3.398 9.124-9.125c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-9.143 9.103c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 7.651-7.616 2.335 2.327-7.637 7.638z"
            fill-rule="nonzero"
          />
        </svg>
      </button>
      <button class="control-btn delete-btn" @click="deleteTask">
        <svg
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
            fill-rule="nonzero"
          />
        </svg>
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  EmitCompleteTaskType,
  ToDoItemType,
} from "../interfaces/todo.interface";
import CustomCheckbox from "./CustomCheckbox.vue";

type EmitsType = {
  (e: "toggleCompleteTaskStatus", value: EmitCompleteTaskType): void;
  (e: "editTask", value: number): void;
  (e: "deleteTask", value: number): void;
};

type PropsType = {
  toDoItem: ToDoItemType;
};

const props = defineProps<PropsType>();
const emit = defineEmits<EmitsType>();

const deleteTask = () => {
  emit("deleteTask", props.toDoItem.id);
};

const editTask = () => {
  emit("editTask", props.toDoItem.id);
};

const dateCreated = computed(() => {
  return new Date(props.toDoItem.id).toLocaleString();
});

const handleCompletedUpdate = (completed: boolean) => {
  emit("toggleCompleteTaskStatus", { id: props.toDoItem.id, completed });
};

const handleContentClick = () => {
  handleCompletedUpdate(!props.toDoItem.completed);
};
</script>

<style scoped>
.list-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.3rem 0.4rem;
  padding: 0.5rem 0.3rem;
  border-bottom: 1px solid var(--color);
  font-size: 1.1em;
}

.list-item .item-content {
  grid-column: 2 / span 3;
  grid-row: 2;
  text-align: start;
}

.list-item .item-content.completed {
  text-decoration: line-through;
}

.list-item .checkbox-block {
  grid-column: 1;
  grid-row: 2;
  text-align: start;
}

.list-item .time-created {
  grid-column: 1 / span 3;
  grid-row: 1;
  text-align: start;
  font-size: 0.7em;
  font-weight: 500;
  color: #999696;
}

.list-item .btn-controls {
  grid-column: 3;
  grid-row: 1;
  display: flex;
  gap: 0.4rem;
}

.list-item .btn-controls .control-btn {
  height: 24px;
  width: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.list-item .btn-controls .control-btn svg {
  fill: var(--color);
  transition: fill 0.2s linear;
}

.list-item .btn-controls .control-btn:hover svg {
  fill: #999696;
}
</style>
