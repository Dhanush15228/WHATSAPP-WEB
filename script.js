document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages-container');
    const contactList = document.getElementById('contact-list');
    const chatHeader = document.getElementById('chat-header');
    const typingIndicator = document.getElementById('typing-indicator');

    let currentContact = 'Chat';

    contactList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            currentContact = e.target.dataset.contact;
            chatHeader.textContent = currentContact;
            messagesContainer.innerHTML = '';
            typingIndicator.style.display = 'none';
        }
    });

    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value;
        if (messageText.trim()) {
            addMessage(messageText, 'sent');
            messageInput.value = '';
            simulateResponse();
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
        typingIndicator.style.display = 'block';
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            typingIndicator.style.display = 'none';
        }, 1000);
    });

    let typingTimeout;

    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.textContent = text;

        const timestamp = document.createElement('span');
        timestamp.classList.add('timestamp');
        timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageElement.appendChild(timestamp);

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function simulateResponse() {
        setTimeout(() => {
            typingIndicator.style.display = 'block';
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                addMessage("This is a response", 'received');
            }, 1000);
        }, 500);
    }
});
