const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
    const queue = client.distube.getQueue(message)
    var a = new MessageEmbed();
    if (!queue) {
        a.setColor("RED");
        a.setTitle('Ops...');
        a.setDescription('Não há músicas na playlist')
        message.channel.send({embeds: [a]});
        return;
    }
     queue.previous()
}