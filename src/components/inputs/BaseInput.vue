<script setup lang="ts">
defineProps<{
  label: string;
  modelValue: string;
  type?: string;
  placeholder?: string;
  helper?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

/**
 * Atualiza o valor garantindo a tipagem estrita do evento de input.
 */
const updateValue = (event: Event, emit: any) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label class="text-sm font-bold text-slate-700">{{ label }}</label>

    <div 
      v-if="type === 'color'" 
      class="relative flex items-center bg-surface-50 border-2 border-surface-200 rounded-xl overflow-hidden focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/20 transition-all shadow-sm"
    >
      <div class="h-10 w-12 shrink-0 border-r-2 border-surface-200 relative cursor-pointer">
        <input
          type="color"
          :value="modelValue"
          @input="(e) => updateValue(e, $emit)"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div 
          class="w-full h-full pointer-events-none" 
          :style="{ backgroundColor: modelValue }"
        ></div>
      </div>
      
      <input
        type="text"
        :value="modelValue"
        @input="(e) => updateValue(e, $emit)"
        maxlength="7"
        placeholder="#000000"
        class="flex-1 bg-transparent px-3 py-2 text-sm font-mono uppercase text-slate-700 outline-none"
      />
    </div>

    <input
      v-else
      :type="type || 'text'"
      :value="modelValue"
      @input="(e) => updateValue(e, $emit)"
      :placeholder="placeholder"
      class="bg-surface-50 border-2 border-surface-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 transition-all shadow-sm"
    />

    <span v-if="helper" class="text-xs text-slate-500 leading-relaxed">{{ helper }}</span>
  </div>
</template>