<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <p class="mt-1 text-xs text-slate-400 leading-relaxed italic">
    {{ text }}
  </p>
</template>