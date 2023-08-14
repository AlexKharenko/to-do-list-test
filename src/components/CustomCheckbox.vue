<template>
  <div class="checkbox-block">
    <input
      type="checkbox"
      class="custom-checkbox"
      :value="checked"
      :checked="checked"
      :id="stringId"
      @change="handleUpdateChange"
    />
    <label
      :for="stringId"
      class="checkmark"
      :class="{ checked }"
      tabindex="0"
      @keydown.enter="handleKeyPress"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
        />
      </svg>
    </label>
  </div>
</template>

<script setup lang="ts">
type PropsType = {
  id: number;
  checked: boolean;
};

type EmitsType = {
  (e: "updateChecked", value: boolean): void;
};

const props = defineProps<PropsType>();
const emit = defineEmits<EmitsType>();

const stringId = `id${props.id}`;

const handleUpdateChange = (event: Event) => {
  const element = event.target as HTMLInputElement;
  emit("updateChecked", element.checked);
};

const handleKeyPress = (event: Event) => {
  const element = event.target as HTMLInputElement;
  element.click();
};
</script>

<style scoped>
.checkbox-block .custom-checkbox {
  display: none;
}

.checkbox-block .checkmark {
  height: 24px;
  width: 24px;
  border: 2px solid var(--color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s linear;
}

.checkbox-block .checkmark svg {
  height: 16px;
  width: 16px;
  fill: var(--color);
  transition: all 0.2s linear;
}

.checkbox-block .checkmark.checked {
  border-color: var(--success-color);
}

.checkbox-block .checkmark.checked svg {
  fill: var(--success-color);
}
</style>
