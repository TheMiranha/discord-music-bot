const { MessageEmbed } = require("discord.js");

exports.run = async(client, message, args) => {
    let voiceChannel = message.member.voice.channel
    var a = new MessageEmbed();
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0])
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        a.setDescription(`${client.emotes.error} | ${args[0]} não é um canal de voz!`);
        a.setColor('RED');
        message.channel.send({embeds: [a]});
        return;
      }
    }
    if (!voiceChannel) {
        a.setDescription(`${client.emotes.error} | Você precisa estar em um canal de voz ou inserir um id de canal!`);
        a.setColor('RED');
        message.channel.send({embeds: [a]});
        return;
      }
      client.distube.voices.join(voiceChannel);
    }