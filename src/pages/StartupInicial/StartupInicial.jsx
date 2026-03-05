import React, { useState } from 'react';
import './StartupInicial.css';
import StartupProjeto from './../StartupProjetos/StartupProjeto';
import { FileText, HardHat } from 'lucide-react';


function StartupInicial() {
  const [view, setView] = useState('cards'); 

  return (
    <div className="content-area">
      <header className="content-header">
        <h1>STARTUP INICIAL</h1>
      </header>

      
      {view === 'cards' && (
        <div className="startup-cards-container">
          <div className="startup-card-option" onClick={() => setView('projeto')}>
            <div className="card-icon-wrapper">
              <FileText size={40} color="#10b981" />
            </div>
            <div className="card-text">
              <h3>STARTUP DE</h3>
              <h2>PROJETO</h2>
            </div>
          </div>

          <div className="startup-card-option" onClick={() => setView('obra')}>
            <div className="card-icon-wrapper">
              <HardHat size={40} color="#10b981" />
            </div>
            <div className="card-text">
              <h3>STARTUP DE</h3>
              <h2>OBRA</h2>
            </div>
          </div>
        </div>
      )}

      {view === 'projeto' && (
        <StartupProjeto onVoltar={() => setView('cards')} />
      )}
      
      {view === 'obra' && (
        <div><h2>Formulário de Obra (Em breve)</h2><button onClick={() => setView('cards')}>Voltar</button></div>
      )}
    </div>
  );
}

export default StartupInicial;