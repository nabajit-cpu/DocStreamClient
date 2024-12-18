import React, { useEffect, useState } from 'react';

const App = () => {
    const [ws, setWs] = useState(null);        // To store WebSocket connection
    const [message, setMessage] = useState("");  // To store received message
    const [inputMessage, setInputMessage] = useState(""); // To store the message to send

    // Establish WebSocket connection when component mounts
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/ws");

        socket.onopen = () => {
            console.log("WebSocket connection established.");
        };

        socket.onmessage = (event) => {
            console.log("Received message:", event.data);
            setMessage(event.data); // Update the message state with the received data
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        // Store the WebSocket connection in the state
        setWs(socket);

        // Cleanup function to close WebSocket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, []);

    // Handle sending a message to the WebSocket server
    const sendMessage = () => {
        if (ws && inputMessage) {
            ws.send(inputMessage);  // Send the inputMessage to the server
            setInputMessage("");     // Clear the input field after sending the message
        }
    };

    return (
        <div>
            <h2>WebSocket Client</h2>
            <div>
                <label>Message from Server: </label>
                <p>{message}</p>
            </div>
            <div>
                <label>Send Message: </label>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)} // Update inputMessage state
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default App;
