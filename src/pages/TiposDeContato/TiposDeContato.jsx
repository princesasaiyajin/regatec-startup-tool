import React, { useState, useEffect } from 'react';
import { UserPlus, Edit3, Trash2, X, Loader2 } from 'lucide-react'; 
import '../../styles/Cadastro.css'; 

function TiposDeContato() {
  const [tiposContato, setTiposContato] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contatoEditando, setContatoEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ nome: '' });

  const API_URL = 'https://regatec.api.etetis.com.br/api/contact-types';
  const fetchTipos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('@Regatec:token');
      const response = await fetch(`${API_URL}?page=1&limit=100`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) throw new Error(`Erro: ${response.status}`);

      const result = await response.json();
      const lista = result.data?.contact_types || result.contact_types || result.data || [];
      setTiposContato(Array.isArray(lista) ? lista : []);
    } catch (error) {
      console.error("Erro ao carregar tipos de contato:", error);
      setTiposContato([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('@Regatec:token');

    const dadosParaEnviar = {
      name: formData.nome
    };

    try {
      const url = contatoEditando ? `${API_URL}/${contatoEditando.id}` : API_URL;
      const method = contatoEditando ? 'PATCH' : 'POST';

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
        alert(contatoEditando ? "Tipo de contato atualizado!" : "Tipo de contato cadastrado!");
        fetchTipos();
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
    if (window.confirm("Deseja realmente excluir este tipo de contato?")) {
      try {
        const token = localStorage.getItem('@Regatec:token');
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          fetchTipos();
        }
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  const openEditModal = (tipo) => {
    setContatoEditando(tipo);
    setFormData({ nome: tipo.name || tipo.nome });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setContatoEditando(null);
    setFormData({ nome: '' });
  };

  return (
    <div className="content-area">
      <header className="content-header">
        <h1>TIPOS DE CONTATO</h1>
        <button className="btn-new-user" onClick={() => { closeModal(); setIsModalOpen(true); }}>
          <UserPlus size={18} /> NOVO TIPO DE CONTATO
        </button>
      </header>

      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>DEPARTAMENTO / SETOR</th>
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
            ) : tiposContato.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhum tipo de contato registrado.
                </td>
              </tr>
            ) : (
              tiposContato.map((tipo) => (
                <tr key={tipo.id}>
                  <td>
                    <span className="colaborador-name">{tipo.name || tipo.nome}</span>
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <header className="modal-header">
              <h2>{contatoEditando ? 'EDITAR CONTATO' : 'NOVO TIPO DE CONTATO'}</h2>
              <button className="close-button" onClick={closeModal}><X size={24} /></button>
            </header>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>NOME DO DEPARTAMENTO / SETOR</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ex: Comercial, Financeiro..."
                  value={formData.nome}
                  onChange={(e) => setFormData({ nome: e.target.value })}
                />
              </div>

              <footer className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>CANCELAR</button>
                <button type="submit" className="btn-save">
                  {contatoEditando ? 'ATUALIZAR' : 'SALVAR'}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TiposDeContato;