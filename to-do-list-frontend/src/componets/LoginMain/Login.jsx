import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    login,
    error,
    loading,
  } = useLogin();

  const handleSubmit = async () => {
    const result = await login();
    if (!result) return
    
    try{
        const res = await fetch("http://localhost:3001/api/users",{
            method: "POST",
            headers:{
                 Authorization: `Bearer ${result.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({})
        });
        if(!res.ok) throw new Error("Error al register sesion");

        const data = await res.json();
        console.log("backend respondio con:", data)
    }catch(err){
        console.error("Error al comunicar con el backend:", err.message);
    }

};

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Iniciar sesión</h2>
      <input type="text" value={email} onChange={handleEmailChange} placeholder="Email" />
      <input type="password" value={password} onChange={handlePasswordChange} placeholder="Contraseña" />
      {error && <p>{error}</p>}
      <button type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Cargando..." : "Entrar"}
      </button>
    </form>
  );
};

export default Login;
