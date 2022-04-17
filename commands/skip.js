const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
    var a = new MessageEmbed();
    const queue = client.distube.getQueue(message)
    if (!queue){
        a.setColor('RED');
        a.setDescription(client.emotes.error + ' | Não há nada tocando');
        a.setTitle("Ops...");
        message.channel.send({embeds: [a]});
        return;
    }
    try {
        const song = await queue.skip()
        a.setColor('BLUE');
        a.setDescription(client.emotes.success + ' | Pulada! Tocando: \n' + song.name);
        message.channel.send({embeds: [a]});
      } catch (e) {
        message.channel.send(`${client.emotes.error} | ${e}`)
      }
}