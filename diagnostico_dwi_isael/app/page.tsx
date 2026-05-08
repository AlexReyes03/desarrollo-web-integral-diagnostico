import EmployeesManager from './components/EmployeesManager';
import { getEmployees } from './actions';

export default async function Home() {
  const employees = await getEmployees();
  return <EmployeesManager employees={employees} />;
}
