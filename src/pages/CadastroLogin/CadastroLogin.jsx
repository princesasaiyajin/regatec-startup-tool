import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/Cadastro.css';
import { UserPlus, Edit3, Trash2, X } from 'lucide-react';

function LoginAcesso() {
  const [usuarios, setUsuarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [alterarSenha, setAlterarSenha] = useState(false); 
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '', // Usamos 'telefone' para o input e máscara
    senha: '',
    confirmarSenha: '',
    tipo: 'adm'
  });

  const carregarUsuarios = async () => {
    try {
      const token = localStorage.getItem('@Regatec:token');
      const response = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Tenta pegar a lista de usuários de diferentes estruturas possíveis da API
      const listaDeUsuarios = response.data.data?.users || response.data?.data || response.data || [];
      setUsuarios(Array.isArray(listaDeUsuarios) ? listaDeUsuarios : []);
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
      setUsuarios([]);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

const handleSave = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('@Regatec:token');
  const telefoneLimpo = formData.telefone ? formData.telefone.replace(/\D/g, '') : "";

  const dadosParaEnviar = {
    name: formData.nome,
    corporate_email: formData.email,
    type: formData.tipo,
    phone: telefoneLimpo 
  };

  try {
    if (usuarioEditando) {
      // Se o erro de PATCH persistir, tente mudar para .post aqui só para testar
      await api.patch(`/users/${usuarioEditando.id}`, dadosParaEnviar, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Atualizado com sucesso!");
    } else {
      await api.post('/users', dadosParaEnviar, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Cadastrado com sucesso!");
    }
    carregarUsuarios();
    closeModal();
  } catch (error) {
    console.error("ERRO DE REDE:", error);
    // Isso vai te mostrar se o erro é CORS ou se o ID não foi encontrado
    alert("Erro ao salvar: " + (error.response?.status === 405 ? "Método PATCH não permitido no servidor" : "Verifique o console"));
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
      // Tenta pegar o telefone das duas chaves possíveis da API
      telefone: formatarTelefone(usuario.phone || usuario.telefone || ''),
      senha: '',
      confirmarSenha: ''
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
      senha: '', confirmarSenha: '', tipo: 'adm'
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
                  <td className="actions-cell">
                    <Edit3 size={18} className="icon-edit" onClick={() => openEditModal(user)} />
                    <Trash2 size={18} className="icon-delete" onClick={() => handleDelete(user.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Nenhum usuário encontrado.</td>
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
                  >
                     {alterarSenha ? "Cancelar alteração de senha" : "Alterar senha de acesso"}
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