import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    toast
      .promise(
        async () => {
          try {
            await login(email, password);
          } catch (error: any) {
            console.error("Error: ", error);
            throw new Error(error.message);
          }
        },
        {
          loading: "Iniciando...",
          success: "Correcto",
          error: "Credenciales incorrectas",
        }
      )
      .then((_result) => {
        navigate("/home");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-emerald-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bienvenido A DigitReports
          </h1>
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
              shadow-lg hover:shadow-xl cursor-pointer"
          >
            Ingresar
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
