<script setup lang="ts">
import { useManifest } from '../../composables/useManifest';

const { state, manifestJson } = useManifest();

/**
 * Copia o conteúdo atual do JSON para a área de transferência do utilizador.
 */
const copyToClipboard = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(manifestJson.value);
    alert('Manifesto copiado para a área de transferência! 🚀');
  } catch (error) {
    console.error('Falha ao copiar:', error);
    alert('Não foi possível copiar o código.');
  }
};
</script>

<template>
  <div 
    class="flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden border-2 transition-all duration-500 shadow-2xl"
    :style="{ borderColor: state.theme_color }" 
  >
    <div class="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-800">
      
      <div class="flex gap-1.5">
        <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
        <div 
          class="w-3 h-3 rounded-full transition-colors duration-500" 
          :style="{ backgroundColor: state.theme_color }"
        ></div>
      </div>
      
      <span class="text-xs font-mono text-slate-400">manifest.json</span>
      
      <button 
        @click="copyToClipboard"
        class="text-xs text-slate-200 bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-md transition-all active:scale-95 font-medium"
      >
        Copiar Código
      </button>
    </div>

    <div class="flex-1 p-6 overflow-auto 
                [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-thumb]:bg-slate-700 
                [&::-webkit-scrollbar-thumb]:rounded-full 
                [&::-webkit-scrollbar-track]:bg-transparent">
      <pre class="font-mono text-sm leading-relaxed text-blue-300 select-all"><code>{{ manifestJson }}</code></pre>
    </div>
  </div>
</template>