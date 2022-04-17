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
    a.setColor('BLUE');
    if (queue.paused)
    {
        client.distube.resume(message);
        a.setDescription(client.emotes.play + ' | Despausada');
    } else {
        a.setDescription(client.emotes.stop + ' | Pausada');
        client.distube.pause(message);
    }
    message.channel.send({embeds: [a]});

}