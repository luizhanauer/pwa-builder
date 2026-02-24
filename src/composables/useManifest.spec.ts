import { describe, it, expect } from 'vitest';
import { useManifest } from './useManifest';

describe('useManifest Composable', () => {
  it('deve inicializar com as propriedades relativas padrão (start_url e scope)', () => {
    const { state } = useManifest();
    
    expect(state.start_url).toBe('./');
    expect(state.scope).toBe('./');
    expect(state.name).toBe('Meu App Progressivo');
  });

  it('deve adicionar um novo ícone vazio ao estado', () => {
    const { state, addIcon } = useManifest();
    const initialLength = state.icons.length;
    
    addIcon();
    
    expect(state.icons.length).toBe(initialLength + 1);
    expect(state.icons[state.icons.length - 1]?.sizes).toBe('512x512');
  });

  it('deve remover um ícone pelo índice', () => {
    const { state, removeIcon } = useManifest();
    const initialLength = state.icons.length;
    
    // Remove o primeiro ícone do array
    removeIcon(0);
    
    expect(state.icons.length).toBe(initialLength - 1);
  });
});