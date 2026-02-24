<script setup lang="ts">
import { useManifest } from '../../composables/useManifest';

const { state } = useManifest();
</script>

<template>
  <header 
    class="bg-white border-b-2 transition-colors duration-500 py-4"
    :style="{ borderBottomColor: state.theme_color }"
  >
    <div class="container mx-auto px-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-2xl">🛠️</span>
        <h1 class="text-lg font-bold tracking-tight text-slate-800">
          PWA<span :style="{ color: state.theme_color }">Builder</span>
        </h1>
      </div>
      <div class="flex items-center gap-3">
        <div 
          class="w-3 h-3 rounded-full animate-pulse" 
          :style="{ backgroundColor: state.theme_color }"
        ></div>
        <span class="text-xs text-slate-500 font-medium uppercase tracking-widest">Live Mode</span>
      </div>
    </div>
  </header>
</template>