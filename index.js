import Slack from "slack-client";

const slackToken = "xoxb-21249912663-suwrlsa6J7i5llfbhw7aHert";
const autoReconnect = true; // Automatically reconnect after an error response from Slack.
const autoMark = true; // Automatically mark each message as read after it is processed.

const slack = new Slack(slackToken, autoReconnect, autoMark);

slack.on("open", () => {
    console.log("Connected to #{slack.team.name} as @#{slack.self.name}");
});

slack.on("message", (message) => {
    console.log(message);
});

slack.on("error", (err) => {
    console.error("Error", err);
});

slack.login();