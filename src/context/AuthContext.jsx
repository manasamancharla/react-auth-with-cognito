import { createContext, useContext, useEffect, useState } from "react";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  fetchUserAttributes,
  resetPassword,
  confirmResetPassword,
  resendSignUpCode,
} from "aws-amplify/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserAttributes()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleSignUp = async (email, password, name) => {
    await signUp({
      username: email,
      password,
      options: {
        userAttributes: { email, name },
      },
    });
  };

  const handleConfirmSignUp = async (email, code) => {
    await confirmSignUp({ username: email, confirmationCode: code });
  };

  const handleSignIn = async (email, password) => {
    await signIn({ username: email, password });
    const attributes = await fetchUserAttributes();
    setUser(attributes);
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  const handleForgotPassword = async (email) => {
    await resetPassword({ username: email });
  };

  const handleConfirmResetPassword = async (email, code, newPassword) => {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    });
  };

  const handleResendCode = async (email) => {
    await resendSignUpCode({ username: email });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp: handleSignUp,
        confirmSignUp: handleConfirmSignUp,
        signIn: handleSignIn,
        signOut: handleSignOut,
        forgotPassword: handleForgotPassword,
        confirmPassword: handleConfirmResetPassword,
        resendCode: handleResendCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);