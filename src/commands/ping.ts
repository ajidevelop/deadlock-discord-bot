import {
  CommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
} from 'discord.js';
import { Command } from '../interfaces/command';

export default class Ping implements Command {
  data: SlashCommandBuilder = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong');

  async execute(interaction: CommandInteraction): Promise<InteractionResponse> {
    return interaction.reply('Pong!');
  }
}
