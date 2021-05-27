const  Discord = require('discord.js')
exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGS')) return;
    if(!args[0]) return msg.reply(' you need to specify a time for me to set slowmode to!')
    if(isNaN(args[0])) return msg.reply('you need to specify a valid number for me to set slowmode to!');
    var time = args[0]
    if(args[0] < 0) return msg.reply('you need to specify a positive number for me to set slowmode to!');
    if(args[0] > 21600) return msg.reply('you need to specify a time that is less than 6 hours (21,600 seconds)');
    msg.channel.setRateLimitPerUser(time)

    var verify = msg.guild.emojis.cache.find(emoji => emoji.name === 'yes');

    var embed = new Discord.MessageEmbed()
    .setColor('0x05ff4c')
    .setTitle(`${verify} I have succesfully set slowmode to \`${time}\` seconds!`);
    msg.channel.send(embed)
}