import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { VerifyEmail } from "./components/auth/VerifyEmail";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { Dashboard } from "./components/Dashboard";

function AppContent() {
  const { user, loading } = useAuth();
  const [screen, setScreen] = useState("login");
  const [pendingEmail, setPendingEmail] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-700">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (user) return <Dashboard />;

  if (screen === "signup")
    return (
      <SignUp
        onSwitch={() => setScreen("login")}
        onSignedUp={(email) => { setPendingEmail(email); setScreen("verify"); }}
      />
    );

  if (screen === "verify")
    return <VerifyEmail email={pendingEmail} onVerified={() => setScreen("login")} />;

  if (screen === "forgot")
    return <ForgotPassword onBack={() => setScreen("login")} />;

  return (
    <Login onSwitch={() => setScreen("signup")} onForgotPassword={() => setScreen("forgot")} />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}