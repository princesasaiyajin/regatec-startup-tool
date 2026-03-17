import React, { useState } from 'react';
import { UserPlus, Edit3, Trash2, X } from 'lucide-react'; 
import '../../styles/Cadastro.css'; // Usando o seu CSS global de cadastros

function TiposDeObra() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoEditando, setTipoEditando] = useState(null);
  const [formData, setFormData] = useState({ nome: '' });
  
  // Dados mockados iniciais
  const [tiposDeObras, setTiposDeObras] = useState([
    { id: 1, nome: 'Residencial' },
    { id: 2, nome: 'Comercial' },
    { id: 3, nome: 'Industrial' }
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    if (tipoEditando) {
      // Lógica de Edição
      setTiposDeObras(tiposDeObras.map(t => t.id === tipoEditando.id ? { ...t, nome: formData.nome } : t));
    } else {
      // Lógica de Novo Cadastro
      const novoTipo = {
        id: Date.now(),
        nome: formData.nome
      };
      setTiposDeObras([...tiposDeObras, novoTipo]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir este tipo de obra?")) {
      setTiposDeObras(tiposDeObras.filter(t => t.id !== id));
    }
  };

  const openEditModal = (tipo) => {
    setTipoEditando(tipo);
    setFormData({ nome: tipo.nome });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTipoEditando(null);
    setFormData({ nome: '' });
  };

  return (
    <div className="content-area">
      <header className="content-header">
        <h1>TIPOS DE OBRAS</h1>
        <button className="btn-new-user" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} /> NOVO TIPO DE OBRA
        </button>
      </header>

      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>DESCRIÇÃO DO TIPO DE OBRA</th>
              <th className="actions-header">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {tiposDeObras.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhum tipo de obra registrado.
                </td>
              </tr>
            ) : (
              tiposDeObras.map((tipo) => (
                <tr key={tipo.id}>
                  <td>
                    <span className="colaborador-name">{tipo.nome}</span>
                  </td>
                  <td className="actions-cell">
                    <Edit3 size={18} className="icon-edit" onClick={() => openEditModal(tipo)} />
                    <Trash2 size={18} className="icon-delete" onClick={() => handleDelete(tipo.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL PADRONIZADO */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <header className="modal-header">
              <h2>{tipoEditando ? 'EDITAR TIPO DE OBRA' : 'NOVO TIPO DE OBRA'}</h2>
              <button className="close-button" onClick={closeModal}><X size={24} /></button>
            </header>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>NOME DO TIPO DE OBRA</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ex: Industrial, Comercial..."
                  value={formData.nome}
                  onChange={(e) => setFormData({ nome: e.target.value })}
                />
              </div>

              <footer className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>CANCELAR</button>
                <button type="submit" className="btn-save">
                  {tipoEditando ? 'ATUALIZAR' : 'SALVAR'}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TiposDeObra;