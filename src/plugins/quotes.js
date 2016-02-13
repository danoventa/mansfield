import _ from "lodash";

import slack from "../slack";
import Quote from "../models/quote";

const addQuote = (message) => {
  console.log(`'${message.text}'`);
  const quote = Quote({
    quote: message.text
  });
  console.log(quote);
  quote.save();
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

export default triggers;
