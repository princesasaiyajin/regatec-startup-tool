import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { Search, Plus, ChevronDown, ChevronUp, ArrowLeft, Save, CheckCircle, Trash2, Edit3, Copy, Building2 } from 'lucide-react';
import './StartupProjeto.css';

const StartupProjeto = ({ onVoltar }) => {
  const [view, setView] = useState('list');
  const [startups, setStartups] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [projetistas, setProjetistas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    s1: true, s2: false, s3: false, s4: false, s5: false, s6: false, s7: false, s8: false, s9: false
  });

  const [userPermissions, setUserPermissions] = useState(Array(9).fill(true));

  useEffect(() => {
    carregarStartups();
    carregarVendedoresEProjetistas();
    const userStr = localStorage.getItem('@Regatec:user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.type === 'adm') {
        setUserPermissions(Array(9).fill(true));
      } else {
        const areaPerms = JSON.parse(localStorage.getItem(`@Regatec:perms:${user.areaId}`) || '{"permissoesProjeto": [true, true, true, true, true, true, true, true, true]}');
        setUserPermissions(areaPerms.permissoesProjeto);
      }
    }
  }, []);

  const carregarStartups = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('@Regatec:token');
      const response = await api.get('/startups?page=1&limit=50', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const lista = response.data.data?.users || response.data?.data || response.data || [];
      setStartups(Array.isArray(lista) ? lista : []);
    } catch (error) {
      console.error("Erro ao carregar startups", error);
    } finally {
      setLoading(false);
    }
  };

  const carregarVendedoresEProjetistas = async () => {
    try {
      const token = localStorage.getItem('@Regatec:token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Rotas corrigidas conforme o seu Postman
      const [resVendedores, resProjetistas] = await Promise.all([
        api.get('/sellers?page=1&limit=100', config),
        api.get('/designers?page=1&limit=100', config) 
      ]);

      const extrairLista = (res) => {
        const conteudo = res.data?.data || res.data;
        if (Array.isArray(conteudo)) return conteudo;
        if (conteudo?.users && Array.isArray(conteudo.users)) return conteudo.users;
        if (conteudo?.sellers && Array.isArray(conteudo.sellers)) return conteudo.sellers;
        if (conteudo?.designers && Array.isArray(conteudo.designers)) return conteudo.designers;
        return [];
      };

      setVendedores(extrairLista(resVendedores));
      setProjetistas(extrairLista(resProjetistas));
    } catch (error) {
      console.error("Erro ao carregar listas da API", error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('@Regatec:token');
      const response = await api.get(`/startups?search=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const lista = response.data.data?.users || response.data?.data || response.data || [];
      setStartups(Array.isArray(lista) ? lista : []);
    } catch (error) {
      console.error("Erro na busca", error);
    } finally {
      setLoading(false);
    }
  };

  const buscarCEP = async (cep, target) => {
    if (cep.length < 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        const updatedStartup = { ...selectedStartup };
        const fields = {
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade
        };
        
        if (target === 'client') updatedStartup.client = { ...updatedStartup.client, ...fields };
        else if (target === 'project') updatedStartup.project = { ...updatedStartup.project, ...fields };
        else if (target === 'billing') updatedStartup.billing = { ...updatedStartup.billing, ...fields };
        
        setSelectedStartup(updatedStartup);
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP", error);
    }
  };

  const buscarCNPJ = async (cnpj, target) => {
    const cleanCnpj = cnpj.replace(/\D/g, '');
    if (cleanCnpj.length !== 14) return;
    try {
      const response = await fetch(`https://publica.cnpj.ws/cnpj/${cleanCnpj}`);
      const data = await response.json();
      if (data) {
        const updatedStartup = { ...selectedStartup };
        const fields = {
          name: data.razao_social,
          nickname: data.estabelecimento.nome_fantasia,
          address: `${data.estabelecimento.tipo_logradouro} ${data.estabelecimento.logradouro}, ${data.estabelecimento.numero}`,
          neighborhood: data.estabelecimento.bairro,
          city: data.estabelecimento.cidade.nome,
          zip_code: data.estabelecimento.cep,
          phone: data.estabelecimento.ddd1 + data.estabelecimento.telefone1,
          email: data.estabelecimento.email
        };
        
        if (target === 'client') updatedStartup.client = { ...updatedStartup.client, ...fields };
        else if (target === 'billing') updatedStartup.billing = { ...updatedStartup.billing, ...fields };
        
        setSelectedStartup(updatedStartup);
      }
    } catch (error) {
      console.error("Erro ao buscar CNPJ", error);
    }
  };

  const handleSaveSection = async (sectionId, endpoint) => {
    const sectionData = {};
    const inputs = document.querySelectorAll(`#${sectionId} input, #${sectionId} select, #${sectionId} textarea`);
    inputs.forEach(input => {
      if (input.name) sectionData[input.name] = input.value || "";
    });

    try {
      const token = localStorage.getItem('@Regatec:token');
      
      if (!selectedStartup?.id && sectionId === 's1') {
        if (!sectionData.name || !sectionData.number) {
          alert("Por favor, preencha o Nome e o Número do Startup.");
          return;
        }
        const response = await api.post('/startups', sectionData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const newStartup = response.data.data || response.data;
        setSelectedStartup(newStartup);
        alert("Startup criado com sucesso!");
        return;
      }

      if (!selectedStartup?.id) {
        alert("Por favor, salve primeiro a Seção 01.");
        return;
      }

      const url = endpoint ? `/startups/${selectedStartup.id}/${endpoint}` : `/startups/${selectedStartup.id}`;
      await api.patch(url, sectionData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Seção salva com sucesso!");
    } catch (error) {
      console.error(`Erro ao salvar ${sectionId}`, error);
      const msgErro = error.response?.data?.message || error.response?.data?.error || "Erro ao salvar.";
      alert(msgErro);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderList = () => (
    <div className="content-area">
      <header className="content-header">
        <div className="header-actions">
          <button onClick={onVoltar} className="btn-back">
            <ArrowLeft size={24} color="#041410" />
          </button>
          <h1>STARTUP DE PROJETOS</h1>
        </div>
        <button className="btn-new-user" onClick={() => { setSelectedStartup({ id: null, client: {}, project: {}, billing: {}, landscape: {}, financials: {}, phases: {}, sectors: {}, contacts: {} }); setView('form'); }}>
          <Plus size={18} /> NOVO STARTUP
        </button>
      </header>

      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            className="search-input"
            placeholder="Buscar por nome, número, CEP ou telefone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button className="btn-save" onClick={handleSearch} style={{ padding: '0 25px' }}>BUSCAR</button>
      </div>

      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>NÚMERO</th>
              <th>NOME DO STARTUP</th>
              <th>CLIENTE</th>
              <th>STATUS</th>
              <th className="actions-header">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Carregando...</td></tr>
            ) : startups.length > 0 ? (
              startups.map((s) => (
                <tr key={s.id}>
                  <td><span className="colaborador-name">{s.number || '---'}</span></td>
                  <td><span className="email-text">{s.name}</span></td>
                  <td><span className="email-text">{s.client?.name || '---'}</span></td>
                  <td><span className={`status-badge ${s.status === 'approved' ? 'status-approved' : 'status-pending'}`}>
                    {s.status === 'approved' ? 'APROVADO' : 'EM ANDAMENTO'}
                  </span></td>
                  <td className="actions-cell">
                    <Edit3 size={18} className="icon-edit" onClick={() => { setSelectedStartup(s); setView('form'); }} />
                    <Trash2 size={18} className="icon-delete" />
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>Nenhum startup encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="content-area">
      <header className="content-header">
        <div className="header-actions">
          <button onClick={() => setView('list')} className="btn-back">
            <ArrowLeft size={24} color="#041410" />
          </button>
          <h1>{selectedStartup?.id ? `EDITAR STARTUP #${selectedStartup.number}` : 'NOVO STARTUP'}</h1>
        </div>
      </header>

      <div className="startup-container">
        
        {/* Seção 01 - Startup */}
        {userPermissions[0] && (
          <Section title="01 - DADOS DO STARTUP" id="s1" expanded={expandedSections.s1} onToggle={() => toggleSection('s1')}>
            <div className="form-grid grid-4">
              <div className="form-group"><label>NÚMERO DO STARTUP</label><input type="text" name="number" defaultValue={selectedStartup?.number} /></div>
              <div className="form-group span-2"><label>NOME DO STARTUP</label><input type="text" name="name" defaultValue={selectedStartup?.name} /></div>
              <div className="form-group"><label>DATA DE FECHAMENTO</label><input type="date" name="closed_at" defaultValue={selectedStartup?.closed_at} /></div>
              <div className="form-group"><label>NÚMERO DA PROPOSTA</label><input type="text" name="proposal_number" defaultValue={selectedStartup?.proposal_number} /></div>
              <div className="form-group">
                <label>VENDEDOR</label>
                <select className="modal-select" name="salesperson_id" defaultValue={selectedStartup?.salesperson_id}>
                  <option value="">Selecione...</option>
                  {vendedores.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>PROJETISTA</label>
                <select className="modal-select" name="designer_id" defaultValue={selectedStartup?.designer_id}>
                  <option value="">Selecione...</option>
                  {projetistas.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="form-group"><label>CERTIFICAÇÃO</label><input type="text" name="certification" defaultValue={selectedStartup?.certification} /></div>
              <div className="form-group"><label>CNO</label><input type="text" name="cno" defaultValue={selectedStartup?.cno} /></div>
            </div>
            <button className="btn-section-save" onClick={() => handleSaveSection('s1', '')}>SALVAR</button>
          </Section>
        )}

        {/* Seção 02 - Cliente */}
        {userPermissions[1] && (
          <Section title="02 - DADOS DO CLIENTE / FISCAIS" id="s2" expanded={expandedSections.s2} onToggle={() => toggleSection('s2')}>
            <div className="form-grid grid-4">
              <div className="form-group"><label>CNPJ / CPF</label><input type="text" name="tax_id" defaultValue={selectedStartup?.client?.tax_id} onBlur={(e) => buscarCNPJ(e.target.value, 'client')} /></div>
              <div className="form-group span-2"><label>RAZÃO SOCIAL / NOME</label><input type="text" name="name" value={selectedStartup?.client?.name || ''} onChange={(e) => setSelectedStartup({...selectedStartup, client: {...selectedStartup.client, name: e.target.value}})} /></div>
              <div className="form-group"><label>NOME FANTASIA</label><input type="text" name="nickname" value={selectedStartup?.client?.nickname || ''} onChange={(e) => setSelectedStartup({...selectedStartup, client: {...selectedStartup.client, nickname: e.target.value}})} /></div>
              <div className="form-group"><label>CEP</label><input type="text" name="zip_code" value={selectedStartup?.client?.zip_code || ''} onChange={(e) => setSelectedStartup({...selectedStartup, client: {...selectedStartup.client, zip_code: e.target.value}})} onKeyPress={(e) => e.key === 'Enter' && buscarCEP(e.target.value, 'client')} /></div>
              <div className="form-group span-2"><label>ENDEREÇO</label><input type="text" name="address" value={selectedStartup?.client?.address || ''} readOnly /></div>
              <div className="form-group"><label>BAIRRO</label><input type="text" name="neighborhood" value={selectedStartup?.client?.neighborhood || ''} readOnly /></div>
              <div className="form-group"><label>CIDADE</label><input type="text" name="city" value={selectedStartup?.client?.city || ''} readOnly /></div>
              <div className="form-group"><label>TELEFONE</label><input type="text" name="phone" value={selectedStartup?.client?.phone || ''} onChange={(e) => setSelectedStartup({...selectedStartup, client: {...selectedStartup.client, phone: e.target.value}})} /></div>
              <div className="form-group"><label>EMAIL</label><input type="email" name="email" value={selectedStartup?.client?.email || ''} onChange={(e) => setSelectedStartup({...selectedStartup, client: {...selectedStartup.client, email: e.target.value}})} /></div>
              <div className="form-group"><label>IE / RG</label><input type="text" name="ie_rg" defaultValue={selectedStartup?.client?.ie_rg} /></div>
            </div>
            <button className="btn-section-save" onClick={() => handleSaveSection('s2', 'client')}>SALVAR</button>
          </Section>
        )}

        {/* Seção 03 - Dados do Projeto */}
        {userPermissions[2] && (
          <Section title="03 - DADOS DO PROJETO" id="s3" expanded={expandedSections.s3} onToggle={() => toggleSection('s3')}>
            <div className="form-grid grid-4">
              <div className="form-group">
                <label>TIPO</label>
                <select className="modal-select" name="type" defaultValue={selectedStartup?.project?.type}>
                  <option value="">Selecione...</option>
                  <option value="residencial">Residencial</option>
                  <option value="comercial">Comercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
              <div className="form-group"><label>CEP</label><input type="text" name="zip_code" defaultValue={selectedStartup?.project?.zip_code} onKeyPress={(e) => e.key === 'Enter' && buscarCEP(e.target.value, 'project')} /></div>
              <div className="form-group span-2"><label>ENDEREÇO</label><input type="text" name="address" value={selectedStartup?.project?.address || ''} readOnly /></div>
              <div className="form-group"><label>CIDADE</label><input type="text" name="city" value={selectedStartup?.project?.city || ''} readOnly /></div>
              <div className="form-group"><label>BAIRRO</label><input type="text" name="neighborhood" value={selectedStartup?.project?.neighborhood || ''} readOnly /></div>
              <div className="form-group"><label>TELEFONE</label><input type="text" name="phone" defaultValue={selectedStartup?.project?.phone} /></div>
              <div className="form-group"><label>EMAIL</label><input type="email" name="email" defaultValue={selectedStartup?.project?.email} /></div>
              <div className="form-group"><label>EMPRESA</label><input type="text" name="company" defaultValue={selectedStartup?.project?.company} /></div>
              <div className="form-group"><label>RESPONSÁVEL</label><input type="text" name="responsible" defaultValue={selectedStartup?.project?.responsible} /></div>
            </div>
            <button className="btn-section-save" onClick={() => handleSaveSection('s3', 'project')}>SALVAR</button>
          </Section>
        )}

        {/* Seção 04 - Paisagista */}
        {userPermissions[3] && (
          <Section title="04 - PAISAGISTA" id="s4" expanded={expandedSections.s4} onToggle={() => toggleSection('s4')}>
            <div className="form-grid grid-4">
              <div className="form-group"><label>EMPRESA PAISAGISTA</label><input type="text" name="company" defaultValue={selectedStartup?.landscape?.company} /></div>
              <div className="form-group"><label>RESPONSÁVEL</label><input type="text" name="responsible" defaultValue={selectedStartup?.landscape?.responsible} /></div>
              <div className="form-group"><label>TELEFONE</label><input type="text" name="phone" defaultValue={selectedStartup?.landscape?.phone} /></div>
              <div className="form-group"><label>RT</label><input type="text" name="rt" defaultValue={selectedStartup?.landscape?.rt} /></div>
              <div className="form-group"><label>EMAIL</label><input type="email" name="email" defaultValue={selectedStartup?.landscape?.email} /></div>
              <div className="form-group span-2"><label>EMPRESA EXECUTORA DO PROJETO</label><input type="text" name="executor_company" defaultValue={selectedStartup?.landscape?.executor_company} /></div>
              <div className="form-group"><label>CONTATO</label><input type="text" name="contact" defaultValue={selectedStartup?.landscape?.contact} /></div>
              <div className="form-group"><label>TELEFONE EXECUTORA</label><input type="text" name="executor_phone" defaultValue={selectedStartup?.landscape?.executor_phone} /></div>
              <div className="form-group"><label>EMAIL EXECUTORA</label><input type="email" name="executor_email" defaultValue={selectedStartup?.landscape?.executor_email} /></div>
            </div>
            <button className="btn-section-save" onClick={() => handleSaveSection('s4', 'landscape')}>SALVAR</button>
          </Section>
        )}

        {/* Seção 05 - Dados Financeiros */}
        {userPermissions[4] && (
          <Section title="05 - DADOS FINANCEIROS - PROJETO" id="s5" expanded={expandedSections.s5} onToggle={() => toggleSection('s5')}>
            <div className="form-grid grid-4">
              <div className="form-group"><label>VALOR DA PROPOSTA</label><input type="text" name="proposal_value" defaultValue={selectedStartup?.financials?.proposal_value} /></div>
              <div className="form-group"><label>PRÉ-EXECUTIVO</label><input type="text" name="pre_executive_val" defaultValue={selectedStartup?.financials?.pre_executive_val} /></div>
              <div className="form-group"><label>PROJETO EXECUTIVO</label><input type="text" name="executive_val" defaultValue={selectedStartup?.financials?.executive_val} /></div>
              <div className="form-group"><label>LIBERADO PARA A OBRA</label><input type="text" name="released_val" defaultValue={selectedStartup?.financials?.released_val} /></div>
              <div className="form-group span-2"><label>CONDIÇÕES DE PAGAMENTO</label><input type="text" name="payment_conditions" defaultValue={selectedStartup?.financials?.payment_conditions} /></div>
              <div className="form-group"><label>OBSERVAÇÃO</label><input type="text" name="observation" defaultValue={selectedStartup?.financials?.observation} /></div>
              <div className="form-group"><label>RETENÇÃO</label><input type="text" name="retention" defaultValue={selectedStartup?.financials?.retention} /></div>
              <div className="form-group"><label>CONTRATO</label><input type="text" name="contract" defaultValue={selectedStartup?.financials?.contract} /></div>
              <div className="form-group"><label>ART</label><input type="text" name="art" defaultValue={selectedStartup?.financials?.art} /></div>
            </div>
            <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <h4 style={{ marginBottom: '15px', fontSize: '14px', color: '#059669' }}>PREVISÃO DE PAGTO</h4>
              <div className="form-grid grid-3">
                <div className="form-group"><label>DATA</label><input type="date" name="payment_date" defaultValue={selectedStartup?.financials?.payment_date} /></div>
                <div className="form-group"><label>VALOR</label><input type="text" name="payment_value" defaultValue={selectedStartup?.financials?.payment_value} /></div>
                <div className="form-group"><label>FORMA DE PAGAMENTO</label><input type="text" name="payment_method" defaultValue={selectedStartup?.financials?.payment_method} /></div>
              </div>
            </div>
            <button className="btn-section-save" onClick={() => handleSaveSection('s5', 'financials')}>SALVAR</button>
          </Section>
        )}

        {/* Seção 06 - Fases do Projeto */}
        {userPermissions[5] && (
          <Section title="06 - FASES DO PROJETO" id="s6" expanded={expandedSections.s6} onToggle={() => toggleSection('s6')}>
            <div className="form-grid grid-3">
              <div className="form-group"><label>PRÉ-EXECUTIVO</label><input type="text" name="pre_executive" defaultValue={selectedStartup?.phases?.pre_executive} /></div>
              <div className="form-group"><label>PROJETO EXECUTIVO</label><input type="text" name="executive_project" defaultValue={selectedStartup?.phases?.executive_project} /></div>
              <div className="form-group"><label>LIBERADO OBRA</label><input type="text" name="released_for_work" defaultValue={selectedStartup?.phases?.released_for_work} /></div>
            </div>
            <button className="btn-section-save" onClick={() => handleSaveSection('s6', 'phases')}>SALVAR</button>
          </Section>
        )}

        {/* Seção 07 - Setor de Projetos */}
        {userPermissions[6] && (
          <Section title="07 - SETOR DE PROJETOS" id="s7" expanded={expandedSections.s7} onToggle={() => toggleSection('s7')}>
            <div className="form-grid grid-4">
              <div className="form-group"><label>PAISAGISMO</label><select className="modal-select" name="landscape"><option value="sim">Sim</option><option value="nao">Não</option></select></div>
              <div className="form-group"><label>HIDRÁULICA</label><select className="modal-select" name="hydraulic"><option value="sim">Sim</option><option value="nao">Não</option></select></div>
              <div className="form-group"><label>ESTRUTURA</label><select className="modal-select" name="structure"><option value="sim">Sim</option><option value="nao">Não</option></select></div>
              <div className="form-group"><label>ARQUITETURA</label><select className="modal-select" name="architecture"><option value="sim">Sim</option><option value="nao">Não</option></select></div>
              <div className="form-group"><label>CERTIFICAÇÃO</label><input type="text" name="certification" defaultValue={selectedStartup?.sectors?.certification} /></div>
              <div className="form-group span-2"><label>TIPO DE CERTIFICAÇÃO</label><input type="text" name="cert_type" defaultValue={selectedStartup?.sectors?.cert_type} /></div>
              <div className="form-group"><label>GERENCIAMENTO DE ARQUIVOS</label><input type="text" name="file_management" defaultValue={selectedStartup?.sectors?.file_management} /></div>
            </div>
            <button className="btn-section-save" onClick={() => handleSaveSection('s7', 'sectors')}>SALVAR</button>
          </Section>
        )}

        {/* Seção 08 - Faturamento */}
        {userPermissions[7] && (
          <Section title="08 - DADOS PARA FATURAMENTO" id="s8" expanded={expandedSections.s8} onToggle={() => toggleSection('s8')}>
            <button className="btn-copy-data" onClick={() => {
              const updated = { ...selectedStartup, billing: { ...selectedStartup.client } };
              setSelectedStartup(updated);
            }}><Copy size={12} /> COPIAR DADOS DO CLIENTE</button>
            <div className="form-grid grid-4">
              <div className="form-group">
              <label>CNPJ / CPF</label><input type="text" name="tax_id" value={selectedStartup?.billing?.tax_id || ''} onChange={(e) => setSelectedStartup({...selectedStartup, billing: {...selectedStartup.billing, tax_id: e.target.value}})} onBlur={(e) => buscarCNPJ(e.target.value, 'billing')} />
              </div>
              <div className="form-group span-2">
              <label>RAZÃO SOCIAL / NOME</label><input type="text" name="name" value={selectedStartup?.billing?.name || ''} onChange={(e) => setSelectedStartup({...selectedStartup, billing: {...selectedStartup.billing, name: e.target.value}})} />
              </div>
              <div className="form-group">
              <label>CEP</label><input type="text" name="zip_code" value={selectedStartup?.billing?.zip_code || ''} onChange={(e) => setSelectedStartup({...selectedStartup, billing: {...selectedStartup.billing, zip_code: e.target.value}})} onKeyPress={(e) => e.key === 'Enter' && buscarCEP(e.target.value, 'billing')} />
              </div>
              <div className="form-group span-2">
              <label>ENDEREÇO</label><input type="text" name="address" value={selectedStartup?.billing?.address || ''} readOnly />
              </div>
              <div className="form-group">
              <label>BAIRRO</label><input type="text" name="neighborhood" value={selectedStartup?.billing?.neighborhood || ''} readOnly />
              </div>
              <div className="form-group">
              <label>CIDADE</label><input type="text" name="city" value={selectedStartup?.billing?.city || ''} readOnly />
              </div>
              <div className="form-group">
              <label>TELEFONE</label><input type="text" name="phone" value={selectedStartup?.billing?.phone || ''} onChange={(e) => setSelectedStartup({...selectedStartup, billing: {...selectedStartup.billing, phone: e.target.value}})} />
              </div>
              <div className="form-group">
              <label>EMAIL</label><input type="email" name="email" value={selectedStartup?.billing?.email || ''} onChange={(e) => setSelectedStartup({...selectedStartup, billing: {...selectedStartup.billing, email: e.target.value}})} />
              </div>
              <div className="form-group">
              <label>IE / RG</label><input type="text" name="ie_rg" defaultValue={selectedStartup?.billing?.ie_rg} />
              </div>
            </div>
            <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <h4 style={{ marginBottom: '15px', fontSize: '14px', color: '#059669' }}>CONTATOS</h4>
              <div className="form-grid grid-4">
                <div className="form-group">
                <label>TIPO</label>
                <input type="text" name="contact_type" defaultValue={selectedStartup?.billing?.contact_type} />
                </div>
                <div className="form-group">
                <label>EMAIL CONTATO</label>
                <input type="email" name="contact_email" defaultValue={selectedStartup?.billing?.contact_email} />
                </div>
                <div className="form-group">
                <label>TELEFONE CONTATO</label><input type="text" name="contact_phone" defaultValue={selectedStartup?.billing?.contact_phone} />
                </div>
                <div className="form-group">
                <label>RECEPÇÃO DAS NFs</label>
                <input type="text" name="nf_reception_name" defaultValue={selectedStartup?.billing?.nf_reception_name} />
                </div>
                <div className="form-group">
                <label>NOME</label>
                <input type="text" name="nf_name" defaultValue={selectedStartup?.billing?.nf_name} />
                </div>
                <div className="form-group">
                <label>TELEFONE NF</label>
                <input type="text" name="nf_phone" defaultValue={selectedStartup?.billing?.nf_phone} />
                </div>
                <div className="form-group">
                <label>EMAIL NF</label><input type="email" name="nf_email" defaultValue={selectedStartup?.billing?.nf_email} />
                </div>
              </div>
            </div>
            <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <h4 style={{ marginBottom: '15px', fontSize: '14px', color: '#059669' }}>DATAS</h4>
              <div className="form-grid grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group"><label>RECEPÇÃO DA NF</label>
                <input type="date" name="nf_reception_date" defaultValue={selectedStartup?.billing?.nf_reception_date} />
                </div>
                <div className="form-group"><label>PAGAMENTO DA NF</label>
                <input type="date" name="nf_payment_date" defaultValue={selectedStartup?.billing?.nf_payment_date} />
                </div>
              </div>
            </div>
            <button className="btn-section-save" onClick={() => handleSaveSection('s8', 'billing')}>SALVAR</button>
          </Section>
        )}

        {/* Seção 09 - Observações */}
        {userPermissions[8] && (
          <Section title="09 - OBSERVAÇÕES" id="s9" expanded={expandedSections.s9} onToggle={() => toggleSection('s9')}>
            <div className="form-grid grid-1">
              <div className="form-group">
              <label>OBSERVAÇÕES GERAIS</label><textarea name="observations" className="observations-textarea" defaultValue={selectedStartup?.observations}></textarea></div>
              <div className="form-group"
              ><label>OBSERVAÇÕES IMPORTANTES</label><textarea name="important_obs" className="observations-textarea" defaultValue={selectedStartup?.important_obs}></textarea></div>
            </div>
            <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <h4 style={{ marginBottom: '15px', fontSize: '14px', color: '#059669' }}>CERTIFICAÇÃO</h4>
              <div className="form-grid grid-3">
                <div className="form-group">
                <label>NECESSIDADE DE ART</label><select className="modal-select" name="art_needed"><option value="sim">Sim</option><option value="nao">Não</option></select></div>
                <div className="form-group">
                <label>RETENÇÃO</label><input type="text" name="final_retention" defaultValue={selectedStartup?.final_retention} /></div>
              </div>
            </div>
            <button className="btn-section-save" onClick={() => handleSaveSection('s9', 'observations')}>SALVAR</button>
          </Section>
        )}

      </div>
    </div>
  );

  return view === 'list' ? renderList() : renderForm();
};

const Section = ({ title, id, expanded, onToggle, children }) => (
  <div id={id} className="card-section">
    <div className="section-header" onClick={onToggle}>
      <div className="section-header-left">
        <span className="section-number">{title.split(' ')[0]}</span>
        <h3 className="section-title">{title.substring(title.indexOf('-') + 1)}</h3>
      </div>
      {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </div>
    {expanded && <div className="section-content">{children}</div>}
  </div>
);

export default StartupProjeto;