# Plugins ChatGPT

![chatgpt](../../core/plugins/chatgpt/assets/images/chatgpt.png =100x*)


Plugin qui permet de poser une question à ChatGPT en pasant par son API.


--- 

## Fonctionnement :

Règle à utiliser : "ChatGPT"

>**Exemples:**
>
> **ETAPE 1 :**
> Vous : `Peut tu poser une question à ChatGPT ?`
> Avatar : `Quel est votre question à poser !`
> Vous : `Qu'est-ce que chat gpt ?`
> Avatar envoi la question via l'API de Chatgpt et récupère la réponse 
> Avatar : `Chat GPT est un modèle de langage artificiel développé par OpenAI qui utilise l'apprentissage automatique pour générer des réponses textuelles en langage naturel.`
>
> **ETAPE 2 :** 
> Avatar : `A tu une autre question ?`
> Si l'utilisateur répond "oui", il rebouclera sur l'étape 1, une tout autre réponse mettra fin au plugin.
>

<br>
- La réponse de ChatGPT est limitée à une phrase :
`"limitonesentance"` : " Je souhaite la réponse en deux phrases complète.", 
Cette phrase est en faite ajouté à la fin de la question que l'on pose, pour limiter la réponse de chatGTP en deux phrases.  
- Et, à unn maximum de 90 tokens (pour la réponse : "completion") : 
Cette valeur peut être changé dans le fichier .js du plugin : `max_tokens: 64`. 
<br>

---

## Clé API pour OpenAI :

### IMPORTANT : 
Ce plugin neccessite une clé API qui doit être créer sur le site de OpenAI.
Pour crèer la clé, suivez les étapes suivantes :
<ol>
<li> Accédez à la plateforme OpenAI : Rendez-vous sur : (https://platform.openai.com/).</li> 
<li> Si vous n'avez pas encore de compte, inscrivez-vous en cliquant sur "Sign Up".</li>
<li> Générez une nouvelle clé API : Après vous être connecté, cliquez sur votre profil en haut à droite, puis sélectionnez "View API keys". Ensuite, cliquez sur "Create new secret key" pour générer une nouvelle clé API.</li>
</ol>

La clé est à mettre dans le paranètre qui se trouve dans le fichier "propriété" du Plugin Studio :
* `apikey` : Mettre votre clé ici.  
<br>

---

### Important

Il faudra également créditer votre compte d'environ $5 pour pouvoir utiliser l'API de Open AI.
OpenAI facture la demande en entrée de l'utilisateur (ptompt), et la réponse de chat gpt (completion).
Par défaut le plufin utilise le modèle "GPT-4o mini" qui se trouve être le modèle le plus économique. Pour info, 1 mot français équivaut à environ 2 tokens (moins en réalité). Les tarifs pour l'utilisation de l'API 'GPT-4o mini' sont les suivants :

- Tokens d'entrée (prompt) : 0,15 $ USD par million de tokens.
- Tokens de sortie (completion) : 0,60 $ USD par million de tokens.
<br>

---

## Ajouter un langage :

Vous pouvez localiser le dialogue d'A.V.A.T.A.R en ajoutant un pack de langues dans le dossier _chatgpt/locales_, en copiant un pack existant et en modifiant les valeurs de clés.
<br>

---

Créer pour A.V.A.T.A.R par : Nezumi

<br><br><br><br>