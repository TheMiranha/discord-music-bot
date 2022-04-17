const { MessageEmbed } = require("discord.js");

exports.run = async(client, message) => {
    var args = message.content.split(' ').slice(1);
    const queue = client.distube.getQueue(message);
    var a = new MessageEmbed();
    if (!queue) {
        a.setColor('RED');
        a.setTitle('Ops...');
        a.setDescription('Não há músicas na fila');
        message.channel.send({embeds: [a]});
        return;
    }
    if (args[0] === 'off' && queue.filters?.length) queue.setFilter(false)
    else if (Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0])
    else if (args[0]) return message.channel.send(`${client.emotes.error} | Não é um filtro válido`)
    message.channel.send(`Filtro: \`${queue.filters.join(', ') || 'Off'}\``)
}
