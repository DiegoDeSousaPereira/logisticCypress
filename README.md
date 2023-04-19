## 🚚 Logistic Automação

* Este projeto de automação foi desenvolvido para testar a aplicação Logistic, utilizando o Cypress, uma ferramenta de teste de ponta a ponta que torna os testes rápidos, confiáveis e fáceis de usar.


## 📋 Requisitos

* Node.js 14 ou superior
* Yarn ou NPM


## 🛠️ Instalação
* Para instalar as dependências necessárias, execute o seguinte comando no diretório do projeto:

        npm install
    ou

        yarn install

## 📁 Estrutura do Projeto

* O projeto consiste em testes Cypress desenvolvidos com base nos cenários e funcionalidades da aplicação Logistic. Os arquivos de teste estão localizados na pasta cypress/e2e, enquanto os comandos personalizados estão no cypress/support


## 📁 Arquivos de Automação de Fluxo:

* Os arquivos de automação de fluxo estão localizados na pasta cypress/automacoesFluxo. Eles contêm  a automação para os seguintes fluxos:

    🔹 fluxRouter.cy.js: automação do fluxo de criação de rota e liberação.

    🔹 testStress.cy.js: automação para teste de carga || È criado 250 rotas mais a liberação de expedição.

* A quantidade de rotas pode ser facilmente alterada, basta apenas entrar no arquivo e de testStress e alterar o loop indicando a quantidade de rotas.

* Para executar um dos arquivos de automação de fluxo,basta apenas mover o arquivo que deseja usar para a pasta e2e que está em cypress/e2e e executar o comando 

        npx cypress run --spec cypress/e2e/nome_do_arquivo.cy.js

* Lembre-se de que os arquivos de automação de fluxo dependem do ambiente configurado e das informações de acesso às aplicações. Portanto, é necessário ajustar as informações de configuração antes de executar esses testes.


## 🧑‍💻 Executando os testes com o GitHub Actions

* Este projeto utiliza o GitHub Actions para executar os testes automaticamente após cada push na branch principal


## 🚀 Como executar os testes

### Para executar os testes em modo interativo, use o seguinte comando:

        npx cypress open

### Para executar os testes via terminal, use o seguinte comando:

        npx cypress run





## 📚 Dependências

### Este projeto utiliza as seguintes dependências:
<table>
  <tr>
    <td>cypress</td>
    <td>@faker-js/faker</td>
    <td>cypress-file-upload:</td>
    <td>cypress-plugin-api:</td>
  </tr>
  <tr>
    <td>^12.3.0</td>
    <td>^7.6.0</td>
    <td>^5.0.8</td>
    <td>^2.10.3</td>
  </tr>
</table>




## 👨‍💻 Autor

* Diego Sousa

## 📄 Licença

* MIT License