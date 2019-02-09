const {Client, RichEmbed} = require('discord.js');
const client = new Client({
	disableEveryone : true
});
const prefix = '!'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`i Love you ❤ `,"http://twitch.tv/S-F")
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});



const bot = require('discord.js-musicbot-addon');

bot.start(client, {
  youtubeKey: "AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8",
  musichelp : "-help",
 botPrefix : "-"
});




client.login(process.env.BOT_TOKEN);
