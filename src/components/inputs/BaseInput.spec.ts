import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from './BaseInput.vue';

describe('BaseInput.vue', () => {
  it('deve renderizar a label corretamente', () => {
    const wrapper = mount(BaseInput, {
      props: {
        label: 'Nome do App',
        modelValue: ''
      }
    });

    // Verifica se a label foi renderizada com o texto exato
    expect(wrapper.find('label').text()).toBe('Nome do App');
  });

  it('deve renderizar a mensagem de ajuda (helper) quando fornecida', () => {
    const wrapper = mount(BaseInput, {
      props: {
        label: 'Teste',
        modelValue: '',
        helper: 'Mensagem de ajuda'
      }
    });

    // Procura pela tag span que contém a classe text-xs (usada no helper)
    const helperSpan = wrapper.find('span.text-xs');
    expect(helperSpan.exists()).toBe(true);
    expect(helperSpan.text()).toBe('Mensagem de ajuda');
  });

  it('deve emitir o evento update:modelValue ao digitar no campo padrão', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        label: 'Nome',
        modelValue: ''
      }
    });

    // Encontra o input e simula a digitação
    const input = wrapper.find('input');
    await input.setValue('Meu Novo PWA');

    // Verifica se o evento foi emitido para o pai atualizar o v-model
    const emittedEvents = wrapper.emitted('update:modelValue');
    
    // Guard Clause para satisfazer o TypeScript estrito
    if (!emittedEvents) {
      throw new Error('O evento update:modelValue não foi emitido.');
    }

    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents[0]).toEqual(['Meu Novo PWA']);
  });

  it('deve renderizar a estrutura composta de seleção visual quando o type for "color"', () => {
    const wrapper = mount(BaseInput, {
      props: {
        label: 'Cor Primária',
        modelValue: '#ff0000',
        type: 'color'
      }
    });

    // Deve existir dois inputs na estrutura composta de cor (um type="color" e um type="text")
    const colorInput = wrapper.find('input[type="color"]');
    const textInput = wrapper.find('input[type="text"]');

    expect(colorInput.exists()).toBe(true);
    expect(textInput.exists()).toBe(true);
    
    // O valor deve refletir o HEX passado no modelValue
    expect((textInput.element as HTMLInputElement).value).toBe('#ff0000');
  });
});