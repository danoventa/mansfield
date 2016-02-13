import _ from "lodash";

import slack from "../slack";
import Quote from "../models/quote";
import { reply } from "../utils/message";

const addQuote = (message) => {
  // todo: improve validation
  if (message.text.indexOf("`") === -1 || message.text.indexOf("-") === -1) {
    return reply(message, "Improper format. Use the help command if you don't know the format to use.");
  }

  // first get the quote
  const segments = message.text.split("`");
  const quoteText = segments[1];

  // now get the author
  const author = segments[2].split("-")[1];

  // now append a new Quote object to our DB
  const quote = Quote({
    quote: quoteText,
    author: author
  });
  quote.save();
};

const getUserQuote = (message) => {
  // todo: better validation
  if (message.length === 0) {
    reply(message, "Improper format. Please provide a name to quote from. If you need help, use the help command.");
  }

  // get a quote from a specific user if any exist for them
  Quote.find({
    author: message.text
  }, (err, docs) => {
    if (err || _.isEmpty(docs)) {
      return reply(message, `Sorry, no quotes for \`${message.text}\` were found.`)
    }

    const randomIndex = Math.floor(Math.random() * docs.length);
    const quote = docs[randomIndex];
    return reply(message, `\`${quote.quote}\` -${quote.author}`);
  });
};

const getQuote = (message) => {
  if (message.text.length > 0) {
    return getUserQuote(message);
  }

  Quote.find({}, (err, docs) => {
    if (err || _.isEmpty(docs)) {
      return reply(message, `Sorry, no quotes for \`${message.text}\` were found.`)
    }

    const randomIndex = Math.floor(Math.random() * docs.length);
    const quote = docs[randomIndex];
    return reply(message, `\`${quote.quote}\` -${quote.author}`);
  });
};

const triggers = [
  {
    trigger: `add quote`,
    action: addQuote,
    title: "Add Quote",
    help: `Add a quote to the list by saying "$BOTNAME add quote \`[QUOTE]\` -name"`
  }, {
    trigger: `quote person`, // todo: see if you can make it just "quote "
    action: getUserQuote,
    title: "Quote person",
    help: `Request a quote from a particular source by saying "$BOTNAME quote [NAME]" or "$BOTNAME quote person [NAME]"`
  }, {
    trigger: "quote",
    action: getQuote,
    title: "Random Quote",
    help: `Request a random quote by saying "$BOTNAME quote"`
  }
];

export default triggers;
