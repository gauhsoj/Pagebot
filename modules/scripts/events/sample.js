module.exports.config = {
  name: "auto",
  author: "Deku",
  version: "1.0",
  description: "Griffith AI",
  selfListen: false,
};
const { chat } = require("../utils.js");

module.exports.run = async function ({ event }) {
  function reply(q) {
    api.sendMessage(q, event.sender.id);
  }

  if (event.type === "message") {
    try {
      const id = event.sender.id;
      const msg = event.message.text;
      const res = await chat(id, msg);
      return reply(res);
    } catch (err) {
      reply("Error: " + err);
    }
  }
};
