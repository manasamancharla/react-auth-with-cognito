import { useAuth } from "../context/AuthContext";

export function Dashboard() {
  const { user, signOut } = useAuth();
  console.log(user);
  

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white px-8 py-4 shadow-sm flex justify-between items-center">
        <span className="text-xl font-bold text-violet-500">MyApp</span>
        <button
          onClick={signOut}
          className="px-5 py-2 bg-red-50 text-red-600 border border-red-200
                     rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
        >
          Sign Out
        </button>
      </header>

      <main className="max-w-2xl mx-auto mt-10 px-5 space-y-5">
        <div className="rounded-2xl p-7 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
          <p className="text-xl font-bold mb-1">Welcome back! 👋</p>
          <p className="opacity-90 text-sm">{user?.email}</p>
        </div>

        <div className="bg-white rounded-2xl p-7 shadow-sm">
          <p className="font-bold text-gray-900 mb-4">Account Details</p>
          {Object.entries(user || {}).map(([key, val]) => (
            <div key={key} className="flex justify-between py-2.5 border-b border-gray-100 last:border-0">
              <span className="text-gray-400 text-sm">{key}</span>
              <span className="text-sm font-semibold text-gray-700 text-right max-w-[60%] break-all">{val}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-7 shadow-sm">
          <p className="font-bold text-gray-900 mb-2">🔒 Session Info</p>
          <p className="text-sm text-gray-500">
            Your JWT tokens are stored securely in <code className="bg-gray-100 px-1 rounded">localStorage</code> by
            the Cognito SDK and auto-refresh using your refresh token.
          </p>
        </div>
      </main>
    </div>
  );
}