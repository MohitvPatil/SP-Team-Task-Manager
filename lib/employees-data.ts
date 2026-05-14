export interface EmployeeSecondaryDetail {
  id: string;
  phone: string;
  joinedDate: string;
  salary: string;
  address: string;
  projects: string[]; // List of project titles or IDs
  imageUrl: string | null;
}

// ── Secondary Database (Extra Details) ────────────────────────────────────────
export const extendedEmployees: EmployeeSecondaryDetail[] = [
  {
    id: "sample-user-1",
    phone: "+91 98765 43210",
    joinedDate: "2023-01-15",
    salary: "₹18,00,000",
    address: "Bandra West, Mumbai, Maharashtra",
    projects: ["Internal Task Manager Rollout", "Infrastructure Hardening"],
    imageUrl: null,
  },
  {
    id: "sample-user-2",
    phone: "+91 98765 43211",
    joinedDate: "2023-03-20",
    salary: "₹12,00,000",
    address: "Andheri East, Mumbai, Maharashtra",
    projects: ["Client Portal Polish", "Analytics Dashboard"],
    imageUrl: null,
  },
  {
    id: "sample-user-3",
    phone: "+91 98765 43212",
    joinedDate: "2023-02-10",
    salary: "₹15,00,000",
    address: "HSR Layout, Bangalore, Karnataka",
    projects: ["Team Operations Setup", "Design System v1"],
    imageUrl: null,
  },
  {
    id: "sample-user-4",
    phone: "+91 98765 43213",
    joinedDate: "2023-05-15",
    salary: "₹10,50,000",
    address: "Koramangala, Bangalore, Karnataka",
    projects: ["Client Portal Polish", "Mobile App v2 Launch"],
    imageUrl: null,
  },
  {
    id: "sample-user-5",
    phone: "+91 98765 43214",
    joinedDate: "2023-01-05",
    salary: "₹14,00,000",
    address: "Saket, New Delhi",
    projects: ["Mobile App v2 Launch", "Team Operations Setup"],
    imageUrl: null,
  },
  {
    id: "sample-user-6",
    phone: "+91 98765 43215",
    joinedDate: "2023-06-01",
    salary: "₹11,50,000",
    address: "Powai, Mumbai, Maharashtra",
    projects: ["Infrastructure Hardening"],
    imageUrl: null,
  },
  {
    id: "sample-user-7",
    phone: "+91 98765 43216",
    joinedDate: "2023-04-12",
    salary: "₹16,50,000",
    address: "Gachibowli, Hyderabad, Telangana",
    projects: ["Product Strategy 2024"],
    imageUrl: null,
  },
  {
    id: "sample-user-8",
    phone: "+91 98765 43217",
    joinedDate: "2023-07-22",
    salary: "₹9,80,000",
    address: "Whitefield, Bangalore, Karnataka",
    projects: ["Mobile App v2 Launch"],
    imageUrl: null,
  },
  {
    id: "sample-user-9",
    phone: "+91 98765 43218",
    joinedDate: "2023-08-10",
    salary: "₹11,00,000",
    address: "Salt Lake, Kolkata, West Bengal",
    projects: ["Analytics Dashboard"],
    imageUrl: null,
  },
  {
    id: "sample-user-10",
    phone: "+91 98765 43219",
    joinedDate: "2023-09-05",
    salary: "₹13,50,000",
    address: "Cyber City, Gurgaon, Haryana",
    projects: ["Security Audit v2"],
    imageUrl: null,
  },
];

// Helper type for the combined view used in UI
export interface EmployeeFullDetail {
  id: string;
  name: string;
  email: string;
  role: string;
  position: string;
  department: string;
  phone: string;
  joinedDate: string;
  salary: string;
  address: string;
  projects: string[];
  imageUrl: string | null;
}
