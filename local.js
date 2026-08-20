// Servidor local para testar a funcao sem precisar fazer o deploy.
// Monta um evento parecido com o do API Gateway e chama o handler.

const http = require('http');
const { handler } = require('./index');

const porta = 8080;

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const event = {
    rawPath: url.pathname,
    queryStringParameters: Object.fromEntries(url.searchParams),
    requestContext: { http: { method: req.method } },
  };

  const resposta = await handler(event);

  res.writeHead(resposta.statusCode, resposta.headers);
  res.end(resposta.body);
}).listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
