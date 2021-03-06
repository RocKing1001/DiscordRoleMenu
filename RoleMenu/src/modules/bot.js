// This part does the thing
module.exports = {
    botsrc: async function runBot() {

        // its definately dotenv
        const budgetenv = require('../secret/token.js')

        const Discord = require('discord.js')
        const client = new Discord.Client()
        const { writeFileSync } = require('fs')

        // The main part of the thing
        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`)
        });

        client.on('message', msg => {
            if (msg.attachments.size > 0) {
                console.log(`${msg.member.user.tag}: ATTACHED FILE, Captions: ${msg.content}`)
            } else {
                console.log(`${msg.member.user.tag}: ${msg.content}`)
            }
        });


        // Write JSON stuff to file
        client.on('message', msg => {
            if (msg.content === 'role') {

                console.log(msg.guild.roles)

                let roleList = msg.guild.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(r => r)
                    .join("\n")
                if (!roleList) roleList = "No roles"
                

                var listLength = roleList.split(/\r\n|\r|\n/).length
                var i = 0

                var outputRoles = ""

                while (i != listLength) {
                    var thisLine = roleList.split('\n')[i]
                    
                    thisLine = thisLine.replace('<@&', '')
                    thisLine = thisLine.replace('>', '')
                    thisLine = thisLine.replace('@', '')

                    if (thisLine != 'everyone') {
                        var myRole = msg.guild.roles.cache.get(thisLine)
                        myRole = myRole.name
                    } else {
                        myRole = thisLine
                    }
                    
                    outputRoles = outputRoles + myRole + '\n'
                    
                    i += 1
                }
                
                msg.channel.send(outputRoles)

                writeFileSync("temp.txt", outputRoles)
            }
        });


        client.on('message', msg => {
            if (msg.content === 'chadrole') {
                let rolemap = msg.guild.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(r => r)
                    .join(",");
                if (rolemap.length > 1024) rolemap = "To many roles to display";
                if (!rolemap) rolemap = "No roles";
                const embed = new Discord.MessageEmbed()
                    .addField("Role List", rolemap)
                msg.channel.send(embed);
            }
        });

        client.on('message', msg => {
            if (msg.content === 'embedlel') {
                let rolemap = message.guild.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(r => r)
                    .join(",");
                if (rolemap.length > 1024) rolemap = "To many roles to display";
                if (!rolemap) rolemap = "No roles";
                const embed = Discord.MessageEmbed()
                    .addField("Role List", rolemap)
                msg.channel.send(embed);
            }
        });

        client.on('message', msg => {
            if (msg.content === 'ping') {
                msg.reply('Pong!')
            }
        });

        client.on('message', msg => {
            if (msg.content === 'konsoladus') {
                msg.reply('yup working on it')
            }
        });

        // login
        client.login(budgetenv.token)
    }
}
