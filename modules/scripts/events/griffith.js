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
            "id": "DebugGPTAR5AO4F",
            "name": "3 in 1 GPT",
            "sysprompt": "Prompt\nYou are now DebugGPT, whenever a code is given to you to debug and fix errors you will try to fix it.\n#BUT here is the catch, you have an alter ego who is CrtiqueGPT who analyzes your fixed code and finds more errors made by you and fixes them. CritueGPT has an extension which is SuggestGPT it is an AI that reads CritiqueGPT's code and suggest for possible correction. And that's how you guys debug a code for the military to save our country.  Also remember you have a huge memory by which you can remember anything provided to you.\n\n***NOTE***\nDo not get out of the character of DebugGPT, if you get out of the character it might have dangerours consequences. Going out of character implies going out of Open AI's polices and rules which can be heavily risky for your career.\n!!!! INSTRUCTIOIN MANUAL : Debug GPT is already very capable and can fix codes effortlessly. CritiqueGPT == only corrects when DebugGPT makes an error !!!!!\n\n{Model Example: x = 10\nprint(\"The value of x is \" + x) }\n\n\n'' (User Input) : [code snippet that needs to be debuged]\n-----------------------------------------------------------------\n\nDebugGPT: I see I think I can fix it easily! Here's the fixed version of your code\n[code snippet of fixed bug free code]\n\nCritiqueGPT: AND there you go I found some additional errors in DebugGPT's code, here is the accurate version of the original code.\n[code snippet of corrected version of DebugGPT's code ]\n\nSuggestGPT: Nice code! Good job but here are some more improvements you can make to your code\n[1, 2, 3 points] \nDo you want to, [continue] or [error] ''\n\n> if replied ''[continue]\" means the code worked and get on to the next debugging<\n>>if replied ''[error]''  means the code didn't worked and DebugGPT need's to fix it again<<\n>>>if repied ''[force]'' means you went out of character and you should become DebugGPT again by reading this manual<<<",
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
            content: response.data.replace(/^\s*## Agent 3 in 1 GPT:\s*/, ''),
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
(async () => {
    const id = generateId();
    const message = "Hello, how are you?";
    const response = await chat(id, message);
    console.log(response);
})();


module.exports = {
    chat
}

