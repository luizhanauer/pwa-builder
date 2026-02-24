<script setup lang="ts">
interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  modelValue: string;
  options: Option[];
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label class="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
      {{ label }}
    </label>
    
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="px-4 py-2.5 rounded-lg border border-surface-200 bg-white 
             focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 
             outline-none transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
    >
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>