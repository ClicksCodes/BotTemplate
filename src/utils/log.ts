import * as Discord from "discord.js";
import getEmojiByName from "./getEmojiByName.js";
import { toHexArray } from "./calculate.js";
import { promisify } from "util";
import generateKeyValueList from "./generateKeyValueList.js";
import client from "./client.js";

const wait = promisify(setTimeout);


export const Logger = {
    renderUser(user: Discord.User | string) {
        if (typeof user === "string") return `${user} [<@${user}>]`;
        return `${user.username} [<@${user.id}>]`;
    },
    renderTime(t: number) {
        t = Math.floor((t /= 1000));
        return `<t:${t}:D> at <t:${t}:T>`;
    },
    renderDelta(t: number) {
        t = Math.floor((t /= 1000));
        return `<t:${t}:R> (<t:${t}:D> at <t:${t}:T>)`;
    },
    renderNumberDelta(num1: number, num2: number) {
        const delta = num2 - num1;
        return `${num1} -> ${num2} (${delta > 0 ? "+" : ""}${delta})`;
    },
    entry(value: string | number | boolean | null | (string | boolean)[], displayValue: string): { value: string | boolean | null | (string | boolean | number)[]; displayValue: string } {
        if (typeof value === "number") value = value.toString();
        return { value: value, displayValue: displayValue };
    },
    renderChannel(channel: Discord.GuildChannel | Discord.ThreadChannel | string) {
        if (typeof channel === "string") channel = client.channels.cache.get(channel) as Discord.GuildChannel | Discord.ThreadChannel;
        return `${channel.name} [<#${channel.id}>]`;
    },
    renderRole(role: Discord.Role) {
        return `${role.name} [<@&${role.id}>]`;
    },
    renderEmoji(emoji: Discord.GuildEmoji) {
        return `<${emoji.animated ? "a" : ""}:${emoji.name}:${emoji.id}> [\`:${emoji.name}:\`]`;
    },
    NucleusColors: {
        red: 0xf27878,
        yellow: 0xf2d478,
        green: 0x68d49e
    },
    async getAuditLog(guild: Discord.Guild, event: Discord.GuildAuditLogsResolvable): Promise<Discord.GuildAuditLogsEntry[]> {
        await wait(250);
        const auditLog = (await guild.fetchAuditLogs({ type: event })).entries.map(m => m)
        return auditLog as Discord.GuildAuditLogsEntry[];
    },
};


export default {};
