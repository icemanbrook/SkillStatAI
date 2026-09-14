import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip,
} from 'recharts';
import { getEmployeeById, getManagerById, getDepartmentById, overallGap, getOrgAvgGap } from '../data/orgData';
import { generateInsight } from '../data/insights';
import Breadcrumbs from './Breadcrumbs';
import SeverityBadge from './SeverityBadge';
import InsightBanner from './InsightBanner';
import RecommendationCard from './RecommendationCard';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { domain, value } = payload[0].payload;
  return (
    <div className="bg-[#14140F] text-white text-xs px-3 py-2 rounded-lg shadow-lg">
      <p className="font-medium">{domain}</p>
      <p className="text-white/70">{value}% gap</p>
    </div>
  );
}

function EmployeeDetails({ backTo = '/manager' }) {
  const { employeeId } = useParams();
  const employee = getEmployeeById(employeeId);

  if (!employee) {
    return (
      <div className="px-8 py-10 max-w-2xl mx-auto">
        <p className="text-[#5B5850]">Employee not found.</p>
        <Link to={backTo} className="text-[#14140F] font-medium text-sm hover:underline">Back</Link>
      </div>
    );
  }

  const manager = getManagerById(employee.managerId);
  const dept = manager ? getDepartmentById(manager.departmentId) : null;
  const isManagerSide = backTo.startsWith('/manager');
  const orgAvg = getOrgAvgGap();
  const empGap = overallGap(employee);

  const breakdown = [
    { skill: 'Technical', gapPercent: employee.skillGaps.technical },
    { skill: 'Communication', gapPercent: employee.skillGaps.communication },
    { skill: 'Problem solving', gapPercent: employee.skillGaps.problemSolving },
    { skill: 'Leadership', gapPercent: employee.skillGaps.leadership },
  ];

  const insightText = generateInsight(employee.name, empGap, breakdown, orgAvg);

  const radarData = breakdown.map((b) => ({ domain: b.skill, value: b.gapPercent }));

  const trail = isManagerSide
    ? [{ label: 'Your stats', to: '/manager' }, { label: 'My employees', to: '/manager/employees' }, { label: employee.name }]
    : [
        { label: 'Admin', to: '/admin' },
        { label: dept?.name || 'Department', to: manager ? `/admin/department/${manager.departmentId}` : '/admin' },
        { label: manager?.name || 'Manager', to: manager ? `/admin/manager/${manager.id}` : '/admin' },
        { label: 'Employees', to: manager ? `/admin/manager/${manager.id}/employees` : '/admin' },
        { label: employee.name },
      ];

  return (
    <div className="px-8 py-10 max-w-2xl mx-auto">
      <Breadcrumbs trail={trail} />

      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-extrabold text-[#14140F]">{employee.name}</h1>
        <SeverityBadge gap={empGap} />
      </div>
      <p className="text-sm text-[#5B5850] mb-6">{empGap}% overall skill gap</p>

      <InsightBanner text={insightText} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-[#EDEBE6] rounded-2xl p-4 mb-4"
        style={{ height: 320 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid stroke="#EDEBE6" />
            <PolarAngleAxis dataKey="domain" tick={{ fill: '#5B5850', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#A8A59C', fontSize: 10 }} axisLine={false} />
            <Radar dataKey="value" stroke="#14140F" fill="#14140F" fillOpacity={0.12} strokeWidth={2} animationDuration={600} />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      <RecommendationCard breakdown={breakdown} id={employee.id} />
    </div>
  );
}

export default EmployeeDetails;