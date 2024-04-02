# Atividade: Desenvolvimento de Página CRUD de Usuários com Node.js, Express e TypeScript


**Objetivo:** Desenvolver uma aplicação web responsável por gerenciar usuários, utilizando Node.js, Express e TypeScript. A aplicação deve permitir a criação, leitura, atualização e remoção (CRUD) de usuários, além de fornecer páginas para adicionar e editar usuários.

**Instruções:**

1. Clone o projeto e em seguida execute os seguintes comandos

```node
npm install
npm run dev
```
2. A partir desse momento o código contido no arquivo **app.ts** estará  sendo executado
3. A pasta *views* contém as páginas que já estão prontas
4. A sua tarefa é alterar o arquivo **app.ts** de forma que as página sejam visualizadas corretamente quando os usuários tentarem acessá-las. Para isso você deve:
   * Criar as rotas necessárias para tratar as diversas requisições
   * Implementar a lógica de negócio para listar, criar, remover e atualizar usuários
   * Repassar as informações para os arquivos responsáveis por renderizar cada página que o usuário poderá acessar  

## Estrutura e URLs

A aplicação em questão deve responder pela seguintes **URLs**:

/(raiz) via GET
--- 

Ao acessar essa URL o usuário deve ser redirecionado para URL **/users**
                                                               
/users via GET
--- 

Ao acessar essa URL o usuário deve ver a lista de todos os usuário cadastrados no sistema.
  
O arquivo **index.hbs** deve ser chamado para que a lista de usuários seja exibida

/users/add via GET
---

Ao acessar essa URL o usuário deve ser capaz de ver um formulário HTML vazio que deve ser preenchido com as informação do usuário que deve ser criado.

Ao enviar os dados, as informações devem ser enviadas para a URL **/users** via **POST**.


/users/:id via GET
--- 
O id da URL correponde a um número inteiro que deve ser o id de um usuário existente. Caso o usuário não exista, ou id seja inválido, o usuário deve ser redirecionado para a URL  **/404**.

Ao acessar essa URL o usuário deve ser capaz de ver um formulário HTML já preenchido com as informações do usuário cujo id foi fornecido na URL. 

Nesta página usuário deve ser capaz de editar o formulário e ao enviá-lo, os dados devem ser enviado para a o URL **/users/:id** via **POST**.


/users/remove/:id via GET
--- 
Ao tentar acessar uma URL com esse formato, o usuário cujo id foi informado via URL deve ser removido da lista de usuário e então a lista de usuário atualizadas deve ser mostrada.

Caso o usuário não exista, ou id seja inválido, o usuário deve ser redirecionado para a URL  **/404**.

Detalhe, um usuário da aplicação pode acessar essa URL de duas formas:

1. Clicando no botão de remover um usuário na página principal da aplicação
2. Digitando a URL manualmente na barra do navegador

/users via POST
---
Esta URL vai ser acessado somente quando um usuário tentar adicionar um novo usuário da aplicação.

Neste caso você deve validar as informações enviadas. Propositalmente, o campo email não foi marcado como obrigatório no formulário, portanto, você deve verificar se ele foi preenchido ou não:
 * Caso ele tenha sido preenchido, um novo usuário deve ser adicionado a lista de usuários e a nova lista deve ser mostrada.
 * Caso contrário, o usuário deve visualizar a página usada para adicionar usuário com uma mensagem de erro informado que o email é um campo obrigatório.

/users/:id via POST
---
Esta URL vai ser acessada somente quando um usuário tentar alterar a informação de um usuário existente. Caso o usuário não exista, ou id seja inválido, o usuário deve ser redirecionado para a URL  **/404**.

Aqui você também deverá validar as informações enviadas. Se tudo estiver correto, as informações do usuário em questão devem ser alteradas e lista de usuários deve ser mostrada. Caso contrário, o formulário de edição deve ser mostrado com uma mensagem de erro.

/404 via GET
---
O usuário em teoria não vai tentar essa URL, mas ela será usada em caso mostrar a mensagem de erro em caso onde o id de um possível usuário é inválido ou quando o usuário não existe.

## Arquivos HBS

Estamos usando o **Handlebars** nessa aplicação para que não precisemos *imprimir* código HTML ao responder uma requisição. No projeto temos 4 arquivos **.hbs**:

main.hbs
--- 
Contém o layout principal da aplicação. O outros arquivos reusam as informações dele para evitar a repetição de código.

Você não irá interagir diretamente com esse arquivo.Este arquivo **espera** que uma **variável** chamada **pageTitle** (tem que ser escrita exatamente assim) seja passada para ele. Ela irá preencher a tag `<title>` e a tag `<h1>` com essa valor.

index.hbs
---
Este arquivo contém o código hbs/html necessário para listar os usuários.

Para isso você precisá passar duas variáveis para ele:

1. pageTitle: Um texto qualquer
2. users: Que deve contér a lista de usuários da aplicação

form.hbs
---
Este arquivo contém o código hbs/html que define o formulário que deve ser preenchido na criação ou atualização de um usuário. Portanto, este mesmo arquivo será renderizado quando as URLs, **/users/add e /users/:id** forem acessadas.

Para que ele funcione corretamente 3 variáveis podem ser informadas:

1. pageTitle: Um texto qualquer
2. user: 
    * Deve ser vazio quando um utilizador da aplicação estiver tentando criar um novo usuário
   * Deve contér um usuário quando o utilizador estiver tentando atualizar um usuário existente
3. error: Deve conter uma mensagem de erro somente quando um erro de validação ocorrer

notFound.hbs
---
Apenas mostra uma mensagem de error.

Somente o *pageTitle* deve ser enviado.

## Renderizando um arquivo HBS

Para fazer com que um arquivo hbs seja renderizado corretamente, no código que trata a rota adequada será necessário o seguinte código:


```node
res.render('nome-do-arquivo-hbs', {
  variavel1: valor1,
  variavel2: valor2
})
```

res -> Precisar ser o objeto response

O primeira argumento do método *render* deve ser o nome do arquivo .hbs que deverá ser renderizado. **Não é preciso informa a extensão.**

O segundo argumento do método *render* recebe um objeto, cuja as propiedades são as variáveis que serão acessíveis no arquivo hbs indicado como primeiro argumento.

Exemplo de uso:

```node
res.render('index', {
  pageTitle: 'User list',
  users: myUserList
})
```

Neste caso a página index.hbs será renderizada com o títlo 'User List' e a lista de usuários contidas na variável **myUserList** será mostrada na tela.
