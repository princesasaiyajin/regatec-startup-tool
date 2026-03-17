import React, { useState, useEffect } from 'react';
import '../../styles/Cadastro.css';
import { UserPlus, Edit3, Trash2, X, Loader2 } from 'lucide-react';

function CadastroVendedor() {
  const [vendedores, setVendedores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendedorEditando, setVendedorEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });

  const formatarTelefone = (valor) => {
    if (!valor) return "";
    const apenasNumeros = valor.replace(/\D/g, '');
    return apenasNumeros
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const fetchVendedores = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('@Regatec:token');

      const response = await fetch('https://regatec.api.etetis.com.br/api/sellers?page=1&limit=100', {
        method: 'GET',
        headers: {
          'Authorization': `
          Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      console.log("DADOS RECEBIDOS DA API:", result);

      // CORREÇÃO AQUI: Baseado na imagem image_77345e.png
      // A estrutura é result -> data -> sellers
      if (result && result.data && Array.isArray(result.data.sellers)) {
        setVendedores(result.data.sellers);
      } else if (Array.isArray(result.sellers)) {
        setVendedores(result.sellers);
      } else {
        setVendedores([]);
      }
    } catch (error) {
      console.error("Erro ao carregar vendedores:", error);
      setVendedores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendedores();
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
    const url = vendedorEditando
      ? `https://regatec.api.etetis.com.br/api/sellers/${vendedorEditando.id}`
      : `https://regatec.api.etetis.com.br/api/sellers`;

    // VOLTE PARA PATCH AQUI (vimos que PUT dá 404)
    const method = vendedorEditando ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosParaEnviar)
    });

    // 1. VERIFICA SE A RESPOSTA É JSON ANTES DE CONVERTER
    const contentType = response.headers.get("content-type");
    let errorData = null;

    if (contentType && contentType.indexOf("application/json") !== -1) {
      errorData = await response.json();
    }

    if (response.ok) {
      alert(vendedorEditando ? "Vendedor atualizado!" : "Vendedor cadastrado!");
      fetchVendedores();
      closeModal();
    } else {
      // 2. TRATA ERROS SEM QUEBRAR O JS
      console.error("Erro da API:", errorData);
      alert(`Erro ${response.status}: ${errorData?.message || "O servidor negou a requisição (CORS ou Rota inexistente)."}`);
    }
  } catch (error) {
    // 3. CAPTURA ERROS DE REDE (COMO O BLOQUEIO DE CORS)
    console.error("Erro na requisição:", error);
    alert("Não foi possível conectar ao servidor. Verifique o console para detalhes de CORS.");
  }
};

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este vendedor?")) {
      try {
        const token = localStorage.getItem('@Regatec:token');
        const response = await fetch(`https://regatec.api.etetis.com.br/api/sellers/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          alert("Vendedor excluído!");
          fetchVendedores();
        }
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  const openEditModal = (vendedor) => {
    setVendedorEditando(vendedor);
    setFormData({
      nome: vendedor.name || '',
      email: vendedor.email || '',
      telefone: formatarTelefone(vendedor.phone || '')
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVendedorEditando(null);
    setFormData({ nome: '', email: '', telefone: '' });
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
        <table className="data-table">
          <thead>
            <tr>
              <th>NOME DO VENDEDOR</th>
              <th>E-MAIL</th>
              <th>TELEFONE</th>
              <th className="actions-header">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}><Loader2 className="animate-spin" /> Carregando...</td></tr>
            ) : vendedores.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center' }}>Nenhum vendedor encontrado.</td></tr>
            ) : (
              vendedores.map((v) => (
                <tr key={v.id}>
                  <td><span className="colaborador-name">{v.name}</span></td>
                  <td><span className="email-text">{v.email}</span></td>
                  <td><span className="tipo-badge">{formatarTelefone(v.phone)}</span></td>
                  <td className="actions-cell">
                    <Edit3 size={18} className="icon-edit" onClick={() => openEditModal(v)} />
                    <Trash2 size={18} className="icon-delete" onClick={() => handleDelete(v.id)} />
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
              <h2>{vendedorEditando ? 'Editar Vendedor' : 'Novo Vendedor'}</h2>
              <button className="close-button" onClick={closeModal}><X size={24} /></button>
            </header>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>NOME COMPLETO</label>
                <input
                  type="text" required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>E-MAIL</label>
                <input
                  type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>TELEFONE</label>
                <input
                  type="tel" required
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: formatarTelefone(e.target.value) })}
                />
              </div>

              <footer className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-save">
                  {vendedorEditando ? 'Atualizar Vendedor' : 'Salvar Vendedor'}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroVendedor;