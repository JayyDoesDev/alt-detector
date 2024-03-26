import { Schema, model } from "mongoose";
import { GuildDocument, Mail } from "./GuildDocument";
import { MO } from "./MongoObject";

const GuildSchema: Schema = new Schema(
  {
    _id: String,
    Prefix: MO(String, undefined, undefined),
    Days: MO(Number, 0, undefined),
    LoggerChannel: MO(String, null, undefined),
    NotifyChannel: MO(String, null, undefined),
    ActionType: MO(Number, 0, undefined),
    Mail: { System: MO(Boolean, false, undefined), Message: MO(String, "You do not meet the account days requirement!", undefined) },
    AltDetection: MO(Boolean, true, undefined),
    letIn: MO([], [], undefined)
  }, {
    versionKey: false,
    timestamps: true
  }
)

export = model<GuildDocument>("guilds", GuildSchema);
