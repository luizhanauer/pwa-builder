<script setup lang="ts">
import { useManifest } from '../../composables/useManifest';
import BaseInput from '../inputs/BaseInput.vue';
import BaseSelect from '../inputs/BaseSelect.vue';

const { state } = useManifest();

/**
 * Opções rigorosamente tipadas para o modo de exibição (display mode)
 */
const displayOptions = [
  { value: 'standalone', label: 'Standalone (App Nativo)' },
  { value: 'minimal-ui', label: 'Minimal UI (Navegação Simples)' },
  { value: 'fullscreen', label: 'Tela Cheia (Jogos/Vídeos)' },
  { value: 'browser', label: 'Navegador Padrão' }
];
</script>

<template>
  <div class="space-y-6">
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseInput 
        label="Nome Completo" 
        v-model="state.name" 
        placeholder="Ex: Meu App Incrível" 
      />
      <BaseInput 
        label="Nome Curto" 
        v-model="state.short_name" 
        placeholder="Ex: MeuApp" 
        helper="Usado abaixo do ícone na tela inicial."
      />
    </div>

    <BaseInput 
      label="Descrição" 
      v-model="state.description" 
      placeholder="Descreva brevemente o que o seu aplicativo faz." 
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseInput 
        label="URL Inicial (start_url)" 
        v-model="state.start_url" 
        placeholder="/" 
        helper="Página aberta ao iniciar o PWA."
      />
      <BaseInput 
        label="Escopo (scope)" 
        v-model="state.scope" 
        placeholder="/" 
        helper="Limita a área de atuação do PWA. O padrão '/' abrange tudo."
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <BaseSelect 
        label="Modo de Exibição" 
        v-model="state.display" 
        :options="displayOptions" 
      />
      <BaseInput 
        label="Cor do Tema" 
        type="color" 
        v-model="state.theme_color" 
      />
      <BaseInput 
        label="Cor de Fundo" 
        type="color" 
        v-model="state.background_color" 
      />
    </div>

  </div>
</template>