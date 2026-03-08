import React, { useState } from 'react';
import './Login.css';
import { Mail, Lock, Building2, Loader2 } from 'lucide-react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await fetch('https://regatec.api.etetis.com.br/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: senha } ), // A API usa 'password'
    });

    const result = await response.json();

    if (response.ok) {
      // O token está dentro de result.data.token conforme a imagem do Postman
      localStorage.setItem('@Regatec:token', result.data.token);
      onLogin();
    } else {
      alert(result.message || 'Erro ao logar');
    }
  } catch (err) {
    alert('Erro de conexão');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="logo-area">
          <div className="logo-glow"></div>
          <div className="logo-box">
            <Building2 size={48} color="#34d399" />
          </div>
        </div>
        <div className="login-header">
          <h1>REGATEC</h1>
          <div className="startup-line-container">
            <div className="line"></div>
            <span className="startup-text">Startup</span>
            <div className="line"></div>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div style={{ color: '#ff4d4d', fontSize: '12px', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
          
          <div className="input-group">
            <label>E-MAIL CORPORATIVO</label>
            <div className="input-wrapper">
              <Mail className="field-icon" size={20} />
              <input 
                type="email" 
                placeholder="email@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>SENHA DE ACESSO</label>
            <div className="input-wrapper">
              <Lock className="field-icon" size={20} />
              <input 
                type="password" 
                placeholder="•••••" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn-access" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Acessar Ecossistema'}
          </button>
        </form> 
      </div>
    </div>
  );
}

export default Login;
