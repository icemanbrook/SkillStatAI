import { useNavigate, Navigate } from 'react-router-dom';
import { LogOut, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { skillGapBreakdown, overallGap } from '../data/orgData';
import SkillGapChart from './SkillGapChart';

function ManagerDashboard() {
  const { currentManager, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentManager) return <Navigate to="/login" replace />;

  const breakdown = skillGapBreakdown(currentManager);

  return (
    <div className="px-8 py-10 max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-1">
        <div>
          <p className="text-sm text-[#6B6B6F] mb-1">
            {currentManager.departmentId.replace('-', ' ')}
          </p>
          <h1 className="text-2xl font-semibold text-[#1C1C1E]">
            Welcome, {currentManager.name}
          </h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-sm text-[#6B6B6F] hover:text-[#C1443A] transition-colors mt-1"
        >
          <LogOut size={14} /> Log out
        </button>
      </div>
      <p className="text-sm text-[#6B6B6F] mb-8">{overallGap(currentManager)}% overall skill gap</p>

      <h2 className="text-sm font-medium text-[#1C1C1E] mb-3">Your skill gap statistics</h2>
      <div className="mb-6">
        <SkillGapChart data={breakdown} />
      </div>

      <button
        onClick={() => navigate('/manager/employees')}
        className="flex items-center gap-2 bg-[#1F3A5F] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#16293F] transition-colors"
      >
        View my employees <ArrowRight size={15} />
      </button>
    </div>
  );
}

export default ManagerDashboard;