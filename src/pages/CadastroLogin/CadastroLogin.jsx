import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/Cadastro.css';
import { UserPlus, Edit3, Trash2, X } from 'lucide-react';

function LoginAcesso() {
  const [usuarios, setUsuarios] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [alterarSenha, setAlterarSenha] = useState(false); 
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '', 
    senha: '',
    confirmarSenha: '',
    tipo: 'adm',
    area_id: '' 
  });

  const carregarUsuarios = async () => {
    try {
      const token = localStorage.getItem('@Regatec:token');
      const response = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      const listaDeUsuarios = response.data.data?.users || response.data?.data || response.data || [];
      setUsuarios(Array.isArray(listaDeUsuarios) ? listaDeUsuarios : []);
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
      setUsuarios([]);
      if (error.response?.status === 401) {
        alert("Sessão expirada. Por favor, faça login novamente.");
      }
    }
  };

  const carregarAreas = async () => {
    try {
      // Substituir pela sua chamada de API real se já existir
      // const response = await api.get('/areas-empresa');
      // setAreas(response.data);
      
      // Mock para demonstração conforme solicitado
      setAreas([
        { id: '1', nome: 'Vendas' },
        { id: '2', nome: 'Almoxarifado' },
        { id: '3', nome: 'Faturamento' },
        { id: '4', nome: 'Projeto' }
      ]);
    } catch (error) {
      console.error("Erro ao carregar áreas", error);
    }
  };

  useEffect(() => {
    carregarUsuarios();
    carregarAreas(); 
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('@Regatec:token');
    const telefoneLimpo = formData.telefone ? formData.telefone.replace(/\D/g, '') : "";

    if ((!usuarioEditando || alterarSenha) && formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const dadosParaEnviar = {
      name: formData.nome,
      corporate_email: formData.email,
      type: formData.tipo,
      phone: telefoneLimpo,
      area_id: formData.area_id 
    };

    if (!usuarioEditando || alterarSenha) {
      if (formData.senha) {
        dadosParaEnviar.password = formData.senha;
        dadosParaEnviar.password_confirmation = formData.confirmarSenha; 
      }
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (usuarioEditando) {
        await api.patch(`/users/${usuarioEditando.id}`, dadosParaEnviar, config);
        alert("Usuário atualizado com sucesso!");
      } else {
        await api.post('/users', dadosParaEnviar, config);
        alert("Usuário cadastrado com sucesso!");
      }
      
      carregarUsuarios();
      closeModal();
    } catch (error) {
      console.error("ERRO DE REDE/API:", error.response?.data || error);
      const msgErro = error.response?.data?.message || "Erro ao salvar. Verifique os dados ou o console.";
      alert(msgErro);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      try {
        const token = localStorage.getItem('@Regatec:token');
        await api.delete(`users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Usuário excluído com sucesso!");
        carregarUsuarios();
      } catch (error) {
        console.error("Erro ao deletar", error);
        alert("Erro ao excluir usuário.");
      }
    }
  };

  const openEditModal = (usuario) => {
    setUsuarioEditando(usuario);
    setFormData({
      nome: usuario.name || '',
      email: usuario.corporate_email || '',
      tipo: usuario.type || 'adm',
      telefone: formatarTelefone(usuario.phone || ''),
      senha: '',
      confirmarSenha: '',
      area_id: usuario.area_id || '' // Carrega a área na edição
    });
    setAlterarSenha(false); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUsuarioEditando(null);
    setAlterarSenha(false); 
    setFormData({
      nome: '', email: '', telefone: '',
      senha: '', confirmarSenha: '', tipo: 'adm',
      area_id: ''
    });
  };

  const formatarTelefone = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    return value.substring(0, 15);
  };

  return (
    <div className="content-area">
      <header className="content-header">
        <h1>LOGINS</h1>
        <button className="btn-new-user" onClick={() => { closeModal(); setIsModalOpen(true); }}>
          <UserPlus size={18} /> NOVO USUÁRIO
        </button>
      </header>

      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>COLABORADOR</th>
              <th>E-MAIL</th>
              <th>TIPO DE LOGIN</th>
              <th>ÁREA</th>
              <th className="actions-header">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((user) => (
                <tr key={user.id}>
                  <td><span className="colaborador-name">{user.name}</span></td>
                  <td><span className="email-text">{user.corporate_email}</span></td>
                  <td><span className="tipo-badge">{user.type}</span></td>
                  <td><span className="tipo-badge" style={{ background: '#f0fdf4', color: '#166534' }}>
                    {areas.find(a => a.id === String(user.area_id))?.nome || 'N/A'}
                  </span></td>
                  <td className="actions-cell">
                    <Edit3 size={18} className="icon-edit" onClick={() => openEditModal(user)} />
                    <Trash2 size={18} className="icon-delete" onClick={() => handleDelete(user.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Nenhum usuário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <header className="modal-header">
              <h2>{usuarioEditando ? 'Editar Login' : 'Novo Usuário'}</h2>
              <button className="close-button" onClick={closeModal}><X size={24} /></button>
            </header>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>NOME DO COLABORADOR</label>
                <input
                  type="text" required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>E-MAIL CORPORATIVO</label>
                <input
                  type="email" required
                  autoComplete="off"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>TELEFONE</label>
                <input
                  type="tel" required
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: formatarTelefone(e.target.value) })}
                />
              </div>

              {(!usuarioEditando || alterarSenha) && (
                <div className="password-section">
                  <div className="form-group">
                    <label>SENHA</label>
                    <input
                      type="password"
                      required={!usuarioEditando || alterarSenha}
                      autoComplete="new-password"
                      value={formData.senha}
                      onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>CONFIRMAR SENHA</label>
                    <input
                      type="password"
                      required={!usuarioEditando || alterarSenha}
                      autoComplete="new-password"
                      value={formData.confirmarSenha}
                      onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {usuarioEditando && (
                <div className="change-password-trigger">
                  <button
                    type="button"
                    className="btn-toggle-password"
                    onClick={() => setAlterarSenha(!alterarSenha)}
                    style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '0.8rem', padding: '10px 0' }}
                  >
                     {alterarSenha ? "✕ Cancelar alteração de senha" : "🔑 Alterar senha de acesso"}
                  </button>
                </div>
              )}

              <div className="form-group">
                <label>TIPO DE LOGIN</label>
                <select
                  className="modal-select"
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                >
                  <option value="adm">Administrativo</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Visualizador</option>
                </select>
              </div>

              <div className="form-group">
                <label>ÁREA DA EMPRESA</label>
                <select
                  className="modal-select"
                  value={formData.area_id}
                  onChange={(e) => setFormData({ ...formData, area_id: e.target.value })}
                  required
                >
                  <option value="">Selecione uma área...</option>
                  {areas.map(area => (
                    <option key={area.id} value={area.id}>{area.nome}</option>
                  ))}
                </select>
              </div>

              <footer className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-save">Salvar Login</button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginAcesso;