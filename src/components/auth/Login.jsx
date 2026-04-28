import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../ui/Input";

export function Login({ onSwitch, onForgotPassword }) {
  const { signIn, googleSignIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) return setError("Email and password are required.");
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-[Sora,sans-serif]">
      {/* ── Left panel – scenic image ── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-14 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        {/* floating card – stat */}
        <div className="absolute top-12 right-10 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-5 py-4 text-white">
          <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Active users</p>
          <p className="text-2xl font-bold">24,891</p>
          <p className="text-xs opacity-60 mt-1">↑ 12% this month</p>
        </div>

        <div className="relative z-10 text-white">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">MyApp</span>
          </div>
          <h2 className="text-4xl font-bold leading-snug mb-4">
            Welcome back.<br />We missed you.
          </h2>
          <p className="text-white/70 text-base max-w-xs leading-relaxed">
            Sign in to continue where you left off and pick up right where things matter most.
          </p>

          {/* testimonial pill */}
          <div className="mt-10 flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-3 w-fit">
            <div className="flex -space-x-2">
              {["bg-pink-400", "bg-sky-400", "bg-amber-400"].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white/30`} />
              ))}
            </div>
            <p className="text-white/80 text-xs">Trusted by 25k+ users worldwide</p>
          </div>
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

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in to MyApp</h1>
          <p className="text-sm text-gray-500 mb-8">
            New here?{" "}
            <button onClick={onSwitch} className="text-indigo-600 font-semibold hover:underline">
              Create an account
            </button>
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm mb-5">
              {error}
            </div>
          )}

          <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="Email address" />

          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <button
                onClick={onForgotPassword}
                className="text-indigo-600 text-xs font-semibold hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm outline-none
                         transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 bg-white"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl
                       text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google SSO placeholder */}
          <button
            className="w-full py-3 border border-gray-200 bg-white hover:bg-gray-50 rounded-xl
                       text-sm font-semibold text-gray-700 flex items-center justify-center gap-3 transition-colors"
            onClick={googleSignIn}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
