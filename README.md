<h1 align="center">
    <img alt="Meetapp" src=".github/logo.svg" width="150px" />
</h1>

<h3 align="center">
    Projeto desenvolvido para a certificação do <a href="https://rocketseat.com.br/bootcamp">Bootcamp GoStack 8.0</a>. :rocket:
</h3>

### Mobile

[![Mobile](.github/screenshots/mobile/all.svg)](.github/screenshots/mobile 'Mobile screenshots')

### Web

[![Web](.github/screenshots/web/all.svg)](.github/screenshots/web 'Web screenshots')

Para acessar a demo web <a href="https://www.meetapp-bootcamp.tk" target="_blank">clique aqui</a>.

---

## Configuração do ambiente de desenvolvimento

### Pré-requisitos

-   [NodeJS](https://nodejs.org)
-   [Yarn](https://yarnpkg.com)
-   [Docker](https://www.docker.com/docker-community)
-   [Android SDK](https://developer.android.com/studio)

## Backend

### Configurando containers docker

```bash
# Criando container postgres do docker.
docker run --name database-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

# Criando container redis do docker.
docker run --name database-redis -p 6379:6379 -t -d redis:alpine

```

Após executar os comandos acima, crie um banco de dados dentro do container **postgres**.

### Configurando variáveis de ambiente

Copie o arquivo `.env.example` de dentro da pasta `backend` para a mesma pasta e renomei-o para `.env`.

Segue a descrição de cada variável.

| Variável   | Descrição                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| APP_URL    | Endereço do backend. Deve-se colocar o IP da sua máquina em vez do _localhost_ para evitar problemas quando for testar a parte mobile com android, exemplo `http://<IP>:3333`. |
| FRONT_URL  | Endereço do frontend usado na configuração de origin, exemplo `http://localhost:3000`.                                                                                         |
| NODE_ENV   | Define o modo da aplicação, exemplo `development` ou `production`.                                                                                                             |
| APP_SECRET | Chave usada para criar o token JWT.                                                                                                                                            |
| DB_HOST    | Endereço do servidor do banco de dados postgres.                                                                                                                               |
| DB_USER    | Usuário do banco de dados postgres.                                                                                                                                            |
| DB_PASS    | Senha do banco de dados postgres.                                                                                                                                              |
| DB_NAME    | Node do banco de dados postgres.                                                                                                                                               |
| REDIS_HOST | Endereço do banco de dados redis.                                                                                                                                              |
| REDIS_PORT | Porta do banco de dados redis.                                                                                                                                                 |
| MAIL_HOST  | Endereço do servidor de email.                                                                                                                                                 |
| MAIL_PORT  | Porta do servidor de email.                                                                                                                                                    |
| MAIL_USER  | Usuário do servidor de email.                                                                                                                                                  |
| MAIL_PASS  | Senha do servidor de email.                                                                                                                                                    |
| SENTRY_DSN | Endereço do servidor sentry, usado apenas em produção.                                                                                                                         |

### Configurando API

```bash
# Entrando na pasta do backend
cd backend

# Instalando dependências
yarn install

# Criando migrations
yarn migrate

# Criando seeds
yarn seed

# Iniciando API em modo de desenvolvimento
yarn dev

# Iniciando fila de emails
yarn queue
```

### Configurando Insomnia

Você pode carregar o arquivo [`backend/insomnia.json`](backend/insomnia.json) no Insomnia para testar a API.

### Dados de exemplo

Na execução dos seeds foi criado usuários e meetups de exemplos. Você pode encontrar as credenciais de acesso desses usuários no arquivo [`backend/src/database/seeds/20190930224153-users.js`](backend/src/database/seeds/20190930224153-users.js).

## Frontend

```bash
# Entrando na pasta do frontend
cd frontend

# Instalando dependências
yarn install

# Iniciando aplicação web
yarn start
```

## Mobile

:warning: **_Desenvolvido apenas para android._** :warning:

```bash
# Entrando na pasta do mobile
cd mobile

# Instalando dependências
yarn install

# Iniciando aplicação mobile
yarn android
```

Após a aplicação ter sido instalada, você pode executar `yarn start` para iniciá-la em futuras execuções, mas quando tiver alguma alteração de código nativo será necessário rodar `yarn android` novamente.
