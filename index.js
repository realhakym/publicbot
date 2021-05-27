// Define Crucial Variables
const config = require('./config.json');
const Discord = require('discord.js')
const ms = require('ms');
const client = new Discord.Client();

// Client ready message for console
client.on('ready',  async() => {
    console.log('I am online and ready to listen to commands!')
    client.user.setActivity('Beta Dark Police || developed by D4RK', { type: 'PLAYING' });
})

// Define your message parameter and run the rest of your code
client.on('message', async(msg) => {

    if(msg.author.bot) return;
    if(!msg.guild) return;
    if(msg.content.length >= 300) {
    msg.delete();
    msg.channel.send(`${msg.author} , you are not allowed to send unnecessarily long and annoying messages in this server!`)
     }

    
    // Filtered words array and actions

    var array = ['pula', 'pizda', 'muie', 'sugi'];

        if(array.some(w =>  ` ${msg.content.toLowerCase()} `.includes(` ${w} `))){
            msg.delete();
            msg.channel.send(`${msg.author} , this server does not tolerate that kind of language! You have been muted for 1 minute to stop you from repeating this mistake again.`)

     var reason = ('You were warned by the moderation system for using filtered language.');


            var embed = new Discord.MessageEmbed()
            .setColor('0xff3030')
            .setTitle('You have receieved a warning from **Dark Police**')
            .addField('Reason for warn:' , reason)
            

		// Sending embed to user that was warned
            try {
                msg.author.send(embed);
            } catch(err) {
                console.warn(err);
            }



		// Mute the user
            
            var role = msg.guild.roles.cache.find(r => r.name === 'Muted');    
            
            
                msg.member.roles.add(role);
            setTimeout(async() => {
               msg.member.roles.remove(role);
            }, ms('1m')) }
            
        
        // Define prefix and command handler
    
    var prefix = config.prefix;
    if(!msg.content.toLowerCase().startsWith(prefix)) return;

    var args = msg.content.split(' ')
    var cmd = args.shift().slice(prefix.length).toLowerCase();
    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(client, msg, args);

    }catch(err) {
        console.warn(err);
    }

    
})
// Make your bot login
client.login(config.token);