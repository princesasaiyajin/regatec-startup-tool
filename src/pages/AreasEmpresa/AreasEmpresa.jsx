import React, { useState, useEffect } from 'react';
import { Building2, Edit3, Trash2, X } from 'lucide-react';
import '../../styles/Cadastro.css';

function AreasEmpresa() {
  const [areas, setAreas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [areaEditando, setAreaEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    dias: '',
    permissoesProjeto: Array(9).fill(false),
    permissoesObra: Array(9).fill(false),
  });

  useEffect(() => {
    const fetchAreas = async () => {
      setAreas([
        { id: 1, nome: 'Vendas', dias: 5, permissoesProjeto: [true, true, false, false, false, false, false, false, false], permissoesObra: Array(9).fill(false) },
        { id: 2, nome: 'Projeto', dias: 10, permissoesProjeto: [false, false, true, true, true, true, true, false, false], permissoesObra: Array(9).fill(false) },
      ]);
    };
    fetchAreas();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (areaEditando) {
      setAreas(areas.map(a => a.id === areaEditando.id ? { ...formData, id: a.id } : a));
    } else {
      setAreas([...areas, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir esta área?")) {
      setAreas(areas.filter(a => a.id !== id));
    }
  };

  const openEditModal = (area) => {
    setAreaEditando(area);
    setFormData({ 
      nome: area.nome, 
      dias: area.dias, 
      permissoesProjeto: area.permissoesProjeto,
      permissoesObra: area.permissoesObra,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAreaEditando(null);
    setFormData({
      nome: '',
      dias: '',
      permissoesProjeto: Array(9).fill(false),
      permissoesObra: Array(9).fill(false),
    });
  };

  const handlePermissionChange = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((val, i) => (i === index ? !val : val))
    }));
  };

  return (
    <div className="content-area">
      <header className="content-header">
        <h1>ÁREAS DA EMPRESA</h1>
        <button className="btn-new-user" onClick={() => setIsModalOpen(true)}>
          <Building2 size={18} /> NOVA ÁREA
        </button>
      </header>

      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>NOME DA ÁREA</th>
              <th>DIAS PARA APROVAÇÃO</th>
              <th className="actions-header">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area.id}>
                <td><span className="colaborador-name">{area.nome}</span></td>
                <td><span className="email-text">{area.dias} dias</span></td>
                <td className="actions-cell">
                  <Edit3 size={18} className="icon-edit" onClick={() => openEditModal(area)} />
                  <Trash2 size={18} className="icon-delete" onClick={() => handleDelete(area.id)} />
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
              <h2>{areaEditando ? 'EDITAR ÁREA' : 'NOVA ÁREA'}</h2>
              <button className="close-button" onClick={closeModal}><X size={24} /></button>
            </header>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>NOME DA ÁREA</label>
                <input 
                  type="text" required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>DIAS PARA APROVAÇÃO</label>
                <input 
                  type="number" required
                  value={formData.dias}
                  onChange={(e) => setFormData({...formData, dias: e.target.value})}
                />
              </div>

              <div className="form-group" style={{ marginTop: '10px' }}>
                <label>PERMISSÕES - STARTUP DE PROJETOS</label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '10px', 
                  background: '#f8fafc', 
                  padding: '15px', 
                  borderRadius: '15px',
                  maxHeight: '150px',
                  overflowY: 'auto'
                }}>
                  {Array.from({ length: 9 }, (_, i) => (
                    <label key={`projeto-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.permissoesProjeto[i]}
                        onChange={() => handlePermissionChange('permissoesProjeto', i)}
                      /> Seção {String(i + 1).padStart(2, '0')}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '10px' }}>
                <label>PERMISSÕES - STARTUP DE OBRAS</label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '10px', 
                  background: '#f8fafc', 
                  padding: '15px', 
                  borderRadius: '15px',
                  maxHeight: '150px',
                  overflowY: 'auto'
                }}>
                  {Array.from({ length: 9 }, (_, i) => (
                    <label key={`obra-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.permissoesObra[i]}
                        onChange={() => handlePermissionChange('permissoesObra', i)}
                      /> Seção {String(i + 1).padStart(2, '0')}
                    </label>
                  ))}
                </div>
              </div>

              <footer className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>CANCELAR</button>
                <button type="submit" className="btn-save">SALVAR ÁREA</button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AreasEmpresa;