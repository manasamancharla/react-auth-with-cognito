import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export function VerifyEmail({ email, onVerified }) {
  const { confirmSignUp, resendCode } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setError(""); setSuccess("");
    if (!code) return setError("Please enter the verification code.");
    setLoading(true);
    try {
      await confirmSignUp(email, code);
      onVerified();
    } catch (err) {
      setError(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(""); setSuccess("");
    try {
      await resendCode(email);
      setSuccess("Verification code resent! Check your email.");
    } catch (err) {
      setError(err.message || "Failed to resend code.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fc] px-6 font-[Sora,sans-serif]">
      <div className="w-full max-w-sm">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-8">
          <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Check your email</h1>
        <p className="text-sm text-gray-500 mb-8">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-gray-700">{email}</span>
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm mb-5">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm mb-5">
            {success}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Verification Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
            className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm outline-none
                       tracking-[0.3em] text-center font-semibold text-gray-800 bg-white
                       transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl
                     text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying…" : "Verify Email"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Didn't receive a code?{" "}
          <button
            onClick={handleResend}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
