import mongoose from "mongoose";
import _ from "lodash";

import Quote from "../models/quote";
import { checkTriggers } from "../utils/triggers";

export default (slack) => {
  const addQuote = (message) => {
    console.log(message);
    // first get author

    // now get the quote itself

    // now append a new Quote object to our DB

  };

  const getUserQuote = (message) => {
    // get a quote from a specific user if any exist for them
    console.log(message);
  };

  const getQuote = (message) => {
    // get a random quote
    const channel = slack.getChannelGroupOrDMByID(message.channel);
    channel.send("test quote");
  };

  const triggers = [
    { trigger: `add quote`, action: addQuote },
    { trigger: `quote @`, action: getUserQuote }, // todo: this trigger will be annoying for users
    { trigger: "quote", action: getQuote }
  ];

  slack.on("message", (message) => {
    //console.log(message);
    checkTriggers(slack, triggers, message)
  });
}
