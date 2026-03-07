import React, { useState } from 'react';
import { Edit3, Trash2, User } from 'lucide-react'; 
import './TiposDeContato.css'; 

function TiposDeContato() {
  const [setor, setSetor] = useState('');
  const [departamentos, setDepartamentos] = useState([
    { id: 1, nome: 'Financeiro' },
    { id: 2, nome: 'Compras' }
  ]);

  const handleRegistrar = (e) => {
    e.preventDefault();
    if (!setor.trim()) return;

    const novoDepto = {
      id: Date.now(),
      nome: setor
    };

    setDepartamentos([...departamentos, novoDepto]);
    setSetor(''); 
  };

  return (
    <div className="tipos-contato-page">
      <header className="content-header">
        <h1>TIPOS DE CONTATO</h1>
      </header>

      <div className="content-area-tipos">
        <section className="form-container">
          <div className="card-registro">
            <h3>NOVO DEPARTAMENTO</h3>
            <form onSubmit={handleRegistrar}>
              <div className="input-group">
                <label>SETOR</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Digite o setor"
                    value={setor}
                    onChange={(e) => setSetor(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn-registrar">
                REGISTRAR
              </button>
            </form>
          </div>
        </section>

        <section className="list-container">
          <div className="card-lista">
            <div className="table-header">
              <span>DEPARTAMENTO</span>
              <span>AÇÕES</span>
            </div>
            <div className="table-body">
              {departamentos.map((depto) => (
                <div key={depto.id} className="table-row">
                  <span className="depto-name">{depto.nome}</span>
                  <div className="actions">
                    <Edit3 size={18} className="icon-edit" />
                    <Trash2 
                      size={18} 
                      className="icon-delete" 
                      onClick={() => setDepartamentos(departamentos.filter(d => d.id !== depto.id))}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TiposDeContato;