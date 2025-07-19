import { config } from 'dotenv';
import { Command } from '../interfaces/command';
import { readdirSync } from 'fs';
import * as path from 'path';
import * as process from 'process';
import { deployCommandsProps } from '../types/deploy-commands';
import { REST, Routes } from 'discord.js';

const commandsDir = path.join(process.cwd(), 'src', 'commands');
const files = readdirSync(commandsDir);

let commands: Array<Command> = [];

async function importCommands() {
  for (const file of files) {
    if (file !== 'index.ts' && (file.endsWith('.ts') || file.endsWith('.js'))) {
      const filePath = path.join(commandsDir, file);
      const module = await import(filePath);
      commands.push(new module.default());
    }
  }
}

await importCommands();

config()
const token = process.env.DISCORD_TOKEN ?? '';
const clientId = process.env.DISCORD_CLIENT_ID ?? '';

const rest = new REST({ version: '10' }).setToken(token);

export async function deployCommands({ guildId }: deployCommandsProps) {
  try {
    console.log('Refreshing application (/) commands');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands.map((command) => command.data.toJSON())
    })

    console.log('Successfully deployed application (/) commands');
  } catch (error) {
    console.error('Error deploying commands:', error);
  }
}

export { commands };
