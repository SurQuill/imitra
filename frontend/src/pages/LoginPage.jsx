import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [region, setRegion] = useState('us-east-1');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ accessKey, secretKey, region });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Login to Cloud</h2>
        <input className="w-full border mb-2 p-2 rounded" placeholder="AWS Access Key" value={accessKey} onChange={(e) => setAccessKey(e.target.value)} />
        <input className="w-full border mb-2 p-2 rounded" placeholder="AWS Secret Key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
        <input className="w-full border mb-4 p-2 rounded" placeholder="Region" value={region} onChange={(e) => setRegion(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}
