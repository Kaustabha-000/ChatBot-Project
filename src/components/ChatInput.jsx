import dayjs from 'dayjs';
import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import LoadingSpinnerGIF from '../assets/loading-spinner.gif'
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {

    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            sendMessage();
        } else if (event.key === 'Escape') {
            setInputText('');
        }
    }

    async function sendMessage() {
        if (isLoading || inputText.trim() === '') {     //trim() removes spaces, tabs, and newlines from both ends of the string
            return;
        }

        setIsLoading(true);

        const newChatMessages = [
            ...chatMessages,            // ... is the spread function. it copies the current array data into a new one
            {
                message: inputText,
                sender: "user",
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ];

        setChatMessages(newChatMessages);

        setInputText('');

        setChatMessages([
            ...newChatMessages,            // ... is the spread function. it copies the current array data into a new one
            {
                message: <img src={LoadingSpinnerGIF} className="loading-spinner" />,
                sender: "robot",
                id: crypto.randomUUID()
            }
        ]);

        const response = await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages,            // ... is the spread function. it copies the current array data into a new one
            {
                message: response,
                sender: "robot",
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ]);

        setIsLoading(false);
    }

    function clearMessages() {
        setChatMessages([]);
    }

    return (
        <div className="chat-input-container">
            {/* <input type="text"></input> //in JSX, all html inputs need closing tags*/}
            <input
                placeholder="Send a Message to Chatbot"
                size="30"
                onChange={saveInputText}
                onKeyDown={handleKeyDown}
                value={inputText}
                className="chat-input"
            />
            
            <button
                onClick={sendMessage}
                className="send-button"
            >
                Send
            </button>

            <button
                onClick={clearMessages}
                className="clear-button"
            >
                Clear
            </button>
        </div>
    );
};