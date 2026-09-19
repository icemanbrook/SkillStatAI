import { useState, useEffect } from 'react';
import SpotlightCallout from './SpotlightCallout';
import SkylineHero from './SkylineHero';
import QueryBox from './QueryBox';
import LastUpdated from './LastUpdated';
import DashboardSkeleton from './DashboardSkeleton';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, UserCog, Building2, TrendingUp, TrendingDown, GitCompare } from 'lucide-react';
import { getDepartments, getOrgStats, getOrgAvgGap } from '../data/orgData';
import AnimatedNumber from './AnimatedNumber';

const TILE_COLORS = ['#1B4332', '#B5651D', '#7B2D3E', '#264653', '#5C4B99', '#1D5C63'];

function badgeStyle(gap) {
  if (gap >= 40) return { color: '#B23A2E', bg: '#FCEDEB' };
  if (gap >= 25) return { color: '#A56B1F', bg: '#FBF3E7' };
  return { color: '#1B4332', bg: '#E7F0EA' };
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white border border-[#EDEBE6] rounded-2xl px-5 py-4 flex-1 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-[#F4F3EF] flex items-center justify-center shrink-0">
        <Icon size={18} className="text-[#14140F]" />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-[#14140F] tabular-nums leading-none">
          <AnimatedNumber value={value} />
        </p>
        <p className="text-sm text-[#5B5850] mt-1">{label}</p>
      </div>
    </div>
  );
}

function TrendBadge({ diff }) {
  if (diff === 0) return <span className="text-xs text-white/70">On par with average</span>;
  const isWorse = diff > 0;
  const Icon = isWorse ? TrendingUp : TrendingDown;
  return (
    <span className="flex items-center gap-1 text-xs font-medium text-white/85">
      <Icon size={12} /> {Math.abs(diff)}% {isWorse ? 'above' : 'below'} average
    </span>
  );
}

function AdminDashboard() {
  const stats = getOrgStats();
  const orgAvg = getOrgAvgGap();
  const naturalOrderDepartments = getDepartments(); // unsorted, for the skyline visual
  const departments = [...getDepartments()].sort((a, b) => b.avgSkillGap - a.avgSkillGap);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="px-8 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-[#14140F] mb-1">Organisation overview.</h1>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#5B5850]">Organisation-wide competency snapshot</p>
        <LastUpdated />
      </div>

      <QueryBox />

      <SkylineHero departments={naturalOrderDepartments} />

      <div className="flex gap-3 mb-12">
        <StatCard icon={Users} label="Total employees" value={stats.totalEmployees} />
        <StatCard icon={UserCog} label="Total managers" value={stats.totalManagers} />
        <StatCard icon={Building2} label="Total departments" value={stats.totalDepartments} />
      </div>

      <SpotlightCallout departments={departments} orgAvg={orgAvg} />

      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-bold text-[#14140F]">Shop by department</h2>
        <Link to="/admin/compare" className="flex items-center gap-1.5 text-sm font-medium text-[#14140F] hover:underline">
          <GitCompare size={14} /> Compare
        </Link>
      </div>
      <p className="text-sm text-[#5B5850] mb-5">
        Sorted by highest skill gap &middot; org average is {orgAvg}%
      </p>

      <div className="grid grid-cols-3 gap-4">
        {departments.map((dept, i) => {
          const diff = dept.avgSkillGap - orgAvg;
          const badge = badgeStyle(dept.avgSkillGap);
          return (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
            >
              <Link
                to={`/admin/department/${dept.id}`}
                className="block rounded-2xl p-5 h-40 relative overflow-hidden group"
                style={{ backgroundColor: TILE_COLORS[i % TILE_COLORS.length] }}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-white font-extrabold text-lg leading-tight">
                    {dept.name}
                  </p>
                  <span
                    className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ color: badge.color, backgroundColor: badge.bg }}
                  >
                    {dept.avgSkillGap}%
                  </span>
                </div>
                <div className="absolute bottom-4 left-5">
                  <TrendBadge diff={diff} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;