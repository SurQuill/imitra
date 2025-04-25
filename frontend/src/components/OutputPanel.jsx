export default function OutputPanel({ terraformCode, diagramUrl, logs }) {
    return (
      <div className="p-4 space-y-4 overflow-y-auto h-full">
        <h2 className="text-lg font-semibold">Terraform Script</h2>
        <pre className="bg-black text-green-400 p-4 rounded overflow-auto max-h-48">
          {terraformCode || '// Terraform script will appear here'}
        </pre>
  
        <h2 className="text-lg font-semibold">Deployment Logs</h2>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-auto max-h-48">
          {logs || 'No logs yet.'}
        </pre>
  
        <h2 className="text-lg font-semibold">Architecture Diagram</h2>
        {diagramUrl ? (
          <img src={diagramUrl} alt="Architecture Diagram" className="rounded border" />
        ) : (
          <div className="text-gray-500">Diagram will appear here</div>
        )}
      </div>
    );
  }
  {
  <button
  onClick={() => {
    fetch('http://localhost:5000/destroy', { method: 'POST' })
      .then(res => res.text())
      .then(log => setLogs(log));
  }}
  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
>
  Destroy Infrastructure
</button>
  };