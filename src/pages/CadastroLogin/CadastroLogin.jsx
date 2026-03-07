import React, { useState, useEffect } from 'react';
import './../../styles/Cadastro.css';
import { UserPlus, Edit, Trash2, X, Loader2 } from 'lucide-react';

function CadastroLogin() {
  const [usuarios, setUsuarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
       nome: '',
  email: '',
  senha: '123', 
  nivel: 'Vendedor', 
  telefone: ''
 });

  // Busca usuários ao carregar
  useEffect(() => { fetchUsuarios(); }, []);

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('@Regatec:token');
      const response = await fetch('https://regatec.api.etetis.com.br/usuarios', {
        headers: { 'Authorization': `Bearer ${token}` }
      } );
      const data = await response.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) { console.error("Erro ao buscar", error); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('@Regatec:token');
      const response = await fetch('https://regatec.api.etetis.com.br/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData ),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ nome: '', email: '', telefone: '' });
        fetchUsuarios(); 
      }
    } catch (error) { alert("Erro ao salvar"); }
    finally { setLoading(false); }
  };

  return (
    <div className="logins-page">
      <div className="logins-header">
        <h1>LOGINS</h1>
        <button className="btn-novo-usuario" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={20} /> NOVO USUÁRIO
        </button>
      </div>

      <div className="table-container">
        <table className="logins-table">
          <thead>
            <tr>
              <th>VENDEDOR</th>
              <th>E-MAIL</th>
              <th>TELEFONE</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.telefone}</td>
                <td className="actions-cell">
                  <button className="btn-edit"><Edit size={16} /></button>
                  <button className="btn-delete"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>NOVO USUÁRIO</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} color="#94a3b8" />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="modal-input-group">
                  <label>NOME DO VENDEDOR</label>
                  <input 
                    type="text" 
                    placeholder="Digite o nome..."
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    required 
                  />
                </div>

                <div className="modal-input-group">
                  <label>E-MAIL CORPORATIVO</label>
                  <input 
                    type="email" 
                    placeholder="email@regatec.com.br"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>

                <div className="modal-input-group">
                  <label>TELEFONE</label>
                  <input 
                    type="text" 
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancelar" onClick={() => setIsModalOpen(false)}>
                  CANCELAR
                </button>
                <button type="submit" className="btn-salvar-login" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : 'SALVAR LOGIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroLogin;
