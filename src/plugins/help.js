import _ from "lodash";

import * as plugins from "../plugins";
import slack from "../slack";
import { reply } from "../utils/message";

const generateCommandHelp = (command) => {
  return `-${command.title}: ${command.help}`
};

const generatePluginHelp = (key) => {
  console.log('plugins', plugins);
  console.log('plugins[key]', plugins[key]);
  let pluginHelp = `*${key}*`;

  const commands = plugins[key];
  const commandsHelp = _.map(commands, generateCommandHelp).join("\n");
  return `${pluginHelp}\n${commandsHelp}`;
};

const generalHelp = (message) => {
  const keys = _.keys(plugins);
  const helpStrings = _.map(keys, generatePluginHelp).join ("\n");

  reply(message, helpStrings);
};

const pluginHelp = (message) => {
  const plugin = message.text;

  reply(message, generatePluginHelp(plugin));
};

// todo: make it dynamic, let them do help by plugin
const triggers = [
  {
    trigger: `help topic`,
    action: pluginHelp,
    title: "Plugin Help",
    help: `Request a particular plugin's documentation by saying "${slack.self && slack.self.name} help -[PLUGIN]"`
  }, {
    trigger: `help`,
    action: generalHelp,
    title: "General Help",
    help: `Request all plugin documentation by saying "${slack.self && slack.self.name} help"`
  }
];

export default triggers;
