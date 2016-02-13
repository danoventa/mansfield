

export default (slack) => {
  slack.on("message", (message) => {
    console.log(message);
  });
}
