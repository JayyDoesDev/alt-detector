import GuildSchema from "../Models/GuildSchema";
import type { Snowflake } from "@antibot/interactions";
export async function GuildExists(guildId: Snowflake): Promise<boolean> {
  let bool: boolean;
  await GuildSchema.findOne({ _id: guildId }) ? bool = true : bool = false;
  return bool;
}
