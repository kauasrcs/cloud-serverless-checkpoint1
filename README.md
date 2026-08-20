# Checkpoint 1 - Funcao Serverless na Nuvem

Este projeto contem uma funcao serverless simples que responde a requisicoes HTTP
e foi implantada em ambiente de nuvem.

A URL da funcao nao esta neste arquivo. Ela foi enviada no campo de comentarios
da entrega no Canvas.

## Provedor Utilizado

* AWS (Lambda + API Gateway)

## O que a funcao faz

Responde em JSON com uma mensagem, o metodo e o caminho da requisicao e a data.
Aceita o parametro `name` na query string:

    GET /?name=Kaua  ->  { "mensagem": "Ola, Kaua! A funcao serverless respondeu com sucesso." }

Sem o parametro, a mensagem usa "mundo".

## Como rodar localmente

### Pre-requisitos

* Node.js instalado (versao 18 ou superior)
* Terminal de comandos aberto

### Passo a passo

1. Clone o repositorio para sua maquina:

       git clone https://github.com/kauasrcs/cloud-serverless-checkpoint1.git

2. Entre na pasta do projeto:

       cd cloud-serverless-checkpoint1

3. Instale as dependencias do projeto:

       npm install

4. Rode o servidor de testes local:

       npm start

5. Em outro terminal, teste a funcao:

       curl "http://localhost:8080/?name=Kaua"

## Arquivos

* `index.js` - a funcao (o mesmo codigo que roda na nuvem)
* `local.js` - servidor local usado para testar
