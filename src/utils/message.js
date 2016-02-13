import slack from "../slack";

export const reply = (message, replyText) => {
  const channel = slack.getChannelGroupOrDMByID(message.channel);
  channel.send(replyText);
};
