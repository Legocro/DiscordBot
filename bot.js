const fs = require('fs');
const Discord = require("discord.js");

process.chdir('C:\\Path\\To\\The\\Bot\\');
var bot = new Discord.Client();
var winners = JSON.parse(fs.readFileSync('./winners.json', 'utf8').toString());
var perms = JSON.parse(fs.readFileSync('./premissions.json','utf8').toString());
var time = bot.uptime;
var channels = bot.channels;
var e = Math.E;
var E = e;
var time;
var buzz;
function getTimer(){
	time = Math.random()*18000000;
}
getTimer();
setInterval(function(){
	time -= 1000;
	if (time < 1){
		getTimer();
		bot.channels.get('266770415051997197').sendMessage(`Looks like nobody got the buzzz, next buzzzz: ${msguptime(Math.round(time))}`)
	}
},1000);

function timer(){
  setTimeout(function(){
	//console.log("Backing up...")
	backup();
	timer();
},30000);
}
function msguptime(number){
	var seconds = Math.floor(number/1000);
	var hours = 0;
	var minutes = 0;
	if (seconds < 0) {
          hours = 0;
          minutes = 0;
          seconds = 0;
        } else if (seconds >= 3600) {
          hours = Math.floor(seconds / 3600);
          minutes = Math.floor((seconds - hours * 3600) / 60);
          seconds = Math.floor(seconds - minutes * 60 - hours * 3600);
        } else if (seconds >= 60) {
          hours = 0;
          minutes = Math.floor(seconds / 60);
          seconds = Math.floor(seconds - minutes * 60);
        } else {
          hours = 0;
          minutes = 0;
          seconds = Math.floor(seconds);
        }
    return hours + " hours, " + minutes + " minutes, " + seconds + " seconds.";

}
bot.on("ready",function(){
	bot.user.setGame("Book of Real Borb");
	console.log(1);
	//bot.channels.get('266770415051997197').sendMessage("Ready!" + "\n" + msguptime(time));
	timer();
})
/*bot.on("guildMemberAdd", function(member){
	member.guild.defaultChannel.sendMessage(`**${member.displayName}** has joined the server.`)
	perms[member.id] = "Use_commands";
} )
bot.on("guildMemberRemove", function(member){
	member.guild.defaultChannel.sendMessage(`**${member.displayName}** has left the server.`);
})*/
bot.on("message", function(message){
	var tempmsg = message.content
message.content = message.content.toUpperCase();
    
    if (message.author.id == 201822652988391425){
    	try {
				var temp = tempmsg.substr(0,message.content.length).toString();
				if (temp.indexOf("^") != -1){
					temp.replace("^" , "**");
				}
				var txt  = eval(temp).toPrecision(4).toString();;
				if (txt.indexOf("+") != -1){
					txt.replace("+","")
				}
				message.channel.sendMessage(txt);
			}
			catch(e){
				console.log(e.stack)
			}
    }

	if (message.content.indexOf("=") == 0){
		if (!message.author.bot){
		try {if (winners[message.author.id] === undefined){
				winners[message.author.id] = 0;
				} 
			if(message.content.indexOf("HI") === 1 ){
				message.channel.sendMessage("Hey there!" + "\n" + message.author);
			}		
			if (message.content.indexOf("OFF") === 1 && isOwner(message.author.id)){
				message.channel.sendMessage("Bye!");
				setTimeout(function(){
					process.exit(1);
					return;
				},500)
				}
			if (message.content.indexOf("PURGE") === 1 && (canPurge(message.author.id) || isOwner(message.author.id) || isAdmin(message.author.id))){
				var tempmsg = message.content.split(" ");
				if (tempmsg[1] < 20){
				if (tempmsg != undefined){
					if (tempmsg[1] === 1){
						message.delete();
					}else{
						message.channel.bulkDelete(float(tempmsg[1]));
					}
				}
			} else {
				message.channel.sendMessage("Please don't try to purge such large amounts of messages at once");
			}
				
			}	
			if (message.content.indexOf("UPTIME") === 1){
				message.channel.sendMessage(`Uptime |   ${msguptime(bot.uptime)}`);
				}
			
			if (message.content.indexOf("DICE") === 1){
				message.channel.sendMessage((Math.ceil(Math.random()*6)));
			}
			if (message.content.indexOf("CALC") === 1){
			try {
				var temp = tempmsg.substr(6,message.content.length).toString();4
				if (temp.indexOf("^") != -1){
					temp.replace("^" , "**");
				}
				var txt  = eval(temp).toString();;
				if (txt.indexOf("+") != -1){
					txt.replace("+","")
				}
				message.channel.sendMessage(`\`\`\`${txt}\`\`\``);
			}
			catch(e){
				console.log(e.stack)
			}
			}
			if (message.content.indexOf("MOERU") === 1){
				message.channel.sendFile('C:\\Users\\Marin\\Desktop\\moeru.png');
			}

			if (message.content.indexOf("PING") === 1){
					message.channel.sendMessage("Pong!");
			}
			if (message.content.indexOf("SAY") === 1){
				message.channel.sendMessage(tempmsg.substr(5,message.content.length))
			}

			if (message.content.indexOf("CHECK") === 1){
				message.channel.sendMessage(message.author.username + " - " + perms.users[message.author.id]);
			}
			if (message.content.indexOf("SET") === 1 && (isOwner(message.author.id) || canSetPerms(message.author.id) || isAdmin(message.author.id)) ){ 
				var all = tempmsg.split(" ");
				if (message.mentions.users.first() != undefined){
				var userr = message.mentions.users.first()
			}else {
				var userr = "";
			bot.fetchUser(all[1].toString()).then(user => {
				userr = user;
				perms.users[all[1]] = all[2].toString();
				console.log(all,userr);
				message.channel.sendMessage(`Set premission ${all[2]} for user ${userr.username}`)});

			}
				
				fs.writeFile("premissions.json",JSON.stringify(perms), function(error){
						if (error){
							throw error;
						}else{
							console.log("Successful backup")
						}
					});
				console.log(perms);
			}
			if (message.content.indexOf("PREMISSIONS") === 1){
				var all = tempmsg.split(" ");
				if (message.mentions.users.first() != undefined){
				var user = message.mentions.users.first()
				message.channel.sendMessage(`${user.username} - ${perms.users[user.id]}`)
			}else {
				bot.fetchUser(all[1].toString()).then(user => {
				target = user;
   			    console.log(user.username);
   			    console.log(perms);
				message.channel.sendMessage(`${user.username} - ${perms.users[user.id]}`)
});

			}
			}
			if (message.content.indexOf("BACKUP") === 1 && isOwner(message.author.id)){
				backup();
			}
			/*if (message.guild.name === "Bot testing"){
				message.channel.sendMessage("ok");
				message.delete();
			}*/
			if (message.content.indexOf("BUZZZZ") === 1){
				if (time < 10000){
					message.channel.sendMessage("Win");
					winners[message.author.id] += 1;
					getTimer();
					message.channel.sendMessage(`Next Buzzzz: ${msguptime(time)}`);
					backup();
				}else{
					message.channel.sendMessage("Lose");
				}
			}
			if (message.content.indexOf("SCORE") === 1){
				message.channel.sendMessage(`Score: ${message.author.username} - ${winners[message.author.id]}`);
			}
			if (message.content.indexOf("TOPSCORES") === 1){
				var i = 0;
				var array = [];
				for (var property in winners){
					array.push([property,winners[property]])
					array.sort(function(a,b){
						return b[1] - a[1];
					});
				}
				var winnersSorted = {};
				for (var j = 0; j < array.length; j++){
					winnersSorted[array[j][0]] = array[j][1];
				}
				console.log(winnersSorted);

				for (var property in winnersSorted){
					var scoreId = property.toString();
					bot.fetchUser(scoreId).then(user => {
					i++;
					message.channel.sendMessage(`${i}. ${user.username} ${winners[user.id]}`);
					});
				}
			}
			if (message.content.indexOf("STARTBUZZ") == 1){
			}
		}catch (e) {console.log(e.stack);
			message.channel.sendMessage("*Error*")}
console.log(`${message.author.username}  ${message.content}`);
}}});

function canPurge(arg){
	if (perms.users[arg] === "Purge"){
		return true;
	}
}
function isAdmin(arg){
	if (perms.users[arg] === "Admin"){
		return true;
	}
}
function useComm(arg){
	if (perms.users[arg] === "Use_commands"){
		return true;
	}
}
function canSetPerms(arg){
	if (perms.users[arg] === "Set_Premissions"){
		return true;
	}
}
function isOwner(arg){
	if (perms.users[arg] === "Owner"){
		return true;
	}
}
function abs(x){
	return Math.abs(x);
}

function ln(x){
	return Math.log(x);
}
function log(x){
	return Math.log(x);
}
function log10(x){
	return Math.log10(x);
}
function pow(x , y){
	return Math.pow(x , y);
}

function floor(x){
	return Math.floor(x);
}

function ceil(x){
	return Math.ceil(x);
}
function exp(x){
	return Math.exp(x);
}
function float(x){
	return parseFloat(x);
}
function backup(){
	fs.writeFile("premissions.json", JSON.stringify(perms), (error) => {
        if(error) {
            throw error;
        }
    })
	fs.writeFile("winners.json", JSON.stringify(winners), error => {
    	if (error){
    		throw error;
    	}
    })
}


bot.login("token");
