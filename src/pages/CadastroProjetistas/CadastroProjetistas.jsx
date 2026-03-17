import React, { useState, useEffect } from 'react';
import '../../styles/Cadastro.css';
import { UserPlus, Edit3, Trash2, X, Loader2 } from 'lucide-react';

function CadastroProjetistas() {
  const [projetistas, setProjetistas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projetistaEditando, setProjetistaEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  const API_URL = 'https://regatec.api.etetis.com.br/api/designers';

  const formatarTelefone = (valor) => {
    if (!valor) return "";
    const apenasNumeros = valor.replace(/\D/g, '');
    return apenasNumeros
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const fetchProjetistas = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('@Regatec:token');
      const response = await fetch(`${API_URL}?page=1&limit=100`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
        
      const lista = result.data?.designers || result.designers || result.data || [];
      setProjetistas(Array.isArray(lista) ? lista : []);
    } catch (error) {
      console.error("Erro ao carregar projetistas:", error);
      setProjetistas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjetistas();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('@Regatec:token');
    const telefoneLimpo = formData.telefone.replace(/\D/g, '');

    const dadosParaEnviar = {
      name: formData.nome,
      email: formData.email,
      phone: telefoneLimpo 
    };

    try {
      const url = projetistaEditando ? `${API_URL}/${projetistaEditando.id}` : API_URL;
      const method = projetistaEditando ? 'PATCH' : 'POST';

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
        alert(projetistaEditando ? "Projetista atualizado!" : "Projetista cadastrado!");
        fetchProjetistas();
        closeModal();
      } else {
        const errorData = await response.json();
        alert(`Erro ${response.status}: ${errorData?.message || "Erro na API"}`);
      }
    } catch (error) {
      alert("Erro de conexão. O servidor pode estar fora do ar ou com erro de CORS.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este projetista?")) {
      try {
        const token = localStorage.getItem('@Regatec:token');
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          alert("Projetista excluído!");
          fetchProjetistas();
        }
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  const openEditModal = (p) => {
    setProjetistaEditando(p);
    setFormData({
      nome: p.name || '',
      email: p.email || '',
      telefone: formatarTelefone(p.phone || '')
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProjetistaEditando(null);
    setFormData({ nome: '', email: '', telefone: '' });
  };

  return (
    <div className="content-area">
      <header className="content-header">
        <h1>PROJETISTAS</h1>
        <button className="btn-new-user" onClick={() => { closeModal(); setIsModalOpen(true); }}>
          <UserPlus size={18} /> NOVO PROJETISTA
        </button>
      </header>

      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>PROJETISTA</th>
              <th>E-MAIL</th>
              <th>TELEFONE</th>
              <th className="actions-header">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}><Loader2 className="animate-spin" /> Carregando...</td></tr>
            ) : projetistas.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}>Nenhum projetista encontrado.</td></tr>
            ) : (
              projetistas.map((p) => (
                <tr key={p.id}>
                  <td><span className="colaborador-name">{p.name}</span></td>
                  <td><span className="email-text">{p.email}</span></td>
                  <td><span className="tipo-badge">{formatarTelefone(p.phone)}</span></td>
                  <td className="actions-cell">
                    <Edit3 size={18} className="icon-edit" onClick={() => openEditModal(p)} />
                    <Trash2 size={18} className="icon-delete" onClick={() => handleDelete(p.id)} />
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
              <h2>{projetistaEditando ? 'Editar Projetista' : 'Novo Projetista'}</h2>
              <button className="close-button" onClick={closeModal}><X size={24} /></button>
            </header>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>NOME DO PROJETISTA</label>
                <input type="text" required value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
              </div>
              <div className="form-group">
                <label>E-MAIL CORPORATIVO</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>TELEFONE</label>
                <input type="tel" required placeholder="(00) 00000-0000" value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: formatarTelefone(e.target.value)})} />
              </div>
              <footer className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>CANCELAR</button>
                <button type="submit" className="btn-save">{projetistaEditando ? 'ATUALIZAR' : 'SALVAR'}</button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroProjetistas;