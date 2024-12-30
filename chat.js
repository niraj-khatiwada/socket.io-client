// Connect to the Socket.IO server
const socket = io("http://localhost:8000", { withCredentials: true });

// DOM elements
const chatContainer = document.getElementById("chat-container");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Function to add a message to the chat
function addMessage(message, isOwnMessage = false) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.style.textAlign = isOwnMessage ? "right" : "left";
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Send a message when the button is clicked
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    addMessage(`You: ${message}`, true);
    socket.emit("message", message); // Emit the message to the server
    messageInput.value = "";
  }
});

// Listen for incoming messages
socket.on("message", (message) => {
  addMessage(`Stranger: ${message}`);
});
