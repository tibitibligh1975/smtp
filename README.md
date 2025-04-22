# Servidor SMTP para Envio de E-mails

Servidor simples para envio de e-mails utilizando SMTP da Hostinger.

## Configuração Local

1. Instale as dependências:

```
npm install
```

2. Inicie o servidor:

```
npm start
```

Para desenvolvimento com reinicialização automática:

```
npm run dev
```

## Deploy no Railway

1. Crie uma conta no [Railway](https://railway.app/)

2. Instale a CLI do Railway (opcional):

```
npm i -g @railway/cli
```

3. Faça login na CLI:

```
railway login
```

4. Inicialize seu projeto:

```
railway init
```

5. Configure as variáveis de ambiente no Railway:

   - EMAIL_FROM
   - EMAIL_FROM_NAME
   - SMTP_HOST
   - SMTP_USER
   - SMTP_PASS
   - SMTP_PORT

6. Faça deploy:

```
railway up
```

Alternativamente, você pode conectar seu repositório GitHub ao Railway para deploys automáticos.

## Uso da API

### Verificar status do servidor

```
GET /api/status
```

### Enviar e-mail

```
POST /api/send-email
```

Corpo da requisição (JSON):

```json
{
  "to": "destinatario@exemplo.com",
  "subject": "Assunto do e-mail",
  "text": "Conteúdo do e-mail em texto simples",
  "html": "<p>Conteúdo do e-mail em HTML</p>"
}
```

Observações:

- O campo `to` pode conter múltiplos e-mails separados por vírgula
- Você pode fornecer apenas `text` ou apenas `html`, ou ambos

## Exemplo de uso com fetch

```javascript
fetch("/api/send-email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    to: "destinatario@exemplo.com",
    subject: "Teste de envio",
    html: "<h1>Olá!</h1><p>Este é um e-mail de teste.</p>",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Erro:", error));
```

## Exemplo para Postman

```json
{
  "to": "destinatario@exemplo.com",
  "subject": "Teste de envio via Postman",
  "html": "<h1>Olá!</h1><p>Este é um e-mail de teste enviado via Postman.</p>"
}
```

URL: https://seu-projeto.railway.app/api/send-email
