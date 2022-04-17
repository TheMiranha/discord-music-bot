const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
    const queue = client.distube.getQueue(message);
    var a = new MessageEmbed();
    if (!queue)
    {
        a.setColor('RED');
        a.setTitle('Ops...');
        a.setDescription(client.emotes.error + ' | Não há músicas na fila');
        message.channel.send({embeds: [a]});
        return;
    }
    const autoplay = queue.toggleAutoplay();
    a.setColor('BLUE');
    a.setDescription(client.emotes.success + ' | Autoplay: ' + (autoplay ? 'On' : 'Off'));
    message.channel.send({embeds: [a]});
}