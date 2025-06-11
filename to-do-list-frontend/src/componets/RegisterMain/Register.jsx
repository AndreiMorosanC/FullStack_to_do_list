import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";


const Register = ()=>{

    const {email , password, handleEmailChange, handlePasswordChange, register, error} = useRegister();

    const handleRegister = async () => {
  try {
    const result = await register();

    const res = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${result.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: result.uid,
        email: result.email,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    console.log("Usuario guardado:", data);
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
  }
};





    return(
        <div>
        <form onSubmit={(e) => e.preventDefault()}>
            <h2>Register </h2>
            <input type="text"  value={email} onChange={handleEmailChange}/>
            <input type="password"  value={password} onChange={handlePasswordChange}/>
            <button type="button" onClick={handleRegister}>Sign Up</button>
        </form>
        </div>
    )
}

export default Register;