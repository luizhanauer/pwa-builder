<script setup lang="ts">
import { useManifest } from '../../composables/useManifest';
import { ImageProcessor } from '../../core/services/ImageProcessor';

const { state } = useManifest();

/**
 * Processa o upload para um slot específico (Desktop ou Mobile).
 */
const handleUpload = async (event: Event, index: number, formFactor: string | undefined): Promise<void> => {
  const input = event.target as HTMLInputElement;
  
  if (!input.files) return;
  const file = input.files.item(0);
  if (!file) return;

  // Guard Clause de Segurança (Resolve o TS2532)
  // Garantimos ao TypeScript que o objeto no índice especificado realmente existe
  const targetScreenshot = state.screenshots[index];
  if (!targetScreenshot) return;

  try {
    // Define as dimensões exatas de ouro
    const isWide = formFactor === 'wide';
    const width = isWide ? 1000 : 600;
    const height = isWide ? 600 : 1000;
    
    // Redimensiona usando o nosso serviço Canvas com Crop to Fill
    const base64 = await ImageProcessor.resize(file, width, height);

    // Atualiza o estado reativo no objeto seguro
    targetScreenshot.src = base64;
    targetScreenshot.sizes = `${width}x${height}`;
    targetScreenshot.type = file.type;
    
  } catch (error) {
    console.error('Erro ao processar screenshot:', error);
    alert('Ocorreu um erro ao redimensionar a imagem.');
  } finally {
    input.value = ''; // Permite subir o mesmo ficheiro novamente se necessário
  }
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <legend class="text-sm font-bold text-slate-400 uppercase tracking-widest">
        Capturas de Tela
      </legend>
    </div>
    
    <p class="text-xs text-slate-500">
      As lojas exigem pelo menos uma imagem Paisagem (Computador) e uma Retrato (Telemóvel). 
      Clique nos blocos abaixo para fazer o upload. Nós cortamos no tamanho perfeito sem distorcer.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
      
      <div 
        v-for="(ss, index) in state.screenshots" 
        :key="index"
        class="flex flex-col gap-3"
      >
        <div class="flex justify-between items-center">
          <span class="text-xs font-bold text-slate-700">{{ ss.label }}</span>
          <span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono uppercase">
            {{ ss.form_factor }}
          </span>
        </div>

        <div 
          class="bg-surface-50 border-2 border-surface-200 rounded-2xl overflow-hidden flex items-center justify-center relative group transition-all hover:border-brand-300 shadow-sm"
          :class="ss.form_factor === 'wide' ? 'w-full aspect-[5/3]' : 'w-2/3 mx-auto aspect-[3/5]'"
        >
          <img 
            v-if="ss.src.startsWith('data:image')" 
            :src="ss.src" 
            class="w-full h-full object-cover"
            alt="Preview do Screenshot" 
          />
          
          <div v-else class="text-center p-4">
            <span class="block text-slate-300 font-bold mb-1 text-lg">
              {{ ss.form_factor === 'wide' ? '1000x600' : '600x1000' }}
            </span>
            <span class="text-[10px] text-slate-400 uppercase tracking-widest">Sem Foto</span>
          </div>

          <label class="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-[2px]">
            <span class="bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-lg shadow-xl">
              {{ ss.src.startsWith('data:image') ? 'Trocar Imagem' : 'Fazer Upload' }}
            </span>
            <input 
              type="file" 
              class="hidden" 
              accept="image/*" 
              @change="(e) => handleUpload(e, index, ss.form_factor)" 
            />
          </label>
        </div>
        
        <label class="cursor-pointer text-center text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 py-2.5 rounded-xl transition-colors md:hidden">
          Upload {{ ss.form_factor === 'wide' ? 'Paisagem' : 'Retrato' }}
          <input 
            type="file" 
            class="hidden" 
            accept="image/*" 
            @change="(e) => handleUpload(e, index, ss.form_factor)" 
          />
        </label>

      </div>
    </div>
  </div>
</template>