import React, { useState } from 'react';
import '../../styles/Cadastro.css'; 
import { UserPlus, Edit3, Trash2, X } from 'lucide-react';

function CadastroVendedor () { 
  const [usuarios, setUsuarios] = useState([
    
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formData, setFormData] = useState({ nome: '', email: '', tipo: 'administrativo' });

  const menuItems = [
    "Dados Cadastrais", "Logins de Acesso", "Vendedor", "Projetista", 
    "Dados da Obra", "Fases do Projeto", "Fases da Obra", "Tipo do Contato", 
    "Operacional", "Startup Inicial", "Aditivos", "Workflow"
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (usuarioEditando) {
      setUsuarios(usuarios.map(u => u.id === usuarioEditando.id ? { ...formData, id: u.id } : u));
    } else {
      setUsuarios([...usuarios, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const openEditModal = (usuario) => {
    setUsuarioEditando(usuario);
    setFormData({ nome: usuario.nome, email: usuario.email, tipo: usuario.tipo });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUsuarioEditando(null);
    setFormData({ nome: '', email: '', tipo: 'administrativo' });
  };

  return (
    <div className="content-area">
      <header className="content-header">
        <h1>LOGINS</h1>
        <button className="btn-new-user" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} /> NOVO USUÁRIO
        </button>
      </header>

      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>COLABORADOR</th>
              <th>E-MAIL</th>
              <th>TIPO</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td><span className="colaborador-name">{user.nome}</span></td>
                <td><span className="email-text">{user.email}</span></td>
                <td><span className="tipo-badge">{user.tipo}</span></td>
                <td className="actions-cell">
                  <Edit3 size={18} className="icon-edit" onClick={() => openEditModal(user)} />
                  <Trash2 size={18} className="icon-delete" onClick={() => handleDelete(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <header className="modal-header">
              <h2>{usuarioEditando ? 'EDITAR LOGIN' : 'NOVO USUÁRIO'}</h2>
              <button className="close-button" onClick={closeModal}><X size={24} /></button>
            </header>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>NOME DO VENDEDOR</label>
                <input 
                  type="text" required                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>E-MAIL CORPORATIVO</label>
                <input 
                  type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>TIPO DE LOGIN</label>
                <select 
                  className="modal-select"
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                >
                  <option value="
                  administrativo">Administrativo</option>
                  <option value="editor">Editor</option>
                  <option value="visualizador">Visualizador</option>
                </select>
              </div>

              {formData.tipo === 'visualizador' && (
                <div className="permissions-area">
                  <label>PERMISSÕES DE VISUALIZAÇÃO:</label>
                  <div className="permissions-grid">
                    {menuItems.map(item => (
                      <label key={item} className="checkbox-label">
                        <input type="checkbox" /> {item}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <footer className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>CANCELAR</button>
                <button type="submit" className="btn-save">SALVAR LOGIN</button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroVendedor;