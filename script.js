document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById("chatWindow");
    const messageInput = document.getElementById("messageInput");
    const sendMessageButton = document.getElementById("sendMessageButton");
    const fileInput = document.getElementById("fileInput");

    // Function to add a message to the chat window
    function addMessage(content, type = "text", isSent = true) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        if (isSent) messageDiv.classList.add("sent");

        if (type === "text") {
            messageDiv.textContent = encryptMessage(content);
        } else if (type === "media") {
            const media = document.createElement(content.tagName);
            media.src = content.src;
            media.controls = true;
            media.style.maxWidth = "100%";
            messageDiv.appendChild(media);
        }

        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Encrypt message (basic Caesar cipher for demonstration)
    function encryptMessage(message) {
        const shift = 3; // Simple Caesar cipher
        return message
            .split("")
            .map(char => String.fromCharCode(char.charCodeAt(0) + shift))
            .join("");
    }

    // Decrypt message
    function decryptMessage(encryptedMessage) {
        const shift = 3; // Simple Caesar cipher
        return encryptedMessage
            .split("")
            .map(char => String.fromCharCode(char.charCodeAt(0) - shift))
            .join("");
    }

    // Event listener for sending messages
    sendMessageButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, "text");
            messageInput.value = "";
        }
    });

    // Event listener for file uploads
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            const tagName = file.type.startsWith("video/") ? "video" : "img";
            addMessage({ src: fileURL, tagName }, "media");
        }
    });
});
