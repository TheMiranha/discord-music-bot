const Discord = require('discord.js');
const { Client, Intents, MessageEmbed } = require('discord.js');
const fs = require('fs');

require('dotenv').config();
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES);
const client = new Client({intents: myIntents})
const config = {
    token: process.env.TOKEN,
    prefix: process.env.PREFIX,
};
client.config = config;

//  Música
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
client.distube = new DisTube(client, {
    // searchSongs: 5,
    // searchCooldown: 30,
    leaveOnStop: true,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
      new SpotifyPlugin({
        emitEventsAfterFetching: true
      }),
      new SoundCloudPlugin(),
      new YtDlpPlugin()
    ],
    youtubeDL: false
  });

  client.emotes = {
    "play": "▶️",
    "stop": "⏹️",
    "queue": "📄",
    "success": "☑️",
    "repeat": "🔁",
    "error": "❌"
}

  const status = queue => 
  `Volume: \`${queue.volume}%\` | Filtro: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Toda a playlist' : 'Apenas a música') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

  client.distube
  .on('playSong', (queue, song) =>
    {
      queue.textChannel.send({embeds: [new MessageEmbed()
      .setFooter('Por: Parker')
      .setColor('BLUE')
      .setTitle(client.emotes.play + ' ' + song.name)
      .setImage(song.thumbnail)
      .addFields(
        {name: 'Views', value: '' + song.views, inline: true},
        {name: 'Likes', value: '' + song.likes, inline: true},
        {name: 'Duração', value: '' + song.formattedDuration, inline: true},
        {name: 'Publicado por', value: song.uploader.name},
        {name: 'Status', value: '' + status(queue)},
      )
    ]})
    }
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send({embeds: [new MessageEmbed()
      .setFooter('Por: Parker')
      .setColor('BLUE')
      .setTitle(client.emotes.success + ' ' + song.name)
      .setThumbnail(song.thumbnail)
      .addFields(
        {name: 'Views', value: '' + song.views, inline: true},
        {name: 'Likes', value: '' + song.likes, inline: true},
        {name: 'Duração', value: '' + song.formattedDuration, inline: true},
        {name: 'Publicado por', value: song.uploader.name},
        {name: 'Status', value: '' + status(queue)},
      )
    ]})
  )
  .on('addList', (queue, playlist) =>
      queue.textChannel.send({embeds: [new MessageEmbed()
        .setFooter('Por: Parker')
        .setColor('BLUE')
        .setImage(playlist.thumbnail)
        .setTitle(client.emotes.success + ' Playlist adicionada: ' + playlist.name)
        .addFields(
          {name: 'Duração', value: '' + playlist.formattedDuration},
          {name: 'Quantidade', value: '' + playlist.songs.length + (playlist.songs.length > 1 ? ' músicas' : ' música')},
        )
      ]})
  )
  .on('error', (channel, e) => {
    channel.send(`${client.emotes.error} | Ocorreu um erro: ${e.toString().slice(0, 1974)}`)
    console.error(e)
  })
  .on('empty', channel => channel.send('O canal de voz está vazio...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} | Sem resultados para \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send('Música terminada!'));
  client.distube.on('searchDone', () => {});
  client.distube.on("searchCancel", (message) => message.channel.send(client.emotes.error + ` | Pesquisa cancelada`));
  client.distube.on("searchInvalidAnswer", (message) => message.channel.send(client.emotes.error + ` | Número inválido!`));
  client.distube.on("searchResult", (message, results) => {
    message.channel.send(`**Resultados**\n${
        results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")
    }\n*Insira um número ou espere 1 minuto para cancelar*`);
});
///
//

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });

client.commands = new Discord.Collection();
fs.readdir("./commands/", async(err, files) => {
    if (err) return console.error(err);
    
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      var args = props.content != undefined ? props.content.split(' ').slice(1) : undefined;
      client.commands.set(commandName, props, args);
    });
  });

  client.login(client.config.token).then(() => {
    console.log(`Logado como ${client.user.tag}!`);
  })
  