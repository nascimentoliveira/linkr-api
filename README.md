![created date - linkr-api](https://img.shields.io/date/1671332400?color=007ec6&label=created&style=flat-square)
![license - linkr-api](https://img.shields.io/github/license/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![last commit - linkr-api](https://img.shields.io/github/last-commit/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![repo size - linkr-api](https://img.shields.io/github/repo-size/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![files - linkr-api](https://img.shields.io/github/directory-file-count/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![language - shlinkrortly-api](https://img.shields.io/github/languages/top/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![stars - linkr-api](https://img.shields.io/github/stars/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![forks - linkr-api](https://img.shields.io/github/forks/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)

# API (Back-end) da Aplicação Linkr

Aqui você encontrará informações sobre a estrutura da API, como executá-la localmente, configurar as dependências e realizar as requisições corretamente.

> O código-fonte do front-end da aplicação está hospedado no GitHub em: [Linkr Front-end](https://github.com/nascimentoliveira/linkr)

> Linkr atualmente pode ser experimentado em: [Linkr Live Demo](https://nascimentoliveira-linkr.vercel.app)

## Tecnologias Utilizadas

A API da aplicação Linkr foi desenvolvido utilizando as seguintes tecnologias:

- Linguagem de Programação: [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference).

- [Node.js](https://nodejs.org/en/about): Plataforma de desenvolvimento JavaScript assíncrona baseada no motor V8 do Chrome.
- [Express](https://expressjs.com/pt-br/): Framework web rápido e minimalista para Node.js.
- [Dotenv](https://www.npmjs.com/package/dotenv): Pacote para carregar variáveis de ambiente a partir de um arquivo .env.
- [Bcrypt](https://www.npmjs.com/package/bcrypt): Biblioteca para criptografia de senhas.
- [Joi](https://joi.dev/): Biblioteca para validação de dados.
- [JWT](https://www.npmjs.com/package/jsonwebtoken): Biblioteca para geração e validação de tokens de autenticação.
- [Url Metadata](https://www.npmjs.com/package/url-metadata): Módulo para extrair metadados de uma URL, como título, descrição e imagem.
- [PostgreSQL](https://www.postgresql.org/about/): Sistema de gerenciamento de banco de dados relacional.


Essas tecnologias foram escolhidas para proporcionar uma experiência de desenvolvimento moderna, eficiente e escalável.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu computador:
-   Node.js (versão 14 ou superior)
-   NPM (versão 7 ou superior)

## Instalação

Siga as etapas abaixo para instalar, configurar e executar a API localmente:

1. Clone o repositório do projeto:
    ```bash
    git clone https://github.com/nascimentoliveira/linkr-api.git
    ```
2. Acesse o diretório do projeto:
    ```bash
    cd linkr-api
    ```
3. Instale as dependências do projeto:
    ```bash
    npm install
    ```
4. Configure as variáveis de ambiente:  
    Antes de executar a aplicação, é necessário configurar as variáveis de ambiente corretamente. Siga os passos abaixo:
    -  Renomeie o arquivo `.env.example` para `.env`:
        ```bash
        mv .env.example .env
        ```
    - Abra o arquivo `.env` em um editor de texto.
    - Procure a variável `DATABASE_URL` e defina-a com as configurações de acesso ao banco de dados. Exemplo:  
        ```bash
        DATABASE_URL=postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public
        ```
    - Procure a variável `JWT_SECRET` e defina-a com privada de encriptação. Exemplo:  
        ```bash
        JWT_SECRET="jwt_secret"
        ```
    - Procure a variável `MODE` e defina-a a string `"prod"` para configurar o acesso remoto ao banco de dados com SSL. Exemplo:  
        ```bash
        MODE="prod"
        ```
    - Verifique se existem outras variáveis de ambiente necessárias para o funcionamento da aplicação e defina-as de acordo com a sua configuração.
    - Salve o arquivo `.env`.
    
    *Certifique-se de não compartilhar o arquivo `.env` contendo informações sensíveis, como senhas, chaves de API ou tokens de acesso. Mantenha-o seguro e fora do controle de versão do seu repositório.*

    Após configurar as variáveis de ambiente, a aplicação estará pronta para ser executada.

## Executando a API

Após a configuração, você pode iniciar a API executando o seguinte comando:
  ```bash
  npm start
  ```
A API será iniciada e estará pronta para receber requisições.

## Endpoints*

**Uma descrição detalhada desssa seção está sendo construída!*

**Os endpoints estão sendo refatorados!**

A API do Shortly possui os seguintes endpoints disponíveis:

```
POST /auth
```

```
POST /users
```

```
GET /users/search
```

```
POST /posts
```

```
GET /posts
```

```
GET /posts/users/:id
```

```
PUT /posts/:id
```

```
DELETE /posts/:id
```

```
GET /hashtags
```

```
GET /hashtags/:hashtag
```

```
POST /comments
```

```
GET /comments
```

```
POST /likes/:postId
```

```
GET /likes/:postId
```

```
DELETE /likes/:postId
```

```
POST /followers/:userId
```

```
DELETE /followers/:userId
```

## Contribuição

Se você deseja contribuir para o projeto, siga os passos abaixo:

1. Faça um `fork` do repositório.
2. Crie uma nova `branch` com a sua contribuição: 
    ```bash
    git checkout -b <sua-contribuicao>
    ```
3. Faça as suas modificações  no código.
4. Faça `commit` das suas alterações:
    ```bash
    git commit -m "Sua contribuição"
    ```
5. Envie as alterações para o repositório remoto: .
    ```bash
    git push origin <sua-contribuicao>
    ```
6. Abra um `pull request` no repositório original, descrevendo as modificações realizadas.

Se te ajudei de alguma forma, ficarei feliz em saber. Se possível:  
⭐️ dê uma estrela para este projeto; e   
🪲 Encontre e relate `issues`

## Licença

Este projeto é licenciado sob a licença [MIT](https://choosealicense.com/licenses/mit/). Consulte o arquivo LICENSE para obter mais informações.

Disponibilizado por [Thiago Oliveira](https://www.linkedin.com/in/nascimentoliveira/).