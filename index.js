// Funcao serverless que responde a requisicoes HTTP.
// Recebe o evento enviado pelo API Gateway e devolve uma resposta em JSON.
//
// Logging estruturado e metricas (Checkpoint 4): cada log e uma linha JSON, e
// as metricas usam o formato CloudWatch Embedded Metric Format (EMF) - uma
// linha de log com uma forma especifica que o CloudWatch extrai
// automaticamente como metrica, sem chamada de API nem permissao adicional.

const NAMESPACE = 'PucCheckpoint1';
const SERVICO = 'hello';

function log(nivel, mensagem, campos = {}) {
  console.log(JSON.stringify({ nivel, mensagem, ...campos }));
}

function metrica(nome, valor, unidade) {
  console.log(JSON.stringify({
    _aws: {
      Timestamp: Date.now(),
      CloudWatchMetrics: [{ Namespace: NAMESPACE, Dimensions: [['Servico']], Metrics: [{ Name: nome, Unit: unidade }] }],
    },
    Servico: SERVICO,
    [nome]: valor,
  }));
}

exports.handler = async (event) => {
  const inicio = Date.now();
  const metodo = event.requestContext?.http?.method || 'GET';
  const caminho = event.rawPath || '/';
  const nome = event.queryStringParameters?.name || 'mundo';

  log('INFO', 'Requisicao recebida', { metodo, caminho });

  const resposta = {
    mensagem: `Ola, ${nome}! A funcao serverless respondeu com sucesso.`,
    metodo: metodo,
    caminho: caminho,
    data: new Date().toISOString(),
  };

  metrica('Invocacoes', 1, 'Count');
  metrica('DuracaoMs', Date.now() - inicio, 'Milliseconds');

  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(resposta, null, 2),
  };
};
