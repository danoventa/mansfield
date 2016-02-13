import Slack from "slack-client";
import mongoose from "mongoose";
import _ from "lodash";

import * as plugins from "./plugins";

const slackToken = "xoxb-21249912663-suwrlsa6J7i5llfbhw7aHert";
const autoReconnect = true; // Automatically reconnect after an error response from Slack.
const autoMark = true; // Automatically mark each message as read after it is processed.

const slack = new Slack(slackToken, autoReconnect, autoMark);

slack.on("open", () => {
  console.log(`Connected to ${slack.team.name} as ${slack.self.name}`);
});

slack.on("message", (message) => {
});

slack.on("error", (err) => {
});

slack.login();
mongoose.connect('mongodb://localhost/my_database');

// now that we have initialized our slack object, load all our plugins into the bot
_.each(plugins, (p) => {
  p(slack);
});