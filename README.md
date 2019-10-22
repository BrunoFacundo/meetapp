# Meetapp

Projeto desenvolvido para a certificação do [Bootcamp GoStack 8.0](https://rocketseat.com.br/bootcamp).

Segui abaixo os passos para configurar o ambiente de desenvolvimento.

## Pré-requisito

-   [NodeJS](https://nodejs.org)
-   [Docker](https://www.docker.com/docker-community)
-   [Yarn](https://yarnpkg.com)

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

Copie o arquivo `.env.example` de dentro da pasta `backend` para a mesma pasta renomeá-no para `.env`.

Segui a explicação de cada variável.

| Variável   | Desrição                                                                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| APP_URL    | Endereço do backend, deve-se colocar o ip da sua máquina em vez do _localhost_ para evitar problemas quando for testar a parte mobile com android, exemplo `http://<IP>:3333`. |
| FRONT_URL  | Endereço do frontend usado na configuração de origin, exemplo `http://localhost:3000`.                                                                                         |
| NODE_ENV   | Define o modo da aplicação, exemplo `development` ou `production`.                                                                                                             |
| APP_SECRET | Chave usada para criar o token JWT.                                                                                                                                            |
| DB_HOST    | Endereço do servidor de baco de dados postgres.                                                                                                                                |
| DB_USER    | Usuário do banco de dados postgres.                                                                                                                                            |
| DB_PASS    | Senha do banco de dados postgres.                                                                                                                                              |
| DB_NAME    | Node do banco de dados postgres.                                                                                                                                               |
| REDIS_HOST | Endereço do do banco de dados redis.                                                                                                                                           |
| REDIS_PORT | Porta do do banco de dados redis.                                                                                                                                              |
| MAIL_HOST  | Endereço do servidor de email.                                                                                                                                                 |
| MAIL_PORT  | Porta do servidor de email.                                                                                                                                                    |
| MAIL_USER  | Usuário do servidor de email.                                                                                                                                                  |
| MAIL_PASS  | Senha do servidor de email.                                                                                                                                                    |
| SENTRY_DSN | Endereço do servidor sentry, usado apenas em produção.                                                                                                                         |

### Configurando api

```bash
# Entrando da pasta do backend
cd backend

# Instalando depedências
yarn install

# Criando migrates
yarn migrate

# Criando seeds
yarn seed

# Iniciando api em mode de desenvolvimento
yarn dev

# Iniciando fila de emails
yarn queue
```

## Frontend

```bash
# Entrando da pasta do frontend
cd frontend

# Instalando depedências
yarn install

# Iniciando aplicação web
yarn start
```

## Mobile

**_Essa parte foi desenvolvida usando apenas o android._**

```bash
# Entrando da pasta do mobile
cd mobile

# Instalando depedências
yarn install

# Iniciando aplicação mobile
yarn android
```

Após a aplicação já estiver sido instalada, você pode executar `yarn start` para iniciá-la em futuras execuções, mas quando tiver alguma alteração de código nativo será necessário rodar `yarn android` novamente.
