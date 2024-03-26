import { Document } from "mongoose";


export interface Mail {
  System: Boolean;
  Message: String;
}

export interface GuildDocument extends Document {
  _id: string;
  Prefix: String;
  Days: Number;
  LoggerChannel: String;
  NotifyChannel: String;
  ActionType: Number;
  Mail: Mail;
  AltDetection: Boolean;
  letIn: Boolean;
}
