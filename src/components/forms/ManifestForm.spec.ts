import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ManifestForm from './ManifestForm.vue';

// Removemos o vi.mock para usar o composable real e testar a integração de fato
describe('ManifestForm.vue', () => {
  it('deve sincronizar o input de texto com o estado do manifesto', async () => {
    const wrapper = mount(ManifestForm);
    
    // Encontramos o componente BaseInput de "Nome Completo"
    const nameInput = wrapper.findAllComponents({ name: 'BaseInput' })
      .find(c => c.props('label') === 'Nome Completo');

    if (!nameInput) {
      throw new Error('Input de Nome não encontrado');
    }

    // Simulamos a alteração disparada pelo input
    await nameInput.vm.$emit('update:modelValue', 'Novo Nome do PWA');

    // Agora, como estamos usando o estado real do Vue, 
    // o valor deve refletir a mudança após o próximo "tick" (já garantido pelo await acima)
    expect(nameInput.props('modelValue')).toBe('Novo Nome do PWA');
  });

  it('deve exibir a seção de ícones corretamente', () => {
    const wrapper = mount(ManifestForm);
    
    // Texto conforme o log de erro anterior
    expect(wrapper.text()).toContain('Ícones do App');
    expect(wrapper.text()).toContain('Faça o upload de uma imagem quadrada');
  });

  it('deve renderizar as configurações de cores', () => {
    const wrapper = mount(ManifestForm);
    
    const colorInputs = wrapper.findAllComponents({ name: 'BaseInput' })
      .filter(c => c.props('type') === 'color');

    // Background e Theme Color
    expect(colorInputs.length).toBeGreaterThanOrEqual(2);
  });
});