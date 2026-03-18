import React, { useState, useEffect } from 'react';
import { UserPlus, Edit3, Trash2, X, Loader2 } from 'lucide-react'; 
import '../../styles/Cadastro.css';

function FasesDoProjeto() {
  const [fases, setFases] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faseEditando, setFaseEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ nome: '' });

  const API_URL = 'https://regatec.api.etetis.com.br/api/project-phases';

  const fetchFases = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('@Regatec:token');
     const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
    
      const lista = result.data?.project_phases || result.project_phases || result.data || [];
      setFases(Array.isArray(lista) ? lista : []);
    } catch (error) {
      console.error("Erro ao carregar fases:", error);
      setFases([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFases();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('@Regatec:token');

    const dadosParaEnviar = {
      name: formData.nome
    };

    try {
      const url = faseEditando ? `${API_URL}/${faseEditando.id}` : API_URL;
      const method = faseEditando ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      if (response.ok) {
        alert(faseEditando ? "Fase atualizada com sucesso!" : "Nova fase cadastrada!");
        fetchFases();
        closeModal();
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData?.message || "Erro na operação"}`);
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir esta fase do projeto?")) {
      try {
        const token = localStorage.getItem('@Regatec:token');
        await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchFases();
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  const openEditModal = (fase) => {
    setFaseEditando(fase);
    setFormData({ nome: fase.name || fase.nome });
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
            {loading ? (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                  <Loader2 className="animate-spin" style={{ margin: '0 auto' }} />
                </td>
              </tr>
            ) : fases.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhuma fase registrada.
                </td>
              </tr>
            ) : (
              fases.map((fase) => (
                <tr key={fase.id}>
                  <td>
                    <span className="colaborador-name">{fase.name || fase.nome}</span>
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