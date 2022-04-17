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
    queue.stop();
    a.setColor('BLUE');
    a.setDescription(client.emotes.success + ' | Parei de tocar!');
    message.channel.send({embeds: [a]});
}