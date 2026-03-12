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
    setError(''); // Limpa erros anteriores antes de tentar
    
    try {
      const response = await fetch('https://regatec.api.etetis.com.br/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      });

      const result = await response.json();

      if (response.ok) {
        // O token está em result.data.token conforme vimos no seu log
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
          
          {/* AREA DO LOGO */}
          <div className="logo-area">
            <div className="logo-glow"></div>
            <div className="logo-box">
              <Building2 size={48} color="#10b981" />
            </div>
          </div>

          {/* CABEÇALHO */}
          <div className="login-header">
            <h1>REGATEC</h1>
            <div className="startup-line-container">
              <div className="line"></div>
              <span className="startup-text">Startup</span>
              <div className="line"></div>
            </div>
          </div>

          {/* FORMULÁRIO (Agora dentro do card branco) */}
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div style={{ 
                color: '#ef4444', 
                fontSize: '13px', 
                marginBottom: '15px', 
                fontWeight: '600' 
              }}>
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

        </div> {/* Fim do login-card */}
      </div>
    </div>
  );
}

export default Login;