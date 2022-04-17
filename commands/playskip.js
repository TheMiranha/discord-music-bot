const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    const string = args.join(' ')
    if (!string) {
        message.channel.send({embeds: [new MessageEmbed().setColor('RED').setFooter('Por: Parker').setTitle('Ops...').setDescription(client.emotes.error + ' | Insira uma url ou um termo para pesquisa')]})
        return;
    }
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message,
      skip: true
    })
}