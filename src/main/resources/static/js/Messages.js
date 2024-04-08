let password = {};
let username = {};
const socket = new SockJS('/calls');
const stompClient = Stomp.over(socket);

stompClient.connect({}, (frame) => {
    console.log('Connected: ' + frame);

    stompClient.subscribe('/topic/messages', (message) => {
        console.log('Received message: ' + message);
        showMessage(JSON.parse(message.body));
    });
});

fetch('demo/src/main/resources/Auth.txt')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        if (lines.length > 0) {
            const parts = lines[0].split(',');
            if (parts.length === 2) {
                username = parts[0].trim();
                password = parts[1].trim();
            }
        }
    })
    .catch(error => console.error(error));

function sendMessage() {    
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message !== '') {
        stompClient.send("/app/chat", {}, JSON.stringify({
            content: message,
            sender: username
        }));

        messageInput.value = '';
        showMessage(message);
    }
}

function showMessage(message) {
    console.log('Received message:', message);

    const messagesDiv = document.getElementById('messages');
    if (!messagesDiv) {
        console.error('Error: messagesDiv not found.');
        return;
    }

    const messageElement = document.createElement('p');

    if (typeof message === 'string') {
        messageElement.textContent = `Anonymous: ${message}`;
    } else {
        messageElement.textContent = `${message.sender || 'Anonymous'}: ${message.content || ''}`;
    }

    messagesDiv.appendChild(messageElement);

    console.log('Message displayed:', messageElement.textContent);
}
