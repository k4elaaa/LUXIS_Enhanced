export type EmployeeRecord = {
  id: string;
  name: string;
  role?: string;
  attendance?: string;
  performance?: number;
  jobs?: number;
  onTime?: string;
  tasks?: any[];
  phone?: string;
  email?: string;
  address?: string;
  joined?: string;
  availability?: string[] | string;
  status?: string;
  nbiUrl?: string | null;
};

const initialEmployees: EmployeeRecord[] = [
  { id: "ST-2001", name: "Liza Mendoza", role: "Senior Cleaner", attendance: "98%", performance: 4.9, jobs: 124, onTime: "96%", tasks: [] },
  { id: "ST-2002", name: "Jose Villanueva", role: "Team Lead", attendance: "100%", performance: 4.8, jobs: 156, onTime: "98%", tasks: [] },
  { id: "ST-2003", name: "Maricel Bautista", role: "Specialist", attendance: "97%", performance: 5.0, jobs: 98, onTime: "100%", tasks: [] },
  { id: "ST-2004", name: "Ramon Castillo", role: "Cleaner", attendance: "95%", performance: 4.7, jobs: 87, onTime: "94%", tasks: [] },
  { id: "ST-2005", name: "Sofia Ramirez", role: "Senior Cleaner", attendance: "99%", performance: 4.9, jobs: 142, onTime: "97%", tasks: [] },
  { id: "ST-2006", name: "Paolo Navarro", role: "Team Lead", attendance: "100%", performance: 4.8, jobs: 167, onTime: "99%", tasks: [] },
];

const employees: EmployeeRecord[] = [...initialEmployees];

export function getAllEmployees() {
  return employees;
}

export function getEmployeeById(id: string) {
  return employees.find(e => e.id === id) || null;
}

export function addEmployee(emp: EmployeeRecord) {
  employees.push(emp);
}

export function setEmployeeNbiUrl(id: string, url: string | null) {
  const e = employees.find(x => x.id === id);
  if (e) e.nbiUrl = url;
}

export default { getAllEmployees, getEmployeeById, addEmployee, setEmployeeNbiUrl };
