import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import OutputPanel from './components/OutputPanel';
import { useState } from 'react';

function App() {
  const [terraformCode, setTerraformCode] = useState('');
  const [logs, setLogs] = useState('');
  const [diagramUrl, setDiagramUrl] = useState('');

  const handleMessageSend = async (message) => {
  // Example backend call placeholder
  try {
    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    setTerraformCode(data.terraform);
    setLogs(data.logs);
    setDiagramUrl('http://localhost:5000/diagram');
  } catch (error) {
    console.error("Error generating infrastructure:", error);
  }
    console.log("User asked:", message);
    setTerraformCode('# Generated Terraform from Titan Express...');
    setLogs('Terraform plan applied successfully!');
    setDiagramUrl('/placeholder-diagram.png');
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 border-r border-gray-300">
          <Chatbot onSend={handleMessageSend} />
        </div>
        <div className="w-2/3">
          <OutputPanel
            terraformCode={terraformCode}
            logs={logs}
            diagramUrl={diagramUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
