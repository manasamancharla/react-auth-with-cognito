import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../ui/Input";

export function ForgotPassword({ onBack }) {
  const { forgotPassword, confirmPassword } = useAuth();
  const [step, setStep] = useState("request"); // "request" | "reset"
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setError("");
    if (!email) return setError("Email is required.");
    setLoading(true);
    try {
      await forgotPassword(email);
      setStep("reset");
    } catch (err) {
      setError(err.message || "Failed to send reset code.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setError("");
    if (!code || !newPassword) return setError("All fields are required.");
    if (newPassword !== confirmPw) return setError("Passwords do not match.");
    setLoading(true);
    try {
      await confirmPassword(email, code, newPassword);
      setSuccess("Password reset successfully! Redirecting to sign in…");
      setTimeout(onBack, 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fc] px-6 font-[Sora,sans-serif]">
      <div className="w-full max-w-sm">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800
                     transition-colors mb-10 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Sign In
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-8">
          <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {step === "request" ? "Forgot your password?" : "Set new password"}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {step === "request"
            ? "Enter your email and we'll send you a reset code."
            : `Enter the code sent to ${email} and choose a new password.`}
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

        {step === "request" ? (
          <>
            <Input label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
            <button
              onClick={handleRequest}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl
                         text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending…" : "Send Reset Code"}
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6-digit code"
                maxLength={6}
                className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm outline-none
                           tracking-[0.3em] text-center font-semibold text-gray-800 bg-white
                           transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <Input label="New Password" type="password" value={newPassword} onChange={setNewPassword} placeholder="New password" />
            <Input label="Confirm New Password" type="password" value={confirmPw} onChange={setConfirmPw} placeholder="Repeat new password" />
            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl
                         text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting…" : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
