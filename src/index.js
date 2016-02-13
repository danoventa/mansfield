import slack from "./slack";
import _ from "lodash";

import * as plugins from "./plugins";
import { checkTriggers } from "./utils/triggers";
import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/my_database');

// load all our plugins into the slack object we imported
_.each(plugins, (triggers) => {
  slack.on("message", (message) => {
    //console.log(message);
    checkTriggers(triggers, message)
  });
});