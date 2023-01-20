import Discord, { Client, Interaction, AutocompleteInteraction, GatewayIntentBits } from 'discord.js';
import { Logger } from "../utils/log.js";
import {  } from "../utils/database.js";
import EventScheduler from "../utils/eventScheduler.js";
import config from "../config/main.json" assert { type: "json" };


class NucleusClient extends Client {
    logger = Logger;
    config: typeof config = config;
    noLog: string[] = [];
    database: {
        eventScheduler: EventScheduler
    };
    preloadPage: Record<string, {command: string, argument: string}> = {};  // e.g. { channelID: { command: privacy, page: 3}}
    commands: Record<string, {
        command: Discord.SlashCommandBuilder |
                ((builder: Discord.SlashCommandBuilder) => Discord.SlashCommandBuilder) |
                Discord.SlashCommandSubcommandBuilder | ((builder: Discord.SlashCommandSubcommandBuilder) => Discord.SlashCommandSubcommandBuilder) | Discord.SlashCommandSubcommandGroupBuilder | ((builder: Discord.SlashCommandSubcommandGroupBuilder) => Discord.SlashCommandSubcommandGroupBuilder),
        callback: (interaction: Interaction) => Promise<void>,
        check: (interaction: Interaction) => Promise<boolean> | boolean,
        autocomplete: (interaction: AutocompleteInteraction) => Promise<string[]>
    }> = {};

    constructor(database: typeof NucleusClient.prototype.database) {
        super({ intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMembers
        ]});
        this.database = database;
    }
}

const client = new NucleusClient({
    eventScheduler: new EventScheduler()
});

export default client;
export { NucleusClient };