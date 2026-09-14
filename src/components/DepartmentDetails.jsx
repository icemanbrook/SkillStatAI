import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getDepartmentById, getManagersByDepartment, getEmployeesByDepartment, skillGapBreakdown, getOrgAvgGap,
} from '../data/orgData';
import { generateInsight } from '../data/insights';
import SkillGapChart from './SkillGapChart';
import Breadcrumbs from './Breadcrumbs';
import InsightBanner from './InsightBanner';
import SeverityBadge from './SeverityBadge';
import RecommendationCard from './RecommendationCard';

function DepartmentDetails() {
  const { departmentId } = useParams();
  const navigate = useNavigate();

  const dept = getDepartmentById(departmentId);
  const deptManagers = getManagersByDepartment(departmentId);
  const deptEmployees = getEmployeesByDepartment(departmentId);
  const orgAvg = getOrgAvgGap();

  if (!dept) {
    return (
      <div className="px-8 py-10 max-w-2xl mx-auto">
        <p className="text-[#5B5850]">Department not found.</p>
        <Link to="/admin" className="text-[#14140F] font-medium text-sm hover:underline">Back to admin</Link>
      </div>
    );
  }

  const everyone = [...deptEmployees, ...deptManagers];
  const categoryAvg = (key) => {
    if (!everyone.length) return 0;
    return Math.round(everyone.reduce((sum, p) => sum + p.skillGaps[key], 0) / everyone.length);
  };
  const breakdown = [
    { skill: "Technical skills", gapPercent: categoryAvg("technical") },
    { skill: "Communication", gapPercent: categoryAvg("communication") },
    { skill: "Problem solving", gapPercent: categoryAvg("problemSolving") },
    { skill: "Leadership", gapPercent: categoryAvg("leadership") },
  ];

  const diff = dept.avgSkillGap - orgAvg;
  const insightText = generateInsight(dept.name, dept.avgSkillGap, breakdown, orgAvg);

  return (
    <div className="px-8 py-10 max-w-2xl mx-auto">
      <Breadcrumbs trail={[{ label: 'Admin', to: '/admin' }, { label: dept.name }]} />

      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-extrabold text-[#14140F]">{dept.name}</h1>
        <SeverityBadge gap={dept.avgSkillGap} />
      </div>

      <p className="text-sm text-[#5B5850] mb-1">{dept.avgSkillGap}% overall average gap</p>
      <p className="text-sm font-medium mb-6" style={{ color: diff > 0 ? '#B23A2E' : diff < 0 ? '#1B4332' : '#A8A59C' }}>
        {diff === 0 ? 'On par with organisation average' : `${Math.abs(diff)}% ${diff > 0 ? 'above' : 'below'} organisation average (${orgAvg}%)`}
      </p>

      <InsightBanner text={insightText} />

      <h2 className="text-lg font-bold text-[#14140F] mb-3">Skill gap statistics</h2>
      <div className="mb-4">
        <SkillGapChart data={breakdown} />
      </div>
      <div className="mb-8">
        <RecommendationCard breakdown={breakdown} id={dept.id} />
      </div>

      {deptManagers.length > 1 ? (
        <>
          <h2 className="text-lg font-bold text-[#14140F] mb-3">Managers</h2>
          <div className="bg-white border border-[#EDEBE6] rounded-2xl divide-y divide-[#EDEBE6] overflow-hidden">
            {deptManagers.map((mgr) => (
              <button
                key={mgr.id}
                onClick={() => navigate(`/admin/manager/${mgr.id}`)}
                className="w-full text-left px-5 py-3.5 text-sm font-medium text-[#14140F] hover:bg-[#FAFAF8] transition-colors"
              >
                {mgr.name}
              </button>
            ))}
          </div>
        </>
      ) : deptManagers.length === 1 ? (
        <SingleManagerBlock manager={deptManagers[0]} navigate={navigate} />
      ) : (
        <div className="bg-white border border-[#EDEBE6] rounded-2xl p-6 text-sm text-[#5B5850] text-center">
          No manager assigned to this department yet.
        </div>
      )}
    </div>
  );
}

function SingleManagerBlock({ manager, navigate }) {
  const breakdown = skillGapBreakdown(manager);
  return (
    <>
      <h2 className="text-lg font-bold text-[#14140F] mb-3">Manager</h2>
      <p className="text-sm font-medium text-[#14140F] mb-2">{manager.name}</p>
      <SkillGapChart data={breakdown} height={190} />
      <button
        onClick={() => navigate(`/admin/manager/${manager.id}/employees`)}
        className="mt-4 bg-[#14140F] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#2B2A24] transition-colors"
      >
        View employees
      </button>
    </>
  );
}

export default DepartmentDetails;