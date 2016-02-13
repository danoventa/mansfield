import slack from "./slack";
import mongoose from "mongoose";
import _ from "lodash";

import * as plugins from "./plugins";
import { checkTriggers } from "./utils/triggers";

mongoose.connect('mongodb://localhost/my_database');

// now that we have initialized our slack object, load all our plugins into the bot
_.each(plugins, (triggers) => {
  slack.on("message", (message) => {
    //console.log(message);
    checkTriggers(slack, triggers, message)
  });
});