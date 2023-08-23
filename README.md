# Cliente Feliz - Back-end

Este repositório contém o código-fonte do projeto Cliente Feliz - Back-end, construído com Node.js 14.21.3. O projeto utiliza as seguintes bibliotecas: bcrypt, nodemailer e express para fornecer funcionalidades de autenticação e gerenciamento de clientes.

<p align="center">
  <img alt="Cliente Feliz" title="Cliente Feliz" src="https://i.ibb.co/nrnPzKY/Screenshot-2023-08-23-at-17-45-27.png" width="100%" />
</p>


## Tecnologias Utilizadas

O projeto Cliente Feliz - Back-end é desenvolvido com as seguintes tecnologias e bibliotecas:

- **Node.js 14.21.3**: Uma plataforma de desenvolvimento que permite a execução de JavaScript no servidor.
- **bcrypt**: Uma biblioteca para criptografar senhas, garantindo a segurança dos dados do usuário.
- **nodemailer**: Uma biblioteca para enviar e-mails, útil para funcionalidades como validação de e-mail e redefinição de senha.
- **express**: Um framework web para Node.js que simplifica o desenvolvimento de APIs RESTful.

## Variáveis de Ambiente

Para executar o Cliente Feliz - Back-end, é necessário configurar as variáveis de ambiente. As variáveis são definidas no ambiente de execução e incluem as seguintes configurações:

- `Base_URL_FRONTEND`: A URL do front-end que a aplicação irá se comunicar.`STRING`
- `JWRSECRET`: A chave secreta usada para assinar e verificar tokens JWT (JSON Web Tokens).`STRING`
- `DATABASE_URL`: A URL do banco de dados utilizado pela aplicação.`STRING`
- `HOST_MAIL`: O Host smtp do e-mail para disparo.`STRING`
- `PORT_MAIL`: Porta do e-mail para disparo.`STRING`
- `SECURE_MAIL`: Se o email vai utilizar TSL.`BOLEAN`
- `USER_MAIL`: E-mail que será utilizado para o disparo. `STRING`
- `PASS_MAIL`: Senha do e-mail que será utilizado no disparo.`STRING`

Certifique-se de configurar essas variáveis de ambiente de acordo com as configurações do seu ambiente.

## Rotas do Projeto

### Rotas de Usuários:

- `POST /users/register`: Registra um novo usuário.
- `POST /users/login`: Realiza a autenticação de um usuário.
- `GET /users/checkUser`: Verifica se um usuário está autenticado.
- `POST /users/validation-email`: Envia um e-mail de validação.
- `POST /users/forgot-password`: Inicia o processo de redefinição de senha.
- `POST /users/reset-password`: Redefine a senha do usuário.
- `GET /users/:id`: Obtém informações de um usuário por ID.
- `PATCH /users/edit`: Atualiza informações de um usuário (autenticação obrigatória).
- `DELETE /users/:id`: Exclui um usuário (autenticação obrigatória).

### Rotas de Clientes:

- `POST /client`: Registra um novo cliente (autenticação obrigatória).
- `GET /client`: Obtém todos os clientes (autenticação obrigatória).
- `GET /client/:id`: Obtém informações de um cliente por ID (autenticação obrigatória).
- `GET /client/search/:key`: Realiza uma pesquisa de clientes (autenticação obrigatória).
- `PATCH /client/:id`: Atualiza informações de um cliente por ID (autenticação obrigatória).
- `DELETE /client/:id`: Exclui um cliente por ID (autenticação obrigatória).

## Iniciando o Projeto

Siga as etapas abaixo para iniciar o Cliente Feliz - Back-end em seu ambiente local:

1. Certifique-se de ter o Node 14.21.3 instalado em sua máquina.

2. Execute `npm install` no terminal para instalar todas as dependências necessárias listadas no arquivo `package.json`.

3. Configure as variáveis de ambiente (Base_URL_FRONTEND, JWRSECRET, DATABASE_URL) de acordo com as configurações do seu ambiente.

4. Após a configuração das variáveis de ambiente, execute `npm start` para iniciar o servidor.

Agora, o Cliente Feliz - Back-end estará em execução e pronto para ser integrado com o front-end correspondente.

## Autores

- [Fernando Souza](https://github.com/fernandosouzadev) - Desenvolvedor
