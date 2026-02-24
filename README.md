# 🛠️ PWA Builder

Uma ferramenta de engenharia de software robusta para geração automatizada de manifestos PWA, Service Workers resilientes e processamento de assets (ícones e screenshots) diretamente no navegador.

Este projeto foi construído seguindo princípios de **Clean Architecture**, **DDD (Domain-Driven Design)** e **Object Calisthenics**, garantindo um código altamente testável e de fácil manutenção.



## 🚀 Funcionalidades

- **Geração de Manifest**: Criação completa do `manifest.json` seguindo os padrões W3C.
- **Service Worker Inteligente**: Estratégia de cache offline com proteção contra consumo de streams e suporte a esquemas não-HTTP.
- **Processamento de Imagem**: Algoritmo de *Crop-to-Fill* nativo (Canvas API) para evitar distorções em ícones e screenshots.
- **SEO Otimizado**: Geração de `index.html` semântico com tags `<main>` e metadados de acessibilidade.
- **Exportação ZIP**: Empacotamento instantâneo de todos os assets e arquivos de configuração.

## 🏗️ Arquitetura e Boas Práticas

O projeto foi estruturado para separar as preocupações de UI da lógica de negócio:

* **`/src/core/services`**: Camada de domínio contendo os geradores e processadores (Pure TS).
* **`/src/composables`**: Gestão de estado reativo e lógica de aplicação.
* **`/src/components`**: Componentes de interface modulares e reutilizáveis.
* **Modo Estrito (TypeScript)**: 100% de cobertura de tipos, garantindo segurança em tempo de compilação.

## 🧪 Qualidade de Software (Testes)

O projeto possui uma suite de testes abrangente utilizando **Vitest** e **JSDOM**, cobrindo desde cálculos matemáticos de imagem até a reatividade da interface.

### Camadas de Teste:
1.  **Unitários**: Validação dos serviços de geração (HTML, SW, ZIP).
2.  **Mocking de DOM**: Simulação de APIs de navegador (Canvas, Blobs, Anchors) para testes de ambiente Node.
3.  **Integração**: Validação da reatividade entre `useManifest` e componentes Vue.

Para rodar os testes:
```bash
npm run test
```

## 🛠️ Tecnologias Utilizadas

* **Framework**: [Vue 3 (Composition API)](https://vuejs.org/)
* **Linguagem**: [TypeScript (Strict Mode)](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
* **Testes**: [Vitest](https://vitest.dev/) & [Vue Test Utils](https://test-utils.vuejs.org/)
* **Manipulação de Arquivos**: [JSZip](https://stuk.github.io/jszip/)

## 📦 Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/luizhanauer/pwa-builder.git

cd pwa-builder
```


2. Instale as dependências:
```bash
npm install
```


3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```


4. Gere a versão de produção:
```bash
npm run build
```



## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões para melhorar a aplicação, sinta-se à vontade para abrir uma issue ou enviar um pull request.

Se você gostou do meu trabalho e quer me agradecer, você pode me pagar um café :)

<a href="https://www.paypal.com/donate/?hosted_button_id=SFR785YEYHC4E" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 150px !important;" ></a>

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.