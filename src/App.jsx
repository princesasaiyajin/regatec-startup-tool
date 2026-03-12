import React, { useState, useEffect } from 'react';
import './index.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Menu from './components/Menu/Menu';
import CadastroLogin from './pages/CadastroLogin/CadastroLogin';
import CadastroVendedor from './pages/CadastroVendedor/CadastroVendedor';
import CadastroProjetistas from './pages/CadastroProjetistas/CadastroProjetistas';
import TiposDeContato from './pages/TiposDeContato/TiposDeContato';
import StartupInicial from './pages/StartupInicial/StartupInicial';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('@Regatec:token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('@Regatec:token');
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (

        <div style={{ display: 'flex', width: '100vw', minHeight: '100vh' }}>
          <Menu activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout} />

          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden', marginLeft: '280px' }}>
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'logins' && <CadastroLogin />}
            {activeTab === 'vendedor' && <CadastroVendedor />}
            {activeTab === 'projetistas' && <CadastroProjetistas />}
            {activeTab === 'startup' && <StartupInicial />}
            {activeTab === 'tipos-contato' && <TiposDeContato />}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;