import { config } from 'dotenv';
import { Client } from 'discord.js';
import { commands, deployCommands } from './commands/index';
import { Command } from './interfaces/command';

config()
const commandData = commands.reduce<Record<string, Command>>((map, command) => {
  map[command.data.name] = command;
  return map;
}, {})

const token = process.env.DISCORD_TOKEN ?? '';

const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'DirectMessages']
})

client.once("ready", () => {
  console.log('Ready! 🤖');
})

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id })
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  // check if command exists before executing
  const command = commandData[interaction.commandName]
  if (command) {
    await command.execute(interaction)
  }
})

client.login(token)
