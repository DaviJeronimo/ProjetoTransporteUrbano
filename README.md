<p align="center">
  <img src="./front-end/rota-smart/src/assets/rotasmart-logo.png" alt="RotaSmart Logo" width="280">
</p>

<h1 align="center">RotaSmart</h1>

<p align="center">
  <strong>Gestão de Transporte Urbano</strong>
</p>

---

# 📋 Sobre o projeto

O **RotaSmart** é um protótipo acadêmico desenvolvido para a gestão simplificada de veículos de transporte urbano, como ônibus, vans e micro-ônibus.

O projeto é composto por dois sistemas integrados:

- **API REST:** responsável pelo backend, regras de negócio, validações e acesso ao banco de dados.
- **Cliente Front-end:** responsável pela interface gráfica e interação com o usuário.

O sistema possui controle de acesso baseado no perfil do usuário:

- **Administrador:** pode visualizar, cadastrar e remover veículos.
- **Motorista:** pode apenas visualizar os veículos cadastrados.

A aplicação possui telas de login/cadastro e gerenciamento de veículos.

---

# 📁 Estrutura do projeto

```text
ProjetoTransporteUrbano/
│
├── back-end/
│   └── rotasmart/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   │   └── school/sptech/rotasmart/
│       │   │   │       ├── controller/
│       │   │   │       ├── dao/
│       │   │   │       └── model/
│       │   │   │
│       │   │   └── resources/
│       │   │       ├── application.properties
│       │   │       └── schema.sql
│       │   │
│       │   └── test/
│       │
│       ├── pom.xml
│       ├── mvnw
│       └── mvnw.cmd
│
├── front-end/
│   └── rota-smart/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── routes/
│       │   ├── styles/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   ├── index.css
│       │   └── main.jsx
│       ├── package.json
│       ├── package-lock.json
│       └── vite.config.js
│
└── README.md
```

---

# 🔧 1. Código-fonte da API REST

O backend da aplicação está localizado em:

```text
back-end/rotasmart/
```

A API foi desenvolvida utilizando:

- Java
- Spring Boot
- Spring Web
- Maven
- JDBC/DAO
- H2 Database
- JSON
- CORS

A API segue o padrão REST e disponibiliza endpoints para gerenciamento de:

- Usuários;
- Autenticação;
- Veículos.

A aplicação utiliza uma organização baseada em:

```text
Controller
    ↓
DAO
    ↓
Banco de Dados
```

---

# 💻 2. Cliente Front-end

O cliente desenvolvido na disciplina de Front-end está localizado em:

```text
front-end/rota-smart/
```

O frontend foi desenvolvido utilizando:

- React
- JavaScript
- Vite
- HTML
- CSS

O cliente é responsável por consumir a API REST e apresentar as funcionalidades ao usuário.

## Funcionalidades

### Login

Permite que o usuário realize autenticação utilizando:

- E-mail;
- Senha.

### Cadastro

Permite criar uma nova conta informando:

- Nome;
- E-mail;
- Senha;
- Cargo.

### Veículos

A tela de veículos permite consultar os veículos cadastrados.

Para usuários com perfil de **Administrador**, também estão disponíveis:

- Cadastro de veículos;
- Exclusão de veículos.

Para usuários com perfil de **Motorista**, somente a consulta dos veículos fica disponível.

---

# 🗄️ 3. Configuração do banco de dados

O projeto utiliza o banco de dados **H2**, configurado como banco em memória.

As configurações estão localizadas em:

```text
back-end/rotasmart/src/main/resources/application.properties
```

Configuração atual:

```properties
spring.application.name=rotasmart

spring.datasource.url=jdbc:h2:mem:meu_banco
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

spring.sql.init.mode=always
```

## Configurações

| Propriedade | Valor |
|---|---|
| Banco | H2 |
| Tipo | Em memória |
| Nome | `meu_banco` |
| Usuário | `sa` |
| Senha | vazia |
| Console H2 | habilitado |
| URL do console | `/h2-console` |
| Inicialização do SQL | automática |

O banco é criado automaticamente quando a aplicação é iniciada.

Como o banco está configurado em memória, os dados são perdidos quando a aplicação é encerrada.

---

# 🗃️ 4. Script SQL

O script de criação das tabelas está localizado em:

```text
back-end/rotasmart/src/main/resources/schema.sql
```

O Spring Boot executa o script automaticamente durante a inicialização da aplicação.

## Tabela `usuario`

```sql
CREATE TABLE IF NOT EXISTS usuario (
    id UUID PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(50)
);
```

### Campos

| Campo | Tipo | Restrições |
|---|---|---|
| `id` | UUID | Chave primária |
| `nome` | VARCHAR(100) | Obrigatório |
| `email` | VARCHAR(100) | Obrigatório e único |
| `senha` | VARCHAR(255) | Obrigatório |
| `cargo` | VARCHAR(50) | Opcional |

---

## Tabela `veiculo`

```sql
CREATE TABLE IF NOT EXISTS veiculo (
    id UUID PRIMARY KEY,
    placa VARCHAR(10) NOT NULL UNIQUE,
    modelo VARCHAR(50) NOT NULL,
    capacidade INT NOT NULL,
    tipo VARCHAR(30),
    status VARCHAR(20) NOT NULL,
    linha VARCHAR(100)
);
```

### Campos

| Campo | Tipo | Restrições |
|---|---|---|
| `id` | UUID | Chave primária |
| `placa` | VARCHAR(10) | Obrigatória e única |
| `modelo` | VARCHAR(50) | Obrigatório |
| `capacidade` | INT | Obrigatória |
| `tipo` | VARCHAR(30) | Opcional |
| `status` | VARCHAR(20) | Obrigatório |
| `linha` | VARCHAR(100) | Opcional |

---

# 📡 5. Documentação dos endpoints da API

## URL base

Com o backend executando localmente:

```text
http://localhost:8080
```

Todas as requisições que enviam dados utilizam:

```http
Content-Type: application/json
```

---

# 👤 Usuários

## `POST /usuarios/login`

Realiza a autenticação de um usuário.

### Permissão

Público.

### Requisição

```http
POST /usuarios/login
Content-Type: application/json
```

### Body

```json
{
  "email": "admin@rotasmart.com",
  "senha": "123"
}
```

### Resposta de sucesso

```http
200 OK
```

Exemplo:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Administrador",
  "email": "admin@rotasmart.com",
  "senha": "123",
  "cargo": "ADMINISTRADOR"
}
```

### Credenciais inválidas

```http
401 Unauthorized
```

Resposta:

```text
E-mail ou senha inválidos.
```

---

# `POST /usuarios`

Realiza o cadastro de um novo usuário.

### Permissão

Público.

### Body

```json
{
  "nome": "João da Silva",
  "email": "joao@rotasmart.com",
  "senha": "Senha@123",
  "cargo": "MOTORISTA"
}
```

### Regras de validação

A senha deve:

- Ter no mínimo 8 caracteres;
- Possuir pelo menos uma letra maiúscula;
- Possuir pelo menos um caractere especial.

O e-mail deve possuir formato válido.

### Resposta

```http
201 Created
```

Exemplo:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "João da Silva",
  "email": "joao@rotasmart.com",
  "senha": "Senha@123",
  "cargo": "MOTORISTA"
}
```

---

# `GET /usuarios`

Retorna todos os usuários cadastrados.

### Requisição

```http
GET /usuarios
```

### Resposta

```http
200 OK
```

Exemplo:

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Administrador",
    "email": "admin@rotasmart.com",
    "senha": "Senha@123",
    "cargo": "ADMINISTRADOR"
  },
  {
    "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "nome": "João da Silva",
    "email": "joao@rotasmart.com",
    "senha": "Senha@123",
    "cargo": "MOTORISTA"
  }
]
```

---

# `GET /usuarios/{id}`

Busca um usuário específico pelo seu UUID.

### Exemplo

```http
GET /usuarios/550e8400-e29b-41d4-a716-446655440000
```

### Resposta

```http
200 OK
```

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Administrador",
  "email": "admin@rotasmart.com",
  "senha": "Senha@123",
  "cargo": "ADMINISTRADOR"
}
```

Caso o usuário não exista:

```http
404 Not Found
```

---

# `DELETE /usuarios/{id}`

Remove um usuário através do UUID.

### Exemplo

```http
DELETE /usuarios/550e8400-e29b-41d4-a716-446655440000
```

### Resposta

```http
204 No Content
```

Caso o usuário não exista:

```http
404 Not Found
```

---

# 🚌 Veículos

## `POST /veiculos`

Cadastra um novo veículo.

### Permissão

Administrador.

### Body

```json
{
  "placa": "ABC1D23",
  "modelo": "Mercedes-Benz OF-1721",
  "capacidade": 45,
  "tipo": "Ônibus",
  "status": "DISPONIVEL",
  "linha": "101"
}
```

### Campos

| Campo | Tipo | Descrição |
|---|---|---|
| `placa` | String | Placa do veículo |
| `modelo` | String | Modelo do veículo |
| `capacidade` | Integer | Capacidade de passageiros |
| `tipo` | String | Tipo do veículo |
| `status` | String | Status do veículo |
| `linha` | String | Linha associada |

### Regras

A placa:

- É obrigatória;
- Deve possuir pelo menos 8 caracteres;
- Deve conter pelo menos um número;
- É convertida para letras maiúsculas;
- Não pode estar cadastrada anteriormente.

A capacidade deve ser maior que `0`.

Caso o status não seja informado, o sistema utiliza:

```text
DISPONIVEL
```

### Resposta

```http
201 Created
```

Exemplo:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "placa": "ABC1D23",
  "modelo": "Mercedes-Benz OF-1721",
  "capacidade": 45,
  "tipo": "Ônibus",
  "status": "DISPONIVEL",
  "linha": "101"
}
```

---

# `GET /veiculos`

Retorna todos os veículos cadastrados.

### Permissão

- Administrador;
- Motorista.

### Requisição

```http
GET /veiculos
```

### Resposta

```http
200 OK
```

Exemplo:

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "placa": "ABC1D23",
    "modelo": "Mercedes-Benz OF-1721",
    "capacidade": 45,
    "tipo": "Ônibus",
    "status": "DISPONIVEL",
    "linha": "101"
  },
  {
    "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "placa": "XYZ9A87",
    "modelo": "Volkswagen 17.230",
    "capacidade": 40,
    "tipo": "Micro-ônibus",
    "status": "EM_OPERACAO",
    "linha": "205"
  }
]
```

Caso não existam veículos:

```http
204 No Content
```

---

# `GET /veiculos/{id}`

Busca um veículo específico pelo UUID.

### Exemplo

```http
GET /veiculos/550e8400-e29b-41d4-a716-446655440000
```

### Resposta

```http
200 OK
```

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "placa": "ABC1D23",
  "modelo": "Mercedes-Benz OF-1721",
  "capacidade": 45,
  "tipo": "Ônibus",
  "status": "DISPONIVEL",
  "linha": "101"
}
```

Caso o veículo não exista:

```http
404 Not Found
```

---

# `DELETE /veiculos/{id}`

Remove um veículo cadastrado.

### Permissão

Administrador.

### Exemplo

```http
DELETE /veiculos/550e8400-e29b-41d4-a716-446655440000
```

### Resposta

```http
204 No Content
```

Caso o veículo não exista:

```http
404 Not Found
```

---

# 📑 Resumo dos endpoints

## Usuários

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/usuarios/login` | Autenticação |
| `POST` | `/usuarios` | Cadastro de usuário |
| `GET` | `/usuarios` | Lista usuários |
| `GET` | `/usuarios/{id}` | Consulta usuário |
| `DELETE` | `/usuarios/{id}` | Remove usuário |

## Veículos

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/veiculos` | Cadastro de veículo |
| `GET` | `/veiculos` | Lista veículos |
| `GET` | `/veiculos/{id}` | Consulta veículo |
| `DELETE` | `/veiculos/{id}` | Remove veículo |

---

# 🔐 Controle de acesso

O sistema possui dois perfis:

| Operação | Administrador | Motorista |
|---|:---:|:---:|
| Login | ✅ | ✅ |
| Cadastro | ✅ | ✅ |
| Consultar veículos | ✅ | ✅ |
| Cadastrar veículos | ✅ | ❌ |
| Remover veículos | ✅ | ❌ |

---

# 🚀 6. Instruções para executar o projeto

## Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

- Java JDK;
- Maven ou Maven Wrapper;
- Node.js;
- npm.

---

# ▶️ Executando a API

Primeiro, entre na pasta do backend:

```bash
cd back-end/rotasmart
```

### Linux/macOS

```bash
./mvnw spring-boot:run
```

### Windows

```cmd
mvnw.cmd spring-boot:run
```

Após iniciar, a API estará disponível em:

```text
http://localhost:8080
```

---

# 🗄️ Acessando o banco H2

O projeto possui o console do H2 habilitado.

Acesse:

```text
http://localhost:8080/h2-console
```

Utilize as seguintes configurações:

| Campo | Valor |
|---|---|
| JDBC URL | `jdbc:h2:mem:meu_banco` |
| User Name | `sa` |
| Password | deixar vazio |

O banco é criado automaticamente através do arquivo:

```text
src/main/resources/schema.sql
```

---

# ▶️ Executando o Frontend

Abra outro terminal e entre na pasta:

```bash
cd front-end/rota-smart
```

Instale as dependências:

```bash
npm install
```

Depois execute:

```bash
npm run dev
```

O Vite disponibilizará o frontend em:

```text
http://localhost:5173
```

---

# 🔗 7. Integração entre Frontend e API

Para utilizar o sistema completo, os dois projetos precisam estar executando simultaneamente.

```text
┌───────────────────────────────┐
│         FRONTEND              │
│                               │
│        React + Vite           │
│                               │
│   http://localhost:5173       │
└───────────────┬───────────────┘
                │
                │ HTTP / JSON
                │
                ▼
┌───────────────────────────────┐
│            API                │
│                               │
│       Spring Boot             │
│                               │
│   http://localhost:8080       │
└───────────────┬───────────────┘
                │
                │ JDBC
                ▼
┌───────────────────────────────┐
│          H2 Database          │
│                               │
│        meu_banco              │
└───────────────────────────────┘
```

O frontend realiza requisições HTTP para os endpoints disponibilizados pelo backend.

Exemplo:

```text
Frontend
   │
   │ POST /usuarios/login
   ▼
API REST
   │
   │ Consulta usuário
   ▼
Banco H2
```

Para o gerenciamento de veículos:

```text
Frontend
   │
   │ GET /veiculos
   ▼
API REST
   │
   │ Consulta veículos
   ▼
Banco H2
```

---

# 🧪 8. Exemplos de requisições

## Login

```bash
curl -X POST http://localhost:8080/usuarios/login \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@rotasmart.com",
  "senha": "123"
}'
```

---

## Cadastro de usuário

```bash
curl -X POST http://localhost:8080/usuarios \
-H "Content-Type: application/json" \
-d '{
  "nome": "João da Silva",
  "email": "joao@rotasmart.com",
  "senha": "Senha@123",
  "cargo": "MOTORISTA"
}'
```

---

## Listagem de usuários

```bash
curl http://localhost:8080/usuarios
```

---

## Listagem de veículos

```bash
curl http://localhost:8080/veiculos
```

---

## Cadastro de veículo

```bash
curl -X POST http://localhost:8080/veiculos \
-H "Content-Type: application/json" \
-d '{
  "placa": "ABC1D23",
  "modelo": "Mercedes-Benz OF-1721",
  "capacidade": 45,
  "tipo": "Ônibus",
  "status": "DISPONIVEL",
  "linha": "101"
}'
```

---

## Consulta de veículo

```bash
curl http://localhost:8080/veiculos/550e8400-e29b-41d4-a716-446655440000
```

---

## Remoção de veículo

```bash
curl -X DELETE \
http://localhost:8080/veiculos/550e8400-e29b-41d4-a716-446655440000
```

---

# 📊 9. Códigos HTTP

A API utiliza códigos HTTP para indicar o resultado das operações.

| Código | Significado |
|---|---|
| `200 OK` | Requisição realizada com sucesso |
| `201 Created` | Registro criado com sucesso |
| `204 No Content` | Operação realizada sem conteúdo para retornar |
| `400 Bad Request` | Dados enviados são inválidos |
| `401 Unauthorized` | Credenciais inválidas |
| `404 Not Found` | Registro não encontrado |
| `500 Internal Server Error` | Erro interno da aplicação |

---

# 🛠️ Tecnologias utilizadas

## Backend

- Java
- Spring Boot
- Spring Web
- Maven
- JDBC
- H2 Database
- REST API
- JSON

## Frontend

- React
- JavaScript
- Vite
- HTML
- CSS

---



# 🎓 Projeto acadêmico

**RotaSmart — Gestão de Transporte Urbano**

Projeto desenvolvido para fins acadêmicos, com foco no desenvolvimento e integração de uma API REST com uma aplicação Front-end.

---
