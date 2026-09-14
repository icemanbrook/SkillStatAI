import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getDepartments, getEmployeesByDepartment, getManagersByDepartment } from '../data/orgData';

const PALETTE = ['#1F3A5F', '#B8842E', '#2E7D5B'];

function categoryAvgFor(deptId) {
  const everyone = [...getEmployeesByDepartment(deptId), ...getManagersByDepartment(deptId)];
  const avg = (key) => {
    if (!everyone.length) return 0;
    return Math.round(everyone.reduce((sum, p) => sum + p.skillGaps[key], 0) / everyone.length);
  };
  return {
    technical: avg('technical'),
    communication: avg('communication'),
    problemSolving: avg('problemSolving'),
    leadership: avg('leadership'),
  };
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1C1C1E] text-white text-xs px-3 py-2 rounded-lg shadow-lg">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.fill }}>{p.dataKey}: {p.value}%</p>
      ))}
    </div>
  );
}

function DepartmentComparison() {
  const departments = getDepartments();
  const [selected, setSelected] = useState([]);

  function toggle(id) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  const selectedDepts = departments.filter((d) => selected.includes(d.id));

  const chartData = ['technical', 'communication', 'problemSolving', 'leadership'].map((key) => {
    const row = {
      skill: { technical: 'Technical', communication: 'Communication', problemSolving: 'Problem solving', leadership: 'Leadership' }[key],
    };
    selectedDepts.forEach((d) => {
      row[d.name] = categoryAvgFor(d.id)[key];
    });
    return row;
  });

  return (
    <div className="px-8 py-10 max-w-3xl mx-auto">
      <Link to="/admin" className="flex items-center gap-1.5 text-sm text-[#1F3A5F] hover:underline w-fit">
        <ArrowLeft size={14} /> Department heatmap
      </Link>
      <h1 className="text-2xl font-semibold text-[#1C1C1E] mt-3 mb-1">Compare departments</h1>
      <p className="text-sm text-[#6B6B6F] mb-6">Select up to 3 departments to compare side by side</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {departments.map((dept) => {
          const isOn = selected.includes(dept.id);
          return (
            <button
              key={dept.id}
              onClick={() => toggle(dept.id)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                isOn ? 'bg-[#1F3A5F] text-white border-[#1F3A5F]' : 'bg-white text-[#4B4B4E] border-[#E7E5E2] hover:border-[#1F3A5F]/40'
              }`}
            >
              {dept.name}
            </button>
          );
        })}
      </div>

      {selectedDepts.length === 0 ? (
        <div className="bg-white border border-[#E7E5E2] rounded-[12px] p-10 text-center text-sm text-[#6B6B6F]">
          Select at least one department above to see its skill gap breakdown.
        </div>
      ) : (
        <div className="bg-white border border-[#E7E5E2] rounded-[12px] p-5">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#F0EEEB" />
              <XAxis dataKey="skill" tick={{ fill: '#4B4B4E', fontSize: 12 }} axisLine={{ stroke: '#E7E5E2' }} tickLine={false} />
              <YAxis domain={[0, 100]} unit="%" tick={{ fill: '#9B9B9E', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#FAFAF9' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {selectedDepts.map((d, i) => (
                <Bar key={d.id} dataKey={d.name} fill={PALETTE[i]} radius={[4, 4, 0, 0]} maxBarSize={40} animationDuration={600} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default DepartmentComparison;