import { DefinePlugin, Plugin } from "../../Common/DefinePlugin";
import { DefineEvent } from "../../Common/DefineEvent";
import { ChatInputCommandInteraction } from "discord.js";
import { Command, DefineCommand } from "../../Common/DefineCommand";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ButtonStyle,
  PermissionsToHuman,
  PlantPermission,
  MessageComponentType as ComponentType
} from "@antibot/interactions";
import { Context } from "../../Context";
import { i18n } from "../../Common/i18n";
export = DefinePlugin({
  name: "Core",
  description: "Core process.",
  commands: [
    DefineCommand({
      command: {
        name: "avatar",
        type: ApplicationCommandType.CHAT_INPUT,
        description: "Gets your or a member avatar",
        options: [
          {
            type: ApplicationCommandOptionType.USER,
            name: "member",
            description: "The member to fetch avatar",
            required: false
          }
        ],
      },
      on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
        await interaction.deferReply();
        return interaction.editReply({
          embeds: [
            {
              title: await i18n(
                {
                  translate: "AltDetector.commands.avatar.embed.title",
                  values: [
                    {
                      replace: "{username}",
                      value: interaction.user.username
                    }
                  ]
                },
                interaction.user.id
              ),
              color: Number(process.env.COLOR),
              image: {
                url: interaction.user.displayAvatarURL()
              },
              footer: {
                text: interaction.user.username,
                icon_url: interaction.user.displayAvatarURL()
              }
            }
          ]
        })
      }
    }),
    DefineCommand({
      command: {
        name: "invite",
        type: ApplicationCommandType.CHAT_INPUT,
        description: "Invite Alt Detector to your server!",
        options: []
      },
      on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
        await interaction.deferReply();
        return interaction.editReply({
          embeds: [
            {
              title: await i18n({ translate: "AltDetector.commands.invite.embed.title" }, interaction.user.id),
              description: await i18n(
                {
                  translate: "AltDetector.commands.invite.embed.description",
                  values: [
                    {
                      replace: "{invite_link}",
                      value: `https://discord.com/oauth2/authorize?client_id=${process.env.BOTID}&permissions=201452678&scope=bot%20applications.commands`
                    }
                  ]
                },
                interaction.user.id
              ),
              color: Number(process.env.COLOR)
            }
          ],
          components: [
            {
              type: ComponentType.ActionRow as number,
              components: [
                {
                  type: ComponentType.Button as number,
                  style: ButtonStyle.Link as number,
                  label: await i18n({ translate: "AltDetector.commands.invite.embed.title" }, interaction.user.id),
                  url: `https://discord.com/oauth2/authorize?client_id=${process.env.BOTID}&permissions=201452678&scope=bot%20applications.commands`
                }
              ]
            }
          ]
        })
      }
    }),
    DefineCommand({
      command: {
        name: "privacy",
        type: ApplicationCommandType.CHAT_INPUT,
        description: "Read the bot's privacy policy",
        options: [],
      },
      on: async (ctx: Context, interaction: ChatInputCommandInteraction) => {
        await interaction.deferReply();
        return interaction.editReply({
          embeds: [
            {
              title: await i18n({ translate: "AltDetector.commands.privacy.embed.title" }, interaction.user.id),
              description: await i18n(
                {
                  translate: "AltDetector.commands.privacy.embed.description",
                  values: [
                    {
                      replace: "{github_link}",
                      value: "https://gist.github.com/colderry/150f81de2642ee57316be7189a3c6880"
                    }
                  ]
                },
                interaction.user.id
              ),
              color: Number(process.env.COLOR),
              footer: {
                text: interaction.user.username,
                icon_url: interaction.user.displayAvatarURL()
              }
            }
          ]
        })
      }
    })
  ],
  events: [
    DefineEvent({
      event: {
        name: "ready",
        once: true,
      },
      on: (ctx) => {
        console.log(`${ctx.user.username} has logged in!`);
      },
    }),
    DefineEvent({
      event: {
        name: "interactionCreate",
        once: false,
      },
      on: (interaction, ctx) => {
        if (!interaction.isCommand()) {
          return;
        }
        const command: Command = ctx.interactions.get(interaction.commandName);
        if (command) {
          if (command.permissions) {
            const perms: any[] = [];
            let permDisplay: string = "";
            if (!interaction.appPermissions.has(command.permissions)) {
              //@ts-ignore
              for (var i = 0; i < command.permissions.length; i++) {
                perms.push(
                  PermissionsToHuman(PlantPermission(command.permissions[i]))
                );
              }
              if (perms.length <= 2) {
                permDisplay = perms.join(" & ");
              } else {
                permDisplay = perms.join(", ");
              }
              //@ts-ignore
              return interaction.reply({
                content: `I'm missing permissions! (${permDisplay})`,
              });
            }
          }

          command.on(ctx, interaction);
        }
      },
    }),
    DefineEvent({
      event: {
        name: "error",
        once: false
      },
      on: (e) => {
        console.log(`Error: ${e.rawError.message}\nMethod: ${e.method}\nUrl: ${e.url} `);
      }
    })
  ],
  public_plugin: true
}) as Plugin;
