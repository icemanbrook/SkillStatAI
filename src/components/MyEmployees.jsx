import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEmployeesByManager } from '../data/orgData';
import EmployeeList from './EmployeeList';
import Breadcrumbs from './Breadcrumbs';

function MyEmployees() {
  const { currentManager } = useAuth();
  if (!currentManager) return <Navigate to="/login" replace />;

  const myEmployees = getEmployeesByManager(currentManager.id);

  return (
    <div className="px-8 py-10 max-w-2xl mx-auto">
      <Breadcrumbs trail={[{ label: 'Your stats', to: '/manager' }, { label: 'My employees' }]} />
      <h1 className="text-3xl font-extrabold text-[#14140F]">My employees</h1>
      <p className="text-sm text-[#5B5850] mb-6">{myEmployees.length} people report to you</p>
      <EmployeeList employees={myEmployees} linkBase="/manager/employee" />
    </div>
  );
}

export default MyEmployees;