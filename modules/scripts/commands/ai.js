module.exports.config = {
  name: "ai", 
  author: "Deku", 
  version: "1.0", 
  category: "Utility", 
  description: "Talk to AI powered by GPT-4 (Conversational)", 
  adminOnly: false, 
  usePrefix: false,
};

module.exports.run = function ({ event, args }) {
  function reply(q) {
    api.sendMessage(q, event.sender.id)
  }
  const axios = require("axios");
  const base = "https://joshweb.click";
  const id = event.sender.id;
  const q = args.join(" ");
  if (!q) return reply("Missing query");
  const { data } = axios.get(base + "/api/gpt-4o?q=" + q + "&uid=" + id);
  reply(data.result);
};