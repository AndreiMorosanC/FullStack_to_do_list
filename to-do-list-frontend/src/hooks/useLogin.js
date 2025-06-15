import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const login = async () => {
    try {
      const auth = getAuth();
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();

      return { token };
    } catch (err) {
      setError("Email o contraseña inválidos");
      return null;
    }
  };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    login,
    error,
  };
}
