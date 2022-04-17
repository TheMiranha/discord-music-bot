const { MessageEmbed } = require("discord.js");

exports.run = async(client, message) => {
    var args = message.content.split(' ').slice(1);
    args = args.join(' ');
    if (args.length == 0)
    {
        var e = new MessageEmbed();
        e.setColor('RED');
        e.setDescription('Insira um nome ou uma url');
        e.setTitle('Ops...');
        message.channel.send({embeds: [e]});
        return;
    }
    if (message.member.voice.channel) {
    client.distube.play(message.member.voice.channel, args, {
        member: message.member,
        textChannel: message.channel,
        message
    });
} else {
    var e = new MessageEmbed();
    e.setColor('RED');
    e.setDescription('Você precisa estar em alguma canal de voz para executar este comando!');
    message.channel.send({embeds: [e]});
}
}