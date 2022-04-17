const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    var a = new MessageEmbed();
    const queue = client.distube.getQueue(message)
    if (!queue){
        a.setColor('RED');
        a.setDescription(client.emotes.error + ' | Não há nada tocando');
        a.setTitle("Ops...");
        message.channel.send({embeds: [a]});
        return;
    }
    const volume = parseInt(args[0])
    if (isNaN(volume)) {
        a.setColor('RED');
        a.setDescription(client.emotes.error + ' | Insira um número válido!');
        message.channel.send({embeds: [a]});
        return;
    }
    queue.setVolume(volume)
    a.setColor('BLUE');
    a.setDescription(client.emotes.success + ' | Volume alterado para: ' + volume);
}