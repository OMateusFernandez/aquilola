# Mateus Fernandez Video Editor Portfolio

Portfolio profissional para editor de vídeo, criado com React, Vite, Tailwind CSS e Framer Motion.

O site foi feito para apresentar trabalhos long-form, shorts, clientes por país, seção sobre mim, contatos e Q&A.

Observação: o globo de clientes foi preservado em `src/components/ClientGlobe.jsx` e nos dados de `src/data/clientMarkets.js`, mas não aparece na página atual.

## Rodar localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor local:

```bash
npm run dev
```

Abra a URL mostrada no terminal. Normalmente será:

```txt
http://127.0.0.1:5173/
```

Se a porta `5173` estiver ocupada, o Vite pode abrir outra porta. Use sempre a URL exibida no terminal.

## Gerar build

Crie a versão de produção:

```bash
npm run build
```

A build final fica na pasta:

```txt
dist/
```

Para testar a build:

```bash
npm run preview
```

## Onde trocar os videos

Os links dos videos ficam em:

```txt
src/data/videoShowcase.js
```

Use links normais do YouTube, como `watch`, `youtu.be`, `embed` ou `shorts`. O site extrai o ID automaticamente e cria o player correto apenas quando a pessoa clica no thumbnail.

O player inline solicita 1080p por padrao quando disponivel e inicia com volume em 0%, subindo gradualmente ate 50%.

## Deploy em servidor comum

Depois de rodar:

```bash
npm run build
```

Envie todo o conteúdo da pasta `dist` para a pasta pública do seu servidor, como:

```txt
public_html/
www/
htdocs/
```

Importante: envie o conteúdo de `dist`, não a pasta `dist` inteira dentro do servidor.

## Deploy no GitHub Pages

Este projeto já está configurado com:

```js
base: './'
```

Isso evita tela branca quando o site é publicado em subpasta, como:

```txt
https://usuario.github.io/nome-do-repositorio/
```

Fluxo básico:

```bash
npm install
npm run build
```

Depois publique a pasta `dist` no GitHub Pages.

## Se aparecer tela branca

As causas mais comuns são:

- O servidor não encontrou os arquivos da pasta `assets`.
- O conteúdo da pasta `dist` foi enviado para o lugar errado.
- O site foi publicado em subpasta sem caminhos relativos.
- O servidor não reconheceu algum tipo de imagem, como `.avif`.

Este projeto já usa caminhos relativos, mas também existe uma versão alternativa de segurança:

```txt
single-file-build/index.html
```

Essa versão coloca CSS, JavaScript e imagens principais dentro de um único `index.html`.

Se a build normal der tela branca no servidor, suba o arquivo:

```txt
single-file-build/index.html
```

ou use o pacote:

```txt
mateus-fernandez-portfolio-single-index.zip
```

## Se as imagens não carregarem

A build inclui um arquivo:

```txt
.htaccess
```

Ele ajuda servidores Apache/cPanel a reconhecer arquivos `.avif`, `.webp` e rotas internas.

Quando subir o site, envie também esse arquivo. Alguns sistemas escondem arquivos que começam com ponto, então confirme se o `.htaccess` foi enviado junto com o `index.html`.

## Pacotes gerados

Build normal:

```txt
mateus-fernandez-portfolio-production.zip
```

Build em arquivo único:

```txt
mateus-fernandez-portfolio-single-index.zip
```

Prompt para preparar deploy no GitHub:

```txt
GITHUB_DEPLOY_PROMPT.md
```

## Estrutura principal

```txt
src/
  components/
    AboutMe.jsx
    ClientGlobe.jsx
    Contact.jsx
    CustomCursor.jsx
    Footer.jsx
    Header.jsx
    Hero.jsx
    TimelineDivider.jsx
    VideoShowcase.jsx
    WorkShowcase.jsx
  data/
    clientMarkets.js
    translations.js
    videoShowcase.js
  utils/
    assets.js
    safeLinks.js
    youtube.js
  App.jsx
  index.css
  main.jsx
```

## Segurança e otimização

O projeto inclui:

- CSP configurada.
- Headers de segurança no Vite.
- Links externos com `noopener noreferrer`.
- Imagens otimizadas.
- Build final testada com `npm run build`.
