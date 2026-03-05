import './Login.css';
import { Mail, Lock, Building2 } from 'lucide-react';

function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
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
          
          <div className="input-group">
            <label>E-MAIL CORPORATIVO</label>
            <div className="input-wrapper">
              <Mail className="field-icon" size={20} />
              <input type="email" placeholder="email@email.com" required />
            </div>
          </div>

          <div className="input-group">
            <label>SENHA DE ACESSO</label>
            <div className="input-wrapper">
              <Lock className="field-icon" size={20} />
              <input type="password" placeholder="•••••" required />
            </div>
          </div>

          <button type="submit" className="btn-access">
            Acessar Ecossistema
          </button>

        </form> 
       

      </div>
    </div>
  );
}

export default Login;