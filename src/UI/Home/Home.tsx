import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/165 x 645.png';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(route);
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Iconos
  const TableIcon = () => (
    <svg className="h-12 w-12 text-white mb-4 group-hover:text-indigo-200 transition-colors" 
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );

  const SalesIcon = () => (
    <svg className="h-12 w-12 text-white mb-4 group-hover:text-indigo-200 transition-colors" 
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const ClientsIcon = () => (
    <svg className="h-12 w-12 text-white mb-4 group-hover:text-indigo-200 transition-colors" 
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const BankIcon = () => (
    <svg className="h-12 w-12 text-white mb-4 group-hover:text-indigo-200 transition-colors" 
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  );

  const ArrowLeftIcon = () => (
    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/30 p-4 fixed w-full top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="w-32 h-8 bg-white/20 rounded-lg animate-pulse"><img src={logo} alt="Digitreports" /></div>
          
          <button
            onClick={handleLogout}
            className="flex items-center text-white hover:text-white/80 transition-colors duration-200"
          >
            <ArrowLeftIcon />
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/*Contenido*/}
      <div className="pt-24 pb-8 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-12 text-center">DigitReports</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/*Botón Tablas*/}
            <button
              onClick={() => navigateTo('/tablas')}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300
              border border-white/30 hover:border-white/50 flex flex-col items-center justify-center h-48
              transform hover:scale-105 group"
            >
              <TableIcon />
              <span className="text-xl font-semibold text-white">Tablas</span>
            </button>

            {/*Botón Ventas*/}
            <button
              onClick={() => navigateTo('/ventas')}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300
              border border-white/30 hover:border-white/50 flex flex-col items-center justify-center h-48
              transform hover:scale-105 group"
            >
              <SalesIcon />
              <span className="text-xl font-semibold text-white">Ventas</span>
            </button>

            {/*Botón Clientes*/}
            <button
              onClick={() => navigateTo('/clientes')}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300
              border border-white/30 hover:border-white/50 flex flex-col items-center justify-center h-48
              transform hover:scale-105 group"
            >
              <ClientsIcon />
              <span className="text-xl font-semibold text-white">Clientes</span>
            </button>

            {/*Botón Bancos*/}
            <button
              onClick={() => navigateTo('/bancos')}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300
              border border-white/30 hover:border-white/50 flex flex-col items-center justify-center h-48
              transform hover:scale-105 group"
            >
              <BankIcon />
              <span className="text-xl font-semibold text-white">Bancos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;