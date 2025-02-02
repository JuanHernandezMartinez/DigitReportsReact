import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-emerald-800 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Bienvenido A DigitReports</h1>
          <p className="text-white/80">Por Favor De Iniciar Sesión</p>
        </div>

        <form className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Usuario"
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 
                placeholder:text-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 
                transition-all duration-200"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 
                placeholder:text-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 
                transition-all duration-200"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-white/80">
              <input 
                type="checkbox" 
                className="rounded bg-white/20 border-white/30 focus:ring-white/50" 
              />
              <span>Recuérdame</span>
            </label>
            <a href="#" className="text-white hover:text-white/80 text-sm">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            onClick={handleClick}
            className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 py-3 rounded-lg
              text-white font-semibold hover:opacity-90 transition-opacity duration-200
              shadow-lg hover:shadow-xl"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/80">
            ¿No tienes cuenta? {' '}
            <a href="#" className="text-white hover:text-white/80 font-semibold">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;