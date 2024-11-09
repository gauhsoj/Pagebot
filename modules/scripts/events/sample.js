module.exports.config = {
  name: "auto",
  author: "Deku",
  version: "1.0",
  description:
    "Griffith AI",
  selfListen: false,
};
const axios = require("axios");
module.exports.run = async function ({ event, args }) {
  function reply(q) {
    api.sendMessage(q, event.sender.id);
  }
  if (event.type === "message") {
    const base = "https://joshweb.click";
    const id = event.sender.id;
    const q = args.join(" ");
    if (!q) return reply("Missing query");
    const res = await axios.get(base + "/api/gpt-4o?q=" + q + "&uid=" + id);
    reply(res.data.result);
  }
};
