import UserSchema from "../Models/UserSchema";
import type { Snowflake } from "@antibot/interactions";
interface Values {
  value: string;
  replace: any;
}

interface i18nOptions {
  translate: string;
  values?: Values[];
}

export async function i18n(options: i18nOptions, userId: Snowflake): Promise<string> {
  try {
    const findUser = await UserSchema.findOne({ _id: userId });
    const lang = findUser ? await getLanguage(findUser.Language) : await getLanguage('en');
    let translation = lang;

    const keys = options.translate.split(".");
    for (const property of keys) {
      if (!Object.prototype.hasOwnProperty.call(translation, property)) {
        throw new Error(`Translation key "${options.translate}" not found.`);
      }
      translation = translation[property];
    }

    if (options.values) {
      for (const { value, replace } of options.values) {
        translation = translation.replace(replace, value);
      }
    }

    return translation;
  } catch (error) {
    console.error("Error during translation:", error);
    return "Translation error occurred.";
  }
}

async function getLanguage(language: string | String): Promise<any> {
  try {
    const lang = await import(`../../i18n/${language}.json`);
    return lang;
  } catch (error) {
    console.error(`Error loading language "${language}":`, error);
    throw new Error(`Language "${language}" not found.`);
  }
}
