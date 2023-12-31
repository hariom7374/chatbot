const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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";

const createChatLi = (message,className) => {
    console.log('createChatLi')
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === `outgoing` ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}
const genereteResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({  "model": "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "You are a helpful assistant."
          },
          {
            role: "user",
            content: userMessage
          }
        ]})
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        console.log(data);
    }).catch((error) =>{
        console.log(error);
    })
}

const handleChat = () => {
    console.log('handleChat')
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

// Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));

    setTimeout(() => {
    //     Display "thinking..."message while waiting for the responce
        chatbox.appendChild(createChatLi("Thinking...","incoming"));
        genereteResponse();
    },600);
}

sendChatBtn.addEventListener("click",handleChat)