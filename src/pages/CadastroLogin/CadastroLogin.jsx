import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../../styles/Cadastro.css';
import { UserPlus, Edit3, Trash2, X } from 'lucide-react';

function LoginAcesso() {
  const [usuarios, setUsuarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
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
      const listaDeUsuarios = response.data.data.users || response.data || [];
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

    const telefoneApenasNumeros = formData.telefone.replace(/\D/g, '');

    const dadosParaEnviar = {
      name: formData.nome,
      corporate_email: formData.email,
      password: formData.senha,
      type: formData.tipo,
      telefone: telefoneApenasNumeros
    };

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      if (usuarioEditando) {
        await api.put(`/users/${usuarioEditando.id}`, dadosParaEnviar, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Usuário atualizado com sucesso!");
      } else {
        await api.post('/users', dadosParaEnviar, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Usuário cadastrado com sucesso!");
      }

      carregarUsuarios();
      closeModal();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("ERRO DE VALIDAÇÃO DA API:", error.response.data);
      }
      console.error("Erro ao salvar usuário", error);
      alert("Erro ao salvar: " + (error.response?.data?.message || "Verifique os dados no console."));
    }
  };

  const handleDelete = async (id) => {

    console.log("ID que chegou para deletar:", id);

    if (window.confirm("Deseja realmente excluir este usuário?")) {
      try {
        const token = localStorage.getItem('@Regatec:token');

        await api.delete(`users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
          }
        });

        alert("Usuário excluído com sucesso!");
        carregarUsuarios();
      } catch (error) {
        console.error("Erro ao deletar", error);
        alert("Erro ao excluir: " + (error.response?.data?.message || "Verifique as permissões."));
      }
    }
  };

  const openEditModal = (usuario) => {
    setUsuarioEditando(usuario);
    setFormData({
      nome: usuario.name,
      email: usuario.corporate_email,
      tipo: usuario.type || 'adm',
      telefone: usuario.telefone || '',
      senha: '',
      confirmarSenha: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUsuarioEditando(null);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      senha: '',
      confirmarSenha: '',
      tipo: 'adm'
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
            {Array.isArray(usuarios) && usuarios.map((user) => (
              <tr key={user.id}>
                <td><span className="colaborador-name">{user.name}</span></td>
                <td><span className="email-text">{user.corporate_email}</span></td>
                <td><span className="tipo-badge">{user.type}</span></td>
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

              <div className="form-group">
                <label>SENHA</label>
                <input
                  type="password" required={!usuarioEditando}
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>CONFIRMAR SENHA</label>
                <input
                  type="password" required={!usuarioEditando}
                  value={formData.confirmarSenha}
                  onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                />
              </div>

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
