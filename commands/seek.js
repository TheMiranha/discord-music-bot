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
    if (!args[0]) {
        a.setColor('RED');
        a.setTitle('Ops...');
        a.setDescription(client.emotes.error + ' | Insira uma posição (em segundos)');
        message.channel.send({embeds: [a]});
      }

      const time = Number(args[0])
      if (isNaN(time)) {
          a.setColor("RED");
          a.setDescription(client.emotes.error + ' | Inisira um número válido')
          return;
      }
      queue.seek(time)
      a.setDescription('Alterado para: ' + time)
      message.channel.send({embeds: [a]});
}