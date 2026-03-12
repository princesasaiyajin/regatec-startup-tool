import React, { useState, useEffect } from 'react';
import '../../styles/Cadastro.css';
import { UserPlus, Edit3, Trash2, X, Loader2 } from 'lucide-react';

function CadastroVendedor() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  
  // Ajustado para os campos da API: name e phone
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const fetchVendedores = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('@Regatec:token');
      // Rota correta conforme Postman: /api/sellers
      const response = await fetch('https://regatec.api.etetis.com.br/api/sellers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (response.ok) {
        setUsuarios(result.data || []);
      }
    } catch (error) {
      console.error("Erro ao carregar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVendedores(); }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('@Regatec:token');
    
    // Rota para editar ou criar baseada na imagem do Postman
    const url = usuarioEditando 
      ? `https://regatec.api.etetis.com.br/api/sellers/${usuarioEditando.id}`
      : 'https://regatec.api.etetis.com.br/api/sellers';
      
    const method = usuarioEditando ? 'PATCH' : 'POST'; // Note que a API usa PATCH para atualizar

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData), // Envia name, email e phone
      });

      if (response.ok) {
        fetchVendedores();
        closeModal();
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir?")) {
      try {
        const token = localStorage.getItem('@Regatec:token');
        const response = await fetch(`https://regatec.api.etetis.com.br/api/sellers/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) fetchVendedores();
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  const openEditModal = (vendedor) => {
    setUsuarioEditando(vendedor);
    // Mapeia os dados da API para o formulário
    setFormData({ name: vendedor.name, email: vendedor.email, phone: vendedor.phone });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUsuarioEditando(null);
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <div className="content-area">
      <header className="content-header">
        <h1>VENDEDORES</h1>
        <button className="btn-new-user" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} /> NOVO VENDEDOR
        </button>
      </header>

      <div className="data-card">
        {loading ? (
          <div className="loading-container"><Loader2 className="animate-spin" /></div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>VENDEDOR</th>
                <th>E-MAIL</th>
                <th>TELEFONE</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
         <tbody>
  {usuarios && usuarios.length > 0 ? (
    usuarios.map((vendedor) => (
      <tr key={vendedor.id}>
        <td><span className="colaborador-name">{vendedor.name}</span></td>
        <td><span className="email-text">{vendedor.email}</span></td>
        <td><span className="telefone-text">{vendedor.phone}</span></td>
        <td className="actions-cell">
          <Edit3 size={18} className="icon-edit" onClick={() => openEditModal(vendedor)} />
          <Trash2 size={18} className="icon-delete" onClick={() => handleDelete(vendedor.id)} />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
        Nenhum vendedor encontrado.
      </td>
    </tr>
  )}
</tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <header className="modal-header">
              <h2>{usuarioEditando ? 'EDITAR VENDEDOR' : 'NOVO VENDEDOR'}</h2>
              <button className="close-button" onClick={closeModal}><X size={24} /></button>
            </header>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>NOME DO VENDEDOR</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>E-MAIL CORPORATIVO</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>TELEFONE</label>
                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <footer className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>CANCELAR</button>
                <button type="submit" className="btn-save">SALVAR VENDEDOR</button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroVendedor;