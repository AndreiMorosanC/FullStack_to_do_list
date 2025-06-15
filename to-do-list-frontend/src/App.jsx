import { useEffect, useState } from 'react'
import './App.css'
import CreacionTask from './componets/CreacionTask/CreacionTask'
import Register from './componets/RegisterMain/Register'
import { auth } from '../firebase'
import Login from './componets/LoginMain/Login'
import { useAuth } from "./hooks/useAuth";
import GetStak from './componets/GetTask/GetTask'
function App() {


 const { user, token, loading } = useAuth();

  useEffect(() => {
    if (!loading && token) {
      fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then(res => res.json())
        .then(data => {
          console.log("Backend respondió:", data);
        });
    }
  }, [token, loading]);

  if (loading) return <p>Cargando sesión...</p>;
  if (!user) return <p>No estás logueado</p>;

  return (
      <div>
        {user ? (
          <>
            <h2>Bienvenido, {user.email}</h2>
          </>
        ) : (
          <Register/>
        )}
        <CreacionTask/>
        <GetStak/>
      </div>
  )
}

export default App
