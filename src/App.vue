<script setup lang="ts">
import { ref } from 'vue';
import { useManifest } from './composables/useManifest';
import ManifestForm from './components/forms/ManifestForm.vue';
import CodePreview from './components/preview/CodePreview.vue';
import MobilePreview from './components/preview/MobilePreview.vue';
import { ZipExportService } from './core/services/ZipExportService';

const { state } = useManifest();
const activeTab = ref<'code' | 'visual'>('visual');

/**
 * Processa o estado atual, gera ficheiros e aciona o download do pacote ZIP.
 */
const downloadZip = async (): Promise<void> => {
  try {
    await ZipExportService.exportPwa(state);
  } catch (error) {
    console.error('Erro ao gerar ficheiro ZIP:', error);
    alert('Ocorreu um erro ao gerar o seu PWA. Verifique a consola.');
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-300 transition-colors duration-500">
    
    <header class="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm py-3">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <div class="flex items-center gap-3">
          <div 
            class="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-md transition-colors duration-500"
            :style="{ backgroundColor: state.theme_color }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <h1 class="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">
            PWA <span class="text-slate-400 font-normal">Builder</span>
          </h1>
        </div>
        
        <button 
          @click="downloadZip"
          class="group flex items-center gap-3 px-4 py-2.5 md:px-5 md:py-3 rounded-2xl transition-all hover:brightness-110 hover:shadow-lg active:scale-95 shadow-md"
          :style="{ backgroundColor: state.theme_color }"
        >
          <div class="hidden sm:flex bg-white/20 p-2 rounded-xl group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>
          
          <div class="flex flex-col items-start text-left">
            <span class="text-sm md:text-base font-bold text-white mb-0.5">Baixar PWA (.zip)</span>
            <span class="text-[9px] md:text-[10px] text-white/80 font-medium leading-tight max-w-[200px] md:max-w-[240px]">
              Baixe o exemplo padrão agora ou altere os formulários para customizar em tempo real.
            </span>
          </div>
        </button>

      </div>
    </header>

    <main class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
        
        <div class="lg:col-span-7 space-y-8 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
          <div class="space-y-2">
            <h2 class="text-2xl font-bold tracking-tight text-slate-800">
              Configure o seu PWA
            </h2>
            <p class="text-sm text-slate-500 leading-relaxed">
              Preencha os dados abaixo. O manifesto, o Service Worker e as imagens com as resoluções obrigatórias serão gerados automaticamente para garantir 100% de aprovação no Google Lighthouse.
            </p>
          </div>
          
          <hr class="border-slate-100" />
          
          <ManifestForm />
        </div>

        <aside class="lg:col-span-5 lg:sticky lg:top-28 self-start w-full flex flex-col gap-4 h-[600px] lg:h-[calc(100vh-9rem)]">
          
          <div class="flex bg-slate-200/60 p-1 rounded-lg shrink-0 w-fit mx-auto lg:mx-0">
            <button 
              @click="activeTab = 'visual'"
              class="px-6 py-2 rounded-md text-xs font-bold transition-all"
              :class="activeTab === 'visual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
            >
              Mockup Visual
            </button>
            <button 
              @click="activeTab = 'code'"
              class="px-6 py-2 rounded-md text-xs font-bold transition-all"
              :class="activeTab === 'code' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
            >
              JSON Manifest
            </button>
          </div>

          <div class="flex-1 min-h-0">
            <MobilePreview v-if="activeTab === 'visual'" />
            <CodePreview v-else />
          </div>

        </aside>

      </div>
    </main>
  </div>
</template>

<style>
html {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
  overscroll-behavior-y: none;
}
body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}
</style>