import { Schema, model } from "mongoose";
import { UserDocument } from "./UserDocument";
import { MO } from "./MongoObject";

const UserSchema: Schema = new Schema(
  {
    _id: String,
    Language: MO(String, 'en', undefined)
  }, {
    versionKey: false,
    timestamps: true
  }
)

export = model<UserDocument>("users", UserSchema);
