import _ from "lodash";

import slack from "../slack";
import Quote from "../models/quote";
import { reply } from "../utils/message";

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
  reply(message, "test quote");
};

const triggers = [
  {
    trigger: `add quote`,
    action: addQuote,
    title: "Add Quote",
    help: `Add a quote to the list by saying "$BOTNAME add quote \`[QUOTE]\` -name`
  }, {
    trigger: `quote person`, // see if you can make it just "quote "
    action: getUserQuote,
    title: "Quote person",
    help: `Request a quote from a particular source by saying "$BOTNAME quote [NAME]`
  }, {
    trigger: "quote",
    action: getQuote,
    title: "Random Quote",
    help: `Request a random quote by saying "$BOTNAME quote`
  }
];

export default triggers;
