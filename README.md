### Sobre
Aplicação construída com **Next.js** que consome a [Star Wars API (SWAPI)](https://swapi.dev/).  
O projeto lista planetas do universo Star Wars, permitindo visualizar detalhes de cada planeta em uma página dedicada.

###  Funcionalidades

-  Lista de planetas ordenada alfabeticamente
-  Paginação com 10 itens por página
-  Busca de planetas por nome
-  Página de detalhes para cada planeta
-  Navegação entre páginas utilizando rotas do Next.js
-  Uso de server component para exibição da página de detalhes do planeta

---

###  Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)
- [Cypress](https://www.cypress.io/)

Por que escolhi Tailwind CSS?

- Escolhi usar Tailwind CSS em vez de SASS porque facilita muito meu trabalho:

- Consigo estilizar direto nas classes, sem criar arquivos CSS enormes.

- Mobile-first já vem “de fábrica”, sem precisar escrever várias media queries.

- Funciona bem com Next.js/React: ainda gera só o CSS que estou usando, deixando o site leve.

Por fim: é uma escolha bem viável para projetos pequenos, POCS e testes técnicos. Como não era um requisito obrigatório a utilização de SASS, achei que tailwind atenderia bem a proposta.

---

### Instruções para rodar o projeto localmente

```bash

1. Clone o repositório

2. Instale as dependências
Obs: utilize a versão do Node.js recomendada no arquivo `.nvmrc`
npm install
# ou
yarn install

3. Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
Acesse em: http://localhost:3000
```

### Rodar testes
```bash
Rodar testes unitários
npm run test

Rodar testes E2E
npm run test:e2e
