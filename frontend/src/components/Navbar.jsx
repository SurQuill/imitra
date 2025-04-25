export default function Navbar() {
    return (
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">IMitra Management Console</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">🔔</span>
          <span className="bg-white text-black px-3 py-1 rounded-full">User</span>
        </div>
      </div>
    );
  }
  