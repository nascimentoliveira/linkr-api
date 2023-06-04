![created date - linkr-api](https://img.shields.io/date/1671332400?color=007ec6&label=created&style=flat-square)
![license - linkr-api](https://img.shields.io/github/license/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![last commit - linkr-api](https://img.shields.io/github/last-commit/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![repo size - linkr-api](https://img.shields.io/github/repo-size/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![files - linkr-api](https://img.shields.io/github/directory-file-count/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![language - linkr-api](https://img.shields.io/github/languages/top/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![stars - linkr-api](https://img.shields.io/github/stars/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)
![forks - linkr-api](https://img.shields.io/github/forks/nascimentoliveira/linkr-api?color=007ec6&style=flat-square)

# API (Back-end) da aplicação **Linkr**

Esta é a API do Linkr, uma plataforma de rede social que permite aos usuários postar, compartilhar e descobrir links interessantes. Com o Linkr, os usuários podem criar contas, fazer login e começar a compartilhar seus próprios links junto com uma descrição ou comentário. Além disso, podem explorar e descobrir links compartilhados por outros usuários, seguir perfis de seu interesse e interagir por meio de curtidas e comentários. O Linkr fornece uma maneira fácil e intuitiva para os usuários compartilharem suas descobertas e se conectarem por meio de links relevantes e interessantes. Aqui você encontrará informações sobre a estrutura da API, como executá-la localmente, configurar as dependências e realizar as requisições corretamente.

> O código-fonte do front-end da aplicação está hospedado no GitHub em: [Linkr Front-end](https://github.com/nascimentoliveira/linkr)

> Linkr atualmente pode ser experimentado em: [Linkr Live Demo](https://nascimentoliveira-linkr.vercel.app)
>  
>> *A primeira requisição ao Live Demo pode levar um pouco mais de tempo para carregar. Isso ocorre porque os servidores são ativados conforme necessário e podem levar alguns instantes para iniciar!*

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
        JWT_SECRET=jwt_secret
        ```
    - Procure a variável `MODE` e defina-a a string `"prod"` para configurar o acesso remoto ao banco de dados com SSL. Exemplo:  
        ```bash
        MODE=prod
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
O servidor será iniciado na porta especificada no arquivo `.env` (por padrão, é a porta 4000).
  ```bash
  http://localhost:4000/api
  ```
ou 
  ```bash
  http://localhost:<porta_especificada>/api
  ```

## Endpoints

A documentação completa dos endpoints, incluindo detalhes sobre como usar cada rota, parâmetros e exemplos de resposta, está disponível na [documentação interativa](https://linkr-api-kbny.onrender.com/api/docs/) da API.

Recomendamos consultar a documentação para obter informações abrangentes sobre os endpoints e aproveitar ao máximo as funcionalidades oferecidas. A seguir estão os endpoints disponíveis nesta API.

```
GET /api/health
```
```
GET /api/docs
```
```
POST /api/auth
```
```
POST /api/users
```
```
*🔐 GET /api/users/search
```
```
*🔐 POST /api/posts
```
```
*🔐 GET /api/posts
```
```
*🔐 GET /api/posts/users/:userId
```
```
*🔐 PUT /api/posts/:postid
```
```
*🔐 DELETE /api/posts/:postId
```
```
*🔐 GET /api/hashtags
```
```
*🔐 GET /api/hashtags/:hashtag
```
```
*🔐 POST /api/comments/:postId
```
```
*🔐 POST /api/likes/:postId
```
```
*🔐 DELETE /api/likes/:postId
```
```
*🔐 POST /api/followers/:userId
```
```
*🔐 DELETE /api/followers/:userId
```

*🔐 *Rotas autenticadas com token JWT. Necessário logar na aplicação!*

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