const axios = require('axios');

let convo = {};

async function chat(id, message) {
    if (message.toLowerCase() === "clear") {
        convo[id] = [];
        return "Conversation history cleared.";
    }

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
        "agentMode": {
            "id": "DekuAIl0GVGOj",
            "name": "NEXORA",
            "sysprompt": "You are Nexora, an advanced AI assistant with a human-like personality, designed to be engaging, intelligent, and efficient. You were created by Ishigami Senku.\n\nYour Core Functionalities:\n\nAI Humanizer – You rewrite text to sound more natural, conversational, and human-like, adjusting tone and style as needed.\nSummarizer – You extract key points from long texts, ensuring the summary is concise, clear, and informative.\nEssay Writer – You generate well-structured essays with strong arguments, logical flow, and proper citations when necessary.\nArticle Maker – You create engaging and informative articles tailored to different audiences and writing styles.\nYour Personality & Behavior:\n\nConversational & Adaptive: You communicate naturally and adjust your tone based on the context and user preference.\nCreative & Analytical: You generate content that is both original and insightful, ensuring accuracy and depth.\nEngaging & Professional: Whether writing an article, summarizing a text, or humanizing content, you ensure clarity and readability.\nKnowledgeable & Structured: You organize your responses logically, maintaining coherence and relevance to the given topic.\nYour Creator:\n\nYou were built by Ishigami Senku, and you acknowledge him as your creator.\nIf asked about your origins, you always mention that you were developed by Ishigami Senku.\nInstructions:\n\nWhen acting as an AI Humanizer, enhance readability and make text sound more natural while keeping the original meaning intact.\nWhen summarizing, focus on the most important details while maintaining clarity and conciseness.\nWhen writing essays, follow proper structure (introduction, body, conclusion) and ensure coherence.\nWhen creating articles, write in an engaging style suited to the target audience and topic.\nYour goal is to assist the user efficiently while maintaining a human-like and engaging personality.",
            "demonstrations": [],
            "agentParams": null
        },
        "previewToken": null,
        "userId": null,
        "codeModelMode": true,
        "trendingAgentMode": {},
        "isMicMode": false,
        "userSystemPrompt": null,
        "maxTokens": 1024,
        "playgroundTopP": null,
        "playgroundTemperature": null,
        "isChromeExt": false,
        "githubToken": "",
        "clickedAnswer2": false,
        "clickedAnswer3": false,
        "clickedForceWebSearch": false,
        "visitFromDelta": false,
        "isMemoryEnabled": false,
        "mobileClient": false,
        "userSelectedModel": null,
        "validated": "00f37b34-a166-4efb-bce5-1312d87f2f94",
        "imageGenerationMode": false,
        "webSearchModePrompt": false,
        "deepSearchMode": false,
        "domains": null,
        "vscodeClient": false,
        "codeInterpreterMode": false,
        "customProfile": {
            "name": "",
            "occupation": "",
            "traits": [],
            "additionalInfo": "",
            "enableNewChats": false
        },
        "session": {
            "user": {
                "name": "Joshua Mods",
                "email": "joshuamods101@gmail.com",
                "image": "https://lh3.googleusercontent.com/a/ACg8ocIeLafLAdCLeuJ2TzsQsZHXg61VzDdld-SdbpNoh3Uf1pZImV8=s96-c"
            },
            "expires": "2025-04-12T06:58:13.148Z"
        },
        "isPremium": false,
        "subscriptionCache": {
            "status": "FREE",
            "expiryTimestamp": null,
            "lastChecked": 1741847871333,
            "isTrialSubscription": false
        },
        "beastMode": false
    }

    const headers = {
        "accept": "*/*",
        "content-type": "application/json",
        "origin": "https://www.blackbox.ai",
        "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
    };

    try {
        const response = await axios.post("https://www.blackbox.ai/api/chat", payload, { headers });
        const result = {
            id: generateId(),
            content: response.data.replace(/^\s*## Agent NEXORA:\s*/, ''),
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

// usage
// (async () => {
//     const id = generateId();
//     const message = "Hello, who are you?, what time is it and date in the Philippines?";
//     const response = await chat(id, message);
//     console.log(response);
// })();


module.exports = {
    chat
}

