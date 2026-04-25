import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../ui/Input";

export function SignUp({ onSwitch, onSignedUp }) {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!name || !email || !password) return setError("Name, email, and password are required.");
    if (password !== confirm) return setError("Passwords do not match.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    setLoading(true);
    try {
      await signUp(email, password, name);
      onSignedUp(email);
    } catch (err) {
      setError(err.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-[Sora,sans-serif]">
      {/* ── Left panel – scenic background ── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-14 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 text-white">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">MyApp</span>
          </div>
          <h2 className="text-4xl font-bold leading-snug mb-4">
            Start your journey<br />with us today.
          </h2>
          <p className="text-white/70 text-base max-w-xs leading-relaxed">
            Create an account and unlock everything our platform has to offer.
          </p>
        </div>
      </div>

      {/* ── Right panel – form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f7f8fc] px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-gray-900 text-lg">MyApp</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h1>
          <p className="text-sm text-gray-500 mb-8">
            Already have one?{" "}
            <button onClick={onSwitch} className="text-indigo-600 font-semibold hover:underline">
              Sign in
            </button>
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm mb-5">
              {error}
            </div>
          )}

          <Input label="Full Name" value={name} onChange={setName} placeholder="Jane Smith" />
          <Input label="Email address" type="email" value={email} onChange={setEmail} placeholder="jane@example.com" />
          <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="Min. 8 characters" />
          <Input label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat your password" />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-2 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl
                       text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="text-xs text-center text-gray-400 mt-6">
            By signing up you agree to our{" "}
            <span className="underline cursor-pointer">Terms</span> &amp;{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
