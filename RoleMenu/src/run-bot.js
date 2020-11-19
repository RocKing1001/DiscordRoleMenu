const activateBtn = document.getElementById("startbutton");

activateBtn.onclick = runBot;


// This part does the thing
async function runBot() {
    
    // Trying to get this to be included in build
    require('dotenv').config();

    const Discord = require('discord.js');
    const client = new Discord.Client();
    const TOKEN = process.env.TOKEN;
    const fs = require('fs')

    // Helps in doing that
    const storeData = (data, path) => {
        try {
            fs.writeFileSync(path, JSON.stringify(data, null, 2))
        } catch (err) {
            console.error(err)
        }
    }


    // The main part of the thing
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('message', msg => {
        if (msg.attachments.size > 0) {
            console.log(`${msg.member.user.tag}: ATTACHED FILE, Captions: ${msg.content}`);
        } else {
            console.log(`${msg.member.user.tag}: ${msg.content}`);
        }
    });


    // Write JSON stuff to file
    client.on('message', msg => {
        if (msg.content === 'role') {
            storeData(msg.guild.roles, "temp.json");
            console.log(msg.guild.roles)
        }
    });

    client.on('message', msg => {
        if (msg.content === 'ping') {
            msg.reply('Pong!');
        }
    });


    // login
    console.log(TOKEN)
    client.login(TOKEN);
}