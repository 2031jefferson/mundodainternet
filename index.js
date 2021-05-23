// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const msgBot = require('./msgBot')

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    msgBot(client, message)
    if (message.body && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Olá sou o Jhefer. base Venom 🕷, em breve estarei programado!!')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}