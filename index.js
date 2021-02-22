const Discord = require('discord.js');
const client = new Discord.Client();
require ('dotenv').config();

let participants = [];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (message.content === '!inhouse') {
    message.channel.send('Starting 5v5 in house! React with :trophy: in the next 10 minutes to join!');
  };

  if (message.content === 'Starting 5v5 in house! React with :trophy: in the next 10 minutes to join!' && message.author.id === '812851891410698260') {
    const filter = (reaction) => reaction.emoji.identifier === '%F0%9F%8F%86';
    message.awaitReactions(filter, {max: 10, time: 600000})
      .then(collected => {
        if (!collected.array()[0] || collected.array()[0].users.cache.size < 1) {
          throw new Error();
        } else {
          collected.array()[0].users.cache.each(user => participants.push(user.id))
        }
      })
      .then(() => {
        const team1 = [];
        const team2 = [];
        let flag = true;
        while (participants.length > 0) {
          let random = Math.floor(Math.random() * participants.length);
          if (flag) {
            team1.push(participants.splice(random, 1)[0]);
          } else {
            team2.push(participants.splice(random, 1)[0]);
          };
          flag = !flag;
        };
        message.channel.send(
          `Team 1:
          <@${team1[0]}>
          <@${team1[1]}>
          <@${team1[2]}>
          <@${team1[3]}>
          <@${team1[4]}>
          \nTeam 2:
          <@${team2[0]}>
          <@${team2[1]}>
          <@${team2[2]}>
          <@${team2[3]}>
          <@${team2[4]}>
          `
        )
      })
      .catch(error => message.channel.send('Not enough users signed up for the inhouse!'));
  }
})
client.login(process.env.DISCORD_BOT_TOKEN);

