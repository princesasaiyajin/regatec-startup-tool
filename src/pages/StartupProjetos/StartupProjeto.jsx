import './StartupProjeto.css';
import { useState } from 'react';

export default function StartupProjeto() {
  const [expandedCards, setExpandedCards] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
    card5: false,
    card6: false,
    card7: false,
    card8: false,
    card9: false,
  });

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleCopyData = () => {
    alert('Dados do cliente copiados para o faturamento!');
  };

  const handleSearch = () => {
    alert('Simulando busca de CEP/CNPJ...');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulário enviado com sucesso!');
  };

  return (
    <div className="container">
      <form className="space-y-6 pb-20" onSubmit={handleSubmit}>
        
        {/* Seção 01 - Startup */}
        <div className={`card ${expandedCards.card1 ? 'expanded' : 'collapsed'}`}>
          <div className="card-header" onClick={() => toggleCard('card1')}>
            <div className="header-content">
              <div className="badge">01</div>
              <h4 className="title">Dados do Startup</h4>
            </div>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div className="card-content">
            <div className="grid grid-4">
              <div className="input-group">
                <label>Número</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline><polyline points="12 12 20 7.5"></polyline><polyline points="12 12 12 21"></polyline><polyline points="12 12 4 7.5"></polyline></svg>
                  <input type="text" placeholder="Número" />
                </div>
              </div>
              <div className="input-group col-span-2">
                <label>Nome</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  <input type="text" placeholder="Nome" />
                </div>
              </div>
              <div className="input-group">
                <label>Fechamento</label>
                <div className="input-wrapper">
                  <input type="date" />
                </div>
              </div>
            </div>
            <div className="grid grid-3">
              <div className="input-group">
                <label>Proposta</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                  <input type="text" placeholder="Proposta" />
                </div>
              </div>
              <div className="input-group">
                <label>Vendedor</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  <select>
                    <option>Selecione...</option>
                    <option>Marcos</option>
                    <option>Luiza</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>Projetista</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="21 8 21 21 15 21 15 8 9 8"></polyline></svg>
                  <select>
                    <option>Selecione...</option>
                    <option>Fernanda</option>
                    <option>Roberto</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-2 border-top pt-4">
              <div className="input-group">
                <label>Certificação</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.75a4 4 0 0 0 4.12-2.36l.5-1a2 2 0 0 1 3.06 0l.5 1a4 4 0 0 0 4.12 2.36l1.1.1a2 2 0 0 1 1.82 2.18l-.1 1.1a4 4 0 0 0 2.36 4.12l1 .5a2 2 0 0 1 0 3.06l-1 .5a4 4 0 0 0-2.36 4.12l.1 1.1a2 2 0 0 1-2.18 1.82l-1.1-.1a4 4 0 0 0-4.12 2.36l-.5 1a2 2 0 0 1-3.06 0l-.5-1a4 4 0 0 0-4.12-2.36l-1.1.1a2 2 0 0 1-1.82-2.18l.1-1.1a4 4 0 0 0-2.36-4.12l-1-.5a2 2 0 0 1 0-3.06l1-.5a4 4 0 0 0 2.36-4.12l-.1-1.1a2 2 0 0 1 2.18-1.82l1.1.1z"></path><polyline points="12 9 15.591 12.591 22 6"></polyline></svg>
                  <input type="text" placeholder="Certificação" />
                </div>
              </div>
              <div className="input-group">
                <label>CNO</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  <input type="text" placeholder="CNO" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 02 - Cliente */}
        <div className={`card ${expandedCards.card2 ? 'expanded' : 'collapsed'}`}>
          <div className="card-header" onClick={() => toggleCard('card2')}>
            <div className="header-content">
              <div className="badge">02</div>
              <h4 className="title">Dados do Cliente / Fiscais</h4>
            </div>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div className="card-content">
            <div className="grid grid-3">
              <div className="input-group">
                <label>CNPJ / CPF</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  <input type="text" placeholder="CNPJ / CPF" />
                  <button type="button" className="search-btn" onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg></button>
                </div>
              </div>
              <div className="input-group col-span-2">
                <label>Razão Social</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <input type="text" placeholder="Razão Social" />
                </div>
              </div>
            </div>
            <div className="grid grid-4">
              <div className="input-group">
                <label>CEP</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <input type="text" placeholder="CEP" />
                  <button type="button" className="search-btn" onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg></button>
                </div>
              </div>
              <div className="input-group col-span-2">
                <label>Endereço</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Endereço" />
                </div>
              </div>
              <div className="input-group">
                <label>Bairro</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Bairro" />
                </div>
              </div>
            </div>
            <div className="grid grid-4">
              <div className="input-group">
                <label>Cidade</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <input type="text" placeholder="Cidade" />
                </div>
              </div>
              <div className="input-group">
                <label>Telefone</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <input type="text" placeholder="Telefone" />
                </div>
              </div>
              <div className="input-group">
                <label>E-mail</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  <input type="email" placeholder="E-mail" />
                </div>
              </div>
              <div className="input-group">
                <label>IE / RG</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="IE / RG" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 03 - Dados do Projeto */}
        <div className={`card ${expandedCards.card3 ? 'expanded' : 'collapsed'}`}>
          <div className="card-header" onClick={() => toggleCard('card3')}>
            <div className="header-content">
              <div className="badge">03</div>
              <h4 className="title">Dados do Projeto</h4>
            </div>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div className="card-content">
            <div className="grid grid-4">
              <div className="input-group">
                <label>Tipo</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"></path></svg>
                  <select>
                    <option>Selecione...</option>
                    <option>Residencial</option>
                    <option>Corporativa</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>CEP</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <input type="text" placeholder="CEP" />
                  <button type="button" className="search-btn" onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg></button>
                </div>
              </div>
              <div className="input-group col-span-2">
                <label>Endereço</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Endereço" />
                </div>
              </div>
            </div>
            <div className="grid grid-3">
              <div className="input-group">
                <label>Cidade</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Cidade" />
                </div>
              </div>
              <div className="input-group">
                <label>Bairro</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Bairro" />
                </div>
              </div>
              <div className="input-group">
                <label>Telefone</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <input type="text" placeholder="Telefone" />
                </div>
              </div>
            </div>
            <div className="grid grid-3">
              <div className="input-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  <input type="email" placeholder="Email" />
                </div>
              </div>
              <div className="input-group">
                <label>Empresa</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <input type="text" placeholder="Empresa" />
                </div>
              </div>
              <div className="input-group">
                <label>Responsável</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="21 8 21 21 15 21 15 8 9 8"></polyline></svg>
                  <input type="text" placeholder="Responsável" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 04 - Paisagista */}
        <div className={`card ${expandedCards.card4 ? 'expanded' : 'collapsed'}`}>
          <div className="card-header" onClick={() => toggleCard('card4')}>
            <div className="header-content">
              <div className="badge">04</div>
              <h4 className="title">Paisagista</h4>
            </div>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div className="card-content">
            <div className="grid grid-3">
              <div className="input-group">
                <label>Empresa</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  <input type="text" placeholder="Empresa" />
                </div>
              </div>
              <div className="input-group">
                <label>Responsável</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Responsável" />
                </div>
              </div>
              <div className="input-group">
                <label>Telefone</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <input type="text" placeholder="Telefone" />
                </div>
              </div>
            </div>
            <div className="grid grid-2">
              <div className="input-group">
                <label>RT</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="RT" />
                </div>
              </div>
              <div className="input-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  <input type="email" placeholder="Email" />
                </div>
              </div>
            </div>
            <div className="grid grid-4 border-top pt-4">
              <div className="input-group">
                <label>Executora</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7.1c-1.71 0-3.1-1.39-3.1-3.1zM8 11.25h8M12.9 12c0-1.71 1.39-3.1 3.1-3.1h4v-1.9h-4a5 5 0 0 0 0 10h4v-1.9h-4c-1.71 0-3.1-1.39-3.1-3.1z"></path></svg>
                  <input type="text" placeholder="Executora" />
                </div>
              </div>
              <div className="input-group">
                <label>Contato</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Contato" />
                </div>
              </div>
              <div className="input-group">
                <label>Telefone</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <input type="text" placeholder="Telefone" />
                </div>
              </div>
              <div className="input-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  <input type="email" placeholder="Email" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 05 - Dados Financeiros */}
        <div className={`card ${expandedCards.card5 ? 'expanded' : 'collapsed'}`}>
          <div className="card-header" onClick={() => toggleCard('card5')}>
            <div className="header-content">
              <div className="badge">05</div>
              <h4 className="title">Dados Financeiros</h4>
            </div>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div className="card-content">
            <div className="section-label">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              Valor Proposta
            </div>
            <div className="grid grid-3">
              <div className="input-group">
                <label>Pré-executivo</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="R$ 0,00" />
                </div>
              </div>
              <div className="input-group">
                <label>Projeto executivo</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="R$ 0,00" />
                </div>
              </div>
              <div className="input-group">
                <label>Liberado Obra</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="R$ 0,00" />
                </div>
              </div>
            </div>
            <div className="grid grid-2">
              <div className="input-group">
                <label>Condições</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"></path></svg>
                  <input type="text" placeholder="Condições" />
                </div>
              </div>
              <div className="input-group">
                <label>Observação</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Observação" />
                </div>
              </div>
            </div>
            <div className="grid grid-3">
              <div className="input-group">
                <label>Retenção (%)</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 21 21 21 8"></polyline><line x1="3" y1="3" x2="21" y2="21"></line><polyline points="21 3 21 8 16 8"></polyline></svg>
                  <input type="text" placeholder="0%" />
                </div>
              </div>
              <div className="input-group">
                <label>Contrato</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Contrato" />
                </div>
              </div>
              <div className="input-group">
                <label>ART</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.75a4 4 0 0 0 4.12-2.36l.5-1a2 2 0 0 1 3.06 0l.5 1a4 4 0 0 0 4.12 2.36l1.1.1a2 2 0 0 1 1.82 2.18l-.1 1.1a4 4 0 0 0 2.36 4.12l1 .5a2 2 0 0 1 0 3.06l-1 .5a4 4 0 0 0-2.36 4.12l.1 1.1a2 2 0 0 1-2.18 1.82l-1.1-.1a4 4 0 0 0-4.12 2.36l-.5 1a2 2 0 0 1-3.06 0l-.5-1a4 4 0 0 0-4.12-2.36l-1.1.1a2 2 0 0 1-1.82-2.18l.1-1.1a4 4 0 0 0-2.36-4.12l-1-.5a2 2 0 0 1 0-3.06l1-.5a4 4 0 0 0 2.36-4.12l-.1-1.1a2 2 0 0 1 2.18-1.82l1.1.1z"></path><polyline points="12 9 15.591 12.591 22 6"></polyline></svg>
                  <input type="text" placeholder="ART" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 06 - Fases do Projeto */}
        <div className={`card ${expandedCards.card6 ? 'expanded' : 'collapsed'}`}>
          <div className="card-header" onClick={() => toggleCard('card6')}>
            <div className="header-content">
              <div className="badge">06</div>
              <h4 className="title">Fases do Projeto</h4>
            </div>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div className="card-content">
            <div className="fases-container">
              <div className="fase-item">
                <div className="dot"></div>
                <span>Pré-executivo</span>
              </div>
              <div className="fase-item">
                <div className="dot"></div>
                <span>Projeto executivo</span>
              </div>
              <div className="fase-item">
                <div className="dot"></div>
                <span>Liberado para a Obra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 07 - Setor de Projetos */}
        <div className={`card ${expandedCards.card7 ? 'expanded' : 'collapsed'}`}>
          <div className="card-header" onClick={() => toggleCard('card7')}>
            <div className="header-content">
              <div className="badge">07</div>
              <h4 className="title">Setor de Projetos</h4>
            </div>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div className="card-content">
            <div className="grid grid-3">
              <div className="input-group">
                <label>Status Pré</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Status Pré" />
                </div>
              </div>
              <div className="input-group">
                <label>Status Exec</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Status Exec" />
                </div>
              </div>
              <div className="input-group">
                <label>Status Lib</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Status Lib" />
                </div>
              </div>
            </div>
            <div className="grid grid-3">
              <div className="input-group">
                <label>Certificação</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Certificação" />
                </div>
              </div>
              <div className="input-group">
                <label>Tipo</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Tipo" />
                </div>
              </div>
              <div className="input-group">
                <label>Arquivos</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7.1c-1.71 0-3.1-1.39-3.1-3.1zM8 11.25h8M12.9 12c0-1.71 1.39-3.1 3.1-3.1h4v-1.9h-4a5 5 0 0 0 0 10h4v-1.9h-4c-1.71 0-3.1-1.39-3.1-3.1z"></path></svg>
                  <input type="text" placeholder="Arquivos" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 08 - Faturamento */}
        <div className={`card ${expandedCards.card8 ? 'expanded' : 'collapsed'}`}>
          <div className="card-header" onClick={() => toggleCard('card8')}>
            <div className="header-content">
              <div className="badge">08</div>
              <h4 className="title">Faturamento</h4>
            </div>
            <div className="header-actions">
              <button type="button" className="copy-btn" onClick={handleCopyData}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                Copiar Dados do Cliente
              </button>
              <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
          <div className="card-content">
            <div className="grid grid-3">
              <div className="input-group">
                <label>CNPJ / CPF</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  <input type="text" placeholder="CNPJ / CPF" />
                  <button type="button" className="search-btn" onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg></button>
                </div>
              </div>
              <div className="input-group col-span-2">
                <label>Razão Social / Nome</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <input type="text" placeholder="Razão Social / Nome" />
                </div>
              </div>
            </div>
            <div className="grid grid-3">
              <div className="input-group">
                <label>CEP</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <input type="text" placeholder="CEP" />
                  <button type="button" className="search-btn" onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg></button>
                </div>
              </div>
              <div className="input-group">
                <label>Endereço</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Endereço" />
                </div>
              </div>
              <div className="input-group">
                <label>Bairro</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Bairro" />
                </div>
              </div>
            </div>
            <div className="grid grid-4">
              <div className="input-group">
                <label>Cidade</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Cidade" />
                </div>
              </div>
              <div className="input-group">
                <label>Telefone</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <input type="text" placeholder="Telefone" />
                </div>
              </div>
              <div className="input-group">
                <label>E-mail</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  <input type="email" placeholder="E-mail" />
                </div>
              </div>
              <div className="input-group">
                <label>IE / RG</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="IE / RG" />
                </div>
              </div>
            </div>
            
            <div className="section-label border-top pt-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Contatos de Faturamento
            </div>
            <div className="grid grid-3">
              <div className="input-group">
                <label>Tipo</label>
                <div className="input-wrapper">
                  <select>
                    <option>Selecione...</option>
                    <option>Financeiro</option>
                    <option>Compras</option>
                    <option>Diretoria</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  <input type="email" placeholder="Email" />
                </div>
              </div>
              <div className="input-group">
                <label>Telefone</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <input type="text" placeholder="Telefone" />
                </div>
              </div>
            </div>

            <div className="section-label border-top pt-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><path d="M16 8h7v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"></path></svg>
              Recepção das NFs
            </div>
            <div className="grid grid-3">
              <div className="input-group">
                <label>Nome</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="21 8 21 21 15 21 15 8 9 8"></polyline></svg>
                  <input type="text" placeholder="Nome" />
                </div>
              </div>
              <div className="input-group">
                <label>Telefone</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <input type="text" placeholder="Telefone" />
                </div>
              </div>
              <div className="input-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  <input type="email" placeholder="Email" />
                </div>
              </div>
            </div>
            <div className="grid grid-2">
              <div className="input-group">
                <label>Data Recepção NF</label>
                <div className="input-wrapper">
                  <input type="date" />
                </div>
              </div>
              <div className="input-group">
                <label>Data Pagamento NF</label>
                <div className="input-wrapper">
                  <input type="date" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 09 - Observações */}
        <div className={`card ${expandedCards.card9 ? 'expanded' : 'collapsed'}`}>
          <div className="card-header" onClick={() => toggleCard('card9')}>
            <div className="header-content">
              <div className="badge">09</div>
              <h4 className="title">Observações</h4>
            </div>
            <svg className="chevron" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div className="card-content">
            <div className="input-group">
              <label>Gerais</label>
              <div className="input-wrapper">
                <textarea rows="4" placeholder="Observações gerais..."></textarea>
              </div>
            </div>
            <div className="grid grid-3">
              <div className="input-group">
                <label>Certificação</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Certificação" />
                </div>
              </div>
              <div className="input-group">
                <label>ART</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="ART" />
                </div>
              </div>
              <div className="input-group">
                <label>Retenção</label>
                <div className="input-wrapper">
                  <input type="text" placeholder="Retenção" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Registrar Startup Completo
          </button>
        </div>
      </form>
    </div>
  );
}