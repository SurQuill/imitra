import { useState } from 'react';
import { generate, deploy, diagram } from '../services/api';

export default function ChatUI() {
  const [prompt, setPrompt] = useState('');
  const [cloud, setCloud] = useState('aws');
  const [logs, setLogs] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleSend = async () => {
    setLogs("🧠 Generating Terraform script...");
    setImageUrl(null);

    try {
      const res = await generate({ prompt, cloud });
      const folder = res.data.folder;

      setLogs("🚀 Deploying infrastructure...");
      const deployRes = await deploy({ folder });
      setLogs(deployRes.data.logs);

      const diagramRes = await diagram({ folder });
      setImageUrl(`http://localhost:5000/${diagramRes.data.image}`);
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      setLogs("❌ Error: " + msg);
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">I-Mitra Chat</h2>

      <div className="flex gap-2 mb-4">
        <select className="border p-2 rounded" value={cloud} onChange={(e) => setCloud(e.target.value)}>
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
          <option value="gcp">GCP</option>
          <option value="openstack">OpenStack</option>
        </select>

        <input className="flex-1 p-2 rounded border" placeholder='e.g. "Create EC2 instance"' value={prompt} onChange={(e) => setPrompt(e.target.value)} />

        <button onClick={handleSend} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Send
        </button>
      </div>

      <div className={`p-4 bg-white rounded shadow-md h-[300px] overflow-y-auto whitespace-pre-wrap ${logs.includes("❌") ? 'text-red-600' : 'text-gray-800'}`}>
        {logs}
      </div>

      {imageUrl && (
        <div className="mt-4">
          <h4 className="font-semibold">Architecture Diagram:</h4>
          <img src={imageUrl} alt="Diagram" className="mt-2 border shadow rounded" />
        </div>
      )}
    </div>
  );
}
