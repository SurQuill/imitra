import { useState } from 'react';

export default function Chatbot({ onSend }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto mb-4">Chat messages here...</div>
      <div className="flex">
        <input
          className="flex-1 p-2 rounded-l border border-gray-300"
          placeholder="Ask InfraGenie something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
