import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";


const Register = ()=>{

    const {email , password, handleEmailChange, handlePasswordChange, register, error} = useRegister();

    const handleRegister = async ()=>{
        const result = await register()

        const res = await fetch("http://localhost:3001/api/usuarios", {
            method: "POST",
            headers:{
                Authorization: `Bearer ${result.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify()
        })

        const data = await res.json();
    }




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