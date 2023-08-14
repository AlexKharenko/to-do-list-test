<template>
  <div class="input-block">
    <input
      class="custom-input"
      type="text"
      :placeholder="placeholder || 'Type here...'"
      :value="modelValue"
      @input="updateModelValue"
    />
  </div>
</template>

<script setup lang="ts">
type PropsType = {
  modelValue: string;
  placeholder?: string;
};

type EmitsType = {
  (e: "update:modelValue", value: string): void;
};

defineProps<PropsType>();
const emit = defineEmits<EmitsType>();

const updateModelValue = (event: Event) => {
  const element = event.target as HTMLInputElement;
  emit("update:modelValue", element.value);
};
</script>

<style scoped>
.input-block {
  display: flex;
  width: 100%;
  max-width: 500px;
  min-width: 150px;
}
.input-block .custom-input {
  height: inherit;
  width: inherit;
  border: none;
  border-bottom: solid 1px var(--color);
  padding: 0.3rem 0.5rem;
  font-size: 16px;
  width: auto;
  outline: none;
  width: 100%;
}
</style>
