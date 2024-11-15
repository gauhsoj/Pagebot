const fs = require("fs-extra");
const axios = require('axios');

let convo = {};

async function chat(id, message) {
  if (!convo[id]) {
    convo[id] = [];
  }

  const msg = {
    id: generateId(),
    content: message,
    role: "user",
  };
  convo[id].push(msg);

  const payload = {
    messages: convo[id],
    id,
    previewToken: null,
    userId: null,
    codeModelMode: true,
    agentMode: {
      mode: true,
      id: "GriffithAI5BQXLbN",
      name: "Griffith AI",
    },
    trendingAgentMode: {},
    isMicMode: false,
    maxTokens: 1024,
    playgroundTopP: null,
    playgroundTemperature: null,
    isChromeExt: false,
    githubToken: "",
    clickedAnswer2: false,
    clickedAnswer3: false,
    clickedForceWebSearch: false,
    visitFromDelta: false,
    mobileClient: false,
    userSelectedModel: null,
    validated: "00f37b34-a166-4efb-bce5-1312d87f2f94",
  };

  const headers = {
    "accept": "*/*",
    "content-type": "application/json",
    "origin": "https://www.blackbox.ai",
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
  };

  //   console.log(JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post("https://www.blackbox.ai/api/chat", payload, { headers });

    console.log("API Response Data:", response.data);

    const result = {
      id: generateId(),
      content: response.data,
      role: "assistant",
    };
    convo[id].push(result);

    return result.content;
  } catch (error) {
    console.error(error.response?.status || "Unknown");
    console.error(error.response?.data || error.message);
    throw error;
  }
}
function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

function getEventType(event) {
  return new Promise((resolve) => {
    let type = "unknown";

    if (event) {
      const msg = event.message;
      if (msg) {
        if (msg.attachments) {
          type = "attachments";
        } else if (msg.reply_to) {
          type = "message_reply";
        } else if (msg.quick_reply) {
          type = "quick_reply";
        } else {
          type = "message";
        }
      } else if (event.postback) {
        type = "postback";
      } else if (event.reaction) {
        type = "message_reaction";
      } else if (event.read) {
        type = "mark_as_read";
      }
    }

    resolve(type);
  });
}

async function log(event) {
  const config = JSON.parse(fs.readFileSync("./config.json"), "utf8");
  let senderId = event.sender.id || null;

  if (config.ADMINS.includes(senderId)) {
    piece = "ADMIN";
  } else {
    piece = "USER";
  };

  const theme = require('../website/web.js').getTheme();

  if (event?.message?.text && !event?.message?.is_echo) {
    console.log(`${theme.gradient.multiline(piece)}: ${event.message.text} ${theme.color((await getEventType(event)).toUpperCase())}`)
  } else if (event.type === "message_reaction") {
    if (event.reaction.emoji) {
      console.log(`${theme.gradient.multiline(piece)}: ${senderId} reacted "${event.reaction.emoji}" to a message. ${theme.color((await getEventType(event)).toUpperCase())}`)
    } else {
      console.log(`${theme.gradient.multiline(piece)}: ${senderId} removed a reaction to a message. ${theme.color((await getEventType(event)).toUpperCase())}`)
    }
  } else if (event?.message?.is_echo && !config.selfListen) {
    console.log(`${theme.gradient.multiline("BOT")}: ${event?.message?.text || event?.message?.attachments?.[0].title || event?.message?.attachments[0]?.payload.url || null} ${theme.color((await getEventType(event)).toUpperCase())}`);
  } else if (event.type === "attachments") {
    console.log(`${theme.gradient.multiline(piece)}: ${event?.message?.attachments[0]?.payload.url || null} ${theme.color((await getEventType(event)).toUpperCase())}`)
  } else if (event.type === "postback") {
    console.log(`${theme.gradient.multiline(piece)}: ${event?.postback?.title} ${theme.color((await getEventType(event)).toUpperCase())}`);
  }
}

module.exports = {
  log,
  getEventType,
  chat
};