import UserSchema from "../Models/UserSchema";
import type { Snowflake } from "@antibot/interactions";
export async function UserExists(userId: Snowflake): Promise<boolean> {
  let bool: boolean;
  await UserSchema.findOne({ User: userId }) ? bool = true : bool = false;
  return bool;
}
