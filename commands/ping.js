exports.run = async(client, msg, args) => {
    msg.channel.send(`**🏓Pong!** \n**You current ping is at a whopping** \`${client.ws.ping}\` **ping**`);
}