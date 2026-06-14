# Prompt para build e deploy no GitHub

Use este prompt em uma conversa nova quando quiser preparar ou revisar o deploy do site no GitHub:

```text
Tenho um site React + Vite + Tailwind CSS chamado Mateus Fernandez Video Editor Portfolio.

Quero preparar a build de produção e publicar no GitHub Pages.

Tarefas:
1. Verifique se o projeto instala corretamente com npm install.
2. Rode npm run build e confirme que a pasta dist foi gerada sem erros.
3. Configure o projeto para GitHub Pages, se necessário.
4. Se o repositório for publicado em https://USUARIO.github.io/NOME-DO-REPOSITORIO/, ajuste o base no vite.config.js para "/NOME-DO-REPOSITORIO/".
5. Se o site for publicado em domínio próprio ou na raiz de um servidor, mantenha base como "/".
6. Crie ou revise um workflow do GitHub Actions para fazer deploy automático da pasta dist no GitHub Pages.
7. Garanta que assets, rotas e imagens funcionem após o deploy.
8. No final, explique exatamente quais comandos devo rodar e quais configurações ativar no GitHub.

Comandos esperados:
npm install
npm run build

O site deve continuar otimizado, responsivo e seguro.
```

Checklist rápido para deploy manual:

```bash
npm install
npm run build
```

Depois, envie o conteúdo da pasta `dist` para o servidor ou configure o GitHub Pages para publicar a build.
