import _ from "lodash";

import * as plugins from "../plugins";
import { reply } from "../utils/message";

// todo: Not a fan of the chained bindings to get bot name, in triggers definition would be better
// slack object isn't fully defined on imports though, it completes login after being imported
const generateCommandHelp = (slack, command) => {
  const help = `-${command.title}: ${command.help}`;
  return help.replace("$BOTNAME", slack.self.name);
};

const generatePluginHelp = (slack, key) => {
  let pluginHelp = `*${key}*`;

  const commands = plugins[key];
  const commandsHelp = _.map(commands, generateCommandHelp.bind(this, slack))
    .join("\n");

  return `${pluginHelp}\n${commandsHelp}`;
};

const generalHelp = (message, slack) => {
  const keys = _.keys(plugins);
  const helpStrings = _.map(keys, generatePluginHelp.bind(this, slack)).join ("\n");

  reply(message, helpStrings);
};

const pluginHelp = (message, slack) => {
  const plugin = message.text;

  reply(message, generatePluginHelp(slack, plugin));
};

const triggers = [
  {
    trigger: `help topic`,
    action: pluginHelp,
    title: "Plugin Help",
    help: `Request a particular plugin's documentation by saying "$BOTNAME help -[PLUGIN]"`
  }, {
    trigger: `help`,
    action: generalHelp,
    title: "General Help",
    help: `Request all plugin documentation by saying "$BOTNAME help"`
  }
];

export default triggers;
