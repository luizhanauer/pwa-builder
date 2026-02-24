<script setup lang="ts">
import BasicSettings from './BasicSettings.vue';
import IconManager from './IconManager.vue';
import ScreenshotManager from './ScreenshotManager.vue';
</script>

<template>
  <div class="space-y-10">
    
    <section>
      <div class="flex items-center gap-3 mb-6">
        <span class="w-8 h-px bg-slate-200"></span>
        <legend class="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Dados do Aplicativo
        </legend>
        <span class="flex-1 h-px bg-slate-100"></span>
      </div>
      
      <BasicSettings />
    </section>

    <section>
      <div class="flex items-center gap-3 mb-6">
        <span class="w-8 h-px bg-slate-200"></span>
        <legend class="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Identidade Visual
        </legend>
        <span class="flex-1 h-px bg-slate-100"></span>
      </div>
      
      <IconManager />
    </section>

    <section>
      <div class="flex items-center gap-3 mb-6">
        <span class="w-8 h-px bg-slate-200"></span>
        <legend class="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Apresentação nas Lojas
        </legend>
        <span class="flex-1 h-px bg-slate-100"></span>
      </div>
      
      <ScreenshotManager />
    </section>

  </div>
</template>