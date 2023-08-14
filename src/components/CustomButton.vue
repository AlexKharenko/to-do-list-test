<template>
  <button
    class="custom-btn"
    :type="btnType ? btnType : 'button'"
    @click="handleBtnClicked"
  >
    {{ btnText }}
  </button>
</template>

<script setup lang="ts">
import { ButtonHTMLAttributes } from "vue";

type CustomBtnProps = {
  btnText: string;
  btnType?: ButtonHTMLAttributes["type"];
};

type CustomBtnEmits = {
  (e: "buttonClicked", value: void): void;
};

defineProps<CustomBtnProps>();
const emit = defineEmits<CustomBtnEmits>();

const handleBtnClicked = () => {
  emit("buttonClicked");
};
</script>

<style scoped>
.custom-btn {
  --btn-background-color: #007acc;
  --btn-color: #ffffffde;

  background: var(--btn-background-color);
  border: 2px solid var(--btn-background-color);
  border-radius: 3px;
  color: var(--btn-color);
  padding: 0.5rem 1rem;
  font-weight: 600;
  letter-spacing: 0.125em;
  transition: color, background 0.3s linear;
  cursor: pointer;
}

.custom-btn:hover {
  background: transparent;
  color: var(--btn-background-color);
}
</style>
