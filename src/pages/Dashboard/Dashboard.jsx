import React from 'react';
import './Dashboard.css';
import { Activity, PlusCircle, Clock } from 'lucide-react';

function Dashboard() {
  return (
    <div className="content-area">
      <header className="content-header">
        <div>
          <h1>DASHBOARD</h1>
          <p>Visão geral da operação Regatec.</p>
        </div>
      </header>

      <div className="dashboard-cards">
        <div className="card">
          <Activity size={32} color="#10b981" />
          <div className="card-info">
            <span>STARTUPS ATIVOS</span>
            <h2>12</h2>
          </div>
        </div>

        <div className="card">
          <PlusCircle size={32} color="#3b82f6" />
          <div className="card-info">
            <span>ADITIVOS</span>
            <h2>05</h2>
          </div>
        </div>

        <div className="card">
          <Clock size={32} color="#f59e0b" />
          <div className="card-info">
            <span>PENDÊNCIAS</span>
            <h2>08</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;