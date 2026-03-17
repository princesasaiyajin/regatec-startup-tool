import React, { useState } from 'react';
import { UserPlus, Edit3, Trash2, X } from 'lucide-react'; 
import '../../styles/Cadastro.css';

function FasesDoProjeto() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faseEditando, setFaseEditando] = useState(null);
  const [formData, setFormData] = useState({ nome: '' });
  
  const [fases, setFases] = useState([
    { id: 1, nome: 'Levantamento' },
    { id: 2, nome: 'Anteprojeto' },
    { id: 3, nome: 'Executivo' }
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    if (faseEditando) {
    
      setFases(fases.map(f => f.id === faseEditando.id ? { ...f, nome: formData.nome } : f));
    } else {
     
      const novaFase = {
        id: Date.now(),
        nome: formData.nome
      };
      setFases([...fases, novaFase]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir esta fase do projeto?")) {
      setFases(fases.filter(f => f.id !== id));
    }
  };

  const openEditModal = (fase) => {
    setFaseEditando(fase);
    setFormData({ nome: fase.nome });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFaseEditando(null);
    setFormData({ nome: '' });
  };

  return (
    <div className="content-area">
      <header className="content-header">
        <h1>FASES DO PROJETO</h1>
        <button className="btn-new-user" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} /> NOVA FASE
        </button>
      </header>

      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>DESCRIÇÃO DA FASE</th>
              <th className="actions-header">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {fases.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhuma fase registrada.
                </td>
              </tr>
            ) : (
              fases.map((fase) => (
                <tr key={fase.id}>
                  <td>
                    <span className="colaborador-name">{fase.nome}</span>
                  </td>
                  <td className="actions-cell">
                    <Edit3 size={18} className="icon-edit" onClick={() => openEditModal(fase)} />
                    <Trash2 size={18} className="icon-delete" onClick={() => handleDelete(fase.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <header className="modal-header">
              <h2>{faseEditando ? 'EDITAR FASE' : 'NOVA FASE'}</h2>
              <button className="close-button" onClick={closeModal}><X size={24} /></button>
            </header>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>NOME DA FASE</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ex: Levantamento, Detalhamento..."
                  value={formData.nome}
                  onChange={(e) => setFormData({ nome: e.target.value })}
                />
              </div>

              <footer className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>CANCELAR</button>
                <button type="submit" className="btn-save">
                  {faseEditando ? 'ATUALIZAR' : 'SALVAR'}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FasesDoProjeto;