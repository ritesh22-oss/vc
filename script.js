// Constants for DOM elements
const createRoomBtn = document.getElementById('create-room');
const joinRoomBtn = document.getElementById('join-room');
const roomCodeElement = document.getElementById('room-code');
const generatedRoomCodeElement = document.getElementById('generated-room-code');
const currentRoomDisplay = document.getElementById('current-room');
const myVideo = document.getElementById('my-video');
const opponentVideo1 = document.getElementById('opponent-video1');

const micToggleBtn = document.getElementById('mic-toggle');
const videoToggleBtn = document.getElementById('video-toggle');
const messageInput = document.getElementById('message-input');
const sendMessageBtn = document.getElementById('send-message');
const chatMessages = document.getElementById('chat-messages');

// Function to generate a random room ID
function generateRoomId() {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
}

// Handle create room button click
if (createRoomBtn) {
    createRoomBtn.addEventListener('click', () => {
        const roomId = generateRoomId();
        generatedRoomCodeElement.innerText = roomId;
        roomCodeElement.classList.remove('hidden');
        localStorage.setItem('generatedRoomId', roomId);
    });
}

// Handle join room button click
if (joinRoomBtn) {
    joinRoomBtn.addEventListener('click', () => {
        const roomId = document.getElementById('room-id').value;
        if (roomId) {
            localStorage.setItem('joinedRoomId', roomId);
            window.location.href = 'video.html';
        } else {
            alert("Please enter a valid Room ID.");
        }
    });
}

// Handle video call functionality
if (myVideo) {
    // Display room ID
    const roomId = localStorage.getItem('joinedRoomId') || localStorage.getItem('generatedRoomId');
    if (currentRoomDisplay) {
        currentRoomDisplay.innerText = roomId;
    }

    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            myVideo.srcObject = stream;
            // Simulate getting opponent streams (replace with actual stream fetching)
            // Example: opponentVideo1.srcObject = opponentStream1;
            // Example: opponentVideo2.srcObject = opponentStream2;
            // Example: opponentVideo3.srcObject = opponentStream3;
        })
        .catch(error => console.error('Error accessing media devices.', error));

    // Toggle mic
    if (micToggleBtn) {
        micToggleBtn.addEventListener('click', () => {
            const stream = myVideo.srcObject;
            const audioTracks = stream.getAudioTracks();
            if (audioTracks.length > 0) {
                audioTracks[0].enabled = !audioTracks[0].enabled;
                micToggleBtn.textContent = audioTracks[0].enabled ? 'Mic Off' : 'Mic On';
            }
        });
    }

    // Toggle video
    if (videoToggleBtn) {
        videoToggleBtn.addEventListener('click', () => {
            const stream = myVideo.srcObject;
            const videoTracks = stream.getVideoTracks();
            if (videoTracks.length > 0) {
                videoTracks[0].enabled = !videoTracks[0].enabled;
                videoToggleBtn.textContent = videoTracks[0].enabled ? 'Video Off' : 'Video On';
            }
        });
    }

    // Handle sending message (if chat is included)
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', () => {
            const message = messageInput.value;
            if (message) {
                const messageElement = document.createElement('div');
                messageElement.textContent = `You: ${message}`;
                chatMessages.appendChild(messageElement);
                messageInput.value = '';
                // Add functionality to broadcast message to other participants
            }
        });
    }
}
