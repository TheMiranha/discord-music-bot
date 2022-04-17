const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    var a = new MessageEmbed();
    const queue = client.distube.getQueue(message)
    if (!queue){
        a.setColor('RED');
        a.setDescription('Não há nada tocando');
        a.setTitle("Ops...");
        message.channel.send({embeds: [a]});
        return;

    }
    let mode = queue.repeatMode;
    mode = mode == 2 ? 0 : mode+1;
    mode = queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? 'repetir playlist' : 'repetir música') : 'Off'
    a.setColor('BLUE');
    a.setDescription(client.emotes.repeat + ' | Definido para ' + mode);
    message.channel.send({embeds: [a]});
}