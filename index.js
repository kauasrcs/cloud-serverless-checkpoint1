// Funcao serverless que responde a requisicoes HTTP.
// Recebe o evento enviado pelo API Gateway e devolve uma resposta em JSON.

exports.handler = async (event) => {
  const metodo = event.requestContext?.http?.method || 'GET';
  const caminho = event.rawPath || '/';
  const nome = event.queryStringParameters?.name || 'mundo';

  const resposta = {
    mensagem: `Ola, ${nome}! A funcao serverless respondeu com sucesso.`,
    metodo: metodo,
    caminho: caminho,
    data: new Date().toISOString(),
  };

  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(resposta, null, 2),
  };
};
