import React, { useState, useEffect } from 'react';
import '../../styles/Cadastro.css'; // Usando o seu arquivo de estilo padrão
import { Users, Mail, Lock, Shield, Save, Loader2 } from 'lucide-react';

function CadastroLogin() {
  // 1. Estado para os campos (usando os nomes que a API espera)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '123',
    nivel: 'Vendedor'
  });

  const [loading, setLoading] = useState(false);

  // 2. Função para atualizar os campos (sem mudar seu HTML)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Função para salvar na API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('@Regatec:token');
      const response = await fetch('https://regatec.api.etetis.com.br/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          password: formData.senha, // API espera 'password'
          nivel: formData.nivel
        } ),
      });

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        setFormData({ nome: '', email: '', senha: '123', nivel: 'Vendedor' });
      } else {
        alert('Erro ao cadastrar usuário.');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-header">
        <div className="header-icon">
          <Users size={24} color="#34d399" />
        </div>
        <div className="header-text">
          <h2>Cadastro de Logins</h2>
          <p>Gerencie os acessos ao ecossistema Regatec</p>
        </div>
      </div>

      {/* Mantendo sua estrutura de formulário original */}
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="input-group">
            <label>NOME COMPLETO</label>
            <div className="input-wrapper">
              <Users className="field-icon" size={18} />
              <input 
                type="text" 
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: João Silva" 
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>E-MAIL DE ACESSO</label>
            <div className="input-wrapper">
              <Mail className="field-icon" size={18} />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@regatec.com.br" 
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>SENHA PROVISÓRIA</label>
            <div className="input-wrapper">
              <Lock className="field-icon" size={18} />
              <input 
                type="password" 
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>NÍVEL DE ACESSO</label>
            <div className="input-wrapper">
              <Shield className="field-icon" size={18} />
              <select name="nivel" value={formData.nivel} onChange={handleChange}>
                <option value="Master Admin">Master Admin</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Projetista">Projetista</option>
                <option value="Operacional">Operacional</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? (
              <><Loader2 className="animate-spin" size={18} style={{marginRight: '8px'}} /> SALVANDO...</>
            ) : (
              <><Save size={18} style={{marginRight: '8px'}} /> SALVAR CADASTRO</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroLogin;
