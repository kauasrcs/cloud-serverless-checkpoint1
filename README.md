# Checkpoint 1 - Funcao Serverless na Nuvem

[![Deploy](https://github.com/kauasrcs/cloud-serverless-checkpoint1/actions/workflows/deploy.yml/badge.svg)](https://github.com/kauasrcs/cloud-serverless-checkpoint1/actions/workflows/deploy.yml)

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

## CI/CD

A funcao ganhou logging estruturado e metricas customizadas (CloudWatch
Embedded Metric Format), e o deploy e automatizado por GitHub Actions - ver
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). A cada push
na branch `main`, o workflow roda:

1. **Lint** - `node --check index.js`.
2. **Testes** - chama a funcao localmente com um evento vazio, sem
   credencial de nuvem.
3. **Build** - empacota `index.js` num `.zip`.
4. **Deploy** - atualiza o codigo na AWS (`aws lambda update-function-code`).

A autenticacao na AWS usa OIDC: o GitHub Actions assume uma IAM Role
diretamente, sem nenhuma chave de acesso guardada como secret. A role so
pode ser assumida por execucoes vindas deste repositorio, na branch `main`,
e so tem permissao para atualizar o codigo desta funcao especifica.

## Arquivos

* `index.js` - a funcao (o mesmo codigo que roda na nuvem)
* `local.js` - servidor local usado para testar
* `.github/workflows/deploy.yml` - pipeline de CI/CD (lint, teste, build, deploy)
