import React, { useState } from 'react';
import './index.css'; 
import Login from './pages/Login/Login';
import Menu from './components/Menu/Menu';
import CadastroLogin from './pages/CadastroLogin/CadastroLogin';
import CadastroVendedor from './pages/CadastroVendedor/CadastroVendedor';
import CadastroProjetistas from './pages/CadastroProjetistas/CadastroProjetistas';
import TiposDeContato from './pages/TiposDeContato/TiposDeContato';
import StartupInicial from './pages/StartupInicial/StartupInicial';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('logins');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div style={{ display: 'flex', width: '100vw', minHeight: '100vh' }}>
          <Menu activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden', marginLeft: '280px' }}>
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