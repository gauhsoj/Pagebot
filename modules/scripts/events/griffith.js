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

module.exports = {
    chat
}