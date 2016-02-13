import _ from "lodash";

import slack from "../slack";

export const checkTriggers = (triggers, message) => {
  // assume any caller is smart enough to only have one valid trigger per statement
  _.each(triggers, (t) => {
    const trigger = `${slack.self.name} ${t.trigger}`;
    if (message.text.indexOf(trigger) === 0) {
      // if the message had more to it, trim out the trigger for clarity in the action
      message.text = message.text.length > trigger.length ? message.text.substr(trigger.length + 1) : message.text;
      t.action(message);
    }
  });
};