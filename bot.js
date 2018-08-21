const {Client, RichEmbed} = require('discord.js');
const client = new Client({
	disableEveryone : true
});
const prefix = '!'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`RENAD`,"http://twitch.tv/S-F")
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





client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});




client.on("message", message => {

            if (message.content.startsWith(prefix + "bc")) {
                         if (!message.member.hasPermission("ADMINISTRATOR"))  return;
  let args = message.content.split(" ").slice(1);
  var argresult = args.join(' '); 
  message.guild.members.filter(m => m.presence.status !== 'all').forEach(m => {
 m.send(`${argresult}\n ${m}`);
})
 message.channel.send(`\`${message.guild.members.filter(m => m.presence.status !== 'all').size}\` : عدد الاعضاء المستلمين`); 
 message.delete(); 
};     
});



const ytdl = require('ytdl-core');
const queue = new Map();
client.on("warn", console.warn);
client.on('error', console.error);
client.on('ready', () => {console.log('Yo This Ready !'); client.user.setStatus('ide')});


client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	var args = message.content.split(' ');
	const serverQueue = queue.get(message.guild.id)
	if (message.content.startsWith(`${prefix}play`)) {
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel) return message.reply('You Need To Be In A Voice Channel To Do This Command');
		const per = voiceChannel.permissionsFor(message.client.user);
		var search = require('youtube-search');
 
var opts = {
  maxResults: 1,
  key: "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4"
};
args = message.content.slice(4 + prefix.length).split(" ").join(" ")
console.log(args)
search(args, opts, async function(err, results) {
  if(err) return console.log(err);
  const songInfo = await ytdl.getInfo(`${results.map(r => r.link)}`);
  const song = {
	  title : songInfo.title,
	  url : songInfo.video_url
  }
  if (!serverQueue) {
	  const queueConstruct = {
		  textChannel : message.channel,
		  connection : null,
		  songs : [],
		  volume : 5,
		  playing : true,
		  voiceChannel : message.member.voiceChannel
	  };
	  queue.set(message.guild.id, queueConstruct);
	  queueConstruct.songs.push(song)
  try {
	  var connection = await voiceChannel.join();
	  queueConstruct.connection = connection
	  play(message.guild, queueConstruct.songs[0], message)
  } catch (error) {
	  console.log(error)
	  queue.delete(message.guild.id)
		  }
	  } else {
		  serverQueue.songs.push(song);
		  return message.reply(`**${song.title}** Has Been Added To The Queue`)
	  }

	  return undefined;
  const dispatcher = connection.playStream(ytdl(`${results.map(r => r.link)}`)).on('end', () => {
  });
  dispatcher.setVolumeLogarithmic(5 / 5)
});
	} else if (message.content.startsWith(`${prefix}stop`)) {
		if (!message.member.voiceChannel) return message.reply('You Must Be In A Voice Channel')
		if (!serverQueue) return message.reply('There Is Nothing Playing Now');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('2');
		return undefined;
	} else if (message.content.startsWith(`${prefix}skip`)) {
		if (!message.member.voiceChannel) return message.reply('You Must Be In A Voice Channel')
		if (!serverQueue) return message.reply('There Is Nothing Playing Now');
		serverQueue.connection.dispatcher.end('1');
		return undefined;
	} else if (message.content.startsWith(`${prefix}vol`) || message.content.startsWith(`${prefix}volume`)) {
		args = message.content.split(" ");
		if (!message.member.voiceChannel) return message.reply('You Must Be In A Voice Channel')
		if (!serverQueue) return message.reply('There Is Nothing Playing Now');
		if (!args[1]) return message.reply('Current Volume Now ' + serverQueue.volume);
		if (args[1] > 100) return;
		if (args[1] < 1) return;
		serverQueue.volume = args[1]
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);
		return undefined;
	} else if (message.content.startsWith(`${prefix}resume`)) {
		if (!message.member.voiceChannel) return message.reply('You Must Be In A Voice Channel')
		if (!serverQueue) return message.reply('There Is Nothing Playing Now');
		serverQueue.playing = true;
		serverQueue.connection.dispatcher.resume();
		message.reply('Music Resumed ▶')
	} else if (message.content.startsWith(`${prefix}pause`)){
		if (!message.member.voiceChannel) return message.reply('You Must Be In A Voice Channel')
		if (!serverQueue) return message.reply('There Is Nothing Playing Now');
		serverQueue.playing = false;
		serverQueue.connection.dispatcher.pause();
		message.reply('Music Paused ⏸')
		
	}

});
function play(guild, song, message) {
	const serverQueue = queue.get(guild.id);
	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);
	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
	.on('end', () => {
		serverQueue.songs.shift()
		play(guild, serverQueue.songs[0])
	});
	dispatcher.setVolumeLogarithmic(5 / 5);
	message.reply(`Now Playing : **${song.title}**`)
}



client.on('message', (message)=>{
        if (message.content.startsWith(`!embed`)) {
                var embed = new Discord.RichEmbed()
                .setAuthor(client.user.username,client.user.avatarURL)
                .setTitle("Message By " + message.author.tag)
                .setDescription(message.content.split(" ").join(" ").slice(7))
                .setColor("RANDOM")
                .setThumbnail(message.author.avatarURL)
                message.channel.send(embed);
        } else if (message.content.startsWith(`!say`)) {
                message.channel.send(message.content.split(" ").join(" ").slice(5));
        };
})



client.login(process.env.BOT_TOKEN);
