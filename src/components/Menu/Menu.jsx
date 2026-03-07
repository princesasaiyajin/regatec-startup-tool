import './Menu.css';
import { 
  Building2, Users, Briefcase, Settings, 
  HardHat, GanttChartSquare, Hammer, Phone,
  Activity, ClipboardCheck, PlusSquare, Share2, LogOut 
} from 'lucide-react';

function Menu({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-box">
          <Building2 size={24} color="#34d399" />
        </div>
        <div className="sidebar-title">
          <span className="brand">REGATEC</span>
          <span className="subtitle">STARTUP TOOL</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        
        <p className="nav-section-title">DADOS CADASTRAIS</p>
        <ul>
          <li className={activeTab === 'logins' ? 'active' : ''} onClick={() => setActiveTab('logins')}>
            <Users size={18} /> Logins de Acesso
          </li>
          <li onClick={() => setActiveTab('vendedor')} ><Briefcase size={18} /> Vendedor</li>
          <li onClick={() => setActiveTab('projetistas')}><Settings size={18} /> Projetistas</li>
          <li onClick={() => setActiveTab('dados-obra')}><HardHat size={18} /> Dados da Obra</li>
          <li onClick={() => setActiveTab('fases-projeto')}><GanttChartSquare size={18} /> Fases do Projeto</li>
          <li onClick={() => setActiveTab('fases-obra')}><Hammer size={18} /> Fases da Obra</li>
          <li onClick={() => setActiveTab('tipos-contato')}><Phone size={18} /> Tipo do Contato</li>
        </ul>
        
        <div className="nav-section-group">
           <p className="nav-section-title section-operacional">
             <Activity size={16} style={{marginRight: '8px'}} /> OPERACIONAL
           </p>
           <ul>
        <li 
    className={activeTab === 'startup' ? 'active' : ''} 
    onClick={() => setActiveTab('startup')}
  >
    <ClipboardCheck size={18} /> Startup Inicial
  </li>
  
  <li 
    className={activeTab === 'aditivos' ? 'active' : ''} 
    onClick={() => setActiveTab('aditivos')}
  >
    <PlusSquare size={18} /> Aditivos
  </li>
  
  <li 
    className={activeTab === 'workflow' ? 'active' : ''} 
    onClick={() => setActiveTab('workflow')}
  >
    <Share2 size={18} /> Workflow
  </li>
           </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">RG</div>
          <div className="user-details">
            <p className="user-name">EQUIPE REGATEC</p>
            <p className="user-role">MASTER ADMIN</p>
          </div>
        </div>
        <button className="btn-logout">
          <LogOut size={16} /> SAIR
        </button>
      </div>
    </aside>
  );
}

export default Menu;