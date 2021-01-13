require('dotenv').config();
const { Client, Message, MessageMentions, MessageEmbed } = require('discord.js');
const client = new Client({
    partials:['MESSAGE', 'REACTION']
});
const PREFIX = process.env.TOKEN;
client.on('ready', () =>{
    console.log(`${client.user.username} has logged in`)
    client.user.setActivity('!help 😄', { type: 'PLAYING' });
}); 

client.on('message', (message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        if(message.channel.type === 'dm')
            return
        const [command, ...args]= message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        if(command==='help'){
            var exampleEmbed = new MessageEmbed()
            .setColor('#000000')
            .setTitle('List of commands:')
            .setAuthor('Lancer bot','https://i.imgur.com/553wJyI.png')
            .addFields(
            { name: '!roster', value: 'Displays the current League of Legends roster' },
            { name: '!matches', value: 'Displays the next match'},
            )
            .setFooter('Made by Metz');
            return message.channel.send(exampleEmbed);
        }
        if(command==='roster'){
            var emoji = client.emojis.cache.get("798409549412958209")
            var emoji2 = client.emojis.cache.get("798409665964539904")
            var rosterEmbed = new MessageEmbed()
            .setColor('#000000')
            .setTitle('League of Legends roster:')
            .setAuthor('Lancer bot')
            .addFields(
            { name: 'Top Lane', value: 'Alex Birtwistle, Michael Clarke' },
            { name: 'Jungle', value: 'Ken Wen, Benjamin Cristina' },
            { name: 'Mid Lane', value: 'Nicholas LeBel, Firas Al Khulaidy' },
            { name: 'ADC', value: 'Tyler Hong, HangYI Huang' },
            { name: 'Support', value: 'Mark Barkou, Osama Aleisawy' },
            )
            .addField('Twitter', `[${emoji2}](https://twitter.com/uwlancergaming?lang=en)`, true)
            .addField('Instagram', `[${emoji}](https://www.instagram.com/lancergamingca/)`, true)
            .setImage('https://www.uwindsor.ca/dailynews/sites/uwindsor.ca.dailynews/files/900_esports_1.jpg')
            .setURL('https://www.youtube.com/watch/dQw4w9WgXcQ');
            return message.channel.send(rosterEmbed);     
        }
        if(command === 'matches'){
            var fs = require('fs');
            var fileContent = fs.readFileSync('next_match.txt', 'utf-8');
            if(fileContent === '')
                return message.channel.send('No matches found');
            return message.channel.send(fileContent);
        }  
        if(command==='kick'){
            if(args.length===0 ) return message.reply("Who tf you wanna kick");
            if(message.author.username==='metz'){
                var member= message.guild.members.cache.get(args[0]);
                if(member){
                   message.channel.send("Woah calm down man");
                }
                else message.channel.send("Member not found");
            }
            else return message.channel.send("You cant do this :)");
        }
        if(command === 'remind'){
            if(reminder_count>3) return message.channel.send("Reminder limit reached");
            if(args.length == 0)
            return message.channel.send("Improper use");
            if (args[0].startsWith('<@') && args[0].endsWith('>')) {
                var remind_message="";
                if(args[2] != undefined){
                    var i=2;
                    while(args[i] != undefined){
                        remind_message = remind_message.concat(args[i]).concat(' ');
                        i+=1;
                    }
                }
                args[0] = args[0].slice(2, -1);
        
                if (args[0].startsWith('!')) {
                    args[0] = args[0].slice(1);
                } 
                var user=message.guild.members.cache.get(args[0]);
                if(args[1].endsWith('h')){
                    var time=parseInt(args[1]);
                    if(time>5)
                        return message.channel.send("Time cannot be more than 5 Hours right now :(");
                    else
                    setTimeout(() => {
                        reminder_count-=1;
                        return message.channel.send(`This is a reminder ${user}: ${remind_message}`);
                    }, time*60*60*1000);
                }
                else if(args[1].endsWith('m')){
                    var time=parseInt(args[1]);
                    if(time>60)
                        return message.channel.send(`Just use hours then 😀`);
                    setTimeout(() => {
                        reminder_count-=1;
                        return message.channel.send(`This is a reminder ${user}: ${remind_message}`);
                    }, time*60*1000);
                }
                if(args[1].endsWith('h') || args[1].endsWith('m'))
                    reminder_count+=1;
            }
            else{
                var remind_message="";
                if(args[1] != undefined){
                    var i=1;
                    while(args[i] != undefined){
                        remind_message = remind_message.concat(args[i]).concat(' ');
                        i+=1;
                    }
                }
                if(args[0].endsWith('h')){
                    var time=parseInt(args[0]);
                    if(time === 0) return;
                    if(time>5)
                        return message.channel.send("Time cannot be more than 5 Hours right now :(");
                    else
                    setTimeout(() => {
                        reminder_count-=1;
                        return message.channel.send(`This is a reminder ${user}: ${remind_message}`);
                    }, time*60*60*1000);
                }
                else if(args[0].endsWith('m')){
                     var time=parseInt(args[0]);
                    if(time === 0)
                        return;
                    if(time>60)
                        return message.channel.send(`Just use hours then 😀`);
                    setTimeout(() => {
                        reminder_count-=1;
                        return message.channel.send(`This is a reminder ${message.author}: ${remind_message}`);
                    }, time*60*1000);
                }
                if(args[0].endsWith('h') || args[0].endsWith('m'))
                    reminder_count+=1;   
            }
        }
    }
});
client.login(process.env.DISCORDJS_BOT_TOKEN); 
