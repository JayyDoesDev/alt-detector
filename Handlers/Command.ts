import { Context } from "../Context";
import glob from "glob";
import path from "path";
import { Command } from "../Common/DefineCommand";
import { ICommand } from "@antibot/interactions";
export default function (ctx: Context): Promise<void> {
  const commands: string[] = glob.sync("./dist/Plugins/**/**/*.js");
  for (let i = 0; i < commands.length; i++) {
    const file: any = require(path.resolve(commands[i]));
    if (!file.name || !file.commands) {
      return;
    }
    //@ts-ignore
    if (file.commands) {
      //@ts-ignore
      ctx.plugin.set(file.name, file);
      for (let i = 0; i < file.commands.length; i++) {
        const command: Command = file.commands[i];
        ctx.interactions.set(command.command.name, command);
      }
    }
  }
  const commandArray: ICommand[] = [];
  ctx.interactions.forEach((x) => {
    commandArray.push(x.command);
  });
  //@ts-ignore
  ctx.interact.overwriteGuildCommands("845605014663856158", commandArray);
}
