<script setup lang="ts">
import { useManifest } from '../../composables/useManifest';
import { ImageProcessor } from '../../core/services/ImageProcessor';

const { state } = useManifest();

/**
 * Recebe o ficheiro, valida e gera as resoluções obrigatórias
 * para o Lighthouse, substituindo o array inteiro.
 */
const handleMasterIconUpload = async (event: Event): Promise<void> => {
  const input = event.target as HTMLInputElement;
  
  if (!input.files) return;
  const file = input.files.item(0);
  if (!file) return;

  try {
    const base192 = await ImageProcessor.resize(file, 192, 192);
    const base512 = await ImageProcessor.resize(file, 512, 512);

    // Substitui o array incluindo a nova exigência do 512 maskable
    state.icons = [
      { src: base192, sizes: '192x192', type: file.type, purpose: 'any' },
      { src: base192, sizes: '192x192', type: file.type, purpose: 'maskable' },
      { src: base512, sizes: '512x512', type: file.type, purpose: 'any' },
      { src: base512, sizes: '512x512', type: file.type, purpose: 'maskable' }
    ];
  } catch (error) {
    console.error('Erro ao processar o ícone mestre:', error);
    alert('Ocorreu um erro ao redimensionar a imagem.');
  } finally {
    input.value = '';
  }
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <legend class="text-sm font-bold text-slate-400 uppercase tracking-widest">Ícones do App</legend>
      <label class="cursor-pointer bg-brand-500 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-brand-600 transition-all shadow-sm">
        + Upload Ícone Mestre
        <input type="file" class="hidden" accept="image/*" @change="handleMasterIconUpload" />
      </label>
    </div>
    
    <p class="text-xs text-slate-500">
      Faça o upload de uma imagem quadrada em alta resolução. Nós geramos os tamanhos 192x192 e 512x512 nos formatos normais e adaptativos (maskable) automaticamente.
    </p>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
      <div 
        v-for="(icon, index) in state.icons" 
        :key="index" 
        class="flex flex-col items-center gap-2"
      >
        <div class="w-full aspect-square rounded-2xl border-2 border-surface-200 bg-surface-50 flex items-center justify-center overflow-hidden shadow-sm transition-all hover:border-brand-300">
          
          <img 
            v-if="icon.src.startsWith('data:image')" 
            :src="icon.src" 
            class="w-full h-full object-cover" 
            alt="Preview do Ícone"
          />
          
          <span 
            v-else 
            class="text-slate-300 font-bold tracking-tighter"
            :class="icon.sizes === '512x512' ? 'text-xl' : 'text-sm'"
          >
            {{ icon.sizes }}
          </span>
          
        </div>
        
        <span class="text-[10px] text-slate-400 font-mono text-center uppercase tracking-wider">
          {{ icon.purpose }}
        </span>
      </div>
    </div>
  </div>
</template>