# MeetApp

Projeto desenvolvido para a certificação do Bootcamp GoStack 8.0.

Segui abaixo os passos para configurar o ambiente de desenvolvimento.

# Backend

## Pré-requisito

-   NodeJS
-   Docker
-   Yarn

## Configurando containers docker

Estaremos utilizando dois container, uma para o banco de dados postgres e outro para o redis. Para criá-los basta executar os seguintes comandos no seu terminal:

```bash
docker run --name database-postgres -e POSTGRES_PASSWORD=<PASSWORD> -p 5432:5432 -d postgres
docker run --name database-redis -p 6379:6379 -t -d redis:alpine
```

Substitua o `<PASSWORD>` por uma senha de sua preferência.

Crie um banco de dados dentro do container postgres.

## Configurando variáveis de ambiente

Copie o arquivo `.env.example` de dentro da pasta _backend_ para a mesma pasta renomeá-no para `.env`.

Segui a explicação de cada variável

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
| REDIS_HOST | Endereço do servidor redis.                                                                                                                                                    |
| REDIS_PORT | Porta do servidor redis.                                                                                                                                                       |
| MAIL_HOST  | Endereço do servidor de email.                                                                                                                                                 |
| MAIL_PORT  | Posta do servidor de email.                                                                                                                                                    |
| MAIL_USER  | Usuário do servidor de email.                                                                                                                                                  |
| MAIL_PASS  | Senha do servidor de email.                                                                                                                                                    |
| SENTRY_DSN | Endereço do servidor sentry, usado apenas em produção.                                                                                                                         |

## Instalando depedências

Dentro da pasta _backend_ execute os seguintes comandos e aguarde a instalação terminar:

```bash
yarn
```

## Configurando migrate e seed

Dentro da pasta _backend_ execute os seguintes:

```bash
yarn migrate
yarn seed
```

## Iniciando o servidor

Dentro da pasta _backend_ execute os seguintes:

-   Iniciar api:

```bash
yarn dev
```

-   Iniciar fila de emails:

```bash
yarn queue
```

# Frontend

_TODO_

# Mobile

_TODO_
