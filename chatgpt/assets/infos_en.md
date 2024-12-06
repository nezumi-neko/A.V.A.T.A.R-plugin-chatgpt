# ChatGPT Plugins

![chatgpt](../../core/plugins/chatgpt/assets/images/chatgpt.png =100x*)


A plugin that allows you to ask a question to ChatGPT using its API.


--- 

## How it works :

Rule to use : "ChatGPT"

>**Examples:**
>
> **STEP 1 :**
> You : `Can you ask a question to ChatGPT ?`
> Avatar : `What is your question !`
> You : `What is ChatGPT ?`
> Avatar sends the question via the ChatGPT API and retrieves the response
> Avatar : `ChatGPT is an artificial language model developed by OpenAI that uses machine learning to generate natural language responses.`
>
> **STEP 2 :**
> Avatar : `Do you have another question ?`
> If the user answers "yes", it will loop back to step 1, any other response will end the plugin.


<br>
- ChatGPT's response is limited to one sentence : 
`"limitonesentance"` : "I would like the response in two complete sentences." 
This phrase is added to the end of the question being asked, limiting the ChatGPT response in two sentence.
- And, with a maximum of 90 tokens (for the "completion" response): 
This value can be changed in the plugin's .js file: `max_tokens: 64`.
<br>

---

## API Key for OpenAI :

IMPORTANT: This plugin requires an API key that must be created on the OpenAI website.
To create the key that needs to be placed in the plugin's property file, follow these steps :
<ol>
<li> Access the OpenAI platform : Go to : (https://platform.openai.com/).</li>
<li> Log in to your account: If you do not have an account yet, sign up by clicking on "Sign Up".</li>
<li> Generate a new API key: After logging in, click on your profile at the top right, then select "View API keys". Next, click on "Create new secret key" to generate a new API key.</li>
</ol>

The key should be placed in the parameter located in the "property" file of the Plugin Studio:
* `apikey` : Place your key here. 
<br>

---

### Important

You will also need to credit your account with approximately $5 to use the OpenAI API. OpenAI charges for both the user's input (prompt) and the ChatGPT response (completion). 
By default, the plugin uses the "GPT-4o mini" model, which is the most cost-effective model. For reference, 1 French word is approximately equivalent to 2 tokens (slightly less in reality). The rates for using the 'GPT-4o mini' API are as follows:

- Input tokens (prompt): $0.15 USD per million tokens.
- Output tokens (completion): $0.60 USD per million tokens. 
<br>


---

## Adding a language :

You can localize the A.V.A.T.A.R dialogue by adding a language pack in the chatgpt/locales folder, by copying an existing pack and modifying the key values.
<br>

---

Created for A.V.A.T.A.R by : Nezumi

<br><br><br><br>