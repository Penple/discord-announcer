const config = require('./config.json');
const cron = require('node-cron');
const request = require('request');

for (const option of config.messages) {
  cron.schedule(option.cron, function(){
    for (const channel of option.channels) {
      let message;
      if (option.message instanceof Array) {
        message = option.message[Math.floor(Math.random()*option.message.length)];
      } else {
        message = option.message;
      }
      request.post({
        url: `https://discordapp.com/api/v6/channels/${channel}/messages`,
        headers: {
          'authorization': 'Bot ' + config.token
        },
        body: {
          content: message
        },
        json: true
      });
    }
  });
}