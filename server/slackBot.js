var SlackBot = require('slackbots');

// create a bot
var bot = new SlackBot({
  token: '', // Add a bot https://my.slack.com/services/new/bot and put the token
  name: 'Survey Responses'
});

module.exports = bot;
