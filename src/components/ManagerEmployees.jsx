import { useParams, Link } from 'react-router-dom';
import { getManagerById, getDepartmentById, getEmployeesByManager } from '../data/orgData';
import EmployeeList from './EmployeeList';
import Breadcrumbs from './Breadcrumbs';

function ManagerEmployees() {
  const { managerId } = useParams();
  const manager = getManagerById(managerId);
  const teamEmployees = getEmployeesByManager(managerId);

  if (!manager) {
    return (
      <div className="px-8 py-10 max-w-2xl mx-auto">
        <p className="text-[#5B5850]">Manager not found.</p>
        <Link to="/admin" className="text-[#14140F] font-medium text-sm hover:underline">Back to admin</Link>
      </div>
    );
  }

  const dept = getDepartmentById(manager.departmentId);

  return (
    <div className="px-8 py-10 max-w-2xl mx-auto">
      <Breadcrumbs trail={[
        { label: 'Admin', to: '/admin' },
        { label: dept?.name || 'Department', to: `/admin/department/${manager.departmentId}` },
        { label: manager.name, to: `/admin/manager/${manager.id}` },
        { label: 'Employees' },
      ]} />
      <h1 className="text-3xl font-extrabold text-[#14140F]">Employees under {manager.name}</h1>
      <p className="text-sm text-[#5B5850] mb-6">{teamEmployees.length} people</p>
      <EmployeeList employees={teamEmployees} linkBase="/admin/employee" />
    </div>
  );
}

export default ManagerEmployees;