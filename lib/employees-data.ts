export interface EmployeeDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  role: "ADMIN" | "MANAGER" | "MEMBER";
  joinedDate: string;
  salary: string;
  address: string;
  projects: string[]; // Project IDs or Titles
  imageUrl: string | null;
}

export const extendedEmployees: EmployeeDetail[] = [
  {
    id: "sample-user-1",
    name: "Mohit Patil",
    email: "mohit@company.com",
    phone: "+91 98765 43210",
    department: "Engineering",
    position: "Senior Lead",
    role: "ADMIN",
    joinedDate: "2023-01-15",
    salary: "₹18,00,000",
    address: "Bandra West, Mumbai, Maharashtra",
    projects: ["Internal Task Manager Rollout", "Infrastructure Hardening"],
    imageUrl: null,
  },
  {
    id: "sample-user-2",
    name: "Arjun Mehta",
    email: "arjun@company.com",
    phone: "+91 98765 43211",
    department: "Engineering",
    position: "Fullstack Developer",
    role: "MEMBER",
    joinedDate: "2023-03-20",
    salary: "₹12,00,000",
    address: "Andheri East, Mumbai, Maharashtra",
    projects: ["Client Portal Polish", "Analytics Dashboard"],
    imageUrl: null,
  },
  {
    id: "sample-user-3",
    name: "Sanya Gupta",
    email: "sanya@company.com",
    phone: "+91 98765 43212",
    department: "Product",
    position: "Product Manager",
    role: "MANAGER",
    joinedDate: "2023-02-10",
    salary: "₹15,00,000",
    address: "HSR Layout, Bangalore, Karnataka",
    projects: ["Team Operations Setup", "Design System v1"],
    imageUrl: null,
  },
  {
    id: "sample-user-4",
    name: "Ishan Verma",
    email: "ishan@company.com",
    phone: "+91 98765 43213",
    department: "Design",
    position: "UI/UX Designer",
    role: "MEMBER",
    joinedDate: "2023-05-15",
    salary: "₹10,50,000",
    address: "Koramangala, Bangalore, Karnataka",
    projects: ["Client Portal Polish", "Mobile App v2 Launch"],
    imageUrl: null,
  },
  {
    id: "sample-user-5",
    name: "Zoya Khan",
    email: "zoya@company.com",
    phone: "+91 98765 43214",
    department: "Marketing",
    position: "Growth Lead",
    role: "MANAGER",
    joinedDate: "2023-01-05",
    salary: "₹14,00,000",
    address: "Saket, New Delhi",
    projects: ["Mobile App v2 Launch", "Team Operations Setup"],
    imageUrl: null,
  },
];
