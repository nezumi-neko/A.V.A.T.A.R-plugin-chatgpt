import OpenAI from "openai";

let Locale;

const openai = new OpenAI({
    apiKey: Config.modules.chatgpt.apikey
});

export async function init() {
    if (!await Avatar.lang.addPluginPak("chatgpt")) {
        return error('chatgpt: unable to load language pak files');
    }
}

export async function action(data, callback) {
    try {
        Locale = await Avatar.lang.getPak("chatgpt", data.language);
        if (!Locale) {
            throw new Error (`chatgpt: Unable to find the '${data.language}' language pak.`);
        }

        Avatar.askme(Locale.get('message.request', data.client), data.client, {
            "*": "generic",     // Règle générique pour capturer toute réponse
            "finish": "done"    // Commande spécifique pour terminer l'interaction
        }, 15, async (response, end) => {
           
            end(data.client);   // Termine l'écoute et restaure l'état d'écoute normal
           
            if (response && typeof response === "string") {          // Vérifie si la réponse est valide
                const cleanedResponse = response.replace("generic:", "").trim();    // Supprime le mot "generic" si présent

                if (cleanedResponse === "done") {       // Cas de l'arrêt par "done"
                    Avatar.speak(Locale.get('message.reponsedone', data.client), data.client);
 
                } else {
                    await poserQuestionChatGPT(data, cleanedResponse);  // Appelle la fonction poserQuestionChatGPT avec la réponse reçue
                }

            } else {
                Avatar.speak(Locale.get('message.reponsenovalid', data.client), data.client);  // En cas de réponse non comprise ou timeout
            }
        });

    } catch (err) {
        if (data.client) Avatar.Speech.end(data.client);
        if (err.message) error(err.message);
    }
    callback();
}

async function poserQuestionChatGPT(data, userResponse) {
    try {
        const question = typeof data.question === 'string' ? data.question : `${userResponse} ${Locale.get('message.limitonesentance', data.client)}`;
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Modifiez ce modèle si nécessaire selon votre configuration
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: question }
            ],
            temperature: 0.7,
            max_tokens: 90, // Vous pouvez ajuster ce nombre selon vos besoins
            top_p: 1,
        });

        // Vérification et extraction de la réponse
        const reponseChatGPT = response?.choices?.[0]?.message?.content?.trim() || Locale.get('message.errpacklang', data.client);

        // Log de la réponse brute
        console.log("Réponse brute de l'API OpenAI :", response);

        // Stockage de la question et de la réponse dans l'historique, avec limite de taille
        const historiqueConversations = []; // Déclaration du tableau d'historique
        if (historiqueConversations.length >= 1000) {
            historiqueConversations.shift(); // Retire la plus ancienne conversation
        }
        historiqueConversations.push({
            question: question,
            reponse: reponseChatGPT,
            timestamp: new Date().toISOString() // Ajoute un horodatage
        });

        console.log("Historique des conversations : ", historiqueConversations);

        if (data.client) {
            Avatar.speak(reponseChatGPT, data.client, function () {
              // Demande si l'utilisateur a une autre question
              Avatar.askme(Locale.get('message.anotherquestion', data.client), data.client, {
                "*": "generic",
                "non": "done",
                 "yes": "continue",
                "oui": "continue"
            }, 15, async (response, end) => {
                end(data.client);
                    if (response && response.toLowerCase().includes("continue")) {
                        // Relance le premier `askme` pour obtenir une nouvelle question
                        action(data, () => {}); // Relance le cycle initial
                    } else {
                        Avatar.speak(Locale.get('message.reponsedone', data.client), data.client);
                    }
                });
            });
        }

        const pluginFromMessage = L.get("plugin.from") || "Source inconnue";
        info("chatgpt:", data.action.command, pluginFromMessage, data.client);
    } catch (err) {
        if (data.client) Avatar.Speech.end(data.client);
        if (err.message) error(err.message);
    }
}
