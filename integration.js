import axios from 'axios';

export default {
  async run({ steps, $ }) {
    const tokenUrl = 'https://SUBDOMINIO.auth.marketingcloudapis.com/v2/token';
    const tokenHeaders = { 'Content-Type': 'application/json' };
    const tokenData = {
      grant_type: 'client_credentials',
      client_id: 'CLIENT_ID',
      client_secret: 'CLIENT_SECRET',
      account_id: 'MID'
    };

    try {
      const tokenResponse = await axios.post(tokenUrl, tokenData, { headers: tokenHeaders });
      const access_token = tokenResponse.data.access_token;

      const email = 'exemplo@exemplo.com';
      const telefone = '5511911111111';
      const nome = 'Leonardo Exemplo';
      const produto = 'Produto Exemplo';

      const eventUrl = 'https://SUBDOMINIO.rest.marketingcloudapis.com/interaction/v1/events';
      const eventHeaders = {
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      };
      const eventPayload = {
        ContactKey: email,
        EventDefinitionKey: 'SUA API KEY',
        Data: {
          Email: email,
          Telefone: telefone,   
          Produto: produto,     
          Nome: nome            
        }
      };
      

      const eventResponse = await axios.post(eventUrl, eventPayload, { headers: eventHeaders });
      const responseContent = eventResponse.data;
      console.log(responseContent);
    } catch (error) {
      console.error('Error:', error);
    }

    return steps.trigger.event;
  }
};
