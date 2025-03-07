import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const token = await response.text();
      localStorage.setItem("token", token);

      alert("Inicio de sesión exitoso");

    window.location.replace("/home");
  } catch (error: any) {
    console.error(error);
    setError(error.message || "Error al iniciar sesión");
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-emerald-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Bienvenido A DigitReports</h1>
          <p className="text-white/80">Favor De Iniciar Sesión</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 
                placeholder:text-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 
                transition-all duration-200"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 
                placeholder:text-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 
                transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 py-3 rounded-lg
              text-white font-semibold hover:opacity-90 transition-opacity duration-200
              shadow-lg hover:shadow-xl"
          >
            Ingresar
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;