import React, { useState } from 'react';
import './Login.css';
import { Mail, Lock, Loader2 } from 'lucide-react'; 
import logoRegatec from '../../assets/logo-regatec.png'; 

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 
    
    try {
      const response = await fetch('https://regatec.api.etetis.com.br/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('@Regatec:token', result.data.token);
        onLogin();
      } else {
        setError(result.message || 'E-mail ou senha inválidos');
      }
    } catch (err) {
      setError('Falha na conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-screen">
        <div className="login-card">
          
          <div className="logo-area">
            <div className="logo-glow"></div>
            <div className="logo-box">
              <img src={logoRegatec} alt="Logo Regatec" className="login-logo-img" />
            </div>
          </div>

          <div className="login-header">
            
            <div className="startup-line-container">
              <div className="line"></div>
              <span className="startup-text">Startup</span>
              <div className="line"></div>
            </div>
          </div>

          {/* ... resto do formulário igual ... */}
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div style={{ color: 'red', fontSize: '13px', marginBottom: '15px', fontWeight: '600' }}>
                {error}
              </div>
            )}

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
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                'Acessar Ecossistema'
              )}
            </button>
          </form>
        </div> 
      </div>
    </div>
  );
}

export default Login;