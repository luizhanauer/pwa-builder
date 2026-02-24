<script setup lang="ts">
import { computed } from 'vue';
import { useManifest } from '../../composables/useManifest';

const { state } = useManifest();

/**
 * Procura um ícone já carregado pelo utilizador para exibir no centro do ecrã.
 * Dá prioridade ao ícone 'any' genérico.
 */
const activeIcon = computed<string | undefined>(() => {
  const icon = state.icons.find((i) => i.src.startsWith('data:image') && i.purpose === 'any');
  return icon ? icon.src : undefined;
});

/**
 * Retorna a inicial do nome curto para o fallback visual caso não haja ícone.
 */
const fallbackLetter = computed<string>(() => {
  return state.short_name.charAt(0).toUpperCase() || 'P';
});
</script>

<template>
  <div class="flex items-center justify-center h-full w-full bg-slate-100/50 rounded-xl border-2 border-slate-200 border-dashed p-6">
    
    <div class="relative w-[280px] h-[580px] bg-white border-[14px] border-slate-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ring-4 ring-slate-900/10">
      
      <div class="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
        <div class="w-32 h-6 bg-slate-900 rounded-b-2xl"></div>
      </div>

      <div 
        class="h-12 w-full flex items-end justify-between px-6 pb-2 transition-colors duration-500 shrink-0 z-40"
        :style="{ backgroundColor: state.theme_color }"
      >
        <span class="text-[10px] font-bold text-white drop-shadow-md">9:41</span>
        <div class="flex items-center gap-1.5 opacity-90">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16"><path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5H11V2z"/></svg>
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 16 16"><path d="M2 6h5v8H2V6zm7-4h5v12H9V2z"/></svg>
        </div>
      </div>

      <div 
        v-if="state.display === 'browser' || state.display === 'minimal-ui'"
        class="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center gap-2 shrink-0 z-30"
      >
        <div class="flex gap-2 text-slate-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          <svg v-if="state.display === 'browser'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
        
        <div class="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex items-center justify-center">
          <span class="text-[10px] text-slate-500 font-mono truncate max-w-[120px]">
            {{ state.start_url || 'https://seu-app.com' }}
          </span>
        </div>
      </div>

      <div 
        class="flex-1 flex flex-col items-center justify-center relative transition-colors duration-500"
        :style="{ backgroundColor: state.background_color }"
      >
        <div 
          class="w-24 h-24 flex items-center justify-center relative transition-all duration-300"
          :class="activeIcon ? 'drop-shadow-2xl' : 'bg-white rounded-2xl shadow-lg overflow-hidden'"
        >
          <img 
            v-if="activeIcon" 
            :src="activeIcon" 
            class="w-full h-full object-contain z-10" 
            alt="Ícone Mestre"
          />
          <span 
            v-else 
            class="text-4xl font-bold tracking-tighter mix-blend-difference text-white/50 z-10"
          >
            {{ fallbackLetter }}
          </span>
        </div>
        
        <span 
          class="mt-6 font-bold tracking-tight text-lg mix-blend-difference text-white"
        >
          {{ state.short_name }}
        </span>
      </div>

      <div class="absolute bottom-2 inset-x-0 flex justify-center z-50">
        <div class="w-32 h-1 bg-slate-900/20 rounded-full mix-blend-difference"></div>
      </div>
      
    </div>
  </div>
</template>