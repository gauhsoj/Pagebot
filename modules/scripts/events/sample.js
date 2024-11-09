module.exports.config = {
  name: "auto",
  author: "Deku",
  version: "1.0",
  description: "Griffith AI",
  selfListen: false,
};

const axios = require("axios");

module.exports.run = async function ({ event }) {
  function reply(q) {
    api.sendMessage(q, event.sender.id);
  }

  if (event.type === "message") {
    const base = "https://joshweb.click";
    const id = event.sender.id;
    const q = event.message.text;

    try {
      const res = await axios.get(`${base}/api/gpt-4o?q=${q}&uid=${id}`);
      reply(res.data.result);
      console.log(res.data.result);
    } catch (error) {
      if (error.code === "ETIMEDOUT") {
        console.error("Request timed out. Please try again later.");
        reply("Sorry, the request timed out. Please try again later.");
      } else {
        console.error(error.message);
        reply(error.message);
      }
    }
  }
};
