import _ from "lodash";

export const checkTriggers = (slack, triggers, message) => {
  // assume any caller is smart enough to only have one valid trigger per statement
  _.each(triggers, (t) => {
    console.log(message.text, `, ${slack.self.name} ${t.trigger}, `,
      message.text.indexOf(`${slack.self.name} ${t.trigger}`));
    if (message.text.indexOf(`${slack.self.name} ${t.trigger}`) === 0) {
      t.action(message);
    }
  });
};