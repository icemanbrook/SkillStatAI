import { useParams, Link, useNavigate } from 'react-router-dom';
import { getManagerById, getDepartmentById, skillGapBreakdown, overallGap, getOrgAvgGap } from '../data/orgData';
import { generateInsight } from '../data/insights';
import SkillGapChart from './SkillGapChart';
import Breadcrumbs from './Breadcrumbs';
import InsightBanner from './InsightBanner';
import SeverityBadge from './SeverityBadge';
import RecommendationCard from './RecommendationCard';

function ManagerDetails() {
  const { managerId } = useParams();
  const navigate = useNavigate();
  const manager = getManagerById(managerId);

  if (!manager) {
    return (
      <div className="px-8 py-10 max-w-2xl mx-auto">
        <p className="text-[#5B5850]">Manager not found.</p>
        <Link to="/admin" className="text-[#14140F] font-medium text-sm hover:underline">Back to admin</Link>
      </div>
    );
  }

  const dept = getDepartmentById(manager.departmentId);
  const breakdown = skillGapBreakdown(manager);
  const orgAvg = getOrgAvgGap();
  const mgrGap = overallGap(manager);
  const insightText = generateInsight(manager.name, mgrGap, breakdown, orgAvg);

  return (
    <div className="px-8 py-10 max-w-2xl mx-auto">
      <Breadcrumbs trail={[
        { label: 'Admin', to: '/admin' },
        { label: dept?.name || 'Department', to: `/admin/department/${manager.departmentId}` },
        { label: manager.name },
      ]} />

      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-extrabold text-[#14140F]">{manager.name}</h1>
        <SeverityBadge gap={mgrGap} />
      </div>
      <p className="text-sm text-[#5B5850] mb-6">{mgrGap}% overall gap</p>

      <InsightBanner text={insightText} />

      <h2 className="text-lg font-bold text-[#14140F] mb-3">Skill gap statistics</h2>
      <div className="mb-4">
        <SkillGapChart data={breakdown} />
      </div>
      <div className="mb-8">
        <RecommendationCard breakdown={breakdown} id={manager.id} />
      </div>

      <button
        onClick={() => navigate(`/admin/manager/${manager.id}/employees`)}
        className="bg-[#14140F] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#2B2A24] transition-colors"
      >
        View employees
      </button>
    </div>
  );
}

export default ManagerDetails;